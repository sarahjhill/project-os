/* =====================================================================
   PROJECT OS — UI
   ===================================================================== */
(function () {
  'use strict';

  var S = window.Store;
  var state = S.load();
  var view = 'dashboard';
  var openTaskId = null;
  var fileCountMap = {};
  var filters = { q: '', phase: '', status: '', pri: '', hideDone: false };

  var STATUSES = [
    { k: 'todo', label: 'To do' },
    { k: 'doing', label: 'In progress' },
    { k: 'blocked', label: 'Blocked' },
    { k: 'review', label: 'In review' },
    { k: 'done', label: 'Done' }
  ];
  var PRI = { 1: 'Critical', 2: 'High', 3: 'Medium', 4: 'Low' };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function bytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(0) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }
  function ext(name) {
    var m = /\.([a-z0-9]+)$/i.exec(name || '');
    return m ? m[1].toUpperCase().slice(0, 4) : 'FILE';
  }

  /* ================= Markdown ================= */
  function inline(t) {
    return esc(t)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
      .replace(/~~([^~]+)~~/g, '<del>$1</del>')
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  function md(src) {
    var lines = String(src || '').replace(/\r/g, '').split('\n');
    var out = [], i = 0;
    function flushList(tag) { if (tag) out.push('</' + tag + '>'); }
    var listTag = null;

    while (i < lines.length) {
      var L = lines[i];

      // fenced code (~~~ or ```)
      if (/^\s*(~~~|```)/.test(L)) {
        var fence = /^\s*(~~~|```)/.exec(L)[1];
        var buf = []; i++;
        while (i < lines.length && lines[i].indexOf(fence) !== 0) { buf.push(lines[i]); i++; }
        i++;
        if (listTag) { flushList(listTag); listTag = null; }
        out.push('<pre><code>' + esc(buf.join('\n')) + '</code></pre>');
        continue;
      }
      // table
      if (/^\s*\|/.test(L) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
        if (listTag) { flushList(listTag); listTag = null; }
        var head = L.split('|').slice(1, -1).map(function (c) { return c.trim(); });
        i += 2;
        var body = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) {
          body.push(lines[i].split('|').slice(1, -1).map(function (c) { return c.trim(); }));
          i++;
        }
        out.push('<table><thead><tr>' + head.map(function (h) { return '<th>' + inline(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          body.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + inline(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
          '</tbody></table>');
        continue;
      }
      // heading
      var h = /^(#{1,4})\s+(.*)$/.exec(L);
      if (h) {
        if (listTag) { flushList(listTag); listTag = null; }
        out.push('<h' + h[1].length + '>' + inline(h[2]) + '</h' + h[1].length + '>');
        i++; continue;
      }
      // hr
      if (/^\s*---+\s*$/.test(L)) {
        if (listTag) { flushList(listTag); listTag = null; }
        out.push('<hr>'); i++; continue;
      }
      // blockquote
      if (/^\s*>\s?/.test(L)) {
        if (listTag) { flushList(listTag); listTag = null; }
        var q = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) { q.push(lines[i].replace(/^\s*>\s?/, '')); i++; }
        out.push('<blockquote>' + md(q.join('\n')) + '</blockquote>');
        continue;
      }
      // list items (incl. checkboxes)
      var li = /^(\s*)([-*+]|\d+\.)\s+(.*)$/.exec(L);
      if (li) {
        var ordered = /\d/.test(li[2]);
        var want = ordered ? 'ol' : 'ul';
        if (listTag !== want) { if (listTag) flushList(listTag); out.push('<' + want + '>'); listTag = want; }
        var txt = li[3].replace(/^\[( |x|X)\]\s*/, function (m0, c) {
          return c === ' ' ? '☐ ' : '☑ ';
        });
        out.push('<li>' + inline(txt) + '</li>');
        i++; continue;
      }
      if (!L.trim()) { if (listTag) { flushList(listTag); listTag = null; } i++; continue; }
      if (listTag) { flushList(listTag); listTag = null; }
      // paragraph
      var para = [];
      while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\s*[-*+]\s|\s*\d+\.\s|\s*\||\s*>|\s*(~~~|```)|\s*---+\s*$)/.test(lines[i])) {
        para.push(lines[i]); i++;
      }
      if (para.length) out.push('<p>' + inline(para.join(' ')) + '</p>');
      else { i++; }
    }
    if (listTag) flushList(listTag);
    return out.join('\n');
  }

  /* ================= Filtering ================= */
  function matches(t) {
    var m = S.project().tasks[t.id] || {};
    var st = m.status || 'todo';
    var pr = m.pri || t.pri;
    if (filters.phase && t.phaseId !== filters.phase) return false;
    if (filters.status && st !== filters.status) return false;
    if (filters.pri && String(pr) !== filters.pri) return false;
    if (filters.hideDone && st === 'done') return false;
    if (filters.q) {
      var hay = [t.title, t.why, t.role, (t.how || []).join(' '), (t.deliver || []).join(' '),
      (t.tools || []).join(' '), (t.dod || []).join(' '), m.notes || ''].join(' ').toLowerCase();
      if (hay.indexOf(filters.q.toLowerCase()) === -1) return false;
    }
    return true;
  }

  /* ================= Chrome ================= */
  function renderProjectSelect() {
    var sel = $('#projectSelect');
    sel.innerHTML = S.projectList().map(function (p) {
      return '<option value="' + p.id + '"' + (p.id === state.activeId ? ' selected' : '') + '>' +
        esc(p.name) + (p.client ? ' — ' + esc(p.client) : '') + '</option>';
    }).join('');
  }
  function renderPhaseFilter() {
    $('#filterPhase').innerHTML = '<option value="">All phases</option>' +
      window.PHASES.map(function (p) {
        return '<option value="' + p.id + '"' + (filters.phase === p.id ? ' selected' : '') + '>' +
          p.num + '. ' + esc(p.short) + '</option>';
      }).join('');
  }

  /* ================= Views ================= */
  function render() {
    $('#toolbar').style.display = (view === 'dashboard' || view === 'docs' || view === 'files') ? 'none' : 'flex';
    var main = $('#main');
    if (view === 'dashboard') main.innerHTML = viewDashboard();
    else if (view === 'phases') main.innerHTML = viewPhases();
    else if (view === 'board') main.innerHTML = viewBoard();
    else if (view === 'sprints') main.innerHTML = viewSprints();
    else if (view === 'files') { main.innerHTML = '<div class="empty">Loading files…</div>'; viewFiles(); }
    else if (view === 'docs') main.innerHTML = viewDocs();
    if (view === 'board') wireBoard();
  }

  /* ---- Dashboard ---- */
  function viewDashboard() {
    var st = S.stats(), p = S.project();
    var nextUp = S.allTasks().filter(function (t) {
      var m = p.tasks[t.id] || {}; return (m.status || 'todo') !== 'done';
    }).sort(function (a, b) {
      var ma = p.tasks[a.id] || {}, mb = p.tasks[b.id] || {};
      return (a.phaseNum - b.phaseNum) || ((ma.pri || a.pri) - (mb.pri || b.pri));
    }).slice(0, 6);

    var blocked = S.allTasks().filter(function (t) { return (p.tasks[t.id] || {}).status === 'blocked'; });
    var doing = S.allTasks().filter(function (t) { return (p.tasks[t.id] || {}).status === 'doing'; });

    var h = '';
    h += '<div class="grid k4">' +
      statCard(st.pct + '%', 'Overall complete', st.done + ' of ' + st.total + ' tasks') +
      statCard(String(doing.length), 'In progress', blocked.length + ' blocked') +
      statCard(st.ptsDone + '/' + st.pts, 'Story points', 'delivered') +
      statCard(Math.round(st.hrs - st.hrsDone) + 'h', 'Effort remaining', 'of ' + Math.round(st.hrs) + 'h estimated') +
      '</div>';

    h += '<h2 class="section">Phase progress</h2><div class="card">';
    window.PHASES.forEach(function (ph) {
      var ps = S.phaseStats(ph.id);
      h += '<div style="display:flex;align-items:center;gap:14px;margin-bottom:11px">' +
        '<div style="width:150px;flex:0 0 auto"><strong style="font-size:13px">' + ph.num + '. ' + esc(ph.short) + '</strong></div>' +
        '<div class="bar' + (ps.pct === 100 ? ' ok' : '') + '" style="flex:1"><span style="width:' + ps.pct + '%"></span></div>' +
        '<div class="tiny muted" style="width:64px;text-align:right">' + ps.done + '/' + ps.total + '</div>' +
        '</div>';
    });
    h += '</div>';

    h += '<div class="grid k2" style="margin-top:22px">';
    h += '<div class="card"><h2 class="section" style="margin-top:0">Next up</h2>' +
      (nextUp.length ? nextUp.map(taskRow).join('') : '<p class="muted tiny">Everything is done. Have a cup of tea.</p>') + '</div>';
    h += '<div class="card"><h2 class="section" style="margin-top:0">Attention</h2>' +
      (doing.length ? '<p class="tiny muted" style="margin:0 0 6px">In progress</p>' + doing.map(taskRow).join('') : '') +
      (blocked.length ? '<p class="tiny muted" style="margin:10px 0 6px">Blocked</p>' + blocked.map(taskRow).join('') : '') +
      (!doing.length && !blocked.length ? '<p class="muted tiny">Nothing in flight. Start a task from the Process tab.</p>' : '') +
      '</div>';
    h += '</div>';

    h += '<h2 class="section">How to use this</h2><div class="card md">' + md(
      'Work top to bottom through **Process**. Open any task to see why it exists, exactly how to do it, ' +
      'what it produces, and the templates attached to it. Drop your own files onto a task ' +
      '(proposals, research notes, exports) and they stay attached to it.\n\n' +
      '- **Process** — the full 12-phase method, guidance per task\n' +
      '- **Board** — drag tasks between statuses\n' +
      '- **Sprints** — group tasks into sprints with a goal and a points capacity\n' +
      '- **Files** — everything you have attached, in one place\n' +
      '- **Templates** — 60+ documents: questionnaire, proposal, SOW, research scripts, checklists, runbooks\n\n' +
      'Everything saves to this browser automatically. Use **⋯ → Export backup** regularly, and to move between machines.'
    ) + '</div>';
    return h;
  }
  function statCard(big, label, sub) {
    return '<div class="card"><div class="stat">' + esc(big) + '</div><div class="stat-label">' + esc(label) + '</div>' +
      (sub ? '<div class="tiny muted" style="margin-top:6px">' + esc(sub) + '</div>' : '') + '</div>';
  }

  /* ---- Task row ---- */
  function taskRow(t) {
    var m = S.project().tasks[t.id] || {};
    var st = m.status || 'todo';
    var pr = m.pri || t.pri;
    var fc = fileCountMap[t.id] || 0;
    var links = (m.links || []).length;
    return '<div class="task' + (st === 'done' ? ' is-done' : '') + '" data-task="' + t.id + '">' +
      '<div class="tick" data-tick="' + t.id + '" role="checkbox" aria-checked="' + (st === 'done') + '" tabindex="0">✓</div>' +
      '<div class="task-main">' +
      '<p class="task-title">' + esc(t.title) + '</p>' +
      '<p class="task-sub">' +
      (t.role ? '<span>' + esc(t.role) + '</span>' : '') +
      (t.est ? '<span>' + t.est + 'h</span>' : '') +
      ((m.pts != null ? m.pts : t.pts) ? '<span>' + (m.pts != null ? m.pts : t.pts) + ' pts</span>' : '') +
      (m.due ? '<span>due ' + esc(m.due) + '</span>' : '') +
      (fc ? '<span class="attach-dot">📎 ' + fc + '</span>' : '') +
      (links ? '<span class="attach-dot">🔗 ' + links + '</span>' : '') +
      ((t.docs || []).length ? '<span>📄 ' + t.docs.length + '</span>' : '') +
      '</p></div>' +
      '<div class="task-tags">' +
      '<span class="pill p' + pr + '">' + PRI[pr] + '</span>' +
      '<span class="pill ' + st + '">' + statusLabel(st) + '</span>' +
      '</div></div>';
  }
  function statusLabel(k) {
    for (var i = 0; i < STATUSES.length; i++) if (STATUSES[i].k === k) return STATUSES[i].label;
    return k;
  }

  /* ---- Process ---- */
  function viewPhases() {
    var h = '';
    var any = false;
    window.PHASES.forEach(function (ph) {
      var ts = S.phaseTasks(ph.id).filter(matches);
      var ps = S.phaseStats(ph.id);
      var open = state.openPhases[ph.id] || (filters.q && ts.length);
      if (ts.length) any = true;
      if (!ts.length && (filters.q || filters.status || filters.pri || filters.phase)) return;
      h += '<section class="phase' + (open ? ' open' : '') + (ps.pct === 100 ? ' complete' : '') + '" data-phase="' + ph.id + '">' +
        '<div class="phase-head" data-toggle="' + ph.id + '">' +
        '<div class="phase-num">' + (ps.pct === 100 ? '✓' : ph.num) + '</div>' +
        '<div class="phase-title"><h3>' + esc(ph.name) + '</h3><p>' + esc(ph.goal) + '</p></div>' +
        '<div class="phase-meta">' +
        '<div class="phase-prog"><div class="bar' + (ps.pct === 100 ? ' ok' : '') + '"><span style="width:' + ps.pct + '%"></span></div>' +
        '<div class="tiny muted" style="margin-top:4px;text-align:right">' + ps.done + '/' + ps.total + '</div></div>' +
        '<span class="chev">▶</span></div></div>' +
        '<div class="phase-body">' +
        '<div class="exit-crit"><strong>Phase is done when</strong><ul>' +
        ph.exit.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul></div>' +
        ts.map(taskRow).join('') +
        '<button class="btn sm btn-ghost" data-addtask="' + ph.id + '" style="margin-top:6px">+ Add your own task</button>' +
        '</div></section>';
    });
    if (!any) h += '<div class="empty">No tasks match those filters.</div>';
    return h;
  }

  /* ---- Board ---- */
  function viewBoard() {
    var p = S.project();
    var h = '<div class="board">';
    STATUSES.forEach(function (s) {
      var ts = S.allTasks().filter(function (t) {
        var m = p.tasks[t.id] || {};
        return (m.status || 'todo') === s.k && matches(t);
      });
      h += '<div class="col" data-col="' + s.k + '">' +
        '<div class="col-head"><h3>' + s.label + '</h3><span class="col-count">' + ts.length + '</span></div>' +
        ts.map(function (t) {
          var m = p.tasks[t.id] || {};
          var pr = m.pri || t.pri;
          var fc = fileCountMap[t.id] || 0;
          return '<div class="bcard" draggable="true" data-task="' + t.id + '">' +
            '<h4>' + esc(t.title) + '</h4><div class="bmeta">' +
            '<span class="pill p' + pr + '">' + PRI[pr] + '</span>' +
            '<span class="pill plain">P' + t.phaseNum + '</span>' +
            ((m.pts != null ? m.pts : t.pts) ? '<span class="pill plain">' + (m.pts != null ? m.pts : t.pts) + 'pt</span>' : '') +
            (fc ? '<span class="pill plain">📎' + fc + '</span>' : '') +
            '</div></div>';
        }).join('') +
        '</div>';
    });
    return h + '</div>';
  }
  function wireBoard() {
    var dragId = null;
    $$('.bcard').forEach(function (c) {
      c.addEventListener('dragstart', function (e) {
        dragId = c.dataset.task; c.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        try { e.dataTransfer.setData('text/plain', dragId); } catch (x) { }
      });
      c.addEventListener('dragend', function () { c.classList.remove('dragging'); dragId = null; });
    });
    $$('.col').forEach(function (col) {
      col.addEventListener('dragover', function (e) { e.preventDefault(); col.classList.add('dragover'); });
      col.addEventListener('dragleave', function () { col.classList.remove('dragover'); });
      col.addEventListener('drop', function (e) {
        e.preventDefault(); col.classList.remove('dragover');
        var id = dragId || e.dataTransfer.getData('text/plain');
        if (id) { S.setMeta(id, { status: col.dataset.col }); render(); }
      });
    });
  }

  /* ---- Sprints ---- */
  function viewSprints() {
    var p = S.project();
    var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px">' +
      '<div><strong>Sprints</strong> <span class="tiny muted">— capacity ' + p.capacity + ' pts, ' + p.sprintLength + ' days</span></div>' +
      '<div style="display:flex;gap:8px"><button class="btn sm" id="sprintSettings">Settings</button>' +
      '<button class="btn btn-primary sm" id="newSprint">+ New sprint</button></div></div>';

    p.sprints.forEach(function (s) {
      var ts = S.allTasks().filter(function (t) { return (p.tasks[t.id] || {}).sprint === s.id; });
      var pts = 0, donePts = 0, done = 0;
      ts.forEach(function (t) {
        var m = p.tasks[t.id] || {};
        var v = (m.pts != null ? m.pts : t.pts) || 0;
        pts += v;
        if (m.status === 'done') { donePts += v; done++; }
      });
      var pct = pts ? Math.round(donePts / pts * 100) : 0;
      h += '<div class="sprint" data-sprint="' + s.id + '">' +
        '<div class="sprint-head"><div style="flex:1;min-width:200px">' +
        '<h3>' + esc(s.name) + (s.closed ? ' <span class="pill done">Closed</span>' : '') + '</h3>' +
        '<p class="goal">' + (s.goal ? esc(s.goal) : 'No sprint goal set — add one.') + '</p>' +
        '<p class="tiny muted" style="margin:5px 0 0">' + esc(s.start || '') + (s.end ? ' → ' + esc(s.end) : '') + '</p>' +
        '</div><div class="capacity">' +
        '<div><strong style="font-size:17px;color:var(--text)">' + donePts + '/' + pts + '</strong> pts</div>' +
        '<div>' + done + '/' + ts.length + ' tasks</div>' +
        (pts > p.capacity ? '<div style="color:var(--danger)">over capacity</div>' : '') +
        '<div style="margin-top:7px;display:flex;gap:6px">' +
        '<button class="btn sm" data-editsprint="' + s.id + '">Edit</button>' +
        '<button class="btn sm" data-assign="' + s.id + '">Add tasks</button>' +
        '</div></div></div>' +
        '<div class="bar' + (pct === 100 ? ' ok' : '') + '" style="margin:12px 0"><span style="width:' + pct + '%"></span></div>' +
        (ts.length ? ts.map(taskRow).join('') : '<p class="tiny muted">No tasks assigned yet.</p>') +
        '</div>';
    });

    var backlog = S.allTasks().filter(function (t) {
      var m = p.tasks[t.id] || {};
      return !m.sprint && (m.status || 'todo') !== 'done' && matches(t);
    });
    h += '<h2 class="section">Backlog <span class="tiny muted">(' + backlog.length + ' unassigned)</span></h2><div class="card">' +
      (backlog.length ? backlog.map(taskRow).join('') : '<p class="tiny muted">Backlog is empty.</p>') + '</div>';
    return h;
  }

  /* ---- Files ---- */
  function viewFiles() {
    S.listAllFiles().then(function (all) {
      var p = S.project();
      var byTask = {};
      all.forEach(function (f) { (byTask[f.taskId] = byTask[f.taskId] || []).push(f); });

      var links = [];
      Object.keys(p.tasks).forEach(function (tid) {
        (p.tasks[tid].links || []).forEach(function (l) { links.push({ taskId: tid, link: l }); });
      });

      var h = '<h2 class="section" style="margin-top:0">Attached files <span class="tiny muted">(' + all.length + ')</span></h2>';
      if (!all.length) {
        h += '<div class="card"><p class="muted tiny" style="margin:0">Nothing attached yet. Open any task and drop files onto it — proposals, research notes, exports, signed documents. They stay attached to that task.</p></div>';
      } else {
        h += '<div class="card" style="padding:6px 6px 0"><table class="filetable"><thead><tr>' +
          '<th>File</th><th>Attached to</th><th>Size</th><th>Added</th><th></th></tr></thead><tbody>';
        all.sort(function (a, b) { return b.added.localeCompare(a.added); }).forEach(function (f) {
          var t = S.taskById(f.taskId);
          h += '<tr><td><strong>' + esc(f.name) + '</strong></td>' +
            '<td class="muted">' + (t ? esc(t.phaseNum + '. ' + t.title) : 'deleted task') + '</td>' +
            '<td class="muted">' + bytes(f.size) + '</td>' +
            '<td class="muted">' + esc(f.added.slice(0, 10)) + '</td>' +
            '<td style="white-space:nowrap">' +
            '<button class="linkbtn" data-openfile="' + f.id + '">Open</button> · ' +
            '<button class="linkbtn" data-dlfile="' + f.id + '">Download</button>' +
            (t ? ' · <button class="linkbtn" data-gototask="' + f.taskId + '">Task</button>' : '') +
            '</td></tr>';
        });
        h += '</tbody></table></div>';
      }

      h += '<h2 class="section">Linked documents <span class="tiny muted">(' + links.length + ')</span></h2>';
      if (!links.length) {
        h += '<div class="card"><p class="muted tiny" style="margin:0">No links yet. Open a task and add a link to a Google Doc, Figma file, Notion page or repo.</p></div>';
      } else {
        h += '<div class="card" style="padding:6px 6px 0"><table class="filetable"><thead><tr><th>Link</th><th>Attached to</th><th></th></tr></thead><tbody>';
        links.forEach(function (row) {
          var t = S.taskById(row.taskId);
          h += '<tr><td><a href="' + esc(row.link.url) + '" target="_blank" rel="noopener">' + esc(row.link.label) + '</a></td>' +
            '<td class="muted">' + (t ? esc(t.phaseNum + '. ' + t.title) : '—') + '</td>' +
            '<td>' + (t ? '<button class="linkbtn" data-gototask="' + row.taskId + '">Task</button>' : '') + '</td></tr>';
        });
        h += '</tbody></table></div>';
      }

      h += '<p class="tiny muted" style="margin-top:18px">Files are stored inside this browser (IndexedDB) for this site only. ' +
        'They are not uploaded anywhere. Use <strong>⋯ → Export backup</strong> to save your task data; ' +
        'keep original copies of important documents in your own folders too.</p>';
      $('#main').innerHTML = h;
    });
  }

  /* ---- Docs ---- */
  function viewDocs() {
    var cats = {};
    Object.keys(window.DOCS).forEach(function (k) {
      var d = window.DOCS[k];
      (cats[d.cat] = cats[d.cat] || []).push({ id: k, doc: d });
    });
    var order = ['Sales', 'Legal', 'Delivery', 'Research', 'Strategy', 'Design', 'Handoff', 'Dev', 'Backend', 'Agile', 'QA', 'Launch', 'Growth'];
    var keys = order.filter(function (k) { return cats[k]; })
      .concat(Object.keys(cats).filter(function (k) { return order.indexOf(k) === -1; }));
    var nForms = window.FORMS ? Object.keys(window.FORMS).length : 0;
    var h = '<p class="muted tiny" style="margin:0 0 16px">' + Object.keys(window.DOCS).length +
      ' ready-to-use templates. Click to read, then copy or download as Markdown. ' +
      (nForms ? '<strong>' + nForms + '</strong> of them can be turned into a form you send to a client — ' +
        'look for the <span style="color:var(--accent);font-weight:700">SENDABLE</span> tag.' : '') + '</p>';
    keys.forEach(function (c) {
      h += '<h2 class="section">' + esc(c) + '</h2><div class="doclist">';
      cats[c].forEach(function (x) {
        var send = window.FormKit && window.FormKit.has(x.id);
        h += '<div class="doccard' + (send ? ' sendable' : '') + '" data-doc="' + x.id + '">' +
          '<div class="cat">' + esc(c) + '</div><h4>' + esc(x.doc.title) + '</h4>' +
          (send ? '<span class="formtag">Sendable form</span>' : '') + '</div>';
      });
      h += '</div>';
    });
    return h;
  }

  /* ================= Drawer ================= */
  function openTask(id) {
    var t = S.taskById(id);
    if (!t) return;
    openTaskId = id;
    var m = S.meta(id);
    var p = S.project();

    var h = '<div class="drawer-head">' +
      '<button class="btn btn-ghost icon drawer-close" id="drawerClose" aria-label="Close">✕</button>' +
      '<div class="crumb">Phase ' + t.phaseNum + ' · ' + esc(t.phaseName) + '</div>' +
      '<h2>' + esc(t.title) + '</h2>' +
      '<div class="chiprow" style="margin-top:10px">' +
      (t.role ? '<span class="pill plain">' + esc(t.role) + '</span>' : '') +
      (t.est ? '<span class="pill plain">~' + t.est + 'h</span>' : '') +
      '<span class="pill ' + (m.status || 'todo') + '">' + statusLabel(m.status || 'todo') + '</span>' +
      '<span class="pill p' + (m.pri || t.pri) + '">' + PRI[m.pri || t.pri] + '</span>' +
      '</div></div><div class="drawer-body">';

    /* controls */
    h += '<div class="dsec"><div class="fieldrow">' +
      field('Status', '<select class="select" data-f="status">' + STATUSES.map(function (s) {
        return '<option value="' + s.k + '"' + ((m.status || 'todo') === s.k ? ' selected' : '') + '>' + s.label + '</option>';
      }).join('') + '</select>') +
      field('Priority', '<select class="select" data-f="pri">' + [1, 2, 3, 4].map(function (n) {
        return '<option value="' + n + '"' + ((m.pri || t.pri) === n ? ' selected' : '') + '>' + PRI[n] + '</option>';
      }).join('') + '</select>') +
      field('Points', '<input class="input" type="number" min="0" max="21" data-f="pts" value="' + (m.pts != null ? m.pts : (t.pts || 0)) + '">') +
      field('Due', '<input class="input" type="date" data-f="due" value="' + esc(m.due || '') + '">') +
      field('Sprint', '<select class="select" data-f="sprint"><option value="">Backlog</option>' +
        p.sprints.map(function (s) {
          return '<option value="' + s.id + '"' + (m.sprint === s.id ? ' selected' : '') + '>' + esc(s.name) + '</option>';
        }).join('') + '</select>') +
      '</div></div>';

    if (t.why) h += '<div class="dsec"><h4>Why this matters</h4><div class="why">' + esc(t.why) + '</div></div>';

    if ((t.how || []).length) {
      h += '<div class="dsec"><h4>How to do it</h4><ol class="steps">' +
        t.how.map(function (s) { return '<li>' + inline(s) + '</li>'; }).join('') + '</ol></div>';
    }
    if ((t.deliver || []).length) {
      h += '<div class="dsec"><h4>What you produce</h4><ul class="plain">' +
        t.deliver.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul></div>';
    }
    if ((t.tools || []).length) {
      h += '<div class="dsec"><h4>Suggested tools</h4><div class="chiprow">' +
        t.tools.map(function (s) { return '<span class="pill plain">' + esc(s) + '</span>'; }).join('') + '</div></div>';
    }
    if ((t.dod || []).length) {
      h += '<div class="dsec"><h4>Definition of done</h4>' +
        t.dod.map(function (s, i) {
          var on = m.dod.indexOf(i) > -1;
          return '<div class="dod-item" data-dod="' + i + '"><div class="tick" style="' +
            (on ? 'background:var(--ok);border-color:var(--ok);color:#fff' : '') + '">✓</div><div>' + esc(s) + '</div></div>';
        }).join('') + '</div>';
    }
    if ((t.docs || []).length) {
      h += '<div class="dsec"><h4>Templates for this task</h4><div class="chiprow">' +
        t.docs.map(function (d) {
          var doc = window.DOCS[d];
          return doc ? '<button class="btn sm" data-doc="' + d + '">📄 ' + esc(doc.title) + '</button>' : '';
        }).join('') + '</div></div>';
    }

    /* attachments */
    h += '<div class="dsec"><h4>Files for this task</h4>' +
      (S.filesAvailable
        ? '<div class="dropzone" id="dropzone">Drop files here, or click to choose<br><span class="tiny">Proposals, notes, exports, signed docs — kept with this task</span></div>'
        : '<div class="dropzone" id="dropzone" style="border-color:var(--warn);color:var(--warn)">File storage is unavailable in this browser<br><span class="tiny">Private/incognito mode blocks it. Use a normal window, or add a link below instead.</span></div>') +
      '<div id="fileList" style="margin-top:10px"></div></div>';

    h += '<div class="dsec"><h4>Linked documents</h4><div id="linkList"></div>' +
      '<div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap">' +
      '<input class="input" id="linkLabel" placeholder="Label (e.g. Figma file)" style="flex:1;min-width:140px">' +
      '<input class="input" id="linkUrl" placeholder="https://…" style="flex:2;min-width:180px">' +
      '<button class="btn sm" id="addLink">Add link</button></div></div>';

    h += '<div class="dsec"><h4>Notes</h4><textarea rows="5" data-f="notes" placeholder="Decisions, blockers, client answers…">' +
      esc(m.notes || '') + '</textarea></div>';

    if (t.custom) {
      h += '<div class="dsec"><button class="btn sm danger" id="delCustom">Delete this custom task</button></div>';
    }

    h += '</div>';

    var d = $('#drawer');
    d.innerHTML = h; d.hidden = false; $('#scrim').hidden = false;
    d.scrollTop = 0;
    wireDrawer(id);
    refreshFiles(id);
    refreshLinks(id);
  }
  function field(label, inner) {
    return '<div class="field"><label>' + esc(label) + '</label>' + inner + '</div>';
  }

  function wireDrawer(id) {
    var d = $('#drawer');
    $('#drawerClose').onclick = closeDrawer;

    $$('[data-f]', d).forEach(function (el) {
      var ev = (el.tagName === 'TEXTAREA' || el.type === 'text' || el.type === 'number' || el.type === 'date') ? 'input' : 'change';
      el.addEventListener(ev, function () {
        var k = el.dataset.f;
        var v = el.value;
        if (k === 'pri' || k === 'pts') v = Number(v);
        var patch = {}; patch[k] = v;
        S.setMeta(id, patch);
        if (k === 'status' || k === 'pri' || k === 'pts' || k === 'sprint') { renderKeepDrawer(id); }
      });
    });

    $$('.dod-item', d).forEach(function (el) {
      el.onclick = function () {
        S.toggleDod(id, Number(el.dataset.dod));
        var tick = $('.tick', el);
        var on = S.meta(id).dod.indexOf(Number(el.dataset.dod)) > -1;
        tick.style.cssText = on ? 'background:var(--ok);border-color:var(--ok);color:#fff' : '';
      };
    });

    $$('[data-doc]', d).forEach(function (b) {
      b.onclick = function () { showDoc(b.dataset.doc); };
    });

    var dz = $('#dropzone');
    dz.onclick = function () {
      var picker = $('#filePicker');
      picker.value = '';
      picker.onchange = function () {
        var files = Array.prototype.slice.call(picker.files);
        Promise.all(files.map(function (f) { return S.addFile(id, f); }))
          .then(function () { refreshFiles(id); refreshCounts(); })
          .catch(fileError);
      };
      picker.click();
    };
    ['dragenter', 'dragover'].forEach(function (e) {
      dz.addEventListener(e, function (ev) { ev.preventDefault(); dz.classList.add('over'); });
    });
    ['dragleave', 'drop'].forEach(function (e) {
      dz.addEventListener(e, function (ev) { ev.preventDefault(); dz.classList.remove('over'); });
    });
    dz.addEventListener('drop', function (ev) {
      var files = Array.prototype.slice.call(ev.dataTransfer.files || []);
      if (!files.length) return;
      Promise.all(files.map(function (f) { return S.addFile(id, f); }))
        .then(function () { refreshFiles(id); refreshCounts(); })
        .catch(fileError);
    });

    $('#addLink').onclick = function () {
      var u = $('#linkUrl').value.trim();
      if (!u) return;
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      S.addLink(id, $('#linkLabel').value.trim() || u, u);
      $('#linkLabel').value = ''; $('#linkUrl').value = '';
      refreshLinks(id); renderKeepDrawer(id);
    };

    var dc = $('#delCustom');
    if (dc) dc.onclick = function () {
      if (confirm('Delete this custom task?')) { S.deleteCustomTask(id); closeDrawer(); render(); }
    };
  }
  function fileError(e) {
    alert('Could not store that file.\n\n' + (e && e.message ? e.message : e) +
      '\n\nTip: if you opened this app by double-clicking index.html, some browsers block file storage. ' +
      'Run it from a local server instead (see README).');
  }

  function refreshFiles(id) {
    S.listFiles(id).then(function (files) {
      var el = $('#fileList');
      if (!el) return;
      if (!files.length) { el.innerHTML = '<p class="tiny muted" style="margin:0">No files attached yet.</p>'; return; }
      el.innerHTML = files.map(function (f) {
        return '<div class="filerow"><div class="fileicon">' + esc(ext(f.name)) + '</div>' +
          '<div class="fname" title="' + esc(f.name) + '">' + esc(f.name) + '</div>' +
          '<div class="fsize">' + bytes(f.size) + '</div>' +
          '<button class="btn sm" data-open="' + f.id + '">Open</button>' +
          '<button class="btn sm" data-dl="' + f.id + '">↓</button>' +
          '<button class="btn sm danger" data-rm="' + f.id + '">✕</button></div>';
      }).join('');
      $$('[data-open]', el).forEach(function (b) {
        b.onclick = function () { S.openFile(files.filter(function (f) { return f.id === b.dataset.open; })[0]); };
      });
      $$('[data-dl]', el).forEach(function (b) {
        b.onclick = function () { S.downloadFile(files.filter(function (f) { return f.id === b.dataset.dl; })[0]); };
      });
      $$('[data-rm]', el).forEach(function (b) {
        b.onclick = function () {
          if (!confirm('Remove this file?')) return;
          S.deleteFile(b.dataset.rm).then(function () { refreshFiles(id); refreshCounts(); });
        };
      });
    });
  }
  function refreshLinks(id) {
    var el = $('#linkList');
    if (!el) return;
    var links = S.meta(id).links || [];
    if (!links.length) { el.innerHTML = '<p class="tiny muted" style="margin:0">No links yet.</p>'; return; }
    el.innerHTML = links.map(function (l) {
      return '<div class="filerow"><div class="fileicon">🔗</div>' +
        '<a class="fname" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + '</a>' +
        '<button class="btn sm danger" data-rml="' + l.id + '">✕</button></div>';
    }).join('');
    $$('[data-rml]', el).forEach(function (b) {
      b.onclick = function () { S.removeLink(id, b.dataset.rml); refreshLinks(id); renderKeepDrawer(id); };
    });
  }

  function renderKeepDrawer(id) {
    var sc = $('#drawer').scrollTop;
    render();
    $('#drawer').scrollTop = sc;
    // refresh header chips only
    var t = S.taskById(id), m = S.meta(id);
    var chips = $('#drawer .chiprow');
    if (chips && t) {
      chips.innerHTML =
        (t.role ? '<span class="pill plain">' + esc(t.role) + '</span>' : '') +
        (t.est ? '<span class="pill plain">~' + t.est + 'h</span>' : '') +
        '<span class="pill ' + (m.status || 'todo') + '">' + statusLabel(m.status || 'todo') + '</span>' +
        '<span class="pill p' + (m.pri || t.pri) + '">' + PRI[m.pri || t.pri] + '</span>';
    }
  }

  function closeDrawer() {
    $('#drawer').hidden = true; $('#scrim').hidden = true; openTaskId = null;
  }

  /* When the app is served over http(s), pre-built form pages sit in /forms/,
     so we can offer a shareable link instead of an email attachment. */
  function hostedFormUrl(key) {
    try {
      if (!window.FormKit || !window.FormKit.has(key)) return null;
      var loc = window.location;
      if (!loc || (loc.protocol !== 'http:' && loc.protocol !== 'https:')) return null;
      var base = loc.href.split('#')[0].split('?')[0].replace(/[^/]*$/, '');
      return base + 'forms/' + key.replace(/^doc-/, '') + '.html';
    } catch (e) { return null; }
  }

  /* ================= Doc viewer ================= */
  function showDoc(key) {
    var d = window.DOCS[key];
    if (!d) return;
    var sendable = window.FormKit && window.FormKit.has(key);

    var h = '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:14px">' +
      '<h3 style="margin:0">' + esc(d.title) + '</h3>' +
      '<div style="display:flex;gap:8px;flex:0 0 auto;flex-wrap:wrap">' +
      '<button class="btn sm" id="copyDoc">Copy</button>' +
      '<button class="btn sm" id="dlDoc">Download .md</button>' +
      '<button class="btn sm" id="closeModal">Close</button></div></div>';

    if (sendable) {
      h += '<div class="sendbar">' +
        '<div class="sendbar-text"><strong>This one can be sent to a client.</strong>' +
        '<span>' + (hostedFormUrl(key)
          ? 'Send them the link, or email the file. Either way, import their answers back here.'
          : 'Generate a form they fill in on screen, then import their answers back here.') + '</span></div>' +
        '<div class="sendbar-btns">' +
        (hostedFormUrl(key) ? '<button class="btn btn-primary sm" id="copyLink">Copy shareable link</button>' : '') +
        '<button class="btn ' + (hostedFormUrl(key) ? '' : 'btn-primary ') + 'sm" id="makeForm">Create client form</button>' +
        '<button class="btn sm" id="previewForm">Preview</button>' +
        '<button class="btn sm" id="importResp">Import answers</button>' +
        '</div></div>' +
        '<div id="respArea"></div>';
    }

    h += '<div class="md">' + md(d.body) + '</div>';

    modal(h, function () {
      $('#copyDoc').onclick = function () {
        navigator.clipboard.writeText(d.body).then(function () {
          $('#copyDoc').textContent = 'Copied ✓';
          setTimeout(function () { var b = $('#copyDoc'); if (b) b.textContent = 'Copy'; }, 1600);
        });
      };
      $('#dlDoc').onclick = function () {
        var blob = new Blob([d.body], { type: 'text/markdown' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = key.replace(/^doc-/, '') + '.md';
        document.body.appendChild(a); a.click(); a.remove();
      };

      if (!sendable) return;

      var link = hostedFormUrl(key);
      if (link) {
        $('#copyLink').onclick = function () {
          navigator.clipboard.writeText(link).then(function () {
            var b = $('#copyLink');
            b.textContent = 'Link copied ✓';
            setTimeout(function () { var x = $('#copyLink'); if (x) x.textContent = 'Copy shareable link'; }, 2600);
          }, function () { window.prompt('Copy this link:', link); });
        };
      }

      $('#makeForm').onclick = function () {
        window.FormKit.download(key);
        var b = $('#makeForm');
        b.textContent = 'Saved to Downloads ✓';
        setTimeout(function () { var x = $('#makeForm'); if (x) x.textContent = 'Create client form'; }, 3000);
      };

      $('#previewForm').onclick = function () {
        var html = window.FormKit.build(key);
        var w = window.open('', '_blank');
        if (!w) { alert('Your browser blocked the preview window. Allow pop-ups for this page.'); return; }
        w.document.open(); w.document.write(html); w.document.close();
      };

      $('#importResp').onclick = function () {
        var picker = $('#importPicker');
        picker.value = '';
        picker.onchange = function () {
          var files = Array.prototype.slice.call(picker.files || []);
          if (!files.length) return;
          var ok = 0, bad = [];
          var pending = files.length;
          files.forEach(function (f) {
            var r = new FileReader();
            r.onload = function () {
              try {
                var payload = window.FormKit.parseResponse(r.result);
                S.addResponse(payload.formId || key, payload);
                ok++;
              } catch (err) { bad.push(f.name + ' — ' + err.message); }
              if (--pending === 0) {
                renderResponses(key);
                if (bad.length) alert('Imported ' + ok + '.\n\nCould not read:\n' + bad.join('\n'));
              }
            };
            r.readAsText(f);
          });
        };
        picker.click();
      };

      renderResponses(key);
    });
  }

  function renderResponses(key) {
    var el = $('#respArea');
    if (!el) return;
    var list = S.listResponses(key);
    if (!list.length) {
      el.innerHTML = '<p class="tiny muted" style="margin:0 0 18px">No answers received yet. ' +
        'When a client emails their file back, use <strong>Import answers</strong> above.</p>';
      return;
    }
    el.innerHTML = '<h4 class="respheading">Answers received (' + list.length + ')</h4>' +
      list.slice().sort(function (a, b) { return b.completed.localeCompare(a.completed); })
        .map(function (r) {
          return '<div class="filerow"><div class="fileicon">✓</div>' +
            '<div class="fname"><strong>' + esc(r.from) + '</strong>' +
            '<span class="muted tiny"> · ' + esc(new Date(r.completed).toLocaleDateString()) + '</span></div>' +
            '<button class="btn sm" data-viewresp="' + r.id + '">Read</button>' +
            '<button class="btn sm" data-dlresp="' + r.id + '">↓</button>' +
            '<button class="btn sm danger" data-rmresp="' + r.id + '">✕</button></div>';
        }).join('') + '<div style="height:16px"></div>';

    $$('[data-viewresp]', el).forEach(function (b) {
      b.onclick = function () { showResponse(b.dataset.viewresp, key); };
    });
    $$('[data-dlresp]', el).forEach(function (b) {
      b.onclick = function () {
        var r = S.getResponse(b.dataset.dlresp);
        if (!r) return;
        var lines = [r.formTitle, 'From: ' + r.from,
        'Completed: ' + new Date(r.completed).toLocaleString(), ''];
        var cur = '';
        r.answers.forEach(function (a) {
          if (a.section !== cur) { cur = a.section; lines.push('', '## ' + cur, ''); }
          lines.push('**' + a.label + '**', (a.value || '_(not answered)_'), '');
        });
        var blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
        var el2 = document.createElement('a');
        el2.href = URL.createObjectURL(blob);
        el2.download = (r.from || 'answers').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.md';
        document.body.appendChild(el2); el2.click(); el2.remove();
      };
    });
    $$('[data-rmresp]', el).forEach(function (b) {
      b.onclick = function () {
        if (!confirm('Delete these answers? This cannot be undone.')) return;
        S.deleteResponse(key, b.dataset.rmresp);
        renderResponses(key);
      };
    });
  }

  function showResponse(id, docKey) {
    var r = S.getResponse(id);
    if (!r) return;
    var cur = '', rows = '';
    r.answers.forEach(function (a) {
      if (a.section !== cur) {
        cur = a.section;
        rows += '<tr><th colspan="2" style="background:var(--sunken)">' + esc(cur) + '</th></tr>';
      }
      rows += '<tr><td style="width:42%;vertical-align:top"><strong>' + esc(a.label) + '</strong></td>' +
        '<td>' + (a.value ? esc(a.value).replace(/\n/g, '<br>')
          : '<span class="muted tiny">not answered</span>') + '</td></tr>';
    });
    modal('<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:6px">' +
      '<div><h3 style="margin:0">' + esc(r.from) + '</h3>' +
      '<p class="tiny muted" style="margin:4px 0 0">' + esc(r.formTitle) + ' · completed ' +
      esc(new Date(r.completed).toLocaleString()) + '</p></div>' +
      '<div style="display:flex;gap:8px;flex:0 0 auto">' +
      '<button class="btn sm" id="backToDoc">Back</button>' +
      '<button class="btn sm" id="closeModal">Close</button></div></div>' +
      '<div class="md" style="margin-top:14px"><table>' + rows + '</table></div>',
      function () {
        $('#backToDoc').onclick = function () { showDoc(docKey); };
      });
  }

  /* ================= Modal ================= */
  function modal(html, after) {
    $('#modal').innerHTML = html;
    $('#modalWrap').hidden = false;
    var c = $('#closeModal');
    if (c) c.onclick = closeModal;
    if (after) after();
  }
  function closeModal() { $('#modalWrap').hidden = true; $('#modal').innerHTML = ''; }

  /* ================= Actions ================= */
  function refreshCounts() {
    // Never let file storage block the interface: paint now, update counts later.
    render();
    return S.fileCounts().then(function (m) {
      var changed = JSON.stringify(m) !== JSON.stringify(fileCountMap);
      fileCountMap = m;
      if (changed) render();
    }).catch(function () { });
  }

  function newProjectModal() {
    modal('<h3>New project</h3>' +
      '<div class="fieldrow">' +
      field('Project name', '<input class="input" id="npName" placeholder="Bright Salon booking system">') +
      field('Client', '<input class="input" id="npClient" placeholder="Bright Salon Ltd">') +
      '</div>' +
      '<p class="tiny muted" style="margin-top:12px">You get a fresh copy of the full 12-phase process with its own progress, files and sprints.</p>' +
      '<div class="actions"><button class="btn" id="closeModal">Cancel</button>' +
      '<button class="btn btn-primary" id="npGo">Create project</button></div>', function () {
        $('#npName').focus();
        $('#npGo').onclick = function () {
          S.addProject($('#npName').value.trim() || 'New project', $('#npClient').value.trim());
          closeModal(); renderProjectSelect(); refreshCounts();
        };
      });
  }

  function addTaskModal(phaseId) {
    var ph = window.PHASES.filter(function (p) { return p.id === phaseId; })[0];
    modal('<h3>Add task to ' + esc(ph.name) + '</h3>' +
      '<div class="fieldrow">' +
      field('Title', '<input class="input" id="ctTitle" placeholder="Write the migration script">') +
      field('Role', '<input class="input" id="ctRole" placeholder="Backend">') +
      field('Est. hours', '<input class="input" type="number" id="ctEst" value="2">') +
      field('Points', '<input class="input" type="number" id="ctPts" value="3">') +
      field('Priority', '<select class="select" id="ctPri"><option value="1">Critical</option><option value="2">High</option><option value="3" selected>Medium</option><option value="4">Low</option></select>') +
      '</div>' +
      '<div class="field" style="margin-top:12px"><label>Why it matters</label><textarea id="ctWhy" rows="2"></textarea></div>' +
      '<div class="field" style="margin-top:10px"><label>How to do it (one step per line)</label><textarea id="ctHow" rows="4"></textarea></div>' +
      '<div class="field" style="margin-top:10px"><label>Definition of done (one per line)</label><textarea id="ctDod" rows="3"></textarea></div>' +
      '<div class="actions"><button class="btn" id="closeModal">Cancel</button>' +
      '<button class="btn btn-primary" id="ctGo">Add task</button></div>', function () {
        $('#ctTitle').focus();
        $('#ctGo').onclick = function () {
          var title = $('#ctTitle').value.trim();
          if (!title) { $('#ctTitle').focus(); return; }
          S.addCustomTask(phaseId, {
            title: title, role: $('#ctRole').value.trim(), est: $('#ctEst').value,
            pts: $('#ctPts').value, pri: $('#ctPri').value,
            why: $('#ctWhy').value.trim(), how: $('#ctHow').value, dod: $('#ctDod').value
          });
          state.openPhases[phaseId] = true;
          closeModal(); render();
        };
      });
  }

  function sprintModal(existing) {
    var s = existing || { name: '', goal: '', start: S.today(), end: '' };
    modal('<h3>' + (existing ? 'Edit sprint' : 'New sprint') + '</h3>' +
      '<div class="fieldrow">' +
      field('Name', '<input class="input" id="spName" value="' + esc(s.name) + '" placeholder="Sprint 1">') +
      field('Start', '<input class="input" type="date" id="spStart" value="' + esc(s.start) + '">') +
      field('End', '<input class="input" type="date" id="spEnd" value="' + esc(s.end) + '">') +
      '</div>' +
      '<div class="field" style="margin-top:12px"><label>Sprint goal (one sentence, user-visible outcome)</label>' +
      '<textarea id="spGoal" rows="2" placeholder="A customer can register, browse and book an appointment on mobile.">' + esc(s.goal) + '</textarea></div>' +
      '<div class="actions">' +
      (existing ? '<button class="btn danger" id="spDel">Delete</button>' : '') +
      '<button class="btn" id="closeModal">Cancel</button>' +
      '<button class="btn btn-primary" id="spGo">Save</button></div>', function () {
        $('#spGo').onclick = function () {
          var data = {
            name: $('#spName').value.trim() || 'Sprint',
            goal: $('#spGoal').value.trim(),
            start: $('#spStart').value, end: $('#spEnd').value
          };
          if (existing) S.updateSprint(existing.id, data); else S.addSprint(data);
          closeModal(); render();
        };
        if (existing) $('#spDel').onclick = function () {
          if (confirm('Delete this sprint? Tasks return to the backlog.')) {
            S.deleteSprint(existing.id); closeModal(); render();
          }
        };
      });
  }

  function assignModal(sprintId) {
    var p = S.project();
    var avail = S.allTasks().filter(function (t) {
      var m = p.tasks[t.id] || {};
      return !m.sprint && (m.status || 'todo') !== 'done';
    });
    modal('<h3>Add tasks to sprint</h3>' +
      '<p class="tiny muted">Capacity is ' + p.capacity + ' points. Tick the tasks that serve the sprint goal.</p>' +
      '<div style="max-height:52vh;overflow-y:auto;margin-top:12px">' +
      avail.map(function (t) {
        var m = p.tasks[t.id] || {};
        return '<label class="filerow" style="cursor:pointer">' +
          '<input type="checkbox" value="' + t.id + '" class="assignBox">' +
          '<span class="fname">' + esc(t.title) + '</span>' +
          '<span class="pill plain">P' + t.phaseNum + '</span>' +
          '<span class="pill p' + (m.pri || t.pri) + '">' + PRI[m.pri || t.pri] + '</span>' +
          '<span class="fsize">' + ((m.pts != null ? m.pts : t.pts) || 0) + ' pts</span></label>';
      }).join('') + '</div>' +
      '<div class="actions"><span class="tiny muted" id="assignTotal" style="margin-right:auto;align-self:center"></span>' +
      '<button class="btn" id="closeModal">Cancel</button>' +
      '<button class="btn btn-primary" id="asGo">Add selected</button></div>', function () {
        function total() {
          var sum = 0;
          $$('.assignBox:checked').forEach(function (b) {
            var t = S.taskById(b.value), m = p.tasks[b.value] || {};
            sum += (m.pts != null ? m.pts : (t ? t.pts : 0)) || 0;
          });
          $('#assignTotal').innerHTML = sum + ' pts selected' +
            (sum > p.capacity ? ' <strong style="color:var(--danger)">— over capacity</strong>' : '');
        }
        $$('.assignBox').forEach(function (b) { b.onchange = total; });
        total();
        $('#asGo').onclick = function () {
          $$('.assignBox:checked').forEach(function (b) { S.setMeta(b.value, { sprint: sprintId }); });
          S.saveNow(); closeModal(); render();
        };
      });
  }

  function settingsModal() {
    var p = S.project();
    modal('<h3>Sprint settings</h3><div class="fieldrow">' +
      field('Sprint length (days)', '<input class="input" type="number" id="stLen" value="' + p.sprintLength + '">') +
      field('Capacity (points per sprint)', '<input class="input" type="number" id="stCap" value="' + p.capacity + '">') +
      '</div><p class="tiny muted" style="margin-top:12px">Use your <strong>proven</strong> velocity from the last three sprints, not your optimistic one. Leave 20% spare for bugs and feedback.</p>' +
      '<div class="actions"><button class="btn" id="closeModal">Cancel</button><button class="btn btn-primary" id="stGo">Save</button></div>',
      function () {
        $('#stGo').onclick = function () {
          p.sprintLength = Number($('#stLen').value) || 7;
          p.capacity = Number($('#stCap').value) || 20;
          S.saveNow(); closeModal(); render();
        };
      });
  }

  /* ================= Events ================= */
  document.addEventListener('click', function (e) {
    var el;

    // tabs
    el = e.target.closest('.tab');
    if (el) { view = el.dataset.view; $$('.tab').forEach(function (t) { t.classList.toggle('active', t === el); }); render(); return; }

    // phase toggle
    el = e.target.closest('[data-toggle]');
    if (el) {
      var pid = el.dataset.toggle;
      state.openPhases[pid] = !state.openPhases[pid];
      S.saveNow();
      el.parentElement.classList.toggle('open');
      return;
    }

    // tick
    el = e.target.closest('[data-tick]');
    if (el) { e.stopPropagation(); S.toggleDone(el.dataset.tick); render(); return; }

    // task open
    el = e.target.closest('[data-task]');
    if (el) { openTask(el.dataset.task); return; }

    // add custom task
    el = e.target.closest('[data-addtask]');
    if (el) { e.stopPropagation(); addTaskModal(el.dataset.addtask); return; }

    // doc card
    el = e.target.closest('.doccard');
    if (el) { showDoc(el.dataset.doc); return; }

    // sprint buttons
    if (e.target.id === 'newSprint') { sprintModal(null); return; }
    if (e.target.id === 'sprintSettings') { settingsModal(); return; }
    el = e.target.closest('[data-editsprint]');
    if (el) {
      var s = S.project().sprints.filter(function (x) { return x.id === el.dataset.editsprint; })[0];
      sprintModal(s); return;
    }
    el = e.target.closest('[data-assign]');
    if (el) { assignModal(el.dataset.assign); return; }

    // files view actions
    el = e.target.closest('[data-openfile]');
    if (el) {
      S.listAllFiles().then(function (all) {
        var f = all.filter(function (x) { return x.id === el.dataset.openfile; })[0];
        if (f) S.openFile(f);
      });
      return;
    }
    el = e.target.closest('[data-dlfile]');
    if (el) {
      S.listAllFiles().then(function (all) {
        var f = all.filter(function (x) { return x.id === el.dataset.dlfile; })[0];
        if (f) S.downloadFile(f);
      });
      return;
    }
    el = e.target.closest('[data-gototask]');
    if (el) { openTask(el.dataset.gototask); return; }

    // scrim / modal backdrop
    if (e.target.id === 'scrim') { closeDrawer(); return; }
    if (e.target.id === 'modalWrap') { closeModal(); return; }
    if (e.target.id === 'closeModal') { closeModal(); return; }

    // more menu
    if (e.target.id === 'moreBtn') { $('#moreMenu').hidden = !$('#moreMenu').hidden; return; }
    if (!e.target.closest('#moreMenu')) $('#moreMenu').hidden = true;
  });

  $('#moreMenu').addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]');
    if (!b) return;
    $('#moreMenu').hidden = true;
    var act = b.dataset.act;
    if (act === 'export') S.exportJSON();
    if (act === 'exportcsv') S.exportCSV();
    if (act === 'import') {
      var picker = $('#importPicker');
      picker.value = '';
      picker.onchange = function () {
        var f = picker.files[0]; if (!f) return;
        var r = new FileReader();
        r.onload = function () {
          try { S.importJSON(r.result); renderProjectSelect(); refreshCounts(); alert('Backup imported.'); }
          catch (err) { alert('Could not import: ' + err.message); }
        };
        r.readAsText(f);
      };
      picker.click();
    }
    if (act === 'rename') {
      var n = prompt('Project name', S.project().name);
      if (n) { S.project().name = n; S.saveNow(); renderProjectSelect(); }
    }
    if (act === 'reset') {
      if (confirm('Reset all task progress, statuses and sprints for this project? Files and links are kept.')) {
        S.resetProgress(); render();
      }
    }
    if (act === 'delete') {
      if (confirm('Delete "' + S.project().name + '" and all its data? This cannot be undone.')) {
        S.deleteProject(state.activeId); renderProjectSelect(); refreshCounts();
      }
    }
  });

  $('#projectSelect').onchange = function () { S.setActive(this.value); refreshCounts(); };
  $('#newProjectBtn').onclick = newProjectModal;
  $('#themeBtn').onclick = function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    state.theme = next; S.saveNow();
  };

  $('#search').addEventListener('input', function () { filters.q = this.value; render(); });
  $('#filterPhase').addEventListener('change', function () { filters.phase = this.value; render(); });
  $('#filterStatus').addEventListener('change', function () { filters.status = this.value; render(); });
  $('#filterPri').addEventListener('change', function () { filters.pri = this.value; render(); });
  $('#filterMine').addEventListener('change', function () { filters.hideDone = this.checked; render(); });
  $('#clearFilters').onclick = function () {
    filters = { q: '', phase: '', status: '', pri: '', hideDone: false };
    $('#search').value = ''; $('#filterPhase').value = ''; $('#filterStatus').value = '';
    $('#filterPri').value = ''; $('#filterMine').checked = false;
    render();
  };

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!$('#modalWrap').hidden) closeModal();
      else if (!$('#drawer').hidden) closeDrawer();
    }
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault(); view = view === 'dashboard' || view === 'docs' || view === 'files' ? 'phases' : view;
      $$('.tab').forEach(function (t) { t.classList.toggle('active', t.dataset.view === view); });
      render(); $('#search').focus();
    }
  });

  /* ================= Boot ================= */
  function bootError(msg, detail) {
    var el = document.getElementById('main');
    if (!el) return;
    el.innerHTML = '<div class="card" style="border-color:var(--danger)">' +
      '<h2 class="section" style="margin-top:0;color:var(--danger)">Something failed to load</h2>' +
      '<p>' + esc(msg) + '</p>' +
      (detail ? '<pre style="background:var(--sunken);padding:12px;border-radius:8px;overflow:auto;font-size:12px">' + esc(detail) + '</pre>' : '') +
      '<p class="tiny muted">Send me this message and I can fix it. Most often this means one of the files in ' +
      '<code>js/</code> or <code>css/</code> did not load — check that the whole <strong>project-os</strong> folder ' +
      'was copied, not just index.html.</p></div>';
  }

  window.addEventListener('error', function (e) {
    console.error('Project OS error:', e.error || e.message);
    var main = document.getElementById('main');
    if (main && !main.innerHTML.trim()) {
      bootError('A script error stopped the app from starting.', (e.message || '') + '\n' + (e.filename || '') + ':' + (e.lineno || ''));
    }
  });

  try {
    if (!window.PHASES || !window.PHASES.length) {
      throw new Error('Process data did not load (js/data-phases.js).');
    }
    if (!window.DOCS || !Object.keys(window.DOCS).length) {
      throw new Error('Template data did not load (js/data-docs.js).');
    }
    document.documentElement.dataset.theme = state.theme || 'light';
    renderProjectSelect();
    renderPhaseFilter();
    render();          // paint immediately — do not wait for storage
    refreshCounts();   // then decorate with file counts when available
  } catch (err) {
    bootError(err.message, err.stack);
  }
})();

try{window.__bootStage='app-loaded';}catch(e){}
