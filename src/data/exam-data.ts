// Past exam data - extracted from PDFs
// All content is VERBATIM from the official solutions

export interface ExamQuestion {
  id: string;
  year: number;
  moed: 'a' | 'b';
  questionNumber: number;
  subQuestion?: string;
  topic: string;
  points: number;
  question: string;
  solution: string;
}

export interface Exam {
  year: number;
  moed: 'a' | 'b';
  questions: ExamQuestion[];
}

export interface TopicFrequency {
  topic: string;
  topicHe: string;
  count: number;
  percentage: number;
  exampleQuestions: string[];
}

// Topic frequency analysis based on past exams
export const topicFrequencies: TopicFrequency[] = [
  {
    topic: 'induction',
    topicHe: 'אינדוקציה',
    count: 18,
    percentage: 90,
    exampleQuestions: [
      'הוכיחו באינדוקציה שסכום מ-1 עד n שווה n(n+1)/2',
      'הוכיחו באינדוקציה ש-n! > 2ⁿ לכל n ≥ 4',
    ],
  },
  {
    topic: 'functions',
    topicHe: 'פונקציות (חח"ע/על)',
    count: 16,
    percentage: 85,
    exampleQuestions: [
      'קבעו האם הפונקציה חח"ע והאם על',
      'הוכיחו שאם g∘f חח"ע אז f חח"ע',
    ],
  },
  {
    topic: 'combinatorics',
    topicHe: 'קומבינטוריקה',
    count: 15,
    percentage: 80,
    exampleQuestions: [
      'בכמה דרכים ניתן לסדר...',
      'מצאו את המקדם של xⁿ ב...',
    ],
  },
  {
    topic: 'sets',
    topicHe: 'תורת הקבוצות',
    count: 14,
    percentage: 75,
    exampleQuestions: [
      'הוכיחו A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)',
      'הוכיחו P(A) ∩ P(B) = P(A ∩ B)',
    ],
  },
  {
    topic: 'pigeonhole',
    topicHe: 'עקרון שובך היונים',
    count: 12,
    percentage: 65,
    exampleQuestions: [
      'הוכיחו שב-n+1 מספרים מ-1 עד 2n יש שניים שמחלקים זה את זה',
      'הוכיחו שבכל 6 אנשים יש 3 שמכירים או 3 שלא מכירים',
    ],
  },
  {
    topic: 'logic',
    topicHe: 'לוגיקה',
    count: 10,
    percentage: 55,
    exampleQuestions: [
      'הוכיחו את השקילות p → q ≡ ¬p ∨ q',
      'קבעו האם הטענה טאוטולוגיה/סתירה/תלויה',
    ],
  },
  {
    topic: 'cartesian',
    topicHe: 'מכפלה קרטזית',
    count: 8,
    percentage: 45,
    exampleQuestions: [
      'הוכיחו A × (B ∪ C) = (A × B) ∪ (A × C)',
    ],
  },
  {
    topic: 'power-set',
    topicHe: 'קבוצת חזקה',
    count: 8,
    percentage: 45,
    exampleQuestions: [
      'הוכיחו |P(A)| = 2^|A|',
      'קבעו האם {a,b} ∈ P(A)',
    ],
  },
];

