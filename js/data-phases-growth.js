/* =====================================================================
   PROJECT OS — Growth track

   A second process, for the projects that are your own rather than a
   client's. The client track (data-phases.js / -2.js) assumes somebody is
   paying you to build them a website. This one assumes you are trying to
   get found, and the phases run in the order that actually works: the
   plumbing has to be right before promotion is worth anything, and the
   listings have to exist before the differentiators have anywhere to land.

   Same task schema as the client track:
     id, title, role, est (hours), pri (1=Critical 4=Low), pts
     why, how[], deliver[], tools[], dod[]

   Registered on window.TRACKS by data-tracks.js.
   ===================================================================== */
window.PHASES_GROWTH = [
{
  id: 'g0', num: 0, name: 'Groundwork', short: 'Groundwork',
  goal: 'Make the site readable by search engines. Nothing else on this track is worth doing until this is live.',
  exit: [
    'sitemap.xml and robots.txt load on the live domain',
    'Every page carries structured data and a canonical URL',
    'The homepage title says where you are and who you serve'
  ],
  tasks: [
    {
      id: 'g0-1', title: 'Push the SEO groundwork live', role: 'Build', est: 0.25, pri: 1, pts: 1,
      why: 'A sitemap tells Google which pages exist. Structured data tells it you are a Cardiff business, what you sell, and that you work in Welsh. Until this is live Google is guessing, and every other task on this track depends on it.',
      how: [
        'In the VS Code terminal: git add -A',
        'git commit -m "Add sitemap, robots.txt and structured data"',
        'git push',
        'Wait two minutes, then check https://sarahjhill.com/sitemap.xml loads in a browser.',
        'Hard-refresh the homepage in a private window and confirm the new title shows in the browser tab.'
      ],
      deliver: ['sitemap.xml live', 'robots.txt live', 'Structured data on all six pages'],
      tools: ['VS Code', 'Git'],
      dod: ['sitemap.xml loads', 'robots.txt loads', 'Homepage title mentions Cardiff']
    }
  ]
},
{
  id: 'g1', num: 1, name: 'Get Listed', short: 'Listed',
  goal: 'Exist properly in the places that decide local rankings. Three jobs, and together they outweigh everything else on this track.',
  exit: [
    'Google Business Profile verified and completely filled in',
    'At least three genuine Google reviews, each replied to',
    'Search Console verified and the sitemap submitted'
  ],
  tasks: [
    {
      id: 'g1-1', title: 'Create the Google Business Profile', role: 'Marketing', est: 0.5, pri: 1, pts: 3,
      why: 'This is the panel beside Google results and in Maps. For a local service business it is the single biggest ranking factor there is, and it is free. You do not need premises to have one.',
      how: [
        'Go to business.google.com and sign in with the Google account you actually check.',
        'Business name: Make It Pop. Use exactly this wording everywhere — Google cross-checks it against other listings.',
        'When asked whether customers visit you at an address, say NO. Choose service area business, area = Cardiff.',
        'Primary category: Website Designer. Add Internet Marketing Service and Graphic Designer as secondary.',
        'Website: https://sarahjhill.com  Contact: sarah@sarahjhill.com',
        'Start verification now — postcard or video call, up to two weeks — so the clock runs while you do everything else.',
        'Once verified, fill in EVERY field: description, services (website design, free website audit, bilingual Welsh websites), and at least five photos of real work.',
        'Do not skip the description or the services. A half-filled profile ranks below a complete one, and completeness is entirely in your control.'
      ],
      deliver: ['Verified Google Business Profile', 'Services and description filled in', 'Five or more photos'],
      tools: ['business.google.com'],
      dod: ['Profile verified', 'Category set to Website Designer', 'Service area set to Cardiff', 'Description written', 'Services listed', 'Five photos uploaded']
    },
    {
      id: 'g1-2', title: 'Ask past clients for Google reviews', role: 'Marketing', est: 0.35, pri: 1, pts: 2,
      why: 'Reviews are the second-biggest local ranking factor, and around 85% of people say positive reviews make them more likely to use a business. You already have written testimonials from Kate, Bev and Umm AbdulHakeem — they are just not where they would do the most work.',
      how: [
        'Wait until the Business Profile is verified — you cannot receive reviews before that.',
        'In the profile, find "Ask for reviews" and copy the short link.',
        'Message each person individually: "Hi Kate — I have just set up a Google listing for Make It Pop. Would you mind copying what you kindly said about the site onto it? Takes about a minute: [link]"',
        'Ask one at a time over a few weeks. Three reviews on the same afternoon looks staged; three over a month looks normal.',
        'Reply to every review, even one-liners. Google counts the replies.',
        'NEVER offer anything in exchange for a review — not a discount, not a free hour. It breaches Google policy and can get the profile suspended.'
      ],
      deliver: ['Three genuine Google reviews', 'A reply under each'],
      tools: ['Google Business Profile'],
      dod: ['Kate asked', 'Bev asked', 'Umm AbdulHakeem asked', 'Every review replied to']
    },
    {
      id: 'g1-3', title: 'Set up Search Console and submit the sitemap', role: 'Marketing', est: 0.35, pri: 1, pts: 2,
      why: 'This is how you find out what people actually type before they land on your site, and how you tell Google your pages exist rather than waiting to be found. Free, and permanent.',
      how: [
        'Go to search.google.com/search-console and add a property.',
        'Choose Domain (not URL prefix) and enter sarahjhill.com',
        'It will ask for a TXT record. In Cloudflare: your domain > DNS > Add record > type TXT, name @, paste the value Google gives you. Save, then Verify.',
        'Once verified: Sitemaps in the left menu > enter sitemap.xml > Submit.',
        'Repeat at bing.com/webmasters — five minutes, and Bing feeds several other tools.',
        'Come back in two weeks and open Performance. Those are real searches by real people; the phrases there tell you what to write next.'
      ],
      deliver: ['Verified Search Console property', 'Sitemap submitted', 'Bing Webmaster Tools set up'],
      tools: ['Google Search Console', 'Cloudflare DNS', 'Bing Webmaster Tools'],
      dod: ['Domain verified', 'Sitemap showing Success', 'Bing set up']
    }
  ]
},
{
  id: 'g2', num: 2, name: 'Where Buyers Look', short: 'Directories',
  goal: 'Appear in the sector directories your buyers actually use, and on the one social channel they are actually on.',
  exit: [
    'Listed in at least three directories with identical details',
    'A standard block of listing wording saved and reused',
    'One social channel set up properly rather than four half-done'
  ],
  tasks: [
    {
      id: 'g2-1', title: 'Join Cardiff Third Sector Council', role: 'Marketing', est: 0.75, pri: 2, pts: 3,
      why: 'C3SC’s membership directory is literally a list of the organisations you want to work for. They also run newsletters and events those organisations read.',
      how: [
        'Go to membership.c3sc.org.uk and check which membership type fits a sole trader supplying the sector.',
        'Write the directory entry around what you FIX, not what you sell: "Hand-built, accessible websites for Cardiff community organisations. Bilingual Welsh and English. Free website audits."',
        'Subscribe to their newsletter even before joining, so you can see what the sector is talking about.',
        'Do the same for WCVA (wcva.cymru), the all-Wales body.'
      ],
      deliver: ['C3SC listing live', 'WCVA listing or membership'],
      tools: ['membership.c3sc.org.uk', 'wcva.cymru'],
      dod: ['C3SC entry published', 'Newsletter subscribed', 'WCVA checked']
    },
    {
      id: 'g2-2', title: 'Get into the charity supplier directories', role: 'Marketing', est: 0.7, pri: 2, pts: 2,
      why: 'Charity trustees do not browse design portfolios. They look in sector directories and ask each other. Free listings also build the consistent citations local ranking depends on.',
      how: [
        'CharityComms supplier directory (charitycomms.org.uk/directories/suppliers) — check the terms; some tiers are free.',
        'Charity Digital (charitydigital.org.uk) — read their supplier pages and see how listings work.',
        'General free listings while you are at it: Bing Places, Yell free tier, Cylex, FreeIndex.',
        'Use EXACTLY the same business name and contact wording on every one. Inconsistent details across listings actively hurt local ranking.',
        'Paste the standard wording into this task’s notes so you can copy it every time.'
      ],
      deliver: ['Listings live', 'Standard wording saved in the task notes'],
      tools: ['CharityComms', 'Charity Digital', 'Bing Places', 'Yell'],
      dod: ['Standard wording agreed and saved', 'Three or more directories listed', 'Details identical everywhere']
    },
    {
      id: 'g2-3', title: 'Set up LinkedIn properly, and only LinkedIn', role: 'Marketing', est: 1, pri: 2, pts: 3,
      why: 'Most web designers post on Instagram and Dribbble, where the audience is other web designers. Charity managers and trustees are on LinkedIn. One channel done properly beats four done badly.',
      how: [
        'Rewrite the headline as who you help, not your job title: "I build fast, accessible websites for Cardiff charities and small businesses".',
        'Set the banner to something from the site and claim the custom URL linkedin.com/in/sarahjhill if it is free.',
        'Follow every Cardiff charity, community group and third-sector body you can find.',
        'Comment usefully on their posts — about what THEY do, not about web design.',
        'Post once a week. The published audits from the next phase are your posts; you do not need to invent content.',
        'Local Facebook groups are worth joining, but read the rules first — most Cardiff community groups ban advertising and will remove you. Be helpful; do not sell.'
      ],
      deliver: ['Rewritten LinkedIn profile', 'A following list of local organisations'],
      tools: ['LinkedIn'],
      dod: ['Headline rewritten', 'Custom URL claimed', 'Twenty or more local organisations followed', 'First post published']
    }
  ]
},
{
  id: 'g3', num: 3, name: 'Be Different', short: 'Different',
  goal: 'Everything before this gets you level with your competitors. This is what puts you ahead of them. Do one properly rather than three badly.',
  exit: [
    'At least one published audit with the organisation’s permission',
    'A page that owns a niche nobody local is competing for',
    'Claims backed by dated, published numbers'
  ],
  tasks: [
    {
      id: 'g3-1', title: 'Publish your audits', role: 'Marketing', est: 3, pri: 1, pts: 5,
      why: 'You already do free audits privately, one at a time. Published, each becomes proof you can do the work, a page targeting a genuinely local search, a reason to talk to the organisation you audited, and a LinkedIn post. Nobody in Cardiff is doing this. It is the strongest single item on this track.',
      how: [
        'Pick a Cardiff organisation whose site is visibly struggling. A charity or community group is ideal — they are your audience and they will be grateful.',
        'ASK PERMISSION FIRST, IN WRITING. Explain you would like to audit their site free of charge and publish the findings, and that you will not publish anything they are uncomfortable with.',
        'Run the audit exactly as you would a paid one.',
        'Write it up as a page: what you found, what it is likely costing them, what you would do about it, and what it would take.',
        'Be constructive, never mocking. You are helping, not dunking on them.',
        'Send it to them BEFORE publishing and let them approve it.',
        'Publish, send it to them again so they can share it, post on LinkedIn, and add the page to sitemap.xml.',
        'If they say no, thank them and move on — then send the findings privately anyway, with no strings. That is how referrals start.'
      ],
      deliver: ['A published audit page', 'A LinkedIn post', 'A relationship with the organisation'],
      tools: ['Lighthouse', 'Your existing audit process'],
      dod: ['Permission in writing', 'Audit run', 'Draft approved by them', 'Page published', 'Added to sitemap', 'Posted on LinkedIn']
    },
    {
      id: 'g3-2', title: 'Own "bilingual websites, done properly"', role: 'Marketing', est: 4, pri: 2, pts: 5,
      why: 'Welsh Language Standards are a statutory duty for public bodies in Wales, and the National Lottery Community Fund — the biggest funder of community projects here — operates to them too. Very few small Cardiff studios offer a properly bilingual build, and you have already done one: Cardiff Community Meals is Welsh-first.',
      how: [
        'Write a page: "Bilingual websites in Welsh and English".',
        'Explain what doing it properly means — not a translation plugin, but real language switching, correct lang attributes, and Welsh-first where the audience expects it.',
        'Use Cardiff Community Meals as the worked example. You already built it.',
        'Be honest about your own Welsh. If you work with a translator, say so — that is a strength, not a weakness.',
        'Add it to the Business Profile services and every directory listing.',
        'Target the phrases people actually search: "bilingual website Wales", "Welsh language website design".'
      ],
      deliver: ['A bilingual services page', 'Added to Business Profile services'],
      tools: ['Your own site'],
      dod: ['Page written and published', 'Cardiff Community Meals used as the example', 'Added to the sitemap', 'Added to Business Profile']
    },
    {
      id: 'g3-3', title: 'Publish your receipts', role: 'Marketing', est: 2, pri: 3, pts: 3,
      why: 'Every agency claims their sites are fast; almost none publish numbers. Yours are genuinely unusual — a 4KB icon font against the full set’s 924KB, and no render-blocking JavaScript. That is verifiable, and a competitor cannot copy the claim without doing the work.',
      how: [
        'Run Lighthouse on your own site (Chrome DevTools > Lighthouse) on the mobile profile. Screenshot it.',
        'Run the site through websitecarbon.com — small pages score well, and charities care about this.',
        'Publish a short page with the numbers, dated, and one line on how each was achieved.',
        'Re-run and update every few months. A dated current number persuades far more than a badge.'
      ],
      deliver: ['A published performance page with dated figures'],
      tools: ['Chrome Lighthouse', 'websitecarbon.com'],
      dod: ['Lighthouse run and screenshotted', 'Carbon figure recorded', 'Page published with the date on it']
    }
  ]
},
{
  id: 'g4', num: 4, name: 'Keep It Going', short: 'Rhythm',
  goal: 'The setup is finished; this is the whole job from here. About two hours a month, done consistently.',
  exit: [
    'One audit published every month',
    'Search Console reviewed monthly and one page improved',
    'A review requested on every completed project'
  ],
  tasks: [
    {
      id: 'g4-1', title: 'Monthly: publish one audit', role: 'Marketing', est: 3, pri: 2, pts: 5,
      why: 'One a month is twelve a year. It is the only activity that feeds search rankings, LinkedIn, the portfolio and the pipeline at the same time.',
      how: [
        'Pick the organisation at the start of the month.',
        'Ask permission in week one, audit in week two, write in week three, publish in week four.',
        'Reuse the same structure every time so it gets faster.'
      ],
      deliver: ['One published audit per month'],
      tools: ['Your audit process'],
      dod: ['Organisation chosen', 'Permission obtained', 'Published', 'Shared']
    },
    {
      id: 'g4-2', title: 'Monthly: check Search Console and act on it', role: 'Marketing', est: 0.35, pri: 3, pts: 1,
      why: 'Search Console tells you which phrases you already show up for. Improving a page that ranks on page two is far cheaper than writing a new one.',
      how: [
        'Open Performance and sort by impressions.',
        'Find phrases where you appear but nobody clicks — usually the page title needs rewriting.',
        'Find phrases where you rank on page two — improve that page rather than starting a new one.',
        'Note what you changed in this task’s notes so you can see what worked.'
      ],
      deliver: ['One improvement made per month'],
      tools: ['Google Search Console'],
      dod: ['Performance reviewed', 'One page improved', 'Change noted']
    },
    {
      id: 'g4-3', title: 'Every project: ask for the review at handover', role: 'Marketing', est: 0.1, pri: 1, pts: 1,
      why: 'Ask while they are still pleased with you — the week you hand over, not three months later. This is the habit that compounds, and the cheapest, highest-return item on the whole track.',
      how: [
        'Add it to the handover routine, alongside showing them how to run the site.',
        'Send the Google review link in the handover email.',
        'One follow-up a week later if nothing appears, then let it go.'
      ],
      deliver: ['A review request sent on every completed project'],
      tools: ['Google Business Profile'],
      dod: ['Added to the handover checklist', 'Link saved somewhere easy to find']
    }
  ]
}
];
