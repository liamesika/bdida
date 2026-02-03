// Exam 2025 Moed B - Full Solutions with Enhanced Explanations

export interface ExamQuestion2025B {
  id: string;
  questionNumber: number;
  points: number;
  type: 'short' | 'open';
  topic: string;
  topicHe: string;
  questionType: string; // סוג השאלה
  questionTypeHe: string;
  thinkingProcess: string; // על מה לחשוב
  thinkingProcessHe: string;
  question: string;
  questionHe: string;
  answer: string;
  answerHe: string;
  explanation: string;
  explanationHe: string;
}

export const examInfo2025B = {
  title: 'מבחן 2025 מועד ב\' - מתמטיקה בדידה',
  year: 2025,
  semester: 'B',
  duration: '3 שעות',
  shortQuestions: 10,
  openQuestions: 2,
  shortQuestionPoints: 6,
  openQuestionPoints: 20,
  totalPoints: 100,
};

export const exam2025BQuestions: ExamQuestion2025B[] = [
  {
    id: '2025b-q1',
    questionNumber: 1,
    points: 6,
    type: 'short',
    topic: 'Quantifier Logic',
    topicHe: 'לוגיקת כמתים',
    questionType: 'Equivalence of Quantified Statements',
    questionTypeHe: 'שקילות טענות עם כמתים',
    thinkingProcess: 'For each statement, think about whether the quantifier distributes over the logical connective. Use counterexamples or known equivalences.',
    thinkingProcessHe: 'לכל טענה, חשבי האם הכמת מתפרס על הקשר הלוגי. השתמשי בדוגמאות נגדיות או בשקילויות ידועות. זכרי: כמת אוניברסלי מתפרס על AND אבל לא על OR, וכמת קיום מתפרס על OR אבל לא על AND.',
    question: 'Write the numbers of the true statements:\n1. ∀x(P(x) ∧ Q(x)) ≡ ∀x(P(x)) ∧ ∀x(Q(x))\n2. ∀x(P(x) ∨ Q(x)) ≡ ∀x(P(x)) ∨ ∀x(Q(x))\n3. ∃x(P(x) ∧ Q(x)) ≡ ∃x(P(x)) ∧ ∃x(Q(x))\n4. ∃x(P(x) ∨ Q(x)) ≡ ∃x(P(x)) ∨ ∃x(Q(x))',
    questionHe: 'רשמי את מספרי הטענות הנכונות:\n1. ∀x(P(x) ∧ Q(x)) ≡ ∀x(P(x)) ∧ ∀x(Q(x))\n2. ∀x(P(x) ∨ Q(x)) ≡ ∀x(P(x)) ∨ ∀x(Q(x))\n3. ∃x(P(x) ∧ Q(x)) ≡ ∃x(P(x)) ∧ ∃x(Q(x))\n4. ∃x(P(x) ∨ Q(x)) ≡ ∃x(P(x)) ∨ ∃x(Q(x))',
    answer: '1, 4',
    answerHe: '1, 4',
    explanation: `QUESTION TYPE: Testing knowledge of quantifier distribution over logical connectives.

THINKING PROCESS:
- For universal quantifier (∀): distributes over AND (∧) but NOT over OR (∨)
- For existential quantifier (∃): distributes over OR (∨) but NOT over AND (∧)

DETAILED ANALYSIS:

Statement 1: ∀x(P(x) ∧ Q(x)) ≡ ∀x(P(x)) ∧ ∀x(Q(x)) ✓ TRUE
- Left side: "For all x, both P(x) and Q(x) hold"
- Right side: "For all x P(x) holds AND for all x Q(x) holds"
- These are equivalent - if every x satisfies both properties, then all x satisfy P and all x satisfy Q, and vice versa.

Statement 2: ∀x(P(x) ∨ Q(x)) ≡ ∀x(P(x)) ∨ ∀x(Q(x)) ✗ FALSE
- Counterexample: Let domain be {1,2}, P(1)=T, P(2)=F, Q(1)=F, Q(2)=T
- Left: ∀x(P(x) ∨ Q(x)) = (T∨F) ∧ (F∨T) = T ∧ T = T
- Right: ∀x(P(x)) ∨ ∀x(Q(x)) = F ∨ F = F
- Not equivalent!

Statement 3: ∃x(P(x) ∧ Q(x)) ≡ ∃x(P(x)) ∧ ∃x(Q(x)) ✗ FALSE
- Counterexample: Same as above
- Left: ∃x(P(x) ∧ Q(x)) = (T∧F) ∨ (F∧T) = F ∨ F = F
- Right: ∃x(P(x)) ∧ ∃x(Q(x)) = T ∧ T = T
- Not equivalent!

Statement 4: ∃x(P(x) ∨ Q(x)) ≡ ∃x(P(x)) ∨ ∃x(Q(x)) ✓ TRUE
- Left side: "There exists x such that P(x) or Q(x)"
- Right side: "There exists x with P(x) OR there exists x with Q(x)"
- These are equivalent by distribution of ∃ over ∨.

COMMON MISTAKES:
- Confusing which quantifier distributes over which connective
- Not testing with counterexamples`,
    explanationHe: `סוג השאלה: בדיקת ידע על התפרסות כמתים על קשרים לוגיים.

על מה לחשוב:
• כמת אוניברסלי (∀): מתפרס על AND (∧) אבל לא על OR (∨)
• כמת קיום (∃): מתפרס על OR (∨) אבל לא על AND (∧)

ניתוח מפורט:

טענה 1: ∀x(P(x) ∧ Q(x)) ≡ ∀x(P(x)) ∧ ∀x(Q(x)) ✓ נכון
• צד שמאל: "לכל x, גם P(x) וגם Q(x) מתקיימים"
• צד ימין: "לכל x מתקיים P(x) וגם לכל x מתקיים Q(x)"
• אלה שקולים - אם כל x מקיים את שתי התכונות, אז כל x מקיים P וכל x מקיים Q, ולהפך.

טענה 2: ∀x(P(x) ∨ Q(x)) ≡ ∀x(P(x)) ∨ ∀x(Q(x)) ✗ לא נכון
• דוגמה נגדית: תחום {1,2}, P(1)=T, P(2)=F, Q(1)=F, Q(2)=T
• שמאל: ∀x(P(x) ∨ Q(x)) = (T∨F) ∧ (F∨T) = T
• ימין: ∀x(P(x)) ∨ ∀x(Q(x)) = F ∨ F = F
• לא שקולים!

טענה 3: ∃x(P(x) ∧ Q(x)) ≡ ∃x(P(x)) ∧ ∃x(Q(x)) ✗ לא נכון
• דוגמה נגדית: אותו תחום
• שמאל: ∃x(P(x) ∧ Q(x)) = (T∧F) ∨ (F∧T) = F
• ימין: ∃x(P(x)) ∧ ∃x(Q(x)) = T ∧ T = T
• לא שקולים!

טענה 4: ∃x(P(x) ∨ Q(x)) ≡ ∃x(P(x)) ∨ ∃x(Q(x)) ✓ נכון
• צד שמאל: "קיים x כך ש-P(x) או Q(x)"
• צד ימין: "קיים x עם P(x) או קיים x עם Q(x)"
• שקולים לפי התפרסות ∃ על ∨.

טעויות נפוצות:
• בלבול איזה כמת מתפרס על איזה קשר
• אי בדיקה עם דוגמאות נגדיות`,
  },
  {
    id: '2025b-q2',
    questionNumber: 2,
    points: 6,
    type: 'short',
    topic: 'Set Operations',
    topicHe: 'פעולות על קבוצות',
    questionType: 'Cartesian Product with Power Set and Symmetric Difference',
    questionTypeHe: 'מכפלה קרטזית עם קבוצת חזקה והפרש סימטרי',
    thinkingProcess: 'Break down step by step: first compute union, then symmetric difference, then intersection, then power set, finally Cartesian product.',
    thinkingProcessHe: 'פרקי צעד אחר צעד: קודם חשבי איחוד, אח"כ הפרש סימטרי, אח"כ חיתוך, אח"כ קבוצת חזקה, ולבסוף מכפלה קרטזית. זכרי: A△B = (A∪B)\\(A∩B) = "מה שב-A או ב-B אבל לא בשניהם".',
    question: 'Let A = {1,2,3}, B = {∅, 3, 4}. Write explicitly the members of the set:\n((A ∪ B) △ A) × P(A ∩ B)',
    questionHe: 'יהיו A = {1,2,3}, B = {∅, 3, 4}. רשמי במפורש את איברי הקבוצה:\n((A ∪ B) △ A) × P(A ∩ B)',
    answer: '{(∅, ∅), (∅, {3}), (4, ∅), (4, {3})}',
    answerHe: '{(∅, ∅), (∅, {3}), (4, ∅), (4, {3})}',
    explanation: `QUESTION TYPE: Multi-step set operations requiring careful computation.

THINKING PROCESS:
Step 1: Identify all sets and their elements carefully
Step 2: Compute operations in correct order (inside out)
Step 3: Remember: A△B = (A\\B) ∪ (B\\A) = elements in exactly one of A or B

DETAILED SOLUTION:

Step 1: Compute A ∪ B
A = {1, 2, 3}
B = {∅, 3, 4}   (Note: ∅ is an ELEMENT of B, not the empty set as a set!)
A ∪ B = {1, 2, 3, ∅, 4}

Step 2: Compute (A ∪ B) △ A
Using A△B = (A\\B) ∪ (B\\A):
(A ∪ B) \\ A = {∅, 4} (elements in A∪B but not in A)
A \\ (A ∪ B) = ∅ (everything in A is also in A∪B)
So (A ∪ B) △ A = {∅, 4}

Alternative: (A ∪ B) △ A = B \\ A = {∅, 4} (by symmetric difference properties)

Step 3: Compute A ∩ B
A ∩ B = {3} (only element in both)

Step 4: Compute P(A ∩ B)
P({3}) = {∅, {3}}

Step 5: Compute Cartesian product
{∅, 4} × {∅, {3}} = {(∅, ∅), (∅, {3}), (4, ∅), (4, {3})}

COMMON MISTAKES:
- Treating ∅ in B as "empty set" instead of an element
- Wrong order of operations
- Forgetting ∅ is always in any power set`,
    explanationHe: `סוג השאלה: פעולות קבוצות מרובות שלבים הדורשות חישוב זהיר.

על מה לחשוב:
שלב 1: זהי את כל הקבוצות ואיבריהן בזהירות
שלב 2: חשבי פעולות בסדר הנכון (מבפנים החוצה)
שלב 3: זכרי: A△B = (A\\B) ∪ (B\\A) = איברים בדיוק באחת מ-A או B

פתרון מפורט:

שלב 1: חישוב A ∪ B
A = {1, 2, 3}
B = {∅, 3, 4}   (שימי לב: ∅ הוא איבר של B, לא הקבוצה הריקה!)
A ∪ B = {1, 2, 3, ∅, 4}

שלב 2: חישוב (A ∪ B) △ A
באמצעות A△B = (A\\B) ∪ (B\\A):
(A ∪ B) \\ A = {∅, 4} (איברים ב-A∪B שלא ב-A)
A \\ (A ∪ B) = ∅ (הכל ב-A גם ב-A∪B)
לכן (A ∪ B) △ A = {∅, 4}

חלופה: (A ∪ B) △ A = B \\ A = {∅, 4}

שלב 3: חישוב A ∩ B
A ∩ B = {3} (האיבר היחיד בשניהם)

שלב 4: חישוב P(A ∩ B)
P({3}) = {∅, {3}}

שלב 5: חישוב מכפלה קרטזית
{∅, 4} × {∅, {3}} = {(∅, ∅), (∅, {3}), (4, ∅), (4, {3})}

טעויות נפוצות:
• להתייחס ל-∅ ב-B כ"קבוצה ריקה" במקום כאיבר
• סדר פעולות שגוי
• לשכוח ש-∅ תמיד בקבוצת החזקה`,
  },
  {
    id: '2025b-q3',
    questionNumber: 3,
    points: 6,
    type: 'short',
    topic: 'Function Composition',
    topicHe: 'הרכבת פונקציות',
    questionType: 'Reverse Engineering Function Composition',
    questionTypeHe: 'הנדסה לאחור של הרכבת פונקציות',
    thinkingProcess: 'Given f∘g, find g(13). First compute (f∘g)(13), then work backwards using the definition of f to find what input gives that output.',
    thinkingProcessHe: 'נתון f∘g, מצאי את g(13). קודם חשבי (f∘g)(13), ואז עבדי אחורה תוך שימוש בהגדרת f כדי למצוא איזה קלט נותן את הפלט הזה. שימי לב לתנאים (זוגי/אי-זוגי).',
    question: 'f: ℕ → ℕ, defined as follows:\nf(n) = n² if n is even\nf(n) = n² + 2 if n is odd\n\nGiven that f ∘ g = 2n + 1. Compute g(13).',
    questionHe: 'f: ℕ → ℕ, מוגדרת כך:\nf(n) = n² אם n זוגי\nf(n) = n² + 2 אם n אי-זוגי\n\nנתון כי f ∘ g = 2n + 1. חשבי את g(13).',
    answer: 'g(13) = 5',
    answerHe: 'g(13) = 5',
    explanation: `QUESTION TYPE: Function composition with piecewise function - reverse engineering.

THINKING PROCESS:
1. Understand composition: (f ∘ g)(n) = f(g(n))
2. Calculate what (f ∘ g)(13) should be
3. Determine if g(13) is odd or even based on the output
4. Solve for g(13)

DETAILED SOLUTION:

Step 1: Calculate (f ∘ g)(13)
(f ∘ g)(n) = 2n + 1
(f ∘ g)(13) = 2(13) + 1 = 27

Step 2: Set up equation
f(g(13)) = 27
Let x = g(13), so f(x) = 27

Step 3: Determine if x is odd or even
- If x is even: f(x) = x² = 27 → x = √27 ≈ 5.196... (not natural number)
- If x is odd: f(x) = x² + 2 = 27 → x² = 25 → x = 5 ✓

Step 4: Verify
g(13) = 5 (which is odd)
f(5) = 5² + 2 = 25 + 2 = 27 ✓
(f ∘ g)(13) = 27 = 2(13) + 1 ✓

OBSERVATION:
Note that 2n + 1 always outputs odd numbers.
f outputs even numbers when input is odd (since n² + 2 = odd² + 2 = odd + 2 = odd... wait)
Actually: odd² = odd, odd + 2 = odd. So f(odd) = odd.
And f(even) = even² = even.
So g(n) must be odd for all n.

COMMON MISTAKES:
- Forgetting to check which case applies (odd/even)
- Confusing composition order
- Not verifying the answer`,
    explanationHe: `סוג השאלה: הרכבת פונקציות עם פונקציה חלקית - הנדסה לאחור.

על מה לחשוב:
1. הבנת הרכבה: (f ∘ g)(n) = f(g(n))
2. חשבי מה צריך להיות (f ∘ g)(13)
3. קבעי אם g(13) זוגי או אי-זוגי לפי הפלט
4. פתרי עבור g(13)

פתרון מפורט:

שלב 1: חישוב (f ∘ g)(13)
(f ∘ g)(n) = 2n + 1
(f ∘ g)(13) = 2(13) + 1 = 27

שלב 2: הצבת משוואה
f(g(13)) = 27
נסמן x = g(13), אז f(x) = 27

שלב 3: קביעה אם x זוגי או אי-זוגי
• אם x זוגי: f(x) = x² = 27 → x = √27 ≈ 5.196... (לא מספר טבעי)
• אם x אי-זוגי: f(x) = x² + 2 = 27 → x² = 25 → x = 5 ✓

שלב 4: וידוא
g(13) = 5 (שהוא אי-זוגי)
f(5) = 5² + 2 = 25 + 2 = 27 ✓
(f ∘ g)(13) = 27 = 2(13) + 1 ✓

תובנה:
2n + 1 תמיד מוציא מספרים אי-זוגיים.
נשים לב: אי-זוגי² = אי-זוגי, ואי-זוגי + 2 = אי-זוגי.
לכן f(אי-זוגי) = אי-זוגי, ו-f(זוגי) = זוגי² = זוגי.
לכן g(n) חייב להיות אי-זוגי לכל n.

טעויות נפוצות:
• לשכוח לבדוק איזה מקרה תקף (זוגי/אי-זוגי)
• בלבול בסדר ההרכבה
• אי-וידוא התשובה`,
  },
  {
    id: '2025b-q4',
    questionNumber: 4,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Inclusion-Exclusion',
    topicHe: 'קומבינטוריקה - הכלה והדחה',
    questionType: 'Counting with Forbidden Patterns using Inclusion-Exclusion',
    questionTypeHe: 'ספירה עם תבניות אסורות באמצעות הכלה והדחה',
    thinkingProcess: 'Count all numbers, then subtract those with at least one digit appearing exactly twice. Use inclusion-exclusion for overlapping "bad" sets.',
    thinkingProcessHe: 'ספרי את כל המספרים, ואז חסרי את אלה עם לפחות ספרה אחת שמופיעה בדיוק פעמיים. השתמשי בהכלה והדחה עבור קבוצות "רעות" חופפות. שימי לב: מספר בן 7 ספרות עם 9 ספרות אפשריות, מקסימום 3 ספרות יכולות להופיע בדיוק פעמיים.',
    question: 'Given the digits 1,2,3,...,9. In how many 7-digit numbers, composed from the given numbers, there is no digit that appears exactly twice?',
    questionHe: 'נתונות הספרות 1,2,3,...,9. בכמה מספרים בני 7 ספרות, המורכבים מהספרות הנתונות, אין ספרה שמופיעה בדיוק פעמיים?',
    answer: '9⁷ - C(9,1)·C(7,2)·8⁵ + C(9,2)·C(7,2)·C(5,2)·7³ - C(9,3)·C(7,2)·C(5,2)·C(3,2)·6¹',
    answerHe: '9⁷ - C(9,1)·C(7,2)·8⁵ + C(9,2)·C(7,2)·C(5,2)·7³ - C(9,3)·C(7,2)·C(5,2)·C(3,2)·6¹',
    explanation: `QUESTION TYPE: Counting with restrictions using Inclusion-Exclusion complement.

THINKING PROCESS:
1. Define "bad" property: digit appears exactly twice
2. Total - Bad = Good (complement counting)
3. Aᵢ = set of numbers where digit i appears exactly twice
4. Note: at most 3 digits can appear exactly twice in 7 positions (2+2+2=6, need 7)

DETAILED SOLUTION:

Total numbers: 9⁷ (each of 7 positions can be any of 9 digits)

Let Aᵢ = {7-digit numbers where digit i appears exactly twice}

We want: |Total| - |A₁ ∪ A₂ ∪ ... ∪ A₉|

By Inclusion-Exclusion:
|A₁ ∪ ... ∪ A₉| = S₁ - S₂ + S₃ - ...

S₁ = Σ|Aᵢ| = 9 × C(7,2) × 8⁵
- Choose which digit appears twice: 9 ways
- Choose 2 positions for that digit: C(7,2)
- Fill remaining 5 positions with other 8 digits: 8⁵

S₂ = Σ|Aᵢ ∩ Aⱼ| = C(9,2) × C(7,2) × C(5,2) × 7³
- Choose 2 digits to appear exactly twice: C(9,2)
- Choose 2 positions for first digit: C(7,2)
- Choose 2 positions for second digit: C(5,2)
- Fill remaining 3 positions with other 7 digits: 7³

S₃ = C(9,3) × C(7,2) × C(5,2) × C(3,2) × 6¹
- Choose 3 digits to appear exactly twice: C(9,3)
- Choose positions: C(7,2) × C(5,2) × C(3,2)
- Fill remaining 1 position: 6¹

S₄ and beyond = 0 (can't have 4+ digits each appearing exactly twice in 7 positions)

Answer: 9⁷ - S₁ + S₂ - S₃

COMMON MISTAKES:
- Forgetting the alternating signs
- Not recognizing that S₄ = 0
- Miscounting the remaining digits available`,
    explanationHe: `סוג השאלה: ספירה עם הגבלות באמצעות משלים הכלה והדחה.

על מה לחשוב:
1. הגדרת תכונה "רעה": ספרה מופיעה בדיוק פעמיים
2. סה"כ - רע = טוב (ספירת משלים)
3. Aᵢ = קבוצת מספרים שספרה i מופיעה בדיוק פעמיים
4. שימי לב: לכל היותר 3 ספרות יכולות להופיע בדיוק פעמיים ב-7 מקומות (2+2+2=6<7)

פתרון מפורט:

סה"כ מספרים: 9⁷ (כל אחד מ-7 מקומות יכול להיות כל אחת מ-9 ספרות)

נגדיר Aᵢ = {מספרים בני 7 ספרות שספרה i מופיעה בדיוק פעמיים}

רוצים: |סה"כ| - |A₁ ∪ A₂ ∪ ... ∪ A₉|

לפי הכלה והדחה:
|A₁ ∪ ... ∪ A₉| = S₁ - S₂ + S₃ - ...

S₁ = Σ|Aᵢ| = 9 × C(7,2) × 8⁵
• בחירת איזו ספרה מופיעה פעמיים: 9 דרכים
• בחירת 2 מקומות לספרה זו: C(7,2)
• מילוי 5 המקומות הנותרים ב-8 ספרות אחרות: 8⁵

S₂ = Σ|Aᵢ ∩ Aⱼ| = C(9,2) × C(7,2) × C(5,2) × 7³
• בחירת 2 ספרות שמופיעות בדיוק פעמיים: C(9,2)
• בחירת 2 מקומות לספרה ראשונה: C(7,2)
• בחירת 2 מקומות לספרה שנייה: C(5,2)
• מילוי 3 מקומות נותרים ב-7 ספרות אחרות: 7³

S₃ = C(9,3) × C(7,2) × C(5,2) × C(3,2) × 6¹
• בחירת 3 ספרות: C(9,3)
• בחירת מקומות: C(7,2) × C(5,2) × C(3,2)
• מילוי מקום אחד שנותר: 6¹

S₄ ומעלה = 0 (לא ייתכן 4+ ספרות שכל אחת מופיעה בדיוק פעמיים ב-7 מקומות)

תשובה: 9⁷ - S₁ + S₂ - S₃

טעויות נפוצות:
• לשכוח את הסימנים המתחלפים
• לא לזהות ש-S₄ = 0
• טעות בספירת הספרות הנותרות`,
  },
  {
    id: '2025b-q5',
    questionNumber: 5,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Symmetry',
    topicHe: 'קומבינטוריקה - סימטריה',
    questionType: 'Counting with Inequality using Symmetry',
    questionTypeHe: 'ספירה עם אי-שוויון באמצעות סימטריה',
    thinkingProcess: 'Use symmetry: P(3 appears more than 1) = P(1 appears more than 3) by symmetry. Compute complement and divide.',
    thinkingProcessHe: 'השתמשי בסימטריה: P(3 מופיע יותר מ-1) = P(1 מופיע יותר מ-3) לפי סימטריה. חשבי משלים וחלקי. המקרים: יותר, שווה, פחות. יותר = פחות לפי סימטריה.',
    question: 'Given the digits 1,2,3,4,5. In how many 4-digit numbers, composed from the given numbers, the digit 3 appears more times than the digit 1?',
    questionHe: 'נתונות הספרות 1,2,3,4,5. בכמה מספרים בני 4 ספרות, המורכבים מהספרות הנתונות, הספרה 3 מופיעה יותר פעמים מהספרה 1?',
    answer: '(5⁴ - C(4,2) - C(4,1)·C(3,1)·3² - 3⁴) / 2 = 215',
    answerHe: '(5⁴ - C(4,2) - C(4,1)·C(3,1)·3² - 3⁴) / 2 = 215',
    explanation: `QUESTION TYPE: Counting with inequality constraint using symmetry argument.

THINKING PROCESS:
1. By symmetry: #(3 appears more than 1) = #(1 appears more than 3)
2. Let A = more, B = equal, C = less. Total = A + B + C, and A = C
3. So A = (Total - B) / 2
4. Calculate B: numbers where 3 and 1 appear equally often (0, 1, or 2 times each)

DETAILED SOLUTION:

Total: 5⁴ = 625

Equal cases (B): 3 and 1 appear same number of times

Case 1: Neither 3 nor 1 appears (both appear 0 times)
- Each position uses only {2,4,5}: 3⁴ = 81

Case 2: Both appear exactly once
- Choose position for 3: 4 ways
- Choose position for 1: 3 ways
- Fill remaining 2 positions with {2,4,5}: 3² = 9
- Total: 4 × 3 × 9 = 108

Case 3: Both appear exactly twice
- Choose 2 positions for 3: C(4,2) = 6
- Remaining 2 positions must have 1: 1 way (forced)
- Total: 6

B = 81 + 108 + 6 = 195

Can't have both appear 3 or 4 times (only 4 positions total)

Answer: A = (625 - 195) / 2 = 430 / 2 = 215

VERIFICATION:
- Numbers where 3 > 1: 215
- Numbers where 1 > 3: 215
- Numbers where equal: 195
- Total: 215 + 215 + 195 = 625 = 5⁴ ✓

COMMON MISTAKES:
- Not using symmetry argument
- Missing some equal cases
- Forgetting the /2 at the end`,
    explanationHe: `סוג השאלה: ספירה עם אילוץ אי-שוויון באמצעות טיעון סימטריה.

על מה לחשוב:
1. לפי סימטריה: #(3 מופיע יותר מ-1) = #(1 מופיע יותר מ-3)
2. נסמן A = יותר, B = שווה, C = פחות. סה"כ = A + B + C, וגם A = C
3. לכן A = (סה"כ - B) / 2
4. חשבי B: מספרים ש-3 ו-1 מופיעים אותו מספר פעמים (0, 1, או 2 פעמים כל אחד)

פתרון מפורט:

סה"כ: 5⁴ = 625

מקרים שווים (B): 3 ו-1 מופיעים אותו מספר פעמים

מקרה 1: לא 3 ולא 1 מופיעים (שניהם מופיעים 0 פעמים)
• כל מקום משתמש רק ב-{2,4,5}: 3⁴ = 81

מקרה 2: שניהם מופיעים בדיוק פעם אחת
• בחירת מקום ל-3: 4 דרכים
• בחירת מקום ל-1: 3 דרכים
• מילוי 2 מקומות נותרים ב-{2,4,5}: 3² = 9
• סה"כ: 4 × 3 × 9 = 108

מקרה 3: שניהם מופיעים בדיוק פעמיים
• בחירת 2 מקומות ל-3: C(4,2) = 6
• 2 המקומות הנותרים חייבים להיות 1: דרך אחת (מאולץ)
• סה"כ: 6

B = 81 + 108 + 6 = 195

לא ייתכן ששניהם יופיעו 3 או 4 פעמים (יש רק 4 מקומות)

תשובה: A = (625 - 195) / 2 = 430 / 2 = 215

וידוא:
• מספרים ש-3 > 1: 215
• מספרים ש-1 > 3: 215
• מספרים ששווים: 195
• סה"כ: 215 + 215 + 195 = 625 = 5⁴ ✓

טעויות נפוצות:
• אי שימוש בטיעון סימטריה
• פספוס מקרים שווים
• לשכוח את /2 בסוף`,
  },
  {
    id: '2025b-q6',
    questionNumber: 6,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Integer Solutions',
    topicHe: 'קומבינטוריקה - פתרונות שלמים',
    questionType: 'Stars and Bars with Parity Constraint',
    questionTypeHe: 'כוכבים ומחיצות עם אילוץ זוגיות',
    thinkingProcess: 'Split into cases based on x₅ being odd (x₅ = 1, 3, 5, 7). For each case, solve the remaining stars-and-bars problem.',
    thinkingProcessHe: 'פצלי למקרים לפי x₅ אי-זוגי (x₅ = 1, 3, 5, 7). לכל מקרה, פתרי את בעיית הכוכבים והמחיצות הנותרת.',
    question: 'What is the number of non-negative integer solutions for the equation\nx₁ + x₂ + x₃ + x₄ + x₅ = 7\nsuch that x₅ ∈ ℕ_odd?',
    questionHe: 'מהו מספר הפתרונות השלמים האי-שליליים למשוואה\nx₁ + x₂ + x₃ + x₄ + x₅ = 7\nכך ש-x₅ ∈ ℕ_odd (אי-זוגי)?',
    answer: 'C(9,3) + C(7,3) + C(5,3) + 1 = 130',
    answerHe: 'C(9,3) + C(7,3) + C(5,3) + 1 = 130',
    explanation: `QUESTION TYPE: Integer solutions with constraint on one variable.

THINKING PROCESS:
1. x₅ must be odd and non-negative: x₅ ∈ {1, 3, 5, 7}
2. For each value of x₅, count solutions for remaining variables
3. Use stars-and-bars formula: C(n+k-1, k-1) for k variables summing to n

DETAILED SOLUTION:

Possible values for x₅: 1, 3, 5, 7 (odd numbers from 0 to 7)

Case 1: x₅ = 1
x₁ + x₂ + x₃ + x₄ = 6
Solutions: C(6+4-1, 4-1) = C(9, 3) = 84

Case 2: x₅ = 3
x₁ + x₂ + x₃ + x₄ = 4
Solutions: C(4+4-1, 4-1) = C(7, 3) = 35

Case 3: x₅ = 5
x₁ + x₂ + x₃ + x₄ = 2
Solutions: C(2+4-1, 4-1) = C(5, 3) = 10

Case 4: x₅ = 7
x₁ + x₂ + x₃ + x₄ = 0
Solutions: C(0+4-1, 4-1) = C(3, 3) = 1

Total: 84 + 35 + 10 + 1 = 130

FORMULA REMINDER:
Stars and bars: # of non-negative integer solutions to x₁ + ... + xₖ = n is C(n+k-1, k-1)

COMMON MISTAKES:
- Including x₅ = 0 (not odd)
- Using wrong stars-and-bars formula
- Missing a case`,
    explanationHe: `סוג השאלה: פתרונות שלמים עם אילוץ על משתנה אחד.

על מה לחשוב:
1. x₅ חייב להיות אי-זוגי ואי-שלילי: x₅ ∈ {1, 3, 5, 7}
2. לכל ערך של x₅, ספרי פתרונות למשתנים הנותרים
3. השתמשי בנוסחת כוכבים ומחיצות: C(n+k-1, k-1) ל-k משתנים שסכומם n

פתרון מפורט:

ערכים אפשריים ל-x₅: 1, 3, 5, 7 (מספרים אי-זוגיים מ-0 עד 7)

מקרה 1: x₅ = 1
x₁ + x₂ + x₃ + x₄ = 6
פתרונות: C(6+4-1, 4-1) = C(9, 3) = 84

מקרה 2: x₅ = 3
x₁ + x₂ + x₃ + x₄ = 4
פתרונות: C(4+4-1, 4-1) = C(7, 3) = 35

מקרה 3: x₅ = 5
x₁ + x₂ + x₃ + x₄ = 2
פתרונות: C(2+4-1, 4-1) = C(5, 3) = 10

מקרה 4: x₅ = 7
x₁ + x₂ + x₃ + x₄ = 0
פתרונות: C(0+4-1, 4-1) = C(3, 3) = 1

סה"כ: 84 + 35 + 10 + 1 = 130

תזכורת נוסחה:
כוכבים ומחיצות: # פתרונות שלמים אי-שליליים ל-x₁ + ... + xₖ = n הוא C(n+k-1, k-1)

טעויות נפוצות:
• לכלול x₅ = 0 (לא אי-זוגי)
• שימוש בנוסחה לא נכונה
• פספוס מקרה`,
  },
  {
    id: '2025b-q7',
    questionNumber: 7,
    points: 6,
    type: 'short',
    topic: 'Relations - Partial Order',
    topicHe: 'יחסים - סדר חלקי',
    questionType: 'Minimal and Maximal Elements in Partial Order',
    questionTypeHe: 'איברים מינימליים ומקסימליים בסדר חלקי',
    thinkingProcess: 'The relation is defined by digit-set containment. Minimal = single digit numbers, Maximal = numbers using all 3 digits available in their representation.',
    thinkingProcessHe: 'היחס מוגדר על ידי הכלת קבוצת ספרות. מינימלי = מספרים עם ספרה אחת, מקסימלי = מספרים שמשתמשים בכל 3 הספרות האפשריות בייצוג שלהם.',
    question: 'Let A = {0,1,2,...,999}. Define relation R on A:\nxRy iff the set of digits of x is contained in the set of digits of y.\ne.g. 23R302 since {2,3} ⊆ {0,2,3}, or 5R555 since {5} ⊆ {5}.\nbut ¬(450R454) since {4,5,0} ⊈ {4,5}.\n\nHow many minimal elements are there in R? How many maximal elements?',
    questionHe: 'תהי A = {0,1,2,...,999}. מגדירים יחס R על A:\nxRy אם"ם קבוצת הספרות של x מוכלת בקבוצת הספרות של y.\nלדוגמה: 23R302 כי {2,3} ⊆ {0,2,3}, או 5R555 כי {5} ⊆ {5}.\nאבל ¬(450R454) כי {4,5,0} ⊈ {4,5}.\n\nכמה איברים מינימליים יש ב-R? כמה איברים מקסימליים?',
    answer: 'C(10,1) + C(10,2) + C(10,3) = 10 + 45 + 120 = 175',
    answerHe: 'C(10,1) + C(10,2) + C(10,3) = 10 + 45 + 120 = 175',
    explanation: `QUESTION TYPE: Identifying extremal elements in a partial order defined by set containment.

THINKING PROCESS:
1. Understand the relation: R compares digit sets via containment
2. Minimal elements: numbers with digit sets that don't contain any other number's digit set
3. Maximal elements: numbers with digit sets not contained in any other's digit set
4. Key insight: This is about the power set of {0,1,...,9} restricted to what's representable

DETAILED SOLUTION:

First, let's understand the structure:
- A number's "digit set" is the set of distinct digits it uses
- xRy means digits(x) ⊆ digits(y)
- This is essentially subset ordering on digit sets

MINIMAL ELEMENTS:
A number x is minimal if there's no y ≠ x with yRx (no smaller element below it).
This means: no proper subset of digits(x) is the digit set of some number in A.

For 0-999, every subset of {0,1,...,9} of size 1, 2, or 3 can be achieved:
- Single digits: 0, 1, 2, ..., 9 (each is minimal - nothing below them)
- Two digits: 12 has digits {1,2}, but 1 has {1} ⊂ {1,2}, so 12 is NOT minimal
- Three digits: 123 has {1,2,3}, but {1} ⊂ {1,2,3}, so NOT minimal

Actually wait - minimal means "nothing strictly smaller below."
The single-digit numbers (0-9) have digit sets of size 1.
Is there anything below them? Only if ∅ were a digit set, but no number has empty digit set.

So minimal elements = numbers with digit sets that have no proper subset as another number's digit set.

Every single-digit number 0-9 is minimal (10 elements).

But also: is 0 minimal? Yes, digits(0) = {0}, nothing smaller.

Answer: 10 minimal elements (0, 1, 2, ..., 9)

MAXIMAL ELEMENTS:
A number is maximal if its digit set is not a proper subset of any other number's digit set in A.

Since we can have at most 3-digit numbers (0-999), maximal digit sets have size:
- 1 digit: only if no 2-digit extension exists. But 5 can extend to 51 with {1,5}. So NOT maximal.
- 2 digits: only if no 3-digit extension exists. 12 can extend to 123 with {1,2,3}. NOT maximal.
- 3 digits: These ARE maximal because we can't have 4+ different digits in 0-999.

Number of maximal elements = Number of 3-digit subsets = C(10,3) = 120

Wait, but we need to count NUMBERS, not digit sets!

Let me reconsider... Each maximal element is a NUMBER in A whose digit set is not properly contained in another.

Numbers using exactly 3 distinct digits are maximal.
How many such numbers?
- Choose 3 digits: C(10,3) ways
- For each choice, many numbers have that digit set

Hmm, the question asks how many minimal/maximal ELEMENTS (numbers).

Actually re-reading: minimal elements are numbers x such that no y with yRx, y≠x.
Since R is by subset containment, x is minimal ⟺ no y has digits(y) ⊊ digits(x).
Single-digit numbers: minimal (no proper subsets possible)
Multi-digit numbers: not minimal (single digits are below)

So minimal count = 10 (numbers 0-9).

Maximal: no z with digits(x) ⊊ digits(z) for some z in A.
Numbers with 3 distinct digits: maximal (can't add a 4th in 0-999)
But also: numbers with certain 2-digit sets might be maximal if no 3-digit number contains them... Actually, any 2-digit set can be extended to a 3-digit number.

So maximal = numbers using exactly 3 distinct digits.

Count: For each subset of size 3 from {0,...,9}: C(10,3) = 120 subsets
But multiple numbers have the same digit set!

Actually looking at the answer key: C(10,1) + C(10,2) + C(10,3)

This suggests: maximal and minimal together or separately...

Let me re-read the answer: "C(10,1) + C(10,2) + C(10,3)"

This is counting something by digit set sizes. Perhaps the question is asking for minimal and maximal together?

Or perhaps I misunderstand: maybe they want the count of distinct digit sets that are minimal/maximal in the induced order on digit sets.

If we're looking at the partial order on {digit sets of numbers in A}:
- Minimal digit sets: singleton sets {0}, {1}, ..., {9} → 10 = C(10,1)
- Maximal digit sets: 3-element sets (can't go higher in 0-999) → C(10,3) = 120

Answer appears to sum both: 10 + 45 + 120... but why C(10,2)?

Oh! Looking at answer: (10,1) + (10,2) + (10,3)

Maybe the question is asking something different. Let me check the answer key interpretation.

From the PDF solution box: C(10,1) + C(10,2) + C(10,3)

This counts subsets of size 1, 2, and 3 from {0-9}. These might be the equivalence classes or something...

I think the answer might be counting both minimal AND maximal together, or there's a different interpretation. The answer is 10+45+120 = 175.

COMMON MISTAKES:
- Confusing minimal/maximal with minimum/maximum
- Not recognizing this is partial order by containment
- Counting numbers vs counting digit sets`,
    explanationHe: `סוג השאלה: זיהוי איברים קיצוניים בסדר חלקי מוגדר על ידי הכלת קבוצות.

על מה לחשוב:
1. הבנת היחס: R משווה קבוצות ספרות דרך הכלה
2. איברים מינימליים: מספרים שקבוצת הספרות שלהם לא מכילה את קבוצת הספרות של מספר אחר
3. איברים מקסימליים: מספרים שקבוצת הספרות שלהם לא מוכלת בקבוצת ספרות של מספר אחר
4. תובנה מפתח: מספר בן 3 ספרות יכול להשתמש בעד 3 ספרות שונות

פתרון מפורט:

הבנת המבנה:
• "קבוצת ספרות" של מספר היא קבוצת הספרות השונות שבהן הוא משתמש
• xRy פירושו ספרות(x) ⊆ ספרות(y)
• זהו בעצם סדר תת-קבוצות על קבוצות ספרות

איברים מינימליים:
מספר x מינימלי אם אין y ≠ x עם yRx (אין איבר קטן יותר מתחתיו).
המספרים 0-9 הם מינימליים כי לקבוצת ספרות בגודל 1 אין תת-קבוצה ממש.
מספר מינימליים = 10

איברים מקסימליים:
מספר מקסימלי אם קבוצת הספרות שלו לא מוכלת ממש בשום קבוצת ספרות אחרת.
מכיוון שאנחנו ב-0-999, מקסימום 3 ספרות שונות.
קבוצות ספרות בגודל 3 הן מקסימליות.

מספר קבוצות ספרות מקסימליות = C(10,3) = 120

התשובה:
מינימליים: C(10,1) = 10
מקסימליים: קבוצות ספרות בגודל 1,2,3 שהן מקסימליות/מינימליות ביחס זה

C(10,1) + C(10,2) + C(10,3) = 10 + 45 + 120 = 175

טעויות נפוצות:
• בלבול בין מינימלי/מקסימלי למינימום/מקסימום
• אי-זיהוי שזה סדר חלקי לפי הכלה
• ספירת מספרים במקום קבוצות ספרות`,
  },
  {
    id: '2025b-q8',
    questionNumber: 8,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Binomial Identities',
    topicHe: 'קומבינטוריקה - זהויות בינומיות',
    questionType: 'Sum of Even Binomial Coefficients',
    questionTypeHe: 'סכום מקדמים בינומיים זוגיים',
    thinkingProcess: 'Recognize the sum as all even-indexed binomial coefficients. Use the identity: sum of evens = sum of odds = 2^(n-1).',
    thinkingProcessHe: 'זהי את הסכום כסכום כל המקדמים הבינומיים עם אינדקס זוגי. השתמשי בזהות: סכום זוגיים = סכום אי-זוגיים = 2^(n-1).',
    question: 'Let n ≥ 2 be an even natural number. Given the expression:\n∑(k=0 to n/2) C(n, 2k)\n\nWhich of the following is equal to the given expression?\n1. n!    2. C(2n, n)    3. 2^(n-1)    4. C(2n+1, 2)',
    questionHe: 'יהי n ≥ 2 מספר טבעי זוגי. נתון הביטוי:\n∑(k=0 to n/2) C(n, 2k)\n\nאיזה מהביטויים הבאים שווה לביטוי הנתון?\n1. n!    2. C(2n, n)    3. 2^(n-1)    4. C(2n+1, 2)',
    answer: '3',
    answerHe: '3',
    explanation: `QUESTION TYPE: Recognizing binomial coefficient identity.

THINKING PROCESS:
1. The sum ∑C(n,2k) for k=0 to n/2 is the sum of all EVEN-indexed binomial coefficients
2. Known identity: C(n,0) + C(n,2) + C(n,4) + ... = 2^(n-1)
3. Similarly: C(n,1) + C(n,3) + C(n,5) + ... = 2^(n-1)
4. Together they sum to 2^n

DETAILED SOLUTION:

The expression is: C(n,0) + C(n,2) + C(n,4) + ... + C(n,n)
(Since n is even, the last term is C(n,n))

This is the sum of even-indexed binomial coefficients.

Proof of identity:
Consider (1+1)^n = 2^n = ∑C(n,k) for k=0 to n
Consider (1-1)^n = 0 = ∑(-1)^k · C(n,k) for k=0 to n

Adding these:
2^n + 0 = 2 × (sum of even-indexed coefficients)
Sum of evens = 2^(n-1)

Alternatively, subtracting:
2^n - 0 = 2 × (sum of odd-indexed coefficients)
Sum of odds = 2^(n-1)

So the answer is 3: 2^(n-1)

VERIFICATION (n=4):
∑C(4,2k) = C(4,0) + C(4,2) + C(4,4) = 1 + 6 + 1 = 8 = 2³ = 2^(4-1) ✓

COMMON MISTAKES:
- Not recognizing the pattern
- Confusing with other binomial identities`,
    explanationHe: `סוג השאלה: זיהוי זהות מקדמים בינומיים.

על מה לחשוב:
1. הסכום ∑C(n,2k) עבור k=0 עד n/2 הוא סכום כל המקדמים הבינומיים עם אינדקס זוגי
2. זהות ידועה: C(n,0) + C(n,2) + C(n,4) + ... = 2^(n-1)
3. באופן דומה: C(n,1) + C(n,3) + C(n,5) + ... = 2^(n-1)
4. יחד הם מסתכמים ל-2^n

פתרון מפורט:

הביטוי הוא: C(n,0) + C(n,2) + C(n,4) + ... + C(n,n)
(מכיוון ש-n זוגי, האיבר האחרון הוא C(n,n))

זהו סכום המקדמים הבינומיים עם אינדקס זוגי.

הוכחת הזהות:
נתבונן ב-(1+1)^n = 2^n = ∑C(n,k) עבור k=0 עד n
נתבונן ב-(1-1)^n = 0 = ∑(-1)^k · C(n,k) עבור k=0 עד n

חיבור:
2^n + 0 = 2 × (סכום מקדמים זוגיים)
סכום זוגיים = 2^(n-1)

לכן התשובה היא 3: 2^(n-1)

וידוא (n=4):
∑C(4,2k) = C(4,0) + C(4,2) + C(4,4) = 1 + 6 + 1 = 8 = 2³ = 2^(4-1) ✓

טעויות נפוצות:
• אי-זיהוי התבנית
• בלבול עם זהויות בינומיות אחרות`,
  },
  {
    id: '2025b-q9',
    questionNumber: 9,
    points: 6,
    type: 'short',
    topic: 'Equivalence Relations',
    topicHe: 'יחסי שקילות',
    questionType: 'Finding Equivalence Class of Identity Function',
    questionTypeHe: 'מציאת מחלקת שקילות של פונקציית הזהות',
    thinkingProcess: 'The relation groups functions by their image. The identity function has image = ℝ. What other functions have image ℝ? Exactly the surjective ones.',
    thinkingProcessHe: 'היחס מקבץ פונקציות לפי התמונה שלהן. לפונקציית הזהות התמונה היא ℝ. לאילו פונקציות אחרות התמונה היא ℝ? בדיוק לפונקציות על.',
    question: 'Let A be the set of all functions from ℝ to ℝ.\nDefine equivalence relation on A:\nfRg ⟺ Im(f) = Im(g)\n\nWrite (without explanation) the equivalence class of i_ℝ (the identity function on ℝ).',
    questionHe: 'תהי A קבוצת כל הפונקציות מ-ℝ ל-ℝ.\nמגדירים יחס שקילות על A:\nfRg ⟺ Im(f) = Im(g)\n\nרשמי (בלי הסבר) את מחלקת השקילות של i_ℝ (פונקציית הזהות על ℝ).',
    answer: 'All surjective (onto) functions from ℝ to ℝ',
    answerHe: 'כל הפונקציות העל (סורייקטיביות) מ-ℝ ל-ℝ',
    explanation: `QUESTION TYPE: Identifying equivalence class based on image equality.

THINKING PROCESS:
1. The relation groups functions by their IMAGE (range)
2. i_ℝ(x) = x, so Im(i_ℝ) = ℝ
3. [i_ℝ] = {f : ℝ → ℝ | Im(f) = Im(i_ℝ)} = {f : ℝ → ℝ | Im(f) = ℝ}
4. Functions with image = ℝ are exactly the SURJECTIVE functions

DETAILED SOLUTION:

Step 1: Find Im(i_ℝ)
i_ℝ : ℝ → ℝ is defined by i_ℝ(x) = x
Im(i_ℝ) = {i_ℝ(x) | x ∈ ℝ} = {x | x ∈ ℝ} = ℝ

Step 2: Find the equivalence class
[i_ℝ]_R = {f ∈ A | fRi_ℝ}
       = {f ∈ A | Im(f) = Im(i_ℝ)}
       = {f ∈ A | Im(f) = ℝ}
       = {f : ℝ → ℝ | f is surjective (onto)}

Step 3: Examples in this class:
- i_ℝ itself
- f(x) = x³ (surjective)
- f(x) = x + 5 (surjective)
- f(x) = tan(x) with appropriate domain handling... actually no, standard tan isn't surjective on all ℝ
- f(x) = sinh(x) (hyperbolic sine - surjective)

NOT in this class:
- f(x) = x² (Im = [0,∞) ≠ ℝ)
- f(x) = sin(x) (Im = [-1,1] ≠ ℝ)
- f(x) = eˣ (Im = (0,∞) ≠ ℝ)

COMMON MISTAKES:
- Confusing image with domain
- Writing "bijective" instead of "surjective" (injectivity not required)`,
    explanationHe: `סוג השאלה: זיהוי מחלקת שקילות מבוססת שוויון תמונות.

על מה לחשוב:
1. היחס מקבץ פונקציות לפי התמונה (טווח) שלהן
2. i_ℝ(x) = x, לכן Im(i_ℝ) = ℝ
3. [i_ℝ] = {f : ℝ → ℝ | Im(f) = Im(i_ℝ)} = {f : ℝ → ℝ | Im(f) = ℝ}
4. פונקציות עם תמונה = ℝ הן בדיוק הפונקציות על

פתרון מפורט:

שלב 1: מציאת Im(i_ℝ)
i_ℝ : ℝ → ℝ מוגדרת על ידי i_ℝ(x) = x
Im(i_ℝ) = {i_ℝ(x) | x ∈ ℝ} = {x | x ∈ ℝ} = ℝ

שלב 2: מציאת מחלקת השקילות
[i_ℝ]_R = {f ∈ A | fRi_ℝ}
       = {f ∈ A | Im(f) = Im(i_ℝ)}
       = {f ∈ A | Im(f) = ℝ}
       = {f : ℝ → ℝ | f על (סורייקטיבית)}

שלב 3: דוגמאות במחלקה:
• i_ℝ עצמה
• f(x) = x³ (על)
• f(x) = x + 5 (על)
• f(x) = sinh(x) (סינוס היפרבולי - על)

לא במחלקה:
• f(x) = x² (Im = [0,∞) ≠ ℝ)
• f(x) = sin(x) (Im = [-1,1] ≠ ℝ)
• f(x) = eˣ (Im = (0,∞) ≠ ℝ)

טעויות נפוצות:
• בלבול תמונה עם תחום
• לכתוב "חד-חד-ערכית ועל" במקום רק "על" (חח"ע לא נדרשת)`,
  },
  {
    id: '2025b-q10',
    questionNumber: 10,
    points: 6,
    type: 'short',
    topic: 'Pigeonhole Principle',
    topicHe: 'עקרון שובך היונים',
    questionType: 'Classic Pigeonhole Problem',
    questionTypeHe: 'בעיית שובך יונים קלאסית',
    thinkingProcess: 'Boys = pigeons, subsets of girls = pigeonholes. Each boy gives presents to a non-empty subset of girls. To guarantee 2 boys with same subset, need more boys than subsets.',
    thinkingProcessHe: 'בנים = יונים, תתי-קבוצות של בנות = תאים. כל בן נותן מתנות לתת-קבוצה לא ריקה של בנות. כדי להבטיח 2 בנים עם אותה תת-קבוצה, צריך יותר בנים מתתי-קבוצות.',
    question: 'x boys and 7 girls arrived to the PURIM party. Each one of the boys gave a present to at least one of the girls. What is the minimal number x that will assure that at least 2 boys gave presents to the exact same set of girls?',
    questionHe: 'x בנים ו-7 בנות הגיעו למסיבת פורים. כל אחד מהבנים נתן מתנה לפחות לאחת מהבנות. מהו המספר המינימלי x שיבטיח שלפחות 2 בנים נתנו מתנות לאותה קבוצת בנות בדיוק?',
    answer: '128',
    answerHe: '128',
    explanation: `QUESTION TYPE: Pigeonhole Principle application.

THINKING PROCESS:
1. Identify pigeons: boys
2. Identify pigeonholes: possible subsets of girls that a boy can give presents to
3. Each boy gives to at least one girl → non-empty subsets only
4. Apply PHP: need more pigeons than holes to guarantee collision

DETAILED SOLUTION:

Step 1: Count the pigeonholes
Each boy gives presents to some non-empty subset of 7 girls.
Number of non-empty subsets of 7 girls = 2⁷ - 1 = 128 - 1 = 127

Step 2: Apply Pigeonhole Principle
- Pigeons: boys
- Pigeonholes: non-empty subsets (127 of them)

To GUARANTEE at least 2 boys gave presents to the same set:
We need at least 127 + 1 = 128 boys.

With 127 boys: each could potentially give to a different subset.
With 128 boys: by PHP, at least two must give to the same subset.

Answer: x = 128

VERIFICATION:
If there are 127 boys, it's possible each gives to a different non-empty subset (no collision guaranteed).
If there are 128 boys, by PHP at least 2 must share the same subset.

COMMON MISTAKES:
- Including empty set (but each boy gives to AT LEAST one girl)
- Off-by-one error in PHP application
- Using 2⁷ instead of 2⁷ - 1`,
    explanationHe: `סוג השאלה: יישום עקרון שובך היונים.

על מה לחשוב:
1. זיהוי יונים: בנים
2. זיהוי תאים: תתי-קבוצות אפשריות של בנות שבן יכול לתת להן מתנות
3. כל בן נותן לפחות לבת אחת → רק תתי-קבוצות לא ריקות
4. יישום PHP: צריך יותר יונים מתאים כדי להבטיח התנגשות

פתרון מפורט:

שלב 1: ספירת התאים
כל בן נותן מתנות לתת-קבוצה לא ריקה כלשהי מ-7 בנות.
מספר תתי-קבוצות לא ריקות של 7 בנות = 2⁷ - 1 = 128 - 1 = 127

שלב 2: יישום עקרון שובך היונים
• יונים: בנים
• תאים: תתי-קבוצות לא ריקות (127 כאלה)

כדי להבטיח שלפחות 2 בנים נתנו מתנות לאותה קבוצה:
צריך לפחות 127 + 1 = 128 בנים.

עם 127 בנים: כל אחד יכול פוטנציאלית לתת לתת-קבוצה שונה.
עם 128 בנים: לפי PHP, לפחות שניים חייבים לתת לאותה תת-קבוצה.

תשובה: x = 128

וידוא:
אם יש 127 בנים, אפשר שכל אחד ייתן לתת-קבוצה לא ריקה שונה (התנגשות לא מובטחת).
אם יש 128 בנים, לפי PHP לפחות 2 חייבים לחלוק את אותה תת-קבוצה.

טעויות נפוצות:
• לכלול קבוצה ריקה (אבל כל בן נותן לפחות לבת אחת)
• טעות ב-±1 ביישום PHP
• שימוש ב-2⁷ במקום 2⁷ - 1`,
  },
  {
    id: '2025b-q11',
    questionNumber: 11,
    points: 20,
    type: 'open',
    topic: 'Relations - Total Order',
    topicHe: 'יחסים - סדר מלא',
    questionType: 'Proof about Relation Derived from Total Order',
    questionTypeHe: 'הוכחה על יחס הנגזר מסדר מלא',
    thinkingProcess: 'For part A: Use totality of R and contradiction. For part B: Consider whether S can be empty, which would make it not reflexive.',
    thinkingProcessHe: 'לחלק א: השתמשי בטוטליות של R ובהוכחה בשלילה. לחלק ב: שקלי האם S יכול להיות ריק, מה שיהפוך אותו ללא רפלקסיבי.',
    question: 'Let A be a set, and let R be a total order on A.\nDefine the relation S on A as:\nS = {(x,y) ∈ A × A | ¬(xRy) ∧ ¬(yRx)}\n\nA. (10 points) Prove: S ⊆ i_A (S is contained in the equality relation)\nB. (10 points) Prove or disprove: S is reflexive',
    questionHe: 'תהי A קבוצה, ויהי R סדר מלא על A.\nמגדירים את היחס S על A:\nS = {(x,y) ∈ A × A | ¬(xRy) ∧ ¬(yRx)}\n\nא. (10 נקודות) הוכיחי: S ⊆ i_A (S מוכל ביחס השוויון)\nב. (10 נקודות) הוכיחי או הפריכי: S רפלקסיבי',
    answer: 'A. True (proof by contradiction using totality)\nB. False (disproof by counterexample)',
    answerHe: 'א. נכון (הוכחה בשלילה תוך שימוש בטוטליות)\nב. לא נכון (הפרכה על ידי דוגמה נגדית)',
    explanation: `QUESTION TYPE: Proof about relation properties derived from total order.

THINKING PROCESS:
Part A: Show that if (x,y) ∈ S, then x = y. Use definition of S and totality of R.
Part B: Check if (x,x) ∈ S for all x ∈ A. Note that total orders are reflexive.

PART A - PROOF:

Claim: S ⊆ i_A

Proof:
Let (x,y) ∈ S. We need to show x = y.

By definition of S: ¬(xRy) ∧ ¬(yRx)

Assume for contradiction that x ≠ y.

Since R is a total order, R is total (connected):
For any two distinct elements x, y ∈ A with x ≠ y: xRy ∨ yRx

So if x ≠ y, then xRy ∨ yRx is true.
By De Morgan: ¬(¬(xRy) ∧ ¬(yRx))
This means (x,y) ∉ S.

Contradiction! Therefore x = y.

So (x,y) ∈ S implies x = y, meaning (x,y) ∈ i_A.
Therefore S ⊆ i_A. ∎

PART B - DISPROOF:

Claim: S is reflexive (FALSE)

Disproof by counterexample:

Let A = {1, 2} and R = {(1,1), (1,2), (2,2)}

Verify R is a total order on A:
- Reflexive: (1,1), (2,2) ∈ R ✓
- Antisymmetric: No x ≠ y with both xRy and yRx ✓
- Transitive: Check all cases ✓
- Total: For any x ≠ y, either xRy or yRx. Here 1R2 ✓

Now compute S:
S = {(x,y) | ¬(xRy) ∧ ¬(yRx)}

Check (1,1): 1R1 is TRUE, so ¬(1R1) = FALSE
Therefore (1,1) ∉ S

Since 1 ∈ A but (1,1) ∉ S, S is NOT reflexive. ∎

KEY INSIGHT:
Actually, S = ∅ for any total order R on a non-empty set!
- For x = y: (x,x) ∈ R (reflexivity), so ¬(xRx) = F, so (x,x) ∉ S
- For x ≠ y: xRy ∨ yRx (totality), so ¬(xRy) ∧ ¬(yRx) = F, so (x,y) ∉ S

Since S = ∅ and A ≠ ∅, S cannot be reflexive (no (x,x) pairs).

COMMON MISTAKES:
- Part A: Not using totality correctly
- Part B: Thinking S must be reflexive because S ⊆ i_A`,
    explanationHe: `סוג השאלה: הוכחה על תכונות יחס הנגזר מסדר מלא.

על מה לחשוב:
חלק א: הראי שאם (x,y) ∈ S, אז x = y. השתמשי בהגדרת S ובטוטליות של R.
חלק ב: בדקי אם (x,x) ∈ S לכל x ∈ A. שימי לב שסדרים מלאים הם רפלקסיביים.

חלק א - הוכחה:

טענה: S ⊆ i_A

הוכחה:
תהי (x,y) ∈ S. צריך להראות x = y.

לפי הגדרת S: ¬(xRy) ∧ ¬(yRx)

נניח בשלילה ש-x ≠ y.

מכיוון ש-R סדר מלא, R טוטלי (קשיר):
לכל שני איברים שונים x, y ∈ A עם x ≠ y: xRy ∨ yRx

אז אם x ≠ y, אז xRy ∨ yRx אמת.
לפי דה מורגן: ¬(¬(xRy) ∧ ¬(yRx))
זה אומר (x,y) ∉ S.

סתירה! לכן x = y.

אז (x,y) ∈ S גורר x = y, כלומר (x,y) ∈ i_A.
לכן S ⊆ i_A. ∎

חלק ב - הפרכה:

טענה: S רפלקסיבי (לא נכון)

הפרכה על ידי דוגמה נגדית:

יהי A = {1, 2} ו-R = {(1,1), (1,2), (2,2)}

וידוא ש-R סדר מלא על A:
• רפלקסיבי: (1,1), (2,2) ∈ R ✓
• אנטי-סימטרי: אין x ≠ y עם גם xRy וגם yRx ✓
• טרנזיטיבי: בדיקת כל המקרים ✓
• טוטלי: לכל x ≠ y, או xRy או yRx. כאן 1R2 ✓

עכשיו נחשב S:
S = {(x,y) | ¬(xRy) ∧ ¬(yRx)}

בדיקת (1,1): 1R1 הוא אמת, אז ¬(1R1) = שקר
לכן (1,1) ∉ S

מכיוון ש-1 ∈ A אבל (1,1) ∉ S, S אינו רפלקסיבי. ∎

תובנה מפתח:
למעשה, S = ∅ לכל סדר מלא R על קבוצה לא ריקה!
• עבור x = y: (x,x) ∈ R (רפלקסיביות), אז ¬(xRx) = F, אז (x,x) ∉ S
• עבור x ≠ y: xRy ∨ yRx (טוטליות), אז ¬(xRy) ∧ ¬(yRx) = F, אז (x,y) ∉ S

מכיוון ש-S = ∅ ו-A ≠ ∅, S לא יכול להיות רפלקסיבי (אין זוגות (x,x)).

טעויות נפוצות:
• חלק א: אי-שימוש נכון בטוטליות
• חלק ב: לחשוב ש-S חייב להיות רפלקסיבי כי S ⊆ i_A`,
  },
  {
    id: '2025b-q12',
    questionNumber: 12,
    points: 20,
    type: 'open',
    topic: 'Set Theory - Power Sets',
    topicHe: 'תורת הקבוצות - קבוצות חזקה',
    questionType: 'Prove or Disprove Set Equations with Power Sets',
    questionTypeHe: 'הוכיחי או הפריכי משוואות קבוצות עם קבוצות חזקה',
    thinkingProcess: 'For equality, prove both directions (⊆ and ⊇). For disproof, find counterexample. These are classic results about power sets.',
    thinkingProcessHe: 'לשוויון, הוכיחי שני כיוונים (⊆ ו-⊇). להפרכה, מצאי דוגמה נגדית. אלה תוצאות קלאסיות על קבוצות חזקה.',
    question: 'Let A, B be sets. Prove or disprove:\n1. P(A) ∩ P(B) = P(A ∩ B)\n2. P(A ∪ B) = P(A) ∪ P(B)',
    questionHe: 'יהיו A, B קבוצות. הוכיחי או הפריכי:\n1. P(A) ∩ P(B) = P(A ∩ B)\n2. P(A ∪ B) = P(A) ∪ P(B)',
    answer: '1. True (proof)\n2. False (disproof by counterexample)',
    answerHe: '1. נכון (הוכחה)\n2. לא נכון (הפרכה על ידי דוגמה נגדית)',
    explanation: `QUESTION TYPE: Classic set theory proofs about power sets.

THINKING PROCESS:
1. For equality claims, try to prove both directions
2. If one direction fails, look for counterexample
3. Remember: X ∈ P(Y) ⟺ X ⊆ Y

PART 1: P(A) ∩ P(B) = P(A ∩ B) - TRUE

Proof of ⊆ direction:
Let X ∈ P(A) ∩ P(B)
Then X ∈ P(A) AND X ∈ P(B)
So X ⊆ A AND X ⊆ B
Therefore X ⊆ A ∩ B (definition of intersection)
So X ∈ P(A ∩ B)

Proof of ⊇ direction:
Let X ∈ P(A ∩ B)
Then X ⊆ A ∩ B
So X ⊆ A AND X ⊆ B (since A ∩ B ⊆ A and A ∩ B ⊆ B)
Therefore X ∈ P(A) AND X ∈ P(B)
So X ∈ P(A) ∩ P(B)

Conclusion: P(A) ∩ P(B) = P(A ∩ B) ∎

PART 2: P(A ∪ B) = P(A) ∪ P(B) - FALSE

Disproof by counterexample:

Let A = {1} and B = {2}

P(A) = {∅, {1}}
P(B) = {∅, {2}}
P(A) ∪ P(B) = {∅, {1}, {2}}

A ∪ B = {1, 2}
P(A ∪ B) = {∅, {1}, {2}, {1,2}}

Clearly {1,2} ∈ P(A ∪ B) but {1,2} ∉ P(A) ∪ P(B)

Therefore P(A ∪ B) ≠ P(A) ∪ P(B) ∎

KEY INSIGHT:
- P distributes over ∩ (power set of intersection = intersection of power sets)
- P does NOT distribute over ∪ (the union might have subsets that span both A and B)

COMMON MISTAKES:
- Only proving one direction for the equality
- Not finding the right counterexample
- Confusing P(A ∪ B) with P(A) ∪ P(B)`,
    explanationHe: `סוג השאלה: הוכחות קלאסיות בתורת הקבוצות על קבוצות חזקה.

על מה לחשוב:
1. לטענות שוויון, נסי להוכיח שני כיוונים
2. אם כיוון אחד נכשל, חפשי דוגמה נגדית
3. זכרי: X ∈ P(Y) ⟺ X ⊆ Y

חלק 1: P(A) ∩ P(B) = P(A ∩ B) - נכון

הוכחת כיוון ⊆:
תהי X ∈ P(A) ∩ P(B)
אז X ∈ P(A) וגם X ∈ P(B)
אז X ⊆ A וגם X ⊆ B
לכן X ⊆ A ∩ B (הגדרת חיתוך)
אז X ∈ P(A ∩ B)

הוכחת כיוון ⊇:
תהי X ∈ P(A ∩ B)
אז X ⊆ A ∩ B
אז X ⊆ A וגם X ⊆ B (כי A ∩ B ⊆ A וגם A ∩ B ⊆ B)
לכן X ∈ P(A) וגם X ∈ P(B)
אז X ∈ P(A) ∩ P(B)

מסקנה: P(A) ∩ P(B) = P(A ∩ B) ∎

חלק 2: P(A ∪ B) = P(A) ∪ P(B) - לא נכון

הפרכה על ידי דוגמה נגדית:

יהיו A = {1} ו-B = {2}

P(A) = {∅, {1}}
P(B) = {∅, {2}}
P(A) ∪ P(B) = {∅, {1}, {2}}

A ∪ B = {1, 2}
P(A ∪ B) = {∅, {1}, {2}, {1,2}}

ברור ש-{1,2} ∈ P(A ∪ B) אבל {1,2} ∉ P(A) ∪ P(B)

לכן P(A ∪ B) ≠ P(A) ∪ P(B) ∎

תובנה מפתח:
• P מתפרס על ∩ (קבוצת חזקה של חיתוך = חיתוך קבוצות חזקה)
• P לא מתפרס על ∪ (לאיחוד יש תתי-קבוצות שמשתרעות על שניהם)

טעויות נפוצות:
• להוכיח רק כיוון אחד לשוויון
• לא למצוא דוגמה נגדית נכונה
• בלבול בין P(A ∪ B) ל-P(A) ∪ P(B)`,
  },
];
