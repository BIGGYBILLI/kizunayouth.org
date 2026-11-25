// All copy, people and links for Kizuna Youth Project live here.

/** Public asset path, correct at the domain root and under the Pages subpath. */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

/** The site is served from `/` locally and from `/<repo>/` on GitHub Pages. */
export const BASE = import.meta.env.BASE_URL
/** Link to a page (`''` for the home page), correct under any base path. */
export const pageHref = (path = '') => `${BASE}${path.replace(/^\/+/, '')}`
/** Link to a section on the home page from anywhere in the site. */
export const homeHref = (hash = '') => `${BASE}${hash}`

const mailto = (subject: string, body?: string) =>
  `mailto:kizunayouth.co@gmail.com?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`

export const SITE = {
  name: 'Kizuna Youth Project',
  kanji: '絆',
  reading: 'kizuna',
  meaning: 'bond',
  tagline: 'By students. For students. Across borders.',
  email: 'kizunayouth.co@gmail.com',
  instagram: { handle: '@kizunayouth.co', href: 'https://www.instagram.com/kizunayouth.co/' },
  instagramShort: '@kizunayouth.co',
  regions: ['India', 'Philippines', 'Bangladesh'],
}

export const NAV = [
  { label: 'Story', href: homeHref('#story') },
  { label: 'Guidance', href: homeHref('#guidance') },
  { label: 'Team', href: homeHref('#team') },
  { label: 'Services', href: pageHref('services/') },
  { label: 'Workshop', href: pageHref('workshop/') },
]

export const HERO = {
  kicker: 'A student-led consultancy · 日本',
  titleBefore: 'The bond that',
  titleAccent: 'carries you',
  titleAfter: 'to Japan',
  lead: 'Kizuna guides students from India, the Philippines and Bangladesh into Japanese universities — the language, the scholarships, the paperwork, and the confidence to begin.',
  primary: { label: 'Explore guidance', href: '#guidance' },
  secondary: { label: 'Meet the team', href: '#team' },
  chips: ['Language & culture', 'University & scholarship guidance', 'Free school workshops'],
}

/** The quiet proof panel in the hero, in place of the old 3D rings. */
export const HERO_PANEL = {
  eyebrow: 'The bond in practice',
  title: 'A bond measured in',
  titleAccent: 'classrooms.',
  jp: '日本と世界 — Japan and the world',
  stats: [
    { value: '3', label: 'Countries', note: 'India, the Philippines and Bangladesh. Brunei has just begun.' },
    { value: '20', label: 'Volunteers in India', note: 'Students teaching students, in their own classrooms.' },
    { value: '2', label: 'Partner schools', note: 'Two-day workshops in Araria, Bihar — each with a certificate of appreciation.' },
  ],
  footnote: {
    label: 'Sakura Quest 2026',
    body: 'Our founder and co-founder interpreted live for Japanese universities and high schools.',
  },
  link: { label: 'See our work so far', href: `${pageHref('workshop/')}#work` },
}

export const MEANING = {
  kanji: '絆',
  reading: 'きずな · kizuna',
  gloss: 'noun — a bond; a tie that holds people together.',
  title: 'One connection can change a direction.',
  lines: [
    'Kizuna is not the bond you are born into. It is the one that finds you at the right moment — a teacher, a friend, a workshop, an open door — and quietly bends a future toward something larger.',
    'We have watched it happen. A student who had never met anyone from Japan finds a language they love, then a scholarship, then a plane ticket. The distance between a small town and a Japanese campus turns out to be shorter than it looked.',
  ],
  quote: 'Access to opportunity should not depend on who you know, or where you come from.',
  quoteAttribution: 'The belief Kizuna was built on',
  facts: [
    { key: 'Student-led', body: 'Founded and run by students, for students — not by an agency far from the classroom.' },
    { key: 'Free at schools', body: 'A workshop costs a school nothing. We bring the material, the people and the energy.' },
    { key: 'Across borders', body: 'India, the Philippines and Bangladesh today, with more countries in the works.' },
  ],
}

