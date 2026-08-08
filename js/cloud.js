/* =====================================================================
   PROJECT OS — Cloud (Supabase): auth, project sync, client sharing
   Loads the Supabase library from a CDN only when cloud is configured.
   With no config, or offline, the app carries on working locally.
   ===================================================================== */
(function () {
  'use strict';

  var CDN = 'https://esm.sh/@supabase/supabase-js@2';
  var sb = null;             // supabase client
  var ready = null;          // promise, resolves once library loaded
  var initialised = false;   // true once we have actually checked for a session
  var session = null;
  var listeners = [];

  function cfg() {
    var c = (window.CONFIG || {}).supabase || {};
    return { url: c.url || '', key: c.anonKey || '' };
  }
  function configured() {
    var c = cfg();
    return !!(c.url && c.key);
  }

  function emit() {
    listeners.forEach(function (fn) {
      try { fn(session); } catch (e) { console.warn(e); }
    });
  }
  function onChange(fn) { listeners.push(fn); }

  /* ---------- load the library on demand ---------- */
  function init() {
    if (ready) return ready;
    if (!configured()) {
      initialised = true;
      ready = Promise.resolve(null);
      return ready;
    }
    ready = import(/* @vite-ignore */ CDN).then(function (mod) {
      var c = cfg();
      sb = mod.createClient(c.url, c.key, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      });
      return sb.auth.getSession().then(function (r) {
        session = (r.data && r.data.session) || null;
        initialised = true;
        sb.auth.onAuthStateChange(function (_evt, s) { session = s; emit(); });
        // A magic link arrives as #access_token=… — tidy it away once used.
        if (session && /access_token=/.test(window.location.hash)) {
          try { history.replaceState(null, '', window.location.pathname + window.location.search); }
          catch (e) { }
        }
        emit();
        return sb;
      });
    }).catch(function (e) {
      console.warn('Project OS: cloud unavailable —', e && e.message);
      sb = null;
      initialised = true;
      emit();
      return null;
    });
    return ready;
  }

  /* ---------- auth ---------- */
  function signIn(email, redirectTo) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.auth.signInWithOtp({
        email: String(email).trim(),
        options: { emailRedirectTo: redirectTo || window.location.href.split('#')[0] }
      }).then(function (r) {
        if (r.error) throw r.error;
        return true;
      });
    });
  }
  function signOut() {
    return init().then(function () {
      if (!sb) return;
      return sb.auth.signOut().then(function () { session = null; emit(); });
    });
  }
  function user() { return session && session.user ? session.user : null; }
  function email() { var u = user(); return u ? u.email : ''; }

  /* ---------- projects (owner side) ---------- */
  function listProjects() {
    return init().then(function () {
      if (!sb || !user()) return [];
      return sb.from('projects')
        .select('id,name,client_name,data,updated_at,archived')
        .eq('archived', false)
        .order('updated_at', { ascending: false })
        .then(function (r) {
          if (r.error) throw r.error;
          return r.data || [];
        });
    });
  }

  function createProject(name, clientName, data) {
    return init().then(function () {
      if (!sb || !user()) throw new Error('Not signed in.');
      return sb.from('projects').insert({
        owner: user().id,
        name: name || 'New project',
        client_name: clientName || '',
        data: data || {}
      }).select().single().then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
    });
  }

  function saveProject(id, patch) {
    return init().then(function () {
      if (!sb || !user()) throw new Error('Not signed in.');
      return sb.from('projects').update(patch).eq('id', id).select().single()
        .then(function (r) {
          if (r.error) throw r.error;
          return r.data;
        });
    });
  }

  function deleteProject(id) {
    return init().then(function () {
      if (!sb || !user()) throw new Error('Not signed in.');
      return sb.from('projects').delete().eq('id', id).then(function (r) {
        if (r.error) throw r.error;
        return true;
      });
    });
  }

  /* ---------- clients on a project ---------- */
  function listClients(projectId) {
    return init().then(function () {
      if (!sb) return [];
      return sb.from('project_clients').select('*')
        .eq('project_id', projectId).order('invited_at')
        .then(function (r) {
          if (r.error) throw r.error;
          return r.data || [];
        });
    });
  }
  function inviteClient(projectId, email, name, sections) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.from('project_clients').upsert({
        project_id: projectId,
        email: String(email).trim().toLowerCase(),
        display_name: name || '',
        sections: sections || {
          progress: true, actions: true, milestones: true, files: true, answers: true
        },
        revoked: false
      }, { onConflict: 'project_id,email' }).select().single().then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
    });
  }
  function updateClient(id, patch) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.from('project_clients').update(patch).eq('id', id).select().single()
        .then(function (r) { if (r.error) throw r.error; return r.data; });
    });
  }
  function removeClient(id) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.from('project_clients').delete().eq('id', id)
        .then(function (r) { if (r.error) throw r.error; return true; });
    });
  }

  /* ---------- the published snapshot ---------- */
  function publishSnapshot(projectId, payload) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.from('client_snapshots').upsert({
        project_id: projectId,
        payload: payload,
        published_at: new Date().toISOString()
      }, { onConflict: 'project_id' }).select().single().then(function (r) {
        if (r.error) throw r.error;
        return r.data;
      });
    });
  }
  function getSnapshot(projectId) {
    return init().then(function () {
      if (!sb) return null;
      return sb.from('client_snapshots').select('*').eq('project_id', projectId).maybeSingle()
        .then(function (r) { if (r.error) throw r.error; return r.data; });
    });
  }

  /* ---------- what a signed-in client can see ---------- */
  function myClientProjects() {
    return init().then(function () {
      if (!sb || !user()) return [];
      return sb.from('project_clients')
        .select('id,project_id,display_name,sections,last_seen_at')
        .eq('revoked', false)
        .then(function (r) {
          if (r.error) throw r.error;
          return r.data || [];
        });
    });
  }
  function touchClientSeen(id) {
    return init().then(function () {
      if (!sb) return;
      return sb.from('project_clients')
        .update({ last_seen_at: new Date().toISOString() }).eq('id', id);
    }).catch(function () { });
  }

  /* ---------- shared files ---------- */
  function listSharedFiles(projectId) {
    return init().then(function () {
      if (!sb) return [];
      return sb.from('shared_files').select('*')
        .eq('project_id', projectId).order('created_at', { ascending: false })
        .then(function (r) { if (r.error) throw r.error; return r.data || []; });
    });
  }
  function uploadSharedFile(projectId, file, note) {
    return init().then(function () {
      if (!sb || !user()) throw new Error('Not signed in.');
      var safe = file.name.replace(/[^\w.\- ]+/g, '_');
      var path = projectId + '/' + Date.now() + '-' + safe;
      return sb.storage.from('shared').upload(path, file, { upsert: false })
        .then(function (r) {
          if (r.error) throw r.error;
          return sb.from('shared_files').insert({
            project_id: projectId, path: path, name: file.name,
            size: file.size, mime: file.type || '', note: note || ''
          }).select().single();
        }).then(function (r) {
          if (r.error) throw r.error;
          return r.data;
        });
    });
  }
  function sharedFileUrl(path, seconds) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.storage.from('shared').createSignedUrl(path, seconds || 300)
        .then(function (r) {
          if (r.error) throw r.error;
          return r.data.signedUrl;
        });
    });
  }
  function deleteSharedFile(rec) {
    return init().then(function () {
      if (!sb) throw new Error('Cloud is not configured.');
      return sb.storage.from('shared').remove([rec.path]).then(function () {
        return sb.from('shared_files').delete().eq('id', rec.id);
      }).then(function (r) {
        if (r && r.error) throw r.error;
        return true;
      });
    });
  }

  window.Cloud = {
    configured: configured,
    isReady: function () { return initialised; },
    init: init,
    onChange: onChange,
    signIn: signIn, signOut: signOut, user: user, email: email,
    listProjects: listProjects, createProject: createProject,
    saveProject: saveProject, deleteProject: deleteProject,
    listClients: listClients, inviteClient: inviteClient,
    updateClient: updateClient, removeClient: removeClient,
    publishSnapshot: publishSnapshot, getSnapshot: getSnapshot,
    myClientProjects: myClientProjects, touchClientSeen: touchClientSeen,
    listSharedFiles: listSharedFiles, uploadSharedFile: uploadSharedFile,
    sharedFileUrl: sharedFileUrl, deleteSharedFile: deleteSharedFile
  };
})();
try { window.__bootStage = 'cloud-loaded'; } catch (e) { }
