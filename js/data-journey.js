/* =====================================================================
   THE DRAGON FIRE PROCESS — the client-facing translation

   The phase names and goals in data-phases.js are written for Sarah.
   They say things like "a prioritised, estimable backlog and an
   information architecture everyone has agreed to", which is exactly
   right in the app and completely wrong in front of a client.

   This file is the other half: for every phase, the same stage said in
   plain English, plus what the client themselves has to do in it.

   Keyed by phase id, so it applies to every client space automatically
   and nothing has to be written per project. A phase with no entry here
   (the growth and audit tracks, or a personal project's own phases)
   falls back to its own name with no description — never to the
   internal goal text.

   Fields
     name   what this stage is called in front of a client
     did    what the stage is, in one or two plain sentences
     needs  true when the client has something to do
     you    what they do. Written even when needs is false, so the row
            never reads as a dead end.
   ===================================================================== */
window.CLIENT_JOURNEY = {

  p0: {
    name: 'Getting to know your business',
    did: 'We talk through what your business does, who you are trying to reach, and what you need a website to actually achieve.',
    needs: true,
    you: 'A proper conversation, and honest answers about what is working and what is not.'
  },

  p1: {
    name: 'Agreeing the work',
    did: 'You get a written proposal setting out exactly what is included, what it costs, and when it will be finished.',
    needs: true,
    you: 'Read the proposal, ask about anything that is not clear, then sign it and pay the deposit.'
  },

  p2: {
    name: 'Understanding your customers',
    did: 'We look at how people actually use your current site and what they are trying to do, so the decisions that follow are based on evidence rather than guesswork.',
    needs: true,
    you: 'Introduce us to a few customers or staff we can talk to, and share any feedback or complaints you already have.'
  },

  p3: {
    name: 'Planning what the site needs to do',
    did: 'Everything we have learnt turns into an agreed list of what the site must do, and a plan of what goes where.',
    needs: true,
    you: 'Review the plan and confirm the priorities are right. This is the moment to say if something is missing.'
  },

  p4: {
    name: 'Mapping out the pages',
    did: 'We sketch the layout of each page — what goes where, and how you move between them — before any design work begins.',
    needs: true,
    you: 'Walk through the sketches and tell us if anything feels wrong or is hard to find.'
  },

  p5: {
    name: 'Designing how it looks',
    did: 'We design the finished look of the site: colours, lettering, images, and the style of every button and form.',
    needs: true,
    you: 'Look over the designs and send one set of feedback with everything in it. We will also need your logo and any photographs you want used.'
  },

  p6: {
    name: 'Testing it with real people',
    did: 'We put the designs in front of real people, find where they get stuck, and fix those things before anything is built.',
    needs: false,
    you: 'Nothing needed. If you would like to sit in on a session and watch, you are very welcome.'
  },

  p7: {
    name: 'Setting up the workshop',
    did: 'The tools and systems the site gets built with are set up, so building starts properly rather than losing the first week to setup.',
    needs: false,
    you: 'Nothing needed, unless you already own a web address or hosting — in which case we will ask you for access.'
  },

  p8: {
    name: 'Building the site',
    did: 'The site gets built in stages. You see working versions as we go, rather than waiting until the end and hoping.',
    needs: true,
    you: 'Look at each version we send you and say what you think. Quick feedback is what keeps this stage moving.'
  },

  p9: {
    name: 'Checking everything works',
    did: 'Every page is tested on phones, tablets and computers, checked so that people with disabilities can use it, and anything broken gets fixed.',
    needs: true,
    you: 'Have a proper look round yourself and tell us about anything that looks or behaves oddly.'
  },

  p10: {
    name: 'Going live',
    did: 'The site goes live on your own web address, with security and monitoring in place, and a way to undo it if anything goes wrong.',
    needs: true,
    you: 'Agree the go-live date, and be reachable on the day in case we need a quick decision from you.'
  },

  p11: {
    name: 'Handing it over',
    did: 'You are shown how to run the site yourself, you get written guides to keep, and we agree what happens from here.',
    needs: true,
    you: 'Come to the handover session, settle the final invoice, and — if you are happy — leave a review.'
  }
};

/* The internal phase names, in order. Used only to recognise a snapshot
   published before the journey existed: those carry no track, so without
   this a Growth or Audit project could have the website journey wrongly
   applied to it — an audit prospect being told their wireframes are done.
   A match here means the snapshot really is a client website project. */
window.CLIENT_PHASE_NAMES = [
  'Discovery & Qualification',
  'Proposal, Pricing & Agreement',
  'UX Research',
  'Strategy, Requirements & User Stories',
  'Wireframes & Prototyping',
  'UI Design & Design System',
  'Usability Testing & Iteration',
  'Technical Setup: Repo, Environments & Handoff',
  'Build — Agile Sprints',
  'QA, Accessibility & Pre-launch Hardening',
  'Deployment & Launch',
  'Handover, Closure & Growth'
];

window.isClientTrackSnapshot = function (pr) {
  if (!pr || pr.phaseTotal !== window.CLIENT_PHASE_NAMES.length) return false;
  if (pr.phaseName === 'Complete') return true;
  return window.CLIENT_PHASE_NAMES.indexOf(pr.phaseName) !== -1;
};

/* What a stage row says when the project is on a track with no
   client-facing translation (growth, audit, personal). Better a bare
   honest name than inventing a description for work this file has
   never seen. */
window.journeyFor = function (phaseId, fallbackName) {
  var j = window.CLIENT_JOURNEY[phaseId];
  if (j) return j;
  return { name: fallbackName || 'This stage', did: '', needs: false, you: '' };
};
