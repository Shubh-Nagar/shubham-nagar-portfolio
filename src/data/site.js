/**
 * ------------------------------------------------------------------
 *  SITE CONTENT
 *  Everything you'd want to edit lives in this one file: your details,
 *  services, projects, process and testimonials.
 *
 *  Anything written as ph('…') shows on the site as a marked
 *  [PLACEHOLDER: …] and is listed by `npm run build` — replace each one
 *  with the real thing (or remove it) before going live. Never swap a
 *  placeholder for a number or quote that isn't real.
 * ------------------------------------------------------------------
 */

export const PLACEHOLDER_PREFIX = '[PLACEHOLDER'
export const ph = (what) => `${PLACEHOLDER_PREFIX}: ${what}]`
export const isPlaceholder = (value) => typeof value === 'string' && value.startsWith(PLACEHOLDER_PREFIX)

export const profile = {
  name: 'Shubham Nagar',
  shortName: 'Shubham',
  role: 'Designer & developer',
  location: 'Indore, Madhya Pradesh',
  email: 'shubham.nagar2001@gmail.com', // switch to a @shubhamnagar.in address once domain email is set up
  // Digits only, with country code — used for every WhatsApp link on the site
  whatsappNumber: '919321732524',
  phone: '+91 93217 32524', // shown on the site and used for tap-to-call
  hours: 'Mon–Sat, 10am–7pm IST',
  // Put a photo at /public/me.jpg and set this to '/me.jpg'
  photo: null,
  // Optional: paste a Formspree / Web3Forms / Getform endpoint to receive
  // form submissions directly. If left empty, the form opens the visitor's
  // email app with the message pre-filled instead.
  formEndpoint: '',
  // Shown in the nav menu, contact section and footer, and linked in Google's structured data
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shubham-nagar05', icon: 'linkedin' },
    // Add when ready — icons for these already exist:
    // { label: 'Instagram', href: 'https://www.instagram.com/<handle>', icon: 'instagram' },
    // { label: 'GitHub', href: 'https://github.com/<username>', icon: 'github' },
  ],
}

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export const whatsappLink = (text = '') =>
  `https://wa.me/${profile.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`

export const previewMessage = "Hi Shubham, I'd like a free preview for my business."

export const hero = {
  eyebrow: 'Engineer + designer · Indore',
  // Each string is one line of the headline (lines animate in one by one)
  headline: ['See it first,', 'then decide.'],
  tagline: 'Pehle dekhiye, phir decide kijiye.',
  intro:
    "I'm Shubham, an engineer who designs. I help clinics, event organisers and local brands look and work like serious businesses online — website, Google search, decks, video and social, from one person instead of five vendors.",
}

// The strip right under the hero: who the work is for, and what it's built with
export const proof = {
  sectors: ['Doctors & clinics', 'Hospitals & colleges', 'Medical conferences', 'Event companies', 'Creators', 'Local brands'],
  stats: [
    { value: ph('number'), label: 'websites shipped' },
    { value: '2.5 yrs', label: 'building for businesses' },
    { value: '1', label: 'person, start to finish' },
  ],
  tools: ['React', 'Next.js', 'Framer Motion', 'Node.js', 'Python', 'AWS', 'Selenium', 'OCR', 'Power BI', 'Gemini Vision', 'Llama 3.3', 'Figma', 'Search Console'],
}

export const about = {
  title: 'I turn messy, manual things into clean systems people trust.',
  story: [
    'I trained as an electronics engineer at NMIMS in Mumbai, then joined a Mumbai startup where the job was untangling how the business actually ran. I built a timesheet platform, a billing system that reads documents on its own using OCR, reporting that updates itself, and an AI agent — deployed on AWS.',
    'Today I run the websites of a university and healthcare group in Madhya Pradesh: a university, a medical college, a hospital and an NGO. Sites that real people rely on, kept fast, secure and up to date.',
    "Alongside that, I help businesses in Indore look and work like serious brands. Most designers can't build the system behind the page. Most developers can't design the page, cut the video or make the deck. I do both — so you deal with one person, not five.",
  ],
  facts: [
    { label: 'Currently', value: 'Running the websites of a university & healthcare group in MP' },
    { label: 'Before that', value: 'Automation & internal tools at a Mumbai startup' },
    { label: 'Studied', value: 'B.Tech, Electronics & Telecom — NMIMS (MPSTME), 2024' },
    { label: 'Based in', value: 'Indore — working with clients anywhere' },
  ],
  // ← check these match the tools you actually use
  skills: [
    { group: 'Design', items: ['Figma', 'Design systems', 'UI & UX', 'Motion'] },
    { group: 'Build', items: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'AWS'] },
    { group: 'Automate', items: ['Python', 'Selenium', 'OCR', 'Power BI', 'LLM agents'] },
    { group: 'Grow & create', items: ['Technical SEO', 'Google Business Profile', 'Search Console', 'Video editing', 'Presentations'] },
  ],
}

