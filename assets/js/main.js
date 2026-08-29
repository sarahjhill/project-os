/* ============================================================
   Sarah J Hill — site behaviour
   No framework, no build step, no dependencies.
   ------------------------------------------------------------
   Index:
     1. Hero countdown        — the three seconds, then resolve
     2. Scroll handling       — sticky nav, progress bar, active link
     3. Cursor glow           — pointer-follow light in the hero
     4. Mobile menu           — burger toggle
     5. The 3-second test     — the interactive choice + verdict
     6. Counters & reveals    — IntersectionObserver
   Everything degrades safely when "reduce motion" is on.
   ============================================================ */

(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var countBox=document.querySelector('.count');
  /* each page can label its own countdown; the homepage wording is the default */
  var LBL_START=(countBox && countBox.dataset.lblStart) || 'seconds to decide';
  var LBL_END  =(countBox && countBox.dataset.lblEnd)   || 'they have decided';
  var num=document.getElementById('num'), lbl=document.getElementById('lbl'),
      tick=document.getElementById('tick'), nav=document.getElementById('nav'),
      timer=null, countdownDone=false;

  /* ---- hero countdown ---- */
  function runCountdown(){
    if(!num || !lbl || !tick){ countdownDone=true; return; }   /* inner pages have no countdown */
    if(reduce){ document.body.classList.add('resolved'); num.textContent='3'; countdownDone=true; return; }
    clearInterval(timer);
    countdownDone=false;
    document.body.classList.remove('resolved');
    tick.style.width=''; tick.classList.remove('run'); void tick.offsetWidth; tick.classList.add('run');
    var n=3; num.textContent=n; lbl.textContent=LBL_START;
    timer=setInterval(function(){
      n--;
      if(n>0){ num.textContent=n; }
      else{ clearInterval(timer); num.textContent='0'; lbl.textContent=LBL_END;
        document.body.classList.add('resolved');
        setTimeout(function(){ tick.classList.remove('run'); countdownDone=true; onScroll(); },400); }
    },1000);
  }

  /* ---- the bar becomes scroll progress once the countdown is done ---- */
  function onScroll(){
    var y=scrollY||document.documentElement.scrollTop;
    if(nav) nav.classList.toggle('stuck', y>40);
    if(countdownDone && tick){
      var h=document.documentElement.scrollHeight-innerHeight;
      tick.style.width=(h>0?(y/h)*100:0)+'%';
    }
    var best='';
    document.querySelectorAll('main section[id], header[id]').forEach(function(s){
      if(s.getBoundingClientRect().top<=140) best=s.id;
    });
    document.querySelectorAll('.navlinks a').forEach(function(a){
      a.classList.toggle('active', a.getAttribute('href')==='#'+best && !a.classList.contains('navcta'));
    });
  }
  addEventListener('scroll', onScroll, {passive:true});

  /* ---- cursor glow ---- */
  var glow=document.getElementById('glow'), hero=document.querySelector('.hero');
  var layers=document.querySelectorAll('.scene .layer');
  if(hero && glow && !reduce && matchMedia('(hover:hover)').matches){
    hero.addEventListener('pointermove', function(e){
      var r=hero.getBoundingClientRect();
      var px=(e.clientX-r.left)/r.width;          /* 0 → 1 across the hero */
      glow.style.setProperty('--mx', (px*100)+'%');
      glow.style.setProperty('--my', ((e.clientY-r.top)/r.height*100)+'%');

      /* skyline parallax — nearer layers drift further, so the city
         has depth rather than being one flat sticker */
      layers.forEach(function(l){
        var d=+l.dataset.depth||0;
        l.style.transform='translateX('+((px-0.5)*-d)+'px)';
      });
    });
  }

  /* ---- mobile menu ---- */
  var burger=document.getElementById('burger');
  if(burger) burger.addEventListener('click', function(){
    var open=nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open?'true':'false');
  });
  document.querySelectorAll('.navlinks a').forEach(function(a){
    a.addEventListener('click', function(){ nav.classList.remove('open'); burger.setAttribute('aria-expanded','false'); });
  });

  /* ---- the 3-second test ---- */
  var A=document.getElementById('cardA'), B=document.getElementById('cardB'),
      bar=document.getElementById('testbar'), verdict=document.getElementById('verdict'),
      vt=document.getElementById('vtitle'), vb=document.getElementById('vbody'),
      testRun=false, testTimer=null;

  function answer(choice){
    if(!A || !B || A.disabled) return;
    clearTimeout(testTimer);
    A.disabled=true; B.disabled=true;
    (choice==='B'?B:choice==='A'?A:null)&&(choice==='B'?B:A).classList.add('chosen');
    if(choice==='B'){
      vt.textContent='Same electrician. Both of them.';
      vb.textContent='Nothing about her skill changed between those two cards. B just put the proof where the doubt was — the face, the years, the registration, the reviews. That is the entire job of your website, and it takes about three seconds to do or to fail.';
    } else if(choice==='A'){
      vt.textContent='Brave. Almost nobody does.';
      vb.textContent='They are the same electrician. A gave you nothing to go on, so choosing her was a gamble — and most people will not gamble with their kitchen wiring. That is not unfair. It is just what happens when the proof is missing.';
    } else {
      vt.textContent='Time is up. You did not ring anyone.';
      vb.textContent='Which is what most of them do. They do not pick the wrong one — they go back to Google and you never hear about it. Both cards were the same electrician; only one gave you a reason to believe her.';
    }
    verdict.classList.add('show');
  }

  if(A && B){
    A.addEventListener('click', function(){ answer('A'); });
    B.addEventListener('click', function(){ answer('B'); });
  }

  function startTest(){
    if(!bar || testRun) return; testRun=true;
    if(reduce) return;
    bar.classList.add('go');
    testTimer=setTimeout(function(){ answer('none'); }, 3100);
  }

  /* ---- counters + reveals ---- */
  function countUp(el){
    var target=+el.dataset.count, start=null, dur=1100;
    requestAnimationFrame(function step(ts){
      if(!start) start=ts;
      var p=Math.min((ts-start)/dur,1);
      el.textContent=Math.round(target*(1-Math.pow(1-p,3)));
      if(p<1) requestAnimationFrame(step);
    });
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting) return;
      e.target.classList.add('in');
      var c=e.target.querySelector('[data-count]');
      if(c&&!c.dataset.done){ c.dataset.done=1; reduce?c.textContent=c.dataset.count:countUp(c); }
      io.unobserve(e.target);
    });
  },{threshold:.15, rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.stand').forEach(function(el,i){
    el.style.transitionDelay=((i%4)*70)+'ms'; io.observe(el);
  });

  var testSection=document.getElementById('test');
  if(testSection){
    var testIO=new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ startTest(); testIO.disconnect(); } });
    },{threshold:.45});
    testIO.observe(testSection);
  }

  var replay=document.getElementById('replay');
  if(replay) replay.addEventListener('click', runCountdown);
  var yr=document.getElementById('yr');
  if(yr) yr.textContent=new Date().getFullYear();
  runCountdown(); onScroll();
})();
