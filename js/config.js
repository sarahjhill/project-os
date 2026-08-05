/* =====================================================================
   PROJECT OS — Your settings
   This is the only file you need to edit to switch submissions on.
   ===================================================================== */
window.CONFIG = {

  /* ------------------------------------------------------------------
     1. FORMSPREE ENDPOINT
     ------------------------------------------------------------------
     Where client form submissions are sent.

     To get yours:
       1. Sign up free at https://formspree.io
       2. New Project  →  New Form.  Name it "Project OS".
       3. Copy the endpoint it shows you. It looks like:
              https://formspree.io/f/xyzabcde
       4. Paste it below, between the quotes.

     Leave it empty and the forms fall back to downloading a file,
     exactly as they did before.

     Note: the FIRST submission to a new Formspree form triggers a
     confirmation email to you. Click the link in it, or later
     submissions will not come through. Test it on yourself first.
  ------------------------------------------------------------------ */
  formspreeEndpoint: 'https://formspree.io/f/xeajqrao',

  /* ------------------------------------------------------------------
     2. WHERE THE APP LIVES
     ------------------------------------------------------------------
     Used to build the one-click "file these answers" link in your
     notification email. Set it to your deployed address, e.g.
         'https://yourname.github.io/project-os/'
     Leave empty and the link is left out; you can still paste answers in.
  ------------------------------------------------------------------ */
  appUrl: '',

  /* ------------------------------------------------------------------
     3. WHAT THE CLIENT SEES AFTER SUBMITTING
     ------------------------------------------------------------------ */
  thankYou: {
    heading: 'Thank you — your answers have been sent',
    body: 'Everything has been delivered safely. I read these properly rather than skimming them, so give me a little time.',
    next: 'I will be in touch within two working days with my thoughts and the next steps. If anything urgent comes up before then, just reply to the email this form came from.',
    signoff: ''   // e.g. 'Sarah Hill — Studio'
  },

  /* ------------------------------------------------------------------
     4. YOUR DETAILS (optional)
     ------------------------------------------------------------------
     Only used in the subject line of the notification email.
  ------------------------------------------------------------------ */
  studioName: 'Project OS'
};
try { window.__bootStage = 'config-loaded'; } catch (e) { }
