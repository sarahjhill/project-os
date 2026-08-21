/* =====================================================================
   PROJECT OS — Template & document library (part 2: design, dev, launch)
   ===================================================================== */
Object.assign(window.DOCS, {

'doc-sketch': { title: 'Sketching & Crazy 8s', cat: 'Design', body: `
# Rapid Sketching

## Crazy 8s
1. Fold A4 into eight boxes.
2. Set a timer: **eight variations of one screen in eight minutes**, one per box.
3. No evaluation while drawing. Ugly is correct.
4. Do this for the three hardest screens only.

## Then
- Pick 2–3 directions per screen and redraw larger with annotations.
- Write one sentence per direction: what it optimises for and what it sacrifices.
- Photograph everything. Rejected ideas are your evidence when a client asks "did you consider…".

## Prompts when you get stuck
- What if the user could only see one thing on this screen?
- What if there were no form?
- What if it happened automatically?
- What if it were a conversation? A list? A map? A single number?
- How would the best competitor do it? How would you do the opposite?
- What if the user were doing this one-handed on a train?
` },

'doc-figma-setup': { title: 'Figma File Setup Standard', cat: 'Design', body: `
# Figma File Structure

## Pages
~~~
📕 Cover              project name, client, status, links, last updated
🗺 Flows              user flows and IA
🔲 Wireframes         lo-fi and mid-fi, mobile + desktop
🎨 UI — Screens       hi-fi by epic
🧩 Design System      tokens, components, documentation
📱 Prototype          wiring only
🗄 Archive            explored and rejected — never delete, always move
~~~

## Frames and breakpoints
| Name | Width | Notes |
|---|---|---|
| Mobile | 390 | design here first |
| Tablet | 768 | only where behaviour differs |
| Desktop | 1440 | 12 col, 80px margin, 24px gutter |

## Naming convention
~~~
[Epic] / [Screen] / [State]
Booking / Payment / Error — card declined
Booking / Confirmation / Default
~~~

## Rules
- 8pt spacing scale, no arbitrary values
- Auto-layout on everything that could ever reflow
- Colour and type only from variables/styles — zero raw hex on the canvas
- One source of truth per component; variants not copies
- Run a design lint pass before every handoff
- Cover page shows current status so the client always knows what's live
` },

'doc-wireframe-checklist': { title: 'Wireframe Checklist', cat: 'Design', body: `
# Wireframe Checklist

## Per screen
- [ ] The one primary action is visually dominant
- [ ] Content ordered by user priority, not by database order
- [ ] Real content used, not lorem ipsum
- [ ] Mobile layout designed first, then desktop
- [ ] Navigation and current location clear
- [ ] Back / cancel / escape route present
- [ ] Every element traceable to a user story

## The four states — for every data-driven screen
- [ ] **Empty** — first use, nothing yet. Explains what goes here and how to start.
- [ ] **Loading** — skeleton or spinner, no layout shift when it resolves
- [ ] **Populated** — typical amount of data
- [ ] **Error** — what went wrong, in plain language, and what to do next
- [ ] Bonus: **partial** (some data failed), **no results** (search/filter), **too much data** (pagination)

## Forms
- [ ] Labels above fields, always visible (never placeholder-only)
- [ ] Required vs optional marked consistently
- [ ] Helper text where the answer isn't obvious
- [ ] Inline validation on blur, not on every keystroke
- [ ] Error messages say what happened and how to fix it
- [ ] Submit button state: default, loading, disabled, success
- [ ] What happens on success — where does the user land?

## Annotations for the developer
- [ ] What is interactive and what it does
- [ ] Validation rules per field
- [ ] What the server returns and when
- [ ] Responsive behaviour: what stacks, collapses, hides — and why
- [ ] Tab order and heading hierarchy

## Before review
- [ ] Walked each flow as a persona doing a real task
- [ ] Checked against every acceptance criterion
- [ ] Greyscale only — no colour arguments at this stage
` },

'doc-ux-copy': { title: 'UX Copy Guide', cat: 'Design', body: `
# UX Copy

## Voice
Define in three words, then give an example of each. E.g. *Plain, warm, brief.*

## Rules
- Write for someone in a hurry, on a phone, mildly annoyed.
- Front-load the meaning: "Payment failed" not "Unfortunately, it seems that…"
- Use "you", avoid "we" unless there's a person behind it.
- Buttons say what happens: "Book appointment", not "Submit" or "OK".
- Sentence case for everything. Title Case Slows Reading Down.
- No jargon the user wouldn't say out loud.

## Error message formula
**What happened + why (if useful) + what to do next.**

| Bad | Good |
|---|---|
| Invalid input | Enter a date in the future |
| An error occurred | We couldn't save your changes. Check your connection and try again. |
| Payment failed | Your card was declined. Try another card or contact your bank. |
| 404 | We can't find that page. It may have moved — try search or go home. |

## Empty state formula
**What goes here + why it's useful + one clear action.**
> No bookings yet. When customers book, they'll appear here so you can manage them in one place. **[Add your first slot]**

## Microcopy checklist
- [ ] Every button, label, tooltip, placeholder, error, empty state and confirmation written deliberately
- [ ] Destructive actions name the consequence: "Delete 3 bookings permanently?"
- [ ] Confirmations confirm what actually happened, with a reference where relevant
- [ ] Read every string aloud — if you'd never say it, rewrite it
` },

'doc-visual-direction': { title: 'Visual Direction Presentation', cat: 'Design', body: `
# Visual Direction

## Prepare 2–3 directions, each with:
- A name and a character: "Confident & editorial" / "Calm & utilitarian" / "Warm & human"
- A one-line rationale tied to the brand and the users
- Mood board: photography, texture, layout references
- Colour palette with intent (what's action, what's danger, what's calm)
- Type pairing with a real headline and a real paragraph
- **One real screen** rendered in the direction — usually the busiest screen

## Presenting
1. Restate the audience and the brand goal.
2. Present each direction by name, with its rationale first, visuals second.
3. Ask: "Which one feels like your customers, not which one do you like?"
4. Client picks **one** direction, plus one element they'd borrow.
5. Close it: "So we're going with [name], borrowing [element]. I'll take it from here."

## Rules
- Never design 40 screens across three directions.
- Never present four options — it signals you have no opinion.
- Get the choice in writing before you proceed.
` },

'doc-tokens': { title: 'Design Tokens Specification', cat: 'Design', body: `
# Design Tokens

Three tiers. Developers consume the **semantic** tier only.

~~~
Primitive        blue-500: #2563EB
Semantic         color-action-primary: {blue-500}
Component        button-primary-bg: {color-action-primary}
~~~

## Colour
| Semantic token | Role | Contrast requirement |
|---|---|---|
| color-text-primary | body text | 4.5:1 on surface |
| color-text-secondary | supporting | 4.5:1 |
| color-surface | page background | — |
| color-surface-raised | cards, sheets | — |
| color-border | dividers, inputs | 3:1 |
| color-action-primary | primary buttons, links | 4.5:1 with its text |
| color-status-danger | errors, destructive | 4.5:1 |
| color-status-success | confirmations | 4.5:1 |
| color-focus-ring | focus indicator | 3:1 against adjacent |

Name by role, never appearance: color-status-danger, not color-red.

## Type scale (1.25 ratio)
| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| text-xs | 12 | 1.5 | 400 | captions, legal |
| text-sm | 14 | 1.5 | 400 | secondary, labels |
| text-base | 16 | 1.5 | 400 | body — never below 16 on mobile |
| text-lg | 20 | 1.4 | 500 | lead paragraph |
| text-xl | 25 | 1.3 | 600 | section heading |
| text-2xl | 31 | 1.2 | 700 | page heading |
| text-3xl | 39 | 1.1 | 700 | hero |

## Spacing — 4pt base
space-1 4 · space-2 8 · space-3 12 · space-4 16 · space-6 24 · space-8 32 · space-12 48 · space-16 64

## Radius · Elevation · Motion
- radius-sm 4 · radius-md 8 · radius-lg 16 · radius-full 9999
- shadow-sm / md / lg — define blur, spread, opacity; never more than three levels
- duration-fast 150ms · duration-base 250ms · duration-slow 400ms
- ease-standard cubic-bezier(0.2, 0, 0, 1)
- **All motion must respect prefers-reduced-motion**

## Export
~~~
:root {
  --color-action-primary: #2563EB;
  --space-4: 1rem;
  --radius-md: 0.5rem;
  --duration-base: 250ms;
}
~~~
Export from Figma variables to JSON/CSS. The developer imports the file — they never retype values.
` },

'doc-design-system': { title: 'Component Library Specification', cat: 'Design', body: `
# Component Library

## Build order
**Atoms:** button · icon button · link · input · textarea · select · checkbox · radio · toggle · badge · avatar · spinner · icon
**Molecules:** form field (label + hint + error) · card · list item · table row · pagination · tabs · breadcrumb · alert · toast · tooltip · dropdown menu · modal · drawer · date picker · file upload · search
**Organisms:** header + nav · footer · data table · form · empty state · page header · sidebar

## Every interactive component needs all of these
default · hover · focus-visible · active · disabled · loading · error · selected/checked · read-only

**Missing focus-visible is the single most common accessibility failure. Design it explicitly.**

## Per-component documentation
~~~
Component: Button
Purpose:   Triggers an action. Not for navigation — use Link.
Variants:  primary | secondary | ghost | destructive
Sizes:     sm (32) | md (40) | lg (48)
Props:     icon-left, icon-right, loading, disabled, full-width
Content:   Verb + noun. Max 3 words. Sentence case.
Do:        One primary button per view
Don't:     Use primary for cancel; use ghost
A11y:      Real <button>; disabled uses aria-disabled + explanation;
           loading sets aria-busy and keeps the label readable
Code:      shadcn/ui Button — extends Radix Slot
~~~

## Handoff mapping
| Figma component | Code component | Library |
|---|---|---|
| Button | Button | shadcn/ui |
| Modal | Dialog | Radix |
| Select | Select | Radix |

Map to a headless library so the developer inherits accessibility rather than rebuilding it.

## Quality bar before handoff
- [ ] All states present on every interactive component
- [ ] Responsive behaviour defined at 390px
- [ ] Only token values used — no raw hex, no arbitrary spacing
- [ ] Usage do/don't written
- [ ] Component published to the library, not copied
` },

'doc-ui-checklist': { title: 'Hi-Fi Screen Checklist', cat: 'Design', body: `
# Hi-Fi Design Checklist

## Composition
- [ ] Built from published components — zero detached instances
- [ ] Zero off-token colours, spacing or type
- [ ] Consistent grid and vertical rhythm
- [ ] Clear visual hierarchy: one primary action per screen

## Coverage
- [ ] Mobile and desktop for every screen
- [ ] Empty, loading, populated, error for every data view
- [ ] Success and confirmation screens
- [ ] Modal, drawer and toast variants where used

## Realistic data
- [ ] Longest plausible name and title (test 60+ characters)
- [ ] Zero items · one item · 10,000 items
- [ ] Missing avatar / broken image
- [ ] Very long and very short numbers, negative values
- [ ] Non-Latin characters and emoji if relevant

## Craft
- [ ] Optical alignment checked, not just mathematical
- [ ] Text never below 16px for body on mobile
- [ ] Line length 45–75 characters for readable text
- [ ] Touch targets ≥ 44x44 with spacing
- [ ] Icons consistent in weight and grid

## Performance implications
- [ ] Maximum two font families, weights limited
- [ ] Hero imagery sized and croppable for mobile
- [ ] Heavy blurs and shadows kept minimal
- [ ] Any animation has a reduced-motion alternative

## Final sweep
- [ ] Design lint plugin run and clean
- [ ] Viewed at 100% zoom on a real monitor and a real phone
- [ ] Every screen labelled with its story ID
` },

'doc-a11y': { title: 'Accessibility Design Annotations', cat: 'Design', body: `
# Accessibility in Design

## Annotate on the canvas for the developer
1. **Heading hierarchy** — mark H1 (one per page), H2, H3. Never skip levels.
2. **Landmarks** — header, nav, main, aside, footer.
3. **Tab order** — number the interactive elements in order.
4. **Focus style** — show the exact indicator: 2px offset ring, colour token, 3:1 contrast.
5. **Alt text** — write it for every meaningful image; mark decorative images as alt="".
6. **Form labels** — every field has a visible, persistent label.
7. **Error association** — errors sit next to the field and are announced.
8. **Live regions** — mark anything that updates dynamically (toasts, search results, counters).
9. **Reduced motion** — the fallback for every animation.

## Design rules
| Rule | Requirement |
|---|---|
| Body text contrast | 4.5:1 |
| Large text (18.66px bold / 24px) | 3:1 |
| UI components and borders | 3:1 |
| Touch targets | 44x44 CSS px minimum |
| Colour alone | Never the sole carrier of meaning — pair with icon or text |
| Zoom | Usable at 200% without horizontal scroll |
| Text spacing | Survives increased line-height and letter-spacing |
| Motion | Nothing flashes more than 3x per second |

## Common failures caught in design
- Placeholder text used as a label (disappears on typing)
- Grey-on-grey secondary text failing contrast
- Disabled states unreadable
- Focus rings removed for aesthetics
- Icon-only buttons with no accessible name
- Red/green as the only status difference
- Carousels that auto-advance with no pause
` },

'doc-signoff': { title: 'Sign-off Request', cat: 'Delivery', body: `
# Sign-off Request

> Hi [name],
>
> [Deliverable] is ready for review: **[link]**
>
> **What to look at:** [specific focus — e.g. "the structure and content priority; visual design comes next, so ignore the greyscale."]
>
> **How to give feedback:** comments directly on [link], or one consolidated email. Please gather input from anyone else who needs to see it and send it to me as one list from you.
>
> **By:** [date — 3 business days]
>
> **What happens next:** I'll respond to each point, make the agreed changes, and ask you to sign off. Once signed off we move to [next phase]; changes after that point go through the change request process in the SOW.
>
> Anything that isn't clear, call me.

---

## Feedback triage log
| # | Feedback | From | Type | Action | Cost |
|---|---|---|---|---|---|
| 1 | | | Structural / Visual / Out of scope | Do now / Defer / CR | |

## Sign-off record
> Deliverable: ___ · Version: ___ · Approved by: ___ · Date: ___
> Approved as-is / Approved with the changes listed above
> I understand that changes after this point follow the change request process.
` },

'doc-usability-script': { title: 'Usability Test Plan & Moderator Script', cat: 'Design', body: `
# Usability Test — Plan & Script

## Plan
| | |
|---|---|
| **What we're testing** | [prototype / live product / specific journey] |
| **Questions to answer** | 1. Can a new user complete [task] unaided? 2. Do they understand [concept]? 3. Where do they hesitate? |
| **Participants** | 5–8 per user type, screened |
| **Method** | Moderated, remote, think-aloud |
| **Session length** | 45–60 min |
| **Success measures** | Task completion (unaided / prompted / failed), time on task, error count, SUS score |

## Moderator script

### Intro (5 min)
> Thanks for making time. I'm going to show you something we're working on and ask you to try a few things.
>
> Two things before we start. **We're testing the design, not you** — if something is confusing, that's a problem with our work, not yours, and it's exactly what I need to find out. And please **think aloud** as you go: tell me what you're looking at, what you expect, what's confusing. It'll feel unnatural for about a minute and then you'll forget I'm here.
>
> This is an early prototype, so some things won't work. Just say what you'd expect to happen.
>
> Are you happy for me to record the session? [get consent on the recording]

### Warm-up (5 min)
- Tell me a bit about how you currently [do the general activity].
- When did you last do that? How did it go?

### Tasks (30 min)
Give context and a goal. **Never give interface instructions.**

~~~
Task 1
"You need a haircut next Tuesday morning. Using this site, book it."
Success: reaches confirmation unaided
Watch for: does the calendar make sense, do they notice the price

Task 2
"Something's come up — move that appointment to Thursday."
Success: reschedules without contacting support
Watch for: do they find the booking, do they understand the 24h rule

Task 3
"You've got a voucher code. Use it."
Success: applies the code before payment
Watch for: is the field findable
~~~

### Probes — use sparingly
- What are you thinking?
- What do you expect will happen if you click that?
- What would you normally do here?
- How does that compare with what you expected?
- On a scale of 1–5, how easy was that? Why that number?

### Wrap (10 min)
- What was the most confusing part?
- What was the best part?
- If you could change one thing, what would it be?
- Would you use this? What would stop you?
- [SUS questionnaire if using one]

## Moderator rules
- **Do not help.** Count to ten before intervening. The silence is the data.
- When asked "what should I do?", reflect it back.
- Never explain the design. If you have to explain it, it has failed.
- Note timestamps of every hesitation, error and moment of confusion.
- Debrief for ten minutes immediately after each session and write your top three observations.

## Task success matrix
| Task | P1 | P2 | P3 | P4 | P5 | Success rate | Avg time |
|---|---|---|---|---|---|---|---|
| 1 | ✓ | ⚠ | ✓ | ✗ | ✓ | 3/5 | |

✓ unaided · ⚠ completed with prompt · ✗ failed
` },

'doc-usability-findings': { title: 'Usability Findings & Issue Log', cat: 'Design', body: `
# Usability Findings

## Issue log
| # | Issue | Screen / stage | Participants affected | Severity | Proposed fix | Fixed | Retested |
|---|---|---|---|---|---|---|---|
| 1 | Users didn't see the total price before the final step | Checkout | 4/5 | 1 | Show running total in a sticky bar | | |

**Severity**
- **1 Critical** — blocks task completion. Fix before build, no exceptions.
- **2 Major** — causes significant delay, error or frustration. Fix before build.
- **3 Minor** — noticeable friction, task still completes. Backlog with evidence.
- **4 Cosmetic** — inconsistency, no functional impact. Batch it.

## Findings summary — the deck you present
1. **What we tested** — journeys, prototype version, dates
2. **Who we tested with** — participant profile, how recruited
3. **Headline result** — "3 of 5 participants could not complete checkout unaided"
4. **The three biggest problems** — one slide each: what happened, a 15-second clip, how many participants, why it happens, what we're changing
5. **What worked well** — genuinely important; it stops the client redesigning things that are fine
6. **What we changed** — before/after screens
7. **Retest results** — evidence the fix worked
8. **What we're carrying to the backlog** — with severity and evidence

## Retest
Re-test the changed flows with **3 fresh participants**. A fix you haven't retested is a hypothesis.

| Issue | Before (success rate) | After |
|---|---|---|

## When an issue is a scope problem, not a design problem
Escalate to the client with the recording attached. "Three of five participants failed here because [feature] doesn't exist. Options: (a) add it — X days, (b) mitigate with [workaround], (c) accept the risk." Let them choose, in writing.
` },

'doc-handoff': { title: 'Design → Development Handoff', cat: 'Handoff', body: `
# Design to Development Handoff

## File preparation
- [ ] Layers named meaningfully — no "Rectangle 47"
- [ ] Components published, nothing detached
- [ ] Variables/tokens published and exported to JSON or CSS
- [ ] Archive page holds everything rejected; the main pages hold only the truth
- [ ] Dev Mode enabled with the ready-for-dev sections marked
- [ ] Cover page states version and date

## Spec page — write these explicitly
| Item | Spec |
|---|---|
| Breakpoints | 390 / 768 / 1024 / 1440 |
| Grid | 12 col, 24px gutter, 80px margin desktop; 4 col, 16px mobile |
| Spacing scale | 4pt |
| Focus indicator | 2px solid color-focus-ring, 2px offset |
| Motion | 250ms ease-standard; disabled under prefers-reduced-motion |
| Form validation | on blur, then on submit; inline messages |
| Image handling | WebP, lazy below fold, explicit dimensions |
| Supported browsers | last 2 versions Chrome/Safari/Firefox/Edge + iOS 16+ |
| Accessibility target | WCAG 2.2 AA |

## Assets
- [ ] Icons as SVG, single colour, consistent viewBox
- [ ] Logo: SVG, plus mono and reversed variants
- [ ] Photography: WebP/AVIF at 1x and 2x, correct crops per breakpoint
- [ ] Favicon set + web manifest + OG image (1200x630)
- [ ] Fonts: files or the correct embed, with licence confirmed

## The walkthrough — do this live, always
Walk every screen and every state out loud. The questions asked during this session are the gaps in your file. Log them.

| Question | Answer | Design updated? |
|---|---|---|

## Agree the boundaries
**Developer may change without asking:** rounding to the nearest scale value, minor copy typos, adding intermediate breakpoints.
**Developer must ask:** flow changes, hierarchy changes, token changes, removing states, anything affecting accessibility.
` },

'doc-git-workflow': { title: 'Git & GitHub Workflow', cat: 'Dev', body: `
# Git & GitHub Workflow

## Branching — trunk-based
~~~
main            always deployable, protected
feat/42-slug    short-lived feature branch off main
fix/57-slug     bug fix
chore/deps      tooling, dependencies
docs/readme     documentation
~~~
Branches live hours or days, never weeks. Long branches mean painful merges.

## Daily commands
~~~bash
git checkout main && git pull
git checkout -b feat/42-booking-calendar

# work in small commits
git add -p                      # stage deliberately, review as you go
git commit -m "feat(booking): add slot picker"
git push -u origin HEAD

gh pr create --fill --draft     # open early so CI runs
gh pr ready                     # when it's finished
gh pr merge --squash --delete-branch
~~~

## Conventional Commits
~~~
feat(scope):     new user-facing capability
fix(scope):      bug fix
refactor(scope): no behaviour change
perf(scope):     performance
test(scope):     tests only
docs(scope):     documentation
chore(scope):    build, deps, tooling
style(scope):    formatting only

BREAKING CHANGE: in the footer for anything incompatible
~~~
This makes changelogs and semantic versioning automatic.

## Branch protection on main
- [ ] Require a pull request before merging
- [ ] Require status checks: typecheck, lint, test, build
- [ ] Require branches to be up to date before merging
- [ ] Block force pushes and deletions
- [ ] Require linear history (squash merges)

## Repo files to create on day one
~~~
.github/
  workflows/ci.yml
  workflows/deploy.yml
  PULL_REQUEST_TEMPLATE.md
  ISSUE_TEMPLATE/bug.yml
  ISSUE_TEMPLATE/story.yml
  dependabot.yml
  CODEOWNERS
.vscode/
  settings.json
  extensions.json
  launch.json
.editorconfig
.env.example
README.md
CONTRIBUTING.md
~~~

## Recovering from mistakes
~~~bash
git commit --amend            # fix the last commit (before pushing)
git restore --staged file     # unstage
git restore file              # discard local changes
git revert <sha>              # safely undo a pushed commit
git reflog                    # find anything you think you've lost
git stash / git stash pop     # park work to switch branches
~~~
` },

'doc-vscode': { title: 'VS Code Project Configuration', cat: 'Dev', body: `
# VS Code Setup — commit these to the repo

## .vscode/settings.json
~~~json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },
  "editor.tabSize": 2,
  "editor.rulers": [100],
  "files.eol": "\\n",
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "files.exclude": { "**/.next": true, "**/dist": true, "**/node_modules": true },
  "search.exclude": { "**/pnpm-lock.yaml": true, "**/package-lock.json": true },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "eslint.validate": ["javascript", "typescript", "typescriptreact"],
  "tailwindCSS.experimental.classRegex": [["cva\\\\(([^)]*)\\\\)", "[\\"'\`]([^\\"'\`]*).*?[\\"'\`]"]]
}
~~~

## .vscode/extensions.json
~~~json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "eamodio.gitlens",
    "usernamehw.errorlens",
    "GitHub.vscode-pull-request-github",
    "Prisma.prisma",
    "rangav.vscode-thunder-client",
    "ms-playwright.playwright",
    "streetsidesoftware.code-spell-checker",
    "ms-azuretools.vscode-docker"
  ]
}
~~~

## .vscode/launch.json
~~~json
{
  "version": "0.2.0",
  "configurations": [
    { "name": "Next.js: server", "type": "node-terminal", "request": "launch",
      "command": "pnpm dev" },
    { "name": "Next.js: client", "type": "chrome", "request": "launch",
      "url": "http://localhost:3000", "webRoot": "\${workspaceFolder}" },
    { "name": "Debug tests", "type": "node-terminal", "request": "launch",
      "command": "pnpm test" }
  ]
}
~~~

## Pre-commit hooks
~~~bash
pnpm add -D husky lint-staged @commitlint/cli @commitlint/config-conventional
pnpm exec husky init
echo "pnpm exec lint-staged" > .husky/pre-commit
echo "pnpm exec commitlint --edit \\$1" > .husky/commit-msg
~~~
~~~json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
~~~

## Shortcuts worth learning
| Action | Mac | Win |
|---|---|---|
| Command palette | ⇧⌘P | Ctrl+Shift+P |
| Go to file | ⌘P | Ctrl+P |
| Go to symbol | ⇧⌘O | Ctrl+Shift+O |
| Rename symbol | F2 | F2 |
| Multi-cursor at next match | ⌘D | Ctrl+D |
| Toggle terminal | ⌃\` | Ctrl+\` |
| Format document | ⇧⌥F | Shift+Alt+F |
| Source control | ⌃⇧G | Ctrl+Shift+G |
` },

'doc-repo-structure': { title: 'Repository Structure & README', cat: 'Dev', body: `
# Repository Structure

## Monorepo (full-stack)
~~~
apps/
  web/          frontend
  api/          backend (if separate)
packages/
  ui/           shared components
  shared/       types, validation schemas, constants
  config/       eslint, tsconfig, tailwind presets
infra/          IaC, docker, deployment config
docs/
  architecture.md
  decisions/    ADRs — one file per significant decision
  runbook.md
.github/
~~~

## Frontend internals
~~~
src/
  app/ or pages/     routes
  components/
    ui/              design system primitives
    features/        feature-specific composites
  lib/               clients, helpers, formatters
  hooks/
  styles/            tokens.css, globals.css
  types/
tests/
  e2e/
~~~

## README skeleton
~~~markdown
# Project Name
One line: what it is and who it's for.

## Stack
Next.js 15 · TypeScript · Postgres + Prisma · Tailwind · Playwright · Vercel

## Getting started
Prerequisites: Node 20+, pnpm 9+, Docker (for local Postgres)

1. git clone ...
2. pnpm install
3. cp .env.example .env.local  (see variables below)
4. pnpm db:up && pnpm db:migrate && pnpm db:seed
5. pnpm dev  → http://localhost:3000

## Environment variables
| Name | Required | Description | Example |

## Scripts
| Command | Does |
| pnpm dev | run everything locally |
| pnpm test | unit + integration |
| pnpm test:e2e | Playwright |
| pnpm lint / typecheck | quality gates |
| pnpm db:migrate / db:seed | database |

## Architecture
Link to docs/architecture.md and a diagram.

## Deployment
Branch → environment mapping, how to release, how to roll back.

## Decisions
Link to docs/decisions/ — why we chose X over Y.
~~~

**Verification:** clone into a fresh folder and follow your own README. If it takes more than 30 minutes or requires knowledge in your head, the README is wrong.

## ADR template (docs/decisions/0001-database-choice.md)
~~~
# 1. Use Postgres over MongoDB
Date: 2026-03-04 · Status: Accepted
## Context
## Decision
## Consequences (good and bad)
## Alternatives considered
~~~
` },

'doc-backend-setup': { title: 'Backend Foundations Checklist', cat: 'Backend', body: `
# Backend Foundations

## Database
- [ ] Managed Postgres provisioned: dev, staging, production — separate instances
- [ ] ORM/query layer configured with generated types
- [ ] Initial migration created from the agreed data model
- [ ] Migrations are reviewed like code and run in CI against staging
- [ ] Seed script covers every UI state: empty, typical, extreme
- [ ] Connection pooling configured for serverless if applicable
- [ ] Indexes on every foreign key and every filtered/sorted column

## Authentication
- [ ] Proven library or provider — never hand-rolled crypto
- [ ] Session strategy decided and documented (httpOnly cookies vs JWT, and why)
- [ ] Password hashing with argon2 or bcrypt at appropriate cost
- [ ] Email verification, password reset with expiring single-use tokens
- [ ] Rate limiting on login, reset and signup
- [ ] Secure cookie flags: httpOnly, secure, sameSite
- [ ] Session invalidation on password change and on logout everywhere

## Authorisation
- [ ] Permission matrix implemented as a single reusable check
- [ ] Enforced on **every** endpoint, server-side, including admin-only routes
- [ ] Row-level checks: can this user act on *this* record?
- [ ] Tests that assert unauthorised access is refused

## API layer
- [ ] Validation at the boundary with schemas shared with the client
- [ ] Consistent typed error responses
- [ ] Pagination, filtering, sorting on list endpoints
- [ ] Idempotency keys on create/charge operations
- [ ] CORS configured to the known origins only
- [ ] Rate limiting on public and expensive endpoints

## Operations
- [ ] Structured JSON logging with a request ID threaded through
- [ ] Error tracking (Sentry) wired with source maps and environment tags
- [ ] Health check endpoint
- [ ] Background job queue for email, exports, webhooks — with retries and a dead-letter path
- [ ] Secrets in the platform secret store, never in the repo
- [ ] Third-party integrations behind adapters so they can be mocked
` },

'doc-fe-standards': { title: 'Frontend Standards', cat: 'Dev', body: `
# Frontend Standards

## Structure
- Components small and single-purpose; if it needs "and" to describe it, split it.
- Feature folders over type folders once the app grows.
- Co-locate tests with the component.
- Shared types and validation schemas imported from the shared package — defined once.

## Styling
- Tokens imported from the design export; never hard-code a hex or a pixel value.
- Utility classes or CSS modules — pick one and be consistent.
- Mobile-first media queries.
- Use logical properties (inline/block) where you may support RTL.

## Semantics and accessibility — the free 80%
- Real elements: button, a, label, fieldset, nav, main, h1–h6 in order.
- Never a div with an onClick where a button belongs.
- Every input has a bound label; errors linked with aria-describedby.
- Manage focus on route change, modal open/close, and after async actions.
- Test every feature with the keyboard before opening the PR.

## Data
- One data-fetching library, used consistently (TanStack Query / RSC / SWR).
- Every request has a loading, empty, error and success path rendered.
- Optimistic updates only where a rollback is genuinely safe.
- Never trust client-side validation for anything security-related.

## Performance budget
| Metric | Budget |
|---|---|
| JS on first load | < 200KB gzipped |
| LCP (mobile, throttled) | < 2.5s |
| INP | < 200ms |
| CLS | < 0.1 |
| Lighthouse performance | ≥ 90 |

- Code-split by route; lazy-load heavy components.
- Images: modern format, explicit dimensions, lazy below the fold.
- Audit any dependency over 30KB — is there a lighter option?

## Before you call a screen done
- [ ] Compared side by side with Figma at 100%
- [ ] Checked at 320, 390, 768, 1024, 1440
- [ ] Checked on a real phone
- [ ] All four states implemented
- [ ] Keyboard navigable, focus visible
- [ ] No console errors or warnings
` },

'doc-be-standards': { title: 'Backend Standards', cat: 'Backend', body: `
# Backend Standards

## Layering
~~~
route/controller   parse, validate, authorise, call service, format response
service            business logic — pure, testable, no framework imports
repository         data access only
~~~
Business logic in a route handler is untestable. Keep handlers thin.

## Every endpoint, without exception
1. Validate input against a schema
2. Authenticate
3. Authorise — including row-level ownership
4. Execute inside a transaction if it writes more than once
5. Return a typed response or a typed error
6. Log with the request ID

## Data integrity
- Constraints in the database, not just in application code: NOT NULL, CHECK, UNIQUE, FK.
- Transactions for multi-write operations; keep them short.
- Optimistic concurrency (version column) where two users may edit the same record.
- Money as integer minor units with an explicit currency. Never floats.
- Timestamps in UTC as timestamptz; convert at the edges.

## Errors
- Distinguish expected (validation, conflict, not found) from unexpected (bug, outage).
- Expected errors return a clean typed shape; unexpected errors log the detail and return a generic message plus a request ID.
- Never leak stack traces, SQL, internal IDs or third-party responses to the client.

## Performance
- Watch for N+1 queries — log queries per request in development.
- Index anything you filter, join or sort on.
- Paginate every list. No unbounded queries, ever.
- Cache expensive reads with a deliberate invalidation strategy.
- Move anything over ~500ms into a background job.

## Integrations
- Wrap every third party in an adapter with a typed interface.
- Timeouts, retries with exponential backoff, and circuit-breaking on all outbound calls.
- Verify webhook signatures; make webhook handlers idempotent.
- Mock adapters in tests — never call a live third party from a test suite.
` },

'doc-cicd': { title: 'CI/CD Pipeline', cat: 'Dev', body: `
# CI/CD

## Environments
| Env | Branch | Data | Purpose |
|---|---|---|---|
| Local | any | seeded | development |
| Preview | PR | seeded copy | client review per PR |
| Staging | main | seeded, prod-like | integration + rehearsal |
| Production | tag / manual | real | live |

## CI on every pull request
~~~yaml
name: CI
on: pull_request
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck
      - run: pnpm lint
      - run: pnpm test -- --coverage
      - run: pnpm build
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with: { name: playwright-report, path: playwright-report/ }
~~~

## CD on merge to main
1. Run migrations against staging
2. Deploy to staging
3. Run smoke tests against the deployed URL
4. Notify on failure

## Production release — deliberate, never accidental
- Tag a release (v1.2.0) or use a manual approval environment
- Migrations run before the new code goes live, and must be backwards-compatible
- Deploy, then run production smoke tests
- Rollback path documented and previously tested

## Rules
- Never merge over a failing check
- Secrets per environment, in the platform store
- Keep CI under 10 minutes or people start skipping it
- Cache dependencies and build artefacts
` },

'doc-sprint': { title: 'Sprint Planning & Cadence', cat: 'Agile', body: `
# Sprint Cadence

**Length:** 1 week (solo) or 2 weeks (small team). Same day, same time, every time.

| Ceremony | When | Length | Output |
|---|---|---|---|
| Planning | Day 1 | 60–90 min | Sprint goal + committed backlog |
| Daily check-in | Every morning | 10 min | Yesterday / today / blockers |
| Backlog refinement | Midweek | 45 min | Next sprint's stories made Ready |
| Review & demo | Last day | 45 min | Client sees working software |
| Retrospective | Last day | 30 min | One process change |

## Planning agenda
1. Review last sprint: completed vs committed. Note the velocity.
2. Write the **sprint goal** — one sentence describing a user-visible outcome.
3. Pull stories serving the goal, up to proven velocity (not optimistic velocity).
4. Confirm each is Ready.
5. Break into subtasks of ≤ half a day.
6. Identify risks; spike unknowns as timeboxed stories.
7. **Leave 20% of capacity unplanned** for bugs and feedback.

## Estimating in points
| Points | Means |
|---|---|
| 1 | Trivial, well understood, under 2 hours |
| 2 | Simple, half a day |
| 3 | Straightforward, one day |
| 5 | Moderate, 2 days, some unknowns |
| 8 | Complex, 3–4 days — consider splitting |
| 13 | Too big. Split it. |

Estimate relatively, not in hours. Track velocity over three sprints and use the average.

## Sprint board columns
Backlog → Ready → In Progress (WIP limit 2) → In Review → Testing → Done

## Health signals
- Carrying the same story for three sprints → it's blocked or too big
- Velocity swinging more than 30% → estimates or interruptions out of control
- Nothing demoable at review → work was sliced by layer, not by outcome
` },

'doc-ready': { title: 'Definition of Ready', cat: 'Agile', body: `
# Definition of Ready

A story cannot enter a sprint until **all** of these are true:

- [ ] Written in user story form with a named persona and a real "so that"
- [ ] Acceptance criteria in Given/When/Then, covering happy path, at least one error path, and permissions
- [ ] Designs linked, including empty, loading and error states
- [ ] Non-functional requirements stated where relevant (performance, accessibility, browser support)
- [ ] Dependencies identified and unblocked
- [ ] Data and API needs known; contract updated if it changes
- [ ] Estimated at 8 points or fewer
- [ ] Open questions answered — no "we'll figure it out during the sprint"
- [ ] Test approach known
- [ ] Small enough to finish inside one sprint with room to spare

**If it isn't Ready, it doesn't get committed.** Pulling unready work into a sprint is the most reliable way to miss a sprint goal.
` },

'doc-dod': { title: 'Definition of Done', cat: 'Agile', body: `
# Definition of Done

Applies to **every** story. Pin it to the board.

## Code
- [ ] All acceptance criteria demonstrably met
- [ ] Code reviewed (self-review counts, done properly, on the diff in GitHub)
- [ ] Typecheck, lint and tests pass in CI
- [ ] No console errors or warnings
- [ ] No commented-out code, TODOs or debug logging left behind

## Testing
- [ ] Unit tests for new logic
- [ ] Integration test for new endpoints
- [ ] E2E updated if a critical journey changed
- [ ] Manually tested on Chrome, Safari and a real mobile device

## Design & accessibility
- [ ] Matches the design at all breakpoints
- [ ] All states implemented: empty, loading, error, success
- [ ] Keyboard navigable with visible focus
- [ ] Contrast verified; automated a11y scan clean on the changed pages

## Data & security
- [ ] Input validated server-side
- [ ] Authorisation enforced server-side
- [ ] Migrations tested up and down
- [ ] No secrets in the code

## Delivery
- [ ] Merged to main and deployed to staging
- [ ] Verified working on staging, not just locally
- [ ] Documentation updated if behaviour changed
- [ ] Issue closed with a link to the PR
` },

'doc-daily': { title: 'Daily Working Rhythm', cat: 'Agile', body: `
# Daily Rhythm (solo)

## Morning — 10 minutes
Write it down, even alone. Especially alone.
~~~
Yesterday:  finished the slot picker, hit a bug with timezone conversion
Today:      fix timezone, finish booking confirmation, open PR
Blockers:   waiting on the client's Stripe account — chased Monday
~~~

## Starting a task
1. Pick the top Ready issue.
2. Move it to In Progress on the board.
3. Create the branch: git checkout -b feat/42-slug
4. Re-read the acceptance criteria before writing any code.

## While working
- Commit whenever the code works, with a Conventional Commit message.
- Push at least once a day. Work must never exist only on your laptop.
- Keep a running note of decisions made and questions raised.
- Batch client questions into one message per day rather than drip-feeding.
- Timebox anything you're stuck on to 45 minutes, then change approach or ask.

## End of day — 5 minutes
- [ ] Push everything
- [ ] Update the board to reflect reality, not hope
- [ ] Log time against the story
- [ ] Write tomorrow's first task on a sticky note

## Weekly — 20 minutes
- Compare estimated vs actual on everything closed
- Update the client with progress, even if there's nothing to demo
- Check dependency and security alerts
- Review the backlog order — has anything changed?
` },

'doc-pr-checklist': { title: 'Pull Request Template & Checklist', cat: 'Dev', body: `
# Pull Request Template

~~~markdown
## What
One or two sentences on what this changes.

Closes #42

## Why
Link to the story. What user outcome does this deliver?

## How to test
1. Go to /bookings
2. Select a slot in the past
3. Expect: inline error "Choose a future time"

## Screenshots / recording
| Before | After |
|---|---|

## Checklist
- [ ] Acceptance criteria verified on the preview deployment
- [ ] Tests added or updated
- [ ] Typecheck, lint, tests pass locally
- [ ] All states handled: empty, loading, error
- [ ] Responsive checked at 390 and 1440
- [ ] Keyboard navigable, focus visible
- [ ] No new console warnings
- [ ] Migrations tested up and down
- [ ] Docs updated if behaviour changed

## Risk
Low / Medium / High — and what could break.
~~~

## Review discipline (even solo)
- Open as a **draft** early so CI runs while you finish.
- Keep it under ~400 lines changed. Big PRs get rubber-stamped, including by you.
- Read the diff in GitHub, not in your editor. Different context catches different mistakes.
- Read it as though someone else wrote it and you have to maintain it.
- Verify against the acceptance criteria on the **preview URL**, not your intentions.
- Never merge over red CI.
- Squash merge with a Conventional Commit title; delete the branch.
` },

'doc-testing-strategy': { title: 'Testing Strategy', cat: 'Dev', body: `
# Testing Strategy

## The shape
~~~
   /\\      A few E2E — the journeys that make money
  /--\\     Some integration — API + database, real behaviour
 /----\\    Many unit — logic that's expensive to get wrong
~~~

## Unit — test the logic that would hurt
Pricing, discounts, tax. Permission checks. Date and timezone handling. Validation rules. State machines. Formatters.
Skip: getters, trivial components, framework behaviour.

## Integration — API endpoints against a real test database
For each endpoint: success case · validation failure · unauthenticated · unauthorised · not found · conflict.
~~~ts
it('refuses to book a slot owned by another user', async () => {
  const res = await request(app)
    .patch('/bookings/' + otherUsersBooking.id)
    .set('Authorization', 'Bearer ' + customerToken)
    .send({ status: 'cancelled' });
  expect(res.status).toBe(403);
});
~~~

## E2E — 3–5 journeys maximum
Sign up → onboard · the core task end to end · payment · admin critical action.
Run against a seeded environment. Keep them stable — flaky E2E gets ignored, and ignored tests are worse than none.

## Rules
- Test behaviour, not implementation. Query by role and accessible name, as a user would.
- Every bug fix gets a regression test — written **before** the fix.
- No test depends on another test's state.
- Deterministic: freeze time, seed randomness, mock third parties.
- Fast enough that you run them locally without resenting it.

## Coverage
Aim for high coverage on business logic; ignore the global percentage. 100% coverage of trivial code proves nothing.

## Accessibility in CI
~~~ts
import { injectAxe, checkA11y } from 'axe-playwright';
test('booking page has no a11y violations', async ({ page }) => {
  await page.goto('/bookings');
  await injectAxe(page);
  await checkA11y(page, null, { detailedReport: true });
});
~~~
` },

'doc-demo': { title: 'Sprint Review / Demo', cat: 'Agile', body: `
# Sprint Review (45 min)

## Before
- Deploy to staging and check it works — never demo from localhost.
- Seed realistic data. Empty screens demo badly.
- Rehearse the path once. Have a fallback recording if the network is unreliable.

## Running it
1. **Restate the sprint goal** (2 min).
2. **Demo working software** (20 min) — walk it as a user, on a real device. No slides, no board screenshots.
3. **What didn't get done and why** (5 min) — say it plainly. Trust is built here.
4. **Feedback** (10 min) — capture everything as issues, live, in front of them.
5. **Next sprint priorities** (8 min) — agree while everyone is engaged.

## Triage feedback immediately
| Type | Meaning | Action |
|---|---|---|
| Bug | Doesn't meet agreed criteria | Fix, no charge |
| Refinement | Meets criteria, could be better | Estimate, discuss priority |
| New scope | Wasn't in the SOW | Change request with a price |

Say which category each item is **in the meeting**. Retro-fitting the category later feels like an argument.

## Afterwards
- Send the recording and the issue list within 24 hours.
- Update the roadmap if priorities moved.
` },

'doc-retro': { title: 'Retrospective', cat: 'Agile', body: `
# Retrospective (30 min)

## The three questions
1. What went well and should be repeated?
2. What went badly or felt like friction?
3. What one thing will I change next sprint?

## Data to look at first
| Measure | This sprint | Last | Trend |
|---|---|---|---|
| Points committed vs completed | | | |
| Estimated vs actual hours | | | |
| Bugs found after "done" | | | |
| Time lost to blockers | | | |
| Client response time | | | |

## Prompts if you're stuck
- Where did I lose the most time and was it avoidable?
- What did I estimate badly, and is that a pattern?
- What did I have to invent that should have been a template?
- What did the client find confusing, and was that my communication?
- What did I keep putting off, and why?

## Output — one change
Write it as a specific behaviour, not an intention.
> ~~"Estimate better."~~
> "Multiply all backend integration estimates by 1.5 — I've now underestimated three in a row."

## End of project
Also update: estimate multipliers, starter repo, checklists, proposal template, and the question list you wish you'd asked at discovery.
` },

'doc-qa-matrix': { title: 'QA Test Matrix', cat: 'QA', body: `
# QA Test Matrix

## Coverage grid
| Story / Journey | Chrome | Safari | Firefox | Edge | iOS Safari | Android Chrome | Notes |
|---|---|---|---|---|---|---|---|
| Sign up | | | | | | | |
| Sign in / reset | | | | | | | |
| Core task | | | | | | | |
| Payment | | | | | | | |
| Admin action | | | | | | | |

## Deliberate destruction — test these on purpose
- [ ] Submit every form empty
- [ ] Submit with maximum-length and over-length input
- [ ] Special characters, emoji, RTL text, HTML tags in text fields
- [ ] Double-click submit buttons
- [ ] Browser back button mid-flow
- [ ] Refresh mid-form
- [ ] Open the same flow in two tabs
- [ ] Let the session expire mid-task
- [ ] Go offline mid-request
- [ ] Throttle to slow 3G
- [ ] Deny geolocation / camera / notification permissions
- [ ] Block third-party cookies and run an ad blocker
- [ ] Call an admin API endpoint as a customer
- [ ] Change an ID in the URL to another user's record

## Data states
- [ ] Brand-new empty account
- [ ] Exactly one item
- [ ] Enough to paginate
- [ ] Thousands of items
- [ ] Deleted / archived records
- [ ] Missing optional data (no avatar, no phone)

## Email and notifications
- [ ] Every transactional email sends, renders in Gmail and Outlook, links work
- [ ] Correct sender name, reply-to, and unsubscribe where required

## Exit criteria
All severity 1 and 2 defects fixed and retested; severity 3–4 logged with an agreed plan.
` },

'doc-bug-report': { title: 'Bug Report Standard', cat: 'QA', body: `
# Bug Report

~~~markdown
**Title:** [Screen] Short description of the wrong behaviour

**Severity:** 1 Critical / 2 Major / 3 Minor / 4 Cosmetic
**Environment:** Production / Staging / Local · Chrome 128 · macOS 14 · Desktop 1440

**Steps to reproduce**
1.
2.
3.

**Expected**

**Actual**

**Evidence**
Screenshot / recording / console output / request ID

**Frequency:** Always / Sometimes (x of y) / Once
**Workaround:**
**Related:** #issue
~~~

## Severity definitions — agree these with the client
| Level | Meaning | Response |
|---|---|---|
| 1 Critical | Data loss, security issue, core journey blocked, site down | Immediately, hotfix |
| 2 Major | Significant feature broken, no reasonable workaround | Within the sprint |
| 3 Minor | Works with a workaround, or affects an edge case | Backlog, prioritised |
| 4 Cosmetic | Visual inconsistency, no functional impact | Backlog, batched |

## Client bug reporting guidance — send this to them
> When something looks wrong, send me: what you were trying to do, what you expected, what happened instead, a screenshot, and the page address. "It's broken" costs us both an extra day.
` },

'doc-a11y-audit': { title: 'Accessibility Audit (Build)', cat: 'QA', body: `
# Accessibility Audit — WCAG 2.2 AA

Automated tools catch roughly a third of issues. The manual passes matter more.

## 1. Automated
- [ ] axe DevTools on every unique template — zero violations
- [ ] Lighthouse accessibility ≥ 95
- [ ] HTML validates; no duplicate IDs

## 2. Keyboard only — unplug the mouse
- [ ] Every interactive element reachable with Tab
- [ ] Focus indicator always visible and high contrast
- [ ] Tab order follows visual order
- [ ] No keyboard traps (especially modals and embeds)
- [ ] Escape closes modals and returns focus to the trigger
- [ ] Skip-to-content link as the first focusable element
- [ ] Enter and Space activate controls as expected
- [ ] Dropdowns, tabs and date pickers follow arrow-key conventions

## 3. Screen reader — VoiceOver/Safari and NVDA/Firefox
- [ ] Page title unique and descriptive
- [ ] One H1; headings in order and meaningful out of context
- [ ] Landmarks present: banner, nav, main, contentinfo
- [ ] Every image has appropriate alt (decorative = empty alt)
- [ ] Buttons and links announce a meaningful name — never "click here" or an unlabelled icon
- [ ] Form fields announce label, state, required and error
- [ ] Dynamic updates announced via live regions
- [ ] Tables have proper headers and scope

## 4. Visual
- [ ] Contrast passes in all states including hover, focus and disabled
- [ ] Usable at 200% zoom with no horizontal scroll
- [ ] Works with increased text spacing
- [ ] Nothing conveyed by colour alone
- [ ] Works in dark mode / forced colours if supported

## 5. Motion and timing
- [ ] prefers-reduced-motion respected
- [ ] Nothing flashes more than three times per second
- [ ] Auto-playing content can be paused
- [ ] Time limits can be extended or disabled

## 6. Forms
- [ ] Labels persistent and programmatically associated
- [ ] Errors identified in text, linked to the field, and summarised at the top for long forms
- [ ] Autocomplete attributes on personal-data fields
- [ ] No placeholder-only labelling anywhere

## Output
Findings log with WCAG criterion, severity and fix. Then write an accessibility statement stating conformance level and known limitations.
` },

'doc-performance': { title: 'Performance Optimisation', cat: 'QA', body: `
# Performance

## Measure first — throttled mobile, not your fibre connection
| Metric | Target | Before | After |
|---|---|---|---|
| LCP | < 2.5s | | |
| INP | < 200ms | | |
| CLS | < 0.1 | | |
| TTFB | < 600ms | | |
| JS transferred | < 200KB gz | | |
| Lighthouse perf | ≥ 90 | | |

## Frontend
- [ ] Images: AVIF/WebP, correct dimensions, responsive srcset, lazy below the fold
- [ ] Explicit width/height or aspect-ratio on all media — kills layout shift
- [ ] Fonts: woff2, subset, font-display: swap, preload the critical face, max two families
- [ ] Code-split by route; dynamic-import heavy components
- [ ] Remove unused dependencies; check bundle with an analyser
- [ ] Defer non-critical third-party scripts (analytics, chat widgets — these are usually the worst offenders)
- [ ] Preconnect to critical third-party origins
- [ ] Virtualise long lists

## Backend
- [ ] Find and kill N+1 queries
- [ ] Index every filtered, sorted and joined column
- [ ] Select only the columns you need
- [ ] Cache expensive reads with clear invalidation
- [ ] Move slow work to background jobs
- [ ] Set a response-time budget per endpoint and alert on breaches

## Delivery
- [ ] CDN in front of static assets
- [ ] Compression: brotli
- [ ] Cache-Control: immutable long cache on hashed assets, short on HTML
- [ ] HTTP/2 or 3

## Report to the client
Before/after table with the real numbers. This is evidence of value and it belongs in the case study.
` },

'doc-security': { title: 'Security Review Checklist', cat: 'QA', body: `
# Security Review

## OWASP Top 10 pass
- [ ] **Broken access control** — every endpoint authorises server-side; test by changing IDs in URLs and calling admin endpoints as a customer
- [ ] **Cryptographic failures** — HTTPS everywhere, HSTS, strong password hashing, no sensitive data in logs or URLs
- [ ] **Injection** — parameterised queries only; output escaped; no dynamic query building from user input
- [ ] **Insecure design** — rate limits, lockouts, and abuse cases considered
- [ ] **Security misconfiguration** — default credentials removed, debug off in production, directory listing off, error detail hidden
- [ ] **Vulnerable components** — npm audit / Snyk clean of high and critical; Dependabot enabled
- [ ] **Auth failures** — session rotation on login, invalidation on logout and password change, MFA where warranted
- [ ] **Data integrity** — verify webhook signatures; pin or verify third-party scripts
- [ ] **Logging failures** — auth events and admin actions logged; alerts on anomalies; no secrets in logs
- [ ] **SSRF** — validate and allow-list any user-supplied URL the server fetches

## Headers — check at securityheaders.com
~~~
Content-Security-Policy
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy
~~~

## Secrets
- [ ] Nothing sensitive in the repo — scan the full history, not just HEAD
- [ ] Anything ever committed by accident has been rotated
- [ ] No secrets in the client bundle (check the built JS)
- [ ] Platform secret store used, separated per environment

## Uploads
- [ ] Type and magic-number validation, not just the extension
- [ ] Size limits enforced
- [ ] Stored outside the web root, served via signed URLs
- [ ] Filenames sanitised; never used directly in paths

## Privacy / GDPR
- [ ] Privacy policy accurate and published
- [ ] Cookie consent where required, blocking non-essential cookies before consent
- [ ] Data retention periods defined and enforced
- [ ] Export and deletion routes exist
- [ ] Sub-processors listed; DPA in place with the client
- [ ] Only collecting data you actually need
` },

'doc-seo-launch': { title: 'SEO, Content & Analytics Readiness', cat: 'Launch', body: `
# Pre-launch Content, SEO & Analytics

## Content
- [ ] Every placeholder removed — search the codebase for "lorem", "TODO", "example.com", "test"
- [ ] Proofread by someone who didn't write it
- [ ] Prices, phone numbers, addresses, opening hours and legal names verified with the client
- [ ] Legal pages present: privacy, terms, cookies, accessibility statement
- [ ] Contact details and forms tested end to end

## SEO
- [ ] Unique title (≤ 60 chars) and meta description (≤ 155) per page
- [ ] One H1 per page, logical heading structure
- [ ] Descriptive alt text on meaningful images
- [ ] Canonical URLs set
- [ ] Open Graph + Twitter card with a 1200x630 image — test the preview in Slack
- [ ] Structured data added and validated (Organization, LocalBusiness, Product, FAQ, Article)
- [ ] sitemap.xml generated and referenced in robots.txt
- [ ] **Staging noindexed; production indexable** — check this twice, it's the classic launch bug
- [ ] 301 redirect map for every changed URL, tested
- [ ] Search Console and Bing Webmaster verified, sitemap submitted

## Analytics
- [ ] Analytics installed on production only
- [ ] Events configured for every success metric
- [ ] Conversion goals set up
- [ ] Events verified firing in real time before launch
- [ ] Consent mode configured where required
- [ ] Client has access to the dashboard in their own account

## Final polish
- [ ] Favicon set, apple-touch-icon, web manifest, theme colour
- [ ] Designed 404 and 500 pages with a route back
- [ ] Custom OG image per key page
- [ ] Print styles if anything is printed
` },

'doc-prod-setup': { title: 'Production Environment Setup', cat: 'Launch', body: `
# Production Environment

## Infrastructure
- [ ] Hosting on a paid plan sized for expected traffic — not a free tier they'll outgrow
- [ ] Database on a managed plan with the right storage and connection limits
- [ ] Object storage for uploads, with lifecycle rules
- [ ] CDN configured
- [ ] Region chosen for the users' location and any data residency requirement

## Domain, DNS, email
- [ ] Domain in **the client's** account, with you granted access
- [ ] DNS records set; TTL lowered 24–48h before launch
- [ ] SSL issued and auto-renewing
- [ ] www / non-www canonical redirect
- [ ] Transactional email domain verified with SPF, DKIM and DMARC
- [ ] Test emails land in the inbox, not spam (check Gmail and Outlook)

## Configuration
- [ ] Every environment variable set in the production secret store
- [ ] All third-party keys switched from test to live (Stripe especially)
- [ ] Debug and verbose logging off
- [ ] Error tracking tagged as production with source maps uploaded

## Backups — untested backups do not exist
- [ ] Automated daily database backups
- [ ] Retention period defined (e.g. 30 days) and point-in-time recovery if available
- [ ] Uploads backed up
- [ ] **Restore tested into a scratch database and verified**
- [ ] Restore procedure written into the runbook

## Monitoring and alerts
- [ ] Uptime monitoring on the homepage and a health endpoint, checking every minute
- [ ] Error rate alert
- [ ] Response time alert
- [ ] Database storage and connection alerts
- [ ] SSL expiry alert
- [ ] Alerts route to an inbox or phone you will actually see

## Ownership register
| Service | Account owner | Billing | Cost/mo | Access |
|---|---|---|---|---|
| Hosting | Client | Client card | | You: admin |
| Database | Client | Client card | | You: admin |
| Domain | Client | Client card | | You: admin |

**Accounts belong to the client.** You hold access. This protects both of you.
` },

'doc-runbook': { title: 'Deployment Runbook', cat: 'Launch', body: `
# Deployment Runbook

Rehearse this on staging before you use it on production.

## T-48 hours
- [ ] Lower DNS TTL to 300s
- [ ] Freeze non-critical merges
- [ ] Final client sign-off on content
- [ ] Confirm all live third-party keys are in place
- [ ] Notify the client of the launch window

## T-1 day
- [ ] Full QA pass on staging, green
- [ ] Full backup of any system being replaced
- [ ] Migration dry run against a copy of production data
- [ ] Rollback rehearsed and timed
- [ ] Smoke test list printed

## Launch — step by step
| # | Step | Command / action | Expected | Time | Done |
|---|---|---|---|---|---|
| 1 | Enable maintenance page (if needed) | | | | |
| 2 | Final backup | | Backup ID recorded | | |
| 3 | Run migrations | pnpm db:migrate:prod | 0 errors | | |
| 4 | Deploy application | tag + deploy | Build succeeds | | |
| 5 | Verify health endpoint | curl /health | 200 | | |
| 6 | Point DNS | update A/CNAME | resolves | | |
| 7 | Verify SSL | browser padlock | valid | | |
| 8 | Run smoke tests | see below | all pass | | |
| 9 | Disable maintenance page | | | | |
| 10 | Submit sitemap | Search Console | accepted | | |
| 11 | Announce to client | | | | |

## Smoke tests — production, after deploy
- [ ] Homepage loads, correct content
- [ ] Sign up with a real email → verification received
- [ ] Sign in and out
- [ ] Core journey end to end
- [ ] Payment with a real card (small amount, then refund)
- [ ] Transactional emails arrive
- [ ] Admin login and one admin action
- [ ] Analytics event fires
- [ ] 404 page works
- [ ] Old URLs redirect correctly
- [ ] Mobile check on a real phone

## Rollback
| Trigger | Action |
|---|---|
| Deploy fails health check | Redeploy previous version immediately |
| Critical bug within 1 hour | Roll back application, keep database if migration was additive |
| Data corruption | Restore backup [ID], announce downtime |
| DNS problem | Revert DNS; TTL is 300s so propagation is quick |

**Rollback command:** ___
**Who to call:** ___
` },

'doc-launch-checklist': { title: 'Launch Day Checklist', cat: 'Launch', body: `
# Launch Day

## Timing
Mid-morning, Tuesday to Thursday. Never Friday afternoon. You want a full working day of daylight to fix things.

## Before you press anything
- [ ] Runbook open, printed or on a second screen
- [ ] Client reachable and expecting the launch
- [ ] Rollback command in front of you
- [ ] Backup taken and its ID written down
- [ ] Coffee. Genuinely.

## Go
- [ ] Follow the runbook step by step, ticking each item
- [ ] Do not improvise. If something is unexpected, stop and think rather than trying things

## Immediately after
- [ ] All smoke tests pass
- [ ] Monitoring dashboards green
- [ ] Error tracking quiet
- [ ] Analytics recording real traffic
- [ ] Search Console has the sitemap
- [ ] Staging still noindexed

## Tell the client
> Hi [name] — [product] is live at [url].
>
> I've run through the full checklist: signup, [core journey], payments and emails are all working on desktop and mobile. I'll be watching errors and performance closely for the next 72 hours.
>
> **Worth knowing:** [anything they should expect, e.g. search rankings taking a couple of weeks to settle].
> **If you spot anything:** [how to report it], and I'll pick up anything critical the same day.
> **Next:** [training session / day-three report / phase two conversation] on [date].

## First 72 hours
- [ ] Check errors 3x a day
- [ ] Watch server load and response times under real traffic
- [ ] Verify key analytics events are firing with real users
- [ ] Triage anything user-reported within the day
- [ ] Hotfix criticals; batch everything else
- [ ] Send a day-three summary: uptime, errors fixed, early numbers
` },

'doc-handover-pack': { title: 'Handover Pack Contents', cat: 'Handover', body: `
# Handover Pack

## 1. Technical documentation (in the repo)
- Architecture overview and diagram
- Local setup, verified on a clean clone
- Environment variable reference
- Script reference
- Deployment and rollback procedure
- Database schema and migration history
- Third-party integrations and where their keys live
- Known limitations and technical debt, honestly listed
- Architecture decision records

## 2. Client user guide
Written for someone who has never seen an admin panel. The ten things they'll actually do, each with numbered steps and screenshots.
> How to: add a product · edit opening hours · view bookings · issue a refund · export a report · add a staff member · update a page · check what sold this month

## 3. Admin guide
Users and permissions · content updates · refunds and cancellations · reports · what not to touch and why

## 4. Maintenance guide
| Task | Frequency | Who | How |
|---|---|---|---|
| Dependency updates | Monthly | You (retainer) | |
| Backup verification | Quarterly | You | |
| SSL renewal | Automatic | — | Alert if it fails |
| Content review | Ongoing | Client | |

**Running costs** (state them plainly, so there are no surprises):
| Service | Cost/mo | Renews | Paid by |
|---|---|---|---|

**If the site is down:** check [status page] → check [monitoring] → contact Sarah Hill at hantaah21@gmail.com → expected response [time]

## 5. Credentials
Shared vault (1Password/Bitwarden) containing every account, with the client as owner and you as a member.

## 6. Video walkthrough
15–20 minutes covering the admin tasks. Clients rewatch videos far more than they reread PDFs.

## 7. Assets
Source design files, exported assets, research data, brand files — delivered in one dated folder.
` },

'doc-support-terms': { title: 'Support & Warranty Terms', cat: 'Handover', body: `
# Support Terms

## Warranty — 30 days from launch, included
Covered: defects where the delivered work doesn't meet the agreed acceptance criteria.
Not covered: new features, changes of mind, content updates, third-party service failures, problems caused by client changes.

## Response times
| Severity | Definition | Response | Fix target |
|---|---|---|---|
| 1 Critical | Site down, payments failing, data loss, security | 4 working hours | Same day |
| 2 Major | Key feature broken, no workaround | 1 working day | 3 working days |
| 3 Minor | Works with a workaround | 3 working days | Next release |
| 4 Cosmetic | Visual only | 5 working days | Batched |

Working hours: [days, times, timezone].

## How to report
Email [address] with: what you were doing, what you expected, what happened, a screenshot, and the page address. Critical issues: [phone/other channel].

## After the warranty period
Ad-hoc: £X/hour, minimum 1 hour, scheduled within 5 working days.
Retainer: see the retainer proposal — priority response, included hours, proactive maintenance.

## What is always billable
- New features and enhancements
- Content and design changes
- Third-party price or API changes requiring rework
- Training beyond the included session
- Issues caused by changes made by someone else
` },

'doc-closure': { title: 'Project Closure', cat: 'Handover', body: `
# Project Closure

## 1. Deliverable acceptance
| # | Deliverable | Delivered | Accepted | Date |
|---|---|---|---|---|

> **Acceptance:** All deliverables listed in the SOW dated ___ have been delivered and accepted. The project is complete as of ___. Ongoing support is governed by the support terms.
> Signed: ___________ Date: ______

## 2. Final invoice
- [ ] Final milestone invoiced with terms restated
- [ ] Any approved change requests included
- [ ] Note that IP transfers on receipt of payment
- [ ] Payment reminder scheduled

## 3. Asset transfer
- [ ] Repository transferred or client added as owner
- [ ] Design files shared or transferred
- [ ] All service accounts in the client's name
- [ ] Credentials vault shared
- [ ] Domain ownership confirmed

## 4. Archive
~~~
/clients/[client]/[project]/
  00-admin      contract, SOW, invoices, correspondence
  01-research   raw data (check retention rules), report
  02-design     source files, exports
  03-dev        repo mirror, docs
  04-launch     runbook, checklists
  05-handover   guides, recordings
~~~

## 5. Data hygiene
- [ ] Research recordings deleted per the consent terms
- [ ] Personal data you have no basis to keep, removed
- [ ] Access to client systems you no longer need, revoked

## 6. Profitability
| Category | Estimated hrs | Actual hrs | Variance | Why |
|---|---|---|---|---|
| Discovery | | | | |
| Research | | | | |
| Design | | | | |
| Build | | | | |
| QA & launch | | | | |
| PM & comms | | | | |
| **Total** | | | | |

Effective hourly rate: fee ÷ actual hours = ___
**Feed this back into your estimating multipliers.**
` },

'doc-results-request': { title: 'Asking a Client for Results', cat: 'Growth', body: `
# Getting a real result out of a project

Two short emails. The first goes on launch day, the second about a month later. Both are written to be easy to say yes to — nothing that sounds like you are using them for marketing.

---

## Email 1 — launch day

**Subject:** You're live 🎉 (and one small favour)

> Hi [name],
>
> [Project] is live: [link]
>
> Everything has been checked on phones, tablets and computers, and I will keep an eye on it over the next few days in case anything odd crops up. If you spot something, just reply here and I will sort it.
>
> One small favour, whenever you have a spare minute — could you send me a sentence or two on what you are hoping the site will do for you? Something like "we want people to be able to find what they need without having to ring anyone." I ask because in about a month I would love to check whether it actually did that, and it helps to have written down what "worked" was supposed to mean.
>
> No rush at all. Congratulations — it has been a genuine pleasure.
>
> Sarah Hill · Make It Pop

**Why it is worded this way:** you are asking for their goal, not a testimonial. People answer that easily, and it sets up the second email without you having to ask twice.

---

## Email 2 — about 30 days after launch

**Subject:** One month in — how's it going?

> Hi [name],
>
> It has been about a month since the site went live, so I wanted to check in.
>
> When we started, you said you were hoping to [quote their sentence back to them]. Has that happened? I would love to know either way — if something is not working as well as we hoped, I would rather know now while it is easy to fix.
>
> If you happen to have a number to hand, it would be brilliant to see one. Even a rough figure is fine:
>
> - how many bookings, orders or requests came through the site
> - how many people signed up
> - how many enquiries came in, compared with before
> - or just "we are getting noticeably more/fewer phone calls"
>
> And if you are happy with how it has gone, would you mind if I mentioned the project on my website — a line about what it does and how it is going? I would send you the exact wording first, and I would only use a number you are comfortable with.
>
> Either way, thank you for trusting me with it.
>
> Sarah Hill · Make It Pop

---

## Getting the ask right

**Only ask for one number.** A list of five questions gets ignored; one gets answered. Pick whichever is easiest for them to actually know.

**Ask permission separately from asking for the number.** Bundling them makes it feel transactional. Split across two emails, it feels like care.

**Send the wording before you publish it.** Charities and larger organisations often need approval before their name appears anywhere. Sending your exact sentence first turns an awkward conversation into a quick yes.

**If they do not track anything** — most small organisations do not — ask instead: "What is different now compared with before?" A sentence like *"we are not answering the same three questions on the phone every day"* is a real result, and it makes better copy than a percentage.

---

## What to do with the answer

One sentence and one number is enough to rewrite your own site around evidence:

> **[Client] came to me needing [their goal, their words].** A month after launch, [number] — and [the thing that changed].

That single specific paragraph will outperform every adjective on the page.

---

## Do these at the same time

**Screenshots on launch day.** Home page, the main journey, and mobile. Much easier now than after the next round of content edits.

**Before-and-after load time.** If they had an old site, run both through PageSpeed Insights and keep the two figures. "Loads in 1.2 seconds instead of 8" is a result you own outright and can publish without anyone's permission.

**Ask who else they know.** The day after a successful launch is the best moment to ask for a referral, and the one most people forget.
` },

'doc-outcome-report': { title: 'Outcome Report & Case Study', cat: 'Growth', body: `
# Outcome Report (30–60 days post-launch)

## Results against baseline
| Metric | Baseline | Target | Actual | Change |
|---|---|---|---|---|
| Primary | | | | |
| Supporting | | | | |
| Guardrail | | | | |

## What drove the change
[Two or three specific things, tied to design or engineering decisions, tied back to the research that prompted them.]

## What didn't move, and why
[Be honest. It builds more trust than a clean sheet, and it sets up the next piece of work.]

## What real usage taught us
[Behaviour that surprised you. Features unused. Unexpected patterns.]

## Recommended next steps
| # | Recommendation | Expected effect | Effort |
|---|---|---|---|

---

# Case Study

**Structure:** Client & context → the problem (with numbers) → what we did (with evidence of process) → the outcome (with numbers) → the quote.

- Lead with the outcome number in the title: "34% more bookings for a two-location salon"
- Show the process artefacts — journey map, wireframes, before/after — not just the pretty final screens
- One paragraph on a decision you made and why. That's what buyers are actually assessing.
- Get written permission before publishing, and confirm what numbers you may disclose

## Asking for the testimonial — do it in the results meeting
> That's a good result. Would you be willing to write two or three sentences I can use on my site? It helps enormously. If it's easier, I can draft something based on what you've said today and you can edit it.

## Asking for the referral
> Is there anyone else you know with a similar problem? I have capacity from [month].
` },

'doc-content': { title: 'Content & Assets Request', cat: 'Delivery', body: `
# Content & Assets Request

Late content is the most common cause of a project slipping. Send this in week one, with a dated deadline, not "whenever suits".

## Written content
- [ ] Page list agreed and final
- [ ] Copy for every page — written, proofread, signed off
- [ ] Product or service descriptions
- [ ] Team names, roles, bios, photos
- [ ] Testimonials, with permission to publish
- [ ] FAQs
- [ ] Legal pages: privacy, terms, cookies, returns
- [ ] Contact details, opening hours, addresses — verified

## Imagery
- [ ] Logo as vector (.svg / .ai / .eps), plus mono and reversed versions
- [ ] Photography, high resolution, cleared for use
- [ ] Any illustration or iconography
- [ ] Video and audio files, with captions

## Brand
- [ ] Brand guidelines
- [ ] Fonts, **with a licence that covers web use**
- [ ] Colour codes (hex or Pantone)
- [ ] Printed materials the site should sit alongside

## Accounts and access
Never ask for passwords by email. Request access, or use a shared password manager vault.

- [ ] Domain registrar — who controls it
- [ ] Current hosting
- [ ] Analytics
- [ ] Payment provider
- [ ] Email or newsletter platform
- [ ] Social accounts to link
- [ ] Any third-party service with an API key

## How to chase it
1. Send the request with a **specific date**, not "as soon as you can".
2. State plainly what happens if it is late: the timeline shifts day for day, per the SOW.
3. Chase at the halfway point, not the day it is due.
4. If content is the blocker for more than two weeks, pause the project formally and in writing — do not quietly absorb the delay.

## The offer worth making
Most clients underestimate this work badly. Offering copywriting as a paid add-on is often the difference between a project that ships on time and one that stalls for a month.
` },

'doc-retainer': { title: 'Retainer & Phase Two Proposal', cat: 'Growth', body: `
# Retainer Proposal

## Why a retainer (frame it as risk, not hours)
Software isn't finished at launch. Dependencies get security patches, browsers change, third-party APIs deprecate, and content goes stale. A retainer means someone is watching, rather than you finding out from a customer.

## Tiers
| | Essential | Growth | Partner |
|---|---|---|---|
| Monitoring & uptime | ✓ | ✓ | ✓ |
| Backup verification | ✓ | ✓ | ✓ |
| Security & dependency updates | Monthly | Monthly | Fortnightly |
| Support response | 2 working days | 1 working day | 4 hours |
| Included hours | 2/mo | 6/mo | 12/mo |
| Monthly analytics report | — | ✓ | ✓ |
| Quarterly strategy session | — | — | ✓ |
| Rate for extra hours | £X | £X−10% | £X−20% |
| **Monthly** | £ | £ | £ |

Unused hours roll over one month. 3-month minimum, then monthly with 30 days' notice.

# Phase Two Proposal

## What we deliberately parked
[The Won't-have list from prioritisation — now re-ranked using real usage data, which is a much stronger argument than it was six months ago.]

| # | Feature | Original priority | Evidence now | Est. effort | Expected impact |
|---|---|---|---|---|---|

## Recommended next block
[Three to five items, sequenced, with a fixed price and a timeline.]

## Timing
> I have capacity from [month]. If we start then, this is live by [date]. Shall I put together a scope for it?

**Whatever they answer, book a check-in three months out before you leave the call.**
` }

});
