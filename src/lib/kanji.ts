// Turns an English job title into a Japanese one, so the kanji badge on a
// portrait fills itself in. This is a curated dictionary rather than a machine
// translation service: common Kizuna titles and country combinations resolve
// exactly, and anything it does not know is left for the admin to type.

const PHRASES: Record<string, string> = {
  'co founder': '共同創設者',
  cofounder: '共同創設者',
  founder: '創設者',
  'founding member': '創設メンバー',
  'country representative': '国代表',
  'country lead': '国代表',
  'country director': '国責任者',
  representative: '代表',
  'regional representative': '地域代表',
  'regional director': '地域責任者',
  'executive director': '代表理事',
  'managing director': '代表取締役',
  director: '理事',
  'board member': '理事',
  president: '会長',
  'vice president': '副会長',
  'general secretary': '事務局長',
  secretary: '書記',
  treasurer: '会計',
  advisor: '顧問',
  adviser: '顧問',
  'senior advisor': '上級顧問',
  ambassador: 'アンバサダー',
  'youth ambassador': '青年大使',
  coordinator: 'コーディネーター',
  'project coordinator': 'プロジェクトコーディネーター',
  'program coordinator': 'プログラムコーディネーター',
  'program lead': 'プログラム責任者',
  'project lead': 'プロジェクト責任者',
  'team lead': 'チームリーダー',
  'team leader': 'チームリーダー',
  leader: 'リーダー',
  manager: 'マネージャー',
  'operations manager': '運営マネージャー',
  'community manager': 'コミュニティマネージャー',
  'social media manager': 'SNS担当',
  'content manager': 'コンテンツ担当',
  'head of operations': '運営責任者',
  'head of marketing': 'マーケティング責任者',
  'head of content': 'コンテンツ責任者',
  'head of design': 'デザイン責任者',
  'head of partnerships': '提携責任者',
  'marketing officer': '広報担当',
  'communications officer': '広報担当',
  'public relations': '広報',
  outreach: '広報',
  communications: '広報',
  marketing: 'マーケティング',
  operations: '運営',
  partnerships: '提携',
  research: '研究',
  researcher: '研究者',
  instructor: '講師',
  teacher: '講師',
  'language teacher': '日本語講師',
  'japanese teacher': '日本語講師',
  tutor: '家庭教師',
  translator: '翻訳者',
  interpreter: '通訳者',
  'student ambassador': '学生大使',
  'student volunteer': '学生ボランティア',
  volunteer: 'ボランティア',
  'volunteer coordinator': 'ボランティア担当',
  member: 'メンバー',
  'core member': '中心メンバー',
  student: '学生',
  designer: 'デザイナー',
  'graphic designer': 'グラフィックデザイナー',
  developer: '開発者',
  'web developer': 'ウェブ開発者',
  engineer: 'エンジニア',
  editor: '編集者',
  photographer: 'フォトグラファー',
  videographer: '映像担当',
  writer: 'ライター',
  'event organizer': 'イベント担当',
  'event coordinator': 'イベント担当',
  'school liaison': '学校連携担当',
  'university liaison': '大学連携担当',
  liaison: '連携担当',
  'chief executive officer': '最高経営責任者',
  ceo: '最高経営責任者',
  'chief operating officer': '最高執行責任者',
  coo: '最高執行責任者',
  'chief marketing officer': '最高マーケティング責任者',
  cmo: '最高マーケティング責任者',
  'chief technology officer': '最高技術責任者',
  cto: '最高技術責任者',
  'chief financial officer': '最高財務責任者',
  cfo: '最高財務責任者',
  'director of research': '研究責任者',
  'director of operations': '運営責任者',
  'director of marketing': 'マーケティング責任者',
  'director of communications': '広報責任者',
  'director of programs': 'プログラム責任者',
  'director of programme': 'プログラム責任者',
  'head of research': '研究責任者',
  'head of events': 'イベント責任者',
  'head of finance': '財務責任者',
  'head of community': 'コミュニティ責任者',
}

