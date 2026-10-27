/* =====================================================================
   PROJECT OS — Sendable form definitions
   Any DOCS entry with a matching FORMS entry gains a "Create client form"
   button. Field types: text | email | tel | date | number | textarea |
   select | radio | checkbox | scale | statement
   ===================================================================== */
window.FORMS = {

'doc-intake': {
  "task": "p0-1",
  "title": "Light the fire",
  "intro": "Ten minutes, a few honest answers, and we'll both know if we're the right fit. A rough answer beats a blank, and if something stumps you, just say so. We can work it out together.",
  "sections": [
    {
      "name": "You and your business",
      "fields": [
        {
          "id": "name",
          "label": "Your name",
          "type": "text",
          "required": true
        },
        {
          "id": "email",
          "label": "Email address",
          "type": "email",
          "required": true
        },
        {
          "id": "business",
          "label": "What does your business do, and who for?",
          "type": "textarea",
          "required": true
        },
        {
          "id": "website",
          "label": "Your current website, if you have one",
          "type": "text",
          "placeholder": "https://"
        },
        {
          "id": "source",
          "label": "Who sent you my way, or how did you find me?",
          "type": "text",
          "help": "If someone recommended me, tell me who. I like to say thank you."
        }
      ]
    },
    {
      "name": "What you want",
      "fields": [
        {
          "id": "goals",
          "label": "What do you want your website to do for you?",
          "type": "textarea",
          "required": true,
          "help": "Be specific: ‘10 more bookings a month by spring’ beats ‘more customers’. Up to three goals is perfect."
        },
        {
          "id": "customer",
          "label": "Who is your ideal customer, and what do they need from your site?",
          "type": "textarea"
        },
        {
          "id": "feel",
          "label": "How should people feel when they land on your site?",
          "type": "textarea",
          "help": "Any sites you love (or want to beat) are really useful too. Links are great."
        }
      ]
    },
    {
      "name": "Practicalities",
      "note": "These let me tell you quickly and honestly whether I can help.",
      "fields": [
        {
          "id": "budget",
          "label": "Which budget are you working with?",
          "type": "radio",
          "required": true,
          "options": [
            "Under £300",
            "£300 – £600",
            "£600 – £1,200",
            "£1,200 – £2,500",
            "£2,500 – £4,500",
            "£4,500 +",
            "I genuinely don't know yet"
          ],
          "help": "Not a commitment. It just stops either of us wasting time."
        },
        {
          "id": "deadline",
          "label": "Is there a date it must be live by? If so, why?",
          "type": "text",
          "placeholder": "e.g. before the spring season, or no fixed date"
        },
        {
          "id": "approver",
          "label": "Who has the final say on decisions?",
          "type": "text",
          "required": true,
          "placeholder": "e.g. just me, or me and my business partner"
        }
      ]
    },
    {
      "name": "The big one",
      "fields": [
        {
          "id": "success",
          "label": "Picture us celebrating a year after launch. What has your website done for you?",
          "type": "textarea",
          "required": true,
          "help": "This is the question that matters most. A few lines is plenty."
        }
      ]
    }
  ]
},

'doc-precall': {
  task: 'p0-1e',
  title: 'Before our call',
  intro: 'Five minutes now makes our call twice as useful. Rough answers are perfect. This is so I can come prepared, not a test.',
  sections: [
    {
      name: 'Who is joining',
      note: 'Everyone who will make the final decision needs to be on the call. It saves you passing everything on, and nothing gets lost. On a phone call, I can add them to a group call.',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'email', label: 'Email address', type: 'email', required: true },
        { id: 'time', label: 'Which of the call times I offered suits you?', type: 'text', required: true,
          placeholder: 'e.g. Tuesday at 10' },
        { id: 'people', label: 'Who else will be on the call? Names, roles and email addresses', type: 'textarea', required: true,
          help: 'Include everyone who signs off on decisions or the budget. If it is just you, write "just me".' },
        { id: 'where', label: 'How would you like to talk?', type: 'radio', required: true,
          options: ['Google Meet video call', 'Phone call'] },
        { id: 'phone', label: 'If you would like a phone call, what is the best number to ring?', type: 'tel',
          placeholder: 'e.g. 07700 900123',
          help: 'For a video call I will email you the Google Meet link.' }
      ]
    },
    {
      name: 'Getting ready',
      fields: [
        { id: 'record', label: 'Are you happy for me to record the call?', type: 'radio', required: true,
          options: ['Yes, that is fine', 'No, please just take notes'],
          help: 'Only so I do not miss anything you say. The recording is never shared, is used only for my notes, and is deleted when the project ends.' },
        { id: 'why', label: 'Why do you need a new website? List every reason you can think of', type: 'textarea', required: true,
          help: 'Big or small, all of them. We will dig into these together on the call.' },
        { id: 'top', label: 'If you could only fix one thing, what would it be?', type: 'textarea' },
        { id: 'changed', label: 'Has anything changed since you filled in the Light the fire form?', type: 'textarea',
          help: 'A new date, a new budget, someone new involved, anything at all.' },
        { id: 'look', label: 'Anything you would like me to look at before we talk?', type: 'textarea',
          help: 'Competitors, websites you love, your social pages, a brochure. Links are perfect.' }
      ]
    }
  ]
},

