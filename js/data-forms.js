/* =====================================================================
   PROJECT OS — Sendable form definitions
   Any DOCS entry with a matching FORMS entry gains a "Create client form"
   button. Field types: text | email | tel | date | number | textarea |
   select | radio | checkbox | scale | statement
   ===================================================================== */
window.FORMS = {

'doc-intake': {
  task: 'p0-1',
  title: 'Project Enquiry Form',
  intro: 'Thanks for getting in touch. Just enough to understand what you need and come back to you properly — about five minutes. There are no wrong answers, and a rough guess is far better than a blank. The detail can wait until we speak.',
  sections: [
    {
      name: 'About you',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'role', label: 'Your role', type: 'text' },
        { id: 'email', label: 'Email address', type: 'email', required: true },
        { id: 'phone', label: 'Phone number', type: 'tel' },
        { id: 'company', label: 'Company or organisation name', type: 'text' },
        { id: 'website', label: 'Current website (if you have one)', type: 'text', placeholder: 'https://' },
        { id: 'business', label: 'In a sentence or two, what does your business do and who for?', type: 'textarea', required: true }
      ]
    },
    /* The 'problem' section and most of the audience questions were cut: this
       is first contact, and the detail belongs in the discovery call rather
       than a form someone fills in before they have even spoken to me.
       The two questions kept here had to be reworded — they said "they" and
       "them", which referred to the deleted question about who would use it. */
    /* Ids changed with the questions. 'access' used to be a yes/no about
       meeting users and 'alternatives' about current workarounds — reusing
       those ids for entirely different questions would have made old and new
       submissions impossible to tell apart in the answers file. */
    {
      name: 'What good looks like',
      fields: [
        { id: 'likes', label: 'Can you give me up to three sites that you like, or want to be better than?',
          type: 'textarea',
          help: 'Links are ideal, but names are fine. A line on what you like about each one helps even more.' },
        { id: 'competitors', label: 'Who are your main competitors?', type: 'textarea',
          help: 'Whoever your customers would go to instead of you.' }
      ]
    },
    {
      name: 'Scope',
      fields: [
        { id: 'mustdo', label: 'What are your expectations once it is launched?', type: 'textarea', required: true,
          help: 'What should be different for you or your customers once it is live?' },
        { id: 'nicetohave', label: 'What would be good to have eventually, but can wait?', type: 'textarea' }
      ]
    },
    {
      name: 'Practicalities',
      note: 'These three are the ones that let me tell you quickly and honestly whether I can help.',
      fields: [
        { id: 'budget', label: 'Which budget band are you working within?', type: 'radio', required: true,
          options: ['Under £5,000', '£5,000 – £15,000', '£15,000 – £40,000', 'Over £40,000', 'I genuinely do not know yet'],
          help: 'This is not a commitment. It tells me what is realistic so I do not waste your time.' },
        { id: 'deadline', label: 'Is there a date this must be live by?', type: 'text', placeholder: 'e.g. before the spring season, or no fixed date' },
        { id: 'deadlinewhy', label: 'If yes, what happens on that date?', type: 'textarea',
          help: 'A trade show, a contract ending, a busy season — it helps me judge what is genuinely fixed.' },
        { id: 'approver', label: 'Who gives final sign-off on the work?', type: 'text', required: true },
        { id: 'others', label: 'Who else needs to be consulted along the way?', type: 'textarea' }
      ]
    },
    {
      name: 'Finally',
      fields: [
        { id: 'source', label: 'How did you hear about me?', type: 'text' },
        { id: 'anything', label: 'Anything else I should know before we speak?', type: 'textarea' }
      ]
    }
  ]
},