const COUNTRIES: Record<string, string> = {
  bangladesh: 'バングラデシュ',
  india: 'インド',
  philippines: 'フィリピン',
  japan: '日本',
  nepal: 'ネパール',
  'sri lanka': 'スリランカ',
  pakistan: 'パキスタン',
  bhutan: 'ブータン',
  myanmar: 'ミャンマー',
  thailand: 'タイ',
  vietnam: 'ベトナム',
  cambodia: 'カンボジア',
  indonesia: 'インドネシア',
  malaysia: 'マレーシア',
  singapore: 'シンガポール',
  china: '中国',
  korea: '韓国',
  'south korea': '韓国',
  taiwan: '台湾',
  usa: 'アメリカ',
  'united states': 'アメリカ',
  america: 'アメリカ',
  uk: 'イギリス',
  'united kingdom': 'イギリス',
  australia: 'オーストラリア',
  canada: 'カナダ',
  germany: 'ドイツ',
  france: 'フランス',
}

const ROLE_WORDS: Record<string, string> = {
  founder: '創設者',
  cofounder: '共同創設者',
  representative: '代表',
  rep: '代表',
  lead: 'リーダー',
  leader: 'リーダー',
  director: '責任者',
  manager: 'マネージャー',
  coordinator: 'コーディネーター',
  head: '責任者',
  officer: '担当',
  advisor: '顧問',
  adviser: '顧問',
  secretary: '書記',
  treasurer: '会計',
  president: '会長',
  ambassador: 'アンバサダー',
  teacher: '講師',
  instructor: '講師',
  translator: '翻訳者',
  interpreter: '通訳者',
  designer: 'デザイナー',
  developer: '開発者',
  editor: '編集者',
  researcher: '研究者',
  volunteer: 'ボランティア',
  member: 'メンバー',
  student: '学生',
  marketing: 'マーケティング',
  communications: '広報',
  operations: '運営',
  outreach: '広報',
  content: 'コンテンツ',
  design: 'デザイン',
  research: '研究',
  partnerships: '提携',
  events: 'イベント',
  social: 'SNS',
  media: 'メディア',
  chief: '最高責任者',
  executive: '執行',
  vice: '副',
  deputy: '副',
  assistant: '補佐',
  senior: '上級',
  junior: '初級',
  national: '全国',
  regional: '地域',
  international: '国際',
  youth: '青年',
  women: '女性',
  'public relations': '広報',
  'social media': 'SNS',
}

function clean(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.。]/g, '')
    .replace(/[–—-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function lookupPart(part: string): string | null {
  if (PHRASES[part]) return PHRASES[part]

  // "Bangladesh Country Representative" and "Representative, Bangladesh".
  for (const [country, kanji] of Object.entries(COUNTRIES)) {
    if (!part.includes(country)) continue
    const rest = part.replace(country, ' ').replace(/\bfor\b|\bin\b|\bof\b/g, ' ').replace(/\s+/g, ' ').trim()
    if (!rest) return kanji
    const role = lookupPart(rest)
    // "Bangladesh Country Representative" reads better as バングラデシュ代表 than
    // バングラデシュ国代表.
    if (role) return `${kanji}${role.replace(/^国/, '')}`
  }

  // Word-by-word composition, longest phrase first so "public relations" wins
  // over "relations" or "public".
  const words = part.split(' ').filter(Boolean)
  const phraseKeys = Object.keys({ ...PHRASES, ...ROLE_WORDS }).sort((a, b) => b.length - a.length)
  const pieces: string[] = []
  let index = 0
  while (index < words.length) {
    const remaining = words.slice(index).join(' ')
    const full = PHRASES[remaining]
    if (full) {
      pieces.push(full)
      break
    }
    const match = phraseKeys.find((key) => remaining === key || remaining.startsWith(`${key} `))
    if (match) {
      pieces.push(PHRASES[match] ?? ROLE_WORDS[match])
      index += match.split(' ').length
      continue
    }
    return null
  }
  return pieces.length ? pieces.join('') : null
}

/** Returns the Japanese title, or `null` when the dictionary cannot place it. */
export function titleToJapanese(title: string): string | null {
  const parts = clean(title)
    .split(/\s*(?:&|,|\band\b|\/|\+|·)\s*/)
    .filter(Boolean)
  if (!parts.length) return null

  const translated: string[] = []
  for (const part of parts) {
    const found = lookupPart(part)
    if (!found) return null
    translated.push(found)
  }
  return translated.join('・')
}

export const KANJI_EXAMPLES = ['Founder', 'Co-founder', 'Bangladesh Country Representative', 'Head of Operations']