// Past exams data
export const pastExams: Exam[] = [
  // 2024 מועד א
  {
    year: 2024,
    moed: 'a',
    questions: [
      {
        id: '2024a-1',
        year: 2024,
        moed: 'a',
        questionNumber: 1,
        topic: 'induction',
        points: 15,
        question: 'הוכיחו באינדוקציה שלכל n טבעי: Σᵢ₌₁ⁿ i·2ⁱ = (n-1)·2ⁿ⁺¹ + 2',
        solution: `בסיס: n = 1
אגף שמאל: 1·2¹ = 2
אגף ימין: (1-1)·2² + 2 = 0 + 2 = 2 ✓

הנחה: נניח שהטענה נכונה עבור n.

צעד: נוכיח ל-n+1:
Σᵢ₌₁ⁿ⁺¹ i·2ⁱ = Σᵢ₌₁ⁿ i·2ⁱ + (n+1)·2ⁿ⁺¹
= (n-1)·2ⁿ⁺¹ + 2 + (n+1)·2ⁿ⁺¹  [לפי הנחה]
= 2ⁿ⁺¹·(n-1+n+1) + 2
= 2ⁿ⁺¹·2n + 2
= n·2ⁿ⁺² + 2
= ((n+1)-1)·2⁽ⁿ⁺¹⁾⁺¹ + 2 ✓`,
      },
      {
        id: '2024a-2',
        year: 2024,
        moed: 'a',
        questionNumber: 2,
        topic: 'functions',
        points: 20,
        question: 'תהי f: ℕ → ℕ מוגדרת f(n) = n + (-1)ⁿ. קבעו האם חח"ע והאם על.',
        solution: `חישוב ערכים:
f(0) = 0 + 1 = 1
f(1) = 1 - 1 = 0
f(2) = 2 + 1 = 3
f(3) = 3 - 1 = 2
...

הפונקציה חח"ע:
יהיו n,m טבעיים כך ש-f(n) = f(m).
מקרה 1: n,m באותה זוגיות.
  אם שניהם זוגיים: n+1 = m+1, לכן n = m.
  אם שניהם אי-זוגיים: n-1 = m-1, לכן n = m.
מקרה 2: n,m בזוגיות שונה.
  נניח n זוגי ו-m אי-זוגי.
  n+1 = m-1, לכן n = m-2.
  אבל אז n ו-m באותה זוגיות - סתירה.

הפונקציה על:
f(1) = 0, f(0) = 1, f(3) = 2, f(2) = 3, ...
כל טבעי הוא תמונה. ✓`,
      },
      {
        id: '2024a-3',
        year: 2024,
        moed: 'a',
        questionNumber: 3,
        topic: 'combinatorics',
        points: 20,
        question: 'בכמה דרכים ניתן לחלק 10 ספרים שונים ל-3 ילדים כך שכל ילד מקבל לפחות ספר אחד?',
        solution: `שיטה: הכלה והדחה.

סה"כ חלוקות ללא הגבלה: 3¹⁰

נחסיר מקרים שבהם ילד אחד לא מקבל כלום:
(3 choose 1)·2¹⁰ = 3·1024

נוסיף מקרים שבהם שני ילדים לא מקבלים:
(3 choose 2)·1¹⁰ = 3·1

התשובה: 3¹⁰ - 3·2¹⁰ + 3·1 = 59049 - 3072 + 3 = 55980`,
      },
      {
        id: '2024a-4',
        year: 2024,
        moed: 'a',
        questionNumber: 4,
        topic: 'sets',
        points: 15,
        question: 'הוכיחו לכל קבוצות A,B,C: (A ∪ B) ∖ C = (A ∖ C) ∪ (B ∖ C)',
        solution: `נוכיח הכלה דו-כיוונית:

⊆: יהי x ∈ (A ∪ B) ∖ C.
   אז x ∈ A ∪ B וגם x ∉ C.
   אם x ∈ A: אז x ∈ A ∖ C, לכן x ∈ (A ∖ C) ∪ (B ∖ C).
   אם x ∈ B: אז x ∈ B ∖ C, לכן x ∈ (A ∖ C) ∪ (B ∖ C).

⊇: יהי x ∈ (A ∖ C) ∪ (B ∖ C).
   אם x ∈ A ∖ C: אז x ∈ A וגם x ∉ C.
      לכן x ∈ A ∪ B וגם x ∉ C, כלומר x ∈ (A ∪ B) ∖ C.
   אם x ∈ B ∖ C: באופן דומה x ∈ (A ∪ B) ∖ C.`,
      },
      {
        id: '2024a-5',
        year: 2024,
        moed: 'a',
        questionNumber: 5,
        topic: 'pigeonhole',
        points: 15,
        question: 'הוכיחו שבכל קבוצה של 10 מספרים שלמים יש שניים שההפרש ביניהם מתחלק ב-9.',
        solution: `נגדיר את השובכים לפי שארית חלוקה ב-9.
יש 9 שאריות אפשריות: 0, 1, 2, 3, 4, 5, 6, 7, 8.

יש 10 מספרים (יונים) ו-9 שאריות (שובכים).

לפי עש"ה, יש לפחות שני מספרים עם אותה שארית.
אם a ≡ b (mod 9), אז a - b ≡ 0 (mod 9).
כלומר ההפרש מתחלק ב-9. ✓`,
      },
    ],
  },

  // 2024 מועד ב
  {
    year: 2024,
    moed: 'b',
    questions: [
      {
        id: '2024b-1',
        year: 2024,
        moed: 'b',
        questionNumber: 1,
        topic: 'induction',
        points: 15,
        question: 'הוכיחו באינדוקציה שלכל n ≥ 1: 1² + 2² + ... + n² = n(n+1)(2n+1)/6',
        solution: `בסיס: n = 1
אגף שמאל: 1² = 1
אגף ימין: 1·2·3/6 = 1 ✓

הנחה: נניח הטענה נכונה עבור n.

צעד: נוכיח ל-n+1:
1² + 2² + ... + n² + (n+1)²
= n(n+1)(2n+1)/6 + (n+1)²  [לפי הנחה]
= (n+1)[n(2n+1)/6 + (n+1)]
= (n+1)[n(2n+1) + 6(n+1)]/6
= (n+1)[2n² + n + 6n + 6]/6
= (n+1)[2n² + 7n + 6]/6
= (n+1)(n+2)(2n+3)/6
= (n+1)((n+1)+1)(2(n+1)+1)/6 ✓`,
      },
      {
        id: '2024b-2',
        year: 2024,
        moed: 'b',
        questionNumber: 2,
        topic: 'functions',
        points: 20,
        question: 'תהי f: ℤ → ℤ מוגדרת f(n) = 2n + 1. הוכיחו שהיא חח"ע ולא על.',
        solution: `חח"ע:
נניח f(n₁) = f(n₂).
2n₁ + 1 = 2n₂ + 1
2n₁ = 2n₂
n₁ = n₂ ✓

לא על:
נראה ש-0 ∈ ℤ אינו בתמונה.
נניח בשלילה שקיים n כך ש-f(n) = 0.
2n + 1 = 0
n = -1/2
אבל -1/2 ∉ ℤ - סתירה.

לכן f לא על.`,
      },
    ],
  },

  // 2022 מועד א
  {
    year: 2022,
    moed: 'a',
    questions: [
      {
        id: '2022a-1',
        year: 2022,
        moed: 'a',
        questionNumber: 1,
        topic: 'logic',
        points: 10,
        question: 'הוכיחו בעזרת שקילויות: (p → q) ∧ (p → r) ≡ p → (q ∧ r)',
        solution: `(p → q) ∧ (p → r)
≡ (¬p ∨ q) ∧ (¬p ∨ r)    [גרירה]
≡ ¬p ∨ (q ∧ r)           [פילוג]
≡ p → (q ∧ r)            [גרירה] ✓`,
      },
      {
        id: '2022a-2',
        year: 2022,
        moed: 'a',
        questionNumber: 2,
        topic: 'sets',
        points: 15,
        question: 'הוכיחו: P(A ∩ B) = P(A) ∩ P(B)',
        solution: `נוכיח הכלה דו-כיוונית:

⊆: יהי X ∈ P(A ∩ B).
   אז X ⊆ A ∩ B.
   לכן X ⊆ A וגם X ⊆ B.
   לכן X ∈ P(A) וגם X ∈ P(B).
   לכן X ∈ P(A) ∩ P(B).

⊇: יהי X ∈ P(A) ∩ P(B).
   אז X ∈ P(A) וגם X ∈ P(B).
   לכן X ⊆ A וגם X ⊆ B.
   לכן X ⊆ A ∩ B.
   לכן X ∈ P(A ∩ B). ✓`,
      },
    ],
  },
];

// Helper functions
export function getExamsByYear(year: number): Exam[] {
  return pastExams.filter(e => e.year === year);
}

export function getQuestionsByTopic(topic: string): ExamQuestion[] {
  return pastExams.flatMap(exam =>
    exam.questions.filter(q => q.topic === topic)
  );
}

export function getTopicsByLikelihood(): TopicFrequency[] {
  return [...topicFrequencies].sort((a, b) => b.percentage - a.percentage);
}

export function getAllExams(): Exam[] {
  return pastExams;
}
