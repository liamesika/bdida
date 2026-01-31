import type { KnowledgeItem, KnowledgeItemType, Topic, ExamQuestion, HomeworkQuestion, FileCategory } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export interface ExtractedPage {
  pageNumber: number;
  text: string;
  lines: string[];
}

export interface PDFExtractionResult {
  pageCount: number;
  pages: ExtractedPage[];
  fullText: string;
}

// Extract text from PDF using pdfjs-dist
export async function extractTextFromPDF(pdfData: ArrayBuffer): Promise<PDFExtractionResult> {
  const pdfjsLib = await import('pdfjs-dist');

  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }

  const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
  const pages: ExtractedPage[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    const textItems = textContent.items.map((item) => {
      if ('str' in item) {
        return item.str;
      }
      return '';
    });

    const text = textItems.join(' ');
    const lines = text.split(/\n/).filter(line => line.trim());

    pages.push({
      pageNumber: i,
      text,
      lines,
    });
  }

  return {
    pageCount: pdf.numPages,
    pages,
    fullText: pages.map(p => p.text).join('\n\n'),
  };
}

// Hebrew and English keywords for Discrete Mathematics
const DISCRETE_MATH_KEYWORDS = {
  definition: ['הגדרה', 'Definition', 'Def.', 'def:', 'נגדיר', 'מוגדר'],
  theorem: ['משפט', 'Theorem', 'Thm.', 'thm:', 'טענה'],
  lemma: ['למה', 'Lemma', 'lem:', 'טענת עזר'],
  corollary: ['מסקנה', 'Corollary', 'Cor.', 'cor:'],
  proof: ['הוכחה', 'Proof', 'pf:', 'נוכיח', 'הוכחת'],
  technique: ['טכניקה', 'Technique', 'Method', 'שיטה', 'אלגוריתם'],
  algorithm: ['אלגוריתם', 'Algorithm', 'Alg.', 'alg:'],
  example: ['דוגמה', 'Example', 'Ex.', 'ex:', 'למשל'],
};

// Discrete Mathematics topic keywords
const TOPIC_KEYWORDS: Record<Topic, string[]> = {
  logic: ['לוגיקה', 'logic', 'proposition', 'predicate', 'טענה', 'שלילה', 'negation', 'implication', 'גרירה', 'שקילות', 'equivalence', 'quantifier', 'כמת', '∀', '∃', '¬', '∧', '∨', '→', '↔', 'truth table', 'טבלת אמת'],
  sets: ['קבוצה', 'set', 'subset', 'תת-קבוצה', 'union', 'איחוד', 'intersection', 'חיתוך', 'complement', 'משלים', 'power set', 'קבוצת חזקה', '∈', '∉', '⊆', '⊂', '∪', '∩', 'cardinality', 'עוצמה', 'venn'],
  relations: ['יחס', 'relation', 'reflexive', 'רפלקסיבי', 'symmetric', 'סימטרי', 'transitive', 'טרנזיטיבי', 'equivalence relation', 'יחס שקילות', 'partial order', 'סדר חלקי', 'antisymmetric', 'אנטי-סימטרי', 'equivalence class', 'מחלקת שקילות'],
  functions: ['פונקציה', 'function', 'injection', 'חד-חד', 'surjection', 'על', 'bijection', 'חח"ע ועל', 'composition', 'הרכבה', 'inverse', 'הפיכה', 'domain', 'תחום', 'range', 'טווח', 'codomain', 'image', 'preimage'],
  induction: ['אינדוקציה', 'induction', 'base case', 'בסיס', 'inductive step', 'צעד', 'strong induction', 'אינדוקציה חזקה', 'well-ordering', 'סדר טוב'],
  recursion: ['רקורסיה', 'recursion', 'recursive', 'recurrence', 'נוסחת נסיגה', 'fibonacci', 'פיבונאצ׳י', 'closed form', 'נוסחה סגורה'],
  combinatorics: ['קומבינטוריקה', 'combinatorics', 'counting', 'ספירה', 'permutation', 'תמורה', 'combination', 'צירוף', 'binomial', 'בינום', 'pigeonhole', 'שובך', 'inclusion-exclusion', 'הכלה-הפרדה', 'factorial', 'עצרת', 'choose', 'בחירה'],
  graphs: ['גרף', 'graph', 'vertex', 'קודקוד', 'edge', 'צלע', 'path', 'מסלול', 'cycle', 'מעגל', 'connected', 'קשיר', 'degree', 'דרגה', 'adjacent', 'שכנים', 'bipartite', 'דו-צדדי', 'planar', 'מישורי', 'euler', 'אוילר', 'hamilton', 'המילטון', 'matching', 'שידוך', 'coloring', 'צביעה'],
  trees: ['עץ', 'tree', 'spanning tree', 'עץ פורש', 'root', 'שורש', 'leaf', 'עלה', 'binary tree', 'עץ בינארי', 'forest', 'יער', 'kruskal', 'קרוסקל', 'prim', 'פרים', 'dfs', 'bfs'],
  'number-theory': ['תורת המספרים', 'number theory', 'divisibility', 'התחלקות', 'prime', 'ראשוני', 'gcd', 'מחלק משותף גדול', 'lcm', 'כפולה משותפת', 'modular', 'מודולרי', 'congruence', 'חפיפות', 'euclidean', 'אוקלידס', 'bezout', 'בזו'],
  'boolean-algebra': ['אלגברה בוליאנית', 'boolean algebra', 'logic gate', 'שער לוגי', 'and', 'or', 'not', 'nand', 'nor', 'xor', 'circuit', 'מעגל'],
  algorithms: ['אלגוריתם', 'algorithm', 'complexity', 'סיבוכיות', 'big-o', 'O(', 'runtime', 'זמן ריצה', 'sorting', 'מיון', 'searching', 'חיפוש', 'greedy', 'חמדן', 'dynamic programming', 'תכנות דינמי'],
  probability: ['הסתברות', 'probability', 'random', 'אקראי', 'expected', 'תוחלת', 'variance', 'שונות', 'distribution', 'התפלגות', 'conditional', 'מותנית', 'independent', 'בלתי תלויים', 'bayes'],
  other: [],
};

