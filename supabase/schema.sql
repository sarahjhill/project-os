-- =====================================================================
-- PROJECT OS — database schema and security
-- Run this once in Supabase → SQL Editor → New query → Run.
-- Safe to run again: everything is written to be idempotent.
--
-- The security model in one paragraph:
--   * A project row is readable ONLY by the person who owns it.
--   * Clients never touch project rows. They read a separate
--     "client_snapshots" row that you publish deliberately, containing
--     only what you chose to share. Nothing else is reachable.
-- =====================================================================

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ---------------------------------------------------------------------
-- 1. PROJECTS  (owner-only)
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  owner       uuid not null references auth.users(id) on delete cascade,
  name        text not null default 'New project',
  client_name text default '',
  data        jsonb not null default '{}'::jsonb,   -- the whole project state
  archived    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index if not exists projects_owner_idx on public.projects(owner);

-- ---------------------------------------------------------------------
-- 2. CLIENT INVITES  (who may see a project, and which sections)
-- ---------------------------------------------------------------------
create table if not exists public.project_clients (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  email        citext not null,
  display_name text default '',
  sections     jsonb not null default
               '{"progress":true,"actions":true,"milestones":true,"files":true,"answers":true}'::jsonb,
  invited_at   timestamptz not null default now(),
  last_seen_at timestamptz,
  revoked      boolean not null default false,
  unique (project_id, email)
);
create index if not exists project_clients_email_idx on public.project_clients(email);
create index if not exists project_clients_project_idx on public.project_clients(project_id);

-- ---------------------------------------------------------------------
-- 3. PUBLISHED SNAPSHOT  (the ONLY thing a client can read)
-- ---------------------------------------------------------------------
create table if not exists public.client_snapshots (
  project_id   uuid primary key references public.projects(id) on delete cascade,
  payload      jsonb not null default '{}'::jsonb,
  published_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 4. SHARED FILES  (metadata; the bytes live in Storage)
-- ---------------------------------------------------------------------
create table if not exists public.shared_files (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  path       text not null,
  name       text not null,
  size       bigint default 0,
  mime       text default '',
  note       text default '',
  created_at timestamptz not null default now()
);
create index if not exists shared_files_project_idx on public.shared_files(project_id);

-- ---------------------------------------------------------------------
-- 5. HELPERS
-- ---------------------------------------------------------------------

-- The signed-in user's email, taken from their token.
create or replace function public.current_email()
returns citext
language sql stable
as $$
  select nullif(auth.jwt() ->> 'email', '')::citext;
$$;

-- Is the signed-in user an active client of this project?
-- SECURITY DEFINER so the check itself is not blocked by RLS.
create or replace function public.is_client_of(pid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.project_clients pc
    where pc.project_id = pid
      and pc.revoked = false
      and pc.email = public.current_email()
  );
$$;

-- Is the signed-in user the owner of this project?
create or replace function public.is_owner_of(pid uuid)
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.projects p
    where p.id = pid and p.owner = auth.uid()
  );
$$;

-- Keep updated_at honest.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------
alter table public.projects         enable row level security;
alter table public.project_clients  enable row level security;
alter table public.client_snapshots enable row level security;
alter table public.shared_files     enable row level security;

-- PROJECTS — owner only, full stop. Clients have no policy here at all,
-- so they cannot read a project row under any circumstances.
drop policy if exists projects_select on public.projects;
create policy projects_select on public.projects
  for select using (owner = auth.uid());

drop policy if exists projects_insert on public.projects;
create policy projects_insert on public.projects
  for insert with check (owner = auth.uid());

drop policy if exists projects_update on public.projects;
create policy projects_update on public.projects
  for update using (owner = auth.uid()) with check (owner = auth.uid());

drop policy if exists projects_delete on public.projects;
create policy projects_delete on public.projects
  for delete using (owner = auth.uid());

-- PROJECT_CLIENTS — owner manages; a client may read only their own row.
drop policy if exists pc_owner_all on public.project_clients;
create policy pc_owner_all on public.project_clients
  for all using (public.is_owner_of(project_id))
  with check (public.is_owner_of(project_id));

drop policy if exists pc_client_read_self on public.project_clients;
create policy pc_client_read_self on public.project_clients
  for select using (email = public.current_email() and revoked = false);

-- CLIENT_SNAPSHOTS — owner writes; invited clients read.
drop policy if exists snap_owner_all on public.client_snapshots;
create policy snap_owner_all on public.client_snapshots
  for all using (public.is_owner_of(project_id))
  with check (public.is_owner_of(project_id));

drop policy if exists snap_client_read on public.client_snapshots;
create policy snap_client_read on public.client_snapshots
  for select using (public.is_client_of(project_id));

-- SHARED_FILES — owner manages; invited clients read.
drop policy if exists files_owner_all on public.shared_files;
create policy files_owner_all on public.shared_files
  for all using (public.is_owner_of(project_id))
  with check (public.is_owner_of(project_id));

