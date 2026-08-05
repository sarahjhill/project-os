/* =====================================================================
   PROJECT OS — Process data, Phases 0–5
   Schema per task:
     id, title, role, est (hours), pri (1=Critical 4=Low), pts (story points)
     why  : why this task exists / what it protects you from
     how  : ordered, concrete steps
     deliver: artefacts produced
     tools: recommended tooling
     dod  : definition of done checklist
     docs : ids of templates in data-docs.js
   ===================================================================== */
window.PHASES = [
{
  id: 'p0', num: 0, name: 'Discovery & Qualification', short: 'Discovery',
  goal: 'Decide whether this project is worth doing, understand the business problem, and gather enough to price it accurately.',
  exit: [
    'You can state the client\'s problem, success metric and budget range in one paragraph',
    'You know who the decision-maker is and their timeline',
    'You have decided to proceed, decline, or run a paid discovery sprint'
  ],
  tasks: [
    {
      id: 'p0-1', title: 'Send the intake questionnaire', role: 'Lead', est: 1, pri: 1, pts: 1,
      why: 'Filters out unqualified leads before you spend an hour on a call, and gives you written answers you can quote back in the proposal.',
      how: [
        'Send the questionnaire within 4 hours of first contact — speed is the strongest signal of professionalism.',
        'Keep it to 12–15 questions. Anything longer gets abandoned.',
        'Always include the three qualifying questions: budget range, deadline, and who signs off.',
        'Use a form tool so answers land in one place (Tally, Typeform, Google Forms) — do not use a Word attachment.',
        'Set an auto-reply confirming you will respond within 2 business days.',
        'If budget or timeline is left blank, ask once by email before booking a call.'
      ],
      deliver: ['Completed intake questionnaire', 'Lead record in your CRM/notes'],
      tools: ['Tally / Typeform', 'Notion or Airtable as a lead log'],
      dod: ['Questionnaire returned', 'Budget band and deadline known', 'Decision-maker identified'],
      docs: ['doc-intake']
    },
    {
      id: 'p0-2', title: 'Run the discovery call', role: 'Lead', est: 1.5, pri: 1, pts: 2,
      why: 'The questionnaire tells you what they think they want. The call tells you what they actually need and whether you can work with them.',
      how: [
        'Book 45 minutes. Record it with consent — you will want the exact wording later.',
        'Open by restating their questionnaire answers back to them: "You said X — is that still right?" This builds trust fast.',
        'Spend the first 20 minutes only on the problem, not the solution. Ask "what happens today when someone tries to do this?"',
        'Ask the money question directly: "What does it cost you every month that this problem exists?" This anchors value pricing.',
        'Ask the failure question: "If we ship this and in six months it has not worked, what would have gone wrong?" Surfaces hidden constraints.',
        'Ask about existing systems, data, and integrations — this is where full-stack scope hides.',
        'Close by stating next step and date: "I will send a proposal by Thursday."'
      ],
      deliver: ['Call recording + transcript', 'Notes against the discovery script', 'Draft scope bullet list'],
      tools: ['Google Meet / Zoom with recording', 'Otter or built-in transcription'],
      dod: ['Problem statement written', 'Constraints and integrations listed', 'Next step agreed on the call'],
      docs: ['doc-discovery-script']
    },
    {
      id: 'p0-3', title: 'Qualify: go / no-go decision', role: 'Lead', est: 0.5, pri: 1, pts: 1,
      why: 'Bad-fit projects are the single biggest cause of unprofitable months for a solo studio. Say no early, in writing, politely.',
      how: [
        'Score the lead against: budget fit, clear decision-maker, realistic timeline, problem you have solved before, client responsiveness.',
        'Red flags: "we just need a quick site", no budget stated after two asks, more than three stakeholders with no lead, payment terms pushed beyond 30 days.',
        'If it is a strong problem but an unclear scope, offer a paid discovery sprint instead of a fixed-price build.',
        'If declining, send a short, warm email and recommend someone else. Referrals come back.'
      ],
      deliver: ['Go/no-go decision logged', 'Decline email or proposal green-light'],
      tools: ['Your lead log'],
      dod: ['Decision recorded with a one-line reason'],
      docs: ['doc-qualify']
    },
    {
      id: 'p0-4', title: 'Competitive and market scan', role: 'Strategy', est: 3, pri: 2, pts: 3,
      why: 'You cannot propose a differentiated solution without knowing what the client\'s users already compare them to.',
      how: [
        'List 5 direct competitors and 3 analogous products from other industries.',
        'For each: capture pricing, onboarding flow, core value prop, and 3 screenshots of the key journey.',
        'Note conventions users will already expect — breaking these costs you usability, breaking them deliberately is a design decision you must justify.',
        'Read 20–30 reviews (G2, Trustpilot, App Store) and tag recurring complaints. These are your opportunity spaces.',
        'Summarise into a one-page positioning gap: "Everyone does A and B; nobody does C well."'
      ],
      deliver: ['Competitive audit board', 'Positioning gap statement'],
      tools: ['FigJam or Milanote', 'Screenshot tool'],
      dod: ['5+ competitors captured', 'Opportunity gaps written as statements, not observations'],
      docs: ['doc-competitive']
    },
    {
      id: 'p0-5', title: 'Draft the pitch / concept deck', role: 'Lead', est: 3, pri: 2, pts: 3,
      why: 'For competitive or higher-value work, a short concept deck wins the job before the proposal justifies the price.',
      how: [
        'Structure: their problem → evidence → your point of view → proposed approach → why you → what happens next.',
        'Lead with their words from the discovery call, verbatim. It proves you listened.',
        'Include one visual provocation — a rough concept, a redrawn flow, a competitor teardown slide.',
        'Do not present full designs for free. Show thinking, not pixels.',
        'Keep it to 10–12 slides and present it live rather than emailing it cold.'
      ],
      deliver: ['Pitch deck (PDF)', 'Presentation booked'],
      tools: ['Figma Slides / Pitch / Keynote'],
      dod: ['Deck reviewed once away from the screen', 'Presented live, not emailed'],
      docs: ['doc-pitch']
    }
  ]
},
{
  id: 'p1', num: 1, name: 'Proposal, Pricing & Agreement', short: 'Proposal',
  goal: 'Convert the opportunity into a signed, scoped, deposit-paid engagement with no ambiguity about what is and is not included.',
  exit: [
    'Signed contract and SOW in your files',
    'Deposit cleared',
    'Kick-off date in both calendars'
  ],
  tasks: [
    {
      id: 'p1-1', title: 'Scope and estimate the work', role: 'Lead', est: 3, pri: 1, pts: 3,
      why: 'Estimating from a feature list is how solo studios lose money. Estimate from tasks, then add the invisible work.',
      how: [
        'Break the build into epics, then into rough user stories. Do not skip to hours.',
        'Estimate each story in ideal hours, then apply a 1.4x multiplier for real-world interruption.',
        'Add explicit line items for the invisible work: project management (15%), client revisions (2 rounds), QA, deployment, documentation, handover training.',
        'For full-stack work, estimate backend and frontend separately — API design, auth, data modelling and migrations are routinely underestimated.',
        'Add a contingency band of 15–20% and say so openly; clients respect honesty about uncertainty.',
        'Produce three numbers: lean, recommended, and premium. Most clients pick the middle.'
      ],
      deliver: ['Estimate spreadsheet', 'Three-tier pricing'],
      tools: ['Spreadsheet', 'Your historical time-tracking data'],
      dod: ['Every line item traceable to a story or a named overhead', 'Contingency included'],
      docs: ['doc-estimate']
    },
    {
      id: 'p1-2', title: 'Write and send the proposal', role: 'Lead', est: 3, pri: 1, pts: 3,
      why: 'The proposal is a selling document, not a price list. It should make the price feel like the smaller number in the equation.',
      how: [
        'Order matters: understanding of their problem → outcome you will deliver → approach and phases → deliverables → timeline → investment → terms → next step.',
        'Put the price after the value, never on page one.',
        'Define exclusions explicitly. "Not included: content writing, photography, ongoing hosting, third-party licence fees, SEO campaigns."',
        'State the revision policy in numbers: "Two rounds of consolidated feedback per design phase; further rounds billed at £X/hr."',
        'Attach the payment schedule: typically 40% deposit / 30% at design sign-off / 30% on launch.',
        'Include an expiry date (14 days) — it creates a decision.',
        'Send as a link, not an attachment, so you can see it was opened and update it.'
      ],
      deliver: ['Proposal document/link', 'Payment schedule'],
      tools: ['Better Proposals / PandaDoc / a well-built PDF'],
      dod: ['Exclusions section present', 'Revision limits stated', 'Expiry date included'],
      docs: ['doc-proposal']
    },
    {
      id: 'p1-3', title: 'Contract, SOW and deposit', role: 'Lead', est: 2, pri: 1, pts: 2,
      why: 'The proposal sells; the contract protects. Never start work on a signed proposal alone.',
      how: [
        'Contract covers: IP transfer on final payment, kill fee, late payment interest, client responsibilities, confidentiality, limitation of liability.',
        'SOW covers: deliverable list, acceptance criteria per deliverable, timeline with client-dependency dates, change request process.',
        'Define the change request process concretely: written request → you estimate → client approves in writing → schedule shifts by X days.',
        'State client dependencies as dated obligations: content by day 10, feedback within 3 business days, stakeholder availability for testing.',
        'Do not schedule the kick-off until the deposit has cleared, not "been sent".'
      ],
      deliver: ['Signed contract', 'Signed SOW', 'Deposit invoice paid'],
      tools: ['Docusign / Dropbox Sign', 'Stripe or bank transfer invoicing'],
      dod: ['Both documents signed and filed', 'Deposit cleared in your account'],
      docs: ['doc-sow', 'doc-contract-checklist']
    },
    {
      id: 'p1-4', title: 'Kick-off meeting and comms setup', role: 'Lead', est: 1.5, pri: 1, pts: 2,
      why: 'Sets the operating rhythm. Projects fail on communication far more often than on craft.',
      how: [
        'Agenda: introductions and roles, project goals recap, phase walkthrough, decision-making process, tools, escalation path, dates.',
        'Name a single client-side decision-maker out loud and get agreement. This one move prevents most feedback chaos.',
        'Agree the feedback rules: consolidated in one place, within 3 business days, from the named approver.',
        'Set up the shared space: project channel (Slack Connect / email alias), shared drive folder structure, this tracker link.',
        'Book all recurring meetings for the whole project now — weekly 30-minute check-in plus phase review sessions.',
        'Send a written recap within 24 hours. If it is not written down, it was not agreed.'
      ],
      deliver: ['Kick-off deck', 'Written recap email', 'Shared folder + channel', 'Calendar invites'],
      tools: ['Slack Connect', 'Google Drive / Dropbox', 'Calendar'],
      dod: ['Single approver named in writing', 'All recurring meetings booked', 'Recap sent'],
      docs: ['doc-kickoff', 'doc-content']
    },
    {
      id: 'p1-5', title: 'Set up project admin and time tracking', role: 'Ops', est: 1, pri: 2, pts: 1,
      why: 'You cannot price the next project accurately without data from this one.',
      how: [
        'Create the project in your time tracker with categories matching your estimate line items.',
        'Create the folder structure: 00-admin, 01-research, 02-design, 03-content, 04-dev, 05-handover.',
        'Set up the invoice schedule with reminders on the milestone dates.',
        'Add the project to your capacity plan so you do not oversell the same weeks.'
      ],
      deliver: ['Time tracking project', 'Folder structure', 'Scheduled invoice reminders'],
      tools: ['Toggl / Harvest', 'Cloud storage'],
      dod: ['Tracking categories mirror the estimate', 'Invoice reminders set'],
      docs: []
    }
  ]
},
{
  id: 'p2', num: 2, name: 'UX Research', short: 'Research',
  goal: 'Replace assumptions with evidence about who the users are, what they are trying to do, and where the current experience fails them.',
  exit: [
    'Research questions answered with evidence, not opinion',
    'Findings synthesised into themes the client has seen and agreed with',
    'Personas and journey maps signed off'
  ],
  tasks: [
    {
      id: 'p2-1', title: 'Write the research plan', role: 'UX', est: 2, pri: 1, pts: 2,
      why: 'Research without a plan becomes an unbounded, unbillable rabbit hole. The plan is what you get signed off.',
      how: [
        'Start from decisions, not curiosity: "What decision will this research let us make?"',
        'Write 3–5 research questions. Example: "How do current customers decide between plans, and where do they hesitate?"',
        'Choose methods per question: interviews for motivation, analytics for behaviour, surveys for scale, usability tests for interface problems.',
        'Define participants: how many, what screening criteria, how recruited, what incentive.',
        'Set the timebox and state explicitly what is out of scope.',
        'Get the client to approve the plan and to help with recruitment — client-supplied participants save days.'
      ],
      deliver: ['Research plan (1–2 pages)', 'Recruitment screener'],
      tools: ['Docs', 'Recruitment: client list, User Interviews, Respondent'],
      dod: ['Each research question has a method and a participant count', 'Client approved in writing'],
      docs: ['doc-research-plan', 'doc-screener']
    },
    {
      id: 'p2-2', title: 'Stakeholder interviews', role: 'UX', est: 4, pri: 2, pts: 3,
      why: 'Internal stakeholders hold the constraints, the history and the politics that will otherwise ambush you in week eight.',
      how: [
        'Interview 3–5 people across roles: sales, support, ops, engineering, leadership.',
        'Ask support and sales what customers complain about and ask for most — it is the cheapest research available.',
        'Ask each stakeholder to define success in their own words, then note where those definitions conflict.',
        'Ask about the legacy system: what must be kept, what data exists, what integrations are non-negotiable.',
        'Surface disagreements to the decision-maker rather than trying to average them out in the design.'
      ],
      deliver: ['Interview notes', 'Constraints register', 'Conflicting-goals summary'],
      tools: ['Meet/Zoom', 'Transcription'],
      dod: ['3+ stakeholders interviewed', 'Constraints register shared with client'],
      docs: ['doc-stakeholder-script']
    },
    {
      id: 'p2-3', title: 'User interviews', role: 'UX', est: 8, pri: 1, pts: 5,
      why: 'Five to eight interviews surface the vast majority of behavioural patterns. This is the highest-value hour you will spend.',
      how: [
        'Recruit 5–8 participants per distinct user type. Screen out anyone who is not a real user of the problem space.',
        'Use a semi-structured guide: warm-up, context of use, walk-through of a recent real task, pain points, workaround discovery, wrap-up.',
        'Ask for stories, not opinions: "Tell me about the last time you did X" beats "Would you use a feature that…".',
        'Never pitch the solution mid-interview. Once you ask "would you like this?", the data is contaminated.',
        'Watch for workarounds — spreadsheets, sticky notes, group chats. Every workaround is an unbuilt feature.',
        'Debrief within an hour of each session while it is fresh; write the top 3 surprises.'
      ],
      deliver: ['Transcripts', 'Per-session debrief notes', 'Highlight reel of quotes'],
      tools: ['Zoom', 'Dovetail / Notion for tagging'],
      dod: ['5+ sessions completed per user type', 'Every session debriefed'],
      docs: ['doc-interview-script', 'doc-consent']
    },
    {
      id: 'p2-4', title: 'Analytics, support and data review', role: 'UX', est: 3, pri: 2, pts: 3,
      why: 'Interviews tell you why; analytics tell you how many and where. You need both to prioritise.',
      how: [
        'Pull the existing funnel: entry points, drop-off steps, conversion rate, device split.',
        'Identify the top 10 pages/screens by traffic and the top 5 by exit rate.',
        'Export 3 months of support tickets and tag them by theme; count the themes.',
        'For full-stack projects, review the existing database schema and data quality — bad legacy data is a hidden migration project.',
        'Note performance baselines (load time, Core Web Vitals) so you can prove improvement later.'
      ],
      deliver: ['Analytics summary', 'Support theme counts', 'Performance baseline', 'Legacy data notes'],
      tools: ['GA4 / Plausible', 'Support export', 'PageSpeed Insights'],
      dod: ['Baseline metrics recorded for later comparison'],
      docs: ['doc-analytics-audit']
    },
    {
      id: 'p2-5', title: 'Heuristic evaluation / UX audit of the current product', role: 'UX', est: 4, pri: 3, pts: 3,
      why: 'A structured audit gives the client quick, credible wins and justifies the redesign decisions you are about to make.',
      how: [
        'Walk the primary journeys as a new user and as a returning user, recording your screen.',
        'Score against Nielsen\'s 10 heuristics; log each issue with a screenshot, heuristic broken, severity 1–4, and a recommendation.',
        'Run an accessibility pass: keyboard-only navigation, colour contrast, focus visibility, form labels, heading order, alt text.',
        'Separate "must fix" from "nice to have" so the client sees a prioritised list, not a wall of criticism.'
      ],
      deliver: ['Audit report with severity-ranked issues', 'Accessibility findings'],
      tools: ['axe DevTools', 'WAVE', 'Screen recorder'],
      dod: ['Every issue has severity + recommendation', 'Accessibility checked with keyboard and contrast tools'],
      docs: ['doc-heuristic']
    },
    {
      id: 'p2-6', title: 'Synthesise findings into themes', role: 'UX', est: 5, pri: 1, pts: 5,
      why: 'Raw research is not a deliverable. Themes that change decisions are.',
      how: [
        'Extract observations onto individual notes — one observation per note, verbatim where possible.',
        'Affinity map: cluster, name the clusters, then challenge each cluster name until it states a finding rather than a topic.',
        'Turn each theme into an insight statement: "Users abandon at payment because they cannot see the total cost until the final step."',
        'Quantify where you can: "6 of 8 participants…". Frequency gives the client confidence.',
        'Rank themes by impact on the business goal versus effort to address.',
        'Present findings to the client live before writing the report — their reactions shape the recommendations.'
      ],
      deliver: ['Affinity map', 'Insight statements ranked', 'Research report'],
      tools: ['FigJam / Miro', 'Dovetail'],
      dod: ['Every insight backed by a quote or a number', 'Presented and discussed with client'],
      docs: ['doc-research-report']
    },
    {
      id: 'p2-7', title: 'Personas and jobs-to-be-done', role: 'UX', est: 4, pri: 2, pts: 3,
      why: 'Gives you and the client a shared shorthand for "who are we designing this for" during every later argument.',
      how: [
        'Build 2–4 personas maximum, each grounded in real interview data — no stock photos, no invented hobbies.',
        'Include: context of use, goals, current workflow, frustrations, technical confidence, key quote, success measure.',
        'Write the matching job statements: "When I ___, I want to ___, so I can ___."',
        'Add an anti-persona — who this product is explicitly not for. It stops scope creep cold.',
        'Print them or pin them in the Figma file so they are visible during design reviews.'
      ],
      deliver: ['2–4 personas', 'JTBD statements', 'Anti-persona'],
      tools: ['Figma'],
      dod: ['Each persona traceable to specific participants', 'Client agrees these are their users'],
      docs: ['doc-persona']
    },
    {
      id: 'p2-8', title: 'Current-state journey map', role: 'UX', est: 4, pri: 2, pts: 3,
      why: 'Shows the client where the experience actually breaks, across channels they may own separately.',
      how: [
        'Choose one primary persona and one high-value journey.',
        'Lay out stages horizontally: trigger → research → decide → act → confirm → follow-up.',
        'For each stage record: actions, touchpoints, thoughts, emotions (a simple high/low line), pain points, opportunities.',
        'Mark the moments of truth — the two or three points where the journey is won or lost.',
        'Include backstage systems for full-stack work: what has to happen server-side at each step.',
        'Finish with a future-state version showing the journey after your intervention.'
      ],
      deliver: ['Current-state journey map', 'Future-state journey map', 'Prioritised opportunity list'],
      tools: ['FigJam / Miro'],
      dod: ['Emotion line present', 'Opportunities linked to research insights'],
      docs: ['doc-journey']
    }
  ]
},
{
  id: 'p3', num: 3, name: 'Strategy, Requirements & User Stories', short: 'Strategy',
  goal: 'Turn research into a prioritised, estimable backlog and an information architecture everyone has agreed to.',
  exit: [
    'Backlog written as user stories with acceptance criteria',
    'MVP scope agreed and signed',
    'Sitemap and key flows approved'
  ],
  tasks: [
    {
      id: 'p3-1', title: 'Define product principles and success metrics', role: 'Strategy', est: 2, pri: 2, pts: 2,
      why: 'Principles settle design arguments without you having to win them personally. Metrics define what "done well" means.',
      how: [
        'Write 3–5 principles specific enough to be violated. "Fast" is not a principle; "Never make the user wait for data they did not ask for" is.',
        'Define one primary success metric tied to the business goal, plus 2–3 supporting metrics.',
        'For each metric record: current baseline, target, how it will be measured, and when it will be reviewed.',
        'Agree with the client which metric wins when two conflict.'
      ],
      deliver: ['Product principles', 'Metrics framework with baselines'],
      tools: ['Docs', 'Analytics'],
      dod: ['Each metric has a baseline and a measurement method'],
      docs: ['doc-principles']
    },
    {
      id: 'p3-2', title: 'Write epics and user stories', role: 'PM/UX', est: 6, pri: 1, pts: 5,
      why: 'Stories keep the team focused on user outcomes and give you a unit of work you can estimate, build and test against.',
      how: [
        'Group work into epics that map to journey stages or product areas (Accounts, Booking, Payments, Admin).',
        'Write each story as: As a [specific persona], I want to [action], so that [outcome]. The outcome clause is the part that must never be skipped.',
        'Test every story against INVEST: Independent, Negotiable, Valuable, Estimable, Small, Testable. Split anything larger than a few days.',
        'Split large stories by workflow step, by data variation, by user role, or by happy-path-then-edge-cases — never by layer (do not create a "build the API" story and a separate "build the UI" story for the same feature).',
        'Write acceptance criteria in Given/When/Then form. Aim for 3–6 per story, covering the happy path, at least one error path, and any permission rule.',
        'Add non-functional criteria explicitly where they matter: performance budget, accessibility level (WCAG 2.2 AA), browser support, offline behaviour.',
        'Include technical enabler stories for full-stack work: schema migration, auth, third-party integration, background jobs. Give them the same rigour.',
        'Attach the research evidence to each epic so priority arguments are settled with data.'
      ],
      deliver: ['Epic list', 'User stories with acceptance criteria', 'Enabler stories'],
      tools: ['Linear / Jira / GitHub Issues'],
      dod: ['Every story has Given/When/Then criteria', 'No story larger than 8 points', 'Stories linked to a persona'],
      docs: ['doc-user-story', 'doc-story-splitting']
    },
    {
      id: 'p3-3', title: 'Prioritise and agree the MVP', role: 'PM', est: 3, pri: 1, pts: 3,
      why: 'This is the conversation that decides whether the project ships on time. Have it explicitly, once, in writing.',
      how: [
        'Run MoSCoW with the client: Must (product is broken without it), Should (painful but survivable), Could, Won\'t-this-time.',
        'Cross-check with a value-vs-effort matrix; anything high-effort/low-value goes to Won\'t regardless of enthusiasm.',
        'Force the constraint: "If we could only ship five things, which five?" Then build those first.',
        'Write the Won\'t list into the SOW as phase two. Naming it as "later" rather than "no" removes the emotion.',
        'Sequence Musts so that a thin end-to-end slice ships first — one complete journey working, not every screen half-built.'
      ],
      deliver: ['Prioritised backlog', 'MVP definition signed', 'Phase two list'],
      tools: ['Backlog tool', 'FigJam for the workshop'],
      dod: ['Client signed the MVP scope', 'Phase two list written down'],
      docs: ['doc-moscow']
    },
    {
      id: 'p3-4', title: 'Information architecture and content inventory', role: 'UX', est: 5, pri: 2, pts: 3,
      why: 'Most navigation problems are structure problems. Fixing structure at the sitemap stage costs hours; fixing it in code costs weeks.',
      how: [
        'Inventory all existing content and functionality into a spreadsheet: URL, title, type, owner, traffic, keep/rewrite/kill decision.',
        'Run an open card sort with 8–15 users to see how they group concepts; follow with a closed sort to validate your proposed labels.',
        'Draft the sitemap. Keep primary navigation to 5–7 items and depth to 3 levels where possible.',
        'Use the users\' vocabulary for labels, not internal jargon. Validate labels with a tree test — target 80%+ task success.',
        'Define URL structure and slug conventions now; they affect SEO, routing and API design.',
        'Map each sitemap node to the stories that build it so nothing is orphaned.'
      ],
      deliver: ['Content inventory', 'Card sort results', 'Sitemap', 'Tree test results', 'URL structure'],
      tools: ['Optimal Workshop / Maze', 'FigJam', 'Spreadsheet'],
      dod: ['Tree test passes 80% task success', 'Every node maps to at least one story'],
      docs: ['doc-ia']
    },
    {
      id: 'p3-5', title: 'User flows and task flows', role: 'UX', est: 4, pri: 1, pts: 3,
      why: 'Flows expose the states and edge cases you would otherwise discover mid-build, when they are expensive.',
      how: [
        'Draw the 5–8 critical flows: sign-up, login and recovery, core task, payment, admin action.',
        'Use consistent notation: rectangle = screen, diamond = decision, rounded = system process, cylinder = data write.',
        'Explicitly draw the unhappy paths: validation errors, timeouts, empty states, permission denied, payment failure, session expiry.',
        'Annotate every system process with what the backend must do — this becomes your API surface.',
        'Count screens from the flows. That count is your design estimate sanity check.',
        'Walk each flow with the client and a developer eye before wireframing.'
      ],
      deliver: ['Flow diagrams', 'Screen inventory', 'Error/edge-case list'],
      tools: ['FigJam / Whimsical / Mermaid'],
      dod: ['Unhappy paths drawn, not just happy paths', 'Screen count agreed'],
      docs: ['doc-flows']
    },
    {
      id: 'p3-6', title: 'Data model and API contract draft', role: 'Backend', est: 5, pri: 1, pts: 5,
      why: 'On full-stack projects the data model constrains the UI more than the other way round. Draft it before you design screens.',
      how: [
        'List entities from the flows and stories; define attributes, types, required/optional, and relationships.',
        'Draw the ER diagram. Decide on relational vs document storage per entity, and justify it in one line.',
        'Define the auth model: roles, permissions per resource, and what each role can see and do. Write it as a matrix.',
        'Draft the API contract: endpoint, method, request shape, response shape, error codes, pagination, rate limits.',
        'Decide on REST vs GraphQL vs RPC now, and on validation strategy shared between client and server.',
        'Agree on naming conventions and date/currency/timezone handling before a line of code exists.',
        'Version the contract and treat changes to it as change requests.'
      ],
      deliver: ['ER diagram', 'Permission matrix', 'API contract (OpenAPI or typed schema)'],
      tools: ['dbdiagram.io', 'Swagger / Stoplight', 'Zod / Pydantic schemas'],
      dod: ['Every story\'s data need covered by the model', 'Error responses defined, not just success'],
      docs: ['doc-datamodel', 'doc-api-contract']
    }
  ]
},
{
  id: 'p4', num: 4, name: 'Wireframes & Prototyping', short: 'Wireframes',
  goal: 'Prove the structure and interaction work before investing in visual design or code.',
  exit: [
    'Every MVP screen wireframed including empty, loading and error states',
    'Clickable prototype validated with users',
    'Wireframes signed off'
  ],
  tasks: [
    {
      id: 'p4-1', title: 'Sketch: rapid low-fidelity exploration', role: 'UX', est: 4, pri: 2, pts: 3,
      why: 'Paper is the cheapest place to be wrong. Skipping sketching is why so many designs settle for the first idea.',
      how: [
        'Run Crazy 8s on the three hardest screens: eight variations of one screen in eight minutes, by hand.',
        'Do not evaluate while generating. Volume first, judgement second.',
        'Pick 2–3 directions per screen and redraw them slightly larger with annotations.',
        'Photograph and keep them — the rejected ideas are useful evidence when a client asks "did you consider…".',
        'Only move to digital once you can explain why the chosen direction beats the others.'
      ],
      deliver: ['Sketch photos', 'Chosen directions with rationale'],
      tools: ['Paper, marker', 'Phone camera'],
      dod: ['At least 3 alternatives explored per hard screen'],
      docs: ['doc-sketch']
    },
    {
      id: 'p4-2', title: 'Set up the wireframe file and grid', role: 'UX', est: 2, pri: 2, pts: 2,
      why: 'A disciplined file structure saves hours later and makes handover legible to a developer.',
      how: [
        'Create pages: Cover, Flows, Wireframes-Desktop, Wireframes-Mobile, Components, Archive.',
        'Set frames to real breakpoints: 390 (mobile), 768 (tablet), 1440 (desktop). Design mobile-first.',
        'Set up a 4pt or 8pt spacing system and a 12-column grid with defined gutters and margins now.',
        'Build a minimal greybox component set: header, nav, card, form field, button, table row, modal.',
        'Name frames after the screen and state: "Checkout / Payment / Error — card declined".'
      ],
      deliver: ['Structured wireframe file', 'Grid and spacing system', 'Greybox components'],
      tools: ['Figma'],
      dod: ['Naming convention applied consistently', 'Breakpoints defined'],
      docs: ['doc-figma-setup']
    },
    {
      id: 'p4-3', title: 'Low-fidelity wireframes', role: 'UX', est: 10, pri: 1, pts: 8,
      why: 'Forces decisions about hierarchy, content priority and layout while changes are still cheap.',
      how: [
        'Work screen by screen through the flows, mobile-first. Greyscale only — no colour, no real imagery, no font choices.',
        'Use real content where you can. Lorem ipsum hides the fact that the design does not fit the actual text.',
        'For every screen ask: what is the one thing the user must do here? Make that the visually dominant element.',
        'Design the four states for every data-driven screen: empty, loading, populated, error. Most designs ship broken because these were skipped.',
        'Annotate behaviour directly on the canvas: what is clickable, what validates, what happens on submit, what the backend returns.',
        'Review against the flows and the story acceptance criteria — every criterion should be visibly supported.'
      ],
      deliver: ['Lo-fi wireframes for all MVP screens', 'State variants', 'Annotations'],
      tools: ['Figma'],
      dod: ['Empty/loading/error states exist for every data screen', 'Annotations sufficient for a developer to reason about'],
      docs: ['doc-wireframe-checklist']
    },
    {
      id: 'p4-4', title: 'Mid-fidelity wireframes and content design', role: 'UX', est: 8, pri: 2, pts: 5,
      why: 'Real copy is design. Refining wireframes with actual words prevents the "it looked fine in the mockup" failure.',
      how: [
        'Replace placeholder text with real headings, labels, button text, helper text and error messages.',
        'Write error messages that say what happened and what to do next, in plain language.',
        'Apply a rough type scale and spacing rhythm so hierarchy is testable.',
        'Add responsive behaviour notes: what stacks, what collapses, what is hidden and why.',
        'Check reading order and tab order — this is where accessibility is won or lost.'
      ],
      deliver: ['Mid-fi wireframes', 'UX copy deck', 'Responsive behaviour notes'],
      tools: ['Figma', 'Copy doc'],
      dod: ['No lorem ipsum remaining', 'Every error message reviewed'],
      docs: ['doc-ux-copy']
    },
    {
      id: 'p4-5', title: 'Build the clickable prototype', role: 'UX', est: 5, pri: 1, pts: 5,
      why: 'A static wireframe cannot be usability tested. A prototype can, and it costs a fraction of building the real thing.',
      how: [
        'Prototype only the paths you intend to test — full coverage is wasted effort at this stage.',
        'Use realistic transitions but avoid elaborate animation; you are testing comprehension, not delight.',
        'Include the error and empty paths so testers hit realistic friction.',
        'Test the prototype yourself on a phone before you put it in front of anyone.',
        'Create a shareable link with a short set of instructions for the client and testers.'
      ],
      deliver: ['Clickable prototype link', 'Task paths list'],
      tools: ['Figma prototyping', 'Maze for unmoderated tests'],
      dod: ['All planned test tasks completable end to end', 'Tested on a real device'],
      docs: []
    },
    {
      id: 'p4-6', title: 'Internal critique and client wireframe review', role: 'UX', est: 3, pri: 1, pts: 2,
      why: 'Sign-off here is the cheapest sign-off you will get. Structural changes after visual design cost three times more.',
      how: [
        'Critique against the principles and stories first, aesthetics never — remind the client this is deliberately ugly.',
        'Present live, walking the flow as a persona doing a task. Do not send a link and hope.',
        'Capture feedback in one place, from the named approver, with a 3-day deadline.',
        'Triage feedback into: structural (do now), visual (defer to design phase), out of scope (change request).',
        'Get explicit written sign-off before moving to UI design.'
      ],
      deliver: ['Review recording', 'Consolidated feedback log', 'Written sign-off'],
      tools: ['Figma comments', 'Meeting recording'],
      dod: ['Written sign-off received', 'Out-of-scope items logged as change requests'],
      docs: ['doc-signoff']
    }
  ]
},
{
  id: 'p5', num: 5, name: 'UI Design & Design System', short: 'UI Design',
  goal: 'Produce a coherent, accessible, buildable visual system and high-fidelity screens ready for development.',
  exit: [
    'Design system components documented with states',
    'All MVP screens designed at high fidelity, responsive',
    'Accessibility checks passed and designs signed off'
  ],
  tasks: [
    {
      id: 'p5-1', title: 'Brand and visual direction', role: 'UI', est: 4, pri: 2, pts: 3,
      why: 'Agreeing direction on a mood board is far cheaper than discovering the client hates the palette across 40 screens.',
      how: [
        'Gather existing brand assets and constraints — logo, palette, typography, tone of voice, print collateral.',
        'Build 2–3 distinct visual directions as mood boards or single-screen concepts, each with a one-line rationale.',
        'Present them named and characterised ("Confident & editorial" vs "Calm & utilitarian"), not as A/B/C.',
        'Let the client choose one direction and one thing they would borrow from another. Then close the conversation.',
        'Never design 40 screens across three directions.'
      ],
      deliver: ['Mood boards', 'Style tiles', 'Chosen direction with rationale'],
      tools: ['Figma', 'Pinterest / Savee'],
      dod: ['One direction chosen in writing'],
      docs: ['doc-visual-direction']
    },
    {
      id: 'p5-2', title: 'Design tokens: colour, type, spacing, elevation', role: 'UI', est: 5, pri: 1, pts: 5,
      why: 'Tokens are the contract between design and code. Defined properly they make theming, dark mode and handover almost free.',
      how: [
        'Define a colour system in tiers: primitives (blue-500), semantic (color-action-primary), component-level. Developers consume the semantic tier.',
        'Check every text/background pairing for contrast: 4.5:1 for body text, 3:1 for large text and UI boundaries.',
        'Build a type scale using a ratio (1.25 or 1.333). Define family, size, weight, line-height and letter-spacing per style. Set body line-height around 1.5.',
        'Set a spacing scale on a 4pt or 8pt base and use it exclusively — no arbitrary values.',
        'Define radii, border widths, shadows and motion durations/easings as tokens too.',
        'Name tokens for their role, not appearance: color-status-danger, not color-red.',
        'Export tokens as JSON or CSS custom properties so the developer imports rather than retypes them.'
      ],
      deliver: ['Token set in Figma variables', 'Exported tokens (JSON/CSS)', 'Contrast audit'],
      tools: ['Figma variables', 'Tokens Studio', 'Stark / Polypane contrast checks'],
      dod: ['All pairings meet WCAG AA', 'Tokens exported in a code-consumable format'],
      docs: ['doc-tokens']
    },
    {
      id: 'p5-3', title: 'Build the component library', role: 'UI', est: 12, pri: 1, pts: 8,
      why: 'Components are what make a 40-screen product consistent and a 6-week build feasible. This is the highest-leverage design work.',
      how: [
        'Build atoms first: button, input, select, checkbox, radio, toggle, badge, avatar, icon, link.',
        'Then molecules: form field with label/hint/error, card, list item, table row, pagination, tabs, breadcrumb, toast, modal, dropdown menu.',
        'Every interactive component must have all states: default, hover, focus-visible, active, disabled, loading, error, selected. Missing focus states is the most common accessibility failure.',
        'Use Figma variants and component properties so a developer can see the full matrix in one place.',
        'Design responsive behaviour for each component — what happens at 390px.',
        'Document usage rules per component: when to use, when not to, content guidelines, max characters.',
        'Map each component to its intended code counterpart if using a headless library (Radix, shadcn/ui, Headless UI) so the developer does not rebuild from scratch.'
      ],
      deliver: ['Component library with variants', 'Usage documentation', 'Component-to-code mapping'],
      tools: ['Figma', 'Radix / shadcn/ui reference'],
      dod: ['Focus-visible state on every interactive component', 'Loading and error states present', 'Usage notes written'],
      docs: ['doc-design-system']
    },
    {
      id: 'p5-4', title: 'High-fidelity screen design', role: 'UI', est: 20, pri: 1, pts: 13,
      why: 'The screens are what get built. Every gap here becomes a developer guess.',
      how: [
        'Compose screens from library components. If you are drawing a rectangle by hand, you are missing a component.',
        'Design mobile and desktop for every screen; tablet only where behaviour genuinely differs.',
        'Carry over all four states from wireframes — empty, loading, populated, error — plus success confirmations.',
        'Design realistic data extremes: longest plausible name, 200-character title, zero items, 10,000 items, missing avatar, failed image load.',
        'Include micro-copy, tooltips, validation messages and confirmation dialogs.',
        'Keep an eye on performance implications: number of custom fonts, image weight, heavy shadows and blurs.',
        'Run a consistency sweep at the end: detach nothing, no off-token colours, no one-off spacing.'
      ],
      deliver: ['Hi-fi screens, mobile + desktop', 'All states', 'Edge-case variants'],
      tools: ['Figma', 'Design lint plugin'],
      dod: ['Zero detached components', 'Zero off-token values', 'Every screen has its states'],
      docs: ['doc-ui-checklist']
    },
    {
      id: 'p5-5', title: 'Accessibility design review', role: 'UI', est: 3, pri: 1, pts: 3,
      why: 'Accessibility retrofitted after build is expensive and usually half-done. In design it is mostly free.',
      how: [
        'Verify contrast for text, icons, borders and states (including hover and disabled).',
        'Ensure information is never conveyed by colour alone — pair with icon, text or pattern.',
        'Check touch targets are at least 44x44px with adequate spacing.',
        'Annotate heading hierarchy, landmark regions, tab order, and any ARIA the developer will need.',
        'Specify focus indicator style explicitly — do not leave it to the browser default by accident.',
        'Note reduced-motion alternatives for any animation.',
        'Check the design at 200% zoom and with text-only enlargement.'
      ],
      deliver: ['Accessibility annotation layer', 'A11y review notes'],
      tools: ['Stark', 'Figma a11y annotation kit', 'axe'],
      dod: ['WCAG 2.2 AA reviewed for all screens', 'Tab order annotated'],
      docs: ['doc-a11y']
    },
    {
      id: 'p5-6', title: 'Hi-fi prototype and client design sign-off', role: 'UI', est: 4, pri: 1, pts: 3,
      why: 'This is the milestone that usually triggers a payment. Make the approval formal and bounded.',
      how: [
        'Wire the hi-fi screens into a prototype covering the primary journeys.',
        'Present live, in the order a user would experience it, tying each decision back to a research insight.',
        'Collect feedback once, consolidated, from the named approver, within the agreed window.',
        'Distinguish between fixes (in scope) and changes (change request) explicitly and in writing.',
        'Get written sign-off, then invoice the design milestone.'
      ],
      deliver: ['Hi-fi prototype', 'Feedback log', 'Written sign-off', 'Milestone invoice'],
      tools: ['Figma'],
      dod: ['Sign-off in writing', 'Change requests logged and priced', 'Invoice sent'],
      docs: ['doc-signoff']
    }
  ]
}
];

try{window.__bootStage='phases-loaded';}catch(e){}
