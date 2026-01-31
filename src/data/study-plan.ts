// Study plan data for exam on Wednesday, February 4, 2025
// Available study days: Saturday, Sunday, Monday, Tuesday

export interface StudyDay {
  date: string;
  dayName: string;
  dayNameHe: string;
  isStudyDay: boolean;
  topics: StudyTopic[];
  tasks: StudyTask[];
}

export interface StudyTopic {
  name: string;
  nameHe: string;
  priority: 'high' | 'medium' | 'low';
  estimatedHours: number;
}

export interface StudyTask {
  id: string;
  title: string;
  description: string;
  type: 'review' | 'practice' | 'memorize' | 'exam-simulation';
  estimatedMinutes: number;
  resources: string[];
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  focus: string;
  days: StudyDay[];
}

// Generate study plan
export function generateStudyPlan(): WeekPlan[] {
  // Exam date: Wednesday, February 4, 2025
  // Today: January 31, 2025 (Friday)
  // Available days: Sat Feb 1, Sun Feb 2, Mon Feb 3, Tue Feb 4 (exam day)

  const plan: WeekPlan[] = [
    {
      weekNumber: 1,
      startDate: '2025-02-01',
      endDate: '2025-02-04',
      focus: 'סיכום אינטנסיבי לקראת המבחן',
      days: [
        {
          date: '2025-02-01',
          dayName: 'Saturday',
          dayNameHe: 'שבת',
          isStudyDay: true,
          topics: [
            { name: 'induction', nameHe: 'אינדוקציה', priority: 'high', estimatedHours: 3 },
            { name: 'functions', nameHe: 'פונקציות', priority: 'high', estimatedHours: 3 },
          ],
          tasks: [
            {
              id: 'sat-1',
              title: 'חזרה על אינדוקציה',
              description: 'עבור על הגדרות, שלבי ההוכחה, ודוגמאות מההרצאות',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאה 7', 'שיעורי בית 7'],
            },
            {
              id: 'sat-2',
              title: 'תרגול אינדוקציה',
              description: 'פתור 5 שאלות אינדוקציה ממבחנים',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחן 2024 א', 'מבחן 2024 ב'],
            },
            {
              id: 'sat-3',
              title: 'חזרה על פונקציות',
              description: 'הגדרות חח"ע, על, הרכבה, פונקציה הפוכה',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 5-6', 'שיעורי בית 5-6'],
            },
            {
              id: 'sat-4',
              title: 'תרגול פונקציות',
              description: 'פתור שאלות חח"ע/על מהמבחנים',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחנים 2022-2024'],
            },
          ],
        },
        {
          date: '2025-02-02',
          dayName: 'Sunday',
          dayNameHe: 'ראשון',
          isStudyDay: true,
          topics: [
            { name: 'combinatorics', nameHe: 'קומבינטוריקה', priority: 'high', estimatedHours: 3 },
            { name: 'sets', nameHe: 'קבוצות', priority: 'medium', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'sun-1',
              title: 'חזרה על קומבינטוריקה',
              description: 'עקרון הכפל, תמורות, צירופים, בינום ניוטון',
              type: 'review',
              estimatedMinutes: 60,
              resources: ['הרצאות 8-10'],
            },
            {
              id: 'sun-2',
              title: 'שינון נוסחאות',
              description: 'שנן את כל נוסחאות הקומבינטוריקה',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['טבלת נוסחאות'],
            },
            {
              id: 'sun-3',
              title: 'תרגול קומבינטוריקה',
              description: 'פתור 5 שאלות ממבחנים',
              type: 'practice',
              estimatedMinutes: 90,
              resources: ['מבחנים'],
            },
            {
              id: 'sun-4',
              title: 'חזרה על קבוצות',
              description: 'הכלה, איחוד, חיתוך, הפרש, קבוצת חזקה',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הרצאות 3-4', 'שיעורי בית 3-4'],
            },
            {
              id: 'sun-5',
              title: 'תרגול קבוצות',
              description: 'פתור 3 הוכחות על קבוצות',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['מבחנים'],
            },
          ],
        },
        {
          date: '2025-02-03',
          dayName: 'Monday',
          dayNameHe: 'שני',
          isStudyDay: true,
          topics: [
            { name: 'pigeonhole', nameHe: 'עקרון שובך היונים', priority: 'high', estimatedHours: 2 },
            { name: 'logic', nameHe: 'לוגיקה', priority: 'medium', estimatedHours: 1 },
            { name: 'exam-simulation', nameHe: 'סימולציית מבחן', priority: 'high', estimatedHours: 3 },
          ],
          tasks: [
            {
              id: 'mon-1',
              title: 'חזרה על עש"ה',
              description: 'עקרון שובך היונים והעקרון המוכלל',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הרצאה 11'],
            },
            {
              id: 'mon-2',
              title: 'תרגול עש"ה',
              description: 'פתור 3 שאלות עש"ה ממבחנים',
              type: 'practice',
              estimatedMinutes: 60,
              resources: ['מבחנים'],
            },
            {
              id: 'mon-3',
              title: 'חזרה מהירה על לוגיקה',
              description: 'שקילויות, דה-מורגן, גרירה',
              type: 'review',
              estimatedMinutes: 30,
              resources: ['הרצאות 1-2'],
            },
            {
              id: 'mon-4',
              title: 'מבחן הכנה',
              description: 'פתור מבחן שלם בתנאי מבחן (3 שעות)',
              type: 'exam-simulation',
              estimatedMinutes: 180,
              resources: ['מבחן 2024 א או 2022 ב'],
            },
          ],
        },
        {
          date: '2025-02-04',
          dayName: 'Tuesday',
          dayNameHe: 'שלישי',
          isStudyDay: true,
          topics: [
            { name: 'final-review', nameHe: 'חזרה אחרונה', priority: 'high', estimatedHours: 2 },
          ],
          tasks: [
            {
              id: 'tue-1',
              title: 'חזרה על נוסחאות',
              description: 'עבור על כל הנוסחאות החשובות',
              type: 'memorize',
              estimatedMinutes: 30,
              resources: ['דף נוסחאות'],
            },
            {
              id: 'tue-2',
              title: 'חזרה על טעויות',
              description: 'עבור על הטעויות מהסימולציה אתמול',
              type: 'review',
              estimatedMinutes: 45,
              resources: ['הפתרון שלך מאתמול'],
            },
            {
              id: 'tue-3',
              title: 'מנוחה לפני המבחן',
              description: 'הפסק ללמוד 2-3 שעות לפני המבחן',
              type: 'review',
              estimatedMinutes: 0,
              resources: [],
            },
          ],
        },
      ],
    },
  ];

  return plan;
}