// Detect item type from text
function detectItemType(text: string): KnowledgeItemType | null {
  const lowerText = text.toLowerCase();

  // Check in order of specificity
  const typeOrder: KnowledgeItemType[] = ['definition', 'theorem', 'lemma', 'corollary', 'proof', 'algorithm', 'technique', 'example'];

  for (const type of typeOrder) {
    const keywords = DISCRETE_MATH_KEYWORDS[type as keyof typeof DISCRETE_MATH_KEYWORDS];
    if (!keywords) continue;

    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase();
      if (lowerText.includes(keywordLower) || text.includes(keyword)) {
        return type;
      }
    }
  }
  return null;
}

// Detect topics from text
function detectTopics(text: string): Topic[] {
  const topics: Topic[] = [];
  const lowerText = text.toLowerCase();

  for (const [topic, keywords] of Object.entries(TOPIC_KEYWORDS)) {
    if (topic === 'other') continue;

    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase()) || text.includes(keyword)) {
        if (!topics.includes(topic as Topic)) {
          topics.push(topic as Topic);
        }
        break;
      }
    }
  }

  if (topics.length === 0) {
    topics.push('other');
  }

  return topics;
}

// Generate title from text
function generateTitle(text: string, type: KnowledgeItemType): string {
  const patterns = [
    /(?:הגדרה|משפט|למה|מסקנה|הוכחה|אלגוריתם|דוגמה)\s*(?:[\d.]+)?[:\s-]*([^\n.]{10,80})/i,
    /(?:Definition|Theorem|Lemma|Corollary|Proof|Algorithm|Example)\s*(?:[\d.]+)?[:\s-]*([^\n.]{10,80})/i,
    /(?:[\d.]+)\s*[.)]\s*([^\n.]{10,80})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      return match[1].trim().substring(0, 80);
    }
  }

  const cleanText = text.replace(/[\n\r]+/g, ' ').trim();
  const firstPart = cleanText.substring(0, 80);
  return firstPart.endsWith('.') ? firstPart : firstPart + '...';
}