// `icon` maps to a lucide-react icon in Services.jsx.
// `short` is the business outcome; the rest is how you get there.
export const services = [
  {
    id: 'web',
    icon: 'web',
    title: 'Website design & development',
    short: 'More calls and bookings from people who find you online.',
    description:
      'A custom site written for your customers, built to load fast on a phone, with WhatsApp and call buttons where people expect them. You click through a working preview before you pay anything.',
    deliverables: ['Custom design, no templates', 'Mobile-first build', 'WhatsApp and call buttons wired in', 'Hosting, domain and handover'],
    timeline: '2–4 weeks', // ← adjust to what you quote
  },
  {
    id: 'seo',
    icon: 'seo',
    title: 'SEO',
    short: 'Show up when people nearby search for what you do.',
    description:
      'Technical fixes, a properly set-up Google Business Profile, and pages that answer the questions people actually type. Reported monthly in plain language — what moved, and what to do next.',
    deliverables: ['Technical audit and fixes', 'Google Business Profile setup', 'Local search pages', 'Monthly plain-language report'],
    timeline: 'Ongoing, monthly',
  },
  {
    id: 'decks',
    icon: 'decks',
    title: 'Corporate presentations',
    short: 'Pitches that make the point before attention drifts.',
    description:
      'Pitch decks, sales presentations and conference talks. I fix the story first, then design each slide to carry one idea — with a master your team can keep using.',
    deliverables: ['Story and structure pass', 'Custom slide master', 'Charts and diagrams redrawn', 'PowerPoint, Keynote or PDF'],
    timeline: '5–10 days', // ← adjust to what you quote
  },
  {
    id: 'video',
    icon: 'video',
    title: 'Video editing',
    short: 'Footage turned into reels and films people watch to the end.',
    description:
      'From raw footage to finished cut: pacing, colour, sound and captions, delivered in a version sized for every platform you post on.',
    deliverables: ['Edit, colour and sound', 'Captions', '9:16, 1:1 and 16:9 cuts', 'Revision rounds included'],
    timeline: 'Per video', // ← adjust to what you quote
  },
  {
    id: 'social',
    icon: 'social',
    title: 'Social media management',
    short: 'A steady, recognisable presence without you living on your phone.',
    description:
      'A monthly content plan, designed posts and reels, captions and scheduling, and a short report on what worked and what to do more of.',
    deliverables: ['Monthly content plan', 'Designed posts and reels', 'Captions and scheduling', 'Monthly insights report'],
    timeline: 'Monthly retainer',
  },
]

// What the engineering background adds on top of the five services.
// `icon` maps to a lucide-react icon in Services.jsx.
export const engineering = {
  title: 'And because I’m an engineer',
  intro: 'The part most designers can’t do: the system behind the page.',
  items: [
    {
      icon: 'automate',
      title: 'Automate the manual work',
      body: 'Billing, data entry, document reading, follow-ups — the repetitive jobs your staff do by hand, done by software instead.',
    },
    {
      icon: 'dashboards',
      title: 'Reports that build themselves',
      body: 'Dashboards that pull from your existing data and update on their own, so the numbers are ready before the meeting.',
    },
    {
      icon: 'ai',
      title: 'AI tools that are actually useful',
      body: 'Assistants and tools built on modern AI models — reading labels, documents and forms so people don’t have to.',
    },
  ],
}

// Filter chips on the Work section, matched against project.category.
// Chips with no matching projects are hidden automatically.
export const workFilters = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Websites' },
  { id: 'decks', label: 'Decks' },
  { id: 'video', label: 'Video' },
  { id: 'product', label: 'Products' },
]

/**
 * Case studies (/work/:slug). Clients are anonymised until you confirm
 * which ones can be named. Set `hidden: true` to keep a project off the site.
 *
 * cover: '/work/<file>' screenshot (null shows a neutral placeholder)
 * url:   live link (null hides the button)
 */