// Key formulas to memorize
export const keyFormulas = {
  combinatorics: [
    { formula: 'n! = n × (n-1) × ... × 2 × 1', name: 'עצרת' },
    { formula: 'P(n,k) = n!/(n-k)!', name: 'תמורה חלקית' },
    { formula: 'C(n,k) = n!/(k!(n-k)!)', name: 'צירוף (מקדם בינומי)' },
    { formula: '(x+y)ⁿ = Σₖ C(n,k)xᵏyⁿ⁻ᵏ', name: 'בינום ניוטון' },
    { formula: 'Σₖ C(n,k) = 2ⁿ', name: 'סכום מקדמים' },
    { formula: 'סידור במעגל: (n-1)!', name: 'תמורה מעגלית' },
    { formula: 'כוכבים ומחיצות: C(n+k-1, k-1)', name: 'חלוקה לקבוצות' },
  ],
  sets: [
    { formula: '|A ∪ B| = |A| + |B| - |A ∩ B|', name: 'הכלה-הדחה' },
    { formula: '|P(A)| = 2^|A|', name: 'גודל קבוצת חזקה' },
    { formula: '|A × B| = |A| × |B|', name: 'גודל מכפלה קרטזית' },
    { formula: '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ', name: 'דה מורגן' },
    { formula: '(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ', name: 'דה מורגן' },
  ],
  logic: [
    { formula: 'p → q ≡ ¬p ∨ q', name: 'גרירה' },
    { formula: '¬(p → q) ≡ p ∧ ¬q', name: 'שלילת גרירה' },
    { formula: 'p → q ≡ ¬q → ¬p', name: 'קונטרה פוזיטיב' },
    { formula: '¬(p ∧ q) ≡ ¬p ∨ ¬q', name: 'דה מורגן' },
    { formula: '¬(p ∨ q) ≡ ¬p ∧ ¬q', name: 'דה מורגן' },
  ],
  induction: [
    { formula: 'Σᵢ₌₁ⁿ i = n(n+1)/2', name: 'סכום סדרה חשבונית' },
    { formula: 'Σᵢ₌₁ⁿ i² = n(n+1)(2n+1)/6', name: 'סכום ריבועים' },
    { formula: 'Σᵢ₌₀ⁿ qⁱ = (qⁿ⁺¹-1)/(q-1)', name: 'סכום סדרה הנדסית' },
  ],
  pigeonhole: [
    { formula: 'n יונים ב-k שובכים → לפחות ⌈n/k⌉ באחד', name: 'עש"ה מוכלל' },
  ],
};

// Study statistics
export const studyStats = {
  totalHours: 20,
  daysUntilExam: 4,
  topicsToReview: 8,
  practiceQuestionsTarget: 30,
};