// Generate "when to use" hints for discrete math
function generateWhenToUse(text: string, type: KnowledgeItemType, topics: Topic[]): string {
  const suggestions: string[] = [];

  // Topic-based suggestions
  const topicHints: Record<Topic, string> = {
    logic: 'כאשר עובדים עם טענות לוגיות, שקילויות, או הוכחות ישירות/בשלילה',
    sets: 'כאשר עובדים עם פעולות על קבוצות או מוכיחים שוויון/הכלה',
    relations: 'כאשר בודקים תכונות של יחסים או עובדים עם מחלקות שקילות',
    functions: 'כאשר מוכיחים חח"ע/על או עובדים עם הרכבה והפיכה',
    induction: 'כאשר מוכיחים טענות על מספרים טבעיים או מבנים רקורסיביים',
    recursion: 'כאשר פותרים נוסחאות נסיגה או מגדירים מבנים רקורסיבית',
    combinatorics: 'כאשר סופרים אפשרויות, עובדים עם תמורות/צירופים, או משתמשים בעקרון שובך יונים',
    graphs: 'כאשר עובדים עם גרפים, מסלולים, מעגלים, או בעיות קשירות',
    trees: 'כאשר עובדים עם עצים, עצי פורש, או אלגוריתמים על עצים',
    'number-theory': 'כאשר עובדים עם התחלקות, מספרים ראשוניים, או חשבון מודולרי',
    'boolean-algebra': 'כאשר עובדים עם מעגלים לוגיים או ביטויים בוליאניים',
    algorithms: 'כאשר מנתחים סיבוכיות או מיישמים אלגוריתמים',
    probability: 'כאשר מחשבים הסתברויות או תוחלות',
    other: '',
  };

  for (const topic of topics) {
    if (topicHints[topic]) {
      suggestions.push(topicHints[topic]);
    }
  }

  // Type-based suggestions
  const typeHints: Record<KnowledgeItemType, string> = {
    definition: 'כאשר צריך להגדיר מושג בצורה פורמלית בהוכחה',
    theorem: 'כאשר צריך להשתמש בתוצאה ידועה ללא הוכחה',
    lemma: 'כאשר צריך תוצאת עזר בדרך להוכחה מרכזית',
    corollary: 'כאשר צריך תוצאה שנובעת ישירות ממשפט אחר',
    proof: 'כאשר צריך להוכיח טענה דומה או להשתמש בטכניקה דומה',
    technique: 'כאשר מזהים דפוס דומה בבעיה',
    algorithm: 'כאשר צריך לפתור בעיה אלגוריתמית',
    example: 'כאשר צריך דוגמה או דוגמה נגדית',
  };

  if (typeHints[type]) {
    suggestions.push(typeHints[type]);
  }

  return suggestions.length > 0 ? suggestions.join('. ') : 'יש להשתמש בהקשר המתאים';
}

// Extract knowledge items from PDF pages
export function extractKnowledgeItems(
  pages: ExtractedPage[],
  fileId: string,
  fileName: string
): KnowledgeItem[] {
  const items: KnowledgeItem[] = [];
  const seenTexts = new Set<string>();

  for (const page of pages) {
    const text = page.text;

    // Split by knowledge item markers
    const segments = text.split(/(?=הגדרה|משפט|למה|מסקנה|הוכחה|אלגוריתם|דוגמה|Definition|Theorem|Lemma|Corollary|Proof|Algorithm|Example)/i);

    for (const segment of segments) {
      if (segment.trim().length < 30) continue;

      const type = detectItemType(segment);
      if (!type) continue;

      // Deduplicate by content hash
      const contentKey = segment.trim().substring(0, 200);
      if (seenTexts.has(contentKey)) continue;
      seenTexts.add(contentKey);

      const topics = detectTopics(segment);
      const title = generateTitle(segment, type);
      const whenToUse = generateWhenToUse(segment, type, topics);

      const item: KnowledgeItem = {
        id: uuidv4(),
        type,
        title,
        verbatimText: segment.trim(),
        sourceFileId: fileId,
        sourceFileName: fileName,
        sourcePage: page.pageNumber,
        topics,
        whenToUse,
        linkedQuestionIds: [],
        linkedItemIds: [],
        isInReviewList: false,
        likelihoodScore: 50,
        createdAt: new Date(),
        reviewCount: 0,
        examAppearances: 0,
      };

      items.push(item);
    }
  }

  return items;
}

