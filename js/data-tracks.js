/* =====================================================================
   PROJECT OS — Process tracks

   A project is not always a client website. The original process assumes
   somebody is paying you to build them one, which is right for client work
   and wrong for everything else you do. A track is simply a named set of
   phases, and each project picks one.

   Adding another track means adding a data-phases-*.js file and one entry
   here — nothing else in the app needs to change.
   ===================================================================== */
window.TRACKS = {
  client: {
    id: 'client',
    name: 'Client website',
    short: 'Client',
    blurb: 'The SJH Process — twelve phases from first enquiry to handover.',
    phases: window.PHASES || []
  },
  growth: {
    id: 'growth',
    name: 'Growth & marketing',
    short: 'Growth',
    blurb: 'For your own projects: getting found, getting listed, and keeping it going.',
    phases: window.PHASES_GROWTH || []
  },
  audit: {
    id: 'audit',
    name: 'Website audit',
    short: 'Audit',
    blurb: 'The outbound website-audit programme, tracked per prospect: find, scan, report, contact.',
    phases: window.PHASES_AUDIT || []
  },
  personal: {
    id: 'personal',
    name: 'Personal project',
    short: 'Personal',
    blurb: 'Your own plan, your own phases and tasks — nothing pre-loaded. Build it when you create the project.',
    /* Personal projects don't share one template the way client/growth/audit
       do — each one carries its own phases on the project itself
       (project.customPhases). This entry exists so the track picker and
       any code that lists window.TRACKS finds it; store.js’s phases()
       reads project.customPhases directly for track === 'personal' and
       never looks at this empty array. */
    phases: []
  }
};

window.DEFAULT_TRACK = 'client';

/* Anything without a recognised track falls back to the client one, so
   every project saved before tracks existed keeps working untouched. */
window.trackFor = function (id) {
  return window.TRACKS[id] || window.TRACKS[window.DEFAULT_TRACK];
};
window.phasesFor = function (id) {
  return window.trackFor(id).phases || [];
};
