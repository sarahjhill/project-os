/* =====================================================================
   PROJECT OS — Website audit programme

   This is the one part of the process that happens BEFORE there is a
   client. Everything in PHASES assumes somebody has already got in
   touch; this assumes nobody has, and that the audit itself is how you
   start the conversation.

   Two routes lead into it:
     inbound  — somebody fills in forms/audit.html off the Make It Pop
                site and asks for one
     outbound — you pick a business, audit it unasked, and use what you
                found as the reason for making contact

   The steps below are written for the outbound route, because it is the
   harder one and the inbound route is a subset of it (skip step 1 and
   2, you already have the site and their own numbers).

   Schema mirrors data-phases.js so the two read the same way:
     id, title, est (hours), why, how[], deliver[], tools[], dod[]
   ===================================================================== */
window.AUDIT = {

  title: 'Website Audit',
  short: 'Audit',
  goal: 'Find local businesses whose website is quietly costing them money, prove it with evidence, and use that evidence as the first point of contact.',

  intro: 'The audit is not a favour and it is not a lead magnet in the usual sense — it is the pitch. You do the work first, unasked, and turn up with something specific and true about their business. That is the whole reason it gets a reply when a cold email would not.',

  /* The rule that keeps this honest, and it is worth reading before the
     steps rather than after. */
  principle: 'Never put a number in front of someone that you cannot show your working for. "Your website is losing you £47,000 a year" is what everybody else sends and it is why it gets deleted. A measured load time, a contact form you can prove is broken, and a range built from figures they gave you is worth more than any confident guess.',

  exit: [
    'You have a ranked list of local businesses whose sites are measurably underperforming',
    'For each one you can name what is wrong, what it is likely costing, and a local competitor doing it better',
    'First contact has been made with evidence attached, not a sales pitch'
  ],

  steps: [
    {
      id: 'a-1', title: 'Build the target list', est: 3, pri: 1,
      why: 'Fifty businesses sounds like a lot until you realise most will have a perfectly good website, and of the rest most will not answer. The list is a funnel, not a client roster. Building it deliberately — rather than whoever you happen to think of — is what stops you pitching to six coffee shops and nobody else.',
      how: [
        'Pick ONE trade or sector to start, not a mixture. The second audit in a sector takes half the time of the first because you already know what that trade\'s customers need from a website, and your pitch gets sharper each time.',
        'Work through the target groups listed below this section — they are weighted towards businesses that are good for the area, which is both the work you want and the work you are credible pitching.',
        'Use Google Maps for the sector plus a Cardiff district, not just "Cardiff" — the map results are capped and you will see the same twenty businesses every time. Work district by district instead.',
        'Record for each: name, sector, district, website, phone, Google rating and review count. Leave the audit columns blank for now.',
        'Skip anyone with no website at all. That is a different conversation and a much harder sell — you would be selling them the idea of a website first.',
        'Skip franchises and chains. The website is decided in a head office in another city and no one you can reach has any say over it.',
        'Stop at fifty. The point is to run the scan across a group large enough that the genuinely broken ones stand out.'
      ],
      deliver: ['Spreadsheet of up to 50 local businesses with contact details', 'One chosen sector to start with'],
      tools: ['Google Maps', 'Google Business Profiles', 'Yell / Thomson Local', 'Local Facebook groups and community pages', 'Cardiff Council business directory'],
      dod: ['50 rows, one sector dominant', 'Every row has a working website URL', 'No chains or franchises in the list']
    },

    {
      id: 'a-2', title: 'Run the automated scan across all fifty', est: 4, pri: 1,
      why: 'This is the part that only works because you can code, and it is the entire reason this approach scales for you and not for a person with a clipboard. Fifty manual audits is a fortnight. Fifty scanned overnight and ranked by severity is one script and a cup of tea.',
      how: [
        'Run every URL through the PageSpeed Insights API with strategy=mobile. It is free, it needs no key for low volumes, and it returns the Core Web Vitals plus a performance score.',
        'Record mobile performance score, Largest Contentful Paint and Cumulative Layout Shift for each. LCP is the one to lead with — it is the closest thing to "how long before they see anything".',
        'Fetch each homepage and check the cheap structural things at the same time: is there a viewport meta tag, is there a tel: link, is the phone number in plain text, does the page load over HTTPS without warnings, is there a form element at all.',
        'Flag anything with a mobile score under 50 or an LCP over 4 seconds. That is your shortlist before you look at anything by hand.',
        'Keep the raw JSON per site. When you write the report you will want to quote the exact figure and the date you measured it.',
        'Re-run the whole list monthly. A site that got worse is a better prospect than one that has always been bad — something changed, and somebody may have noticed.'
      ],
      deliver: ['Scan results for all 50 sites', 'Shortlist ranked by severity', 'Raw JSON kept per site for evidence'],
      tools: ['PageSpeed Insights API', 'Lighthouse CLI for deeper runs', 'Node or Python script', 'Results into CSV'],
      dod: ['Every site scanned and dated', 'Shortlist of the worst 10–15 produced', 'Raw results retained']
    },

    {
      id: 'a-3', title: 'Find the local benchmark — who is doing it well', est: 2, pri: 1,
      why: 'A score on its own means nothing to a plumber. "Your site takes nine seconds, the industry says three" is abstract. "Your site takes nine seconds and the plumber two miles away in Whitchurch takes two" is a completely different conversation, because now it is not a technical standard, it is a competitor eating their lunch.',
      how: [
        'For each shortlisted business, search their trade plus their district as their customer would, on a phone, not logged in.',
        'Take the top three in the map results. Those are the ones actually winning the searches your prospect is losing.',
        'Scan those three the same way you scanned the prospect. Usually at least one will be markedly faster and better set up.',
        'Note what the good one does that the prospect does not: online booking, a tappable number, recent reviews, photos, clear pricing.',
        'Pick the single most flattering comparison and use only that one in the report. Three competitors is a pile-on; one is a fact.',
        'Never name the competitor rudely or imply the prospect is bad at their job. The framing is always "this is available to you too", not "look how far behind you are".'
      ],
      deliver: ['One named local benchmark per prospect', 'Side-by-side comparison of the two scans', 'List of what the benchmark does differently'],
      tools: ['Google Maps in a private window', 'The same scanner from step 2'],
      dod: ['Benchmark identified and scanned', 'A single clear comparison chosen', 'Framing checked for tone']
    },

    {
      id: 'a-4', title: 'Do the manual pass', est: 1.5, pri: 1,
      why: 'The scan finds slow. It cannot find confusing, and confusing is what actually loses the enquiry. This is also the step that produces the one specific, human detail that proves to them you really looked — which is what makes the difference between a reply and a delete.',
      how: [
        'Open the site on an actual phone on mobile data, not on a desktop browser at a narrow width. They are not the same thing and only one of them is what their customer sees.',
        'Start a stopwatch and time how long until you can read anything useful. That number goes in the report in plain language.',
        'Try to do what their customer wants to do: find the price, find opening hours, book, or ring. Time it. Note where you hesitated.',
        'SEND A MESSAGE THROUGH THEIR CONTACT FORM. Say who you are and that you are testing whether it works. A surprising number have been going nowhere for months, and finding that is the single most valuable thing you can tell them.',
        'Tap the phone number. If it does not dial, that is a finding on its own.',
        'Check their Google Business Profile: opening hours right, recent photos, reviews answered. For a local business this is often worth more than the website and is far quicker to fix.',
        'Write down the one thing that would annoy you most as a customer. That is your opening line.'
      ],
      deliver: ['Manual findings note per prospect', 'Contact form test result', 'The one detail that proves you looked properly'],
      tools: ['A real phone on mobile data', 'Stopwatch', 'Private browsing window'],
      dod: ['Site used on a real phone', 'Contact form tested and result recorded', 'Google Business Profile checked']
    },

    {
      id: 'a-5', title: 'Work out what it is costing them — honestly', est: 1, pri: 1,
      why: 'This is the number that makes them care, and it is also the number that will destroy your credibility if you invent it. The discipline is simple: industry research supplies the percentage, they supply the money, and you never supply both.',
      how: [
        'Outbound, you do not have their numbers yet. So give a RANGE built on visible signals — review count as a rough proxy for volume, typical job values for that trade — and label it clearly as an estimate you would like to correct.',
        'Say so explicitly in the report: "I have had to guess at your numbers. Tell me the real ones and I will redo this properly." That sentence has started more conversations than any figure.',
        'Anchor the percentage on published research, not a feeling. Google\'s own data puts the jump from a one-second to a three-second load at roughly a 32% increase in bounce, and at five seconds on mobile it approaches 90%.',
        'Do the arithmetic in front of them, in the report, showing every input. If they disagree with an input they will tell you — and now you are having a conversation about their business.',
        'Give worst case and best case, never a single figure. A range says you are being careful. One number says you are selling.',
        'If the honest answer is that the site is fine and the problem is elsewhere, write that down and send it anyway. You lose one prospect and gain someone who trusts you.'
      ],
      deliver: ['A costed range with every input shown', 'A clear statement of what was estimated versus measured'],
      tools: ['The three questions from the audit form', 'Published speed-to-conversion research'],
      dod: ['No unsourced figures', 'Range not a single number', 'Estimated inputs labelled as estimates']
    },

    {
      id: 'a-6', title: 'Write the one-page audit', est: 2, pri: 1,
      why: 'The report is the product, and it will be read on a phone between jobs by someone who is not technical and did not ask for it. Anything longer than a page gets saved for later and never opened.',
      how: [
        'One page. If it will not fit, your findings are not prioritised enough yet.',
        'Open with the single most costly thing, in their language: "Your site takes nine seconds to load on a phone. Most people give up at three."',
        'Then the benchmark, in one line, with the competitor named neutrally.',
        'Then no more than four findings, ordered by what they cost — not by how technical they are. Each gets one sentence on what is wrong and one on what it means for them.',
        'Include one thing they are doing WELL and mean it. It is honest, it lowers their defences, and there is always something.',
        'Say plainly what you would fix first and roughly what that involves. Not a quote — a direction.',
        'End with a question, not a pitch. "Does that match what you have noticed?" invites a reply. "I can fix this for £800" does not.',
        'Send it as a PDF attachment with the findings also in the body of the email, because plenty of people will never open the attachment.'
      ],
      deliver: ['One-page PDF audit', 'Email version of the findings', 'Branded with Make It Pop'],
      tools: ['The Make It Pop report template', 'Screenshots from the manual pass'],
      dod: ['Fits on one page', 'Every claim traceable to a measurement', 'Ends with a question']
    },

    {
      id: 'a-7', title: 'Make first contact', est: 1, pri: 1,
      why: 'You have done unpaid work for a stranger, which is unusual enough to earn attention — and easy to squander by sounding like every other agency email they delete. The audit does the persuading. Your job is to get out of its way.',
      how: [
        'Email first, addressed to a person if you can find one. "Dear Sir/Madam" undoes all the work you just did.',
        'Subject line is the finding, not the offer: "Your contact form has not been working" or "Your site takes 9 seconds on a phone".',
        'First line says what you did and why, in one sentence: "I audit local business websites in Cardiff. I looked at yours this week and found a few things worth knowing."',
        'Second line is the single worst finding. Then the attachment. Then the question.',
        'Say clearly that it is free and there is no obligation. Say it once, plainly, and do not repeat it.',
        'If they are a good cause, say the audit is free for charities and community groups as a matter of policy, not as a favour to them specifically.',
        'For a local shop or café, consider walking in with it printed instead. It is Cardiff, not New York, and turning up in person with a piece of paper converts far better than email.',
        'Log the date and the channel. You will lose track by prospect fifteen otherwise.'
      ],
      deliver: ['Sent audit with covering note', 'Contact logged with date and channel'],
      tools: ['Email', 'Printed copies for walk-ins', 'The prospect tracker'],
      dod: ['Addressed to a named person where possible', 'Subject line is a finding', 'Contact logged']
    },

    {
      id: 'a-8', title: 'Follow up once, then stop', est: 0.5, pri: 2,
      why: 'One follow-up roughly doubles the reply rate. The second and third annoy people and get you a reputation in a city small enough for that to matter.',
      how: [
        'Wait five working days. Not two — they are running a business.',
        'Reply to your own original email so the audit is still attached and in view.',
        'Add something new rather than repeating yourself: a second finding you held back, or a re-scan showing the score has not moved.',
        'Close the door politely and mean it: "If it is not the right time, no problem at all — the report is yours to keep and use however you like."',
        'Then stop. Mark them dormant and move on.',
        'Re-scan dormant prospects in six months. Circumstances change, and a second audit showing it got worse is a strong reopening.'
      ],
      deliver: ['One follow-up sent', 'Prospect marked live or dormant'],
      tools: ['The prospect tracker'],
      dod: ['Exactly one follow-up sent', 'Outcome recorded', 'Dormant prospects diarised for six months']
    },

    {
      id: 'a-9', title: 'Convert into the normal process', est: 0.5, pri: 1,
      why: 'The audit is a front door, not a project. The moment someone says yes you want them in the same process as every other client, with the same paperwork — that is what stops a friendly favour turning into unpaid work with no scope.',
      how: [
        'A reply asking "what would it cost?" is not yet a project. Get them onto a call first.',
        'On the call, ask the three numbers questions properly and redo the costing with their real figures. This alone justifies the call.',
        'Send the standard Project Enquiry Form so the answers land in the same place as everybody else\'s, even though you already know a lot about them.',
        'From there they are a normal Phase 0 lead: qualify, propose, contract, deposit. Nothing about the audit route changes the commercial terms.',
        'If they only want the small fixes rather than a rebuild, price it as a fixed-fee package. Small paid jobs from audit leads are good business and they turn into rebuilds later.',
        'Keep the original audit in their file. It is the baseline you will measure the finished work against, and "here is the before and after" is the case study that gets you the next five.'
      ],
      deliver: ['Discovery call booked', 'Project Enquiry Form sent', 'Audit filed as the baseline'],
      tools: ['forms/intake.html', 'The normal Phase 0 process'],
      dod: ['Lead moved into Phase 0', 'Original audit retained as baseline'],
      docs: ['doc-intake']
    }
  ],

  /* ------------------------------------------------------------------
     Who to put on the list.

     Weighted deliberately towards businesses that hold a neighbourhood
     together, because that is the work worth doing and because it is
     the work you can talk about credibly. No business names here — a
     name and a URL I have not checked is worse than useless when you
     are the one turning up at the door.
  ------------------------------------------------------------------ */
  targets: {
    note: 'Pick one group and work it properly before moving to the next. The second audit in a sector takes half as long as the first, and by the fifth you can talk about that trade like someone who knows it.',
    groups: [
      {
        name: 'Independent food and drink',
        why: 'High footfall, thin margins, and a website that is often just an out-of-date menu. Opening hours being wrong on Google costs them real covers every week.',
        search: ['independent cafe Cardiff [district]', 'bakery Cardiff [district]', 'deli OR greengrocer Cardiff', 'zero waste shop Cardiff', 'farm shop Cardiff']
      },
      {
        name: 'Trades and home services',
        why: 'Almost entirely phone-driven, so a broken or untappable number is a direct loss. Usually one or two people with no marketing help at all, and the decision-maker answers the phone themselves.',
        search: ['plumber Cardiff [district]', 'electrician Cardiff [district]', 'joiner OR carpenter Cardiff', 'gardener Cardiff', 'roofer Cardiff', 'locksmith Cardiff']
      },
      {
        name: 'Care and childcare',
        why: 'Parents and families research these on a phone, late at night, and trust signals matter enormously. A slow or amateur-looking site does real damage to a good provider.',
        search: ['nursery Cardiff [district]', 'childminder Cardiff', 'dog walker Cardiff', 'home care Cardiff', 'day centre Cardiff']
      },
      {
        name: 'Health and wellbeing',
        why: 'Booking-driven, so the gap between "ring us" and "book online" is measurable money. Often on an old template from whoever set it up years ago.',
        search: ['physiotherapist Cardiff [district]', 'dentist Cardiff [district]', 'optician Cardiff', 'barber OR salon Cardiff', 'chiropodist Cardiff']
      },
      {
        name: 'Community and good causes',
        why: 'The audit is free for these as a matter of policy. A slow donate button or a broken contact form on a food bank site costs something that matters more than money, and this is the work Make It Pop was built for.',
        search: ['community centre Cardiff [district]', 'food bank Cardiff', 'mosque OR church Cardiff', 'charity shop Cardiff', 'community garden Cardiff']
      },
      {
        name: 'Education and instruction',
        why: 'Almost all enquiries arrive through a form, so form failure is total failure. Usually run by one person who teaches all day and has no time to look at the website.',
        search: ['tutor Cardiff [district]', 'driving instructor Cardiff', 'music teacher Cardiff', 'dance school Cardiff', 'martial arts Cardiff']
      },
      {
        name: 'Repair, reuse and craft',
        why: 'Small, well-loved, usually terrible online, and the sort of business a neighbourhood misses when it goes. Often the easiest and most enjoyable wins on the list.',
        search: ['bike shop OR repair Cardiff', 'cobbler OR shoe repair Cardiff', 'upholsterer Cardiff', 'repair cafe Cardiff', 'furniture restoration Cardiff']
      }
    ],
    districts: [
      'Canton', 'Grangetown', 'Riverside', 'Pontcanna', 'Roath', 'Cathays',
      'Adamsdown', 'Splott', 'Butetown', 'Llandaff', 'Whitchurch', 'Llanishen',
      'Heath', 'Gabalfa', 'Fairwater', 'Ely', 'Caerau', 'Rumney', 'Llanrumney',
      'St Mellons', 'Cyncoed', 'Lisvane', 'Radyr', 'Creigiau', 'Tremorfa'
    ],
    districtNote: 'Search by district rather than "Cardiff". The map results are capped, so a city-wide search shows you the same twenty businesses every time and hides exactly the small ones you are looking for.'
  },

  /* ------------------------------------------------------------------
     What the scanner checks. Everything here is read-only and public —
     the same checks anyone can run against any website — which is what
     makes it reasonable to run before asking permission. The audit form
     asks permission anyway for the inbound route.
  ------------------------------------------------------------------ */
  scanner: {
    note: 'Free tools, no scraping of anything private, nothing that touches their server harder than a normal visitor would. If a check cannot be run politely, it does not belong in the scanner.',
    checks: [
      { name: 'Mobile performance score', how: 'PageSpeed Insights API, strategy=mobile', flag: 'Under 50' },
      { name: 'Largest Contentful Paint', how: 'PageSpeed Insights API', flag: 'Over 4 seconds — this is the headline number for the report' },
      { name: 'Cumulative Layout Shift', how: 'PageSpeed Insights API', flag: 'Over 0.25 — the cause of mis-taps on phones' },
      { name: 'Mobile viewport tag', how: 'Fetch the homepage, look for a viewport meta tag', flag: 'Missing — the site is not responsive at all' },
      { name: 'Tappable phone number', how: 'Look for a tel: link in the markup', flag: 'Missing — every phone visitor has to copy it out by hand' },
      { name: 'Contact form present', how: 'Look for a form element or a known form embed', flag: 'Missing, or present but untested' },
      { name: 'HTTPS and certificate', how: 'Request over https and check the response and expiry', flag: 'No HTTPS, or a certificate expiring within 30 days' },
      { name: 'Page weight', how: 'Total transferred bytes of the homepage', flag: 'Over 3MB — usually one unoptimised hero image' },
      { name: 'Title and description', how: 'Read the title and meta description', flag: 'Missing, duplicated, or default template text' },
      { name: 'Accessibility score', how: 'Lighthouse accessibility category', flag: 'Under 80 — often contrast and unlabelled form fields' }
    ]
  },

  /* ------------------------------------------------------------------
     The maths, written down so it is done the same way every time.
  ------------------------------------------------------------------ */
  maths: {
    note: 'They supply the money, published research supplies the percentage, and you supply neither. Every figure in a report should be traceable to one or the other.',
    inputs: [
      'Enquiries in a typical week — from them, or estimated from review volume and labelled as an estimate',
      'What an average customer is worth — from them; never guess this one, ask',
      'Roughly what proportion of enquiries convert — from them'
    ],
    rates: [
      'One second to three seconds: bounce probability rises by about 32% (Google)',
      'One second to five seconds on mobile: bounce approaches 90% (Google)',
      'Every 100ms of delay: roughly 7% fewer conversions (widely replicated)',
      'Average mobile load across the web sits around 8.6 seconds against a 3-second benchmark'
    ],
    output: 'A worst case and a best case, with every input printed next to it, and a line inviting them to correct any input they disagree with.'
  }
};
try { window.__bootStage = 'audit-loaded'; } catch (e) { }
