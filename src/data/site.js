/**
 * ------------------------------------------------------------------
 *  SITE CONTENT
 *  Everything you'd want to edit lives in this one file:
 *  your details, services, projects, process and testimonials.
 *  Projects and testimonials are realistic placeholders — swap them
 *  for real work as you collect it.
 * ------------------------------------------------------------------
 */

export const profile = {
  name: 'Shubham Nagar',
  shortName: 'Shubham',
  role: 'Designer & developer',
  location: 'Indore, Madhya Pradesh',
  email: 'hello@shubhamnagar.in', // ← replace with your real email
  phone: '+91 90000 00000', // ← replace (used for WhatsApp too)
  whatsapp: 'https://wa.me/919000000000', // ← replace
  hours: 'Mon–Sat, 10am–7pm IST',
  availability: 'Taking on two new projects for November',
  // Put a photo at /public/me.jpg and set this to '/me.jpg'
  photo: null,
  // Optional: paste a Formspree / Web3Forms / Getform endpoint to receive
  // form submissions directly. If left empty, the form opens the visitor's
  // email app with the message pre-filled instead.
  formEndpoint: '',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'WhatsApp', href: 'https://wa.me/919000000000', icon: 'whatsapp' },
  ],
}

export const hero = {
  // Each string is one line of the headline (lines animate in one by one)
  headline: ['See your website', 'before you pay', 'for it.'],
  intro:
    "I'm Shubham, an independent designer and developer in Indore. I build websites, decks, videos and social content for businesses — and every project starts with a free, working preview.",
}

export const about = {
  title: 'An engineer who designs for the phone ringing.',
  story: [
    "I started out in Mumbai's startup scene, where a website had to earn its keep within a week or it got rebuilt. That habit stuck.",
    'Today I run the digital side of a group of institutional websites in Madhya Pradesh, and alongside that I help independent businesses in Indore show up properly online — clinics, cafés, coaching institutes, developers and event organisers.',
    "I'm an engineer by training, so I care about how things work under the hood. But clients don't buy code. They buy more calls, more bookings and fewer explanations, and that's what I design for.",
  ],
  facts: [
    { label: 'Currently', value: 'Running the websites of a university & healthcare group in MP' },
    { label: 'Based in', value: 'Indore & Dewas, MP' },
    { label: 'Studied', value: 'B.Tech, NMIMS Mumbai' },
    { label: 'Off the clock', value: 'Chess, markets, and rebuilding things that already worked' },
  ],
  skills: [
    { group: 'Design', items: ['Figma', 'Design systems', 'Brand identity', 'UI & UX'] },
    { group: 'Build', items: ['React', 'Next.js', 'Tailwind CSS', 'Node & Express', 'MongoDB'] },
    { group: 'Grow', items: ['Technical SEO', 'Google Business Profile', 'Search Console', 'GA4', 'Meta Business Suite'] },
    { group: 'Create', items: ['Premiere Pro', 'DaVinci Resolve', 'PowerPoint', 'Keynote', 'Canva'] },
  ],
}

// `icon` maps to a lucide-react icon in Services.jsx
export const services = [
  {
    id: 'web',
    icon: 'web',
    title: 'Website design & development',
    short: 'Fast, mobile-first sites that turn visitors into enquiries.',
    description:
      'Custom-designed websites built in React or Next.js, written for your customers rather than your competitors. You click through a working preview before you pay anything.',
    deliverables: ['Custom design, no templates', 'Mobile-first build', 'WhatsApp and call buttons wired in', 'Hosting, domain and handover'],
    timeline: '2–4 weeks',
  },
  {
    id: 'seo',
    icon: 'seo',
    title: 'SEO',
    short: 'Get found when people nearby search for what you do.',
    description:
      'Technical clean-up, a properly set-up Google Business Profile, local keywords and pages that answer the questions people actually type. Reported monthly in plain language.',
    deliverables: ['Technical audit and fixes', 'Google Business Profile setup', 'Local keyword pages', 'Monthly ranking report'],
    timeline: 'Ongoing — results usually show from month two',
  },
  {
    id: 'decks',
    icon: 'decks',
    title: 'Corporate presentations',
    short: 'Decks that make the point in the first three slides.',
    description:
      'Investor decks, sales presentations and conference talks. I restructure the story first, then design every slide to carry one idea.',
    deliverables: ['Story and structure pass', 'Custom slide master', 'Charts and diagrams redrawn', 'PowerPoint, Keynote or PDF'],
    timeline: '5–10 days',
  },
  {
    id: 'video',
    icon: 'video',
    title: 'Video editing',
    short: 'Reels, brand films and event edits with a sense of rhythm.',
    description:
      'From raw footage to finished cut: pacing, colour, sound and captions, delivered in a version sized for every platform you post on.',
    deliverables: ['Edit, colour and sound', 'Burned-in captions', '9:16, 1:1 and 16:9 cuts', 'Two rounds of revisions'],
    timeline: '3–7 days per video',
  },
  {
    id: 'social',
    icon: 'social',
    title: 'Social media management',
    short: 'A consistent presence without you living on your phone.',
    description:
      'A monthly content calendar, designed posts and reels, captions, scheduling and a short report on what worked and what to do more of.',
    deliverables: ['Monthly content calendar', '12–20 posts and reels', 'Captions and hashtags', 'Monthly insights report'],
    timeline: 'Monthly retainer',
  },
]