const allProjects = [
  {
    slug: 'pulmonologist-clinic',
    title: 'A pulmonologist’s clinic website',
    category: 'web',
    categoryLabel: 'Website',
    year: null,
    // Illustrative mockup until a real screenshot is ready — replace /work/pulmonologist-clinic.jpg and drop this flag
    cover: '/work/pulmonologist-clinic.jpg',
    coverIsMockup: true,
    url: null,
    summary: 'A custom website for a pulmonologist in Indore, with its own design system and a signature “breathing” animation.',
    result: ph('result, e.g. what changed for the clinic'),
    client: 'Pulmonologist, Indore',
    services: ['Design system', 'Website design', 'Development'],
    duration: ph('timeline'),
    challenge: ph('what wasn’t working for the doctor before'),
    approach:
      'A custom design system built for a medical practice — calm, clear and easy to read on a phone — and a signature animation that slowly “breathes”, tying the brand to what the doctor treats.',
    outcome: ph('the result, in the client’s terms'),
    metrics: [],
  },
  {
    slug: 'dental-clinic',
    title: 'Dental clinic website + clinic template',
    category: 'web',
    categoryLabel: 'Website',
    year: null,
    cover: '/work/dental-clinic.jpg',
    url: 'https://dental-sample-indore.vercel.app/',
    summary: 'A website for a dental clinic, and a reusable, demo-first template that lets any clinic see its own site before committing.',
    result: ph('result'),
    client: 'Dental clinic',
    services: ['Website design', 'Development', 'Reusable template'],
    duration: ph('timeline'),
    challenge: ph('what wasn’t working for the clinic before'),
    approach:
      'A clinic website built around what patients actually want to know, then generalised into a template: drop in a new clinic’s name, treatments and photos, and they get a working preview of their own site.',
    outcome: ph('the result, in the client’s terms'),
    metrics: [],
  },
  {
    slug: 'medical-conference',
    title: 'Medical conference website',
    category: 'web',
    categoryLabel: 'Conference website',
    year: '2026',
    cover: '/work/medical-conference.jpg',
    url: 'https://icaaicon2026.com/',
    summary: 'The website for a national medical conference held in Indore in 2026.',
    result: ph('result, e.g. registrations through the site'),
    client: 'Medical conference organising committee, Indore',
    services: ['Website design', 'Development', 'Content structure'],
    duration: ph('timeline'),
    challenge: ph('what the organisers needed the site to solve'),
    approach: ph('what you built — schedule, registration, faculty pages…'),
    outcome: ph('the result, in the organisers’ terms'),
    metrics: [],
  },
  {
    slug: 'conference-pitch-deck',
    title: 'Conference pitch deck',
    category: 'decks',
    categoryLabel: 'Corporate presentation',
    year: null,
    // Illustrative mockup until a real screenshot is ready — replace /work/conference-pitch-deck.jpg and drop this flag
    cover: '/work/conference-pitch-deck.jpg',
    coverIsMockup: true,
    url: null,
    summary: 'A pitch deck for an events company, used to win conference business.',
    result: ph('result'),
    client: 'Events company',
    services: ['Story structure', 'Slide design'],
    duration: ph('timeline'),
    challenge: ph('what the events company needed the deck to do'),
    approach: ph('how you structured and designed it'),
    outcome: ph('the result, in the client’s terms'),
    metrics: [],
  },
  {
    slug: 'cleanlabel-ai',
    title: 'CleanLabel AI',
    category: 'product',
    categoryLabel: 'Product · AI',
    year: null,
    // Illustrative mockup until a real screenshot is ready — replace /work/cleanlabel-ai.jpg and drop this flag
    cover: '/work/cleanlabel-ai.jpg',
    coverIsMockup: true,
    url: null,
    summary: 'A food-label transparency tool: photograph a label and it reads the ingredients for you using Gemini Vision OCR.',
    result: ph('result or current status'),
    client: 'Own product',
    services: ['Product design', 'Development', 'AI integration'],
    duration: ph('timeline'),
    challenge:
      'Food labels are written to be technically complete, not understood. Most people can’t tell what half the ingredients are, or why they’re there.',
    approach:
      'Point a phone at a label: Gemini Vision reads the text, the tool pulls out the ingredients and explains them in plain language.',
    outcome: ph('result or current status'),
    metrics: [],
  },
  {
    slug: 'evidence-portal',
    title: 'Research evidence portal',
    category: 'product',
    categoryLabel: 'Platform',
    year: null,
    // Illustrative mockup until a real screenshot is ready — replace /work/evidence-portal.jpg and drop this flag
    cover: '/work/evidence-portal.jpg',
    coverIsMockup: true,
    url: null,
    summary: 'A research platform for AYUSH (traditional medicine) studies, with a built-in system for grading the strength of the evidence.',
    result: ph('result'),
    client: ph('client, or “anonymised”'),
    services: ['Platform design', 'Development', 'Evidence grading system'],
    duration: ph('timeline'),
    challenge: ph('what problem the portal solves for researchers'),
    approach:
      'A searchable research platform where every study is graded on the strength of its evidence, so readers can tell a strong finding from a weak one at a glance.',
    outcome: ph('the result'),
    metrics: [],
  },
  // Not shown until you decide — set hidden: false to include
  {
    slug: 'videographer-portfolio',
    hidden: true,
    title: 'Cinematic portfolio for a videographer',
    category: 'web',
    categoryLabel: 'Website',
    year: null,
    cover: null,
    url: null,
    summary: 'A dark, cinematic portfolio for a videographer and drone pilot, with Framer Motion and particle effects.',
    result: ph('result'),
    client: 'Videographer & drone pilot',
    services: ['Website design', 'Development', 'Motion'],
    duration: ph('timeline'),
    challenge: ph('what the videographer needed'),
    approach: 'A dark, cinematic site that lets the footage lead, with Framer Motion transitions and particle effects for atmosphere.',
    outcome: ph('the result'),
    metrics: [],
  },
  {
    slug: 'cat-mentor-portfolio',
    hidden: true,
    title: 'Portfolio for a CAT mentor',
    category: 'web',
    categoryLabel: 'Website',
    year: null,
    cover: null,
    url: null,
    summary: 'A personal site for a CAT mentor, with a scroll-driven journey line and animated score rings.',
    result: ph('result'),
    client: 'CAT mentor',
    services: ['Website design', 'Development', 'Motion'],
    duration: ph('timeline'),
    challenge: ph('what the mentor needed'),
    approach: 'A journey line that draws itself as you scroll through the mentor’s story, and animated score rings that make results tangible.',
    outcome: ph('the result'),
    metrics: [],
  },
  {
    slug: 'gst-reconciliation',
    hidden: true,
    title: 'GST reconciliation tool',
    category: 'product',
    categoryLabel: 'Product · Automation',
    year: null,
    cover: null,
    url: null,
    summary: 'Accounting software that reconciles GST records, using OCR to read invoices instead of typing them in.',
    result: ph('result'),
    client: ph('client, or “own product”'),
    services: ['Product design', 'Development', 'OCR automation'],
    duration: ph('timeline'),
    challenge: ph('what was slow or error-prone before'),
    approach: 'Invoices are read with OCR and matched against GST records automatically, leaving people to check only the mismatches.',
    outcome: ph('the result'),
    metrics: [],
  },
]