'doc-screener': {
  task: 'p2-1',
  title: 'Research Session — Sign-up',
  intro: 'We are improving how this works and would like to watch a few people use it. Sessions last about an hour, happen over a video call, and there is a thank-you payment. These questions just check the session would be a good use of your time.',
  sections: [
    {
      name: 'About you',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'email', label: 'Email address', type: 'email', required: true },
        { id: 'role', label: 'What best describes you?', type: 'text', required: true }
      ]
    },
    {
      name: 'Your experience',
      fields: [
        { id: 'frequency', label: 'In the last three months, how often have you done this task?', type: 'radio', required: true,
          options: ['Never', 'Once', 'Two to five times', 'More than five times'] },
        { id: 'tools', label: 'Which of these have you used?', type: 'checkbox',
          options: ['Option A', 'Option B', 'Option C', 'None of these'],
          help: 'Edit these options to list your competitors before sending.' },
        { id: 'confidence', label: 'How comfortable are you with new software?', type: 'scale', required: true,
          scaleLabels: ['Not at all', 'Very comfortable'] },
        { id: 'device', label: 'What device would you normally use for this?', type: 'radio',
          options: ['Mobile phone', 'Tablet', 'Laptop or desktop'] },
        { id: 'industry', label: 'Do you work in design, software development or market research?', type: 'radio', required: true,
          options: ['Yes', 'No'] }
      ]
    },
    {
      name: 'Availability',
      fields: [
        { id: 'availability', label: 'Which days generally suit you?', type: 'checkbox',
          options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
        { id: 'times', label: 'What time of day works best?', type: 'checkbox',
          options: ['Morning', 'Early afternoon', 'Late afternoon', 'Evening'] },
        { id: 'notes', label: 'Anything we should know to make the session work for you?', type: 'textarea',
          help: 'Access needs, assistive technology, a quiet time of day — anything at all.' }
      ]
    }
  ]
},

'doc-consent': {
  task: 'p2-3',
  title: 'Research Session — Consent',
  intro: 'Please read and confirm before we start. You can stop at any point, for any reason, and nothing bad happens.',
  sections: [
    {
      name: 'What taking part involves',
      fields: [
        { id: 'statement', type: 'statement',
          label: 'The session lasts roughly an hour over a video call. You will be asked to try a few tasks and talk through what you are thinking. We are testing the design, not you — anything you find confusing is useful information about our work.' },
        { id: 'recording', label: 'I am happy for the session to be recorded (audio, video and screen) for research purposes.', type: 'radio', required: true, options: ['Yes', 'No'] },
        { id: 'storage', label: 'I understand recordings are stored securely, seen only by the project team, and deleted afterwards.', type: 'radio', required: true, options: ['Yes, understood'] },
        { id: 'anon', label: 'I understand my name will not appear in any report and quotes will be anonymised.', type: 'radio', required: true, options: ['Yes, understood'] },
        { id: 'withdraw', label: 'I understand I can skip any question, pause, or stop at any time with no consequence.', type: 'radio', required: true, options: ['Yes, understood'] },
        { id: 'confidential', label: 'I understand I do not need to share anything confidential about my employer.', type: 'radio', required: true, options: ['Yes, understood'] }
      ]
    },
    {
      name: 'Your details',
      fields: [
        { id: 'name', label: 'Your full name', type: 'text', required: true },
        { id: 'date', label: 'Date', type: 'date', required: true },
        { id: 'questions', label: 'Any questions before we begin?', type: 'textarea' }
      ]
    }
  ]
},