// Filter chips on the Work section. `match` is compared to project.category.
export const workFilters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Websites' },
  { id: 'seo', label: 'SEO' },
  { id: 'decks', label: 'Presentations' },
  { id: 'video', label: 'Video' },
  { id: 'social', label: 'Social' },
]

export const projects = [
  {
    slug: 'kaveri-dental',
    title: 'Kaveri Dental Care',
    category: 'web',
    categoryLabel: 'Website & local SEO',
    year: '2026',
    cover: '/work/kaveri-dental.svg',
    summary: 'A clinic website and local SEO push for a three-chair practice in Vijay Nagar.',
    result: 'Online bookings up 2.8× in four months',
    client: 'Kaveri Dental Care, Indore',
    services: ['Website design', 'Development', 'Local SEO'],
    duration: '3 weeks + ongoing SEO',
    challenge:
      'Most new patients found the clinic through word of mouth, then searched for it — and landed on an outdated listing with the wrong timings. The old site was a single page that took eight seconds to load on mobile.',
    approach:
      'We started with a working homepage preview built around the three questions patients actually ask: is it painful, what does it cost, and can I book today. A one-tap WhatsApp booking button replaced the contact form, and the Google Business Profile was rebuilt with real photos, services and answered questions.',
    outcome:
      'The new site loads in under a second on 4G. Within four months the clinic was in the local map pack for its main treatments, and online bookings had nearly tripled.',
    metrics: [
      { value: '2.8×', label: 'online bookings' },
      { value: '0.9s', label: 'mobile load time' },
      { value: 'Top 3', label: 'in local map results' },
    ],
  },
  {
    slug: 'northfield-realty',
    title: 'Northfield Realty investor deck',
    category: 'decks',
    categoryLabel: 'Corporate presentation',
    year: '2026',
    cover: '/work/northfield-realty.svg',
    summary: 'A 22-slide investor deck for a mid-size developer raising for its next project.',
    result: 'Round closed in six weeks',
    client: 'Northfield Realty',
    services: ['Story structure', 'Slide design', 'Data visualisation'],
    duration: '8 days',
    challenge:
      'The original deck was 41 slides of dense text and screenshotted spreadsheets. Investors were asking for a call just to understand the numbers.',
    approach:
      'I rewrote the narrative into one idea per slide, rebuilt every chart from the raw data, and designed a slide master the team could keep using for updates.',
    outcome:
      'The finished 22-slide deck went to twelve investors. The round closed in six weeks, and two investors asked who designed it.',
    metrics: [
      { value: '41 → 22', label: 'slides' },
      { value: '6 weeks', label: 'to close the round' },
      { value: '12', label: 'investor meetings' },
    ],
  },
  {
    slug: 'ember-and-oak',
    title: 'Ember & Oak Café',
    category: 'social',
    categoryLabel: 'Social media management',
    year: '2025',
    cover: '/work/ember-and-oak.svg',
    summary: 'Monthly content, reels and a new visual voice for a neighbourhood café.',
    result: '+4,100 followers in a quarter',
    client: 'Ember & Oak Café, Palasia',
    services: ['Content calendar', 'Reels', 'Post design', 'Reporting'],
    duration: 'Monthly retainer',
    challenge:
      'The owners posted when they remembered, usually late at night, and the feed looked like five different cafés.',
    approach:
      'A monthly calendar planned around the menu and local events, a fixed set of post templates in the café’s own colours, and two short reels a week shot on a phone during quiet hours.',
    outcome:
      'Followers grew by 4,100 in the first quarter, and weekend tables now regularly fill from Instagram enquiries.',
    metrics: [
      { value: '+4,100', label: 'followers in 90 days' },
      { value: '3.6×', label: 'average reel reach' },
      { value: '20', label: 'posts a month' },
    ],
  },
  {
    slug: 'above-malwa',
    title: 'Above Malwa',
    category: 'video',
    categoryLabel: 'Video editing',
    year: '2025',
    cover: '/work/above-malwa.svg',
    summary: 'A three-minute aerial brand film cut from 40 hours of drone footage.',
    result: '1.2M views across platforms',
    client: 'Independent drone studio, Indore',
    services: ['Edit', 'Colour grade', 'Sound design', 'Social cut-downs'],
    duration: '2 weeks',
    challenge:
      'Forty hours of beautiful footage and no story. The client needed one hero film plus short versions for reels and YouTube Shorts.',
    approach:
      'I built the edit around the course of a single day over the Malwa plateau, from dawn at the ghats to night traffic on the AB Road, then cut 9:16 versions that each work as their own story.',
    outcome:
      'The hero film and its cut-downs passed 1.2 million views and brought the studio three new commercial bookings in the following month.',
    metrics: [
      { value: '1.2M', label: 'views' },
      { value: '40h → 3m', label: 'footage to final cut' },
      { value: '6', label: 'platform versions' },
    ],
  },
  {
    slug: 'cardiosummit',
    title: 'CardioSummit 2026',
    category: 'web',
    categoryLabel: 'Conference website',
    year: '2026',
    cover: '/work/cardiosummit.svg',
    summary: 'A conference site with a filterable scientific schedule, faculty pages and live Q&A.',
    result: '1,400 delegates, almost no schedule queries',
    client: 'CardioSummit organising committee',
    services: ['Website design', 'Development', 'Content structure'],
    duration: '4 weeks',
    challenge:
      'Three days, four halls and over 120 sessions. Last year the schedule was a PDF, and the organising team spent the conference answering phone calls about where to go next.',
    approach:
      'A schedule that filters by day, hall and topic, faculty pages linked to every session, and a simple form for delegates to send questions to speakers — all fast enough to use on hotel Wi-Fi.',
    outcome:
      '1,400 delegates registered through the site, and the team reported almost no schedule queries during the event itself.',
    metrics: [
      { value: '1,400', label: 'registrations' },
      { value: '120+', label: 'sessions, searchable' },
      { value: '4', label: 'halls, one schedule' },
    ],
  },
  {
    slug: 'pathshala-academy',
    title: 'Pathshala Academy',
    category: 'seo',
    categoryLabel: 'SEO',
    year: '2025',
    cover: '/work/pathshala-academy.svg',
    summary: 'A search-led rebuild for a coaching institute competing with national brands.',
    result: 'Page one for 31 local keywords',
    client: 'Pathshala Academy, Bhanwarkuan',
    services: ['Technical SEO', 'Content strategy', 'Landing pages'],
    duration: '6 months',
    challenge:
      'National coaching brands were outranking a local institute with better results, simply because their sites were built for search and this one wasn’t.',
    approach:
      'A technical clean-up, one landing page per course and exam written around real student questions, and a results page with verifiable toppers that other sites started linking to.',
    outcome:
      'After six months the institute ranked on page one for 31 local keywords, and organic enquiries replaced most of its paid ad spend.',
    metrics: [
      { value: '31', label: 'page-one keywords' },
      { value: '+212%', label: 'organic traffic' },
      { value: '−60%', label: 'ad spend' },
    ],
  },
]