export const PILLARS = [
  {
    index: '01',
    jp: '日本語',
    title: 'Japanese language & culture',
    body: 'Japanese is more than an entrance requirement. It is how a place starts to make sense. We build a weekly study rhythm around your current level — kana to kanji, listening to speaking — and pair it with the culture that makes the language worth learning.',
    points: ['Kana, kanji and reading practice', 'JLPT level planning', 'Culture, etiquette and daily life'],
  },
  {
    index: '02',
    jp: '大学',
    title: 'Study in Japan guidance',
    body: 'Universities, scholarships, entrance routes and the documents that decide them. We help you find programmes that fit your grades and your budget, then work backwards to a realistic timeline — including English-taught degrees where Japanese is not yet the barrier.',
    points: ['University and programme shortlisting', 'Scholarship and funding routes', 'Applications, essays and interviews'],
  },
  {
    index: '03',
    jp: '学校',
    title: 'Free school workshops',
    body: 'Peer-led sessions that bring Japan into the classroom: an introduction to the language, a first look at studying abroad, and honest answers from students who are doing it. Free for schools, wherever we can reach them.',
    points: ['Free for schools', 'Peer-led, in your classroom', 'Language, culture and study pathways'],
  },
]

export const STORY = {
  eyebrow: 'The story',
  titleBefore: 'It began with a language',
  titleAccent: 'nobody could teach.',
  blocks: [
    {
      label: 'Where it began',
      body: 'Kizuna started in ordinary classrooms. Free workshops, run by students, in schools where almost nobody had met a person who had studied in Japan. No budget, no office — just a projector, a whiteboard and a room of curious teenagers.',
    },
    {
      label: 'The belief underneath',
      body: 'Talent is spread evenly. Guidance is not. A student in a small town can be every bit as capable as one in a capital city, and still never hear that a Japanese university, or a scholarship that covers it, was ever an option. Closing that information gap is the whole point.',
    },
    {
      label: 'Where we are now',
      body: 'Those first workshops have grown into something wider: young people across India, the Philippines and Bangladesh learning the language, comparing universities and preparing applications together. Different time zones, the same ambition.',
    },
    {
      label: "What's next",
      body: 'More schools, more countries, more students who get to choose Japan instead of only hearing about it. This is still the beginning — and there is deliberately room in it for you.',
    },
  ],
  pullQuote:
    'What began as guesswork is now a mission: to be the guide I never had.',
  pullQuoteBy: 'Md Shadur Rahman “Haru”, founder',
}

export type Step = { index: string; jp: string; title: string; body: string; detail: string }

export const GUIDANCE = {
  eyebrow: 'How we guide',
  titleBefore: 'A path, not a',
  titleAccent: 'pile of forms.',
  intro:
    'Most students do not need more information. They need a sequence. Ours starts with an honest conversation and ends with you on a plane, knowing what happens when you land.',
  steps: [
    {
      index: '01',
      jp: 'はじまり',
      title: 'Where you are now',
      body: 'One free conversation about your grades, your Japanese level, your family budget and what you actually want from the next four years.',
      detail: 'A short written plan after the call, so nothing stays only in your head.',
    },
    {
      index: '02',
      jp: '言葉',
      title: 'A language plan',
      body: 'A target JLPT level and a weekly study rhythm that survives school, exams and real life. We point you at materials that work and check in on the way.',
      detail: 'Kana to kanji, listening to speaking — sequenced, not scattered.',
    },
    {
      index: '03',
      jp: '選択',
      title: 'The shortlist',
      body: 'Universities and programmes matched to your record and your wallet, including English-taught degrees and scholarship routes worth the application.',
      detail: 'A realistic shortlist of reach, match and safe options — with deadlines.',
    },
    {
      index: '04',
      jp: '書類',
      title: 'Application & documents',
      body: 'Statement of purpose, transcripts, translations, recommendation letters and the small formatting decisions that quietly decide outcomes.',
      detail: 'Every document reviewed before it leaves your hands.',
    },
    {
      index: '05',
      jp: '出発',
      title: 'Interview & departure',
      body: 'Mock interviews in Japanese or English, then the practical end: certificate of eligibility, visa paperwork, housing and what to pack.',
      detail: 'We stay reachable until you are settled on campus.',
    },
  ] as Step[],
}

export type Member = {
  slug: string
  name: string
  nickname?: string
  role: string
  jp: string
  photo: string
  photoAlt: string
  tags: string[]
  summary: string
  bio: string[] | null
  quote?: string
}

