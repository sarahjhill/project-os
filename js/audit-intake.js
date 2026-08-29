/* =====================================================================
   PROJECT OS — Audit intake

   One form, run per prospect. It splits what you type into the two
   places that need it: the technical findings and your next steps go
   onto the project as your own custom task (never shown to a client),
   and the plain-English version — findings, stats, and the timed plan
   if they sign up — goes onto the project's client board, so it is
   sitting there ready the moment you invite them in the Clients tab.

   Depends on Store (store.js) and the #modal/#modalWrap markup already
   in app.html. Deliberately standalone from app.js/clients-ui.js so it
   cannot break the existing UI — worst case, this file fails to load
   and everything else keeps working exactly as before.
   ===================================================================== */
(function () {
  'use strict';

  var S = window.Store;
  if (!S) return;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function field(label, inner, hint) {
    return '<div class="field"><label>' + esc(label) + '</label>' + inner +
      (hint ? '<p class="tiny muted" style="margin:4px 0 0">' + esc(hint) + '</p>' : '') + '</div>';
  }

  /* "Title :: for you :: for the client" — one per line. Kept to the
     same "::"-separated, one-thing-per-line convention as the rest of
     the app (see addTaskModal's how/dod fields) rather than inventing
     a new pattern. */
  function parseLines(text) {
    return (text || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
  }
  function parseParts(text) {
    return parseLines(text).map(function (line) {
      return line.split('::').map(function (s) { return s.trim(); });
    });
  }

  function modal(html, after) {
    $('#modal').innerHTML = html;
    $('#modalWrap').hidden = false;
    var c = $('#closeModal');
    if (c) c.onclick = closeModal;
    if (after) after();
  }
  function closeModal() { $('#modalWrap').hidden = true; $('#modal').innerHTML = ''; }

  /* ---------- step 1: which business ---------- */
  function openIntake() {
    var projects = S.projectList();
    var options = '<option value="__new__">— New business —</option>' +
      projects.map(function (p) {
        return '<option value="' + esc(p.id) + '">' + esc(p.name) + (p.client ? ' (' + esc(p.client) + ')' : '') + '</option>';
      }).join('');

    modal(
      '<h3>New audit</h3>' +
      '<p class="tiny muted" style="margin-top:-6px">Pick who this is for. Existing project or a new one — either way you land on the findings form next.</p>' +
      '<div class="field" style="margin-top:12px"><label>Business</label>' +
      '<select class="select" id="auBiz">' + options + '</select></div>' +
      '<div id="auNewFields" style="margin-top:12px">' +
      '<div class="fieldrow">' +
      field('Business name', '<input class="input" id="auName" placeholder="Pink Plumbing Services">') +
      field('Contact name', '<input class="input" id="auContact" placeholder="Sarah Roberts">') +
      '</div>' +
      '<div class="fieldrow" style="margin-top:10px">' +
      field('Website', '<input class="input" id="auUrl" placeholder="pinkplumbingservices.co.uk">') +
      field('Contact email', '<input class="input" type="email" id="auEmail" placeholder="sarah@pinkplumbingservices.co.uk">') +
      '</div></div>' +
      '<div class="actions"><button class="btn" id="closeModal">Cancel</button>' +
      '<button class="btn btn-primary" id="auNext">Next: findings</button></div>',
      function () {
        var sel = $('#auBiz'), newFields = $('#auNewFields');
        function sync() { newFields.style.display = sel.value === '__new__' ? '' : 'none'; }
        sel.onchange = sync; sync();
        $('#auNext').onclick = function () {
          var projectId;
          if (sel.value === '__new__') {
            var name = $('#auName').value.trim();
            if (!name) { $('#auName').focus(); return; }
            var p = S.addProject(name, $('#auContact').value.trim(), 'client');
            p.auditUrl = $('#auUrl').value.trim();
            p.auditEmail = $('#auEmail').value.trim();
            S.saveNow();
            projectId = p.id;
          } else {
            projectId = sel.value;
            S.setActive(projectId);
          }
          openFindings(projectId);
        };
      });
  }

  /* ---------- step 2: the findings, split two ways as you type them once ---------- */
  function openFindings(projectId) {
    S.setActive(projectId);
    var p = S.project();

    modal(
      '<h3>Audit findings — ' + esc(p.name) + '</h3>' +
      '<p class="tiny muted" style="margin-top:-6px">One line per item, parts separated by <code>::</code>. ' +
      'Leave the client-facing part off a line and it just won’t appear on their side.</p>' +

      '<div class="field" style="margin-top:14px"><label>Opening note (what the client sees first — plain English, warm)</label>' +
      '<textarea id="auNote" rows="3" placeholder="Two things are stopping people getting through to you right now..."></textarea></div>' +

      '<div class="field" style="margin-top:12px"><label>Findings — one per line: <code>Title :: technical detail (for you) :: plain-English detail (for them)</code></label>' +
      '<textarea id="auFindings" rows="5" placeholder="No phone number as text :: Only present as a raster image in the van photo, no tel: link :: There’s no phone number anywhere you can tap to call"></textarea></div>' +

      '<div class="field" style="margin-top:12px"><label>Stats to show them, in plain English — one per line: <code>Figure :: what it means for them</code></label>' +
      '<textarea id="auStats" rows="3" placeholder="53% :: of people on a phone give up on a site that takes more than 3 seconds to load"></textarea></div>' +

      '<div class="field" style="margin-top:12px"><label>A competitor worth mentioning (optional): <code>Name :: what they do well</code></label>' +
      '<input class="input" id="auCompetitor" placeholder="Cardiff Plumbing & Heating :: tappable number, 1,200+ reviews, loads fast"></div>' +

      '<div class="field" style="margin-top:12px"><label>What I’d do if they sign up — one per line: <code>Label :: what you’d do :: date (yyyy-mm-dd)</code></label>' +
      '<textarea id="auTimeline" rows="4" placeholder="Week 1 :: Tappable phone number, fix the homepage, add HTTPS :: 2026-09-03"></textarea></div>' +

      '<div class="field" style="margin-top:12px"><label>What you’d ask of them — one per line: <code>Ask :: detail</code> (defaults to a no-pressure check-in if left blank)</label>' +
      '<textarea id="auAsks" rows="2" placeholder="Let me know if this sounds like a fit :: No pressure at all"></textarea></div>' +

      '<div class="actions"><button class="btn" id="auBack">Back</button>' +
      '<button class="btn btn-primary" id="auGo">Generate audit</button></div>',

      function () {
        $('#auBack').onclick = function () { closeModal(); openIntake(); };
        $('#auGo').onclick = function () { generate(p); };
      });
  }

  function generate(p) {
    var findings = parseParts($('#auFindings').value);
    var stats = parseParts($('#auStats').value);
    var timeline = parseParts($('#auTimeline').value);
    var asks = parseParts($('#auAsks').value);
    var competitorRaw = $('#auCompetitor').value.trim();
    var openingNote = $('#auNote').value.trim();

    if (!findings.length) { $('#auFindings').focus(); return; }

    /* ---- your side: one custom task, full technical detail ---- */
    var howLines = findings.map(function (f) {
      return (f[0] || 'Finding') + (f[1] ? ' — ' + f[1] : '');
    });
    var dodLines = [
      'Technical findings recorded',
      'Plain-English client view populated',
      'Invite sent' + (p.auditEmail ? ' to ' + p.auditEmail : ''),
      'Follow-up diarised for +5 working days if no reply'
    ];
    S.addCustomTask('p0', {
      title: p.name + ' — audit findings (internal)',
      why: 'Full technical detail for your own reference. The client only ever sees the plain-English version in the Clients tab.',
      how: howLines.join('\n'),
      dod: dodLines.join('\n')
    });

    /* ---- their side: the client board ---- */
    var noteParts = [];
    if (openingNote) noteParts.push(openingNote);
    var clientFindingLines = findings
      .map(function (f) { return f[2] || f[1] || f[0]; })
      .filter(Boolean);
    if (clientFindingLines.length) {
      noteParts.push('What I found, in plain English:\n' + clientFindingLines.map(function (l) { return '— ' + l; }).join('\n'));
    }
    if (stats.length) {
      var statLines = stats.map(function (s) { return (s[0] || '') + ' — ' + (s[1] || ''); });
      noteParts.push('Worth knowing:\n' + statLines.map(function (l) { return '— ' + l; }).join('\n'));
    }
    if (competitorRaw) {
      var c = competitorRaw.split('::').map(function (s) { return s.trim(); });
      noteParts.push('For comparison, ' + (c[0] || 'a local competitor') + (c[1] ? ' does this well: ' + c[1] : '') + ' — worth learning from, and there’s still ground only you can claim.');
    }

    var milestones = timeline.map(function (t) {
      return { id: S.uid('ms'), name: (t[0] || 'Step') + (t[1] ? ' — ' + t[1] : ''), date: t[2] || '', status: 'planned' };
    });
    var actions = (asks.length ? asks : [['Let me know if this sounds like a fit', 'No pressure at all.']]).map(function (a) {
      return { id: S.uid('act'), title: a[0] || '', detail: a[1] || '', due: '', done: false };
    });

    p.clientBoard = {
      note: noteParts.join('\n\n'),
      actions: actions,
      milestones: milestones,
      include: { progress: false, actions: true, milestones: true, files: false, answers: false },
      cloudId: (p.clientBoard && p.clientBoard.cloudId) || ''
    };
    S.saveNow();
    closeModal();
    location.reload();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('newAuditBtn');
    if (btn) btn.onclick = openIntake;
  });
})();
