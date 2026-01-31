// Week summaries based on lecture content - Discrete Mathematics
// All content is extracted verbatim from the lectures

export interface Definition {
  id: string;
  title: string;
  content: string;
  notation?: string;
  examples?: string[];
  source: string;
}

export interface Theorem {
  id: string;
  title: string;
  statement: string;
  proof?: string;
  source: string;
}

export interface Technique {
  id: string;
  title: string;
  description: string;
  steps?: string[];
  whenToUse: string;
  source: string;
}

export interface WeekContent {
  weekNumber: number;
  title: string;
  titleHe: string;
  lectures: number[];
  topics: string[];
  summary: string;
  definitions: Definition[];
  theorems: Theorem[];
  techniques: Technique[];
  keyFormulas?: string[];
  commonMistakes?: string[];
  examTips?: string[];
}

export const weeksContent: WeekContent[] = [
  // ============ WEEK 1: Logic ============
  {
    weekNumber: 1,
    title: 'Logic',
    titleHe: 'לוגיקה',
    lectures: [1, 2],
    topics: ['טענות', 'קשרים לוגיים', 'טבלאות אמת', 'שקילויות'],
    summary: 'הרצאות 1-2 עוסקות ביסודות הלוגיקה המתמטית: טענות, ערכי אמת, קשרים לוגיים וטבלאות אמת.',
    definitions: [
      {
        id: 'def-1-1',
        title: 'טענה',
        content: 'טענה היא אמירה שניתן לקבוע אם היא אמיתית או שקרית (יתכן שבהקשר מסוים).',
        examples: [
          '2 + 2 = 4 - טענה אמיתית (T)',
          '1 × 1 = 4 - טענה שקרית (F)',
          'היום יום שני - טענה (תלויית הקשר)',
          '"תתעורר!" - לא טענה (ציווי)',
          '"איפה המפתחות?" - לא טענה (שאלה)',
        ],
        source: 'הרצאה 1, עמוד 4',
      },
      {
        id: 'def-1-2',
        title: 'שלילה (NOT)',
        content: 'יהי p טענה. השלילה של p, אשר תסומן ¬p (או p̄), היא טענה שערך האמת שלה הפוך לערך האמת של p.',
        notation: '¬p, p̄, NOT p',
        source: 'הרצאה 1',
      },
      {
        id: 'def-1-3',
        title: 'וגם (AND)',
        content: 'יהיו p, q טענות. הקונייונקציה של p ו-q, אשר תסומן p ∧ q, היא טענה שערך האמת שלה T אם ורק אם גם p וגם q הן T.',
        notation: 'p ∧ q, p AND q',
        source: 'הרצאה 1',
      },
      {
        id: 'def-1-4',
        title: 'או (OR)',
        content: 'יהיו p, q טענות. הדיסיונקציה של p ו-q, אשר תסומן p ∨ q, היא טענה שערך האמת שלה T אם לפחות אחת מהטענות p או q היא T.',
        notation: 'p ∨ q, p OR q',
        source: 'הרצאה 1',
      },
      {
        id: 'def-1-5',
        title: 'גרירה (Implication)',
        content: 'יהיו p, q טענות. הגרירה מ-p ל-q, אשר תסומן p → q, היא טענה שערך האמת שלה F אם ורק אם p היא T ו-q היא F.',
        notation: 'p → q, p ⇒ q, "אם p אז q"',
        examples: [
          'T → T = T',
          'T → F = F',
          'F → T = T',
          'F → F = T',
        ],
        source: 'הרצאה 1',
      },
      {
        id: 'def-1-6',
        title: 'שקילות (Equivalence)',
        content: 'יהיו p, q טענות. השקילות של p ו-q, אשר תסומן p ↔ q, היא טענה שערך האמת שלה T אם ורק אם לשתי הטענות אותו ערך אמת.',
        notation: 'p ↔ q, p ⟺ q, "p אם ורק אם q"',
        source: 'הרצאה 1',
      },
      {
        id: 'def-1-7',
        title: 'טאוטולוגיה',
        content: 'טענה מורכבת שערך האמת שלה תמיד T, לכל הצבה אפשרית של ערכי האמת למשתנים.',
        examples: ['p ∨ ¬p ≡ T'],
        source: 'הרצאה 1',
      },
      {
        id: 'def-1-8',
        title: 'סתירה',
        content: 'טענה מורכבת שערך האמת שלה תמיד F, לכל הצבה אפשרית של ערכי האמת למשתנים.',
        examples: ['p ∧ ¬p ≡ F'],
        source: 'הרצאה 1',
      },
    ],
    theorems: [
      {
        id: 'thm-1-1',
        title: 'חוקי דה-מורגן',
        statement: '¬(p ∧ q) ≡ ¬p ∨ ¬q\n¬(p ∨ q) ≡ ¬p ∧ ¬q',
        source: 'הרצאה 1',
      },
      {
        id: 'thm-1-2',
        title: 'שקילות גרירה',
        statement: 'p → q ≡ ¬p ∨ q',
        source: 'הרצאה 1',
      },
      {
        id: 'thm-1-3',
        title: 'קונטרה פוזיטיב',
        statement: 'p → q ≡ ¬q → ¬p',
        source: 'הרצאה 2',
      },
      {
        id: 'thm-1-4',
        title: 'שלילת גרירה',
        statement: '¬(p → q) ≡ p ∧ ¬q',
        source: 'הרצאה 2',
      },
    ],
    techniques: [
      {
        id: 'tech-1-1',
        title: 'הוכחה ישירה',
        description: 'להוכחת p → q נניח ש-p נכונה ונראה ש-q נכונה.',
        steps: [
          'נניח p',
          'נבצע שרשרת היסקים',
          'נגיע ל-q',
        ],
        whenToUse: 'כאשר יש דרך ישירה להגיע מההנחה למסקנה',
        source: 'הרצאה 2',
      },
      {
        id: 'tech-1-2',
        title: 'הוכחה בשלילה (Proof by Contradiction)',
        description: 'להוכחת p → q נניח p ∧ ¬q ונגיע לסתירה.',
        steps: [
          'נניח p',
          'נניח בשלילה ¬q',
          'נגיע לסתירה',
          'לכן q נכונה',
        ],
        whenToUse: 'כאשר קשה להוכיח ישירות, או כשיש שימוש ב"קיים" או "יחיד"',
        source: 'הרצאה 2',
      },
      {
        id: 'tech-1-3',
        title: 'הוכחה בקונטרה פוזיטיב',
        description: 'במקום להוכיח p → q נוכיח ¬q → ¬p.',
        steps: [
          'נניח ¬q',
          'נוכיח ¬p',
        ],
        whenToUse: 'כאשר קל יותר לעבוד עם השליליות',
        source: 'הרצאה 2',
      },
    ],
    keyFormulas: [
      'p → q ≡ ¬p ∨ q',
      'p ↔ q ≡ (p → q) ∧ (q → p)',
      '¬(p ∧ q) ≡ ¬p ∨ ¬q',
      '¬(p ∨ q) ≡ ¬p ∧ ¬q',
      'p → q ≡ ¬q → ¬p',
    ],
    examTips: [
      'תמיד לזכור: גרירה F רק כש-T→F',
      'בהוכחה בשלילה - לא לשכוח לציין "נניח בשלילה"',
      'קונטרה פוזיטיב והוכחה בשלילה הן שיטות שונות!',
    ],
  },

  // ============ WEEK 2: Set Theory Basics ============
  {
    weekNumber: 2,
    title: 'Set Theory - Basics',
    titleHe: 'תורת הקבוצות - יסודות',
    lectures: [3],
    topics: ['קבוצות', 'שייכות', 'הכלה', 'פעולות על קבוצות'],
    summary: 'הרצאה 3 מציגה את יסודות תורת הקבוצות: הגדרת קבוצה, שייכות, הכלה, ופעולות בסיסיות.',
    definitions: [
      {
        id: 'def-2-1',
        title: 'קבוצה',
        content: 'קבוצה היא אוסף של אובייקטים (שנקראים איברי הקבוצה) ללא חשיבות לסדר שלהם או למספר החזרות.',
        examples: [
          'A = {Alice, Charlie, Bob, Eve}',
          'B = {red, blue, yellow}',
          '{1, 2, 2, 3} = {1, 2, 3}',
        ],
        source: 'הרצאה 3, עמוד 2',
      },
      {
        id: 'def-2-2',
        title: 'שייכות',
        content: 'נאמר ש-x שייך ל-A ונסמן x ∈ A אם x הוא איבר בקבוצה A.',
        notation: 'x ∈ A (שייך), x ∉ A (לא שייך)',
        examples: [
          '2 ∈ ℕ',
          'π ∈ ℝ',
          '1/2 ∉ ℤ',
        ],
        source: 'הרצאה 3, עמוד 3',
      },
      {
        id: 'def-2-3',
        title: 'הכלה (תת-קבוצה)',
        content: 'תהיינה A, B קבוצות. נאמר ש-A מוכלת ב-B (A תת-קבוצה של B) ונסמן A ⊆ B אם כל איבר ב-A הוא גם איבר ב-B.',
        notation: 'A ⊆ B, A ⊂ B (הכלה ממש)',
        examples: [
          '{1, 2} ⊆ {1, 2, 3}',
          'ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ',
        ],
        source: 'הרצאה 3',
      },
      {
        id: 'def-2-4',
        title: 'שוויון קבוצות',
        content: 'A = B אם ורק אם A ⊆ B וגם B ⊆ A.',
        source: 'הרצאה 3',
      },
      {
        id: 'def-2-5',
        title: 'הקבוצה הריקה',
        content: 'הקבוצה הריקה ∅ היא הקבוצה שאין בה איברים. מתקיים ∅ ⊆ A לכל קבוצה A.',
        notation: '∅ או {}',
        source: 'הרצאה 3',
      },
      {
        id: 'def-2-6',
        title: 'כלל יצירה (Set Builder)',
        content: 'ניתן להגדיר קבוצה באופן: S = {x ∈ A | P(x)} - קבוצת כל האיברים x מ-A שעבורם P(x) = T.',
        examples: [
          '{n ∈ ℕ | Even(n)} = {0, 2, 4, 6, ...}',
          '{x ∈ ℝ | x > 0} = ℝ⁺',
        ],
        source: 'הרצאה 3, עמוד 4',
      },
      {
        id: 'def-2-7',
        title: 'איחוד',
        content: 'A ∪ B = {x | x ∈ A ∨ x ∈ B}',
        notation: 'A ∪ B',
        source: 'הרצאה 3',
      },
      {
        id: 'def-2-8',
        title: 'חיתוך',
        content: 'A ∩ B = {x | x ∈ A ∧ x ∈ B}',
        notation: 'A ∩ B',
        source: 'הרצאה 3',
      },
      {
        id: 'def-2-9',
        title: 'הפרש',
        content: 'A \\ B = {x | x ∈ A ∧ x ∉ B}',
        notation: 'A \\ B או A - B',
        source: 'הרצאה 3',
      },
      {
        id: 'def-2-10',
        title: 'משלים',
        content: 'Aᶜ = U \\ A כאשר U הוא עולם הדיון.',
        notation: 'Aᶜ, Ā, A\'',
        source: 'הרצאה 3',
      },
    ],
    theorems: [
      {
        id: 'thm-2-1',
        title: 'חוקי דה-מורגן לקבוצות',
        statement: '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ\n(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ',
        source: 'הרצאה 3',
      },
      {
        id: 'thm-2-2',
        title: 'קבוצה ריקה מוכלת בכל קבוצה',
        statement: 'לכל קבוצה A מתקיים ∅ ⊆ A.',
        proof: 'נניח בשלילה ש-∅ ⊄ A. אז קיים x ∈ ∅ כך ש-x ∉ A. סתירה, כי ∅ ריקה.',
        source: 'הרצאה 3',
      },
    ],
    techniques: [
      {
        id: 'tech-2-1',
        title: 'הוכחת שוויון קבוצות',
        description: 'להוכיח A = B יש להוכיח הכלה דו-כיוונית.',
        steps: [
          'הוכח A ⊆ B: יהי x ∈ A, הראה x ∈ B',
          'הוכח B ⊆ A: יהי x ∈ B, הראה x ∈ A',
        ],
        whenToUse: 'בכל הוכחת שוויון קבוצות',
        source: 'הרצאה 3',
      },
      {
        id: 'tech-2-2',
        title: 'הוכחת הכלה',
        description: 'להוכיח A ⊆ B: יהי x ∈ A, נוכיח x ∈ B.',
        steps: [
          'יהי x ∈ A',
          'הראה ש-x מקיים את התנאים להיות ב-B',
        ],
        whenToUse: 'בהוכחת הכלה או שוויון',
        source: 'הרצאה 3',
      },
    ],
    keyFormulas: [
      'A = B ⟺ A ⊆ B ∧ B ⊆ A',
      '|A ∪ B| = |A| + |B| - |A ∩ B|',
      '(A ∪ B)ᶜ = Aᶜ ∩ Bᶜ',
      '(A ∩ B)ᶜ = Aᶜ ∪ Bᶜ',
    ],
    examTips: [
      'שייכות (∈) זה לאיברים, הכלה (⊆) זה לקבוצות',
      '{a} ≠ a - קבוצה עם איבר אחד היא לא האיבר עצמו',
      '∅ ≠ {∅} - הקבוצה הריקה שונה מקבוצה שמכילה את הקבוצה הריקה',
    ],
  },

  // ============ WEEK 3: Power Sets ============
  {
    weekNumber: 3,
    title: 'Power Sets & Cartesian Product',
    titleHe: 'קבוצת חזקה ומכפלה קרטזית',
    lectures: [4],
    topics: ['קבוצת חזקה', 'מכפלה קרטזית', 'זוגות סדורים'],
    summary: 'הרצאה 4 עוסקת בקבוצת חזקה, מכפלה קרטזית וזוגות סדורים.',
    definitions: [
      {
        id: 'def-3-1',
        title: 'קבוצת חזקה',
        content: 'תהי A קבוצה. קבוצת החזקה של A, אשר תסומן P(A), היא הקבוצה P(A) = {S | S ⊆ A} - קבוצת כל תתי הקבוצות של A.',
        notation: 'P(A), 2^A',
        examples: [
          'P({5,7}) = {∅, {5}, {7}, {5,7}}',
          'P(∅) = {∅}',
          '|P(A)| = 2^|A|',
        ],
        source: 'הרצאה 4, עמוד 2',
      },
      {
        id: 'def-3-2',
        title: 'זוג סדור',
        content: 'זוג סדור (a, b) הוא אובייקט מתמטי כך ש-(a, b) = (c, d) אם ורק אם a = c וגם b = d.',
        notation: '(a, b)',
        examples: [
          '(1, 2) ≠ (2, 1)',
          '(a, b) = (c, d) ⟺ a = c ∧ b = d',
        ],
        source: 'הרצאה 4',
      },
      {
        id: 'def-3-3',
        title: 'מכפלה קרטזית',
        content: 'תהיינה A, B קבוצות. המכפלה הקרטזית שלהן היא A × B = {(a, b) | a ∈ A ∧ b ∈ B}.',
        notation: 'A × B',
        examples: [
          '{1, 2} × {a, b} = {(1,a), (1,b), (2,a), (2,b)}',
          '|A × B| = |A| · |B|',
        ],
        source: 'הרצאה 4',
      },
    ],
    theorems: [
      {
        id: 'thm-3-1',
        title: 'גודל קבוצת חזקה',
        statement: 'לכל קבוצה סופית A מתקיים |P(A)| = 2^|A|.',
        proof: 'לכל איבר ב-A יש 2 אפשרויות: להיות בתת-קבוצה או לא. לכן יש 2^|A| תתי-קבוצות.',
        source: 'הרצאה 4',
      },
      {
        id: 'thm-3-2',
        title: 'תכונות קבוצת חזקה',
        statement: 'לכל קבוצה A:\n1. ∅ ∈ P(A)\n2. A ∈ P(A)',
        proof: '1. ∅ ⊆ A לכן ∅ ∈ P(A)\n2. A ⊆ A לכן A ∈ P(A)',
        source: 'הרצאה 4, עמוד 2',
      },
    ],
    techniques: [
      {
        id: 'tech-3-1',
        title: 'כתיבת קבוצת חזקה',
        description: 'שיטות לכתיבת P(A):',
        steps: [
          'לפי גודל תת-קבוצה: קודם ∅, אח"כ יחידונים, זוגות...',
          'בעזרת טבלת אמת: T/F לכל איבר',
          'בעזרת עץ בינארי',
        ],
        whenToUse: 'כשצריך למנות את כל תתי הקבוצות',
        source: 'הרצאה 4, עמוד 3',
      },
    ],
    keyFormulas: [
      '|P(A)| = 2^|A|',
      '|A × B| = |A| · |B|',
      'A × B ≠ B × A (בד"כ)',
      '∅ × A = ∅',
    ],
    examTips: [
      'x ∈ P(A) ⟺ x ⊆ A',
      'להבדיל: ∈ (שייכות) מול ⊆ (הכלה)',
      '∅ ∈ P(A) תמיד, אבל ∅ ⊆ P(A) תמיד גם!',
    ],
  },

  // ============ WEEK 4: Functions ============
  {
    weekNumber: 4,
    title: 'Functions',
    titleHe: 'פונקציות',
    lectures: [5, 6],
    topics: ['פונקציה', 'חח"ע', 'על', 'הרכבה', 'פונקציה הפיכה'],
    summary: 'הרצאות 5-6 עוסקות בפונקציות: הגדרה, חח"ע, על, חד-חד ערכית ועל, הרכבת פונקציות ופונקציה הפוכה.',
    definitions: [
      {
        id: 'def-4-1',
        title: 'פונקציה',
        content: 'תהיינה A, B קבוצות לא ריקות ותהי f ⊆ A × B. f תקרא פונקציה מ-A ל-B אם לכל a ∈ A יש לכל היותר איבר אחד b ∈ B כך ש-(a, b) ∈ f.',
        notation: 'f: A → B, f(a) = b',
        examples: [
          'f = {(1,4), (2,4), (3,5)} היא פונקציה מ-{1,2,3} ל-{4,5,6}',
          'f = {(1,4), (1,5), (3,5)} אינה פונקציה כי 1 מותאם לשני ערכים',
        ],
        source: 'הרצאה 5, עמוד 2',
      },
      {
        id: 'def-4-2',
        title: 'פונקציה חח"ע (חד-חד ערכית / Injective)',
        content: 'f: A → B היא חח"ע אם לכל a₁, a₂ ∈ A: f(a₁) = f(a₂) → a₁ = a₂.',
        notation: 'f: A ↪ B',
        examples: [
          'f(x) = 2x היא חח"ע',
          'f(x) = x² אינה חח"ע ב-ℝ (כי f(1) = f(-1))',
        ],
        source: 'הרצאה 5',
      },
      {
        id: 'def-4-3',
        title: 'פונקציה על (Surjective)',
        content: 'f: A → B היא על אם לכל b ∈ B קיים a ∈ A כך ש-f(a) = b.',
        notation: 'f: A ↠ B',
        examples: [
          'f: ℝ → ℝ, f(x) = x³ היא על',
          'f: ℝ → ℝ, f(x) = x² אינה על (אין מקור למספרים שליליים)',
        ],
        source: 'הרצאה 5',
      },
      {
        id: 'def-4-4',
        title: 'פונקציה חח"ע ועל (Bijective)',
        content: 'f: A → B היא חח"ע ועל (ביֶקצִיה) אם היא גם חח"ע וגם על.',
        notation: 'f: A ↔ B',
        source: 'הרצאה 5',
      },
      {
        id: 'def-4-5',
        title: 'הרכבת פונקציות',
        content: 'תהיינה f: A → B, g: B → C. ההרכבה של g על f, אשר תסומן g ∘ f, היא פונקציה מ-A ל-C: (g ∘ f)(x) = g(f(x)).',
        notation: 'g ∘ f, g(f(x))',
        examples: [
          'f(x) = x³+1, g(x) = 2x+5',
          '(g ∘ f)(x) = 2(x³+1)+5 = 2x³+7',
          '(f ∘ g)(x) = (2x+5)³+1',
        ],
        source: 'הרצאה 6, עמוד 2',
      },
      {
        id: 'def-4-6',
        title: 'פונקציה הפוכה',
        content: 'תהי f: A → B חח"ע ועל. הפונקציה ההפוכה f⁻¹: B → A מוגדרת: f⁻¹(b) = a אם ורק אם f(a) = b.',
        notation: 'f⁻¹',
        source: 'הרצאה 6',
      },
      {
        id: 'def-4-7',
        title: 'פונקציית הזהות',
        content: 'פונקציית הזהות על A היא i_A: A → A המוגדרת i_A(x) = x.',
        notation: 'i_A, id_A',
        source: 'הרצאה 6',
      },
    ],
    theorems: [
      {
        id: 'thm-4-1',
        title: 'הרכבה לא קומוטטיבית',
        statement: 'הרכבת פונקציות אינה קומוטטיבית. לא בהכרח f ∘ g = g ∘ f.',
        source: 'הרצאה 6, עמוד 3',
      },
      {
        id: 'thm-4-2',
        title: 'הרכבה אסוציאטיבית',
        statement: 'הרכבת פונקציות היא אסוציאטיבית: f ∘ (g ∘ h) = (f ∘ g) ∘ h.',
        source: 'הרצאה 6, עמוד 3',
      },
      {
        id: 'thm-4-3',
        title: 'תכונות הרכבה',
        statement: '1. הרכבת פונקציות חח"ע היא חח"ע.\n2. הרכבת פונקציות על היא על.\n3. הרכבת פונקציות חח"ע ועל היא חח"ע ועל.',
        source: 'הרצאה 6, עמוד 5',
      },
      {
        id: 'thm-4-4',
        title: 'תכונות פונקציה הפוכה',
        statement: 'אם f: A → B חח"ע ועל, אז:\n1. f⁻¹ ∘ f = i_A\n2. f ∘ f⁻¹ = i_B',
        source: 'הרצאה 6',
      },
    ],
    techniques: [
      {
        id: 'tech-4-1',
        title: 'הוכחת חח"ע',
        description: 'להוכיח ש-f חח"ע: יהיו a₁, a₂ ∈ A כך ש-f(a₁) = f(a₂), נוכיח a₁ = a₂.',
        steps: [
          'יהיו a₁, a₂ ∈ A כך ש-f(a₁) = f(a₂)',
          'נראה ש-a₁ = a₂',
        ],
        whenToUse: 'בהוכחת חח"ע',
        source: 'הרצאה 5',
      },
      {
        id: 'tech-4-2',
        title: 'הוכחת על',
        description: 'להוכיח ש-f על: יהי b ∈ B, נמצא a ∈ A כך ש-f(a) = b.',
        steps: [
          'יהי b ∈ B',
          'נמצא a ∈ A (בד"כ ע"י פתרון משוואה)',
          'נראה f(a) = b',
        ],
        whenToUse: 'בהוכחת על',
        source: 'הרצאה 5',
      },
    ],
    keyFormulas: [
      '(g ∘ f)(x) = g(f(x))',
      'f⁻¹ ∘ f = i_A',
      'f ∘ f⁻¹ = i_B',
      'f^n = f ∘ f ∘ ... ∘ f (n פעמים)',
    ],
    examTips: [
      'חח"ע: איברים שונים בתחום → תמונות שונות',
      'על: כל איבר בטווח הוא תמונה של משהו',
      'שימו לב לכיוון ההרכבה: g ∘ f קודם f ואז g',
    ],
  },

  // ============ WEEK 5: Mathematical Induction ============
  {
    weekNumber: 5,
    title: 'Mathematical Induction',
    titleHe: 'אינדוקציה מתמטית',
    lectures: [7],
    topics: ['אינדוקציה', 'בסיס', 'צעד', 'אינדוקציה חזקה'],
    summary: 'הרצאה 7 עוסקת באינדוקציה מתמטית: אקסיומת האינדוקציה, בסיס וצעד, ואינדוקציה חזקה.',
    definitions: [
      {
        id: 'def-5-1',
        title: 'אינדוקציה',
        content: 'אינדוקציה היא שיטת הוכחה מתמטית המשמשת להוכחה שתכונה מסוימת נכונה עבור כל המספרים הטבעיים.',
        source: 'הרצאה 7, עמוד 2',
      },
      {
        id: 'def-5-2',
        title: 'אקסיומת האינדוקציה',
        content: 'P(0) ∧ ∀n(P(n) → P(n+1)) → ∀n P(n)\n\nאם הטענה נכונה עבור 0 וגם לגבי כל טבעי שהיא נכונה עבורו, היא נכונה גם עבור העוקב שלו - אז הטענה נכונה לכל n טבעי.',
        source: 'הרצאה 7, עמוד 4',
      },
    ],
    theorems: [
      {
        id: 'thm-5-1',
        title: 'סכום סדרה חשבונית',
        statement: 'לכל n ∈ ℕ: 0 + 1 + 2 + ... + n = n(n+1)/2',
        proof: 'בסיס: n=0: 0 = 0·1/2 = 0 ✓\nצעד: נניח נכון ל-n, נוכיח ל-n+1:\n0+1+...+n+(n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2 ✓',
        source: 'הרצאה 7, עמוד 5',
      },
      {
        id: 'thm-5-2',
        title: 'סכום סדרה הנדסית',
        statement: 'לכל n ∈ ℕ ולכל q ≠ 1: 1 + q + q² + ... + qⁿ = (qⁿ⁺¹ - 1)/(q - 1)',
        source: 'הרצאה 7',
      },
      {
        id: 'thm-5-3',
        title: 'בינום ניוטון',
        statement: '(x + y)ⁿ = Σₖ₌₀ⁿ (n choose k) xᵏyⁿ⁻ᵏ',
        source: 'הרצאה 9',
      },
    ],
    techniques: [
      {
        id: 'tech-5-1',
        title: 'הוכחה באינדוקציה',
        description: 'תבנית להוכחה באינדוקציה:',
        steps: [
          'בסיס האינדוקציה: הוכח P(0) [או P(n₀) הראשון]',
          'הנחת האינדוקציה: נניח P(n) נכונה עבור n כלשהו',
          'צעד האינדוקציה: הוכח P(n) → P(n+1)',
          'מסקנה: לפי אקסיומת האינדוקציה, P(n) נכונה לכל n',
        ],
        whenToUse: 'כשצריך להוכיח טענה לכל המספרים הטבעיים',
        source: 'הרצאה 7',
      },
      {
        id: 'tech-5-2',
        title: 'אינדוקציה חזקה',
        description: 'באינדוקציה חזקה, בצעד האינדוקציה מניחים שהטענה נכונה לכל k ≤ n ומוכיחים ל-n+1.',
        steps: [
          'בסיס: הוכח P(n₀)',
          'הנחה חזקה: נניח P(k) נכונה לכל n₀ ≤ k ≤ n',
          'צעד: הוכח P(n+1)',
        ],
        whenToUse: 'כשבצעד צריך להשתמש במקרים קודמים (לא רק n)',
        source: 'הרצאה 7',
      },
    ],
    keyFormulas: [
      'Σᵢ₌₀ⁿ i = n(n+1)/2',
      'Σᵢ₌₀ⁿ i² = n(n+1)(2n+1)/6',
      'Σᵢ₌₀ⁿ qⁱ = (qⁿ⁺¹ - 1)/(q - 1)',
      '(n choose k) = n!/(k!(n-k)!)',
    ],
    examTips: [
      'תמיד לציין מפורשות: "בסיס", "הנחת אינדוקציה", "צעד"',
      'בצעד - לציין איפה משתמשים בהנחת האינדוקציה',
      'אי אפשר להפריך באינדוקציה!',
      'אם הבסיס לא 0, לציין מאיפה מתחילים',
    ],
  },

  // ============ WEEK 6: Combinatorics I ============
  {
    weekNumber: 6,
    title: 'Combinatorics I - Counting',
    titleHe: 'קומבינטוריקה א\' - עקרונות ספירה',
    lectures: [8],
    topics: ['עקרון הכפל', 'עקרון החיבור', 'סידורים', 'תמורות'],
    summary: 'הרצאה 8 עוסקת בעקרונות ספירה בסיסיים: עקרון הכפל, עקרון החיבור, וסידורים.',
    definitions: [
      {
        id: 'def-6-1',
        title: 'עקרון הכפל',
        content: 'אם יש n₁ דרכים לבצע פעולה ראשונה, ולכל אחת מהן יש n₂ דרכים לבצע פעולה שנייה, אז יש n₁ · n₂ דרכים לבצע את שתי הפעולות.',
        source: 'הרצאה 8',
      },
      {
        id: 'def-6-2',
        title: 'עקרון החיבור',
        content: 'אם יש n₁ דרכים לבצע פעולה א\' ו-n₂ דרכים לבצע פעולה ב\' (זרות), אז יש n₁ + n₂ דרכים לבצע א\' או ב\'.',
        source: 'הרצאה 8',
      },
      {
        id: 'def-6-3',
        title: 'עקרון החילוק',
        content: 'אם כל מקרה נספר בדיוק k פעמים, נחלק ב-k.',
        source: 'הרצאה 8, עמוד 3',
      },
      {
        id: 'def-6-4',
        title: 'סידור בשורה (תמורה)',
        content: 'מספר הדרכים לסדר n איברים שונים בשורה הוא n!',
        notation: 'n! = n · (n-1) · ... · 2 · 1',
        examples: [
          '5! = 120',
          '0! = 1',
        ],
        source: 'הרצאה 8',
      },
      {
        id: 'def-6-5',
        title: 'סידור חלקי',
        content: 'מספר הדרכים לבחור k איברים מתוך n ולסדרם בשורה הוא n!/(n-k)! = P(n,k)',
        notation: 'P(n,k), (n)_k',
        source: 'הרצאה 8',
      },
      {
        id: 'def-6-6',
        title: 'סידור במעגל',
        content: 'מספר הדרכים לסדר n איברים שונים במעגל הוא (n-1)!',
        source: 'הרצאה 8, עמוד 4',
      },
      {
        id: 'def-6-7',
        title: 'סידור עם חזרות',
        content: 'מספר הדרכים לסדר n איברים כאשר יש k סוגים עם n₁, n₂, ..., nₖ חזרות הוא n!/(n₁! · n₂! · ... · nₖ!)',
        source: 'הרצאה 8',
      },
    ],
    theorems: [],
    techniques: [
      {
        id: 'tech-6-1',
        title: 'זיהוי סוג בעיה',
        description: 'טבלת הקומבינטוריקה:',
        steps: [
          'סידור (יש חשיבות לסדר) vs בחירה (אין חשיבות לסדר)',
          'עם חזרות vs בלי חזרות',
          'שורה vs מעגל',
        ],
        whenToUse: 'בכל שאלת קומבינטוריקה',
        source: 'הרצאה 8, עמוד 2',
      },
    ],
    keyFormulas: [
      'סידור בשורה: n!',
      'סידור חלקי: n!/(n-k)!',
      'סידור במעגל: (n-1)!',
      'סידור עם חזרות: n!/(n₁!·n₂!·...·nₖ!)',
    ],
    examTips: [
      'תמיד לשאול: האם הסדר חשוב?',
      'מעגל = שורה חלקי n (כי יש n סיבובים זהים)',
      'עם חזרות = מחלקים בעודפים',
    ],
  },

  // ============ WEEK 7: Combinatorics II - Binomial ============
  {
    weekNumber: 7,
    title: 'Combinatorics II - Binomial',
    titleHe: 'קומבינטוריקה ב\' - מקדם בינומי',
    lectures: [9, 10],
    topics: ['מקדם בינומי', 'בינום ניוטון', 'בחירה מרובה'],
    summary: 'הרצאות 9-10 עוסקות במקדם בינומי, בינום ניוטון ובחירה מרובה.',
    definitions: [
      {
        id: 'def-7-1',
        title: 'מקדם בינומי',
        content: 'מספר הדרכים לבחור k איברים מתוך n (ללא חשיבות לסדר) הוא (n choose k) = n!/(k!(n-k)!)',
        notation: '(n choose k), C(n,k), ⁿCₖ',
        examples: [
          '(5 choose 2) = 10',
          '(n choose 0) = 1',
          '(n choose n) = 1',
        ],
        source: 'הרצאה 9',
      },
      {
        id: 'def-7-2',
        title: 'בינום ניוטון',
        content: '(x + y)ⁿ = Σₖ₌₀ⁿ (n choose k) xᵏyⁿ⁻ᵏ',
        examples: [
          '(x+y)² = x² + 2xy + y²',
          '(x+y)³ = x³ + 3x²y + 3xy² + y³',
        ],
        source: 'הרצאה 9, עמוד 2-3',
      },
      {
        id: 'def-7-3',
        title: 'מקדם מולטינומי',
        content: 'מספר הדרכים לחלק n איברים ל-k קבוצות בגדלים n₁, n₂, ..., nₖ הוא n!/(n₁!·n₂!·...·nₖ!)',
        notation: '(n choose n₁,n₂,...,nₖ)',
        source: 'הרצאה 10, עמוד 3-5',
      },
      {
        id: 'def-7-4',
        title: 'בחירה עם חזרות (כוכבים ומחיצות)',
        content: 'מספר הדרכים לבחור k איברים מתוך n סוגים עם חזרות הוא (k+n-1 choose k)',
        source: 'הרצאה 10',
      },
    ],
    theorems: [
      {
        id: 'thm-7-1',
        title: 'סכום מקדמים בינומיים',
        statement: 'Σₖ₌₀ⁿ (n choose k) = 2ⁿ',
        proof: 'נציב x=y=1 בבינום ניוטון: (1+1)ⁿ = 2ⁿ',
        source: 'הרצאה 9, עמוד 4',
      },
      {
        id: 'thm-7-2',
        title: 'סימטריה של מקדם בינומי',
        statement: '(n choose k) = (n choose n-k)',
        source: 'הרצאה 9',
      },
      {
        id: 'thm-7-3',
        title: 'זהות פסקל',
        statement: '(n choose k) = (n-1 choose k-1) + (n-1 choose k)',
        source: 'הרצאה 9',
      },
    ],
    techniques: [
      {
        id: 'tech-7-1',
        title: 'כוכבים ומחיצות',
        description: 'שיטה לספירת פתרונות למשוואות מהסוג x₁+x₂+...+xₖ=n',
        steps: [
          'מציירים n כוכבים (★)',
          'מוסיפים k-1 מחיצות (|)',
          'סופרים סידורים: (n+k-1 choose k-1)',
        ],
        whenToUse: 'בחירה עם חזרות, חלוקת עצמים זהים לקבוצות',
        source: 'הרצאה 10',
      },
    ],
    keyFormulas: [
      '(n choose k) = n!/(k!(n-k)!)',
      '(x+y)ⁿ = Σ (n choose k) xᵏyⁿ⁻ᵏ',
      'Σ (n choose k) = 2ⁿ',
      'בחירה עם חזרות: (n+k-1 choose k)',
    ],
    examTips: [
      'לזכור: (n choose k) = (n choose n-k)',
      'Σ(n choose k) = 2ⁿ - שימושי בהוכחות',
      'כוכבים ומחיצות - לצייר!',
    ],
  },

  // ============ WEEK 8: Pigeonhole Principle ============
  {
    weekNumber: 8,
    title: 'Pigeonhole Principle',
    titleHe: 'עקרון שובך היונים',
    lectures: [11],
    topics: ['עקרון שובך היונים', 'עש"ה מוכלל'],
    summary: 'הרצאה 11 עוסקת בעקרון שובך היונים ויישומיו.',
    definitions: [
      {
        id: 'def-8-1',
        title: 'עקרון שובך היונים',
        content: 'אם נכניס n ≥ 2 עצמים (יונים) לתוך n-1 תאים (שובכים), הרי שלפחות בתא אחד יהיו לפחות שני עצמים.',
        source: 'הרצאה 11, עמוד 2',
      },
      {
        id: 'def-8-2',
        title: 'עש"ה המוכלל',
        content: 'אם נכניס n עצמים לתוך m תאים, הרי שלפחות בתא אחד יהיו לפחות ⌈n/m⌉ עצמים.',
        notation: '⌈x⌉ - פונקציית תקרה (מעגל למעלה)',
        source: 'הרצאה 11, עמוד 3',
      },
      {
        id: 'def-8-3',
        title: 'פונקציית תקרה',
        content: 'הפונקציה ⌈x⌉ מחזירה את השלם הקטן ביותר שגדול או שווה ל-x.',
        examples: [
          '⌈3.2⌉ = 4',
          '⌈5⌉ = 5',
          '⌈-1.5⌉ = -1',
        ],
        source: 'הרצאה 11, עמוד 3',
      },
    ],
    theorems: [
      {
        id: 'thm-8-1',
        title: 'ניסוח עש"ה בשפת פונקציות',
        statement: 'תהיינה A, B קבוצות סופיות. אם |A| > |B| אז לא קיימת f: A → B שהיא חח"ע.',
        source: 'הרצאה 11, עמוד 4',
      },
    ],
    techniques: [
      {
        id: 'tech-8-1',
        title: 'שימוש בעש"ה',
        description: 'כיצד להשתמש בעקרון שובך היונים:',
        steps: [
          'זהה את ה"יונים" - העצמים שמחלקים',
          'זהה את ה"שובכים" - הקטגוריות/תאים',
          'הגדר את ההתאמה בין יונים לשובכים',
          'החל את עש"ה',
        ],
        whenToUse: 'כשצריך להוכיח שקיימים שני עצמים עם תכונה משותפת',
        source: 'הרצאה 11',
      },
    ],
    keyFormulas: [
      'עש"ה: n עצמים ב-n-1 תאים → לפחות 2 באותו תא',
      'עש"ה מוכלל: n עצמים ב-m תאים → לפחות ⌈n/m⌉ באותו תא',
    ],
    examTips: [
      'תמיד להגדיר במפורש: מי היונים? מי השובכים? מהי ההתאמה?',
      'עש"ה נותן קיום, לא בונה',
      'דוגמה קלאסית: 367 אנשים → 2 עם אותו יום הולדת',
    ],
  },
];

// Helper function to get week by number
export function getWeekContent(weekNumber: number): WeekContent | undefined {
  return weeksContent.find(w => w.weekNumber === weekNumber);
}

// Get all weeks
export function getAllWeeks(): WeekContent[] {
  return weeksContent;
}