export const TEAM = {
  eyebrow: 'The people',
  titleBefore: 'Meet our',
  titleAccent: 'team members.',
  intro:
    'The students and recent students behind Kizuna, across three countries. Open a portrait to read the profile.',
  members: [
    {
      slug: 'haru',
      name: 'Md Shadur Rahman',
      nickname: '“Haru”',
      role: 'Founder',
      jp: '創設者',
      photo: asset('images/team/haru.webp?v=3'),
      photoAlt: 'Portrait of Md Shadur Rahman, founder of Kizuna Youth Project',
      tags: ['N2-level Japanese', 'Japanese–English interpreter', 'World–Japan bridge builder', 'Japanese & English teacher'],
      summary:
        'Taught himself Japanese where there was no one to teach it, then built Kizuna so the next student would not have to walk that road alone.',
      bio: [
        'Haru learned Japanese in a town where nobody at his school could teach it and nobody at home could check whether he was getting it right. There was no roadmap — only a language he wanted badly enough to keep returning to. Every small step taught him the same lesson: a dream does not need permission, only effort.',
        'That loneliness became the blueprint. Today he teaches Japanese, interprets between Japanese and English, and leads Kizuna’s free workshops in schools — the guide he wishes he had had. The work is simple and stubborn: put the language, the scholarships and the honest version of the journey in front of students who would otherwise never hear about them.',
        'His conviction has not changed since the first classroom. Where a student comes from should not set the ceiling on where they can go, and a small town is not a small dream. Kizuna is the bond between those students and Japan, built one workshop at a time.',
      ],
      quote: 'Because somewhere, a student is guessing their way through Japanese right now. They shouldn’t have to do it alone.',
    },
    {
      slug: 'areen',
      name: 'Areen Joy Lahari',
      role: 'Co-founder',
      jp: '共同創設者',
      photo: asset('images/team/areen.webp?v=3'),
      photoAlt: 'Portrait of Areen Joy Lahari, co-founder of Kizuna Youth Project',
      tags: ['Travelled to Japan at 17', 'JLPT N3 certified', 'Guiding students to Japan'],
      summary:
        'Travelled to Japan at seventeen, passed JLPT N3, and now helps other students take the same step.',
      bio: [
        'One summer night in Class 5 or 6, Areen wondered whether studying in Japan might one day be possible. What began as a passing fascination turned into years of learning Japanese, hunting for opportunities and, at seventeen, a journey to Japan itself.',
        'That journey also showed the harder side of the dream: how difficult it is to find the right guidance when you do not know where to begin, and how many students are never told the door exists at all. Kizuna exists to close that gap.',
        'So Areen co-founded Kizuna Youth Project. Through free workshops, the team carries Japanese language learning and real educational opportunities into schools, helping students discover possibilities beyond the ones already in front of them.',
      ],
      quote: 'Because every student deserves the chance to explore a dream, even if they don’t yet know where it might lead.',
    },
    {
      slug: 'iftekhar',
      name: 'Iftekhar Mahmud Razwan',
      role: 'Bangladesh Country Representative',
      jp: 'バングラデシュ代表',
      photo: asset('images/team/iftekhar.webp'),
      photoAlt: 'Portrait of Iftekhar Mahmud Razwan, Bangladesh country representative',
      tags: ['Representative of Bangladesh', 'Bridging Bangladesh & Japan', 'Environment activist', 'Guiding students to Japan'],
      summary:
        'Kizuna’s representative in Bangladesh, building the bridge between Bangladeshi students and Japanese universities.',
      bio: [
        'Growing up, Iftekhar was drawn to Japan long before he had any plan for getting there — the bonsai trees and tatami, the ancient shrines, the quiet of rural Japan and the bright noise of Tokyo at night. Somewhere along the way, that childhood dream got buried under more practical things.',
        'Kizuna is how he picked it back up, and how he makes sure other students in Bangladesh do not have to bury theirs. As country representative he builds the bridge between Bangladeshi schools and Japan: free workshops, language learning, scholarship guidance, and a student-led team that answers the questions nobody else does.',
        'His message to a student reading this is simple. You do not need a big city or a big budget, only a first step — and you do not have to take it alone. Kizuna can be the bridge for that dream.',
      ],
      quote: 'Every dream you once left as a child deserves to be a reality.',
    },
  ] as Member[],
}

