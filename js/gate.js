/* =====================================================================
   SJ DEVELOPMENT PROCESS — sign-in gate

   Keeps the working tool out of view for anyone who is not signed in.

   Be clear-eyed about what this is and is not:

     It DOES stop every casual visitor, anyone the link gets forwarded to,
     and search engine indexing.

     It does NOT make the JavaScript files secret. This site is hosted on
     GitHub Pages, which serves static files to anyone who asks for them.
     Someone who knows to open js/data-docs.js directly can still read it.
     Real secrecy would mean moving the process data into Supabase behind
     the auth layer, or hosting somewhere with server-side access control.

   Client data is a different matter, and is genuinely protected: it lives
   in Supabase behind row-level security, not in these files.
   ===================================================================== */
(function () {
  'use strict';

  var shell = document.getElementById('appShell');
  var gate = document.getElementById('gate');
  if (!shell || !gate) return;

  var form = document.getElementById('gateForm');
  var input = document.getElementById('gateEmail');
  var msg = document.getElementById('gateMsg');
  var busy = false;

  function say(text, kind) {
    msg.textContent = text || '';
    msg.className = 'gate-msg' + (kind ? ' is-' + kind : '');
  }

  function open() {                 // signed in — hand over to the app
    gate.hidden = true;
    shell.hidden = false;
    document.body.classList.remove('is-gated');
  }

  function close() {                // signed out — hold the door
    gate.hidden = false;
    shell.hidden = true;
    document.body.classList.add('is-gated');
  }

  /* Without Supabase configured there is nothing to sign in to, so the gate
     would lock the owner out of their own app. Let it through and say so. */
  if (!window.Cloud || !window.Cloud.configured()) {
    open();
    var warn = document.getElementById('gateLocalNote');
    if (warn) warn.hidden = false;
    return;
  }

  close();
  say('Checking…');

  function apply() {
    if (!window.Cloud.isReady()) return;
    if (window.Cloud.user()) { open(); }
    else { close(); say(''); }
  }

  window.Cloud.init().then(apply);
  window.Cloud.onChange(apply);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;

    var email = (input.value || '').trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      say('That does not look like an email address.', 'error');
      input.focus();
      return;
    }

    busy = true;
    say('Sending your link…');

    // Come back to this page, not the landing page, once the link is used.
    var back = window.location.href.split('#')[0];

    window.Cloud.signIn(email, back).then(function () {
      say('Check your email. The link signs you straight in — no password to remember. '
        + 'It expires in an hour, and only works once.', 'ok');
      form.reset();
    }).catch(function (err) {
      say((err && err.message) || 'That did not send. Try again in a moment.', 'error');
    }).then(function () {
      busy = false;
    });
  });
})();
try { window.__bootStage = 'gate-loaded'; } catch (e) { }