'doc-signoff': {
  task: 'p4-6',
  title: 'Review & Sign-off',
  intro: 'Please look through what has been shared and give your feedback here. Gathering everyone\'s comments into this one form keeps things moving and stops anything getting lost across email threads.',
  sections: [
    {
      name: 'About this review',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'deliverable', label: 'What are you reviewing?', type: 'text', required: true,
          placeholder: 'e.g. Wireframes v2, Homepage design' },
        { id: 'date', label: 'Date', type: 'date', required: true },
        { id: 'onbehalf', label: 'Have you gathered comments from anyone else?', type: 'textarea',
          help: 'Please list who, so nothing arrives late from someone I have not heard from.' }
      ]
    },
    {
      name: 'Your feedback',
      fields: [
        { id: 'works', label: 'What works well?', type: 'textarea',
          help: 'Genuinely useful — it stops me changing things that are already right.' },
        { id: 'unclear', label: 'What is confusing or unclear?', type: 'textarea' },
        { id: 'wrong', label: 'Is anything factually wrong? Names, prices, details?', type: 'textarea' },
        { id: 'missing', label: 'Is anything missing that we agreed would be included?', type: 'textarea' },
        { id: 'changes', label: 'Specific changes you would like', type: 'textarea',
          help: 'Please describe the problem as well as your suggested fix — often there is a better solution to the same problem.' }
      ]
    },
    {
      name: 'Decision',
      fields: [
        { id: 'decision', label: 'Where does this leave us?', type: 'radio', required: true,
          options: [
            'Approved — go ahead as it is',
            'Approved with the changes listed above',
            'Not yet — I would like to discuss it first'
          ] },
        { id: 'understood', label: 'I understand that once approved, further changes follow the change request process in our agreement and may affect cost and timeline.',
          type: 'radio', required: true, options: ['Yes, understood'] }
      ]
    }
  ]
},

'doc-content': {
  task: 'p1-4',
  title: 'Content & Assets Request',
  intro: 'Everything I need from you to build the site, in one place. Late content is the single most common cause of a project slipping, so it is worth blocking out an hour for this early.',
  sections: [
    {
      name: 'Who is providing what',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'owner', label: 'Who is responsible for gathering the content?', type: 'text', required: true },
        { id: 'date', label: 'Realistically, when can you have it all to me?', type: 'date', required: true,
          help: 'An honest later date is far more useful than an optimistic earlier one.' }
      ]
    },
    {
      name: 'Written content',
      fields: [
        { id: 'pages', label: 'List the pages you need, one per line', type: 'textarea', required: true },
        { id: 'copystatus', label: 'What state is the writing in?', type: 'radio', required: true,
          options: ['Written and final', 'Drafted, needs a polish', 'Existing copy to be reused', 'Not started', 'I would like help writing it'] },
        { id: 'tone', label: 'How should it sound?', type: 'textarea',
          help: 'Name two or three brands whose tone you like, and say why.' },
        { id: 'legal', label: 'Which legal pages do you have?', type: 'checkbox',
          options: ['Privacy policy', 'Terms and conditions', 'Cookie policy', 'Returns or refunds policy', 'None yet'] }
      ]
    },
    {
      name: 'Images and brand',
      fields: [
        { id: 'logo', label: 'Do you have your logo as a vector file (.svg, .ai or .eps)?', type: 'radio',
          options: ['Yes', 'Only a JPG or PNG', 'No logo yet'] },
        { id: 'photos', label: 'What photography do you have?', type: 'radio',
          options: ['Professional photos, ready to use', 'Decent phone photos', 'Old or low quality', 'None — will need stock imagery'] },
        { id: 'brandfiles', label: 'What brand materials exist?', type: 'checkbox',
          options: ['Brand guidelines document', 'Specific fonts (with licence)', 'Colour codes', 'Printed materials to match', 'Nothing formal'] },
        { id: 'video', label: 'Any video or audio to include?', type: 'textarea' }
      ]
    },
    {
      name: 'Accounts and access',
      note: 'Do not type passwords into this form. Just tell me what exists and I will arrange secure access separately.',
      fields: [
        { id: 'domain', label: 'Who controls your domain name, and do you have access?', type: 'textarea' },
        { id: 'hosting', label: 'Where is the current site hosted, if anywhere?', type: 'text' },
        { id: 'analytics', label: 'Do you have Google Analytics or similar set up?', type: 'radio',
          options: ['Yes, and I have access', 'Yes, but someone else controls it', 'No', 'Not sure'] },
        { id: 'socials', label: 'Which social accounts should be linked?', type: 'textarea' },
        { id: 'other', label: 'Anything else I should know?', type: 'textarea' }
      ]
    }
  ]
}

};
try { window.__bootStage = 'forms-loaded'; } catch (e) { }