export const FAQ = [
  {
    q: 'Do I need to speak Japanese already?',
    a: 'No. Most students start at zero. What matters is the willingness to study consistently, because Japanese takes time. Some Japanese-taught programmes will ask for JLPT N2 eventually; English-taught programmes often will not. We plan around whichever route fits you.',
  },
  {
    q: 'Which countries do you work with?',
    a: 'Today we work with students in India, the Philippines and Bangladesh, and we are growing. If you are nearby and unsure whether we can help, write to us anyway — we will tell you honestly.',
  },
  {
    q: 'Are your school workshops really free?',
    a: 'Yes. Workshops for schools cost the school nothing. We are student-led and run them because access to this information should not depend on a school’s budget.',
  },
  {
    q: 'What is the JLPT, and do I need it?',
    a: 'The Japanese-Language Proficiency Test runs from N5 (beginner) to N1. Many university and scholarship routes ask for N2 or N1, while some English-taught degrees ask for none. We help you pick a target level and a realistic date to sit it.',
  },
  {
    q: 'Can my school host a workshop?',
    a: 'Very likely. Send us a message on Instagram or email with your school, city and the age group you teach, and we will work out a date and a format that fits your timetable.',
  },
  {
    q: 'When should I start?',
    a: 'Twelve to eighteen months before your intended intake is comfortable. Language progress, documents and scholarship deadlines all need room. If you are later than that, talk to us — there is usually still a route, just a narrower one.',
  },
]

export const CONTACT = {
  eyebrow: 'Say hello',
  titleBefore: 'Let’s start with',
  titleAccent: 'one conversation.',
  body: 'Whether you are a student wondering if Japan is possible, a parent with questions, or a school that would like a free workshop — send a message. A real person from the team will answer.',
  emailLabel: 'Email us',
  instagramLabel: 'Follow and DM',
  note: 'We reply from kizunayouth.co@gmail.com. Please include your country, your school or university, and what you would like help with.',
}