drop policy if exists files_client_read on public.shared_files;
create policy files_client_read on public.shared_files
  for select using (public.is_client_of(project_id));

-- ---------------------------------------------------------------------
-- 7. STORAGE  (private bucket; files live under <project_id>/<filename>)
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('shared', 'shared', false)
on conflict (id) do nothing;

drop policy if exists shared_owner_all on storage.objects;
create policy shared_owner_all on storage.objects
  for all to authenticated
  using (
    bucket_id = 'shared'
    and public.is_owner_of((storage.foldername(name))[1]::uuid)
  )
  with check (
    bucket_id = 'shared'
    and public.is_owner_of((storage.foldername(name))[1]::uuid)
  );

drop policy if exists shared_client_read on storage.objects;
create policy shared_client_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'shared'
    and public.is_client_of((storage.foldername(name))[1]::uuid)
  );

-- ---------------------------------------------------------------------
-- 8. CHECK IT WORKED
-- ---------------------------------------------------------------------
-- Every table below must show rowsecurity = true.
--   select tablename, rowsecurity from pg_tables
--   where schemaname = 'public'
--     and tablename in ('projects','project_clients','client_snapshots','shared_files');

-- =====================================================================
-- 9. CLIENT MESSAGES + CLIENT UPLOADS
-- Added so a client can reply to the owner from their client page, and
-- attach a file, without being able to see or touch anything else.
-- Run this block once in Supabase → SQL Editor → New query → Run.
-- Safe to run again: everything here is idempotent, same as above.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 9a. MESSAGES  (a two-way thread per project)
-- ---------------------------------------------------------------------
create table if not exists public.client_messages (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  from_owner  boolean not null default false,
  sender      citext default '',   -- the client's email, or '' for the owner
  body        text not null,
  created_at  timestamptz not null default now()
);
create index if not exists client_messages_project_idx on public.client_messages(project_id);

alter table public.client_messages enable row level security;

drop policy if exists cm_owner_all on public.client_messages;
create policy cm_owner_all on public.client_messages
  for all using (public.is_owner_of(project_id))
  with check (public.is_owner_of(project_id));

drop policy if exists cm_client_read on public.client_messages;
create policy cm_client_read on public.client_messages
  for select using (public.is_client_of(project_id));

-- A client may only ever post as themselves, never impersonating the owner.
drop policy if exists cm_client_insert on public.client_messages;
create policy cm_client_insert on public.client_messages
  for insert with check (
    public.is_client_of(project_id)
    and from_owner = false
    and sender = public.current_email()
  );

-- ---------------------------------------------------------------------
-- 9b. CLIENT UPLOADS  (metadata; the bytes live in Storage)
-- ---------------------------------------------------------------------
create table if not exists public.client_uploads (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  path       text not null,
  name       text not null,
  size       bigint default 0,
  mime       text default '',
  sender     citext default '',
  created_at timestamptz not null default now()
);
create index if not exists client_uploads_project_idx on public.client_uploads(project_id);

alter table public.client_uploads enable row level security;

drop policy if exists cu_owner_all on public.client_uploads;
create policy cu_owner_all on public.client_uploads
  for all using (public.is_owner_of(project_id))
  with check (public.is_owner_of(project_id));

drop policy if exists cu_client_read on public.client_uploads;
create policy cu_client_read on public.client_uploads
  for select using (public.is_client_of(project_id));

drop policy if exists cu_client_insert on public.client_uploads;
create policy cu_client_insert on public.client_uploads
  for insert with check (
    public.is_client_of(project_id)
    and sender = public.current_email()
  );

-- ---------------------------------------------------------------------
-- 9c. STORAGE  (private bucket; files live under <project_id>/<filename>)
-- The reverse of the 'shared' bucket: here the CLIENT writes and the
-- owner reads, rather than the other way round.
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('client-uploads', 'client-uploads', false)
on conflict (id) do nothing;

drop policy if exists client_uploads_owner_all on storage.objects;
create policy client_uploads_owner_all on storage.objects
  for all to authenticated
  using (
    bucket_id = 'client-uploads'
    and public.is_owner_of((storage.foldername(name))[1]::uuid)
  )
  with check (
    bucket_id = 'client-uploads'
    and public.is_owner_of((storage.foldername(name))[1]::uuid)
  );

drop policy if exists client_uploads_client_write on storage.objects;
create policy client_uploads_client_write on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'client-uploads'
    and public.is_client_of((storage.foldername(name))[1]::uuid)
  );

drop policy if exists client_uploads_client_read on storage.objects;
create policy client_uploads_client_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'client-uploads'
    and public.is_client_of((storage.foldername(name))[1]::uuid)
  );

-- ---------------------------------------------------------------------
-- 9d. CHECK IT WORKED
-- ---------------------------------------------------------------------
--   select tablename, rowsecurity from pg_tables
--   where schemaname = 'public'
--     and tablename in ('client_messages','client_uploads');