'doc-recap': {
  task: 'p0-2b',
  title: 'Check my recap',
  intro: 'I have written down what I heard on our call. Two minutes to tell me I have got it right, or put me straight, and your proposal will be built on exactly what you need.',
  sections: [
    {
      name: 'Did I get it right?',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'right', label: 'How close is my recap?', type: 'radio', required: true,
          options: ['Spot on', 'Mostly right, with a few small changes', 'I would change quite a lot'] },
        { id: 'wrong', label: 'What did I get wrong, or miss?', type: 'textarea',
          help: 'Your goals, your customers, what success looks like, the budget. Anything at all.' },
        { id: 'since', label: 'Has anything come to mind since the call?', type: 'textarea' }
      ]
    },
    {
      name: 'Getting the proposal to you',
      fields: [
        { id: 'who', label: 'Who else needs to see the proposal?', type: 'textarea',
          help: 'Names and email addresses, so it reaches everyone who decides at the same time.' },
        { id: 'how', label: 'How would you like to go through it?', type: 'radio', required: true,
          options: ['Talk me through it on a call', 'Email it and I will read it first', 'Both, please'] },
        { id: 'when', label: 'Is there a date you need to decide by?', type: 'text',
          placeholder: 'e.g. before our board meeting on the 20th, or no rush' }
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
},

/* The one form that arrives before there is a project at all. It is the front
   door for the free website audit offered on Make It Pop, so it asks only what
   is needed to run the audit and write the report — no budget, no sign-off, no
   deadline. Those belong in doc-intake, which comes later and only if the
   audit turns into work. */
'doc-audit': {
  task: 'p0-2',
  title: 'Free Website Audit — Request',
  intro: 'Thanks for asking. This is enough for me to look at your website properly and come back with something specific rather than generic — about three minutes. Rough guesses beat blanks, and anything you would rather not answer can stay empty.',
  sections: [
    {
      name: 'About you',
      fields: [
        { id: 'name', label: 'Your name', type: 'text', required: true },
        { id: 'email', label: 'Email address', type: 'email', required: true,
          help: 'This is where your report will be sent.' },
        { id: 'phone', label: 'Phone number', type: 'tel',
          help: 'Only if you would rather I rang than emailed.' },
        { id: 'company', label: 'Business or organisation name', type: 'text', required: true },
        { id: 'website', label: 'Your website address', type: 'text', required: true, placeholder: 'https://',
          help: 'The one you want me to look at. If you have more than one, whichever is busiest.' },
        { id: 'business', label: 'In a sentence or two, what do you do and who for?', type: 'textarea', required: true },
        { id: 'orgtype', label: 'Which of these fits you best?', type: 'radio', required: true,
          options: ['A local business', 'A charity, mosque or good cause', 'A school or education group', 'A community group or club', 'Something else'] },
        { id: 'area', label: 'Which areas do you serve?', type: 'text',
          placeholder: 'e.g. Cardiff and the Vale, or just Grangetown',
          help: 'It tells me who you are up against in the local search results.' }
      ]
    },
    {
      name: 'What is bothering you',
      fields: [
        { id: 'concern', label: 'What made you ask for an audit?', type: 'textarea', required: true,
          help: 'Even "it feels slow and I do not know why" is a useful answer.' },
        { id: 'goal', label: 'What would you most like more of?', type: 'radio', required: true,
          options: ['Phone calls', 'Enquiries through the website', 'Online bookings or appointments', 'Online sales', 'Donations', 'People through the door', 'I am not sure yet'] },
        { id: 'knownissues', label: 'Is there anything you already know is broken or annoying?', type: 'textarea',
          help: 'No need to be technical. "The contact page looks wrong on my phone" is perfect.' },
        { id: 'competitors', label: 'Who do you lose customers to?', type: 'textarea',
          help: 'Names or links, whichever is easier. I will look at how you compare.' }
      ]
    },
    {
      /* The three questions that make the report's figures defensible: the
         estimate is built from the client's own numbers rather than an
         industry average dressed up as a prediction about their business. */
      name: 'Your numbers',
      note: 'These are what let me put a realistic figure on what the website is costing you, using your numbers rather than invented ones. A rough guess is fine. Leave them blank if you would rather not say and I will fall back on industry ranges — the report just gets less precise, not less useful.',
      fields: [
        { id: 'enquiries', label: 'Roughly how many enquiries do you get in a typical week?', type: 'text',
          placeholder: 'e.g. about ten, calls and emails together' },
        { id: 'customervalue', label: 'Roughly what is an average customer worth to you?', type: 'text',
          placeholder: 'e.g. £200 a job, or £40 a month',
          help: 'Whatever a typical sale, job or donation comes to.' },
        { id: 'closerate', label: 'Of the people who get in touch, roughly how many become customers?', type: 'text',
          placeholder: 'e.g. about half' },
        { id: 'tracking', label: 'Do you have Google Analytics or Search Console set up?', type: 'radio',
          options: ['Yes, both', 'One of them, I think', 'No', 'I have no idea'],
          help: 'If you do, there is real data I can use instead of estimates. If not, that is completely normal.' }
      ]
    },
    {
      name: 'The practical bits',
      fields: [
        { id: 'whobuilt', label: 'Who built the site, and who looks after it now?', type: 'text',
          placeholder: 'e.g. my nephew in 2019, nobody since' },
        { id: 'access', label: 'Could you get in and change something if you needed to?', type: 'radio',
          options: ['Yes, I have the logins', 'Someone else has them', 'I do not know'],
          help: 'This decides whether the fix list is something you can act on yourself.' },
        { id: 'gbp', label: 'Do you have a Google Business Profile?', type: 'radio',
          options: ['Yes, and I keep it updated', 'Yes, but I never touch it', 'No', 'I do not know what that is'],
          help: 'The listing with your opening hours and reviews that appears on Google Maps.' },
        /* Asked rather than assumed. The checks are read-only and public, but
           running them against someone's site without saying so is not how I
           want to open a relationship. */
        { id: 'permission', label: 'May I run automated tests against your website?', type: 'checkbox', required: true,
          options: ['Yes — run speed, mobile and accessibility checks on my site'],
          help: 'The same read-only checks anyone can run on any public website. Nothing is changed and nothing is published.' }
      ]
    },
    {
      name: 'Finally',
      fields: [
        { id: 'source', label: 'How did you hear about me?', type: 'text' },
        { id: 'anything', label: 'Anything else I should know?', type: 'textarea' }
      ]
    }
  ]
}

};
try { window.__bootStage = 'forms-loaded'; } catch (e) { }