export const FOOTER = {
  statement: 'By students. For students. Across borders.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Story', href: homeHref('#story') },
        { label: 'Guidance', href: homeHref('#guidance') },
        { label: 'Team', href: homeHref('#team') },
        { label: 'Services', href: pageHref('services/') },
        { label: 'Workshop', href: pageHref('workshop/') },
        { label: 'FAQ', href: homeHref('#faq') },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} Kizuna Youth Project`,
}

/* ────────────────────────── Student services page ────────────────────────── */

export type ServiceEntry = {
  index: string
  jp: string
  title: string
  bestFor: string
  body: string
  points: string[]
  note?: string
}

export const SERVICES_PAGE = {
  eyebrow: 'Student services · 日本',
  titleBefore: 'Your path to Japan, guided by',
  titleAccent: 'students who walked it first.',
  lead: 'One-to-one help for students, professionals and families — online, wherever you are. Choose a single service or combine them as your journey grows. Pricing is shared when you enquire.',
  chips: ['Counselling', 'Applications', 'Language', 'Visa'],
  cta: { label: 'Enquire about a service', href: mailto('Student services enquiry') },
  note: 'Not sure where to start? Begin with the Roadmap Package or a counselling session — we will help you decide what comes next.',
  why: {
    eyebrow: 'Why Kizuna',
    titleBefore: 'Someone who has done it,',
    titleAccent: 'sitting beside you.',
    items: [
      {
        key: 'Japanese nationals beside us',
        body: 'Japanese colleagues help guide our work, so what we tell you is current and grounded in how things really work in Japan.',
      },
      {
        key: 'Real interpreting experience',
        body: 'At Sakura Quest 2026 our founder and co-founder interpreted live for Japanese universities and high schools.',
      },
      {
        key: 'Honest, personal guidance',
        body: 'We never promise admission or a scholarship. You get clear information, a real plan and someone to ask.',
      },
    ],
  },
  glance: {
    eyebrow: 'At a glance',
    title: 'Seven services, one thread.',
    intro: 'Every service is one-to-one and can be done online. Pick one, or combine them.',
  },
  services: [
    {
      index: '01',
      jp: '計画',
      title: 'Japan Roadmap Package',
      bestFor: 'Best for students at the very start',
      body: 'A personal plan for Japan built from your own profile, with one-to-one guidance and a month of support behind it.',
      points: [
        'Profile assessment: strengths, gaps and realistic options',
        'One-to-one guidance session, 45 to 60 minutes',
        'A personal roadmap with exams, documents and deadlines',
        '30 days of doubt-solving by private chat',
        'One follow-up check-in to update the roadmap',
      ],
    },
    {
      index: '02',
      jp: '相談',
      title: 'Individual Counselling',
      bestFor: 'Best for anyone with questions about Japan',
      body: 'A one-to-one session with a team member who has been through the process themselves.',
      points: [
        'Talk through your goals: university, language school, scholarships or work',
        'Honest advice on your options and what to expect',
        'Answers to your questions about life and study in Japan',
        'A clear idea of your next steps',
      ],
    },
    {
      index: '03',
      jp: '出願',
      title: 'University Application Support',
      bestFor: 'Best for students ready to apply',
      body: 'Hands-on guidance for each university you apply to. The application stays yours; we guide and review.',
      points: [
        'Understanding requirements, deadlines and eligibility',
        'Document checklist and review',
        'Guidance on statements and essays',
        'Application form guidance',
        'Interview preparation',
      ],
      note: 'Support is provided per university.',
    },
    {
      index: '04',
      jp: '語学学校',
      title: 'Language School in Japan Support',
      bestFor: 'Best for students starting with language study',
      body: 'Guidance for students who plan to begin in Japan with a language school before university.',
      points: [
        'Choosing a school that fits your goals and plans',
        'Understanding courses, locations and how the pathway works',
        'Application documents and guidance',
        'Planning how language study can lead to university',
      ],
      note: 'Support varies with each student’s situation.',
    },
    {
      index: '05',
      jp: '日本語',
      title: 'Japanese Language Classes',
      bestFor: 'Best for beginners and learners',
      body: 'Structured online classes with team members who know Japanese and know how to teach it.',
      points: [
        'Beginner (N5) batches, including fast-track options',
        'Taught online, so you can join from anywhere',
        'Clear lessons, practice and regular feedback',
        'More levels as our classes grow',
      ],
      note: 'Class times and instructor names are shared when you enquire.',
    },
    {
      index: '06',
      jp: '個人授業',
      title: 'Private Tutoring',
      bestFor: 'Best for learners who want one-to-one focus',
      body: 'Personal lessons shaped around your level and your goals.',
      points: [
        'JLPT preparation',
        'Speaking and conversation practice',
        'Interview practice for study or work',
        'Japanese for the situation you are preparing for',
      ],
    },
    {
      index: '07',
      jp: 'ビザ',
      title: 'Kizuna Visa Support',
      bestFor: 'Best for students, professionals, families and travellers',
      body: 'Open to everyone. We help you prepare a clear, complete and honest visa application for Japan.',
      points: [
        'Visa pathway and eligibility guidance',
        'Document preparation',
        'Proofreading and review of your documents',
        'Application guidance from start to finish',
      ],
      note: 'Visa decisions are made by the authorities. Our role is to help you prepare the strongest honest application you can.',
    },
  ] as ServiceEntry[],
  refund: {
    eyebrow: 'Our refund promise',
    title: 'If your visa is rejected, we refund 100% of your Visa Support fee.',
    lead: 'The promise holds on four conditions:',
    conditions: [
      'You follow our guidance',
      'You work with Kizuna throughout the process',
      'The documents you give us are genuine',
      'You share the rejection notice with us',
    ],
    note: 'No refund is given where documents are forged or misrepresented.',
  },
  start: {
    eyebrow: 'How to get started',
    title: 'Four steps, no forms to decode.',
    steps: [
      { index: '01', title: 'Message us', body: 'Email or Instagram. Tell us which service you are interested in.' },
      { index: '02', title: 'Share your goal', body: 'Where you are, your country, and what you hope to do in Japan.' },
      { index: '03', title: 'Get the details', body: 'We reply with how it works, the timings and the pricing.' },
      { index: '04', title: 'Begin', body: 'Confirm, and we start working with you.' },
    ],
  },
  know: {
    eyebrow: 'Good to know',
    items: [
      {
        q: 'Where are you based?',
        a: 'Our services are online, so you can work with us from anywhere. We schedule around your time zone where we can.',
      },
      { q: 'How much does it cost?', a: 'Pricing is shared when you enquire and depends on the service.' },
      {
        q: 'Can I combine services?',
        a: 'Yes. Many students start with the Roadmap Package or a counselling session, then add application support, classes or tutoring.',
      },
      {
        q: 'Do you guarantee admission or a scholarship?',
        a: 'No. We never promise admission or scholarships. Visa Support carries the refund promise above.',
      },
    ],
  },
}

/* ─────────────────────────── Workshop page ─────────────────────────── */

export const WORKSHOP_PAGE = {
  eyebrow: 'School workshops · 無料',
  titleBefore: 'Free Japan workshops',
  titleAccent: 'for your school.',
  lead: 'A student-led team that learned Japanese on its own, applied on its own and was accepted to Japanese universities with scholarships — now teaching what we learned, at no cost to your school.',
  facts: [
    { key: 'Free', body: 'No cost to your school or your students.' },
    { key: '1–2 days', body: 'Or a 45-minute taster to start.' },
    { key: 'Online or in person', body: 'We adapt to what suits your school.' },
    { key: 'Class 8–12', body: 'Pitched at secondary students, adjusted to your group.' },
  ],
  cta: { label: 'Request a workshop', href: '#request' },
  letter: {
    eyebrow: 'A note to your principal and teachers',
    title: 'A free Japan workshop for your students.',
    paragraphs: [
      'Many of your students are already curious about Japan: its language, its food, its technology, its culture. Some quietly dream of studying or working there one day. But they rarely know where to begin, and there is often no one around who can tell them.',
      'Kizuna Youth Project exists to change that. We are a student-led team: our founders learned Japanese on their own, applied on their own, and were accepted to Japanese universities with scholarships. Now we teach what we learned to other students, for free.',
      'We would like to hold a workshop at your school. It costs your school nothing, takes one or two days — or just 45 minutes as a first taster — and gives students a clear, honest picture of Japan and the real routes to get there.',
    ],
    signoff: [
      { name: 'Md Shadur Rahman (Haru)', role: 'Founder, Kizuna Youth Project' },
      { name: 'Areen Joy Lahari', role: 'Co-founder, Kizuna Youth Project' },
    ],
  },
  promise: {
    title: 'Our promise to your school',
    items: [
      'Always free for the school. We never charge a school for a workshop.',
      'Honest information only. No false promises about admission or scholarships.',
      'Student safety first. Our volunteers follow written safeguarding rules.',
    ],
  },
  gains: {
    eyebrow: 'Why Japan, and why now',
    title: 'What your students gain.',
    intro:
      'India’s National Education Policy 2020 encourages students to learn beyond their own language and names Japanese among the foreign languages that can be offered at secondary level. The interest is already there.',
    items: [
      {
        index: '01',
        title: 'A real first look at the world',
        body: 'Students see another language and culture up close, not through a screen — and widen how they think about their own future.',
      },
      {
        index: '02',
        title: 'A real language start',
        body: 'Greetings, self-introduction and their first characters: a first step that can grow into the JLPT, the standard Japanese language test.',
      },
      {
        index: '03',
        title: 'Honest, clear pathways',
        body: 'How students from India actually reach Japan — universities, scholarships such as MEXT, language schools and careers. No agents, no hidden fees, no false promises.',
      },
      {
        index: '04',
        title: 'Role models close to their age',
        body: 'Instructors who are students themselves, who did it on their own, so students can picture themselves doing the same.',
      },
    ],
  },
  modules: {
    eyebrow: 'The four modules',
    title: 'Hands-on, with time for questions.',
    intro: 'Each module uses activities, quizzes and discussion. Schools can host all four or choose the ones that fit best.',
    items: [
      {
        index: '01',
        jp: '日本語',
        title: 'Japanese language basics',
        body: 'Students will learn to:',
        points: [
          'Greet people and introduce themselves in Japanese',
          'Read and write their first characters',
          'Practise short everyday phrases through games and pair work',
        ],
      },
      {
        index: '02',
        jp: '文化',
        title: 'Culture and traditions',
        body: 'Students will learn about:',
        points: [
          'Festivals, food, etiquette and everyday school life in Japan',
          'How traditions shape modern Japan, from tea ceremony to anime',
          'Quizzes and fun facts that spark curiosity',
        ],
      },
      {
        index: '03',
        jp: '留学',
        title: 'Opportunities in Japan',
        body: 'Students will learn about:',
        points: [
          'Japanese universities, scholarships such as MEXT, and the JLPT',
          'How to start preparing from school, and when',
          'What study in Japan really involves',
        ],
      },
      {
        index: '04',
        jp: '進路',
        title: 'Careers and pathways',
        body: 'Students will learn about:',
        points: [
          'Where Japanese skills lead: interpreting, technology, research, business and more',
          'The main routes to Japan and how they differ',
          'Real stories from our own team',
        ],
      },
    ],
  },
  formats: {
    eyebrow: 'How a workshop works',
    title: 'Choose the format that fits your school.',
    rows: [
      { format: 'Taster', length: '45 minutes', bestFor: 'A first look at all four modules, in one period or an assembly.' },
      { format: 'One-day workshop', length: 'One school day', bestFor: 'All four modules with activities, quizzes and a question time.' },
      { format: 'Two-day workshop', length: 'Two days', bestFor: 'Deeper practice and a full pathways session — the format we ran at our first two partner schools.' },
    ],
    note: 'Every format is available online or in person.',
  },
  bring: {
    title: 'What we bring',
    items: [
      'Trained student instructors',
      'Ready-made slides and activities',
      'Quizzes, fun facts and real stories',
      'A hosting plan agreed with you in advance',
    ],
  },
  ask: {
    title: 'What we ask of the school',
    items: [
      'A room or online link for the session',
      'A projector or screen, if available',
      'A short hosting certificate for Kizuna, and one for the instructor',
      'Permission to take a few photos and short videos as a record, following your school’s rules on student images',
    ],
  },
  safety: {
    title: 'Trust and student safety',
    items: [
      'Our volunteers follow written safeguarding rules in every school session.',
      'School sessions are for learning only. We do not sell anything to students in the workshop.',
      'Kizuna also offers optional paid services. Any information for parents is shared only through the school.',
    ],
  },
  work: {
    eyebrow: 'Our work so far',
    title: 'Already in classrooms.',
    intro: 'We have run two-day workshops at schools in Araria, Bihar. Both schools issued certificates of appreciation.',
    workshops: [
      { title: 'Two-day school workshop', place: 'Araria, Bihar', when: '29–30 May 2026', note: 'Certificate of appreciation issued' },
      { title: 'Two-day school workshop', place: 'Araria, Bihar', when: '3 and 6 August 2026', note: 'Certificate of appreciation issued' },
    ],
    sakura: {
      title: 'Sakura Quest 2026',
      body: 'Both of our founders took on a real, live role at Sakura Quest 2026, working directly with Japanese universities and high schools.',
      points: [
        'Md Shadur Rahman (Haru), founder — interpreted live for Japanese universities and high schools',
        'Areen Joy Lahari, co-founder — interpreted live for Japanese universities and high schools',
      ],
    },
    reach: {
      title: 'A growing team, and a growing reach',
      body: 'Kizuna started in India and is now beginning activities in the Philippines and Bangladesh, and has started operating in Brunei. In India we work with around 20 volunteers.',
      people: [
        { name: 'Md Shadur Rahman (Haru)', role: 'Founder', note: 'Japanese at N2 level. Japanese and English interpreter. Teaches Japanese and English.' },
        { name: 'Areen Joy Lahari', role: 'Co-founder', note: 'JLPT N3 certified. Took part in the Japan Youth Summit. Travelled to Japan at 17. Interpreted live at Sakura Quest 2026.' },
        { name: 'Iftekhar Mahmud Razwan', role: 'Bangladesh representative', note: 'Environment activist. Guides students from Bangladesh toward Japan.' },
        { name: 'Calacar Loraine Andrea', role: 'Philippines representative', note: 'JLPT N3 certified. Exchange student in Japan. Asia Kakehashi Project+ alumna.' },
      ],
    },
  },
  process: {
    eyebrow: 'Bring Kizuna to your school',
    title: 'Meet, choose, confirm, teach.',
    steps: [
      { index: '01', title: 'Meet', body: 'A short 15-minute chat, in person or by call.' },
      { index: '02', title: 'Choose', body: 'Pick the format, modules and dates that fit.' },
      { index: '03', title: 'Confirm', body: 'We agree the room, the teacher and the plan together.' },
      { index: '04', title: 'Workshop', body: 'We teach, then collect feedback and certificates.' },
    ],
  },
  form: {
    eyebrow: 'Workshop request form',
    title: 'Request a workshop.',
    intro:
      'Fill this in and press send — it opens your email app with the details already written, addressed to our team. You can also simply write to us on Instagram.',
    submit: 'Send the request',
    success: 'Your request is written and your email app should be open. If nothing happened, use the button below.',
  },
}
