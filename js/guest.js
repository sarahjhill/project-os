/* =====================================================================
   THE SJH PROCESS — Guest mode

   Lets somebody look round the working tool without an account, and
   without touching anything real.

   Three things have to be true for that to be safe, and this file is
   responsible for all three. It runs BEFORE cloud.js and store.js, which
   is the only reason it can do any of them:

     1. No cloud.  window.CONFIG.supabase is emptied, so Cloud.configured()
        returns false and the app never opens a connection to the database.
        No sign-in, no reads, no writes, nothing to authenticate against.

     2. No shared storage.  The store is pointed at a separate localStorage
        key, so a guest poking about on a shared machine cannot see or
        overwrite the real projects sitting under 'projectos.v1'.

     3. No email.  The Formspree endpoint is emptied, so a guest filling in
        a client form for a look does not land in the real inbox.

   Guest mode is entered by ?guest=1 on the URL, or the button on the gate.
   It is never sticky: close the tab and it is gone.
   ===================================================================== */
(function () {
  'use strict';

  var KEY = 'projectos.guest.v1';

  var active = (function () {
    try {
      return new URLSearchParams(window.location.search).get('guest') === '1';
    } catch (e) {
      return window.location.search.indexOf('guest=1') !== -1;
    }
  })();

  window.GUEST = { active: active, storageKey: KEY };

  if (!active) return;

  /* ---- 1 & 3: cut the outside world off before anything reads config ---- */

  if (window.CONFIG) {
    window.CONFIG.supabase = { url: '', anonKey: '' };
    window.CONFIG.formspreeEndpoint = '';
  }

  /* ---- 2: seed a sample project, if this browser has not got one yet ----

     Written straight into localStorage rather than through the Store,
     because the Store has not loaded yet — that is deliberate, so it picks
     this up as its initial state instead of creating an empty project.   */

  function seed() {
    try {
      if (localStorage.getItem(KEY)) return;   // returning guest, leave it be
    } catch (e) {
      return;                                  // storage blocked; app copes
    }

    var today = new Date();
    function day(offset) {
      var d = new Date(today);
      d.setDate(d.getDate() + offset);
      return d.toISOString().slice(0, 10);
    }

    /* Everything through Discovery and Definition, and part-way into
       Design — far enough in that the progress bars, the sprint board and
       the phase list all have something to show. */
    var DONE = [
      'p0-1', 'p0-2', 'p0-3', 'p0-4', 'p0-5',
      'p1-1', 'p1-2', 'p1-3', 'p1-4',
      'p2-1', 'p2-2'
    ];
    var DOING = ['p2-3', 'p3-1'];

    var tasks = {};
    function put(id, status, sprint) {
      var def = null;
      (window.PHASES || []).forEach(function (ph) {
        (ph.tasks || []).forEach(function (t) { if (t.id === id) def = t; });
      });
      if (!def) return;                        // task ids changed; skip quietly
      tasks[id] = {
        status: status,
        pri: def.pri, pts: def.pts || 0,
        sprint: sprint || '', due: '', notes: '',
        dod: [], links: [], started: '', finished: ''
      };
    }

    var sprintId = 'spr-demo-1';
    DONE.forEach(function (id) { put(id, 'done', sprintId); });
    DOING.forEach(function (id) { put(id, 'doing', sprintId); });

    var project = {
      id: 'proj-demo',
      name: 'Riverside Community Cafe',
      client: 'Riverside Community Trust',
      created: day(-24),
      sprintLength: 7,
      capacity: 20,
      tasks: tasks,
      custom: [],
      sprints: [{
        id: sprintId,
        name: 'Sprint 3 — Design',
        goal: 'Wireframes agreed and the booking flow signed off.',
        start: day(-3),
        end: day(4),
        closed: false
      }],
      docNotes: {
        'doc-intake': 'Came back the same afternoon. Budget band was the only blank — '
                    + 'chased it once by email and they picked the middle band.'
      }
    };

    var state = {
      projects: {},
      activeId: project.id,
      theme: 'light',
      openPhases: { p3: true }
    };
    state.projects[project.id] = project;

    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* fine */ }
  }

  seed();

  /* ---- the banner, added once the page has a body to put it in ---- */

  function banner() {
    if (document.getElementById('guestBar')) return;

    var bar = document.createElement('div');
    bar.id = 'guestBar';
    bar.className = 'guest-bar';
    bar.setAttribute('role', 'status');
    bar.innerHTML =
        '<span class="guest-tag">Guest</span>'
      + '<span class="guest-text">You are looking round a demo. Tick things, open '
      + 'templates, move the sprint about — it is all yours to play with. Nothing '
      + 'here is real, nothing is saved to my system, and no client data is '
      + 'involved.</span>'
      + '<button type="button" class="guest-reset" id="guestReset">Start again</button>'
      + '<a class="guest-out" href="app.html">Leave</a>';

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('has-guest-bar');

    document.getElementById('guestReset').addEventListener('click', function () {
      try { localStorage.removeItem(KEY); } catch (e) { /* fine */ }
      window.location.reload();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', banner);
  } else {
    banner();
  }
})();
try { window.__bootStage = 'guest-loaded'; } catch (e) { }
