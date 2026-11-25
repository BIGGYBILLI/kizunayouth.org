// All copy, people and links for Kizuna Youth Project live here.

/** Public asset path, correct at the domain root and under the Pages subpath. */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

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
  ledBy: 'Led by students in India, the Philippines and Bangladesh.',
}

export const NAV = [
  { label: 'Story', href: '#story' },
  { label: 'Guidance', href: '#guidance' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
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
  scroll: 'Scroll',
  caption: '絆 — a bond that brings us closer.',
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
      photo: asset('images/team/haru.webp?v=2'),
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
      photo: asset('images/team/areen.webp?v=2'),
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
        { label: 'Story', href: '#story' },
        { label: 'Guidance', href: '#guidance' },
        { label: 'Team', href: '#team' },
        { label: 'FAQ', href: '#faq' },
      ],
    },
  ],
  legal: `© ${new Date().getFullYear()} Kizuna Youth Project`,
}