// Extract homework questions
export function extractHomeworkQuestions(
  pages: ExtractedPage[],
  fileId: string,
  fileName: string,
  homeworkNumber: number
): HomeworkQuestion[] {
  const questions: HomeworkQuestion[] = [];
  const seenQuestions = new Set<string>();
  let globalQuestionNumber = 0;

  for (const page of pages) {
    const text = page.text;

    // Look for question patterns in discrete math homework
    const questionPatterns = [
      /(?:שאלה|תרגיל|Question|Exercise|Q\.?)\s*(\d+)/gi,
      /(\d+)\s*[.)]\s*(?:\(?\s*\d*\s*נקודות?\)?)?/gi,
    ];

    for (const pattern of questionPatterns) {
      pattern.lastIndex = 0;
      let match;

      while ((match = pattern.exec(text)) !== null) {
        globalQuestionNumber++;
        const startIndex = match.index;

        // Find end of question (next question or significant whitespace)
        let endIndex = text.length;
        const nextMatch = text.substring(startIndex + 50).search(/(?:שאלה|תרגיל|Question|Exercise|Q\.?)\s*\d+|\d+\s*[.)]/i);
        if (nextMatch !== -1) {
          endIndex = startIndex + 50 + nextMatch;
        }

        const questionText = text.substring(startIndex, Math.min(endIndex, startIndex + 800)).trim();

        if (questionText.length < 30) continue;

        // Deduplicate
        const contentKey = questionText.substring(0, 150);
        if (seenQuestions.has(contentKey)) continue;
        seenQuestions.add(contentKey);

        const topics = detectTopics(questionText);
        const techniques = detectTechniques(questionText);

        const question: HomeworkQuestion = {
          id: uuidv4(),
          sourceFileId: fileId,
          sourceFileName: fileName,
          sourcePage: page.pageNumber,
          homeworkNumber,
          questionNumber: globalQuestionNumber,
          verbatimText: questionText,
          topics,
          difficulty: 'medium',
          requiredTheorems: [],
          techniques,
          similarityToExams: 0,
          examLikelihoodScore: 50,
          matchingExamQuestions: [],
        };

        questions.push(question);
      }
    }
  }

  return questions;
}

// Extract exam questions
export function extractExamQuestions(
  pages: ExtractedPage[],
  fileId: string,
  fileName: string
): ExamQuestion[] {
  const questions: ExamQuestion[] = [];
  const seenQuestions = new Set<string>();
  let questionNumber = 0;

  // Try to extract year and semester from filename
  const yearMatch = fileName.match(/(20\d{2})/);
  const semesterMatch = fileName.match(/moed[_\s]*([ab])/i);
  const year = yearMatch ? parseInt(yearMatch[1]) : undefined;
  const semester = semesterMatch ? semesterMatch[1].toUpperCase() : undefined;

  for (const page of pages) {
    const text = page.text;

    const questionPatterns = [
      /(?:שאלה|Question|Q\.?)\s*(\d+)/gi,
      /(\d+)\s*[.)]\s*\(?\s*(\d+)\s*נקודות?\)?/gi,
    ];

    for (const pattern of questionPatterns) {
      pattern.lastIndex = 0;
      let match;

      while ((match = pattern.exec(text)) !== null) {
        questionNumber++;
        const startIndex = match.index;

        let endIndex = text.length;
        const nextMatch = text.substring(startIndex + 50).search(/(?:שאלה|Question|Q\.?)\s*\d+|\d+\s*[.)]\s*\(?\s*\d+\s*נקודות?\)?/i);
        if (nextMatch !== -1) {
          endIndex = startIndex + 50 + nextMatch;
        }

        const questionText = text.substring(startIndex, Math.min(endIndex, startIndex + 1000)).trim();

        if (questionText.length < 30) continue;

        const contentKey = questionText.substring(0, 150);
        if (seenQuestions.has(contentKey)) continue;
        seenQuestions.add(contentKey);

        const topics = detectTopics(questionText);
        const techniques = detectTechniques(questionText);
        const pattern_type = detectQuestionPattern(questionText);

        // Try to extract points
        const pointsMatch = questionText.match(/\(?\s*(\d+)\s*נקודות?\)?|\(?\s*(\d+)\s*points?\)?/i);
        const points = pointsMatch ? parseInt(pointsMatch[1] || pointsMatch[2]) : undefined;

        const question: ExamQuestion = {
          id: uuidv4(),
          sourceFileId: fileId,
          sourceFileName: fileName,
          sourcePage: page.pageNumber,
          questionNumber,
          verbatimText: questionText,
          topics,
          difficulty: estimateDifficulty(questionText, points),
          points,
          requiredTheorems: [],
          questionPattern: pattern_type,
          techniques,
          isFromHomework: false,
          year,
          semester,
        };

        questions.push(question);
      }
    }
  }

  return questions;
}

