/* =====================================================================
   PROJECT OS — Clients view (owner side)
   Invite clients, decide what they see, publish an update.
   ===================================================================== */
(function () {
  'use strict';

  var S = window.Store;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function today() { return new Date().toISOString().slice(0, 10); }

  /* ---------- the client board lives inside the project ---------- */
  function board() {
    var p = S.project();
    if (!p.clientBoard) {
      p.clientBoard = {
        note: '',
        actions: [],      // { id, title, detail, due, done }
        milestones: [],   // { id, name, date, status }
        include: { progress: true, actions: true, milestones: true, files: true, answers: false },
        cloudId: ''       // the Supabase project id, once linked
      };
      S.saveNow();
    }
    var b = p.clientBoard;
    if (!b.include) b.include = { progress: true, actions: true, milestones: true, files: true, answers: false };
    if (!b.actions) b.actions = [];
    if (!b.milestones) b.milestones = [];
    return b;
  }

  /* ---------- build exactly what the client will see ---------- */
  function buildSnapshot() {
    var p = S.project(), b = board(), inc = b.include;
    var st = S.stats();

    // current phase = first with unfinished work
    var current = null;
    S.phases().forEach(function (ph) {
      if (current) return;
      var ps = S.phaseStats(ph.id);
      if (ps.done < ps.total) current = { phase: ph, ps: ps };
    });

    var payload = {
      project: { name: p.name, client: p.client || '', updated: new Date().toISOString() },
      note: b.note || '',
      sections: {
        progress: !!inc.progress, actions: !!inc.actions,
        milestones: !!inc.milestones, files: !!inc.files, answers: !!inc.answers
      }
    };

    if (inc.progress) {
      payload.progress = {
        pct: st.pct,
        phaseName: current ? current.phase.name : 'Complete',
        phaseGoal: current ? current.phase.goal : 'All planned work is finished.',
        phaseNum: current ? current.phase.num : 11,
        phaseTotal: S.phases().length,
        phasePct: current ? current.ps.pct : 100
      };
    }
    if (inc.actions) {
      payload.actions = b.actions.map(function (a) {
        return { title: a.title, detail: a.detail || '', due: a.due || '', done: !!a.done };
      });
    }
    if (inc.milestones) {
      payload.milestones = b.milestones.map(function (m) {
        return { name: m.name, date: m.date || '', status: m.status || 'planned' };
      });
    }
    if (inc.answers) {
      payload.answers = S.listResponses().map(function (r) {
        return { formTitle: r.formTitle, from: r.from, completed: r.completed, answers: r.answers };
      });
    }
    return payload;
  }

  /* ---------- view ---------- */
  function view() {
    if (!window.Cloud || !window.Cloud.configured()) {
      return '<div class="card"><h2 class="section" style="margin-top:0">Client access is not set up yet</h2>' +
        '<p class="muted">Sharing with clients needs a free Supabase account — it stores the accounts and ' +
        'the small amount of information you choose to publish.</p>' +
        '<p class="muted tiny">Follow <strong>supabase/SETUP.md</strong> in your project folder, then fill in ' +
        'the <code>supabase</code> section of <code>js/config.js</code>. Everything else in The SJH Process ' +
        'keeps working without it.</p></div>';
    }

    // The Supabase library loads asynchronously. Until it has told us whether
    // there is a session, do not claim the person is signed out.
    if (!window.Cloud.isReady()) {
      return '<div class="card" style="max-width:520px">' +
        '<p class="muted" style="margin:0">Checking your sign-in…</p></div>';
    }

    var u = window.Cloud.user();
    if (!u) {
      return '<div class="card" style="max-width:520px">' +
        '<h2 class="section" style="margin-top:0">Sign in</h2>' +
        '<p class="muted tiny">Enter your email and you will be sent a link that signs you in. ' +
        'No password to remember.</p>' +
        '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap">' +
        '<input class="input" id="siEmail" type="email" placeholder="you@example.com" style="flex:1;min-width:200px">' +
        '<button class="btn btn-primary" id="siGo">Email me a link</button></div>' +
        '<p class="tiny muted" id="siMsg" style="margin-top:12px"></p></div>';
    }

    var b = board();
    var linked = !!b.cloudId;

    var h = '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:18px">' +
      '<div><strong>Signed in as ' + esc(u.email) + '</strong>' +
      '<div class="tiny muted">' + (linked ? 'This project is synced to the cloud.' :
        'This project is local only — link it to share with a client.') + '</div></div>' +
      '<div style="display:flex;gap:8px">' +
      (linked ? '<button class="btn sm" id="publishBtn">Publish update</button>' :
        '<button class="btn btn-primary sm" id="linkBtn">Link this project</button>') +
      '<button class="btn sm" id="signOutBtn">Sign out</button></div></div>';

    if (!linked) {
      h += '<div class="card"><p class="muted" style="margin:0">Linking uploads this project to your account so ' +
        'you can invite clients. Your task notes stay private — clients only ever see the summary you publish.</p></div>';
      return h;
    }

    /* what the client sees */
    h += '<h2 class="section">What clients can see</h2><div class="card">' +
      '<p class="tiny muted" style="margin:0 0 12px">Anything ticked here is visible to <strong>every</strong> ' +
      'client invited to this project. Untick and republish to withdraw it.</p>' +
      [['progress', 'Progress and current phase'],
      ['actions', 'What you need from them'],
      ['milestones', 'Milestone dates'],
      ['files', 'Files you have shared'],
      ['answers', 'Their submitted form answers']].map(function (x) {
        return '<label class="checkline" style="margin-bottom:8px;font-size:14px">' +
          '<input type="checkbox" data-inc="' + x[0] + '"' + (b.include[x[0]] ? ' checked' : '') + '> ' +
          esc(x[1]) + '</label>';
      }).join('') +
      '<div class="field" style="margin-top:14px"><label>A short note for them (optional)</label>' +
      '<textarea id="cbNote" rows="3" placeholder="Where things are, in a sentence or two.">' +
      esc(b.note) + '</textarea></div></div>';

    /* actions */
    h += '<h2 class="section">What you need from them</h2><div class="card"><div id="actList">' +
      (b.actions.length ? b.actions.map(function (a) {
        return '<div class="filerow"><div class="fileicon">' + (a.done ? '✓' : '!') + '</div>' +
          '<div class="fname"><strong>' + esc(a.title) + '</strong>' +
          (a.detail ? '<div class="tiny muted">' + esc(a.detail) + '</div>' : '') + '</div>' +
          (a.due ? '<span class="fsize">by ' + esc(a.due) + '</span>' : '') +
          '<button class="btn sm" data-actdone="' + a.id + '">' + (a.done ? 'Reopen' : 'Done') + '</button>' +
          '<button class="btn sm danger" data-actrm="' + a.id + '">✕</button></div>';
      }).join('') : '<p class="tiny muted">Nothing outstanding.</p>') + '</div>' +
      '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">' +
      '<input class="input" id="actTitle" placeholder="Send final copy for the About page" style="flex:2;min-width:180px">' +
      '<input class="input" id="actDue" type="date" style="flex:0 0 auto">' +
      '<button class="btn sm" id="actAdd">Add</button></div></div>';

    /* milestones */
    h += '<h2 class="section">Milestones</h2><div class="card"><div id="msList">' +
      (b.milestones.length ? b.milestones.map(function (m) {
        return '<div class="filerow"><div class="fileicon">' +
          (m.status === 'done' ? '✓' : m.status === 'slipped' ? '!' : '·') + '</div>' +
          '<div class="fname"><strong>' + esc(m.name) + '</strong></div>' +
          '<span class="fsize">' + esc(m.date || 'no date') + '</span>' +
          '<select class="select sm" data-msstatus="' + m.id + '">' +
          ['planned', 'done', 'slipped'].map(function (s) {
            return '<option value="' + s + '"' + (m.status === s ? ' selected' : '') + '>' + s + '</option>';
          }).join('') + '</select>' +
          '<button class="btn sm danger" data-msrm="' + m.id + '">✕</button></div>';
      }).join('') : '<p class="tiny muted">No milestones yet.</p>') + '</div>' +
      '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">' +
      '<input class="input" id="msName" placeholder="Design sign-off" style="flex:2;min-width:180px">' +
      '<input class="input" id="msDate" type="date" style="flex:0 0 auto">' +
      '<button class="btn sm" id="msAdd">Add</button></div></div>';

    /* shared files */
    h += '<h2 class="section">Files shared with the client</h2><div class="card">' +
      '<div id="sfList"><p class="tiny muted">Loading…</p></div>' +
      '<button class="btn sm" id="sfAdd" style="margin-top:10px">Upload a file to share</button></div>';

    /* people */
    h += '<h2 class="section">People with access</h2><div class="card">' +
      '<div id="clList"><p class="tiny muted">Loading…</p></div>' +
      '<div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap">' +
      '<input class="input" id="clEmail" type="email" placeholder="client@example.com" style="flex:2;min-width:180px">' +
      '<input class="input" id="clName" placeholder="Name (optional)" style="flex:1;min-width:120px">' +
      '<button class="btn btn-primary sm" id="clAdd">Invite</button></div>' +
      '<p class="tiny muted" style="margin-top:10px">They sign in at your client page with this exact email address. ' +
      'Send them the link below.</p>' +
      '<div class="filerow" style="margin-top:8px"><div class="fileicon">🔗</div>' +
      '<div class="fname" id="portalUrl"></div>' +
      '<button class="btn sm" id="copyPortal">Copy</button></div></div>';

    return h;
  }

  /* ---------- wiring ---------- */
  var subscribed = false;

  function wire(rerender) {
    var C = window.Cloud;
    if (!C || !C.configured()) return;

    // Re-render whenever the sign-in state settles or changes.
    if (!subscribed) {
      subscribed = true;
      C.onChange(function () { rerender(); });
    }
    if (!C.isReady()) { C.init().then(function () { rerender(); }); return; }

    if ($('#siGo')) {
      $('#siGo').onclick = function () {
        var em = $('#siEmail').value.trim();
        if (!em) return;
        $('#siMsg').textContent = 'Sending…';
        C.signIn(em).then(function () {
          $('#siMsg').innerHTML = '<strong>Check your inbox.</strong> Click the link in the email to sign in. ' +
            'It can take a minute, and may land in spam the first time.';
        }).catch(function (e) {
          $('#siMsg').textContent = 'Could not send: ' + e.message;
        });
      };
      $('#siEmail').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') $('#siGo').click();
      });
      return;
    }

    if ($('#signOutBtn')) $('#signOutBtn').onclick = function () {
      C.signOut().then(rerender);
    };

    var b = board(), p = S.project();

    if ($('#linkBtn')) {
      $('#linkBtn').onclick = function () {
        var btn = $('#linkBtn');
        btn.disabled = true; btn.textContent = 'Linking…';
        C.createProject(p.name, p.client, { linkedAt: new Date().toISOString() })
          .then(function (row) {
            b.cloudId = row.id; S.saveNow();
            return C.publishSnapshot(row.id, buildSnapshot());
          })
          .then(rerender)
          .catch(function (e) {
            btn.disabled = false; btn.textContent = 'Link this project';
            alert('Could not link: ' + e.message);
          });
      };
      return;
    }

    /* include switches + note */
    $$('[data-inc]').forEach(function (el) {
      el.onchange = function () { b.include[el.dataset.inc] = el.checked; S.saveNow(); };
    });
    if ($('#cbNote')) $('#cbNote').oninput = function () { b.note = this.value; S.save(); };

    /* actions */
    if ($('#actAdd')) $('#actAdd').onclick = function () {
      var t = $('#actTitle').value.trim();
      if (!t) return;
      b.actions.push({ id: S.uid('act'), title: t, detail: '', due: $('#actDue').value, done: false });
      S.saveNow(); rerender();
    };
    $$('[data-actdone]').forEach(function (el) {
      el.onclick = function () {
        var a = b.actions.filter(function (x) { return x.id === el.dataset.actdone; })[0];
        if (a) { a.done = !a.done; S.saveNow(); rerender(); }
      };
    });
    $$('[data-actrm]').forEach(function (el) {
      el.onclick = function () {
        b.actions = b.actions.filter(function (x) { return x.id !== el.dataset.actrm; });
        S.saveNow(); rerender();
      };
    });

    /* milestones */
    if ($('#msAdd')) $('#msAdd').onclick = function () {
      var n = $('#msName').value.trim();
      if (!n) return;
      b.milestones.push({ id: S.uid('ms'), name: n, date: $('#msDate').value, status: 'planned' });
      S.saveNow(); rerender();
    };
    $$('[data-msstatus]').forEach(function (el) {
      el.onchange = function () {
        var m = b.milestones.filter(function (x) { return x.id === el.dataset.msstatus; })[0];
        if (m) { m.status = el.value; S.saveNow(); }
      };
    });
    $$('[data-msrm]').forEach(function (el) {
      el.onclick = function () {
        b.milestones = b.milestones.filter(function (x) { return x.id !== el.dataset.msrm; });
        S.saveNow(); rerender();
      };
    });

    /* publish */
    if ($('#publishBtn')) $('#publishBtn').onclick = function () {
      var btn = $('#publishBtn');
      btn.disabled = true; btn.textContent = 'Publishing…';
      C.publishSnapshot(b.cloudId, buildSnapshot()).then(function () {
        btn.textContent = 'Published ✓';
        setTimeout(function () {
          var x = $('#publishBtn');
          if (x) { x.disabled = false; x.textContent = 'Publish update'; }
        }, 2200);
      }).catch(function (e) {
        btn.disabled = false; btn.textContent = 'Publish update';
        alert('Could not publish: ' + e.message);
      });
    };

    /* portal link */
    var portal = window.location.href.split('#')[0].replace(/[^/]*$/, '') + 'client.html';
    if ($('#portalUrl')) $('#portalUrl').textContent = portal;
    if ($('#copyPortal')) $('#copyPortal').onclick = function () {
      navigator.clipboard.writeText(portal).then(function () {
        $('#copyPortal').textContent = 'Copied ✓';
        setTimeout(function () { var x = $('#copyPortal'); if (x) x.textContent = 'Copy'; }, 2000);
      });
    };

    /* people */
    function drawClients() {
      C.listClients(b.cloudId).then(function (rows) {
        var el = $('#clList');
        if (!el) return;
        el.innerHTML = rows.length ? rows.map(function (c) {
          return '<div class="filerow"><div class="fileicon">' + (c.revoked ? '✕' : '👤') + '</div>' +
            '<div class="fname"><strong>' + esc(c.display_name || c.email) + '</strong>' +
            '<div class="tiny muted">' + esc(c.email) +
            (c.last_seen_at ? ' · last opened ' + new Date(c.last_seen_at).toLocaleDateString() : ' · not opened yet') +
            '</div></div>' +
            '<button class="btn sm danger" data-clrm="' + c.id + '">Remove</button></div>';
        }).join('') : '<p class="tiny muted">Nobody invited yet.</p>';
        $$('[data-clrm]', el).forEach(function (x) {
          x.onclick = function () {
            if (!confirm('Remove their access?')) return;
            C.removeClient(x.dataset.clrm).then(drawClients);
          };
        });
      }).catch(function (e) {
        if ($('#clList')) $('#clList').innerHTML = '<p class="tiny" style="color:var(--danger)">' + esc(e.message) + '</p>';
      });
    }
    drawClients();

    if ($('#clAdd')) $('#clAdd').onclick = function () {
      var em = $('#clEmail').value.trim();
      if (!em) return;
      C.inviteClient(b.cloudId, em, $('#clName').value.trim(), b.include).then(function () {
        $('#clEmail').value = ''; $('#clName').value = '';
        drawClients();
      }).catch(function (e) { alert('Could not invite: ' + e.message); });
    };

    /* shared files */
    function drawFiles() {
      C.listSharedFiles(b.cloudId).then(function (rows) {
        var el = $('#sfList');
        if (!el) return;
        el.innerHTML = rows.length ? rows.map(function (f) {
          return '<div class="filerow"><div class="fileicon">📄</div>' +
            '<div class="fname">' + esc(f.name) + '</div>' +
            '<button class="btn sm" data-sfopen="' + f.id + '">Open</button>' +
            '<button class="btn sm danger" data-sfrm="' + f.id + '">✕</button></div>';
        }).join('') : '<p class="tiny muted">Nothing shared yet.</p>';

        $$('[data-sfopen]', el).forEach(function (x) {
          x.onclick = function () {
            var rec = rows.filter(function (r) { return r.id === x.dataset.sfopen; })[0];
            C.sharedFileUrl(rec.path).then(function (u) { window.open(u, '_blank'); })
              .catch(function (e) { alert(e.message); });
          };
        });
        $$('[data-sfrm]', el).forEach(function (x) {
          x.onclick = function () {
            var rec = rows.filter(function (r) { return r.id === x.dataset.sfrm; })[0];
            if (!confirm('Stop sharing "' + rec.name + '"?')) return;
            C.deleteSharedFile(rec).then(drawFiles).catch(function (e) { alert(e.message); });
          };
        });
      }).catch(function () { });
    }
    drawFiles();

    if ($('#sfAdd')) $('#sfAdd').onclick = function () {
      var picker = $('#filePicker');
      picker.value = '';
      picker.onchange = function () {
        var files = Array.prototype.slice.call(picker.files || []);
        if (!files.length) return;
        $('#sfAdd').textContent = 'Uploading…';
        Promise.all(files.map(function (f) { return C.uploadSharedFile(b.cloudId, f); }))
          .then(function () { $('#sfAdd').textContent = 'Upload a file to share'; drawFiles(); })
          .catch(function (e) {
            $('#sfAdd').textContent = 'Upload a file to share';
            alert('Upload failed: ' + e.message);
          });
      };
      picker.click();
    };
  }

  window.ClientsUI = { view: view, wire: wire, buildSnapshot: buildSnapshot, board: board };
})();
try { window.__bootStage = 'clients-ui-loaded'; } catch (e) { }