export const process = [
  {
    title: 'A 20-minute call',
    body: 'You tell me what isn’t working. I ask about your customers, not your colours. You get a fixed quote within 24 hours.',
  },
  {
    title: 'A free working preview',
    body: 'Before you pay anything, I build a first version you can click through. If it isn’t right, you walk away owing nothing.',
    highlight: true,
  },
  {
    title: 'Build and refine',
    body: 'We work in short rounds on a shared preview link, so you see progress every few days instead of one big reveal at the end.',
  },
  {
    title: 'Launch and look after',
    body: 'I handle hosting, domains and handover, then check in at 30 and 90 days with what’s working and what to fix next.',
  },
]

export const testimonials = [
  {
    quote:
      'Shubham showed us the finished homepage before we had paid a rupee. We signed that afternoon. Four months later, half our new patients say they found us on Google.',
    name: 'Dr. Ananya Kulkarni',
    role: 'Founder, Kaveri Dental Care',
  },
  {
    quote:
      'He cut our deck from 41 slides to 22 and somehow it says more. Two of the investors asked who designed it.',
    name: 'Rohan Mehta',
    role: 'Director, Northfield Realty',
  },
  {
    quote:
      'We used to post whenever we remembered. Now there is a calendar, the reels actually look like us, and weekend tables fill up from Instagram.',
    name: 'Priya & Kabir Joshi',
    role: 'Owners, Ember & Oak Café',
  },
  {
    quote:
      'Delegates found their sessions without calling us, which alone made it worth it. Fast, calm, and he answered WhatsApp at 11pm during conference week.',
    name: 'Dr. Sanjay Verma',
    role: 'Organising Secretary, CardioSummit 2026',
  },
]

export const budgets = ['Under ₹25k', '₹25k–60k', '₹60k–1.5L', '₹1.5L+', 'Not sure yet']

// Section ids used by the navigation
export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
]
