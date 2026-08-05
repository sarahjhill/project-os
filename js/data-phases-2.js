/* =====================================================================
   PROJECT OS — Process data, Phases 6–11
   Appends to window.PHASES defined in data-phases.js
   ===================================================================== */
window.PHASES.push(
{
  id: 'p6', num: 6, name: 'Usability Testing & Iteration', short: 'Testing',
  goal: 'Find out where real people fail before you pay to build it, then fix it.',
  exit: [
    'Tested with 5+ representative users per key journey',
    'Issues severity-ranked and critical ones fixed',
    'Retest confirms the fix worked'
  ],
  tasks: [
    {
      id: 'p6-1', title: 'Write the usability test plan and script', role: 'UX', est: 3, pri: 1, pts: 3,
      why: 'An unscripted test produces anecdotes. A scripted one produces comparable, defensible findings.',
      how: [
        'Define what you are testing and the specific questions you want answered — e.g. "Can a new user complete checkout without help?"',
        'Write 4–6 realistic scenario tasks. Give context and a goal, never the interface steps: "You need a haircut next Tuesday morning. Book it." Not "Click Book Now."',
        'Define success criteria per task: completed unaided / completed with prompt / failed, plus time on task.',
        'Prepare probe questions: "What do you expect to happen if you click that?", "How do you feel about that step?"',
        'Include a pre-test warm-up and a post-test SUS questionnaire or 3 closing questions.',
        'Recruit 5–8 participants matching your persona screener; schedule 45–60 minutes each with a buffer.',
        'Pilot the script with one person and fix the confusing bits before the real sessions.'
      ],
      deliver: ['Test plan', 'Moderator script', 'Scenario tasks', 'Consent form', 'Participant schedule'],
      tools: ['Zoom', 'Maze / Useberry for unmoderated', 'Calendly'],
      dod: ['Script piloted', 'Consent forms prepared', 'Participants booked'],
      docs: ['doc-usability-script', 'doc-consent']
    },
    {
      id: 'p6-2', title: 'Run the moderated sessions', role: 'UX', est: 8, pri: 1, pts: 5,
      why: 'Watching someone struggle for ninety seconds teaches you more than any amount of internal debate.',
      how: [
        'Set expectations up front: "We are testing the design, not you. Nothing you do here can be wrong."',
        'Ask them to think aloud, and remind them gently when they go quiet.',
        'Do not help. Count to ten in your head before intervening. The silence is the data.',
        'When asked "what should I do?", reflect it back: "What would you normally do here?"',
        'Record screen and audio; note timestamps of every hesitation, error, and moment of confusion.',
        'Invite the client to observe silently — it is the fastest way to end opinion-based feedback forever.',
        'Debrief for ten minutes after each session and write your top three observations immediately.'
      ],
      deliver: ['Session recordings', 'Observation notes per participant', 'Task success matrix'],
      tools: ['Zoom', 'Spreadsheet for the success matrix'],
      dod: ['5+ sessions per journey', 'Success/failure logged per task per participant'],
      docs: []
    },
    {
      id: 'p6-3', title: 'Analyse, prioritise and fix', role: 'UX', est: 5, pri: 1, pts: 5,
      why: 'A findings list nobody acts on is theatre. The output of testing is a set of changed designs.',
      how: [
        'Log every issue with: what happened, how many participants hit it, severity 1–4, the journey stage, and a proposed fix.',
        'Severity 1 = blocks task completion. Severity 2 = causes significant delay or error. 3 = minor friction. 4 = cosmetic.',
        'Fix all severity 1 and 2 issues before build. Log 3 and 4 into the backlog with evidence attached.',
        'Where an issue is caused by a scope decision rather than a design flaw, escalate it to the client with the recording as evidence.',
        'Update the designs, then re-test the changed flows with 3 fresh participants to confirm the fix.',
        'Produce a short findings deck: what we tested, what we found, what we changed, what remains.'
      ],
      deliver: ['Issue log with severity', 'Updated designs', 'Retest results', 'Findings summary'],
      tools: ['Spreadsheet / Dovetail', 'Figma'],
      dod: ['All severity 1–2 issues fixed', 'Retest completed', 'Client briefed on findings'],
      docs: ['doc-usability-findings']
    }
  ]
},
{
  id: 'p7', num: 7, name: 'Technical Setup: Repo, Environments & Handoff', short: 'Tech Setup',
  goal: 'Stand up the repository, tooling, environments and pipelines so that the first day of building is productive, not a setup day.',
  exit: [
    'Repo with CI, branch protection and a working deploy pipeline to staging',
    'Local environment reproducible from the README in under 30 minutes',
    'Design handoff complete and understood'
  ],
  tasks: [
    {
      id: 'p7-1', title: 'Design-to-development handoff', role: 'UX/Dev', est: 3, pri: 1, pts: 3,
      why: 'Handoff is a conversation, not a link. Most build-phase rework traces back to a silent handoff.',
      how: [
        'Prepare the Figma file for dev mode: clean layers, published components, named variables, redlines where behaviour is non-obvious.',
        'Write a spec page covering: breakpoints, grid, spacing scale, motion durations, focus styles, form validation rules, and empty/loading/error behaviour.',
        'Export assets properly: SVG for icons and logos, WebP/AVIF for photography, correct @2x where raster is unavoidable, favicon set.',
        'Walk the developer (or yourself, formally) through every screen and state, out loud. Note the questions asked — they reveal the gaps.',
        'Agree what may be changed without asking (spacing rounding, minor copy) and what may not (flows, hierarchy, tokens).',
        'Set up a running questions channel or file so decisions are logged rather than lost in chat.'
      ],
      deliver: ['Dev-ready Figma file', 'Spec page', 'Asset export bundle', 'Handoff recording'],
      tools: ['Figma Dev Mode', 'Zeplin (optional)'],
      dod: ['Assets exported and organised', 'Handoff walkthrough completed', 'Open questions logged'],
      docs: ['doc-handoff']
    },
    {
      id: 'p7-2', title: 'Create the GitHub repository and governance', role: 'Dev', est: 2, pri: 1, pts: 2,
      why: 'Branch rules and templates set on day one cost minutes; retrofitting discipline into a messy repo costs days.',
      how: [
        'Create the repo (private) with a sensible .gitignore, LICENSE if relevant, and a README skeleton.',
        'Decide the branching model. For solo/small work use trunk-based: short-lived feature branches off main, merged via PR, deleted after merge.',
        'Branch naming: feat/, fix/, chore/, docs/ + short kebab description + issue number, e.g. feat/42-booking-calendar.',
        'Enable branch protection on main: require PR, require status checks to pass, require branches up to date, no direct pushes, no force push.',
        'Adopt Conventional Commits (feat:, fix:, chore:, refactor:, test:, docs:) — it makes changelogs and semantic versioning automatic.',
        'Add .github/PULL_REQUEST_TEMPLATE.md with: what changed, why, how to test, screenshots, checklist.',
        'Add issue templates for bug and story; add labels for priority, type, and phase.',
        'Create a GitHub Project board and connect it to issues so status updates itself when PRs merge.',
        'Set up Dependabot for security updates and add a CODEOWNERS file if anyone else will contribute.'
      ],
      deliver: ['Repository', 'Branch protection rules', 'PR/issue templates', 'Project board', 'Label taxonomy'],
      tools: ['GitHub', 'gh CLI'],
      dod: ['main protected', 'Templates in place', 'Board linked to issues'],
      docs: ['doc-git-workflow']
    },
    {
      id: 'p7-3', title: 'Scaffold the project and configure VS Code', role: 'Dev', est: 4, pri: 1, pts: 3,
      why: 'A shared, committed editor configuration removes an entire category of pointless diffs and "works on my machine" problems.',
      how: [
        'Scaffold frontend and backend (or a monorepo with apps/web, apps/api, packages/shared for types and validation schemas).',
        'Set up TypeScript in strict mode from the start. Retrofitting strict mode is miserable.',
        'Add ESLint + Prettier (or Biome) with a shared config; add EditorConfig for whitespace consistency.',
        'Commit .vscode/settings.json: formatOnSave, default formatter, ESLint autofix on save, organiseImports, tab size, files.exclude for build folders.',
        'Commit .vscode/extensions.json recommending: ESLint, Prettier, Tailwind IntelliSense, GitLens, Error Lens, Thunder Client or REST Client, Prisma/SQL tooling, Docker, GitHub Pull Requests.',
        'Add .vscode/launch.json debug configurations for the server, the client, and the test runner so breakpoints work without setup.',
        'Add Husky + lint-staged pre-commit hooks: lint and format staged files; add commitlint for Conventional Commits.',
        'Create .env.example listing every variable with a comment; never commit real .env files.',
        'Add a Makefile or npm scripts: dev, build, test, lint, typecheck, db:migrate, db:seed.',
        'Write the README setup section and then verify it by following it on a clean clone.'
      ],
      deliver: ['Scaffolded repo', '.vscode config committed', 'Lint/format/hooks', '.env.example', 'README setup'],
      tools: ['VS Code', 'Node/pnpm', 'Husky, lint-staged, commitlint'],
      dod: ['Clean clone runs in under 30 minutes following the README', 'Pre-commit hooks working'],
      docs: ['doc-vscode', 'doc-repo-structure']
    },
    {
      id: 'p7-4', title: 'Database, auth and backend foundations', role: 'Backend', est: 8, pri: 1, pts: 8,
      why: 'These are the parts that are painful to change later and that everything else depends on.',
      how: [
        'Provision the database (managed Postgres is the sane default) with separate dev, staging and production instances.',
        'Set up the ORM/query layer and generate the initial migration from the agreed data model. Migrations are code — they get reviewed.',
        'Write a seed script producing realistic data for every state you designed: empty, typical, extreme.',
        'Implement authentication using a proven provider or library rather than rolling your own: sessions vs JWT decided and documented, password hashing, email verification, password reset, rate limiting on auth endpoints.',
        'Implement authorisation from the permission matrix, enforced server-side on every endpoint. Client-side checks are UX, not security.',
        'Set up structured logging, a request ID, and error tracking (Sentry) from day one.',
        'Add input validation at the boundary with a shared schema library so client and server validate identically.',
        'Configure CORS, security headers, and secrets management. Secrets go in the platform\'s secret store, never in the repo.'
      ],
      deliver: ['Migrations', 'Seed script', 'Auth + permissions', 'Logging and error tracking', 'Validation layer'],
      tools: ['Postgres', 'Prisma / Drizzle', 'Auth.js / Clerk / Supabase Auth', 'Sentry', 'Zod'],
      dod: ['Migrations run cleanly on a fresh database', 'Every endpoint authorises server-side', 'Errors reaching Sentry'],
      docs: ['doc-backend-setup']
    },
    {
      id: 'p7-5', title: 'CI/CD pipeline and environments', role: 'Dev', est: 4, pri: 1, pts: 5,
      why: 'Automated checks are how a solo developer keeps quality without a second pair of eyes.',
      how: [
        'Create three environments: development (local), staging (mirrors production, seeded data), production.',
        'Write a GitHub Actions workflow triggered on pull request: install with cache, typecheck, lint, unit tests, build. Failing = blocked merge.',
        'Add a second workflow on merge to main: run migrations against staging, deploy to staging, run smoke tests.',
        'Configure preview deployments per PR so the client can click a link and review the actual thing.',
        'Store secrets in GitHub Actions secrets / the host\'s environment settings, separated per environment.',
        'Make production deploys explicit — a tagged release or manual approval step, never an accidental push.',
        'Document the rollback procedure and test it once, before you need it.'
      ],
      deliver: ['CI workflow', 'CD workflow', 'Preview deploys', 'Environment variables configured', 'Rollback runbook'],
      tools: ['GitHub Actions', 'Vercel / Railway / Fly.io / AWS', 'Docker where needed'],
      dod: ['PR blocked when checks fail', 'Staging deploys automatically', 'Rollback tested once'],
      docs: ['doc-cicd']
    },
    {
      id: 'p7-6', title: 'Sprint zero: backlog into the tracker', role: 'PM', est: 2, pri: 1, pts: 2,
      why: 'The backlog must live where the code lives, or it will drift out of date within a fortnight.',
      how: [
        'Import the user stories as issues, with acceptance criteria in the body as a checklist.',
        'Label by epic, priority and phase; add estimates in points.',
        'Order the backlog so the first sprint delivers one thin, complete, demoable journey end to end.',
        'Define sprint length (1 or 2 weeks for solo work), your realistic capacity in points, and the demo day.',
        'Write the definition of done that applies to every story and pin it to the board.'
      ],
      deliver: ['Populated backlog', 'Sprint 1 planned', 'Definition of done pinned'],
      tools: ['GitHub Projects / Linear'],
      dod: ['Sprint 1 committed and within capacity', 'DoD agreed'],
      docs: ['doc-dod', 'doc-sprint']
    }
  ]
},
{
  id: 'p8', num: 8, name: 'Build — Agile Sprints', short: 'Build',
  goal: 'Deliver the backlog in reviewable increments, with quality gates that hold without a QA team.',
  exit: [
    'All MVP stories accepted against their criteria',
    'Test coverage on critical paths',
    'Staging matches the approved designs'
  ],
  tasks: [
    {
      id: 'p8-1', title: 'Sprint planning', role: 'PM/Dev', est: 1.5, pri: 1, pts: 2,
      why: 'A sprint without a goal is a to-do list. The goal is what lets you cut scope intelligently when the week goes wrong.',
      how: [
        'Write one sentence sprint goal: "A customer can register, browse and book an appointment on mobile."',
        'Pull only stories that serve the goal, up to your proven velocity — not your optimistic velocity.',
        'For each story confirm it is ready: criteria written, designs available, dependencies resolved, questions answered.',
        'Break stories into technical subtasks of half a day or less. Anything vaguer than that will expand.',
        'Identify risks and spike anything genuinely unknown with a timeboxed investigation story.',
        'Leave 20% of capacity unplanned for bugs, review feedback and the thing you have not thought of.'
      ],
      deliver: ['Sprint goal', 'Committed sprint backlog', 'Subtasks'],
      tools: ['GitHub Projects / Linear'],
      dod: ['Goal written', 'Every committed story meets the definition of ready'],
      docs: ['doc-sprint', 'doc-ready']
    },
    {
      id: 'p8-2', title: 'Daily development loop', role: 'Dev', est: 0.25, pri: 2, pts: 1,
      why: 'The daily rhythm is what keeps a solo build from drifting. Ten minutes of structure protects the other seven hours.',
      how: [
        'Start the day by writing down: what I finished yesterday, what I will finish today, what is blocking me. Even alone. Especially alone.',
        'Pull the top issue, move it to In Progress on the board, and create the branch: git checkout -b feat/42-booking-calendar.',
        'Work in small commits with Conventional Commit messages; commit whenever the code is in a working state.',
        'Push at least once a day so work is never only on your laptop.',
        'Keep a running "decisions and questions" note; send client questions in one batch rather than drip-feeding.',
        'Stop the day by pushing and updating the board. Never leave the board lying about reality.'
      ],
      deliver: ['Daily progress notes', 'Board reflecting real status'],
      tools: ['Git', 'VS Code', 'Board'],
      dod: ['Board accurate at end of day', 'Work pushed'],
      docs: ['doc-daily']
    },
    {
      id: 'p8-3', title: 'Frontend implementation', role: 'Frontend', est: 40, pri: 1, pts: 21,
      why: 'Where the design either survives contact with reality or quietly degrades.',
      how: [
        'Build the design tokens into code first — CSS custom properties or Tailwind theme config generated from the exported tokens.',
        'Build the component library before the screens, mirroring the Figma components and their full state matrix.',
        'Use semantic HTML by default: button for buttons, nav, main, section, label bound to input. Most accessibility comes free from this alone.',
        'Implement every state you designed: loading skeletons, empty states, error boundaries, optimistic updates where appropriate.',
        'Handle data fetching with a proper library (TanStack Query, RSC, SWR) so caching, retries and loading states are consistent.',
        'Manage forms with a validation library sharing schemas with the backend; show inline, specific errors.',
        'Build responsively from the mobile layout up; test at 320px, 390px, 768px, 1024px, 1440px.',
        'Keep an eye on the bundle: lazy-load routes, use next/image or equivalent, avoid importing whole libraries for one function.',
        'Compare against Figma at 100% zoom before calling a screen done. Then compare again on a real phone.'
      ],
      deliver: ['Component library in code', 'All screens implemented', 'Responsive behaviour'],
      tools: ['React/Next.js or your framework', 'Tailwind / CSS modules', 'TanStack Query', 'React Hook Form + Zod'],
      dod: ['Matches design at all breakpoints', 'All states implemented', 'Keyboard navigable'],
      docs: ['doc-fe-standards']
    },
    {
      id: 'p8-4', title: 'Backend implementation', role: 'Backend', est: 40, pri: 1, pts: 21,
      why: 'Correctness, security and data integrity live here. UI bugs annoy users; backend bugs lose their data.',
      how: [
        'Implement endpoints against the agreed API contract; if the contract must change, change the contract document first.',
        'Validate every input at the boundary and authorise every request server-side, without exception.',
        'Keep business logic out of route handlers — services or use-case modules make it testable.',
        'Use database transactions for any multi-write operation, and add indexes for every query you filter or sort by.',
        'Return consistent, typed error shapes with useful codes; never leak stack traces or internal identifiers to the client.',
        'Implement pagination, filtering and sorting on any list endpoint from the start.',
        'Add background jobs/queues for anything slow: email, image processing, exports, webhooks with retries.',
        'Integrate third parties behind an adapter so you can mock them in tests and swap them later.',
        'Instrument: structured logs with request IDs, error tracking, and timing on the slowest endpoints.'
      ],
      deliver: ['API endpoints', 'Business logic layer', 'Background jobs', 'Integrations'],
      tools: ['Node/Express, NestJS, FastAPI, or your framework', 'Prisma/Drizzle', 'Redis + BullMQ'],
      dod: ['All endpoints validated and authorised', 'Errors typed and consistent', 'Indexes added for filtered queries'],
      docs: ['doc-be-standards']
    },
    {
      id: 'p8-5', title: 'Pull request and code review discipline', role: 'Dev', est: 5, pri: 2, pts: 3,
      why: 'Even solo, a PR is a forced pause where you read your own work as a stranger would. It catches a surprising amount.',
      how: [
        'Open the PR early as a draft so CI runs while you work.',
        'Keep PRs under roughly 400 lines of change. Large PRs get rubber-stamped, including by yourself.',
        'Fill in the template: what changed, why, how to test, screenshots or a screen recording of the UI, and the linked issue (Closes #42).',
        'Self-review the diff line by line in GitHub before requesting review. Delete debug code, TODOs and stray console logs.',
        'Check the acceptance criteria one by one against the preview deployment, not against your intentions.',
        'Wait for green CI. Never merge over failing checks "just this once".',
        'Squash-merge with a Conventional Commit title and delete the branch.'
      ],
      deliver: ['Reviewed PRs', 'Clean commit history'],
      tools: ['GitHub', 'GitHub Pull Requests extension for VS Code'],
      dod: ['CI green', 'Acceptance criteria verified on preview', 'Branch deleted after merge'],
      docs: ['doc-pr-checklist']
    },
    {
      id: 'p8-6', title: 'Automated testing as you build', role: 'Dev', est: 12, pri: 2, pts: 8,
      why: 'Tests are how you make changes in month three without fear. Write them with the feature, not after the project.',
      how: [
        'Unit test the logic that would be expensive to get wrong: pricing, permissions, date handling, validation, state machines.',
        'Integration test API endpoints against a real test database, covering success, validation failure, and unauthorised access.',
        'Write end-to-end tests for the three or four journeys that make the product worth money — signup, core task, payment.',
        'Test behaviour, not implementation. Query by role and label, as a user would find things.',
        'Add a regression test for every bug you fix, before you fix it.',
        'Run tests in CI on every PR; keep the suite fast enough that you actually run it locally.'
      ],
      deliver: ['Unit tests', 'API integration tests', 'E2E tests on critical journeys'],
      tools: ['Vitest / Jest', 'Supertest', 'Playwright'],
      dod: ['Critical paths covered', 'Suite green in CI', 'Bug fixes accompanied by a test'],
      docs: ['doc-testing-strategy']
    },
    {
      id: 'p8-7', title: 'Sprint review and demo with the client', role: 'PM', est: 1.5, pri: 1, pts: 2,
      why: 'Regular demos convert a mysterious black box into visible progress, and catch misunderstandings while they are cheap.',
      how: [
        'Demo on staging, on a real device, walking the sprint goal as a user would.',
        'Show working software, not screenshots or a board.',
        'State plainly what did not get done and why; carry it forward rather than hiding it.',
        'Capture feedback as new issues, triaged into: in-scope bug, in-scope refinement, or change request.',
        'Re-confirm priorities for the next sprint at the end of the demo while everyone is engaged.'
      ],
      deliver: ['Demo recording', 'Feedback triaged into issues', 'Updated priorities'],
      tools: ['Staging environment', 'Meeting recording'],
      dod: ['Client has seen working software', 'Feedback logged as issues'],
      docs: ['doc-demo']
    },
    {
      id: 'p8-8', title: 'Sprint retrospective', role: 'PM', est: 0.75, pri: 3, pts: 1,
      why: 'The compounding advantage of a solo studio is a process that improves every fortnight. This is where that happens.',
      how: [
        'Answer three questions honestly: what went well, what did not, what will I change next sprint.',
        'Compare estimated versus actual hours per story and note where you are systematically optimistic.',
        'Pick exactly one process change to make. One change adopted beats five noted.',
        'Update your estimating multipliers and your reusable templates with what you learned.'
      ],
      deliver: ['Retro notes', 'One process change', 'Updated velocity data'],
      tools: ['Notes', 'Time tracker report'],
      dod: ['One improvement identified and applied to the next sprint'],
      docs: ['doc-retro']
    }
  ]
},
{
  id: 'p9', num: 9, name: 'QA, Accessibility & Pre-launch Hardening', short: 'QA',
  goal: 'Find everything that is broken before your client\'s customers do.',
  exit: [
    'Full QA pass clean on all target browsers and devices',
    'WCAG 2.2 AA verified',
    'Performance and security checks passed'
  ],
  tasks: [
    {
      id: 'p9-1', title: 'Functional QA pass', role: 'QA', est: 8, pri: 1, pts: 5,
      why: 'A systematic sweep catches the interactions between features that story-level testing misses.',
      how: [
        'Build a test matrix: every user story x every browser/device you support, with pass/fail and notes.',
        'Test the unhappy paths deliberately: wrong password, expired session, duplicate submission, back button mid-flow, refresh mid-form, offline, slow 3G.',
        'Test with data extremes: empty account, one item, thousands of items, very long strings, emoji, right-to-left text, special characters.',
        'Test permissions by logging in as each role and attempting actions you should not be allowed — including by calling the API directly.',
        'Test email flows end to end: verification, reset, notifications, and how they render in Gmail and Outlook.',
        'Log every bug with steps to reproduce, expected vs actual, environment, severity and a screen recording.'
      ],
      deliver: ['Test matrix completed', 'Bug log', 'Severity triage'],
      tools: ['BrowserStack', 'Playwright', 'Spreadsheet'],
      dod: ['All severity 1–2 bugs fixed', 'Matrix complete for supported browsers'],
      docs: ['doc-qa-matrix', 'doc-bug-report']
    },
    {
      id: 'p9-2', title: 'Cross-browser and responsive verification', role: 'QA', est: 4, pri: 2, pts: 3,
      why: 'Your machine is not your users\' machines. Safari and older Android are where designs quietly fall apart.',
      how: [
        'Verify on the latest Chrome, Safari, Firefox and Edge, plus iOS Safari and Android Chrome on real devices.',
        'Check every breakpoint plus the awkward in-between widths where layouts often break.',
        'Check dark mode if supported, high-contrast mode, and 200% browser zoom.',
        'Verify with an ad blocker and with third-party cookies blocked — a common cause of "it works for me".',
        'Check print styles if any part of the product is printed or exported.'
      ],
      deliver: ['Cross-browser results', 'Device screenshots', 'Fixed issues'],
      tools: ['BrowserStack / real devices', 'Responsively App'],
      dod: ['No layout breakage across supported matrix'],
      docs: []
    },
    {
      id: 'p9-3', title: 'Accessibility audit', role: 'QA', est: 6, pri: 1, pts: 5,
      why: 'It is a legal requirement in many markets, it is the right thing to do, and it improves usability for everyone.',
      how: [
        'Run automated scans (axe, Lighthouse, WAVE) on every template — but treat them as covering only about a third of the issues.',
        'Navigate the entire product using only the keyboard: everything reachable, focus always visible, logical order, no keyboard traps, skip link present.',
        'Test with a screen reader: VoiceOver on Safari and NVDA on Firefox. Check headings, labels, button names, image alt text, and that dynamic updates are announced via live regions.',
        'Verify all form fields have persistent labels and that errors are associated programmatically and announced.',
        'Check colour contrast on the built product, including hover, focus and disabled states.',
        'Verify prefers-reduced-motion is respected and that no content flashes more than three times a second.',
        'Write an accessibility statement documenting conformance level and any known limitations.'
      ],
      deliver: ['Automated scan reports', 'Manual audit findings', 'Fixes', 'Accessibility statement'],
      tools: ['axe DevTools', 'Lighthouse', 'VoiceOver / NVDA'],
      dod: ['WCAG 2.2 AA met on all key journeys', 'Keyboard and screen reader passes done manually'],
      docs: ['doc-a11y-audit']
    },
    {
      id: 'p9-4', title: 'Performance optimisation', role: 'Dev', est: 5, pri: 2, pts: 5,
      why: 'Performance is a feature and a conversion lever. It is also far cheaper to fix before launch than after.',
      how: [
        'Measure first: Lighthouse and WebPageTest on throttled mobile, not your fibre connection.',
        'Target Core Web Vitals: LCP under 2.5s, INP under 200ms, CLS under 0.1.',
        'Optimise images: modern formats, correct dimensions, lazy loading below the fold, explicit width/height to prevent layout shift.',
        'Reduce JavaScript: code-split by route, defer non-critical scripts, audit dependencies for weight, remove unused polyfills.',
        'Add caching: HTTP cache headers, CDN in front of static assets, server-side caching for expensive queries.',
        'Profile the backend: find N+1 queries, add missing indexes, and set a response-time budget for key endpoints.',
        'Re-measure and record the numbers so you can show the client the improvement against the baseline.'
      ],
      deliver: ['Performance report before/after', 'Optimisations applied', 'Caching strategy'],
      tools: ['Lighthouse', 'WebPageTest', 'Bundle analyser', 'Database query logs'],
      dod: ['Core Web Vitals in the green on mobile', 'No N+1 queries on key pages'],
      docs: ['doc-performance']
    },
    {
      id: 'p9-5', title: 'Security review', role: 'Dev', est: 4, pri: 1, pts: 5,
      why: 'A breach on a small client\'s site is an existential event for their business and your reputation.',
      how: [
        'Work through the OWASP Top 10 methodically against your own app.',
        'Confirm authorisation is enforced server-side on every endpoint, including ones only linked from admin UI.',
        'Check for injection risks: parameterised queries everywhere, output escaped, no dynamic query string building.',
        'Verify secrets are not in the repo or the client bundle; rotate anything ever committed by accident.',
        'Set security headers: CSP, HSTS, X-Content-Type-Options, Referrer-Policy, frame ancestors.',
        'Enforce rate limiting on auth, password reset, and any expensive or public endpoint.',
        'Review file uploads: type validation, size limits, storage outside the web root, virus scanning if user-to-user.',
        'Run npm audit / Snyk and update vulnerable dependencies.',
        'Confirm GDPR basics: privacy policy, cookie consent where required, data retention, deletion route, and a documented data processing basis.'
      ],
      deliver: ['Security checklist completed', 'Vulnerabilities fixed', 'Headers configured', 'Privacy documentation'],
      tools: ['OWASP ZAP', 'Snyk / npm audit', 'securityheaders.com'],
      dod: ['No high or critical vulnerabilities', 'Headers scoring A', 'Auth rate-limited'],
      docs: ['doc-security']
    },
    {
      id: 'p9-6', title: 'Content, SEO and analytics readiness', role: 'Dev/Content', est: 4, pri: 2, pts: 3,
      why: 'The parts everyone forgets on launch day, then scrambles to fix while the site is live.',
      how: [
        'Final content pass: proofread everything, check names and prices, remove all placeholder text and dummy images.',
        'Set unique title tags and meta descriptions per page; add Open Graph and Twitter card images.',
        'Add structured data where relevant (Organization, Product, Article, LocalBusiness, FAQ) and validate it.',
        'Generate sitemap.xml and robots.txt; confirm staging is noindexed and production is not.',
        'Set canonical URLs and plan 301 redirects for every changed URL from the old site. Map them in a spreadsheet.',
        'Install analytics and configure the events tied to your success metrics, then verify they actually fire.',
        'Add a favicon set, web manifest, and a 404 and 500 page that are designed rather than default.'
      ],
      deliver: ['SEO metadata', 'Redirect map', 'Analytics with events', 'Sitemap and robots', 'Error pages'],
      tools: ['GA4 / Plausible', 'Search Console', 'Schema validator'],
      dod: ['Redirects mapped for every old URL', 'Analytics events verified firing', 'Production indexable'],
      docs: ['doc-seo-launch']
    }
  ]
},
{
  id: 'p10', num: 10, name: 'Deployment & Launch', short: 'Launch',
  goal: 'Ship to production safely, with a tested rollback and eyes on the system afterwards.',
  exit: [
    'Live on the production domain with SSL and monitoring',
    'Backups verified and rollback tested',
    'Client notified and post-launch watch complete'
  ],
  tasks: [
    {
      id: 'p10-1', title: 'Production environment provisioning', role: 'Dev', est: 4, pri: 1, pts: 5,
      why: 'Production should be boring. Boring comes from configuring it deliberately rather than by copying staging at 11pm.',
      how: [
        'Provision production hosting, database and object storage on appropriate plans — not the free tier the client will outgrow in a month.',
        'Set all environment variables in the platform\'s secret store, separate from staging, and document what each one does.',
        'Configure the custom domain, DNS records and SSL; verify the certificate auto-renews.',
        'Enable automated database backups with a defined retention period, then restore one to a scratch database to prove backups actually work.',
        'Set up uptime monitoring, error tracking and log retention with alerts routed somewhere you will actually see them.',
        'Confirm production email sending is configured with SPF, DKIM and DMARC so mail does not land in spam.',
        'Document who owns each account and how billing is handled — ideally accounts are in the client\'s name with you granted access.'
      ],
      deliver: ['Production environment', 'DNS + SSL', 'Verified backups', 'Monitoring and alerts', 'Access register'],
      tools: ['Vercel/Railway/Fly/AWS', 'Managed Postgres', 'Sentry', 'BetterStack / UptimeRobot'],
      dod: ['Backup restore tested', 'Alerts reaching a real inbox', 'Accounts in client\'s name'],
      docs: ['doc-prod-setup']
    },
    {
      id: 'p10-2', title: 'Launch rehearsal on staging', role: 'Dev', est: 3, pri: 1, pts: 3,
      why: 'The first time you run the launch sequence should not be on launch day.',
      how: [
        'Run the full deployment sequence against staging exactly as written in the runbook, timing each step.',
        'Rehearse the data migration on a copy of real production data if you are replacing an existing system.',
        'Practise the rollback: deploy, break something deliberately, roll back, confirm the system is healthy.',
        'Note every manual step and automate or script the ones you can.',
        'Confirm the runbook is complete enough that a tired version of you could follow it.'
      ],
      deliver: ['Timed rehearsal notes', 'Refined runbook', 'Proven rollback'],
      tools: ['Staging', 'Runbook doc'],
      dod: ['Full sequence rehearsed end to end', 'Rollback proven'],
      docs: ['doc-runbook']
    },
    {
      id: 'p10-3', title: 'Go live', role: 'Dev', est: 3, pri: 1, pts: 3,
      why: 'Executing a rehearsed plan calmly, at a sensible hour, with the client reachable.',
      how: [
        'Launch mid-morning early in the week, never on a Friday afternoon. You want hours of daylight to fix things.',
        'Lower DNS TTL 24–48 hours in advance so a rollback propagates fast.',
        'Take a final backup of anything being replaced before you touch it.',
        'Follow the runbook step by step and tick each item; do not improvise.',
        'Deploy, run migrations, then run the smoke test list: homepage, signup, login, core journey, payment, email, admin, analytics firing.',
        'Verify SSL, redirects, sitemap submission in Search Console, and that staging remains noindexed.',
        'Announce to the client only after smoke tests pass, with a short note on what to watch for.'
      ],
      deliver: ['Live production site', 'Completed smoke test checklist', 'Launch announcement'],
      tools: ['Runbook', 'Monitoring dashboards'],
      dod: ['All smoke tests pass in production', 'Monitoring green', 'Client informed'],
      docs: ['doc-launch-checklist']
    },
    {
      id: 'p10-4', title: 'Post-launch watch (72 hours)', role: 'Dev', est: 4, pri: 1, pts: 3,
      why: 'Real traffic finds problems no test suite will. The first three days are when you catch them cheaply.',
      how: [
        'Watch error tracking closely for the first few hours and check it three times a day for three days.',
        'Monitor server resources, response times and database load under real traffic.',
        'Check analytics: are the key events firing, are funnels behaving as expected, is anything at zero that should not be?',
        'Watch for support messages and triage anything user-reported within the day.',
        'Fix critical issues immediately via hotfix branch; batch everything else into the next sprint.',
        'Send the client a short day-three report: uptime, errors resolved, early usage numbers.'
      ],
      deliver: ['Monitoring log', 'Hotfixes deployed', 'Day-three report'],
      tools: ['Sentry', 'Analytics', 'Uptime monitoring'],
      dod: ['No unresolved critical errors', 'Report sent to client'],
      docs: []
    }
  ]
},
{
  id: 'p11', num: 11, name: 'Handover, Closure & Growth', short: 'Handover',
  goal: 'Leave the client genuinely self-sufficient, get paid, capture the learnings, and turn the project into future work.',
  exit: [
    'Client trained and documentation delivered',
    'Final invoice paid and assets transferred',
    'Case study captured and next engagement discussed'
  ],
  tasks: [
    {
      id: 'p11-1', title: 'Write the documentation pack', role: 'Dev', est: 6, pri: 1, pts: 5,
      why: 'Documentation is what stops you being on unpaid support duty for the next two years.',
      how: [
        'Technical README: architecture overview, local setup, environment variables, scripts, deployment procedure, rollback, known limitations.',
        'Client user guide: how to do the ten things they will actually need to do, written in plain language with screenshots or short clips.',
        'Admin guide: managing users and permissions, content updates, refunds or cancellations, viewing reports.',
        'Maintenance guide: what needs updating and how often, what the monthly costs are, what to do if the site is down and who to call.',
        'Credentials handover: transfer ownership of hosting, domain, database, analytics, email and third-party accounts, documented in a password manager vault shared with the client.',
        'Record a 15–20 minute screen walkthrough — clients rewatch videos far more often than they reread PDFs.'
      ],
      deliver: ['Technical README', 'User guide', 'Admin guide', 'Maintenance guide', 'Credentials vault', 'Walkthrough video'],
      tools: ['Markdown in repo', 'Loom', '1Password / Bitwarden'],
      dod: ['All accounts transferred to client ownership', 'Video recorded', 'Guides delivered'],
      docs: ['doc-handover-pack']
    },
    {
      id: 'p11-2', title: 'Client training session', role: 'Lead', est: 2, pri: 1, pts: 2,
      why: 'A trained client uses the product properly, reports fewer false bugs, and stays a client.',
      how: [
        'Run 60–90 minutes live, with the client driving their own screen rather than watching you drive.',
        'Cover their real recurring tasks in the order they will do them, not a feature tour.',
        'Have them complete each task themselves at least once while you watch.',
        'Record the session and add it to the documentation pack.',
        'End with the support process: what is covered, what is billable, response times, and how to report a bug properly.'
      ],
      deliver: ['Training recording', 'Support process document'],
      tools: ['Zoom', 'Loom'],
      dod: ['Client completed each core task unaided', 'Support terms understood'],
      docs: ['doc-support-terms']
    },
    {
      id: 'p11-3', title: 'Project closure and final invoice', role: 'Ops', est: 1.5, pri: 1, pts: 2,
      why: 'Close the engagement formally so scope, liability and payment all end on a clear date.',
      how: [
        'Check every SOW deliverable off explicitly and get written acceptance.',
        'Send the final invoice with the payment terms restated; IP transfers on payment, as per the contract.',
        'Archive the project: repository, design files, research data, contracts and correspondence in one dated folder.',
        'Close out time tracking and compare actual hours to the estimate, by category. This is the data that makes your next quote accurate.',
        'Delete or archive any client personal data you no longer have a basis to hold.'
      ],
      deliver: ['Signed acceptance', 'Final invoice', 'Archived project', 'Profitability analysis'],
      tools: ['Invoicing tool', 'Time tracker', 'Archive storage'],
      dod: ['Written acceptance received', 'Invoice sent', 'Profitability calculated'],
      docs: ['doc-closure']
    },
    {
      id: 'p11-4', title: 'Measure outcomes against the success metrics', role: 'Strategy', est: 2, pri: 2, pts: 2,
      why: 'This is the difference between "I made you a website" and "I increased your bookings 34%". It is the basis of your next fee.',
      how: [
        'Wait 30–60 days for meaningful data, then pull the metrics you baselined in phase 3.',
        'Compare before and after honestly, including anything that did not improve.',
        'Present the results to the client in a short session, with recommendations for what to do next.',
        'Ask directly for a testimonial and a referral while the results are in front of them.',
        'Turn the numbers into a case study: problem, approach, evidence, outcome.'
      ],
      deliver: ['Outcome report', 'Case study', 'Testimonial'],
      tools: ['Analytics', 'Docs'],
      dod: ['Metrics compared to baseline', 'Testimonial requested'],
      docs: ['doc-outcome-report']
    },
    {
      id: 'p11-5', title: 'Retainer or phase two proposal', role: 'Lead', est: 2, pri: 2, pts: 2,
      why: 'The easiest client to sell to is the one you have just delighted. Do not let the relationship go quiet.',
      how: [
        'Present the phase two list you deliberately parked in prioritisation, now informed by real usage data.',
        'Offer a maintenance retainer covering updates, monitoring, backups, security patches and a monthly allowance of hours.',
        'Price the retainer against risk avoided, not hours spent.',
        'Book a check-in for three months out even if they say no today.'
      ],
      deliver: ['Retainer proposal', 'Phase two roadmap', 'Follow-up booked'],
      tools: ['Proposal tool', 'Calendar'],
      dod: ['Proposal sent', 'Follow-up in the calendar'],
      docs: ['doc-retainer']
    },
    {
      id: 'p11-6', title: 'Internal retrospective and process improvement', role: 'Ops', est: 2, pri: 3, pts: 2,
      why: 'Every project should make the next one cheaper to run. That compounding is your actual business model.',
      how: [
        'Review the whole project: what took longer than estimated, where scope crept, which client interactions were difficult and why.',
        'Update your estimate multipliers with real data from the time tracker.',
        'Improve the templates, checklists and starter repo with anything you had to invent this time.',
        'Note the one systemic change that would have had the biggest effect, and make it now while it is vivid.'
      ],
      deliver: ['Project retro notes', 'Updated templates and starter repo', 'Revised estimates'],
      tools: ['This tracker', 'Starter repo'],
      dod: ['Templates updated', 'Estimating data revised'],
      docs: ['doc-retro']
    }
  ]
}
);
