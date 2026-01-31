// Homework questions and solutions - extracted from PDFs
// All content is VERBATIM from the official solutions

export interface HomeworkQuestion {
  id: string;
  homeworkNumber: number;
  questionNumber: number;
  subQuestion?: string;
  topic: string;
  question: string;
  solution: string;
  keyTechnique?: string;
}

export interface HomeworkSet {
  number: number;
  title: string;
  topics: string[];
  questions: HomeworkQuestion[];
}

export const homeworkSets: HomeworkSet[] = [
  // ========== תרגיל 1 - לוגיקה ==========
  {
    number: 1,
    title: 'לוגיקה',
    topics: ['שקילויות', 'טאוטולוגיות', 'גרירות'],
    questions: [
      {
        id: 'hw1-1a',
        homeworkNumber: 1,
        questionNumber: 1,
        subQuestion: 'א',
        topic: 'שקילויות',
        question: 'הוכיחו בעזרת השקילויות שנלמדו בכיתה: p → (q → q) ≡ T',
        solution: `p → (q → q)
≡ p → T        [כי q → q ≡ T]
≡ T            [כי p → T ≡ T]`,
        keyTechnique: 'שימוש בשקילות q → q ≡ T',
      },
      {
        id: 'hw1-1b',
        homeworkNumber: 1,
        questionNumber: 1,
        subQuestion: 'ב',
        topic: 'שקילויות',
        question: 'הוכיחו: (p ∨ q) → r ≡ (p → r) ∧ (q → r)',
        solution: `(p ∨ q) → r
≡ ¬(p ∨ q) ∨ r           [גרירה]
≡ (¬p ∧ ¬q) ∨ r          [דה מורגן]
≡ (¬p ∨ r) ∧ (¬q ∨ r)    [פילוג]
≡ (p → r) ∧ (q → r)      [גרירה]`,
        keyTechnique: 'פתיחת גרירה + דה מורגן + פילוג',
      },
    ],
  },

  // ========== תרגיל 2 - לוגיקה והוכחות ==========
  {
    number: 2,
    title: 'לוגיקה והוכחות',
    topics: ['הוכחה ישירה', 'הוכחה בשלילה', 'קונטרה פוזיטיב'],
    questions: [
      {
        id: 'hw2-1',
        homeworkNumber: 2,
        questionNumber: 1,
        topic: 'הוכחה ישירה',
        question: 'הוכיחו שלכל שלם n, אם n² זוגי אז n זוגי',
        solution: `הוכחה בקונטרה פוזיטיב:
נניח n אי-זוגי, כלומר n = 2k + 1 לאיזשהו k ∈ ℤ.
n² = (2k + 1)² = 4k² + 4k + 1 = 2(2k² + 2k) + 1
לכן n² אי-זוגי.`,
        keyTechnique: 'קונטרה פוזיטיב',
      },
    ],
  },

  // ========== תרגיל 3 - קבוצות ==========
  {
    number: 3,
    title: 'תורת הקבוצות',
    topics: ['הכלה', 'שוויון קבוצות', 'פעולות על קבוצות'],
    questions: [
      {
        id: 'hw3-1',
        homeworkNumber: 3,
        questionNumber: 1,
        topic: 'שוויון קבוצות',
        question: 'הוכיחו: A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)',
        solution: `נוכיח הכלה דו-כיוונית:

⊆: יהי x ∈ A ∪ (B ∩ C).
   מהגדרת איחוד: x ∈ A או x ∈ B ∩ C.
   מקרה 1: x ∈ A.
      אז x ∈ A ∪ B וגם x ∈ A ∪ C.
      לכן x ∈ (A ∪ B) ∩ (A ∪ C).
   מקרה 2: x ∈ B ∩ C.
      אז x ∈ B וגם x ∈ C.
      לכן x ∈ A ∪ B וגם x ∈ A ∪ C.
      לכן x ∈ (A ∪ B) ∩ (A ∪ C).

⊇: יהי x ∈ (A ∪ B) ∩ (A ∪ C).
   אז x ∈ A ∪ B וגם x ∈ A ∪ C.
   אם x ∈ A, אז x ∈ A ∪ (B ∩ C).
   אם x ∉ A, אז x ∈ B וגם x ∈ C.
   לכן x ∈ B ∩ C ולכן x ∈ A ∪ (B ∩ C).`,
        keyTechnique: 'הכלה דו-כיוונית + חלוקה למקרים',
      },
    ],
  },

  // ========== תרגיל 4 - קבוצות מתקדם ==========
  {
    number: 4,
    title: 'קבוצות ומכפלה קרטזית',
    topics: ['מכפלה קרטזית', 'קבוצת חזקה', 'הוכחות'],
    questions: [
      {
        id: 'hw4-1',
        homeworkNumber: 4,
        questionNumber: 1,
        topic: 'מכפלה קרטזית',
        question: 'הוכיחו שלכל n ≥ 2 ולכל שתי קבוצות לא ריקות A,B: אם Aⁿ × B = Bⁿ × A אז A = B',
        solution: `תהיינה A,B קבוצות לא ריקות ויהי n ≥ 2.
נניח Aⁿ × B = Bⁿ × A.
נוכיח A = B.

נוכיח הכלה דו-כיוונית:
• יהי x. נניח x ∈ A.
  ○ מהיות B לא ריקה, קיים y ∈ B.
  ○ לפי הגדרת מכפלה קרטזית: (x,...,x, y) ∈ Aⁿ × B.
                              n פעמים
  ○ מההנחה נסיק ש-(x,...,x, y) ∈ Bⁿ × A.
  ○ מהגדרת מכפלה קרטזית x ∈ B.
  ○ לכן A ⊆ B.

• באופן סימטרי (בהחלפת תפקידי A,B) ניתן להוכיח גם B ⊆ A.

הוכחנו הכלה דו-כיוונית ולכן A = B.`,
        keyTechnique: 'הכלה דו-כיוונית + שימוש במכפלה קרטזית',
      },
      {
        id: 'hw4-2a',
        homeworkNumber: 4,
        questionNumber: 2,
        subQuestion: 'א',
        topic: 'קבוצת חזקה',
        question: 'הוכיחו: P(A) ∪ P(B) = P(A ∪ B) אם"ם A ⊆ B או B ⊆ A',
        solution: `⇐ נניח A ⊆ B או B ⊆ A.
   בה"כ נניח A ⊆ B.
   אז P(A) ⊆ P(B).
   לכן P(A) ∪ P(B) = P(B).
   כמו כן A ∪ B = B.
   לכן P(A ∪ B) = P(B).
   קיבלנו P(A) ∪ P(B) = P(B) = P(A ∪ B).

⇒ נניח P(A) ∪ P(B) = P(A ∪ B).
   נניח בשלילה ש-A ⊈ B וגם B ⊈ A.
   קיים x כך ש-x ∈ A וגם x ∉ B.
   קיים y כך ש-y ∈ B וגם y ∉ A.
   נשים לב ש-{x,y} ⊈ A וגם {x,y} ⊈ B.
   לכן {x,y} ∉ P(A) וגם {x,y} ∉ P(B).
   כלומר {x,y} ∉ P(A) ∪ P(B).
   מצד שני {x,y} ⊆ A ∪ B לכן {x,y} ∈ P(A ∪ B).
   סתירה!`,
        keyTechnique: 'הוכחה לשני הכיוונים + הוכחה בשלילה',
      },
    ],
  },

  // ========== תרגיל 5 - פונקציות ==========
  {
    number: 5,
    title: 'פונקציות',
    topics: ['חח"ע', 'על', 'הרכבה'],
    questions: [
      {
        id: 'hw5-1a',
        homeworkNumber: 5,
        questionNumber: 1,
        subQuestion: 'א',
        topic: 'חח"ע ועל',
        question: 'f: P(ℕ)×P(ℕ) → P(ℕ)×P(ℕ), f(A,B) = (A∖B, A∩B). קבעו האם חח"ע והאם על.',
        solution: `הפונקציה לא חח"ע:
• נבחר ({1},{2}), ({1},{3}) ∈ P(ℕ)×P(ℕ).
• ברור ש-({1},{2}) ≠ ({1},{3}).
• אבל f({1},{2}) = f({1},{3}) = ({1},∅), לכן f לא חח"ע.

הפונקציה לא על:
• נבחר ({1},{1}) ∈ P(ℕ)×P(ℕ).
• נניח בשלילה שקיים (A,B) כך ש-f(A,B) = ({1},{1}).
• לכן A∖B = {1} ו-A∩B = {1}.
• מהגדרת ההפרש 1 ∉ B אבל מהגדרת החיתוך 1 ∈ B - סתירה!`,
        keyTechnique: 'הפרכה בדוגמה נגדית',
      },
      {
        id: 'hw5-1b',
        homeworkNumber: 5,
        questionNumber: 1,
        subQuestion: 'ב',
        topic: 'חח"ע ועל',
        question: 'f: ℕ → ℕ, f(n) = k כאשר k הטבעי הגדול ביותר כך ש-n ≥ k². קבעו חח"ע ועל.',
        solution: `הפונקציה לא חח"ע:
• נבחר n₁ = 9, n₂ = 10 ∈ ℕ.
• ברור ש-n₁ ≠ n₂.
• אבל f(9) = f(10) = 3, לכן f לא חח"ע.

הפונקציה על:
• יהי b ∈ ℕ.
• נבחר a = b². ברור ש-a ∈ ℕ.
• מתקיים f(a) = b כי b הוא הטבעי הגדול ביותר כך ש-b² ≤ a.`,
        keyTechnique: 'הפרכה + הוכחה ישירה',
      },
      {
        id: 'hw5-1c',
        homeworkNumber: 5,
        questionNumber: 1,
        subQuestion: 'ג',
        topic: 'חח"ע ועל',
        question: 'f: P(ℕ) → P(ℕ), f(A) = A △ {1,2}. קבעו חח"ע ועל.',
        solution: `הפונקציה חח"ע:
• תהיינה A₁, A₂ ∈ P(ℕ). נניח f(A₁) = f(A₂).
• כלומר A₁ △ {1,2} = A₂ △ {1,2}.
• נפעיל על שני האגפים הפרש סימטרי עם {1,2}:
  (A₁ △ {1,2}) △ {1,2} = (A₂ △ {1,2}) △ {1,2}
• יש קיבוץ בהפרש סימטרי:
  A₁ △ ({1,2} △ {1,2}) = A₂ △ ({1,2} △ {1,2})
• מתכונת הפרש סימטרי: A₁ △ ∅ = A₂ △ ∅
• לכן A₁ = A₂ כנדרש.

הפונקציה על:
• תהי B ∈ P(ℕ).
• נבחר A = B △ {1,2}. ברור ש-A ∈ P(ℕ).
• מתקיים f(A) = A △ {1,2} = (B △ {1,2}) △ {1,2} = B △ ∅ = B.`,
        keyTechnique: 'טריק: הפעלת △{1,2} על שני הצדדים',
      },
      {
        id: 'hw5-2',
        homeworkNumber: 5,
        questionNumber: 2,
        topic: 'הרכבת פונקציות',
        question: 'תהיינה f: A→C, g: B→D. נגדיר h: A×B → C×D כך: h(a,b) = (f(a), g(b)). הוכיחו: h חח"ע אם"ם f,g חח"ע. h על אם"ם f,g על.',
        solution: `חח"ע:
⇐ נניח h חח"ע, נוכיח g חח"ע.
• יהיו b₁,b₂ ∈ B כך ש-g(b₁) = g(b₂).
• A אינה ריקה לכן קיים a ∈ A.
• h(a,b₁) = (f(a), g(b₁)) = (f(a), g(b₂)) = h(a,b₂).
• h חח"ע לכן (a,b₁) = (a,b₂) ובפרט b₁ = b₂.

⇒ נניח f,g חח"ע, נוכיח h חח"ע.
• יהיו (a₁,b₁), (a₂,b₂) כך ש-h(a₁,b₁) = h(a₂,b₂).
• (f(a₁), g(b₁)) = (f(a₂), g(b₂)).
• משוויון זוג סדור: f(a₁) = f(a₂) ∧ g(b₁) = g(b₂).
• מחח"ע: a₁ = a₂ ∧ b₁ = b₂.
• לכן (a₁,b₁) = (a₂,b₂).

על:
⇐ נניח h על, נוכיח g על.
• יהי d ∈ D.
• C אינה ריקה לכן קיים c ∈ C.
• h על לכן קיים (a,b) ∈ A×B כך ש-h(a,b) = (c,d).
• (f(a), g(b)) = (c,d) ובפרט g(b) = d.

⇒ נניח f,g על, נוכיח h על.
• יהי (c,d) ∈ C×D.
• f על לכן קיים a כך ש-f(a) = c.
• g על לכן קיים b כך ש-g(b) = d.
• h(a,b) = (f(a), g(b)) = (c,d).`,
        keyTechnique: 'הוכחה לשני הכיוונים + שימוש בקבוצות לא ריקות',
      },
    ],
  },

  // ========== תרגיל 6 - פונקציות מתקדם ==========
  {
    number: 6,
    title: 'פונקציות מתקדם',
    topics: ['הרכבה', 'פונקציה הפוכה', 'חח"ע ועל'],
    questions: [
      {
        id: 'hw6-1',
        homeworkNumber: 6,
        questionNumber: 1,
        topic: 'הרכבת פונקציות',
        question: 'הוכיחו: אם g ∘ f חח"ע אז f חח"ע',
        solution: `נניח g ∘ f חח"ע.
יהיו a₁, a₂ ∈ A כך ש-f(a₁) = f(a₂).
אז g(f(a₁)) = g(f(a₂)).
כלומר (g ∘ f)(a₁) = (g ∘ f)(a₂).
מחח"ע של g ∘ f נסיק a₁ = a₂.
לכן f חח"ע.`,
        keyTechnique: 'שימוש בהגדרת חח"ע',
      },
    ],
  },

  // ========== תרגיל 7 - אינדוקציה ==========
  {
    number: 7,
    title: 'אינדוקציה',
    topics: ['אינדוקציה', 'סכומים', 'התחלקות'],
    questions: [
      {
        id: 'hw7-1a',
        homeworkNumber: 7,
        questionNumber: 1,
        subQuestion: 'א',
        topic: 'אינדוקציה',
        question: 'הוכיחו באינדוקציה: (1 - 1/2)(1 - 1/3)···(1 - 1/n) = 1/n לכל n ≥ 2',
        solution: `בסיס: עבור n = 2, אגף שמאל הוא 1 - 1/2 = 1/2 ואגף ימין הוא 1/2. ואכן מתקיים שוויון.

הנחה: נניח ש-(1 - 1/2)(1 - 1/3)···(1 - 1/n) = 1/n לאיזשהו n ≥ 2.

צעד: נוכיח ל-n+1:
(1 - 1/2)(1 - 1/3)···(1 - 1/n)(1 - 1/(n+1))
= (1/n)(1 - 1/(n+1))     [לפי הנחת האינדוקציה]
= (1/n)((n+1-1)/(n+1))
= (1/n)(n/(n+1))
= 1/(n+1) ✓`,
        keyTechnique: 'אינדוקציה סטנדרטית',
      },
      {
        id: 'hw7-1b',
        homeworkNumber: 7,
        questionNumber: 1,
        subQuestion: 'ב',
        topic: 'אינדוקציה',
        question: 'הוכיחו באינדוקציה: 10^(2n+1) + 3^(2n+1) מתחלק ב-13 לכל n טבעי',
        solution: `בסיס: עבור n = 0, המספר הוא 10¹ + 3¹ = 13 שאכן מתחלק ב-13.

הנחה: נניח ש-10^(2n+1) + 3^(2n+1) מתחלק ב-13 לאיזשהו n טבעי.

צעד: נוכיח ל-n+1:
10^(2(n+1)+1) + 3^(2(n+1)+1) = 10^(2n+3) + 3^(2n+3)
= 10^(2n+1)·100 + 3^(2n+1)·9
= 9(10^(2n+1) + 3^(2n+1)) + 91·10^(2n+1)
= 9·(מתחלק ב-13 לפי הנחה) + 13·7·10^(2n+1)
= 13(9k + 7·10^(2n+1))

לכן מתחלק ב-13. ✓`,
        keyTechnique: 'פירוק מתחכם + אינדוקציה',
      },
    ],
  },

  // ========== תרגיל 8 - קומבינטוריקה בסיסית ==========
  {
    number: 8,
    title: 'קומבינטוריקה - עקרונות בסיסיים',
    topics: ['עקרון הכפל', 'עקרון החיבור', 'תמורות'],
    questions: [
      {
        id: 'hw8-1',
        homeworkNumber: 8,
        questionNumber: 1,
        topic: 'עקרון הכפל',
        question: 'בכמה דרכים ניתן לסדר את האותיות ABCDE כך ש-A ו-B סמוכות?',
        solution: `נתייחס ל-AB כיחידה אחת.
יש לנו 4 "יחידות" לסדר: (AB), C, D, E.
מספר הסידורים: 4! = 24.

אבל A ו-B יכולות להיות גם בסדר BA.
לכן סה"כ: 2 · 4! = 2 · 24 = 48.`,
        keyTechnique: 'התייחסות לזוג כיחידה אחת',
      },
    ],
  },

  // ========== תרגיל 9 - בינום ניוטון ==========
  {
    number: 9,
    title: 'בינום ניוטון',
    topics: ['מקדם בינומי', 'בינום ניוטון', 'זהויות'],
    questions: [
      {
        id: 'hw9-1',
        homeworkNumber: 9,
        questionNumber: 1,
        topic: 'בינום ניוטון',
        question: 'חשבו את המקדם של x¹⁶ ב-(x² - 2/x)¹²',
        solution: `(x² - 2/x)¹² = Σₖ₌₀¹² (12 choose k)(x²)^(12-k)(-2/x)^k
= Σₖ₌₀¹² (12 choose k)(-2)^k · x^(2(12-k)-k)
= Σₖ₌₀¹² (12 choose k)(-2)^k · x^(24-3k)

נחפש k כך ש-24 - 3k = 16, כלומר k = 8/3.
k חייב להיות שלם, לכן אין איבר עם x¹⁶.

המקדם הוא 0.`,
        keyTechnique: 'הצבה בבינום ניוטון + פתרון משוואה',
      },
    ],
  },

  // ========== תרגיל 10 - קומבינטוריקה מתקדמת ==========
  {
    number: 10,
    title: 'קומבינטוריקה מתקדמת',
    topics: ['כוכבים ומחיצות', 'בחירה עם חזרות'],
    questions: [
      {
        id: 'hw10-1',
        homeworkNumber: 10,
        questionNumber: 1,
        topic: 'כוכבים ומחיצות',
        question: 'בכמה דרכים ניתן לחלק 20 כדורים זהים ל-4 קופסאות שונות?',
        solution: `זו בעיית "כוכבים ומחיצות".
יש לנו 20 כוכבים ו-3 מחיצות.
סה"כ 23 עצמים, בוחרים 3 מקומות למחיצות.

(20 + 4 - 1 choose 4 - 1) = (23 choose 3) = 23!/(3!·20!) = 1771`,
        keyTechnique: 'כוכבים ומחיצות',
      },
    ],
  },

  // ========== תרגיל 11 - עקרון שובך היונים ==========
  {
    number: 11,
    title: 'עקרון שובך היונים',
    topics: ['עש"ה', 'עש"ה מוכלל'],
    questions: [
      {
        id: 'hw11-1',
        homeworkNumber: 11,
        questionNumber: 1,
        topic: 'עש"ה',
        question: 'הוכיחו שבכל קבוצה של 6 אנשים יש 3 שמכירים זה את זה או 3 שלא מכירים זה את זה',
        solution: `יהי a אחד מ-6 האנשים.
a יכול להכיר או לא להכיר כל אחד מ-5 האחרים.

לפי עש"ה: יש לפחות ⌈5/2⌉ = 3 אנשים ש-a מכיר, או 3 ש-a לא מכיר.

מקרה 1: a מכיר לפחות 3 אנשים, נקרא להם b,c,d.
  אם שניים מהם מכירים - יחד עם a יש 3 שמכירים.
  אם אף שניים לא מכירים - יש 3 שלא מכירים (b,c,d).

מקרה 2: a לא מכיר לפחות 3 אנשים, נקרא להם b,c,d.
  אם שניים מהם לא מכירים - יחד עם a יש 3 שלא מכירים.
  אם כל שניים מכירים - יש 3 שמכירים (b,c,d).`,
        keyTechnique: 'עש"ה + חלוקה למקרים',
      },
    ],
  },
];

// Helper functions
export function getHomeworkByNumber(num: number): HomeworkSet | undefined {
  return homeworkSets.find(hw => hw.number === num);
}

export function getQuestionsByTopic(topic: string): HomeworkQuestion[] {
  return homeworkSets.flatMap(hw =>
    hw.questions.filter(q => q.topic.includes(topic))
  );
}

export function getAllHomework(): HomeworkSet[] {
  return homeworkSets;
}
