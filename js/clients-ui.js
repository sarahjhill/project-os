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
  /* Every project gets this action by default, so a client is always
     asked (and can tick to confirm) that their sign-in works. Fixed id
     so we can tell whether a given project already has it. */
  function defaultSignInAction() {
    return {
      id: 'act-confirm-signin',
      title: 'Send me a message to say you arrived here safely.',
      detail: 'The messages box is on the right of this page \u2014 on a phone it sits just below. ' +
        'Use it whenever you like: it is the easiest way to reach me, and there is no such thing ' +
        'as a daft question.',
      due: '', done: false, confirm: true
    };
  }

  /* The booking link is the same for every client, so it lives with the
     app rather than the project. Kept on this computer only \u2014 it is just
     a URL Sarah already hands out publicly. */
  var BOOK_KEY = 'sjh.bookingUrl';
  function savedBookingUrl() {
    try { return localStorage.getItem(BOOK_KEY) || ''; } catch (e) { return ''; }
  }
  function rememberBookingUrl(u) {
    try { localStorage.setItem(BOOK_KEY, u); } catch (e) { /* private window */ }
  }

  function board() {
    var p = S.project();
    if (!p.clientBoard) {
      p.clientBoard = {
        note: '',
        actions: [defaultSignInAction()],      // { id, title, detail, due, done, confirm }
        milestones: [],   // { id, name, date, status }
        include: { progress: true, actions: true, milestones: true, files: true, answers: false, messages: true },
        cloudId: ''       // the Supabase project id, once linked
      };
      S.saveNow();
    }
    var b = p.clientBoard;
    if (!b.include) b.include = { progress: true, actions: true, milestones: true, files: true, answers: false, messages: true };
    if (b.include.messages === undefined) b.include.messages = true;
    if (!b.actions) b.actions = [];
    /* backfill: projects created before this existed don't have it yet */
    if (!b.actions.some(function (a) { return a.id === 'act-confirm-signin'; })) {
      b.actions.unshift(defaultSignInAction());
    }
    /* Projects created before the wording changed keep the old sentence
       otherwise, so every client space says the same thing. Only the
       untouched default is replaced \u2014 anything Sarah has edited herself
       is left exactly as she wrote it. */
    var OLD_SIGNIN = 'Please send me a message to confirm you are able to sign in.';
    var migrated = false;
    b.actions.forEach(function (a) {
      if (a.id === 'act-confirm-signin' && a.title === OLD_SIGNIN && !a.detail) {
        var fresh = defaultSignInAction();
        a.title = fresh.title;
        a.detail = fresh.detail;
        migrated = true;
      }
    });
    if (migrated) S.saveNow();
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
        milestones: !!inc.milestones, files: !!inc.files, answers: !!inc.answers,
        messages: !!inc.messages
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

      /* The whole journey, so the client page can show every stage and
         mark where it has got to. The client page maps these ids onto
         plain-English descriptions in data-journey.js — the internal
         phase goals are never sent. */
      var phaseList = S.phases();
      var curIdx = -1;
      phaseList.forEach(function (ph, idx) {
        if (curIdx === -1 && current && ph.id === current.phase.id) curIdx = idx;
      });
      payload.track = p.track || 'client';
      payload.phases = phaseList.map(function (ph, idx) {
        var ps = S.phaseStats(ph.id);
        var state = curIdx === -1 ? 'done'
                  : idx < curIdx ? 'done'
                  : idx === curIdx ? 'current' : 'upcoming';
        return {
          id: ph.id, num: ph.num, name: ph.name,
          done: ps.done, total: ps.total, pct: ps.pct, state: state
        };
      });
    }
    if (inc.actions) {
      payload.actions = b.actions.map(function (a) {
        /* id and confirm were being dropped here, so the "I confirm" tick
           the client page tries to draw never had anything to draw from —
           no client has ever been able to tick one off. */
        return {
          id: a.id, title: a.title, detail: a.detail || '', due: a.due || '',
          done: !!a.done, confirm: !!a.confirm,
          link: a.link || '', linkLabel: a.linkLabel || ''
        };
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
        'the <code>supabase</code> section of <code>js/config.js</code>. Everything else in The Dragon Fire Process ' +
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
        'This project is local only — link it to share with a client.') + '</div>' +
      (linked ? '<div class="tiny muted" id="pubWhen">Checking\u2026</div>' : '') + '</div>' +
      '<div style="display:flex;gap:8px">' +
      (linked ? '<a class="btn sm" id="previewBtn" href="client.html?preview=' +
        encodeURIComponent(b.cloudId) + '" target="_blank" rel="noopener">Preview as client</a>' : '') +
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
      ['answers', 'Their submitted form answers'],
      ['messages', 'Messages (they can reply and attach files)']].map(function (x) {
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
          (a.detail ? '<div class="tiny muted">' + esc(a.detail) + '</div>' : '') +
          (a.confirm ? '<div class="tiny" id="actConfirm-' + a.id + '"></div>' : '') +
          (a.link ? '<div class="tiny muted">\u2192 ' + esc(a.linkLabel || 'Link') + ': ' + esc(a.link) + '</div>' : '') + '</div>' +
          (a.due ? '<span class="fsize">by ' + esc(a.due) + '</span>' : '') +
          '<button class="btn sm" data-actdone="' + a.id + '">' + (a.done ? 'Reopen' : 'Done') + '</button>' +
          '<button class="btn sm danger" data-actrm="' + a.id + '">✕</button></div>';
      }).join('') : '<p class="tiny muted">Nothing outstanding.</p>') + '</div>' +
      '<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;align-items:center">' +
      '<input class="input" id="actTitle" placeholder="Send final copy for the About page" style="flex:2;min-width:180px">' +
      '<input class="input" id="actDue" type="date" style="flex:0 0 auto">' +
      '<button class="btn sm" id="actAdd">Add</button></div>' +
      '<label class="tiny muted" style="display:flex;gap:6px;align-items:center;margin-top:8px">' +
      '<input type="checkbox" id="actConfirmNew"> Let the client tick this off themselves, as well as replying</label>' +
      '<div class="field" style="margin-top:16px;border-top:1px solid var(--line, #DFE6E5);padding-top:14px">' +
      '<label>Your booking link</label>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">' +
      '<input class="input" id="bookUrl" placeholder="https://calendar.app.google/\u2026" ' +
      'style="flex:2;min-width:220px" value="' + esc(savedBookingUrl()) + '">' +
      '<button class="btn sm" id="bookAdd">Add a \u201cbook a call\u201d step</button></div>' +
      '<p class="tiny muted" style="margin-top:6px">Paste the link from your Google Calendar ' +
      'appointment schedule. It is remembered on this computer and reused for every client, ' +
      'so you only ever paste it once.</p></div></div>';

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

    /* messages from/to the client */
    h += '<h2 class="section">Messages</h2><div class="card">' +
      '<div id="msgList" style="max-height:280px;overflow-y:auto;margin-bottom:10px"><p class="tiny muted">Loading…</p></div>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '<textarea class="input" id="msgBody" rows="2" placeholder="Reply to the client…" style="flex:1;min-width:220px"></textarea>' +
      '<div style="display:flex;flex-direction:column;gap:8px">' +
      '<button class="btn btn-primary sm" id="msgSend">Send</button></div></div>' +
      '<p class="tiny muted" style="margin-top:10px">Files the client attaches from their page turn up below — nothing is emailed to you, so check back here.</p>' +
      '<div id="cuList" style="margin-top:8px"></div></div>';

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
    if ($('#bookUrl')) $('#bookUrl').onchange = function () {
      rememberBookingUrl(this.value.trim());
    };

    if ($('#bookAdd')) $('#bookAdd').onclick = function () {
      var url = ($('#bookUrl').value || '').trim();
      if (!/^https?:\/\//i.test(url)) {
        alert('Paste your booking link first. It needs to start with https://');
        return;
      }
      rememberBookingUrl(url);
      b.actions.push({
        id: S.uid('act'),
        title: 'Choose a time for our first call',
        detail: 'Pick whichever slot suits you \u2014 the times shown are ones I am genuinely ' +
          'free, so there is no back and forth. When you book you can choose a video call or ' +
          'ask me to ring you instead, and leave your number.',
        due: '', done: false, confirm: false,
        link: url, linkLabel: 'Choose a time'
      });
      S.saveNow();
      rerender();
    };

    if ($('#actAdd')) $('#actAdd').onclick = function () {
      var t = $('#actTitle').value.trim();
      if (!t) return;
      var wantConfirm = !!($('#actConfirmNew') && $('#actConfirmNew').checked);
      b.actions.push({ id: S.uid('act'), title: t, detail: '', due: $('#actDue').value,
        done: false, confirm: wantConfirm, link: '', linkLabel: '' });
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

    /* show which "what we need from you" items the client has ticked */
    function drawActionConfirms() {
      if (!b.cloudId) return;
      C.listActionConfirms(b.cloudId).then(function (rows) {
        rows.forEach(function (r) {
          var el = document.getElementById('actConfirm-' + r.action_id);
          if (el) el.innerHTML = '<span style="color:var(--ok,#1e7a5a)">✓ Client confirmed' +
            (r.confirmed_by ? ' (' + esc(r.confirmed_by) + ')' : '') + '</span>';
        });
      }).catch(function () { });
    }
    drawActionConfirms();

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

    /* ---------- when was this last published? ----------
       The button used to flash "Published ✓" for two seconds and reset, which
       is indistinguishable from nothing happening. This line stays put. */
    function drawPublished() {
      var el = $('#pubWhen');
      if (!el || !b.cloudId) return;
      C.getSnapshot(b.cloudId).then(function (snap) {
        var x = $('#pubWhen');
        if (!x) return;
        x.textContent = snap && snap.published_at
          ? 'Last published ' + new Date(snap.published_at)
              .toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
          : 'Never published \u2014 your client sees nothing until you do.';
      }).catch(function () {
        var x = $('#pubWhen');
        if (x) x.textContent = '';
      });
    }
    drawPublished();

    /* publish */
    if ($('#publishBtn')) $('#publishBtn').onclick = function () {
      var btn = $('#publishBtn');
      btn.disabled = true; btn.textContent = 'Publishing…';
      C.publishSnapshot(b.cloudId, buildSnapshot()).then(function () {
        btn.textContent = 'Published ✓';
        drawPublished();
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
    var portal = portalLink();
    if ($('#portalUrl')) $('#portalUrl').textContent = portal;
    if ($('#copyPortal')) $('#copyPortal').onclick = function () {
      navigator.clipboard.writeText(portal).then(function () {
        $('#copyPortal').textContent = 'Copied ✓';
        setTimeout(function () { var x = $('#copyPortal'); if (x) x.textContent = 'Copy'; }, 2000);
      });
    };

    /* The portal address, used by both the copy row and the invite email. */
    function portalLink() {
      return window.location.href.split('#')[0].replace(/[^/]*$/, '') + 'client.html';
    }

    /* Clicking Invite only adds someone to the allow-list \u2014 nothing is emailed.
       This opens a pre-written message in your own mail app so the invitation
       comes from you, which lands better than anything automated would. */
    function inviteMailto(c) {
      var who  = (c.display_name || '').split(' ')[0] || 'there';
      var proj = (S.project() && S.project().name) || 'your project';
      var subj = 'Your project page for ' + proj;
      var body = [
        'Hi ' + who + ',',
        '',
        'Your project page is ready. You can see where things are up to, anything',
        'I need from you, and any files I have shared:',
        '',
        portalLink(),
        '',
        'Sign in with this exact address: ' + c.email,
        'There is no password \u2014 it emails you a link to click.',
        '',
        'Any questions, just reply to this.',
        '',
        'Sarah'
      ].join('\n');
      return 'mailto:' + encodeURIComponent(c.email) +
             '?subject=' + encodeURIComponent(subj) +
             '&body=' + encodeURIComponent(body);
    }

    /* people */
    function drawClients() {
      C.listClients(b.cloudId).then(function (rows) {
        var el = $('#clList');
        if (!el) return;
        el.innerHTML = rows.length ? rows.map(function (c) {
          return '<div class="filerow"><div class="fileicon">' + (c.revoked ? '✕' : '👤') + '</div>' +
            '<div class="fname"><strong>' + esc(c.display_name || c.email) + '</strong>' +
            '<div class="tiny muted">' + esc(c.email) +
            (c.last_seen_at ? ' · last opened ' + new Date(c.last_seen_at).toLocaleDateString('en-GB') : ' · not opened yet') +
            '</div></div>' +
            (c.revoked ? '' : (c.last_seen_at
              /* last_seen_at is stamped the first time they open the portal,
                 so it is the only honest signal that the invite was accepted. */
              ? '<span class="btn sm" style="pointer-events:none;background:var(--ok,#1e7a5a);' +
                'color:#fff;border-color:transparent">Accepted \u2713</span>' +
                '<a class="btn sm" href="' + inviteMailto(c) + '" title="Send the link again">Resend</a>'
              : '<a class="btn sm" href="' + inviteMailto(c) + '">Email invite</a>')) +
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

    /* Enter submits, because a field that silently ignores Enter reads as broken. */
    ['#clEmail', '#clName'].forEach(function (sel) {
      if (!$(sel)) return;
      $(sel).addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') { ev.preventDefault(); if ($('#clAdd')) $('#clAdd').click(); }
      });
    });

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

    /* messages */
    function drawMessages() {
      C.listMessages(b.cloudId).then(function (rows) {
        var el = $('#msgList');
        if (!el) return;
        el.innerHTML = rows.length ? rows.map(function (m) {
          return '<div class="row" style="padding:8px 0"><div class="body">' +
            '<strong>' + (m.from_owner ? 'You' : esc(m.sender || 'Client')) + '</strong>' +
            ' <span class="tiny muted">' + new Date(m.created_at).toLocaleString('en-GB') + '</span>' +
            '<div>' + esc(m.body) + '</div></div></div>';
        }).join('') : '<p class="tiny muted">No messages yet.</p>';
        el.scrollTop = el.scrollHeight;
      }).catch(function () { if ($('#msgList')) $('#msgList').innerHTML = '<p class="tiny muted">Could not load messages.</p>'; });
    }
    drawMessages();

    if ($('#msgSend')) $('#msgSend').onclick = function () {
      var body = $('#msgBody').value.trim();
      if (!body) return;
      $('#msgSend').disabled = true;
      C.sendOwnerMessage(b.cloudId, body).then(function () {
        $('#msgBody').value = ''; $('#msgSend').disabled = false;
        drawMessages();
      }).catch(function (e) { $('#msgSend').disabled = false; alert('Could not send: ' + e.message); });
    };

    /* files the client has attached */
    function drawClientUploads() {
      C.listClientUploads(b.cloudId).then(function (rows) {
        var el = $('#cuList');
        if (!el) return;
        el.innerHTML = rows.length ? rows.map(function (f) {
          return '<div class="filerow"><div class="fileicon">📎</div>' +
            '<div class="fname">' + esc(f.name) +
            '<div class="tiny muted">from ' + esc(f.sender || 'the client') + '</div></div>' +
            '<button class="btn sm" data-cuopen="' + f.id + '">Open</button></div>';
        }).join('') : '';
        $$('[data-cuopen]', el).forEach(function (x) {
          x.onclick = function () {
            var rec = rows.filter(function (r) { return r.id === x.dataset.cuopen; })[0];
            C.clientUploadUrl(rec.path).then(function (u) { window.open(u, '_blank'); })
              .catch(function (e) { alert(e.message); });
          };
        });
      }).catch(function () { });
    }
    drawClientUploads();
  }

  window.ClientsUI = { view: view, wire: wire, buildSnapshot: buildSnapshot, board: board };
})();
try { window.__bootStage = 'clients-ui-loaded'; } catch (e) { }