// Detect question pattern/type for discrete math
function detectQuestionPattern(text: string): string {
  const lowerText = text.toLowerCase();

  const patterns = [
    { pattern: 'prove-by-induction', keywords: ['הוכח באינדוקציה', 'prove by induction', 'induction', 'אינדוקציה'] },
    { pattern: 'prove-bijection', keywords: ['הוכח חח"ע ועל', 'prove bijection', 'חח"ע', 'bijection'] },
    { pattern: 'count-combinations', keywords: ['כמה דרכים', 'how many ways', 'count', 'ספור', 'בכמה אופנים'] },
    { pattern: 'prove-equivalence', keywords: ['הוכח שקילות', 'prove equivalent', 'שקול', 'equivalent'] },
    { pattern: 'find-recurrence', keywords: ['מצא נוסחת נסיגה', 'find recurrence', 'רקורסיה', 'נסיגה'] },
    { pattern: 'solve-recurrence', keywords: ['פתור נוסחת נסיגה', 'solve recurrence', 'closed form', 'נוסחה סגורה'] },
    { pattern: 'prove-graph-property', keywords: ['הוכח עבור גרף', 'prove for graph', 'גרף קשיר', 'connected graph'] },
    { pattern: 'find-spanning-tree', keywords: ['מצא עץ פורש', 'find spanning tree', 'spanning tree', 'עץ פורש'] },
    { pattern: 'prove-set-equality', keywords: ['הוכח שוויון קבוצות', 'prove set equality', 'A=B', 'הכלה הדדית'] },
    { pattern: 'prove-divisibility', keywords: ['הוכח התחלקות', 'prove divisibility', 'מתחלק', 'divides'] },
    { pattern: 'find-gcd', keywords: ['מצא מחלק משותף', 'find gcd', 'gcd', 'אוקלידס'] },
    { pattern: 'truth-table', keywords: ['טבלת אמת', 'truth table', 'tautology', 'טאוטולוגיה'] },
    { pattern: 'pigeonhole', keywords: ['שובך יונים', 'pigeonhole', 'לפחות אחד', 'at least one'] },
    { pattern: 'euler-hamilton', keywords: ['אוילר', 'המילטון', 'euler', 'hamilton', 'מסלול', 'path'] },
    { pattern: 'prove-relation-property', keywords: ['הוכח יחס', 'prove relation', 'רפלקסיבי', 'סימטרי', 'טרנזיטיבי'] },
    { pattern: 'modular-arithmetic', keywords: ['חשבון מודולרי', 'modular', 'mod', 'חפיפות', 'congruence'] },
  ];

  for (const { pattern, keywords } of patterns) {
    const matches = keywords.filter(k =>
      lowerText.includes(k.toLowerCase()) || text.includes(k)
    );
    if (matches.length >= 1) {
      return pattern;
    }
  }

  return 'general';
}

