# Setting up accounts and client access

About 20 minutes, once. Free tier is ample — it allows 50,000 monthly active users and 1GB of file storage.

Until you do this, Project OS carries on working exactly as it does now, entirely on your own machine. This only adds sign-in and the client portal.

---

> ### Read this first if you have copied this repository
>
> **Create your own Supabase project. Do not use the keys already in `js/config.js`.**
>
> Those keys point at the author's live database, holding real client work. Two things follow from that:
>
> - **Nothing you do will work properly.** The security policies only return rows belonging to the signed-in owner. You will sign in, see an empty app, and assume you have broken something. You have not — you are simply looking at somebody else's locked filing cabinet.
> - **You would be sending your own client's details to a stranger's database.** Names, briefs, budgets, uploaded files. Do not do that to them.
>
> The whole of step 1 below is creating your own. It is free and takes about two minutes. Replace both values in `js/config.js` with yours before you run anything.
>
> If you only want to see how the app works, you do not need Supabase at all — open `app.html?guest=1` for the guest demo, or just run the app locally and it will store everything in your own browser.

---

## 1. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) and click **New project**.
2. Name it `project-os`. Choose the region closest to you. Set a database password and save it in your password manager — you won't need it often, but you will need it eventually.
3. Wait a couple of minutes while it provisions.

## 2. Create the tables and security rules

1. In the left sidebar click **SQL Editor** → **New query**.
2. Open `supabase/schema.sql` from your project folder, copy all of it, paste it in.
3. Click **Run**. You should see "Success. No rows returned."

That script creates four tables, the access rules, and a private file bucket. It's safe to run again if you ever need to.

**Check it worked** — run this in a new query:

```sql
select tablename, rowsecurity from pg_tables
where schemaname = 'public'
  and tablename in ('projects','project_clients','client_snapshots','shared_files');
```

All four rows must show `rowsecurity = true`. If any says false, stop and re-run the schema — without it, your data would be readable by anyone.

## 3. Copy your keys into the app

1. Sidebar → **Project Settings** → **API**.
2. Copy **Project URL** and the **anon public** key.
3. Open `js/config.js` and fill in:

```js
supabase: {
  url: 'https://abcdefgh.supabase.co',
  anonKey: 'eyJhbGciOi...'
},
```

Commit and push, then bump `CACHE` in `sw.js`.

> **The anon key is meant to be public.** It's designed to sit in public web pages. Your data is protected by the database rules from step 2, not by hiding this key.
>
> **Never put the `service_role` key here.** That one ignores all the rules. If you ever paste it anywhere public, rotate it immediately in Project Settings → API.

## 4. Point the sign-in emails at your site

Sidebar → **Authentication** → **URL Configuration**:

- **Site URL:** `https://sarahjhill.github.io/project-os/`
- **Redirect URLs:** add both
  - `https://sarahjhill.github.io/project-os/`
  - `https://sarahjhill.github.io/project-os/client.html`

Without these, sign-in links will bounce people to the wrong place or refuse to work.

## 5. Try it

Open your site → **Clients** tab → enter your own email → click the link in the email. You should come back signed in.

---

## Using it

### Linking a project
Open the project, go to **Clients**, click **Link this project**. It uploads a record to your account so clients can be attached to it. Your task notes, estimates and templates stay on your machine — they are never uploaded.

### Choosing what a client sees
Under **What clients can see**, tick the sections. Add a short note, list what you need from them, set milestone dates, upload any files to share. Then click **Publish update**.

**Nothing reaches a client until you press Publish.** You can work all week and publish once.

### Inviting someone
Type their email under **People with access** and click Invite. Then send them your client page link (there's a Copy button). They enter that same email address, get a sign-in link, and see only your published summary.

### Removing access
Click **Remove** next to their name. They lose access immediately.

---

## What clients can and cannot see

**Can see:** whatever you published — progress percentage, current phase name and goal, your note, the actions you listed, milestone dates, files you uploaded to share, and their own form answers if you ticked that box.

**Cannot see:** your task notes, hour estimates, story points, sprints, the template library, your other projects, or any other client. These are enforced by database rules, not by hiding things in the interface — a client poking at the API gets refused.

**One thing to be aware of:** the published summary is shared per *project*, not per person. If you invite two people to the same project, they see the same summary. The per-person tick boxes tailor the presentation; they are not a security boundary. If two contacts must see genuinely different things, use two projects.

---

## Costs and limits

Free tier: 500MB database, 1GB file storage, 50,000 monthly active users. A solo studio will not approach these. Note that Supabase pauses free projects after a week of no activity — opening the site wakes it up, taking a few seconds on the first load.

Supabase's built-in email sending is rate-limited (a handful per hour) and fine for occasional invites. If you ever send many at once, connect your own SMTP under Authentication → Emails.

---

## If something goes wrong

**"Cloud is not configured"** — the `supabase` block in `js/config.js` is empty, or the change hasn't deployed. Bump `CACHE` in `sw.js` and hard-refresh.

**Sign-in email never arrives** — check spam. Then check Authentication → URL Configuration matches step 4. Supabase's rate limit also silently drops requests if you try repeatedly in quick succession; wait ten minutes.

**Client sees "Nothing shared yet"** — they signed in with a different email than you invited, or you haven't pressed Publish. Both are common; check the address first.

**"row-level security policy" errors** — the schema didn't fully run. Re-run `supabase/schema.sql`.