export const projects = allProjects.filter((p) => !p.hidden)

// Mockups say so, so nobody mistakes them for the shipped site
export const coverAlt = (p) =>
  p.coverIsMockup ? `${p.title} — illustrative preview` : `${p.title} — full-page screenshot of the live site`

export const process = [
  {
    title: 'A short call',
    body: 'You tell me what isn’t working. I ask about your customers, not your colours. You get a clear, fixed quote.',
  },
  {
    title: 'A free working preview',
    body: 'Before you pay anything, I build a first version you can click through. If it isn’t right, you walk away owing nothing.',
    highlight: true,
  },
  {
    title: 'Build it together',
    body: 'We work in short rounds on a shared preview link, so you see progress every few days instead of one big reveal at the end.',
  },
  {
    title: 'Launch and look after',
    body: 'I handle hosting, domain and handover, then check in after launch with what’s working and what to fix next.',
  },
]

// Replace with real quotes (with the client's permission). Delete any you don't have.
export const testimonials = [
  { quote: ph('a real quote from a client'), name: ph('client name'), role: ph('role, business') },
  { quote: ph('a real quote from a client'), name: ph('client name'), role: ph('role, business') },
]

export const budgets = ['Under ₹25k', '₹25k–60k', '₹60k–1.5L', '₹1.5L+', 'Not sure yet']

// Section ids used by the navigation
export const navLinks = [
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'How it works' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
  { id: 'notes', label: 'Notes' },
  { id: 'contact', label: 'Contact' },
]
