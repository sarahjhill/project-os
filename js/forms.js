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

  /* The Sarah J Hill mark, with the Poppins glyphs already converted to
     paths so it renders identically with no font available. */
  var SJ_MARK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Sarah J Hill"> <title>Sarah J Hill</title> <rect width="512" height="512" rx="112" fill="#1a1a20"/> <rect x="26" y="26" width="460" height="460" rx="92" fill="none" stroke="#07beb8" stroke-width="20"/> <path d="M70 286 L446 258 L450 330 L74 356 Z" fill="#ff1791"/> <path fill="#ffffff" d="M144.257 273.98900000000003H168.919Q169.273 278.355 171.515 280.361Q173.757 282.367 177.297 282.367Q180.483 282.367 182.548 280.774Q184.613 279.18100000000004 184.613 276.34900000000005Q184.613 272.69100000000003 181.191 270.68500000000006Q177.769 268.67900000000003 170.09900000000002 266.201Q161.957 263.487 156.942 260.95000000000005Q151.92700000000002 258.413 148.21 253.51600000000002Q144.493 248.61900000000003 144.493 240.71300000000002Q144.493 232.68900000000002 148.505 226.966Q152.517 221.24300000000002 159.597 218.293Q166.67700000000002 215.34300000000002 175.645 215.34300000000002Q190.159 215.34300000000002 198.832 222.12800000000001Q207.505 228.913 208.095 241.18500000000003H182.961Q182.84300000000002 237.40900000000002 180.66000000000003 235.52100000000002Q178.477 233.63300000000004 175.055 233.63300000000004Q172.459 233.63300000000004 170.80700000000002 235.16700000000003Q169.155 236.70100000000002 169.155 239.53300000000002Q169.155 241.89300000000003 170.984 243.60400000000004Q172.81300000000002 245.31500000000003 175.52700000000002 246.55400000000003Q178.241 247.793 183.55100000000002 249.681Q191.457 252.395 196.59 255.05Q201.723 257.70500000000004 205.44 262.48400000000004Q209.157 267.26300000000003 209.157 274.579Q209.157 282.01300000000003 205.44 287.913Q201.723 293.81300000000005 194.702 297.235Q187.681 300.65700000000004 178.123 300.65700000000004Q163.609 300.65700000000004 154.287 293.754Q144.965 286.851 144.257 273.98900000000003Z M276.001 216.64100000000002V271.747Q276.001 285.78900000000004 268.39 293.22300000000007Q260.779 300.65700000000004 247.445 300.65700000000004Q233.285 300.65700000000004 224.848 292.75100000000003Q216.411 284.845 216.411 269.97700000000003H239.303Q239.421 279.771 246.501 279.771Q252.873 279.771 252.873 271.747V216.64100000000002Z M365.265 216.64100000000002V299.831H342.137V266.437H313.935V299.831H290.807V216.64100000000002H313.935V247.91100000000003H342.137V216.64100000000002Z"/> </svg>';

  /* ---------- the stylesheet used inside the generated form ---------- */
  var FORM_CSS = [
    /* Sarah J Hill palette. --accent is a darkened brand teal: the bright
       #07beb8 is only 2.3:1 on white and fails as text or as a button fill. */
    ':root{--bg:#F6F8F8;--surface:#fff;--sunken:#EDF1F1;--text:#15201F;--text-2:#54615F;',
    '--text-3:#84918F;--border:#DFE6E5;--strong:#C6D1D0;--accent:#08807C;--accent-bright:#07beb8;',
    '--brand-2:#6917d0;--accent-soft:#E4F5F4;--danger:#B02F2F;--ok:#1E7A5A}',
    '*{box-sizing:border-box}',
    'body{margin:0;background:var(--bg);color:var(--text);line-height:1.55;',
    "font-family:'Lato',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:16px}",
    "h1,h2,.brandname{font-family:'Poppins',Georgia,serif;letter-spacing:-.02em}",
    '.wrap{max-width:720px;margin:0 auto;padding:32px 20px 80px}',
    'header.top{margin-bottom:28px}',
    '.brand{display:flex;align-items:center;gap:11px;margin-bottom:20px;',
    'padding-bottom:16px;border-bottom:1px solid var(--border)}',
    '.brand img{width:38px;height:38px;border-radius:10px;display:block;flex:0 0 auto}',
    '.brandname{font-size:15px;font-weight:700;line-height:1.15;color:var(--text)}',
    '.brandsub{font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--text-3)}',
    'h1{font-size:26px;font-weight:700;margin:0 0 10px}',
    '.intro{color:var(--text-2);margin:0}',
    'footer.foot{margin-top:34px;padding-top:16px;border-top:1px solid var(--border);',
    'font-size:12.5px;color:var(--text-3);text-align:center}',
    '.progress{position:sticky;top:0;background:var(--bg);padding:12px 0;z-index:5;margin-bottom:4px}',
    '.pbar{height:6px;background:var(--sunken);border-radius:99px;overflow:hidden}',
    '.pbar>span{display:block;height:100%;width:0;transition:width .25s;',
'background:linear-gradient(90deg,var(--brand-2),var(--accent-bright))}',
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
    '.opt.on{border-color:var(--accent);background:var(--accent-soft)}',
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
      out._subject = (F.studioName || 'The SJH Process') + ' — ' + F.title +
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
    data.studioName = C.studioName || 'The SJH Process';

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

    /* The SJ mark is inlined as a data URI rather than linked, so the form
       still shows the brand when it is saved to disk or opened offline. */
    var MARK = 'data:image/svg+xml;utf8,' + encodeURIComponent(SJ_MARK);

    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
      '<title>' + esc(F.title) + ' — Sarah J Hill</title>\n' +
      '<link rel="icon" href="' + MARK + '">\n' +
      '<link rel="preconnect" href="https://fonts.googleapis.com">\n' +
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
      '<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">\n' +
      '<style>' + FORM_CSS + '</style>\n</head>\n<body>\n' +
      '<div class="wrap">\n' +
      '<header class="top">' +
      '<div class="brand"><img src="' + MARK + '" alt="">' +
      '<div><div class="brandname">The SJH Process</div>' +
      '<div class="brandsub">Sarah J Hill</div></div></div>' +
      '<h1>' + esc(F.title) + '</h1>' +
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
      '<footer class="foot">&copy; ' + new Date().getFullYear() + ' Sarah J Hill &middot; ' +
      'Your answers come straight to me and are not shared with anyone else.</footer>\n' +
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
      throw new Error('That does not look like a SJH Process answers file.');
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
