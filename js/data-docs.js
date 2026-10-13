/* =====================================================================
   PROJECT OS — Template & document library (part 1)
   Each doc: { id, title, cat, body } — body is markdown (~~~ used for code fences)
   ===================================================================== */
window.DOCS = {

'doc-intake': { title: 'Light the fire form (intake)', cat: 'Sales', body: `
# Light the fire: the intake form

Link to send: **sarahjhill.com/start** (goes to forms/intake.html). Ten minutes for them, 12 questions, 7 required.

## You and your business
1. Your name *
2. Email address *
3. What does your business do, and who for? *
4. Your current website, if you have one
5. Who sent you my way, or how did you find me? (thank referrers)

## What you want
6. What do you want your website to do for you? * (coached to be specific)
7. Who is your ideal customer, and what do they need from your site?
8. How should people feel when they land on your site? (plus sites they love)

## Practicalities
9. Budget * — Under £300 / £300–£600 / £600–£1,200 / £1,200–£2,500 / £2,500–£4,500 / £4,500+ / Don't know yet
10. Is there a date it must be live by? If so, why?
11. Who has the final say on decisions? *

## The big one
12. Picture us celebrating a year after launch. What has your website done for you? *

---

### Reading the answers (internal — do not send)
- Answers arrive by email from Formspree. Click **File these answers** to attach them to the project.
- Do not reply the same day. Sleep on it, then score them on the **Client Scorecard**.
- Can't answer 6 or 12? They're not ready for a build. Offer a paid session to fill it in together.
- "Under £300": almost always a polite no and a referral.
` },

'doc-discovery-script': { title: 'Discovery Call Script', cat: 'Sales', body: `
# Discovery Call Script (45 minutes)

**Before:** read their questionnaire, look at their site and two competitors. Get consent to record.

## 0–5 min — Frame
"Thanks for the answers. I want to spend most of today understanding the problem rather than talking about solutions — is that OK? I'll follow up with a proposal by [date]."

## 5–25 min — The problem
- You said [quote their answer]. Tell me more about that.
- Walk me through what happens today, step by step, when someone tries to [core task].
- Where does it break down most often?
- Who inside the business feels that pain? What do they do about it?
- **What does it cost you each month that this problem exists?**
- What have you already tried?

## 25–35 min — Users and context
- Who are the people who'll use this? Describe a typical one.
- What are they doing right before and right after they use it?
- What do they use instead today?
- Can I speak to two or three of them during research?

## 35–42 min — Constraints and systems
- What systems does this need to talk to?
- Where does your data live today, and what state is it in?
- Anything that absolutely cannot change?
- Who maintains it after launch?
- **If we ship this and in six months it hasn't worked, what will have gone wrong?**

## 42–45 min — Close
- Recap the problem back to them in your own words; ask "have I got that right?"
- Confirm budget band and deadline out loud.
- Confirm the decision-maker.
- State the next step and the date. Then stop talking.

## Red flags to note
- Cannot describe the user • No budget after two asks • Deadline with no reason
- Talks only in features, never outcomes • Speaks badly about their last three suppliers
` },

'doc-qualify': { title: 'Client Scorecard', cat: 'Sales', body: `
# Client Scorecard

Read the form. **Sleep on it.** Read it again, then score. Never score on the day it arrives.

| Score | Question | 5 means | 1 means |
|---|---|---|---|
| **Budget** | Is their budget realistic for what they want? Cost it honestly (copywriter, plugins, licences, your hours). | Yes, and I make a profit | No chance at that budget |
| **Project** | Does it excite me, fit my values, make a great portfolio piece, open the right doors? | I'd almost do it for free | Only if the money's good |
| **Respect** | Have they respected my process so far? Pushback on the form is a warning. | Did everything I asked | Tried to boss the process |

**Total: ___ / 15**

| Total | Decision | Send |
|---|---|---|
| 12–15 | Yes. Five-star client. | Email 5 (or ring) |
| 7–11 | Maybe. Budget short → Email 6. Respect a 3 → set expectations firmly from day one. A 4 + 4 + 3 can still be a yes. | Email 6 or 5 |
| 3–6 | No. Refer them on. | Email 7 |

## My respect red flags
- Haggling before they've seen a plan
- Ignoring the form, or "can we just jump on a call?"
- Wanting it "by Friday"
- (add your own)

## Paid discovery offer
When the problem is good but they couldn't answer the form: a fixed-price session where we fill it in together. If they go ahead with the build, credit half the fee.
` },

'doc-intake-emails': { title: 'Intake emails (1–7)', cat: 'Sales', body: `
# Intake emails

Save each as a Gmail template. Swap the [brackets]. Say it the way you'd say it face to face.

## Email 1 — out of the blue: connect first
**Subject:** Lovely to hear from you
> Hi [first name],
> Thanks for getting in touch. Before we dive in, let's connect properly. Most of my work comes through people I'm already connected to, so that's where my attention goes first.
> Can you connect with me on LinkedIn? [link] And if someone pointed you my way, tell me who. I like to say thank you.
> Then I'll send you the next step.
> Sarah

## Email 2 — send the form (within 4 hours)
**Subject:** Your website project: next step
> Hi [first name],
> Thanks for getting in touch. So I can give you a proper answer, and so we can both see if we're right for each other, I need to know a bit more.
> It takes about ten minutes: sarahjhill.com/start
> Even if we don't end up working together, these questions will make you much clearer on what you want your website to do.
> I read every answer properly and reply within two working days.
> Sarah

## Email 3 — reminder, day 5
**Subject:** Checking in
> Hi [first name],
> I know how fast a week goes when you're running everything yourself. Just a nudge about your website project.
> These few questions get us on the same page: sarahjhill.com/start
> Even if we never work together, they'll help you get clear on what your website needs to do for you.
> Sarah

## Email 4 — last reminder, day 12
**Subject:** Project start dates
> Hi [first name],
> Sorry for the extra email. You'd be amazed how many people tell me the first one went to spam.
> This is the last one for now. I start new projects at the beginning of each month and I'd love to save you a space: sarahjhill.com/start
> If you want me holding your hand all the way, I'm there. If you'd rather shout instructions from the sidelines, that works too.
> And tell me straight if I'm being a pain.
> Sarah

## Email 5 — yes (better as a call)
**Subject:** Let's do this
> Hi [first name],
> Thanks for filling in the form. I've read it properly, and I'm really excited about this one. It's exactly the kind of project I love.
> Let's book a call to plan the next steps. I'm free [Tuesday at 10], [Tuesday at 2] or [Thursday at 11]. Which suits you?
> Sarah

## Email 6 — the budget (ring first, email to follow)
**Subject:** Your project and budget
> Hi [first name],
> I've been through your answers properly. A project like this would be in the region of £[X]–£[Y]. It needs design, build and testing done properly, and my experience tells me it can't be done to a standard you'd be proud of for £[their budget].
> I'd still love to help. Can we talk about what matters most, or a smaller first stage?
> Sarah

## Email 7 — no, with a referral
**Subject:** Your website project
> Hi [first name],
> Thank you for telling me about your project. I'm not able to take it on right now. I couldn't give it the attention it deserves.
> [Name] at [link] would be a great fit, and I'm happy to introduce you.
> All the best with it,
> Sarah
` },

'doc-competitive': { title: 'Competitive Audit Template', cat: 'Research', body: `
# Competitive Audit

## Per competitor
| Field | Notes |
|---|---|
| Name & URL | |
| Positioning (their words) | |
| Target user | |
| Pricing model | |
| Core journey — step count | |
| Onboarding: time to value | |
| Standout strength | |
| Obvious weakness | |
| Conventions they use | |
| Screenshots | Home / core task / pricing / signup |

## Review mining
Pull 20–30 reviews from G2, Trustpilot, Capterra or app stores.

| Theme | Count | Example quote | Opportunity |
|---|---|---|---|
| | | | |

## Output — write these three statements
1. **The convention:** "Users in this category expect ___."
2. **The gap:** "Everyone does ___ and ___; nobody does ___ well."
3. **Our angle:** "We will win by ___, which matters because ___."
` },

'doc-pitch': { title: 'Pitch / Concept Deck Outline', cat: 'Sales', body: `
# Pitch Deck — 11 slides

1. **Title** — Project name, client name, your name, date.
2. **What we heard** — 3–4 verbatim quotes from the discovery call. No commentary.
3. **The problem, quantified** — the cost of the status quo in their numbers.
4. **What's happening in your market** — 2–3 competitor observations, one screenshot.
5. **The opportunity** — the gap statement.
6. **Our point of view** — one bold, defensible sentence about how this should be solved.
7. **The approach** — the phases, visually, with what they get from each.
8. **A glimpse** — one rough concept or redrawn flow. Thinking, not pixels.
9. **How we'll measure success** — the metric, the baseline, the target.
10. **Why me** — two relevant case studies with outcomes, not screenshots.
11. **Next step** — one specific action with a date.

## Delivery rules
- Present live. Never email the deck cold.
- Slide 2 in their words is the slide that wins the room.
- No full designs for free. Ever.
- End with silence after the next step. Let them respond.
` },

'doc-estimate': { title: 'Estimating Worksheet', cat: 'Sales', body: `
# Estimating Worksheet

## Step 1 — Story-level estimate
| Epic | Story | Ideal hrs | x1.4 real | Notes |
|---|---|---|---|---|
| | | | | |
| | | **Subtotal** | | |

## Step 2 — Add the invisible work
| Item | Basis | Hours |
|---|---|---|
| Project management & comms | 15% of build | |
| Discovery & research | from plan | |
| Design revisions (2 rounds) | fixed | |
| QA & cross-browser | 10–12% | |
| Accessibility audit & fixes | fixed | |
| Deployment & environment setup | fixed | |
| Documentation & training | fixed | |
| Contingency | 15–20% | |

## Step 3 — Three tiers
| Tier | Scope | Hours | Price |
|---|---|---|---|
| Lean | Musts only, minimal design system | | |
| Recommended | Musts + key Shoulds, full system, testing | | |
| Premium | + Coulds, extended research, retainer month 1 | | |

## Sanity checks
- Screen count from the flows x your average hours per screen — does it match?
- Does the recommended tier clear your minimum day rate?
- Have you priced backend and frontend separately?
- Is there a line item for every client dependency that might slip?
` },

'doc-proposal': { title: 'Proposal Template', cat: 'Sales', body: `
# Proposal — [Project Name]

Prepared for [Client] by Sarah J Hill · [Date] · Valid until [Date + 14 days]

## 1. What we understand
[Two paragraphs restating their problem in their own words, with a quote from the discovery call. If they don't nod at this section, nothing else matters.]

## 2. The outcome
By [date], [Client] will have [specific capability], which we expect to [measurable business effect against the current baseline of X].

## 3. Approach
| Phase | What happens | You receive | Duration |
|---|---|---|---|
| 1. Research | Interviews, audit, analysis | Research report, personas, journey map | 1–2 wks |
| 2. Strategy | Stories, IA, prioritisation | Backlog, sitemap, flows, MVP scope | 1 wk |
| 3. Design | Wireframes, UI, design system | Prototype, hi-fi screens, component library | 2–3 wks |
| 4. Build | Sprints with fortnightly demos | Working software on staging | 4–8 wks |
| 5. Launch | QA, deploy, handover | Live product, docs, training | 1 wk |

## 4. Deliverables
[Explicit bullet list. If it isn't listed, it isn't included.]

## 5. What is not included
- Copywriting and content creation
- Photography, illustration, video
- Ongoing hosting, domain and third-party licence fees
- SEO campaigns, advertising, email marketing
- Native mobile apps
- Support beyond 30 days post-launch (see retainer)

## 6. What we need from you
| We need | By when | If it's late |
|---|---|---|
| Final copy | Day 10 | Timeline shifts day-for-day |
| Brand assets | Day 3 | |
| Feedback on each deliverable | Within 3 business days | |
| Approver available for reviews | Scheduled dates | |

## 7. Revisions
Two rounds of consolidated feedback per design phase are included. Additional rounds, or changes after written sign-off, are billed at £X/hour under the change request process in the SOW.

## 8. Investment
| Option | Includes | Price |
|---|---|---|
| Lean | | £ |
| **Recommended** | | **£** |
| Premium | | £ |

**Payment schedule:** 40% on signature · 30% at design sign-off · 30% on launch. Invoices due within 14 days. IP transfers on final payment.

## 9. Timeline
[Gantt or milestone list with dates, showing client dependency dates.]

## 10. Why me
[Two case studies with outcomes and numbers. Two sentences each.]

## 11. Next step
Reply to accept the [tier] option and I'll send the contract and deposit invoice today. Kick-off can be [date].
` },

'doc-sow': { title: 'Statement of Work', cat: 'Legal', body: `
# Statement of Work

**Project:** · **Client:** · **Supplier:** · **Effective date:** · **Version:**

## 1. Objectives
[The business outcome, the success metric and its baseline.]

## 2. Scope — in
[Numbered, specific. Reference the epic list.]

## 3. Scope — out
[Numbered. Include the "Won't have this time" list from prioritisation.]

## 4. Deliverables and acceptance
| # | Deliverable | Format | Acceptance criteria | Due |
|---|---|---|---|---|
| 1 | Research report | PDF | Covers all agreed research questions | |
| 2 | Wireframes | Figma link | All MVP screens + states | |
| 3 | UI designs | Figma link | All MVP screens, mobile + desktop, AA contrast | |
| 4 | Working product | Staging URL | All Must-have stories pass acceptance criteria | |
| 5 | Documentation | Repo + PDF | Setup, admin, maintenance guides | |

Acceptance: client has 5 business days from delivery to accept or list specific criteria not met. Silence past 5 days is deemed acceptance.

## 5. Client responsibilities
[Dated obligations: content, feedback windows, access, approver availability, test participants.]

## 6. Change request process
1. Either party raises the change in writing.
2. Supplier estimates cost and schedule impact within 2 business days.
3. Client approves in writing before work begins.
4. Timeline extends by the stated number of days.
No verbal change is binding.

## 7. Schedule
[Milestones with dates and dependencies.]

## 8. Fees and payment
[Total, schedule, hourly rate for extras, expenses policy, late payment interest.]

## 9. Assumptions
[E.g. supported browsers, expected traffic, third-party API availability, content in English only.]

## 10. Signatures
` },

'doc-contract-checklist': { title: 'Contract Clause Checklist', cat: 'Legal', body: `
# Contract Clause Checklist

Not legal advice — have a solicitor review your standard agreement once, then reuse it.

- [ ] **Parties, dates, and the SOW incorporated by reference**
- [ ] **Fees and payment terms** — schedule, due dates, currency
- [ ] **Late payment** — statutory interest plus right to pause work after X days
- [ ] **Kill fee / termination** — notice period, payment for work completed, what the client keeps
- [ ] **Intellectual property** — transfers on final payment; you retain rights to underlying tools, libraries and know-how
- [ ] **Portfolio rights** — you may show the work publicly after launch (or after an agreed embargo)
- [ ] **Third-party licences** — client responsible for fonts, stock, plugins, SaaS fees
- [ ] **Client responsibilities and delay** — timeline slips day-for-day; re-mobilisation fee after 30 days idle
- [ ] **Revisions** — number included, rate thereafter
- [ ] **Warranty period** — e.g. 30 days of bug fixes free; new features are new work
- [ ] **Limitation of liability** — capped at fees paid; no liability for indirect or consequential loss
- [ ] **Confidentiality** — mutual
- [ ] **Data protection** — controller/processor roles, sub-processors listed, breach notification
- [ ] **Non-solicitation** (optional)
- [ ] **Governing law and jurisdiction**
- [ ] **Dispute resolution** — mediation before litigation
` },

'doc-kickoff': { title: 'Kick-off Agenda & Recap', cat: 'Delivery', body: `
# Kick-off Meeting (60 min)

## Agenda
1. **Introductions and roles** (5) — who does what, on both sides.
2. **Why we're doing this** (10) — restate the problem, the outcome, the success metric.
3. **How the project runs** (15) — phases, what happens in each, what you'll see and when.
4. **Decisions** (5) — **name the single approver out loud and get verbal agreement.**
5. **Feedback rules** (5) — consolidated, in one place, within 3 business days, from the approver.
6. **Tools and access** (10) — project channel, shared drive, tracker, what accounts you need.
7. **Dates** (5) — book every recurring meeting and every review session now.
8. **Risks and worries** (5) — "what would make this go badly?"

## Recap email — send within 24 hours
> Hi [name], great to get started. To confirm what we agreed:
>
> **Goal:** [one sentence] measured by [metric], currently [baseline].
> **Approver:** [name] has final sign-off; feedback comes via [channel] within 3 business days.
> **Next milestone:** [deliverable] on [date].
> **You're providing:** [items] by [dates].
> **Meetings booked:** weekly check-in [day/time]; phase reviews [dates].
> **Links:** [tracker] · [drive] · [channel]
>
> If anything above looks wrong, tell me today. Otherwise I'll take it as agreed.
` },

'doc-research-plan': { title: 'Research Plan', cat: 'Research', body: `
# Research Plan — [Project]

## 1. Decisions this research will inform
- We need to decide ___ ; research will tell us ___.

## 2. Research questions
| # | Question | Method | Participants | Output |
|---|---|---|---|---|
| 1 | How do users currently decide between X and Y? | Interviews | 6 customers | Decision map |
| 2 | Where do users drop out of the current funnel? | Analytics | 3 months data | Funnel analysis |
| 3 | Which tasks fail on the existing product? | Usability test | 5 users | Issue log |

## 3. Methods and why
[One line each justifying the method against the question.]

## 4. Participants
- Segments and numbers: ___
- Screening criteria: ___
- Recruitment route: ___
- Incentive: ___

## 5. Timeline
| Week | Activity |
|---|---|

## 6. Out of scope
[Explicitly what this research will not answer.]

## 7. Ethics and data
Consent recorded before each session. Recordings stored in [location], deleted after [period]. Findings anonymised. Lawful basis: [consent / legitimate interest].

## 8. Deliverables
Research report, insight statements, personas, journey map, prioritised opportunities.

**Client approval:** ______________ Date: ________
` },

'doc-screener': { title: 'Participant Screener', cat: 'Research', body: `
# Participant Screener

1. Which of these best describes you? [role options — screen out non-users]
2. In the last 3 months, how often have you [done the core task]?
   - Never → **screen out** · Once · 2–5 times · More than 5 times
3. Which of these have you used? [competitor list — mix of users and non-users]
4. How comfortable are you with new software? 1–5 [aim for a spread, not all 5s]
5. What device would you normally use for this? [ensure mobile representation]
6. Do you work in design, software development or market research? Yes → **screen out**
7. Are you available for a 60-minute video call on [dates]?
8. Name, email, phone.

**Target mix:** 6–8 participants, at least 2 mobile-primary, at least 2 low-confidence, spread of tenure.
**Incentive:** [amount] voucher, sent within 48 hours of the session.
` },

'doc-stakeholder-script': { title: 'Stakeholder Interview Guide', cat: 'Research', body: `
# Stakeholder Interview (30–40 min)

## Everyone
- What's your role, and how does this project touch your work?
- What does success look like for you personally?
- What's the biggest risk you see?
- What has been tried before and why didn't it stick?
- What must not change, and why?

## Sales
- What do prospects ask for that we don't have?
- Where do deals stall?
- What do you have to explain repeatedly?

## Support
- What are the top five reasons people contact you?
- What do you tell people to do as a workaround?
- What would remove the most tickets?

## Operations
- Walk me through the process end to end. Where do you use a spreadsheet?
- What's manual that shouldn't be?

## Engineering
- What's the state of the current system and data?
- What's fragile? What would you not touch?
- What integrations are non-negotiable?

## Leadership
- How does this fit the 12-month plan?
- What's the budget reality?
- If it delivers only one thing, what should it be?

**Afterwards:** log every constraint, and log every place two stakeholders defined success differently. Take the conflicts to the approver — do not average them in the design.
` },

'doc-interview-script': { title: 'User Interview Guide', cat: 'Research', body: `
# User Interview Guide (45–60 min)

## Warm-up (5)
- Thanks for the time. I'm trying to understand how people actually [do task] — there are no right answers and I didn't build the thing we might look at, so be blunt.
- Tell me a bit about your role / situation.

## Context (10)
- Where does [task] fit into your week?
- Who else is involved?
- What tools do you use, including the unofficial ones?

## The critical incident (20) — the core of the interview
- **Tell me about the last time you [did the task]. Start from the beginning.**
- What triggered it? What did you do first? Then what?
- Where did you get stuck?
- What did you do when that happened?
- How long did the whole thing take?
- How did it end? Were you happy with it?

## Pain and workaround (10)
- What's the most frustrating part?
- Have you found any tricks or shortcuts?
- If you had a magic wand, what would you change? [ask why three times]

## Wrap (5)
- What did I not ask about that I should have?
- Can I come back to you when we have something to test?

## Rules
- Ask about the past, never the hypothetical future.
- Never pitch the solution. The moment you say "would you like…", the data is gone.
- Silence is a tool. Count to five.
- Follow the surprise, not the script.
- Write your top three observations within an hour.
` },

'doc-consent': { title: 'Consent Form', cat: 'Research', body: `
# Research Consent

**Project:** ___ · **Researcher:** ___ · **Date:** ___

I understand that:
- I am taking part in a research session lasting approximately ___ minutes.
- The session will be recorded (audio, video and screen) for research purposes only.
- Recordings are stored securely, seen only by the project team, and deleted after ___ months.
- My name will not appear in any report; quotes will be anonymised.
- I can skip any question, pause, or stop at any time with no consequence.
- I am not being tested — the product is.
- No confidential information about my employer needs to be shared.

Contact for questions or to withdraw my data: ___

Name: ______________ Signature: ______________ Date: ________

**Verbal consent alternative (recording on):** "Before we start — are you happy for me to record this session for research purposes, on the understanding that it's stored securely, anonymised in any report, and you can stop at any time?"
` },

'doc-analytics-audit': { title: 'Analytics & Data Audit', cat: 'Research', body: `
# Analytics & Data Audit

## Traffic and behaviour
| Metric | Value | Period | Note |
|---|---|---|---|
| Sessions / users | | | |
| Device split | | | |
| Top 10 pages by traffic | | | |
| Top 5 by exit rate | | | |
| Avg. session duration | | | |

## Funnel
| Step | Users | Drop-off % | Hypothesis |
|---|---|---|---|
| Landing | | | |
| Product view | | | |
| Add to basket | | | |
| Checkout start | | | |
| Purchase | | | |

## Support themes (3 months)
| Theme | Ticket count | % | Fixable by design? |
|---|---|---|---|

## Performance baseline
| Metric | Mobile | Desktop |
|---|---|---|
| LCP | | |
| INP | | |
| CLS | | |
| Lighthouse perf | | |

## Legacy data health
- Records: ___ · Duplicates: ___ · Missing required fields: ___
- Encoding / date-format issues: ___
- Migration risk rating: Low / Medium / High
` },

'doc-heuristic': { title: 'Heuristic Evaluation Sheet', cat: 'Research', body: `
# Heuristic Evaluation

Score each journey against Nielsen's 10 heuristics.

1. Visibility of system status
2. Match between system and the real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognise, diagnose and recover from errors
10. Help and documentation

## Issue log
| # | Screen | Heuristic | Issue | Severity | Recommendation | Screenshot |
|---|---|---|---|---|---|---|
| 1 | | | | 1–4 | | |

**Severity:** 1 = blocks the task · 2 = major delay or error · 3 = minor friction · 4 = cosmetic

## Accessibility quick pass
- [ ] Keyboard-only navigation completes the core journey
- [ ] Focus is always visible
- [ ] Contrast meets 4.5:1 body / 3:1 large and UI
- [ ] All form fields have persistent labels
- [ ] Headings are in logical order, one H1 per page
- [ ] Images have meaningful alt text
- [ ] Nothing relies on colour alone
` },

'doc-research-report': { title: 'Research Report Structure', cat: 'Research', body: `
# Research Report

## 1. Executive summary — one page, written last
Three findings, three recommendations, one decision needed from the client.

## 2. What we did
Methods, participants, dates, limitations. Be honest about limitations.

## 3. Who the users are
Personas summary, one paragraph each.

## 4. Findings
For each theme:
> ### Finding 1: [Insight stated as a sentence, not a topic]
> **Evidence:** 6 of 8 participants… / 34% of sessions exit at…
> **Quote:** "[verbatim]"
> **Why it happens:** [your interpretation, labelled as interpretation]
> **Implication:** [what we should do about it]
> **Confidence:** High / Medium / Low

## 5. The journey today
Current-state map with the moments of truth marked.

## 6. Opportunities, prioritised
| # | Opportunity | Evidence | Impact | Effort | Priority |
|---|---|---|---|---|---|

## 7. Recommendations
What to do, in order, with what we expect it to change.

## 8. What we still don't know
The open questions and how we'd answer them later.

## Appendix
Transcripts, screener, analytics exports, audit log.

**Rule:** never present the report cold. Walk the client through the findings live first — their reactions shape the recommendations.
` },

'doc-persona': { title: 'Persona Template', cat: 'Strategy', body: `
# Persona — [Name, e.g. "Rushed Rachel"]

**Based on:** participants P2, P4, P7 (state this — it keeps personas honest)

| | |
|---|---|
| **Role / situation** | |
| **Context of use** | Where, when, on what device, with how much attention |
| **Primary goal** | |
| **Secondary goals** | |
| **Current workflow** | Step by step, including workarounds |
| **Frustrations** | Ranked, with evidence |
| **Technical confidence** | 1–5 and what that means in practice |
| **Decision drivers** | What makes them choose or abandon |
| **Success looks like** | In their words |

> **Key quote:** "[verbatim from an interview]"

## Jobs to be done
- When I ___, I want to ___, so I can ___.
- When I ___, I want to ___, so I can ___.

## What this means for design
- Because they [behaviour], the interface must ___.
- Because they [constraint], we must not ___.

---

# Anti-persona — who this is NOT for
**[Name]** — [description]. We are explicitly not designing for [their needs]. When a request would serve this person, it goes on the Won't list.
` },

'doc-journey': { title: 'Journey Map Template', cat: 'Strategy', body: `
# Journey Map — [Persona] doing [Journey]

| | Trigger | Research | Decide | Act | Confirm | Follow-up |
|---|---|---|---|---|---|---|
| **Doing** | | | | | | |
| **Touchpoints** | | | | | | |
| **Thinking** | | | | | | |
| **Feeling** (+2 to −2) | | | | | | |
| **Pain points** | | | | | | |
| **Opportunities** | | | | | | |
| **Backstage / system** | | | | | | |
| **Evidence** (P#, metric) | | | | | | |

## Moments of truth
The 2–3 points where this journey is won or lost:
1. ___
2. ___

## Future-state changes
| Stage | Today | After | Why it's better | Story ID |
|---|---|---|---|---|

**Rules:** one persona, one journey per map. Every pain point needs evidence. Every opportunity becomes a backlog item or it isn't real.
` },

'doc-principles': { title: 'Product Principles & Metrics', cat: 'Strategy', body: `
# Product Principles

Write 3–5. Each must be specific enough that a reasonable person could violate it.

1. **[Principle]** — [what it means in practice]. *So we will ___, even when ___.*
2. …

**Test:** could someone design the opposite? "Be user-friendly" fails. "Never make the user wait for data they didn't ask for" passes.

# Success Metrics

| # | Metric | Baseline | Target | Measured by | Review date |
|---|---|---|---|---|---|
| **Primary** | | | | | |
| Supporting 1 | | | | | |
| Supporting 2 | | | | | |
| Guardrail (must not get worse) | | | | | |

**Tie-breaker:** when [metric A] and [metric B] conflict, [A] wins because ___.

## Tracking plan
| Event name | Trigger | Properties | Feeds which metric |
|---|---|---|---|
` },

'doc-user-story': { title: 'User Story & Acceptance Criteria', cat: 'Strategy', body: `
# User Story Template

~~~
Title:    [Short, action-oriented]
Epic:     [Parent epic]
Persona:  [Which persona — never "user"]

As a     [specific persona]
I want   [capability]
So that  [outcome that matters to them]

Priority: Must / Should / Could / Won't
Estimate: [points]
~~~

## Acceptance criteria — Given / When / Then

~~~
AC1 — Happy path
Given I am a signed-in customer with a saved card
When  I confirm a booking for an available slot
Then  the slot is reserved, my card is charged, and I see a confirmation with a reference number

AC2 — Validation
Given I am on the booking form
When  I submit without choosing a time
Then  the time field shows "Choose a time" and focus moves to it, and nothing is submitted

AC3 — Conflict
Given the slot was taken while I was on the form
When  I confirm
Then  I see "That slot has just been taken" with the next three available slots offered, and I am not charged

AC4 — Permission
Given I am not signed in
When  I try to confirm
Then  I am prompted to sign in and returned to my selection afterwards

AC5 — Non-functional
Given a 3G connection
When  I load the booking page
Then  it becomes interactive within 3 seconds and meets WCAG 2.2 AA
~~~

## INVEST check
- [ ] **I**ndependent — can ship without another story
- [ ] **N**egotiable — describes the need, not the implementation
- [ ] **V**aluable — the "so that" is a real user or business outcome
- [ ] **E**stimable — no unknowns big enough to need a spike
- [ ] **S**mall — fits comfortably in one sprint (≤ 8 points)
- [ ] **T**estable — every criterion is objectively verifiable

## Definition of Ready
- [ ] Criteria written and reviewed
- [ ] Designs linked (including empty/loading/error states)
- [ ] Dependencies identified and unblocked
- [ ] Estimated
- [ ] Open questions answered
` },

'doc-story-splitting': { title: 'Story Splitting Patterns', cat: 'Strategy', body: `
# Splitting Stories That Are Too Big

**Never split by layer.** "Build the API" + "Build the UI" gives you two stories that individually deliver nothing.

| Pattern | Split by | Example |
|---|---|---|
| **Workflow steps** | Stages of the process | Basket → Address → Payment → Confirmation |
| **Business rules** | One rule at a time | Book any slot → then enforce 24h cancellation → then loyalty discount |
| **Happy path first** | Path, then exceptions | Successful payment → then declined card → then partial refund |
| **Data variations** | Type or source | Card payments → then PayPal → then invoice |
| **Roles** | User type | Customer view → then staff view → then admin |
| **Interface** | Channel | Mobile web → then desktop → then email notification |
| **Effort** | Simple then optimised | Basic list → then search → then filters → then saved views |
| **CRUD** | Operation | Create → Read → Update → Delete (often separate stories) |
| **Spike** | Unknown first | Timeboxed investigation, then the real story |

## Rules of thumb
- A story bigger than 8 points is a hidden epic.
- If you can't test it in one sitting, it's too big.
- Every split must still deliver something demonstrable end to end.
- Technical enablers are allowed, but they must state which user story they unblock.
` },

'doc-moscow': { title: 'MoSCoW Prioritisation Workshop', cat: 'Strategy', body: `
# Prioritisation Workshop (90 min)

## Setup
Every story on a card. Client's approver in the room. Your job is to facilitate, not to advocate.

## 1. MoSCoW (40 min)
- **Must** — the product is broken or pointless without it. *Test: would we delay launch for it? If no, it isn't a Must.*
- **Should** — painful to omit, but there's a workaround.
- **Could** — desirable, first to go when time is short.
- **Won't (this time)** — explicitly deferred to phase two. Name them; don't delete them.

Rule of thumb: Musts should be no more than ~60% of total effort. If they're 90%, nothing has been prioritised.

## 2. Value vs effort (20 min)
| | Low effort | High effort |
|---|---|---|
| **High value** | Do first | Plan carefully |
| **Low value** | Fill-ins | **Won't — regardless of enthusiasm** |

## 3. The forcing question (15 min)
"If we could only ship five things, which five?" Write them down. That's sprint one and two.

## 4. Sequence for a thin slice (15 min)
Order the Musts so that one complete journey works end to end first — not every screen half-built. You want something demoable in week one.

## Output
- Prioritised backlog
- **MVP definition, signed**
- Phase two list, written into the SOW as a named future scope
` },

'doc-ia': { title: 'Information Architecture Kit', cat: 'Strategy', body: `
# Information Architecture

## 1. Content inventory
| URL | Title | Type | Owner | Traffic | Keep / Rewrite / Kill | New location |
|---|---|---|---|---|---|---|

## 2. Card sort
- **Open sort** (8–15 participants): users group and name the categories themselves.
- **Closed sort:** users place items into your proposed categories.
- Look at the standardisation grid: items placed consistently are safe; scattered items need renaming or relocating.

## 3. Sitemap rules
- Primary nav: 5–7 items maximum
- Depth: 3 levels where possible; nothing more than 4 clicks from home
- Labels use the users' words, from research — never internal jargon
- Every node maps to at least one user story

## 4. Tree test
Give users tasks and ask where they'd look, using labels only.
- Target: **80%+ task success**, majority taking the direct path
- Below 60% on a task = rename or restructure, then retest

## 5. URL and slug conventions
~~~
/services/                  category
/services/web-design/       detail
/blog/2026/post-slug/       dated content
/app/bookings/:id           application route
~~~
Lower case, hyphens, no dates in evergreen URLs, no stop words, stable once published.

## 6. Navigation spec
| Element | Contains | Behaviour on mobile |
|---|---|---|
| Primary nav | | |
| Utility nav | | |
| Footer | | |
| Breadcrumbs | | |
| Search | | |
` },

'doc-flows': { title: 'User Flow Notation & Checklist', cat: 'Strategy', body: `
# User Flows

## Notation
| Shape | Meaning |
|---|---|
| Rectangle | Screen or page |
| Diamond | User decision |
| Rounded | System process |
| Cylinder | Data read/write |
| Dashed arrow | Async (email, webhook, job) |
| Red outline | Error or failure path |

## Flows every project needs
1. First-time visitor → registered user
2. Sign in, sign out, forgotten password
3. The core task, end to end
4. Payment / conversion
5. Account and settings management
6. Admin or staff action
7. Failure recovery

## Edge cases to draw — not describe
- [ ] Validation errors on every form
- [ ] Empty states (no data yet, no results, cleared filters)
- [ ] Loading and slow-connection states
- [ ] Session expiry mid-task
- [ ] Permission denied
- [ ] Payment declined / partial failure
- [ ] Duplicate submission (double-click, back button, refresh)
- [ ] Offline
- [ ] Third-party service unavailable
- [ ] Concurrency: two users editing the same thing

## Outputs
- Screen inventory with a count (sanity-checks your design estimate)
- System process list → becomes your API surface
- Error catalogue → becomes acceptance criteria
` },

'doc-datamodel': { title: 'Data Model & Permissions', cat: 'Backend', body: `
# Data Model

## Entities
| Entity | Description | Key attributes | Relationships |
|---|---|---|---|
| User | | id, email, password_hash, role, created_at | has many Bookings |
| Booking | | id, user_id, slot_id, status, total, created_at | belongs to User, Slot |

## Per-entity detail
~~~
Booking
  id            uuid    pk
  user_id       uuid    fk -> user.id, not null, indexed
  slot_id       uuid    fk -> slot.id, not null, indexed, unique with status='confirmed'
  status        enum    pending|confirmed|cancelled|refunded
  total_cents   int     not null, >= 0
  currency      char(3) not null, default 'GBP'
  created_at    timestamptz not null default now()
  updated_at    timestamptz not null
  deleted_at    timestamptz null   -- soft delete
~~~

## Conventions — decide once, apply everywhere
- IDs: UUID v7 (sortable) or bigint — pick one
- Money: integer minor units, never floats. Store currency alongside.
- Time: timestamptz, stored UTC, converted at the edge. Store the user's timezone explicitly if it matters.
- Naming: snake_case tables plural, columns singular
- Soft deletes only where there is a real recovery requirement
- Every foreign key and every filtered/sorted column gets an index

## Permission matrix
| Resource | Action | Guest | Customer | Staff | Admin |
|---|---|---|---|---|---|
| Booking | create | ✗ | own | any | any |
| Booking | read | ✗ | own | any | any |
| Booking | update | ✗ | own, pre-24h | any | any |
| Booking | delete | ✗ | ✗ | ✗ | any |
| User | read | ✗ | self | any | any |

**Enforced server-side on every endpoint.** Client-side checks are UX, not security.

## Migration plan (if replacing a system)
1. Map old fields → new fields, note lossy conversions
2. Cleansing rules for bad data
3. Dry run against a production copy; record row counts before/after
4. Reconciliation report
5. Rollback plan
` },

'doc-api-contract': { title: 'API Contract Template', cat: 'Backend', body: `
# API Contract

**Base:** https://api.example.com/v1 · **Auth:** Bearer token · **Format:** JSON

## Conventions
- Resource names plural, nouns not verbs: /bookings not /getBookings
- Status codes: 200 ok · 201 created · 204 no content · 400 validation · 401 unauthenticated · 403 unauthorised · 404 not found · 409 conflict · 422 semantic error · 429 rate limited · 500 server
- Pagination: cursor-based, ?limit=20&cursor=abc, response includes next_cursor
- Filtering: ?status=confirmed&from=2026-01-01
- Sorting: ?sort=-created_at
- Idempotency: Idempotency-Key header on all POSTs that create or charge
- Versioning: in the path; breaking changes require a new version

## Endpoint template
~~~
POST /bookings
Auth: customer
Body:
  slot_id      uuid    required
  notes        string  optional, max 500

201 Response:
  { "id": "...", "status": "confirmed", "total_cents": 4500,
    "currency": "GBP", "slot": { "id": "...", "starts_at": "..." } }

Errors:
  400 { "error": { "code": "validation_failed",
                   "message": "Check the highlighted fields",
                   "fields": { "slot_id": "Required" } } }
  409 { "error": { "code": "slot_unavailable",
                   "message": "That slot has just been taken",
                   "alternatives": [ ... ] } }
  429 { "error": { "code": "rate_limited", "retry_after": 30 } }
~~~

## Standard error shape
~~~
{ "error": { "code": "snake_case_code",
             "message": "Human readable, safe to display",
             "fields": { "field_name": "Message" },
             "request_id": "req_abc123" } }
~~~
Never leak stack traces, SQL, or internal IDs.

## Checklist
- [ ] Every endpoint documented with request, response and every error
- [ ] Auth and required role stated per endpoint
- [ ] Rate limits stated
- [ ] Validation schema shared between client and server
- [ ] OpenAPI spec generated and kept in the repo
- [ ] Contract changes go through the change request process
` }

};

try{window.__bootStage='docs-loaded';}catch(e){}
