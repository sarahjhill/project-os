/* =====================================================================
   PROJECT OS — Store
   State: localStorage (small, synchronous)
   Files: IndexedDB (blobs, large)
   ===================================================================== */
(function () {
  'use strict';

  /* Guest mode gets its own key so somebody looking round on a shared
     machine can neither see nor overwrite the real projects. */
  var LS_KEY = (window.GUEST && window.GUEST.active)
    ? window.GUEST.storageKey
    : 'projectos.v1';
  var DB_NAME = 'projectos-files';
  var DB_VER = 1;

  /* ---------- helpers ---------- */
  function uid(p) {
    return (p || 'id') + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }
  function today() { return new Date().toISOString().slice(0, 10); }

  /* ---------- default project ---------- */
  function newProject(name, client) {
    return {
      id: uid('proj'),
      name: name || 'New project',
      client: client || '',
      created: today(),
      sprintLength: 7,
      capacity: 20,
      tasks: {},          // taskId -> { status, pri, pts, sprint, due, notes, dod:[], links:[] }
      custom: [],         // user-added tasks: { phaseId, ...taskShape }
      sprints: [],        // { id, name, goal, start, end, closed }
      docNotes: {}        // docId -> user notes
    };
  }

  /* ---------- load / save ---------- */
  var state = null;

  function load() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (raw) { state = JSON.parse(raw); }
    } catch (e) { console.warn('Could not read saved data', e); }

    if (!state || !state.projects || !Object.keys(state.projects).length) {
      var p = newProject('My first project', '');
      state = { projects: {}, activeId: p.id, theme: 'light', openPhases: {} };
      state.projects[p.id] = p;
      save();
    }
    if (!state.openPhases) state.openPhases = {};
    return state;
  }

  var saveTimer = null;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
      catch (e) { alert('Could not save — browser storage may be full.\n' + e.message); }
    }, 120);
  }
  function saveNow() {
    clearTimeout(saveTimer);
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { console.warn(e); }
  }

  /* ---------- projects ---------- */
  function project() { return state.projects[state.activeId]; }
  function projectList() {
    return Object.keys(state.projects).map(function (k) { return state.projects[k]; });
  }
  function addProject(name, client) {
    var p = newProject(name, client);
    state.projects[p.id] = p; state.activeId = p.id; saveNow(); return p;
  }
  function setActive(id) { if (state.projects[id]) { state.activeId = id; saveNow(); } }
  function deleteProject(id) {
    delete state.projects[id];
    try { deleteProjectFiles(id); } catch (e) { /* files DB unavailable */ }
    if (state.activeId === id) {
      var keys = Object.keys(state.projects);
      if (!keys.length) { addProject('New project'); } else { state.activeId = keys[0]; }
    }
    saveNow();
  }
  function resetProgress() {
    var p = project();
    p.tasks = {}; p.sprints = []; saveNow();
  }

  /* ---------- task catalogue (built-in + custom) ---------- */
  function allTasks() {
    var out = [];
    window.PHASES.forEach(function (ph) {
      ph.tasks.forEach(function (t) {
        out.push(Object.assign({}, t, { phaseId: ph.id, phaseName: ph.name, phaseNum: ph.num, custom: false }));
      });
    });
    (project().custom || []).forEach(function (t) {
      var ph = window.PHASES.filter(function (p) { return p.id === t.phaseId; })[0];
      out.push(Object.assign({}, t, {
        phaseName: ph ? ph.name : 'Custom', phaseNum: ph ? ph.num : 99, custom: true
      }));
    });
    return out;
  }
  function taskById(id) {
    return allTasks().filter(function (t) { return t.id === id; })[0] || null;
  }
  function phaseTasks(phaseId) {
    return allTasks().filter(function (t) { return t.phaseId === phaseId; });
  }
  function addCustomTask(phaseId, data) {
    var t = {
      id: uid('ct'), phaseId: phaseId, title: data.title || 'Untitled task',
      role: data.role || '', est: Number(data.est) || 0, pri: Number(data.pri) || 3,
      pts: Number(data.pts) || 0, why: data.why || '',
      how: (data.how || '').split('\n').filter(Boolean),
      deliver: (data.deliver || '').split('\n').filter(Boolean),
      tools: [], dod: (data.dod || '').split('\n').filter(Boolean), docs: []
    };
    project().custom.push(t); saveNow(); return t;
  }
  function deleteCustomTask(id) {
    var p = project();
    p.custom = p.custom.filter(function (t) { return t.id !== id; });
    delete p.tasks[id]; saveNow();
  }

  /* ---------- task state ---------- */
  function meta(taskId) {
    var p = project();
    if (!p.tasks[taskId]) {
      var def = taskById(taskId);
      p.tasks[taskId] = {
        status: 'todo',
        pri: def ? def.pri : 3,
        pts: def ? (def.pts || 0) : 0,
        sprint: '', due: '', notes: '', dod: [], links: [], started: '', finished: ''
      };
    }
    var m = p.tasks[taskId];
    if (!m.dod) m.dod = [];
    if (!m.links) m.links = [];
    return m;
  }
  function setMeta(taskId, patch) {
    var m = meta(taskId);
    Object.assign(m, patch);
    if (patch.status === 'done' && !m.finished) m.finished = today();
    if (patch.status && patch.status !== 'done') m.finished = '';
    if (patch.status === 'doing' && !m.started) m.started = today();
    save();
    return m;
  }
  function toggleDone(taskId) {
    var m = meta(taskId);
    return setMeta(taskId, { status: m.status === 'done' ? 'todo' : 'done' });
  }
  function toggleDod(taskId, idx) {
    var m = meta(taskId);
    var i = m.dod.indexOf(idx);
    if (i > -1) m.dod.splice(i, 1); else m.dod.push(idx);
    save(); return m;
  }

  /* ---------- sprints ---------- */
  function addSprint(data) {
    var p = project();
    var s = {
      id: uid('spr'),
      name: data.name || ('Sprint ' + (p.sprints.length + 1)),
      goal: data.goal || '', start: data.start || today(), end: data.end || '',
      closed: false
    };
    p.sprints.push(s); saveNow(); return s;
  }
  function updateSprint(id, patch) {
    var s = project().sprints.filter(function (x) { return x.id === id; })[0];
    if (s) { Object.assign(s, patch); saveNow(); }
    return s;
  }
  function deleteSprint(id) {
    var p = project();
    p.sprints = p.sprints.filter(function (s) { return s.id !== id; });
    Object.keys(p.tasks).forEach(function (k) { if (p.tasks[k].sprint === id) p.tasks[k].sprint = ''; });
    saveNow();
  }

  /* ---------- stats ---------- */
  function stats() {
    var ts = allTasks(), done = 0, doing = 0, blocked = 0, pts = 0, ptsDone = 0, hrs = 0, hrsDone = 0;
    ts.forEach(function (t) {
      var m = project().tasks[t.id];
      var st = m ? m.status : 'todo';
      var pt = m ? (m.pts || 0) : (t.pts || 0);
      pts += pt; hrs += (t.est || 0);
      if (st === 'done') { done++; ptsDone += pt; hrsDone += (t.est || 0); }
      if (st === 'doing') doing++;
      if (st === 'blocked') blocked++;
    });
    return {
      total: ts.length, done: done, doing: doing, blocked: blocked,
      pct: ts.length ? Math.round(done / ts.length * 100) : 0,
      pts: pts, ptsDone: ptsDone, hrs: hrs, hrsDone: hrsDone
    };
  }
  function phaseStats(phaseId) {
    var ts = phaseTasks(phaseId), done = 0;
    ts.forEach(function (t) {
      var m = project().tasks[t.id];
      if (m && m.status === 'done') done++;
    });
    return { total: ts.length, done: done, pct: ts.length ? Math.round(done / ts.length * 100) : 0 };
  }

  /* ---------- IndexedDB attachments ---------- */
  var dbPromise = null;
  var filesAvailable = true;
  function db() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (res, rej) {
      if (typeof indexedDB === 'undefined' || !indexedDB) {
        rej(new Error('IndexedDB unavailable in this browser context'));
        return;
      }
      // Never let a stalled open block the UI.
      var settled = false;
      var timer = setTimeout(function () {
        if (!settled) { settled = true; rej(new Error('IndexedDB timed out')); }
      }, 4000);
      function done(fn, v) {
        if (settled) return; settled = true; clearTimeout(timer); fn(v);
      }
      var req;
      try { req = indexedDB.open(DB_NAME, DB_VER); }
      catch (e) { done(rej, e); return; }
      req.onupgradeneeded = function (e) {
        var d = e.target.result;
        if (!d.objectStoreNames.contains('files')) {
          var os = d.createObjectStore('files', { keyPath: 'id' });
          os.createIndex('byTask', 'taskKey', { unique: false });
          os.createIndex('byProject', 'projectId', { unique: false });
        }
      };
      req.onsuccess = function () { done(res, req.result); };
      req.onerror = function () { done(rej, req.error || new Error('IndexedDB open failed')); };
      req.onblocked = function () { done(rej, new Error('IndexedDB blocked by another tab')); };
    });
    dbPromise.catch(function (e) {
      filesAvailable = false;
      console.warn('The SJH Process: file attachments unavailable —', e && e.message);
    });
    return dbPromise;
  }

  function addFile(taskId, file) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var rec = {
          id: uid('file'),
          projectId: state.activeId,
          taskId: taskId,
          taskKey: state.activeId + '::' + taskId,
          name: file.name, type: file.type || 'application/octet-stream',
          size: file.size, added: new Date().toISOString(),
          blob: file
        };
        var tx = d.transaction('files', 'readwrite');
        tx.objectStore('files').add(rec);
        tx.oncomplete = function () { res(rec); };
        tx.onerror = function () { rej(tx.error); };
      });
    });
  }

  function listFiles(taskId) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var out = [];
        var tx = d.transaction('files', 'readonly');
        var idx = tx.objectStore('files').index('byTask');
        var r = idx.openCursor(IDBKeyRange.only(state.activeId + '::' + taskId));
        r.onsuccess = function (e) {
          var c = e.target.result;
          if (c) { out.push(c.value); c.continue(); } else { res(out); }
        };
        r.onerror = function () { rej(r.error); };
      });
    }).catch(function () { return []; });
  }

  function listAllFiles() {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var out = [];
        var tx = d.transaction('files', 'readonly');
        var idx = tx.objectStore('files').index('byProject');
        var r = idx.openCursor(IDBKeyRange.only(state.activeId));
        r.onsuccess = function (e) {
          var c = e.target.result;
          if (c) { out.push(c.value); c.continue(); } else { res(out); }
        };
        r.onerror = function () { rej(r.error); };
      });
    }).catch(function () { return []; });
  }

  function fileCounts() {
    return listAllFiles().then(function (all) {
      var map = {};
      all.forEach(function (f) { map[f.taskId] = (map[f.taskId] || 0) + 1; });
      return map;
    }).catch(function () { return {}; });
  }

  function deleteFile(id) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var tx = d.transaction('files', 'readwrite');
        tx.objectStore('files').delete(id);
        tx.oncomplete = res; tx.onerror = function () { rej(tx.error); };
      });
    });
  }

  function deleteProjectFiles(pid) {
    return listAllFilesFor(pid).then(function (all) {
      return Promise.all(all.map(function (f) { return deleteFile(f.id); }));
    }).catch(function () { });
  }
  function listAllFilesFor(pid) {
    return db().then(function (d) {
      return new Promise(function (res) {
        var out = [];
        var tx = d.transaction('files', 'readonly');
        var r = tx.objectStore('files').index('byProject').openCursor(IDBKeyRange.only(pid));
        r.onsuccess = function (e) { var c = e.target.result; if (c) { out.push(c.value); c.continue(); } else res(out); };
        r.onerror = function () { res([]); };
      });
    }).catch(function () { return []; });
  }

  function openFile(rec) {
    var url = URL.createObjectURL(rec.blob);
    window.open(url, '_blank');
    setTimeout(function () { URL.revokeObjectURL(url); }, 60000);
  }
  function downloadFile(rec) {
    var url = URL.createObjectURL(rec.blob);
    var a = document.createElement('a');
    a.href = url; a.download = rec.name; document.body.appendChild(a); a.click();
    a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 5000);
  }

  /* ---------- links ---------- */
  function addLink(taskId, label, url) {
    var m = meta(taskId);
    m.links.push({ id: uid('lnk'), label: label || url, url: url, added: today() });
    saveNow(); return m.links;
  }
  function removeLink(taskId, id) {
    var m = meta(taskId);
    m.links = m.links.filter(function (l) { return l.id !== id; });
    saveNow(); return m.links;
  }

  /* ---------- client form responses ---------- */
  function addResponse(formId, payload) {
    var p = project();
    if (!p.responses) p.responses = {};
    if (!p.responses[formId]) p.responses[formId] = [];
    var who = '';
    (payload.answers || []).forEach(function (a) {
      if (!who && /^(name|fullname)$/i.test(a.id) && a.value) who = a.value;
    });
    var rec = {
      id: uid('resp'),
      formId: formId,
      formTitle: payload.formTitle || formId,
      from: who || 'Unnamed',
      completed: payload.completed || new Date().toISOString(),
      imported: new Date().toISOString(),
      answers: payload.answers || []
    };
    p.responses[formId].push(rec);
    saveNow();
    return rec;
  }
  function listResponses(formId) {
    var p = project();
    if (!p.responses) return [];
    return formId ? (p.responses[formId] || [])
      : Object.keys(p.responses).reduce(function (acc, k) {
        return acc.concat(p.responses[k]);
      }, []);
  }
  function getResponse(id) {
    return listResponses().filter(function (r) { return r.id === id; })[0] || null;
  }
  function deleteResponse(formId, id) {
    var p = project();
    if (!p.responses || !p.responses[formId]) return;
    p.responses[formId] = p.responses[formId].filter(function (r) { return r.id !== id; });
    saveNow();
  }

  /* ---------- import / export ---------- */
  function exportJSON() {
    saveNow();
    var data = JSON.stringify({ exported: new Date().toISOString(), version: 1, state: state }, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'project-os-backup-' + today() + '.json';
    document.body.appendChild(a); a.click(); a.remove();
  }
  function importJSON(text) {
    var parsed = JSON.parse(text);
    var incoming = parsed.state || parsed;
    if (!incoming.projects) throw new Error('Not an SJH Process backup file.');
    Object.keys(incoming.projects).forEach(function (k) { state.projects[k] = incoming.projects[k]; });
    state.activeId = incoming.activeId && state.projects[incoming.activeId] ? incoming.activeId : Object.keys(state.projects)[0];
    saveNow();
  }
  function exportCSV() {
    var rows = [['Phase', 'Task', 'Role', 'Status', 'Priority', 'Points', 'Est hrs', 'Sprint', 'Due', 'Notes']];
    var priName = { 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low' };
    var sprintName = {};
    project().sprints.forEach(function (s) { sprintName[s.id] = s.name; });
    allTasks().forEach(function (t) {
      var m = project().tasks[t.id] || {};
      rows.push([
        t.phaseNum + '. ' + t.phaseName, t.title, t.role || '',
        m.status || 'todo', priName[m.pri || t.pri] || '', (m.pts != null ? m.pts : t.pts) || '',
        t.est || '', sprintName[m.sprint] || '', m.due || '', (m.notes || '').replace(/\n/g, ' ')
      ]);
    });
    var csv = rows.map(function (r) {
      return r.map(function (c) { return '"' + String(c).replace(/"/g, '""') + '"'; }).join(',');
    }).join('\n');
    var blob = new Blob([csv], { type: 'text/csv' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'project-os-tasks-' + today() + '.csv';
    document.body.appendChild(a); a.click(); a.remove();
  }

  /* ---------- expose ---------- */
  window.Store = {
    load: load, save: save, saveNow: saveNow, uid: uid, today: today,
    get filesAvailable() { return filesAvailable; },
    get state() { return state; },
    project: project, projectList: projectList, addProject: addProject,
    setActive: setActive, deleteProject: deleteProject, resetProgress: resetProgress,
    allTasks: allTasks, taskById: taskById, phaseTasks: phaseTasks,
    addCustomTask: addCustomTask, deleteCustomTask: deleteCustomTask,
    meta: meta, setMeta: setMeta, toggleDone: toggleDone, toggleDod: toggleDod,
    addSprint: addSprint, updateSprint: updateSprint, deleteSprint: deleteSprint,
    stats: stats, phaseStats: phaseStats,
    addFile: addFile, listFiles: listFiles, listAllFiles: listAllFiles,
    fileCounts: fileCounts, deleteFile: deleteFile, deleteProjectFiles: deleteProjectFiles,
    openFile: openFile, downloadFile: downloadFile,
    addLink: addLink, removeLink: removeLink,
    addResponse: addResponse, listResponses: listResponses,
    getResponse: getResponse, deleteResponse: deleteResponse,
    exportJSON: exportJSON, importJSON: importJSON, exportCSV: exportCSV
  };
})();

try{window.__bootStage='store-loaded';}catch(e){}