// Detect techniques needed
function detectTechniques(text: string): string[] {
  const lowerText = text.toLowerCase();
  const techniques: string[] = [];

  const techniqueKeywords: Record<string, string[]> = {
    'induction': ['אינדוקציה', 'induction', 'בסיס', 'base case'],
    'contradiction': ['בשלילה', 'contradiction', 'הנח בשלילה'],
    'contrapositive': ['קונטרפוזיטיב', 'contrapositive'],
    'double-counting': ['ספירה כפולה', 'double counting', 'שתי דרכים'],
    'pigeonhole': ['שובך יונים', 'pigeonhole'],
    'inclusion-exclusion': ['הכלה-הפרדה', 'inclusion-exclusion'],
    'generating-functions': ['פונקציות יוצרות', 'generating function'],
    'graph-algorithm': ['bfs', 'dfs', 'dijkstra', 'kruskal', 'prim'],
    'euclidean-algorithm': ['אוקלידס', 'euclidean', 'gcd'],
    'direct-proof': ['הוכחה ישירה', 'direct proof'],
    'cases': ['מקרים', 'cases', 'case 1', 'מקרה'],
  };

  for (const [technique, keywords] of Object.entries(techniqueKeywords)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase()) || text.includes(keyword)) {
        if (!techniques.includes(technique)) {
          techniques.push(technique);
        }
        break;
      }
    }
  }

  return techniques;
}

// Estimate difficulty based on text and points
function estimateDifficulty(text: string, points?: number): 'easy' | 'medium' | 'hard' {
  if (points) {
    if (points <= 10) return 'easy';
    if (points >= 25) return 'hard';
  }

  const hardIndicators = ['הוכח', 'prove', 'משפט', 'theorem', 'אינדוקציה', 'induction', 'מורכב', 'complex'];
  const easyIndicators = ['חשב', 'calculate', 'מצא', 'find', 'פשוט', 'simple', 'directly'];

  const lowerText = text.toLowerCase();

  let hardCount = 0;
  let easyCount = 0;

  for (const indicator of hardIndicators) {
    if (lowerText.includes(indicator.toLowerCase())) hardCount++;
  }

  for (const indicator of easyIndicators) {
    if (lowerText.includes(indicator.toLowerCase())) easyCount++;
  }

  if (hardCount > easyCount + 1) return 'hard';
  if (easyCount > hardCount + 1) return 'easy';
  return 'medium';
}

// Categorize file by name and content
export function suggestCategory(fileName: string, text: string): FileCategory {
  const lowerName = fileName.toLowerCase();
  const lowerText = text.toLowerCase().substring(0, 1500);

  if (lowerName.includes('lecture') || lowerName.includes('הרצאה') || lowerName.includes('lec')) {
    return 'lecture';
  }
  if (lowerName.includes('tutorial') || lowerName.includes('תרגול') || lowerName.includes('rec') || lowerName.includes('tut')) {
    return 'tutorial';
  }
  if (lowerName.includes('hw') || lowerName.includes('ex') || lowerName.includes('homework') || lowerName.includes('תרגיל') || lowerName.includes('solution')) {
    return 'homework';
  }
  if (lowerName.includes('exam') || lowerName.includes('moed') || lowerName.includes('מבחן') || lowerName.includes('בחינה') || lowerName.includes('test')) {
    return 'exam';
  }

  // Check content
  if (lowerText.includes('בחינה') || lowerText.includes('exam') || lowerText.includes('moed')) {
    return 'exam';
  }
  if (lowerText.includes('תרגיל בית') || lowerText.includes('homework') || lowerText.includes('פתרון')) {
    return 'homework';
  }

  return 'lecture';
}

// Extract index number from filename
export function extractIndexNumber(fileName: string): number {
  const patterns = [
    /(?:lecture|lec|הרצאה|tutorial|tut|rec|תרגול|hw|homework|ex|exam|מבחן)[_\s-]*(\d+)/i,
    /(\d+)[._\-]/,
    /[._\-](\d+)/,
    /(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = fileName.match(pattern);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return 1;
}

// Generate display tag
export function generateDisplayTag(category: FileCategory, indexNumber: number, fileName?: string): string {
  const prefixes: Record<FileCategory, string> = {
    lecture: 'L',
    tutorial: 'T',
    homework: 'HW',
    exam: 'EXAM',
  };

  const prefix = prefixes[category];
  const paddedIndex = indexNumber.toString().padStart(2, '0');

  if (category === 'exam' && fileName) {
    const yearMatch = fileName.match(/(20\d{2})/);
    const semesterMatch = fileName.match(/moed[_\s]*([ab])/i);
    if (yearMatch) {
      return `EXAM_${yearMatch[1]}${semesterMatch ? semesterMatch[1].toUpperCase() : ''}`;
    }
  }

  return `${prefix}${paddedIndex}`;
}
