/* =====================================================================
   PROJECT OS — Client form generator
   Builds a standalone .html form file to email to a client, and parses
   the answer file they send back.
   ===================================================================== */
(function () {
  'use strict';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ---------- the stylesheet used inside the generated form ---------- */
  var FORM_CSS = [
    ':root{--bg:#F7F7F5;--surface:#fff;--sunken:#F0EFEC;--text:#1A1A18;--text-2:#5C5C57;',
    '--text-3:#8A8A82;--border:#E3E2DD;--strong:#CFCEC7;--accent:#B85C38;--danger:#B23A32;--ok:#2E7D5B}',
    '*{box-sizing:border-box}',
    'body{margin:0;background:var(--bg);color:var(--text);line-height:1.55;',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,Helvetica,Arial,sans-serif;font-size:16px}',
    '.wrap{max-width:720px;margin:0 auto;padding:32px 20px 80px}',
    'header.top{margin-bottom:28px}',
    'h1{font-size:27px;letter-spacing:-.02em;margin:0 0 10px}',
    '.intro{color:var(--text-2);margin:0}',
    '.progress{position:sticky;top:0;background:var(--bg);padding:12px 0;z-index:5;margin-bottom:4px}',
    '.pbar{height:6px;background:var(--sunken);border-radius:99px;overflow:hidden}',
    '.pbar>span{display:block;height:100%;background:var(--accent);width:0;transition:width .25s}',
    '.pcount{font-size:12px;color:var(--text-3);margin-top:6px}',
    'section.sec{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:22px;margin-bottom:16px}',
    'section.sec h2{font-size:17px;margin:0 0 4px}',
    '.secnote{font-size:13.5px;color:var(--text-2);margin:0 0 16px;padding:10px 12px;background:var(--sunken);border-radius:8px}',
    '.f{margin-bottom:22px}',
    '.f:last-child{margin-bottom:0}',
    'label.q{display:block;font-weight:600;margin-bottom:5px;font-size:15px}',
    '.req{color:var(--danger);margin-left:3px}',
    '.help{font-size:13.5px;color:var(--text-3);margin:0 0 8px}',
    'input[type=text],input[type=email],input[type=tel],input[type=date],input[type=number],textarea,select{',
    'width:100%;padding:10px 12px;border:1px solid var(--strong);border-radius:9px;font:inherit;',
    'background:var(--surface);color:var(--text)}',
    'textarea{min-height:96px;resize:vertical}',
    'input:focus,textarea:focus,select:focus{outline:2px solid var(--accent);outline-offset:-1px}',
    '.opt{display:flex;gap:10px;align-items:flex-start;padding:9px 11px;border:1px solid var(--border);',
    'border-radius:9px;margin-bottom:6px;cursor:pointer;background:var(--surface)}',
    '.opt:hover{border-color:var(--strong);background:var(--sunken)}',
    '.opt input{margin-top:3px;flex:0 0 auto;width:auto}',
    '.opt.on{border-color:var(--accent);background:#FBEEE8}',
    '.scale{display:flex;gap:6px;align-items:center;flex-wrap:wrap}',
    '.scale button{flex:1;min-width:44px;padding:10px 0;border:1px solid var(--strong);background:var(--surface);',
    'border-radius:9px;cursor:pointer;font:inherit}',
    '.scale button.on{background:var(--accent);color:#fff;border-color:var(--accent)}',
    '.scale .lab{font-size:12px;color:var(--text-3);flex:0 0 100%}',
    '.statement{background:var(--sunken);border-left:3px solid var(--accent);padding:12px 14px;',
    'border-radius:0 8px 8px 0;font-size:14.5px;color:var(--text-2)}',
    '.err{color:var(--danger);font-size:13px;margin-top:5px;display:none}',
    '.f.bad input,.f.bad textarea,.f.bad select{border-color:var(--danger)}',
    '.f.bad .err{display:block}',
    '.actions{position:sticky;bottom:0;background:var(--bg);padding:16px 0;border-top:1px solid var(--border);',
    'display:flex;gap:10px;flex-wrap:wrap;align-items:center}',
    'button.btn{padding:12px 20px;border-radius:10px;border:1px solid var(--strong);background:var(--surface);',
    'font:inherit;cursor:pointer}',
    'button.btn:hover{background:var(--sunken)}',
    'button.primary{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}',
    'button.primary:hover{filter:brightness(1.07);background:var(--accent)}',
    '.saved{font-size:13px;color:var(--text-3);margin-left:auto}',
    '.done{background:#E6F3ED;border:1px solid var(--ok);border-radius:14px;padding:22px;margin-bottom:16px}',
    '.done{padding:32px}',
    '.done h2{margin:0 0 12px;color:var(--ok);font-size:23px}',
    '.done p{margin:0 0 12px;color:var(--text-2)}',
    '.done p:last-child{margin-bottom:0}',
    '.done .hint{font-size:13.5px;color:var(--text-3)}',
    '.done ol{margin:10px 0 0;padding-left:20px}',
    '.done li{margin-bottom:6px}',
    '@media print{.actions,.progress{display:none}}'
  ].join('');

  /* ---------- runtime that lives inside the generated form ---------- */
  function formRuntime() {
    var F = window.__FORM__;
    var answers = {};
    var KEY = 'projectos-form-' + F.formId;

    try {
      var saved = localStorage.getItem(KEY);
      if (saved) answers = JSON.parse(saved);
    } catch (e) { }

    function persist() {
      try { localStorage.setItem(KEY, JSON.stringify(answers)); } catch (e) { }
      var s = document.getElementById('savedNote');
      if (s) {
        s.textContent = 'Saved on this device';
        clearTimeout(window.__st);
        window.__st = setTimeout(function () { s.textContent = ''; }, 2200);
      }
      updateProgress();
    }

    function totalRequired() {
      var n = 0;
      F.sections.forEach(function (s) {
        s.fields.forEach(function (f) { if (f.required) n++; });
      });
      return n;
    }
    function doneRequired() {
      var n = 0;
      F.sections.forEach(function (s) {
        s.fields.forEach(function (f) {
          if (!f.required) return;
          var v = answers[f.id];
          if (v && (typeof v !== 'object' || v.length)) n++;
        });
      });
      return n;
    }
    function updateProgress() {
      var t = totalRequired(), d = doneRequired();
      var bar = document.getElementById('pbar');
      var cnt = document.getElementById('pcount');
      if (bar) bar.style.width = (t ? (d / t * 100) : 0) + '%';
      if (cnt) cnt.textContent = d + ' of ' + t + ' required questions answered';
    }

    /* wire every field */
    document.querySelectorAll('[data-fid]').forEach(function (el) {
      var id = el.dataset.fid, type = el.dataset.ftype;

      if (type === 'checkbox') {
        var box = el.querySelector('input');
        var val = el.dataset.val;
        if ((answers[id] || []).indexOf(val) > -1) { box.checked = true; el.classList.add('on'); }
        box.addEventListener('change', function () {
          answers[id] = answers[id] || [];
          var i = answers[id].indexOf(val);
          if (box.checked) { if (i < 0) answers[id].push(val); el.classList.add('on'); }
          else { if (i > -1) answers[id].splice(i, 1); el.classList.remove('on'); }
          persist();
        });
      } else if (type === 'radio') {
        var r = el.querySelector('input');
        if (answers[id] === el.dataset.val) { r.checked = true; el.classList.add('on'); }
        r.addEventListener('change', function () {
          answers[id] = el.dataset.val;
          document.querySelectorAll('[data-fid="' + id + '"]').forEach(function (o) { o.classList.remove('on'); });
          el.classList.add('on');
          persist();
        });
      } else if (type === 'scale') {
        var btns = el.querySelectorAll('button');
        btns.forEach(function (b) {
          if (String(answers[id]) === b.dataset.v) b.classList.add('on');
          b.addEventListener('click', function () {
            answers[id] = b.dataset.v;
            btns.forEach(function (x) { x.classList.remove('on'); });
            b.classList.add('on');
            persist();
          });
        });
      } else {
        if (answers[id] != null) el.value = answers[id];
        el.addEventListener('input', function () { answers[id] = el.value; persist(); });
        el.addEventListener('change', function () { answers[id] = el.value; persist(); });
      }
    });

    updateProgress();

    function validate() {
      var firstBad = null;
      F.sections.forEach(function (s) {
        s.fields.forEach(function (f) {
          var wrap = document.getElementById('wrap-' + f.id);
          if (!wrap) return;
          var v = answers[f.id];
          var empty = !v || (typeof v === 'object' && !v.length) || (typeof v === 'string' && !v.trim());
          if (f.required && empty) {
            wrap.classList.add('bad');
            if (!firstBad) firstBad = wrap;
          } else {
            wrap.classList.remove('bad');
          }
        });
      });
      return firstBad;
    }

    function collect() {
      var out = [];
      F.sections.forEach(function (s) {
        s.fields.forEach(function (f) {
          if (f.type === 'statement') return;
          var v = answers[f.id];
          if (Array.isArray(v)) v = v.join(', ');
          out.push({ section: s.name, id: f.id, label: f.label, value: v == null ? '' : String(v) });
        });
      });
      return {
        projectOsForm: true,
        formId: F.formId,
        formTitle: F.title,
        completed: new Date().toISOString(),
        answers: out
      };
    }

    function asText(payload) {
      var lines = [payload.formTitle, 'Completed ' + new Date(payload.completed).toLocaleString(), ''];
      var cur = '';
      payload.answers.forEach(function (a) {
        if (a.section !== cur) { cur = a.section; lines.push('', '— ' + cur.toUpperCase() + ' —', ''); }
        lines.push(a.label);
        lines.push('  ' + (a.value || '(not answered)'));
        lines.push('');
      });
      return lines.join('\n');
    }

    function respondentName(payload) {
      var n = '';
      payload.answers.forEach(function (a) { if (!n && a.id === 'name' && a.value) n = a.value; });
      return n;
    }

    function downloadFile(payload) {
      var slug = (respondentName(payload) || 'answers').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      var blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = F.formId.replace(/^doc-/, '') + '-' + slug + '.json';
      document.body.appendChild(a); a.click(); a.remove();
    }

    /* Build the flat object Formspree turns into a readable email. */
    function formspreeBody(payload) {
      var out = {};
      out._subject = (F.studioName || 'Project OS') + ' — ' + F.title +
        (respondentName(payload) ? ' from ' + respondentName(payload) : '');
      payload.answers.forEach(function (a) {
        var key = a.section + ' — ' + a.label;
        if (key.length > 90) key = key.slice(0, 87) + '…';
        out[key] = a.value || '(not answered)';
      });
      payload.answers.forEach(function (a) {
        if (a.id === 'email' && a.value) out.email = a.value;   // enables reply-to
      });

      var json = JSON.stringify(payload);
      if (F.appUrl) {
        var packed = '';
        try { packed = btoa(unescape(encodeURIComponent(json))); } catch (e) { packed = ''; }
        var base = F.appUrl.charAt(F.appUrl.length - 1) === '/' ? F.appUrl : F.appUrl + '/';
        var url = base + '#answers=' + encodeURIComponent(packed);
        if (packed && url.length < 7000) {
          out['➤ FILE THESE ANSWERS (click)'] = url;
        }
      }
      out['PROJECT OS DATA — copy everything between the markers'] =
        '<<<PROJECTOS ' + json + ' PROJECTOS>>>';
      return out;
    }

    function showThanks() {
      document.querySelectorAll('section.sec, .progress, .actions').forEach(function (el) {
        el.style.display = 'none';
      });
      document.getElementById('sent').style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    var submitting = false;

    document.getElementById('btnSubmit').addEventListener('click', function () {
      if (submitting) return;
      var bad = validate();
      var w = document.getElementById('warn');
      if (bad) {
        bad.scrollIntoView({ behavior: 'smooth', block: 'center' });
        w.style.display = 'block';
        w.textContent = 'Some required questions still need an answer — they are marked in red.';
        return;
      }
      w.style.display = 'none';

      var payload = collect();
      var btn = document.getElementById('btnSubmit');

      // No endpoint configured: fall back to a downloaded file.
      if (!F.endpoint) {
        downloadFile(payload);
        showThanks();
        return;
      }

      submitting = true;
      btn.disabled = true;
      btn.textContent = 'Sending…';

      fetch(F.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formspreeBody(payload))
      }).then(function (r) {
        if (!r.ok) throw new Error('Server responded ' + r.status);
        try { localStorage.removeItem(KEY); } catch (e) { }
        showThanks();
      }).catch(function (err) {
        submitting = false;
        btn.disabled = false;
        btn.textContent = 'Submit my answers';
        w.style.display = 'block';
        w.innerHTML = '<strong>That did not send.</strong> ' +
          'Your answers are safe on this page — nothing has been lost. ' +
          'Please check your connection and press submit again. ' +
          'If it keeps failing, press the button below and email me the file instead.' +
          '<div style="margin-top:10px"><button class="btn" type="button" id="btnRescue">' +
          'Download my answers instead</button></div>';
        var rescue = document.getElementById('btnRescue');
        if (rescue) rescue.addEventListener('click', function () { downloadFile(payload); });
        console.error('Submission failed:', err);
      });
    });

    document.getElementById('btnPrint').addEventListener('click', function () { window.print(); });
  }

  /* ---------- build one field ---------- */
  function fieldHTML(f) {
    if (f.type === 'statement') {
      return '<div class="f"><div class="statement">' + esc(f.label) + '</div></div>';
    }
    var h = '<div class="f" id="wrap-' + esc(f.id) + '">';
    h += '<label class="q" for="in-' + esc(f.id) + '">' + esc(f.label) +
      (f.required ? '<span class="req" aria-hidden="true">*</span>' : '') + '</label>';
    if (f.help) h += '<p class="help">' + esc(f.help) + '</p>';

    var idAttr = 'id="in-' + esc(f.id) + '" data-fid="' + esc(f.id) + '" data-ftype="' + esc(f.type) + '"';

    if (f.type === 'textarea') {
      h += '<textarea ' + idAttr + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '') + '></textarea>';
    } else if (f.type === 'select') {
      h += '<select ' + idAttr + '><option value="">Please choose…</option>' +
        f.options.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('') +
        '</select>';
    } else if (f.type === 'radio' || f.type === 'checkbox') {
      h += f.options.map(function (o, i) {
        return '<label class="opt" data-fid="' + esc(f.id) + '" data-ftype="' + esc(f.type) +
          '" data-val="' + esc(o) + '">' +
          '<input type="' + (f.type === 'radio' ? 'radio' : 'checkbox') + '" name="' + esc(f.id) + '"' +
          (f.type === 'radio' && i === 0 ? ' id="in-' + esc(f.id) + '"' : '') + '>' +
          '<span>' + esc(o) + '</span></label>';
      }).join('');
    } else if (f.type === 'scale') {
      h += '<div class="scale" data-fid="' + esc(f.id) + '" data-ftype="scale">';
      for (var n = 1; n <= 5; n++) h += '<button type="button" data-v="' + n + '">' + n + '</button>';
      if (f.scaleLabels) {
        h += '<span class="lab">1 = ' + esc(f.scaleLabels[0]) + ' · 5 = ' + esc(f.scaleLabels[1]) + '</span>';
      }
      h += '</div>';
    } else {
      h += '<input type="' + esc(f.type) + '" ' + idAttr +
        (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '') + '>';
    }

    h += '<div class="err">This one is needed before you can finish.</div></div>';
    return h;
  }

  /* ---------- build the whole file ---------- */
  function buildHTML(formId) {
    var F = window.FORMS[formId];
    if (!F) return null;
    var C = window.CONFIG || {};
    var data = JSON.parse(JSON.stringify(F));
    data.formId = formId;
    data.endpoint = C.formspreeEndpoint || '';
    data.appUrl = C.appUrl || '';
    data.studioName = C.studioName || 'Project OS';

    var ty = C.thankYou || {};
    var thanksHTML =
      '<h2>' + esc(ty.heading || 'Thank you — your answers have been sent') + '</h2>' +
      (ty.body ? '<p>' + esc(ty.body) + '</p>' : '') +
      (ty.next ? '<p>' + esc(ty.next) + '</p>' : '') +
      (ty.signoff ? '<p style="margin-bottom:0"><strong>' + esc(ty.signoff) + '</strong></p>' : '') +
      (data.endpoint ? '' :
        '<p class="hint">A copy has been saved to your Downloads. Please reply to the email ' +
        'this form came from and attach it.</p>');

    var body = F.sections.map(function (s) {
      return '<section class="sec"><h2>' + esc(s.name) + '</h2>' +
        (s.note ? '<p class="secnote">' + esc(s.note) + '</p>' : '') +
        s.fields.map(fieldHTML).join('') + '</section>';
    }).join('');

    var json = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(F.title) + '</title>\n<style>' + FORM_CSS + '</style>\n</head>\n<body>\n' +
      '<div class="wrap">\n' +
      '<header class="top"><h1>' + esc(F.title) + '</h1>' +
      '<p class="intro">' + esc(F.intro) + '</p></header>\n' +
      '<div class="progress"><div class="pbar"><span id="pbar"></span></div>' +
      '<div class="pcount" id="pcount"></div></div>\n' +
      '<div class="done" id="sent" style="display:none">' + thanksHTML + '</div>\n' +
      body +
      '\n<div class="err" id="warn" style="display:none;margin-bottom:10px"></div>\n' +
      '<div class="actions">' +
      '<button class="btn primary" id="btnSubmit" type="button">Submit my answers</button>' +
      '<button class="btn" id="btnPrint" type="button">Print</button>' +
      '<span class="saved" id="savedNote"></span></div>\n' +
      '<p class="help" style="margin-top:18px">Your answers are kept in this browser as you type, so you can ' +
      'close the page and come back to it. Nothing is sent until you press submit.</p>\n' +
      '</div>\n' +
      '<script>window.__FORM__ = ' + json + ';\n(' + formRuntime.toString() + ')();<\/script>\n' +
      '</body>\n</html>';
  }

  function download(formId) {
    var html = buildHTML(formId);
    if (!html) return false;
    var blob = new Blob([html], { type: 'text/html' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = formId.replace(/^doc-/, '') + '-form.html';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 8000);
    return true;
  }

  function parseResponse(text) {
    var p = JSON.parse(text);
    if (!p || !p.projectOsForm || !p.answers) {
      throw new Error('That does not look like a Project OS answers file.');
    }
    return p;
  }

  window.FormKit = {
    has: function (id) { return !!(window.FORMS && window.FORMS[id]); },
    build: buildHTML,
    download: download,
    parseResponse: parseResponse
  };
})();
try { window.__bootStage = 'formkit-loaded'; } catch (e) { }
