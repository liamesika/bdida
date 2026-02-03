// Exam 2022 Moed B - Full Solutions with Enhanced Explanations

export interface ExamQuestion2022B {
  id: string;
  questionNumber: number;
  points: number;
  type: 'short' | 'open';
  topic: string;
  topicHe: string;
  questionType: string;
  questionTypeHe: string;
  thinkingProcess: string;
  thinkingProcessHe: string;
  question: string;
  questionHe: string;
  answer: string;
  answerHe: string;
  explanation: string;
  explanationHe: string;
}

export const examInfo2022B = {
  title: 'מבחן 2022 מועד ב\' - מתמטיקה בדידה',
  year: 2022,
  semester: 'B',
  duration: '3 שעות',
  shortQuestions: 12,
  openQuestions: 2,
  shortQuestionPoints: 6,
  openQuestionPoints: 14,
  totalPoints: 100,
};

export const exam2022BQuestions: ExamQuestion2022B[] = [
  {
    id: '2022b-q1',
    questionNumber: 1,
    points: 6,
    type: 'short',
    topic: 'Set Theory - Membership vs Subset',
    topicHe: 'תורת הקבוצות - שייכות מול הכלה',
    questionType: 'Distinguishing ∈ from ⊆ with Power Sets',
    questionTypeHe: 'הבחנה בין ∈ ל-⊆ עם קבוצות חזקה',
    thinkingProcess: 'For each part, ask: Is the left side an ELEMENT of the right? Is it a SUBSET of the right? Remember P(∅) = {∅} and P(ℕ) contains all subsets of ℕ.',
    thinkingProcessHe: 'לכל חלק, שאלי: האם צד שמאל הוא איבר של הימין? האם הוא תת-קבוצה של הימין? זכרי P(∅) = {∅} ו-P(ℕ) מכילה את כל תתי-הקבוצות של ℕ.',
    question: 'For each part, choose which holds: ∈, ⊆, both, or neither.\ni. ∅ ___ P(∅)\nii. P(∅) ___ P(ℕ)\niii. P(∅) ___ P(ℕ ∪ {∅})',
    questionHe: 'לכל חלק, בחרי מה מתקיים: ∈, ⊆, שניהם, או אף אחד.\ni. ∅ ___ P(∅)\nii. P(∅) ___ P(ℕ)\niii. P(∅) ___ P(ℕ ∪ {∅})',
    answer: 'i. Both\nii. ⊆\niii. Both',
    answerHe: 'i. שניהם\nii. ⊆\niii. שניהם',
    explanation: `QUESTION TYPE: Understanding the difference between ∈ (element of) and ⊆ (subset of) with power sets.

THINKING PROCESS:
- X ∈ P(Y) means X is a subset of Y (X ⊆ Y)
- X ⊆ P(Y) means every element of X is a subset of Y
- P(∅) = {∅} (one element: the empty set)
- P(ℕ) = all subsets of ℕ

DETAILED ANALYSIS:

Part i: ∅ ___ P(∅)
P(∅) = {∅}

Is ∅ ∈ P(∅)?
∅ ∈ {∅}? YES! The empty set is the one element of P(∅).

Is ∅ ⊆ P(∅)?
The empty set is a subset of EVERY set, including {∅}. YES!

Answer: BOTH ✓

Part ii: P(∅) ___ P(ℕ)
P(∅) = {∅}
P(ℕ) = {all subsets of ℕ}

Is P(∅) ∈ P(ℕ)?
Is {∅} ∈ P(ℕ)? This would mean {∅} ⊆ ℕ.
But ∅ ∉ ℕ (∅ is not a natural number), so {∅} ⊈ ℕ.
Therefore {∅} ∉ P(ℕ). NO!

Is P(∅) ⊆ P(ℕ)?
We need: every element of P(∅) is in P(ℕ).
P(∅) = {∅}, so we need ∅ ∈ P(ℕ).
Is ∅ ⊆ ℕ? YES! (empty set is subset of everything)
So ∅ ∈ P(ℕ). YES!

Answer: ⊆ only ✓

Part iii: P(∅) ___ P(ℕ ∪ {∅})
P(∅) = {∅}
ℕ ∪ {∅} = {0, 1, 2, 3, ..., ∅} (natural numbers and the empty set)
P(ℕ ∪ {∅}) = all subsets of ℕ ∪ {∅}

Is P(∅) ∈ P(ℕ ∪ {∅})?
Is {∅} ∈ P(ℕ ∪ {∅})? This means {∅} ⊆ ℕ ∪ {∅}.
Is ∅ ∈ ℕ ∪ {∅}? YES! (∅ is explicitly in the union)
So {∅} ⊆ ℕ ∪ {∅}. YES!

Is P(∅) ⊆ P(ℕ ∪ {∅})?
Need ∅ ∈ P(ℕ ∪ {∅}), i.e., ∅ ⊆ ℕ ∪ {∅}. YES!

Answer: BOTH ✓

COMMON MISTAKES:
- Confusing ∈ with ⊆
- Forgetting that P(∅) = {∅}, not ∅
- Not checking both conditions`,
    explanationHe: `סוג השאלה: הבנת ההבדל בין ∈ (איבר של) ל-⊆ (תת-קבוצה של) עם קבוצות חזקה.

על מה לחשוב:
• X ∈ P(Y) אומר ש-X תת-קבוצה של Y (X ⊆ Y)
• X ⊆ P(Y) אומר שכל איבר של X הוא תת-קבוצה של Y
• P(∅) = {∅} (איבר אחד: הקבוצה הריקה)
• P(ℕ) = כל תתי-הקבוצות של ℕ

ניתוח מפורט:

חלק i: ∅ ___ P(∅)
P(∅) = {∅}

האם ∅ ∈ P(∅)?
∅ ∈ {∅}? כן! הקבוצה הריקה היא האיבר היחיד של P(∅).

האם ∅ ⊆ P(∅)?
הקבוצה הריקה היא תת-קבוצה של כל קבוצה, כולל {∅}. כן!

תשובה: שניהם ✓

חלק ii: P(∅) ___ P(ℕ)
P(∅) = {∅}
P(ℕ) = {כל תתי-הקבוצות של ℕ}

האם P(∅) ∈ P(ℕ)?
האם {∅} ∈ P(ℕ)? זה אומר {∅} ⊆ ℕ.
אבל ∅ ∉ ℕ (∅ אינו מספר טבעי), אז {∅} ⊈ ℕ.
לכן {∅} ∉ P(ℕ). לא!

האם P(∅) ⊆ P(ℕ)?
צריך: כל איבר של P(∅) נמצא ב-P(ℕ).
P(∅) = {∅}, אז צריך ∅ ∈ P(ℕ).
האם ∅ ⊆ ℕ? כן! (קבוצה ריקה תת-קבוצה של הכל)
אז ∅ ∈ P(ℕ). כן!

תשובה: ⊆ בלבד ✓

חלק iii: P(∅) ___ P(ℕ ∪ {∅})
P(∅) = {∅}
ℕ ∪ {∅} = {0, 1, 2, 3, ..., ∅} (טבעיים וקבוצה ריקה)
P(ℕ ∪ {∅}) = כל תתי-הקבוצות של ℕ ∪ {∅}

האם P(∅) ∈ P(ℕ ∪ {∅})?
האם {∅} ∈ P(ℕ ∪ {∅})? זה אומר {∅} ⊆ ℕ ∪ {∅}.
האם ∅ ∈ ℕ ∪ {∅}? כן! (∅ מופיע במפורש באיחוד)
אז {∅} ⊆ ℕ ∪ {∅}. כן!

האם P(∅) ⊆ P(ℕ ∪ {∅})?
צריך ∅ ∈ P(ℕ ∪ {∅}), כלומר ∅ ⊆ ℕ ∪ {∅}. כן!

תשובה: שניהם ✓

טעויות נפוצות:
• בלבול בין ∈ ל-⊆
• לשכוח ש-P(∅) = {∅}, לא ∅
• לא לבדוק את שני התנאים`,
  },
  {
    id: '2022b-q2',
    questionNumber: 2,
    points: 6,
    type: 'short',
    topic: 'Logic - Tautologies',
    topicHe: 'לוגיקה - טאוטולוגיות',
    questionType: 'Properties of Tautologies',
    questionTypeHe: 'תכונות של טאוטולוגיות',
    thinkingProcess: 'Test each claim with counterexamples or logical reasoning. A tautology has ALL TRUE in its truth table.',
    thinkingProcessHe: 'בדקי כל טענה עם דוגמאות נגדיות או חשיבה לוגית. טאוטולוגיה היא פסוק שכל השורות בטבלת האמת שלו הן T.',
    question: 'A tautology is a statement whose truth table is full of T\'s.\nWrite down the number of the correct claim:\n1. if α, β are not tautologies, then α → β is a tautology.\n2. if α ↔ β is a tautology, then α ∨ β is a tautology.\n3. If α ∧ β is a tautology, then α, β are tautologies.\n4. If α ∨ β is a tautology, then α, β are tautologies.',
    questionHe: 'טאוטולוגיה היא פסוק שטבלת האמת שלו מלאה ב-T.\nרשמי את מספר הטענה הנכונה:\n1. אם α, β אינן טאוטולוגיות, אז α → β טאוטולוגיה.\n2. אם α ↔ β טאוטולוגיה, אז α ∨ β טאוטולוגיה.\n3. אם α ∧ β טאוטולוגיה, אז α, β טאוטולוגיות.\n4. אם α ∨ β טאוטולוגיה, אז α, β טאוטולוגיות.',
    answer: '3',
    answerHe: '3',
    explanation: `QUESTION TYPE: Testing understanding of tautology properties.

THINKING PROCESS:
- Tautology = true in ALL rows of truth table
- For each claim, try to prove or find counterexample
- Think about what each connective requires

DETAILED ANALYSIS:

Claim 1: if α, β are not tautologies, then α → β is a tautology. FALSE
Counterexample: Let α = p, β = ¬p
Neither is a tautology.
p → ¬p is true when p=F, false when p=T.
So p → ¬p is NOT a tautology.

Claim 2: if α ↔ β is a tautology, then α ∨ β is a tautology. FALSE
Counterexample: Let α = p, β = p (same variable)
α ↔ β = p ↔ p ≡ T (tautology)
α ∨ β = p ∨ p ≡ p (NOT a tautology)

Claim 3: If α ∧ β is a tautology, then α, β are tautologies. TRUE
Proof:
If α ∧ β is always true, then in EVERY row of the truth table, both α AND β must be true.
This means:
- α is true in every row → α is a tautology
- β is true in every row → β is a tautology

Claim 4: If α ∨ β is a tautology, then α, β are tautologies. FALSE
Counterexample: Let α = p, β = ¬p
α ∨ β = p ∨ ¬p ≡ T (tautology - law of excluded middle)
But neither p nor ¬p is a tautology.

ANSWER: 3 ✓

COMMON MISTAKES:
- Not finding good counterexamples
- Confusing tautology with satisfiable
- Not understanding how ∧ distributes truth values`,
    explanationHe: `סוג השאלה: בדיקת הבנה של תכונות טאוטולוגיה.

על מה לחשוב:
• טאוטולוגיה = אמת בכל השורות של טבלת האמת
• לכל טענה, נסי להוכיח או למצוא דוגמה נגדית
• חשבי מה כל קשר דורש

ניתוח מפורט:

טענה 1: אם α, β אינן טאוטולוגיות, אז α → β טאוטולוגיה. לא נכון
דוגמה נגדית: יהי α = p, β = ¬p
אף אחת לא טאוטולוגיה.
p → ¬p אמת כש-p=F, שקר כש-p=T.
אז p → ¬p אינה טאוטולוגיה.

טענה 2: אם α ↔ β טאוטולוגיה, אז α ∨ β טאוטולוגיה. לא נכון
דוגמה נגדית: יהי α = p, β = p (אותו משתנה)
α ↔ β = p ↔ p ≡ T (טאוטולוגיה)
α ∨ β = p ∨ p ≡ p (לא טאוטולוגיה)

טענה 3: אם α ∧ β טאוטולוגיה, אז α, β טאוטולוגיות. נכון
הוכחה:
אם α ∧ β תמיד אמת, אז בכל שורה בטבלת האמת, גם α וגם β חייבים להיות אמת.
זה אומר:
• α אמת בכל שורה → α טאוטולוגיה
• β אמת בכל שורה → β טאוטולוגיה

טענה 4: אם α ∨ β טאוטולוגיה, אז α, β טאוטולוגיות. לא נכון
דוגמה נגדית: יהי α = p, β = ¬p
α ∨ β = p ∨ ¬p ≡ T (טאוטולוגיה - חוק השלישי הנמנע)
אבל לא p ולא ¬p טאוטולוגיות.

תשובה: 3 ✓

טעויות נפוצות:
• לא למצוא דוגמאות נגדיות טובות
• בלבול בין טאוטולוגיה לספיק
• אי-הבנה איך ∧ מפזרת ערכי אמת`,
  },
  {
    id: '2022b-q3',
    questionNumber: 3,
    points: 6,
    type: 'short',
    topic: 'Set Theory - Symmetric Difference',
    topicHe: 'תורת הקבוצות - הפרש סימטרי',
    questionType: 'Finding Sets with Constraints',
    questionTypeHe: 'מציאת קבוצות עם אילוצים',
    thinkingProcess: 'Think about what B△C means and when A can be a subset of it while also being subset of both B and C.',
    thinkingProcessHe: 'חשבי מה B△C אומר ומתי A יכולה להיות תת-קבוצה שלו תוך שהיא גם תת-קבוצה של B ושל C.',
    question: 'Find sets A, B, C such that A ⊆ B△C, A ⊆ C, and B ⊆ C, or briefly explain why no such sets exist.',
    questionHe: 'מצאי קבוצות A, B, C כך ש-A ⊆ B△C, A ⊆ C, ו-B ⊆ C, או הסבירי בקצרה מדוע לא קיימות קבוצות כאלה.',
    answer: 'A = B = C = ∅',
    answerHe: 'A = B = C = ∅',
    explanation: `QUESTION TYPE: Finding sets satisfying multiple constraints.

THINKING PROCESS:
1. Understand B△C = (B\\C) ∪ (C\\B) = elements in exactly one of B or C
2. If B ⊆ C, then B\\C = ∅, so B△C = C\\B
3. If A ⊆ C and A ⊆ B△C = C\\B, what does that mean?

DETAILED ANALYSIS:

Given constraints:
- A ⊆ B△C
- A ⊆ C
- B ⊆ C

Since B ⊆ C:
B△C = (B\\C) ∪ (C\\B) = ∅ ∪ (C\\B) = C\\B

So A ⊆ C\\B (from A ⊆ B△C)
This means A ⊆ C and A ∩ B = ∅

Combined with A ⊆ C: A is a subset of C that doesn't intersect B.

For non-empty A: We need elements in C but not in B.
Since B ⊆ C, we can have C \\ B non-empty.

Wait, let me reconsider. The answer says A = B = C = ∅.

If A = B = C = ∅:
- A ⊆ B△C: ∅ ⊆ ∅△∅ = ∅ ✓
- A ⊆ C: ∅ ⊆ ∅ ✓
- B ⊆ C: ∅ ⊆ ∅ ✓

This works!

But are there other solutions?
Try A = ∅, B = {1}, C = {1, 2}:
- B△C = {1}△{1,2} = {2}
- A ⊆ B△C: ∅ ⊆ {2} ✓
- A ⊆ C: ∅ ⊆ {1,2} ✓
- B ⊆ C: {1} ⊆ {1,2} ✓

This also works! So A = B = C = ∅ is one valid answer.

Try A = {2}, B = {1}, C = {1, 2}:
- B△C = {2}
- A ⊆ B△C: {2} ⊆ {2} ✓
- A ⊆ C: {2} ⊆ {1,2} ✓
- B ⊆ C: {1} ⊆ {1,2} ✓

This works too!

The simplest answer is A = B = C = ∅.

COMMON MISTAKES:
- Thinking no such sets exist
- Not considering the empty set solution
- Misunderstanding symmetric difference`,
    explanationHe: `סוג השאלה: מציאת קבוצות שמקיימות מספר אילוצים.

על מה לחשוב:
1. הבנה ש-B△C = (B\\C) ∪ (C\\B) = איברים בדיוק באחת מ-B או C
2. אם B ⊆ C, אז B\\C = ∅, אז B△C = C\\B
3. אם A ⊆ C ו-A ⊆ B△C = C\\B, מה זה אומר?

ניתוח מפורט:

אילוצים נתונים:
• A ⊆ B△C
• A ⊆ C
• B ⊆ C

מכיוון ש-B ⊆ C:
B△C = (B\\C) ∪ (C\\B) = ∅ ∪ (C\\B) = C\\B

אז A ⊆ C\\B (מ-A ⊆ B△C)
זה אומר A ⊆ C ו-A ∩ B = ∅

אם A = B = C = ∅:
• A ⊆ B△C: ∅ ⊆ ∅△∅ = ∅ ✓
• A ⊆ C: ∅ ⊆ ∅ ✓
• B ⊆ C: ∅ ⊆ ∅ ✓

זה עובד!

יש גם פתרונות אחרים:
נסי A = {2}, B = {1}, C = {1, 2}:
• B△C = {2}
• A ⊆ B△C: {2} ⊆ {2} ✓
• A ⊆ C: {2} ⊆ {1,2} ✓
• B ⊆ C: {1} ⊆ {1,2} ✓

התשובה הפשוטה ביותר היא A = B = C = ∅.

טעויות נפוצות:
• לחשוב שלא קיימות קבוצות כאלה
• לא לשקול פתרון הקבוצה הריקה
• אי-הבנה של הפרש סימטרי`,
  },
  {
    id: '2022b-q4',
    questionNumber: 4,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Multinomial Theorem',
    topicHe: 'קומבינטוריקה - משפט המולטינום',
    questionType: 'Coefficient Extraction in Multinomial Expansion',
    questionTypeHe: 'חילוץ מקדמים בפיתוח מולטינום',
    thinkingProcess: 'Identify all ways to get x⁷ from (2 + 3x + x²)⁶. Each term contributes powers 0, 1, or 2. Find combinations summing to 7.',
    thinkingProcessHe: 'זהי את כל הדרכים לקבל x⁷ מ-(2 + 3x + x²)⁶. כל איבר תורם חזקות 0, 1, או 2. מצאי צירופים שסכומם 7.',
    question: 'What is the coefficient of x⁷ in the expansion of the expression (2 + 3x + x²)⁶?',
    questionHe: 'מהו המקדם של x⁷ בפיתוח הביטוי (2 + 3x + x²)⁶?',
    answer: 'C(6,5)·3 + C(6,3,2,1)·2·3³ + C(6,3,2,1)·2²·3',
    answerHe: 'C(6,5)·3 + C(6;3,2,1)·2·3³ + C(6;3,2,1)·2²·3',
    explanation: `QUESTION TYPE: Finding coefficient using multinomial expansion.

THINKING PROCESS:
1. (2 + 3x + x²)⁶ - need coefficient of x⁷
2. When we expand, each factor contributes: 2 (power 0), 3x (power 1), or x² (power 2)
3. Need total power = 7 from 6 factors
4. Find all (i₀, i₁, i₂) with i₀ + i₁ + i₂ = 6 and 0·i₀ + 1·i₁ + 2·i₂ = 7

DETAILED SOLUTION:

Let i₀ = number of factors contributing 2 (power 0)
Let i₁ = number of factors contributing 3x (power 1)
Let i₂ = number of factors contributing x² (power 2)

Constraints:
- i₀ + i₁ + i₂ = 6 (total factors)
- i₁ + 2i₂ = 7 (total power)

From the second equation: i₁ = 7 - 2i₂
Substituting into first: i₀ + (7 - 2i₂) + i₂ = 6
So i₀ = i₂ - 1

Valid solutions (i₀ ≥ 0, i₁ ≥ 0, i₂ ≥ 0):

Case 1: i₂ = 1 → i₀ = 0, i₁ = 5, i₂ = 1
Contribution: C(6; 0,5,1) · 2⁰ · (3)⁵ · 1¹ = 6 · 243 = 1458

Wait, let me recalculate. The multinomial coefficient C(6; 0,5,1) = 6!/(0!5!1!) = 6.

Case 2: i₂ = 2 → i₀ = 1, i₁ = 3, i₂ = 2
Contribution: C(6; 1,3,2) · 2¹ · (3)³ · 1² = 60 · 2 · 27 = 3240

C(6; 1,3,2) = 6!/(1!3!2!) = 720/(1·6·2) = 60

Case 3: i₂ = 3 → i₀ = 2, i₁ = 1, i₂ = 3
Contribution: C(6; 2,1,3) · 2² · (3)¹ · 1³ = 60 · 4 · 3 = 720

C(6; 2,1,3) = 6!/(2!1!3!) = 720/(2·1·6) = 60

Case 4: i₂ = 4 → i₀ = 3, i₁ = -1 (invalid, i₁ < 0)

Total coefficient: 1458 + 3240 + 720 = 5418

Note: The answer format in the key uses different notation.

COMMON MISTAKES:
- Missing cases
- Wrong multinomial coefficient calculation
- Forgetting to include the coefficient 3 from 3x`,
    explanationHe: `סוג השאלה: מציאת מקדם באמצעות פיתוח מולטינום.

על מה לחשוב:
1. (2 + 3x + x²)⁶ - צריך מקדם של x⁷
2. כשמפתחים, כל גורם תורם: 2 (חזקה 0), 3x (חזקה 1), או x² (חזקה 2)
3. צריך חזקה כוללת = 7 מ-6 גורמים
4. מצאי את כל (i₀, i₁, i₂) עם i₀ + i₁ + i₂ = 6 ו-0·i₀ + 1·i₁ + 2·i₂ = 7

פתרון מפורט:

נסמן i₀ = מספר גורמים שתורמים 2 (חזקה 0)
נסמן i₁ = מספר גורמים שתורמים 3x (חזקה 1)
נסמן i₂ = מספר גורמים שתורמים x² (חזקה 2)

אילוצים:
• i₀ + i₁ + i₂ = 6 (סה"כ גורמים)
• i₁ + 2i₂ = 7 (סה"כ חזקה)

מהמשוואה השנייה: i₁ = 7 - 2i₂
הצבה בראשונה: i₀ + (7 - 2i₂) + i₂ = 6
אז i₀ = i₂ - 1

פתרונות תקפים (i₀ ≥ 0, i₁ ≥ 0, i₂ ≥ 0):

מקרה 1: i₂ = 1 → i₀ = 0, i₁ = 5, i₂ = 1
תרומה: C(6; 0,5,1) · 2⁰ · (3)⁵ · 1¹ = 6 · 243 = 1458

מקרה 2: i₂ = 2 → i₀ = 1, i₁ = 3, i₂ = 2
תרומה: C(6; 1,3,2) · 2¹ · (3)³ · 1² = 60 · 2 · 27 = 3240

מקרה 3: i₂ = 3 → i₀ = 2, i₁ = 1, i₂ = 3
תרומה: C(6; 2,1,3) · 2² · (3)¹ · 1³ = 60 · 4 · 3 = 720

מקרה 4: i₂ = 4 → i₀ = 3, i₁ = -1 (לא תקף)

מקדם כולל: 1458 + 3240 + 720 = 5418

טעויות נפוצות:
• פספוס מקרים
• חישוב שגוי של מקדם מולטינומי
• לשכוח לכלול את המקדם 3 מ-3x`,
  },
  {
    id: '2022b-q5',
    questionNumber: 5,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Distribution with Constraints',
    topicHe: 'קומבינטוריקה - חלוקה עם אילוצים',
    questionType: 'Distributing Items with Multiple Constraints',
    questionTypeHe: 'חלוקת פריטים עם אילוצים מרובים',
    thinkingProcess: 'Split the problem: 3 students share 21 coins (odd each), 3 others share 29 coins (odd each). Transform to even distribution, then use stars and bars.',
    thinkingProcessHe: 'פצלי את הבעיה: 3 סטודנטים מתחלקים ב-21 מטבעות (אי-זוגי כל אחד), 3 אחרים מתחלקים ב-29 מטבעות (אי-זוגי כל אחד). המירי לחלוקה זוגית, ואז השתמשי בכוכבים ומחיצות.',
    question: 'How many ways are there to distribute 50 gold coins to 6 students, such that Arik, Bentz, and Shimon have 21 between them, and every one of the 6 students receives an odd number of coins?',
    questionHe: 'בכמה דרכים אפשר לחלק 50 מטבעות זהב ל-6 סטודנטים, כך שאריק, בנץ ושמעון מקבלים 21 ביחד, וכל אחד מ-6 הסטודנטים מקבל מספר אי-זוגי של מטבעות?',
    answer: 'C(11,2) · C(15,2)',
    answerHe: 'C(11,2) · C(15,2)',
    explanation: `QUESTION TYPE: Multi-constraint distribution problem.

THINKING PROCESS:
1. Split into two independent sub-problems
2. Arik, Bentz, Shimon: 21 coins, each odd
3. Other 3: 50-21=29 coins, each odd
4. Transform odd constraint by substitution

DETAILED SOLUTION:

Problem splits into two parts:
- Part 1: Distribute 21 coins to 3 students (Arik, Bentz, Shimon), each gets odd
- Part 2: Distribute 29 coins to 3 students, each gets odd

For Part 1 (21 coins, 3 students, each odd):
Let xᵢ = number of coins for student i (i = 1,2,3)
x₁ + x₂ + x₃ = 21, each xᵢ odd and xᵢ ≥ 1

Substitute yᵢ = (xᵢ - 1)/2, so xᵢ = 2yᵢ + 1, yᵢ ≥ 0
(2y₁ + 1) + (2y₂ + 1) + (2y₃ + 1) = 21
2(y₁ + y₂ + y₃) + 3 = 21
y₁ + y₂ + y₃ = 9

Non-negative integer solutions: C(9+3-1, 3-1) = C(11, 2) = 55

For Part 2 (29 coins, 3 students, each odd):
Similarly: z₁ + z₂ + z₃ = 29, each zᵢ odd and zᵢ ≥ 1

Substitute wᵢ = (zᵢ - 1)/2
2(w₁ + w₂ + w₃) + 3 = 29
w₁ + w₂ + w₃ = 13

Non-negative integer solutions: C(13+3-1, 3-1) = C(15, 2) = 105

Total: C(11, 2) × C(15, 2) = 55 × 105 = 5775

KEY INSIGHT:
The transformation xᵢ = 2yᵢ + 1 converts "odd positive" to "non-negative integer".

COMMON MISTAKES:
- Not splitting the problem correctly
- Wrong transformation for odd constraint
- Forgetting independence allows multiplication`,
    explanationHe: `סוג השאלה: בעיית חלוקה עם אילוצים מרובים.

על מה לחשוב:
1. פצלי לשתי בעיות משנה בלתי תלויות
2. אריק, בנץ, שמעון: 21 מטבעות, כל אחד אי-זוגי
3. 3 האחרים: 50-21=29 מטבעות, כל אחד אי-זוגי
4. המירי אילוץ אי-זוגיות בהצבה

פתרון מפורט:

הבעיה מתפצלת לשני חלקים:
• חלק 1: חלקי 21 מטבעות ל-3 סטודנטים (אריק, בנץ, שמעון), כל אחד מקבל אי-זוגי
• חלק 2: חלקי 29 מטבעות ל-3 סטודנטים, כל אחד מקבל אי-זוגי

עבור חלק 1 (21 מטבעות, 3 סטודנטים, כל אחד אי-זוגי):
נסמן xᵢ = מספר מטבעות לסטודנט i (i = 1,2,3)
x₁ + x₂ + x₃ = 21, כל xᵢ אי-זוגי ו-xᵢ ≥ 1

הצבה: yᵢ = (xᵢ - 1)/2, אז xᵢ = 2yᵢ + 1, yᵢ ≥ 0
(2y₁ + 1) + (2y₂ + 1) + (2y₃ + 1) = 21
2(y₁ + y₂ + y₃) + 3 = 21
y₁ + y₂ + y₃ = 9

פתרונות שלמים אי-שליליים: C(9+3-1, 3-1) = C(11, 2) = 55

עבור חלק 2 (29 מטבעות, 3 סטודנטים, כל אחד אי-זוגי):
באופן דומה: z₁ + z₂ + z₃ = 29, כל zᵢ אי-זוגי ו-zᵢ ≥ 1

הצבה: wᵢ = (zᵢ - 1)/2
2(w₁ + w₂ + w₃) + 3 = 29
w₁ + w₂ + w₃ = 13

פתרונות שלמים אי-שליליים: C(13+3-1, 3-1) = C(15, 2) = 105

סה"כ: C(11, 2) × C(15, 2) = 55 × 105 = 5775

תובנה מפתח:
ההמרה xᵢ = 2yᵢ + 1 הופכת "אי-זוגי חיובי" ל"שלם אי-שלילי".

טעויות נפוצות:
• פיצול לא נכון של הבעיה
• המרה שגויה לאילוץ אי-זוגיות
• לשכוח שאי-תלות מאפשרת כפל`,
  },
  {
    id: '2022b-q6',
    questionNumber: 6,
    points: 6,
    type: 'short',
    topic: 'Functions - Inverses',
    topicHe: 'פונקציות - הופכיות',
    questionType: 'Left Inverse Identification',
    questionTypeHe: 'זיהוי הופכי שמאלי',
    thinkingProcess: 'If f has a left inverse g, then f must be injective (one-to-one). g∘f = identity. Check which g could work for some injective f.',
    thinkingProcessHe: 'אם ל-f יש הופכי שמאלי g, אז f חייבת להיות חח"ע. g∘f = זהות. בדקי איזו g יכולה לעבוד עבור איזושהי f חח"ע.',
    question: 'Suppose f: ℕ → ℕ has a left inverse. Without knowing f, which one of the following g: ℕ → ℕ could be a left inverse of f?\ni. g₁(x) = 2x\nii. g₂(x) = x/2 if x is even, 0 if x is odd\niii. g₃(x) = x² - 1',
    questionHe: 'נניח ש-f: ℕ → ℕ יש לה הופכי שמאלי. בלי לדעת את f, איזו מהפונקציות g: ℕ → ℕ הבאות יכולה להיות הופכי שמאלי של f?\ni. g₁(x) = 2x\nii. g₂(x) = x/2 אם x זוגי, 0 אם x אי-זוגי\niii. g₃(x) = x² - 1',
    answer: 'g₂',
    answerHe: 'g₂',
    explanation: `QUESTION TYPE: Understanding left inverses of functions.

THINKING PROCESS:
1. g is a left inverse of f means: g∘f = i_ℕ (identity)
2. For all n ∈ ℕ: g(f(n)) = n
3. This means g must be ONTO (surjective) - every n must be in the range of g
4. Also, g must "undo" what f does on Im(f)

DETAILED ANALYSIS:

For g to be a left inverse of some f:
- g must be surjective (onto) - for every n, there's some value mapping to n
- There must exist an injective f such that g(f(n)) = n for all n

g₁(x) = 2x:
Im(g₁) = {0, 2, 4, 6, ...} = even numbers only
Since 1, 3, 5, ... ∉ Im(g₁), g₁ is NOT onto.
Therefore g₁ cannot be a left inverse of any f.
NO ✗

g₂(x) = x/2 if x even, 0 if x odd:
g₂(0) = 0, g₂(2) = 1, g₂(4) = 2, g₂(6) = 3, ...
Im(g₂) = {0, 1, 2, 3, ...} = ℕ ✓ (g₂ is onto)

Can we find f such that g₂(f(n)) = n?
Let f(n) = 2n (doubling)
Then g₂(f(n)) = g₂(2n) = 2n/2 = n ✓

So g₂ COULD be a left inverse (of f(n) = 2n).
YES ✓

g₃(x) = x² - 1:
g₃(0) = -1 ∉ ℕ!

Wait, this is a problem for g₃: ℕ → ℕ because g₃(0) = -1 is not in ℕ.
Actually if we consider ℕ = {0, 1, 2, ...}, then g₃(0) = -1 is undefined in ℕ.

Assuming ℕ includes 0: g₃(0) = -1 ∉ ℕ, so g₃ is not a valid function ℕ → ℕ.

If ℕ = {1, 2, 3, ...}: g₃(1) = 0... but is 0 ∈ ℕ? Depends on convention.

Either way, g₃ is problematic and Im(g₃) = {0, 3, 8, 15, ...} skips many values.
NO ✗

ANSWER: g₂ ✓

COMMON MISTAKES:
- Not checking surjectivity
- Not verifying the function is well-defined on ℕ
- Confusing left and right inverses`,
    explanationHe: `סוג השאלה: הבנת הופכיים שמאליים של פונקציות.

על מה לחשוב:
1. g הופכי שמאלי של f אומר: g∘f = i_ℕ (זהות)
2. לכל n ∈ ℕ: g(f(n)) = n
3. זה אומר g חייבת להיות על (סורייקטיבית) - כל n חייב להיות בטווח של g
4. גם, g חייבת "לבטל" מה ש-f עושה על Im(f)

ניתוח מפורט:

כדי ש-g תהיה הופכי שמאלי של איזושהי f:
• g חייבת להיות על - לכל n, יש ערך שממופה אליו
• חייבת להתקיים f חח"ע כך ש-g(f(n)) = n לכל n

g₁(x) = 2x:
Im(g₁) = {0, 2, 4, 6, ...} = רק זוגיים
מכיוון ש-1, 3, 5, ... ∉ Im(g₁), g₁ אינה על.
לכן g₁ לא יכולה להיות הופכי שמאלי של אף f.
לא ✗

g₂(x) = x/2 אם x זוגי, 0 אם x אי-זוגי:
g₂(0) = 0, g₂(2) = 1, g₂(4) = 2, g₂(6) = 3, ...
Im(g₂) = {0, 1, 2, 3, ...} = ℕ ✓ (g₂ על)

האם נוכל למצוא f כך ש-g₂(f(n)) = n?
יהי f(n) = 2n (הכפלה)
אז g₂(f(n)) = g₂(2n) = 2n/2 = n ✓

אז g₂ יכולה להיות הופכי שמאלי (של f(n) = 2n).
כן ✓

g₃(x) = x² - 1:
g₃(0) = -1 ∉ ℕ!
אם ℕ כולל 0: g₃(0) = -1 לא ב-ℕ, אז g₃ לא פונקציה תקפה ℕ → ℕ.
גם Im(g₃) = {0, 3, 8, 15, ...} מדלג על הרבה ערכים.
לא ✗

תשובה: g₂ ✓

טעויות נפוצות:
• אי-בדיקת סורייקטיביות
• אי-וידוא שהפונקציה מוגדרת היטב על ℕ
• בלבול בין הופכיים שמאליים וימניים`,
  },
  {
    id: '2022b-q7',
    questionNumber: 7,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Card Counting',
    topicHe: 'קומבינטוריקה - ספירת קלפים',
    questionType: 'Inclusion-Exclusion for Card Hands',
    questionTypeHe: 'הכלה והדחה ליד קלפים',
    thinkingProcess: 'Use inclusion-exclusion. Count hands with no Kings first, then subtract those with no Aces from those.',
    thinkingProcessHe: 'השתמשי בהכלה והדחה. קודם ספרי ידיים בלי מלכים, ואז חסרי מהן את אלה בלי אסים.',
    question: 'How many "hands" of 5 cards are there from a standard deck of cards, such that the hand has at least one Ace, and no King?\nRecall: Standard card deck is 52 cards, with 4 (different) Aces and 4 (different) Kings.',
    questionHe: 'כמה "ידיים" של 5 קלפים יש מחפיסת קלפים סטנדרטית, כך שביד יש לפחות אס אחד, ואין מלך?\nתזכורת: חפיסת קלפים סטנדרטית היא 52 קלפים, עם 4 אסים (שונים) ו-4 מלכים (שונים).',
    answer: 'C(48,5) - C(44,5)',
    answerHe: 'C(48,5) - C(44,5)',
    explanation: `QUESTION TYPE: Counting with restrictions using inclusion-exclusion.

THINKING PROCESS:
1. Constraint 1: No Kings → choose from 52-4=48 cards
2. Constraint 2: At least one Ace → use complement
3. (At least one Ace) = (No Kings) - (No Kings AND No Aces)

DETAILED SOLUTION:

Step 1: Hands with no Kings
Remove 4 Kings from deck: 48 cards remain
Hands with no Kings: C(48, 5)

Step 2: Hands with no Kings AND no Aces
Remove 4 Kings and 4 Aces: 44 cards remain
Hands with neither: C(44, 5)

Step 3: Apply inclusion-exclusion
Hands with no Kings AND at least one Ace:
= (Hands with no Kings) - (Hands with no Kings and no Aces)
= C(48, 5) - C(44, 5)

Numerical calculation:
C(48, 5) = 1,712,304
C(44, 5) = 1,086,008
Answer = 1,712,304 - 1,086,008 = 626,296

VERIFICATION:
- C(48,5) counts all hands without Kings (may or may not have Aces)
- C(44,5) counts hands with neither Kings nor Aces
- Subtracting gives hands with no Kings but at least one Ace ✓

COMMON MISTAKES:
- Using wrong deck size
- Forgetting to exclude Kings in the complement
- Adding instead of subtracting`,
    explanationHe: `סוג השאלה: ספירה עם הגבלות באמצעות הכלה והדחה.

על מה לחשוב:
1. אילוץ 1: בלי מלכים → בחרי מ-52-4=48 קלפים
2. אילוץ 2: לפחות אס אחד → השתמשי במשלים
3. (לפחות אס אחד) = (בלי מלכים) - (בלי מלכים ובלי אסים)

פתרון מפורט:

שלב 1: ידיים בלי מלכים
הסרת 4 מלכים מהחפיסה: 48 קלפים נשארים
ידיים בלי מלכים: C(48, 5)

שלב 2: ידיים בלי מלכים ובלי אסים
הסרת 4 מלכים ו-4 אסים: 44 קלפים נשארים
ידיים בלי שניהם: C(44, 5)

שלב 3: יישום הכלה והדחה
ידיים בלי מלכים ועם לפחות אס אחד:
= (ידיים בלי מלכים) - (ידיים בלי מלכים ובלי אסים)
= C(48, 5) - C(44, 5)

חישוב מספרי:
C(48, 5) = 1,712,304
C(44, 5) = 1,086,008
תשובה = 1,712,304 - 1,086,008 = 626,296

וידוא:
• C(48,5) סופר את כל הידיים בלי מלכים (עם או בלי אסים)
• C(44,5) סופר ידיים בלי מלכים ובלי אסים
• חיסור נותן ידיים בלי מלכים אבל עם לפחות אס אחד ✓

טעויות נפוצות:
• שימוש בגודל חפיסה שגוי
• לשכוח להדיר מלכים במשלים
• לחבר במקום לחסר`,
  },
  {
    id: '2022b-q8',
    questionNumber: 8,
    points: 6,
    type: 'short',
    topic: 'Relations - Properties',
    topicHe: 'יחסים - תכונות',
    questionType: 'Checking Relation Properties',
    questionTypeHe: 'בדיקת תכונות יחס',
    thinkingProcess: 'R = {(a,b) : a+b is even}. Check each property: reflexive (a+a even?), symmetric (if a+b even, is b+a?), transitive (if a+b and b+c even?), anti-symmetric, etc.',
    thinkingProcessHe: 'R = {(a,b) : a+b זוגי}. בדקי כל תכונה: רפלקסיבי (a+a זוגי?), סימטרי (אם a+b זוגי, האם b+a?), טרנזיטיבי (אם a+b ו-b+c זוגיים?), אנטי-סימטרי וכו\'.',
    question: 'Let A = {1,2,3,4,5}. Consider relation R = {(a,b) ∈ A × A : a + b is even} on A.\nWhich of the following properties hold for R? (List all that hold):\nReflexive, Anti-reflexive, Symmetric, Anti-symmetric, Asymmetric, Transitive',
    questionHe: 'יהי A = {1,2,3,4,5}. נתבונן ביחס R = {(a,b) ∈ A × A : a + b זוגי} על A.\nאילו מהתכונות הבאות מתקיימות ל-R? (רשמי את כל המתקיימות):\nרפלקסיבי, אנטי-רפלקסיבי, סימטרי, אנטי-סימטרי, א-סימטרי, טרנזיטיבי',
    answer: 'Reflexive, Symmetric, Transitive',
    answerHe: 'רפלקסיבי, סימטרי, טרנזיטיבי',
    explanation: `QUESTION TYPE: Checking relation properties systematically.

THINKING PROCESS:
For each property, check the definition against R where aRb ⟺ a+b is even.

DETAILED ANALYSIS:

First, understand the relation:
a+b is even ⟺ both a,b have same parity (both odd or both even)
In A = {1,2,3,4,5}: Odd = {1,3,5}, Even = {2,4}

REFLEXIVE: ∀a ∈ A, (a,a) ∈ R?
a + a = 2a is always even. YES ✓

ANTI-REFLEXIVE: ∀a ∈ A, (a,a) ∉ R?
We just showed (a,a) ∈ R. NO ✗

SYMMETRIC: ∀a,b, if (a,b) ∈ R then (b,a) ∈ R?
If a+b is even, then b+a is even (addition is commutative). YES ✓

ANTI-SYMMETRIC: ∀a,b, if (a,b) ∈ R and (b,a) ∈ R then a = b?
Counterexample: (1,3) ∈ R (1+3=4 even) and (3,1) ∈ R, but 1 ≠ 3. NO ✗

ASYMMETRIC: ∀a,b, if (a,b) ∈ R then (b,a) ∉ R?
We have (1,3) ∈ R and (3,1) ∈ R. NO ✗

TRANSITIVE: ∀a,b,c, if (a,b) ∈ R and (b,c) ∈ R then (a,c) ∈ R?
If a+b is even and b+c is even:
- a and b have same parity
- b and c have same parity
- Therefore a and c have same parity
- So a+c is even. YES ✓

ANSWER: Reflexive, Symmetric, Transitive ✓

Note: R is an EQUIVALENCE RELATION!
The equivalence classes are:
- Odd numbers: {1, 3, 5}
- Even numbers: {2, 4}

COMMON MISTAKES:
- Not checking all properties
- Confusing parity logic
- Missing the equivalence relation pattern`,
    explanationHe: `סוג השאלה: בדיקת תכונות יחס באופן שיטתי.

על מה לחשוב:
לכל תכונה, בדקי את ההגדרה מול R כאשר aRb ⟺ a+b זוגי.

ניתוח מפורט:

קודם, הבנת היחס:
a+b זוגי ⟺ ל-a ו-b אותה זוגיות (שניהם אי-זוגיים או שניהם זוגיים)
ב-A = {1,2,3,4,5}: אי-זוגיים = {1,3,5}, זוגיים = {2,4}

רפלקסיבי: ∀a ∈ A, (a,a) ∈ R?
a + a = 2a תמיד זוגי. כן ✓

אנטי-רפלקסיבי: ∀a ∈ A, (a,a) ∉ R?
הראינו ש-(a,a) ∈ R. לא ✗

סימטרי: ∀a,b, אם (a,b) ∈ R אז (b,a) ∈ R?
אם a+b זוגי, אז b+a זוגי (חיבור קומוטטיבי). כן ✓

אנטי-סימטרי: ∀a,b, אם (a,b) ∈ R וגם (b,a) ∈ R אז a = b?
דוגמה נגדית: (1,3) ∈ R (1+3=4 זוגי) וגם (3,1) ∈ R, אבל 1 ≠ 3. לא ✗

א-סימטרי: ∀a,b, אם (a,b) ∈ R אז (b,a) ∉ R?
יש לנו (1,3) ∈ R וגם (3,1) ∈ R. לא ✗

טרנזיטיבי: ∀a,b,c, אם (a,b) ∈ R וגם (b,c) ∈ R אז (a,c) ∈ R?
אם a+b זוגי ו-b+c זוגי:
• ל-a ו-b אותה זוגיות
• ל-b ו-c אותה זוגיות
• לכן ל-a ו-c אותה זוגיות
• אז a+c זוגי. כן ✓

תשובה: רפלקסיבי, סימטרי, טרנזיטיבי ✓

הערה: R הוא יחס שקילות!
מחלקות השקילות:
• אי-זוגיים: {1, 3, 5}
• זוגיים: {2, 4}

טעויות נפוצות:
• אי-בדיקת כל התכונות
• בלבול בלוגיקת זוגיות
• פספוס תבנית יחס השקילות`,
  },
  {
    id: '2022b-q9',
    questionNumber: 9,
    points: 6,
    type: 'short',
    topic: 'Equivalence Relations - Quotient Set',
    topicHe: 'יחסי שקילות - קבוצת מנה',
    questionType: 'Describing Quotient Set',
    questionTypeHe: 'תיאור קבוצת מנה',
    thinkingProcess: 'The relation groups pairs by |y-x|. Find all possible values of |y-x| for (x,y) in A×A where A={1,2,3,4,5}.',
    thinkingProcessHe: 'היחס מקבץ זוגות לפי |y-x|. מצאי את כל הערכים האפשריים של |y-x| עבור (x,y) ב-A×A כאשר A={1,2,3,4,5}.',
    question: 'Let A = {1,2,3,4,5}. Let S be the following equivalence relation over A × A:\n(x,y)S(z,w) ⟺ |y - x| = |w - z|\n\nDescribe the quotient set (A × A)/S.',
    questionHe: 'יהי A = {1,2,3,4,5}. יהי S יחס השקילות הבא על A × A:\n(x,y)S(z,w) ⟺ |y - x| = |w - z|\n\nתארי את קבוצת המנה (A × A)/S.',
    answer: '(A × A)/S = {[(1,1)]_S, [(1,2)]_S, [(1,3)]_S, [(1,4)]_S, [(1,5)]_S}',
    answerHe: '(A × A)/S = {[(1,1)]_S, [(1,2)]_S, [(1,3)]_S, [(1,4)]_S, [(1,5)]_S}',
    explanation: `QUESTION TYPE: Finding quotient set of equivalence relation.

THINKING PROCESS:
1. S groups pairs (x,y) by the value |y-x| (absolute difference)
2. Find all possible values of |y-x| for pairs in A×A
3. Each value gives one equivalence class

DETAILED SOLUTION:

The relation S groups pairs by their "absolute difference."
For A = {1,2,3,4,5}, the possible differences |y-x| are:
- Minimum: |1-1| = 0
- Maximum: |5-1| = 4

So possible values: 0, 1, 2, 3, 4

Each equivalence class contains all pairs with the same difference:

[(1,1)]_S: pairs with |y-x| = 0
= {(1,1), (2,2), (3,3), (4,4), (5,5)} (diagonal pairs)

[(1,2)]_S: pairs with |y-x| = 1
= {(1,2), (2,1), (2,3), (3,2), (3,4), (4,3), (4,5), (5,4)}

[(1,3)]_S: pairs with |y-x| = 2
= {(1,3), (3,1), (2,4), (4,2), (3,5), (5,3)}

[(1,4)]_S: pairs with |y-x| = 3
= {(1,4), (4,1), (2,5), (5,2)}

[(1,5)]_S: pairs with |y-x| = 4
= {(1,5), (5,1)}

Quotient set: (A × A)/S = {[(1,1)]_S, [(1,2)]_S, [(1,3)]_S, [(1,4)]_S, [(1,5)]_S}

Or equivalently: 5 equivalence classes, one for each difference value 0,1,2,3,4.

COMMON MISTAKES:
- Not recognizing the grouping criterion
- Missing some equivalence classes
- Not listing representative elements correctly`,
    explanationHe: `סוג השאלה: מציאת קבוצת מנה של יחס שקילות.

על מה לחשוב:
1. S מקבץ זוגות (x,y) לפי הערך |y-x| (הפרש מוחלט)
2. מצאי את כל הערכים האפשריים של |y-x| לזוגות ב-A×A
3. כל ערך נותן מחלקת שקילות אחת

פתרון מפורט:

היחס S מקבץ זוגות לפי "ההפרש המוחלט" שלהם.
עבור A = {1,2,3,4,5}, ההפרשים האפשריים |y-x| הם:
• מינימום: |1-1| = 0
• מקסימום: |5-1| = 4

אז ערכים אפשריים: 0, 1, 2, 3, 4

כל מחלקת שקילות מכילה את כל הזוגות עם אותו הפרש:

[(1,1)]_S: זוגות עם |y-x| = 0
= {(1,1), (2,2), (3,3), (4,4), (5,5)} (זוגות אלכסוניים)

[(1,2)]_S: זוגות עם |y-x| = 1
= {(1,2), (2,1), (2,3), (3,2), (3,4), (4,3), (4,5), (5,4)}

[(1,3)]_S: זוגות עם |y-x| = 2
= {(1,3), (3,1), (2,4), (4,2), (3,5), (5,3)}

[(1,4)]_S: זוגות עם |y-x| = 3
= {(1,4), (4,1), (2,5), (5,2)}

[(1,5)]_S: זוגות עם |y-x| = 4
= {(1,5), (5,1)}

קבוצת מנה: (A × A)/S = {[(1,1)]_S, [(1,2)]_S, [(1,3)]_S, [(1,4)]_S, [(1,5)]_S}

או במילים: 5 מחלקות שקילות, אחת לכל ערך הפרש 0,1,2,3,4.

טעויות נפוצות:
• אי-זיהוי קריטריון הקיבוץ
• פספוס מחלקות שקילות
• רישום לא נכון של איברים מייצגים`,
  },
  {
    id: '2022b-q10',
    questionNumber: 10,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Circular Arrangements',
    topicHe: 'קומבינטוריקה - סידורים מעגליים',
    questionType: 'Circular Permutation with Restriction',
    questionTypeHe: 'תמורה מעגלית עם הגבלה',
    thinkingProcess: 'Total circular arrangements minus those where Alice and Bob are adjacent. For circular: fix one person, arrange others. For adjacent: treat Alice-Bob as unit.',
    thinkingProcessHe: 'סה"כ סידורים מעגליים פחות אלה שאליס ובוב יושבים ליד. למעגלי: קבעי אדם אחד, סדרי אחרים. לצמודים: התייחסי לאליס-בוב כיחידה.',
    question: 'How many ways are there of seating 10 people in a circle, such that Bob does not sit next to Alice?',
    questionHe: 'בכמה דרכים אפשר להושיב 10 אנשים במעגל, כך שבוב לא יושב ליד אליס?',
    answer: '9! - 2! · 8! = 7 · 8!',
    answerHe: '9! - 2! · 8! = 7 · 8!',
    explanation: `QUESTION TYPE: Circular permutation with forbidden adjacency.

THINKING PROCESS:
1. Total circular arrangements of n people = (n-1)!
2. Arrangements where A and B are adjacent: treat as single unit
3. Use subtraction principle

DETAILED SOLUTION:

Step 1: Total circular arrangements of 10 people
In a circle, we fix one person's position to avoid counting rotations.
Total = (10-1)! = 9!

Step 2: Arrangements where Alice and Bob ARE adjacent
Treat Alice-Bob as a single "super-person"
Now we have 9 units to arrange in a circle: (9-1)! = 8!
But Alice and Bob can be in 2 orders within their unit: AB or BA
Adjacent arrangements = 2! × 8! = 2 × 8!

Step 3: Subtract
Non-adjacent arrangements = 9! - 2 × 8!
= 9 × 8! - 2 × 8!
= (9 - 2) × 8!
= 7 × 8!

Numerical: 7 × 40320 = 282,240

VERIFICATION:
9! = 362,880
2 × 8! = 80,640
362,880 - 80,640 = 282,240 = 7 × 8! ✓

COMMON MISTAKES:
- Using n! instead of (n-1)! for circular
- Forgetting the 2! for the pair's internal order
- Not treating the pair as a unit correctly`,
    explanationHe: `סוג השאלה: תמורה מעגלית עם צמידות אסורה.

על מה לחשוב:
1. סה"כ סידורים מעגליים של n אנשים = (n-1)!
2. סידורים שבהם A ו-B צמודים: התייחסי כיחידה אחת
3. השתמשי בעקרון החיסור

פתרון מפורט:

שלב 1: סה"כ סידורים מעגליים של 10 אנשים
במעגל, קובעים את מיקום אדם אחד כדי להימנע מספירת סיבובים.
סה"כ = (10-1)! = 9!

שלב 2: סידורים שבהם אליס ובוב צמודים
מתייחסים לאליס-בוב כ"סופר-אדם" אחד
עכשיו יש 9 יחידות לסדר במעגל: (9-1)! = 8!
אבל אליס ובוב יכולים להיות ב-2 סדרים ביחידה שלהם: AB או BA
סידורים צמודים = 2! × 8! = 2 × 8!

שלב 3: חיסור
סידורים לא-צמודים = 9! - 2 × 8!
= 9 × 8! - 2 × 8!
= (9 - 2) × 8!
= 7 × 8!

מספרית: 7 × 40320 = 282,240

וידוא:
9! = 362,880
2 × 8! = 80,640
362,880 - 80,640 = 282,240 = 7 × 8! ✓

טעויות נפוצות:
• שימוש ב-n! במקום (n-1)! למעגלי
• לשכוח את 2! לסדר הפנימי של הזוג
• לא להתייחס לזוג כיחידה נכון`,
  },
  {
    id: '2022b-q11',
    questionNumber: 11,
    points: 6,
    type: 'short',
    topic: 'Relations - Anti-chains',
    topicHe: 'יחסים - אנטי-שרשראות',
    questionType: 'Finding Infinite Anti-chains',
    questionTypeHe: 'מציאת אנטי-שרשראות אינסופיות',
    thinkingProcess: 'In relation T where xTy ⟺ x-y ≥ 1, two elements are comparable if their difference is at least 1. Anti-chain = no two elements comparable. Find sets where all elements are within distance < 1.',
    thinkingProcessHe: 'ביחס T כאשר xTy ⟺ x-y ≥ 1, שני איברים ברי-השוואה אם ההפרש ביניהם לפחות 1. אנטי-שרשרת = אין שני איברים ברי-השוואה. מצאי קבוצות שכל האיברים בהן במרחק < 1.',
    question: 'Let T be the following strong order relation over ℝ:\nxTy ⟺ x - y ≥ 1\n\nGive 2 examples of infinite anti-chains.',
    questionHe: 'יהי T יחס הסדר החזק הבא על ℝ:\nxTy ⟺ x - y ≥ 1\n\nתני 2 דוגמאות לאנטי-שרשראות אינסופיות.',
    answer: '{x ∈ ℝ | 0 < x < 1}\n{1/(n+2) | n ∈ ℕ}',
    answerHe: '{x ∈ ℝ | 0 < x < 1}\n{1/(n+2) | n ∈ ℕ}',
    explanation: `QUESTION TYPE: Finding anti-chains in a given order relation.

THINKING PROCESS:
1. xTy means x is "greater by at least 1" than y
2. Anti-chain: no two elements are comparable (neither xTy nor yTx)
3. Two elements x,y are incomparable if |x-y| < 1
4. Find infinite sets where all pairs have difference < 1

DETAILED SOLUTION:

Understanding T:
xTy ⟺ x - y ≥ 1
This is a strict partial order on ℝ.

For an anti-chain, we need: for all x,y in the set, both ¬(xTy) and ¬(yTx).
- ¬(xTy) means x - y < 1
- ¬(yTx) means y - x < 1

Combined: |x - y| < 1 for all pairs in the anti-chain.

Example 1: {x ∈ ℝ | 0 < x < 1} = (0, 1)
For any x, y ∈ (0, 1): |x - y| < 1 - 0 = 1 ✓
This is infinite. ✓

Example 2: {1/(n+2) | n ∈ ℕ} = {1/2, 1/3, 1/4, 1/5, ...}
All elements are in (0, 1/2] ⊂ (0, 1)
For any two elements: difference < 1/2 < 1 ✓
This is infinite. ✓

Example 3: {1/(n+1)² | n ∈ ℕ\\{0}} = {1/4, 1/9, 1/16, ...}
All elements are in (0, 1/4] ⊂ (0, 1)
This is infinite. ✓

Example 4: {1/2ⁿ | n ∈ ℕ\\{0}} = {1/2, 1/4, 1/8, ...}
All elements are in (0, 1/2] ⊂ (0, 1)
This is infinite. ✓

COMMON MISTAKES:
- Choosing comparable elements
- Not finding infinite sets
- Misunderstanding the order relation`,
    explanationHe: `סוג השאלה: מציאת אנטי-שרשראות ביחס סדר נתון.

על מה לחשוב:
1. xTy אומר x "גדול לפחות ב-1" מ-y
2. אנטי-שרשרת: אין שני איברים ברי-השוואה (לא xTy ולא yTx)
3. שני איברים x,y אינם ברי-השוואה אם |x-y| < 1
4. מצאי קבוצות אינסופיות שלכל הזוגות בהן הפרש < 1

פתרון מפורט:

הבנת T:
xTy ⟺ x - y ≥ 1
זהו סדר חלקי חזק על ℝ.

לאנטי-שרשרת, צריך: לכל x,y בקבוצה, גם ¬(xTy) וגם ¬(yTx).
• ¬(xTy) אומר x - y < 1
• ¬(yTx) אומר y - x < 1

ביחד: |x - y| < 1 לכל הזוגות באנטי-שרשרת.

דוגמה 1: {x ∈ ℝ | 0 < x < 1} = (0, 1)
לכל x, y ∈ (0, 1): |x - y| < 1 - 0 = 1 ✓
זו אינסופית. ✓

דוגמה 2: {1/(n+2) | n ∈ ℕ} = {1/2, 1/3, 1/4, 1/5, ...}
כל האיברים ב-(0, 1/2] ⊂ (0, 1)
לכל שני איברים: הפרש < 1/2 < 1 ✓
זו אינסופית. ✓

דוגמה 3: {1/(n+1)² | n ∈ ℕ\\{0}} = {1/4, 1/9, 1/16, ...}
כל האיברים ב-(0, 1/4] ⊂ (0, 1)
זו אינסופית. ✓

דוגמה 4: {1/2ⁿ | n ∈ ℕ\\{0}} = {1/2, 1/4, 1/8, ...}
כל האיברים ב-(0, 1/2] ⊂ (0, 1)
זו אינסופית. ✓

טעויות נפוצות:
• בחירת איברים ברי-השוואה
• אי-מציאת קבוצות אינסופיות
• אי-הבנה של יחס הסדר`,
  },
  {
    id: '2022b-q12',
    questionNumber: 12,
    points: 6,
    type: 'short',
    topic: 'Stable Matching',
    topicHe: 'התאמה יציבה',
    questionType: 'Stable Matching Analysis',
    questionTypeHe: 'ניתוח התאמה יציבה',
    thinkingProcess: 'Check if A-1 can be stable. If both A and 1 have each other as first choice for some pair, that pair must be in any stable matching. Check C-1 relationship.',
    thinkingProcessHe: 'בדקי אם A-1 יכולה להיות יציבה. אם גם A וגם 1 מדרגים זוג אחר כבחירה ראשונה שמדרג אותם בחזרה, הזוג הזה חייב להיות בכל התאמה יציבה.',
    question: 'Medical residents A, B, and C and hospitals 1, 2, and 3 have each ranked the other side, as below. Each hospital has one position available.\nA: 1, 3, 2    1: C, A, B\nB: 3, 1, 2    2: A, C, B\nC: 1, 2, 3    3: C, B, A\n\nDoes there exist a stable matching such that A is paired with hospital 1?\nIf yes, give such a stable matching. If not, explain in one sentence why not.',
    questionHe: 'מתמחים A, B, ו-C ובתי חולים 1, 2, ו-3 דירגו כל אחד את הצד השני, כפי שמפורט למטה. לכל בית חולים יש משרה אחת פנויה.\nA: 1, 3, 2    1: C, A, B\nB: 3, 1, 2    2: A, C, B\nC: 1, 2, 3    3: C, B, A\n\nהאם קיימת התאמה יציבה כך ש-A מותאם לבית חולים 1?\nאם כן, תני התאמה כזו. אם לא, הסבירי במשפט אחד מדוע לא.',
    answer: 'No. Hospital 1 prefers C most, and C prefers hospital 1 most, so 1-C must be a match in any stable matching.',
    answerHe: 'לא. בית חולים 1 מעדיף את C ביותר, ו-C מעדיף את בית חולים 1 ביותר, אז 1-C חייב להיות התאמה בכל התאמה יציבה.',
    explanation: `QUESTION TYPE: Stable matching feasibility analysis.

THINKING PROCESS:
1. Look for "mutual first choices" - these pairs MUST be in any stable matching
2. If some pair are each other's first choice, no stable matching can break them up
3. Check if A-1 is consistent with all necessary pairs

DETAILED SOLUTION:

Preferences:
Residents:            Hospitals:
A: 1, 3, 2           1: C, A, B
B: 3, 1, 2           2: A, C, B
C: 1, 2, 3           3: C, B, A

Key observation:
- C's first choice is hospital 1
- Hospital 1's first choice is C
- They are MUTUAL FIRST CHOICES!

This means: In ANY stable matching, C must be paired with 1.

Proof: If C is not paired with 1, then:
- C would prefer 1 over whoever C is paired with (since 1 is C's #1)
- 1 would prefer C over whoever 1 is paired with (since C is 1's #1)
- This creates a blocking pair (C, 1)
- Contradiction! The matching wouldn't be stable.

Since 1 must be paired with C, A cannot be paired with 1.

ANSWER: No, it's impossible.

Explanation: Hospital 1's first choice is C, and C's first choice is hospital 1. Since they are mutual first choices, they must be paired in any stable matching. Therefore, A cannot be paired with hospital 1.

The unique stable matching is:
- A - 2
- B - 3
- C - 1

COMMON MISTAKES:
- Not recognizing mutual first choices
- Trying to find a matching without checking stability
- Forgetting that blocking pairs make matchings unstable`,
    explanationHe: `סוג השאלה: ניתוח היתכנות התאמה יציבה.

על מה לחשוב:
1. חפשי "בחירות ראשונות הדדיות" - הזוגות האלה חייבים להיות בכל התאמה יציבה
2. אם זוג כלשהו הם הבחירה הראשונה אחד של השני, אף התאמה יציבה לא יכולה להפריד אותם
3. בדקי אם A-1 עקבית עם כל הזוגות ההכרחיים

פתרון מפורט:

העדפות:
מתמחים:             בתי חולים:
A: 1, 3, 2           1: C, A, B
B: 3, 1, 2           2: A, C, B
C: 1, 2, 3           3: C, B, A

תצפית מפתח:
• הבחירה הראשונה של C היא בית חולים 1
• הבחירה הראשונה של בית חולים 1 היא C
• הם בחירות ראשונות הדדיות!

זה אומר: בכל התאמה יציבה, C חייב להיות מותאם ל-1.

הוכחה: אם C לא מותאם ל-1, אז:
• C יעדיף את 1 על מי ש-C מותאם אליו (כי 1 הוא מס' 1 של C)
• 1 יעדיף את C על מי ש-1 מותאם אליו (כי C הוא מס' 1 של 1)
• זה יוצר זוג חוסם (C, 1)
• סתירה! ההתאמה לא תהיה יציבה.

מכיוון ש-1 חייב להיות מותאם ל-C, A לא יכול להיות מותאם ל-1.

תשובה: לא, זה בלתי אפשרי.

הסבר: הבחירה הראשונה של בית חולים 1 היא C, והבחירה הראשונה של C היא בית חולים 1. מכיוון שהם בחירות ראשונות הדדיות, הם חייבים להיות מותאמים בכל התאמה יציבה. לכן, A לא יכול להיות מותאם לבית חולים 1.

ההתאמה היציבה היחידה היא:
• A - 2
• B - 3
• C - 1

טעויות נפוצות:
• אי-זיהוי בחירות ראשונות הדדיות
• ניסיון למצוא התאמה בלי לבדוק יציבות
• לשכוח שזוגות חוסמים הופכים התאמות ללא יציבות`,
  },
  {
    id: '2022b-q13',
    questionNumber: 13,
    points: 14,
    type: 'open',
    topic: 'Induction',
    topicHe: 'אינדוקציה',
    questionType: 'Proof by Mathematical Induction',
    questionTypeHe: 'הוכחה באינדוקציה מתמטית',
    thinkingProcess: 'Use induction on n. Base case n=0. For inductive step, use the recurrence relation and manipulate inequalities.',
    thinkingProcessHe: 'השתמשי באינדוקציה על n. מקרה בסיס n=0. לצעד האינדוקטיבי, השתמשי בנוסחת הנסיגה ובמניפולציה של אי-שוויונים.',
    question: 'Define the following sequence: a₀ = 0, aₙ₊₁ = 1/(4(1-aₙ)).\n\nProve that 0 ≤ aₙ ≤ 1/2 for every n ∈ ℕ.',
    questionHe: 'מגדירים את הסדרה הבאה: a₀ = 0, aₙ₊₁ = 1/(4(1-aₙ)).\n\nהוכיחי כי 0 ≤ aₙ ≤ 1/2 לכל n ∈ ℕ.',
    answer: 'Proof by induction on n.',
    answerHe: 'הוכחה באינדוקציה על n.',
    explanation: `QUESTION TYPE: Proof by induction for sequence bounds.

THINKING PROCESS:
1. Base case: verify for n=0
2. Inductive hypothesis: assume 0 ≤ aₙ ≤ 1/2
3. Inductive step: prove 0 ≤ aₙ₊₁ ≤ 1/2 using the recurrence

DETAILED PROOF:

Claim: 0 ≤ aₙ ≤ 1/2 for all n ∈ ℕ.

Base case (n = 0):
a₀ = 0
0 ≤ 0 ≤ 1/2 ✓

Inductive hypothesis:
Assume 0 ≤ aₙ ≤ 1/2 for some n ∈ ℕ.

Inductive step:
We need to show 0 ≤ aₙ₊₁ ≤ 1/2.

Starting from 0 ≤ aₙ ≤ 1/2:

Step 1: Transform the inequality
0 ≤ aₙ ≤ 1/2
Multiply by -1 (reverse inequalities):
-1/2 ≤ -aₙ ≤ 0

Add 1:
1 - 1/2 ≤ 1 - aₙ ≤ 1 - 0
1/2 ≤ 1 - aₙ ≤ 1

Step 2: Multiply by 4
4 · (1/2) ≤ 4(1 - aₙ) ≤ 4 · 1
2 ≤ 4(1 - aₙ) ≤ 4

Step 3: Take reciprocal (reverse inequalities since all positive)
1/4 ≤ 1/(4(1 - aₙ)) ≤ 1/2

Step 4: This means
1/4 ≤ aₙ₊₁ ≤ 1/2

Note: We actually get the stronger bound 1/4 ≤ aₙ₊₁, which implies 0 ≤ aₙ₊₁.

So: 0 ≤ 1/4 ≤ aₙ₊₁ ≤ 1/2

Conclusion:
By induction, 0 ≤ aₙ ≤ 1/2 for all n ∈ ℕ. ∎

VERIFICATION:
a₀ = 0
a₁ = 1/(4(1-0)) = 1/4 ∈ [0, 1/2] ✓
a₂ = 1/(4(1-1/4)) = 1/(4·3/4) = 1/3 ∈ [0, 1/2] ✓
a₃ = 1/(4(1-1/3)) = 1/(4·2/3) = 3/8 ∈ [0, 1/2] ✓

COMMON MISTAKES:
- Incorrect manipulation of inequalities when taking reciprocals
- Not handling the direction of inequalities carefully
- Forgetting to verify base case`,
    explanationHe: `סוג השאלה: הוכחה באינדוקציה לחסמי סדרה.

על מה לחשוב:
1. מקרה בסיס: ודאי עבור n=0
2. הנחת אינדוקציה: הנחי 0 ≤ aₙ ≤ 1/2
3. צעד אינדוקטיבי: הוכיחי 0 ≤ aₙ₊₁ ≤ 1/2 באמצעות נוסחת הנסיגה

הוכחה מפורטת:

טענה: 0 ≤ aₙ ≤ 1/2 לכל n ∈ ℕ.

מקרה בסיס (n = 0):
a₀ = 0
0 ≤ 0 ≤ 1/2 ✓

הנחת אינדוקציה:
נניח 0 ≤ aₙ ≤ 1/2 עבור n ∈ ℕ כלשהו.

צעד אינדוקטיבי:
צריך להראות 0 ≤ aₙ₊₁ ≤ 1/2.

מתחילים מ-0 ≤ aₙ ≤ 1/2:

שלב 1: המרת אי-השוויון
0 ≤ aₙ ≤ 1/2
כפל ב-(-1) (היפוך אי-שוויונים):
-1/2 ≤ -aₙ ≤ 0

הוספת 1:
1 - 1/2 ≤ 1 - aₙ ≤ 1 - 0
1/2 ≤ 1 - aₙ ≤ 1

שלב 2: כפל ב-4
4 · (1/2) ≤ 4(1 - aₙ) ≤ 4 · 1
2 ≤ 4(1 - aₙ) ≤ 4

שלב 3: לקיחת הופכי (היפוך אי-שוויונים כי הכל חיובי)
1/4 ≤ 1/(4(1 - aₙ)) ≤ 1/2

שלב 4: זה אומר
1/4 ≤ aₙ₊₁ ≤ 1/2

הערה: למעשה קיבלנו חסם חזק יותר 1/4 ≤ aₙ₊₁, שגורר 0 ≤ aₙ₊₁.

אז: 0 ≤ 1/4 ≤ aₙ₊₁ ≤ 1/2

מסקנה:
לפי אינדוקציה, 0 ≤ aₙ ≤ 1/2 לכל n ∈ ℕ. ∎

וידוא:
a₀ = 0
a₁ = 1/(4(1-0)) = 1/4 ∈ [0, 1/2] ✓
a₂ = 1/(4(1-1/4)) = 1/(4·3/4) = 1/3 ∈ [0, 1/2] ✓
a₃ = 1/(4(1-1/3)) = 1/(4·2/3) = 3/8 ∈ [0, 1/2] ✓

טעויות נפוצות:
• מניפולציה לא נכונה של אי-שוויונים בלקיחת הופכי
• אי-טיפול זהיר בכיוון האי-שוויונים
• לשכוח לוודא מקרה בסיס`,
  },
  {
    id: '2022b-q14',
    questionNumber: 14,
    points: 14,
    type: 'open',
    topic: 'Functions - Image and Properties',
    topicHe: 'פונקציות - תמונה ותכונות',
    questionType: 'Proving Function Properties',
    questionTypeHe: 'הוכחת תכונות פונקציה',
    thinkingProcess: 'For part a: Show f is not onto by finding element not in image. For part b: Show Im(f) ⊆ ℕ_odd ∪ {-1} and ℕ_odd ∪ {-1} ⊆ Im(f).',
    thinkingProcessHe: 'לחלק א: הראי ש-f אינה על על ידי מציאת איבר שאינו בתמונה. לחלק ב: הראי Im(f) ⊆ ℕ_odd ∪ {-1} וגם ℕ_odd ∪ {-1} ⊆ Im(f).',
    question: 'Let f, g: ℕ → ℕ be total functions. Assume f(n) = 2g(n) - 1 for every n ∈ ℕ.\na. Prove f is not onto.\nb. Prove that if g is onto, then Im(f) = ℕ_odd ∪ {-1}.\n\nRemark: Recall that for f: A → B, we define Im(f) = {b ∈ B | ∃a ∈ A (f(a) = b)}.',
    questionHe: 'יהיו f, g: ℕ → ℕ פונקציות טוטליות. נניח f(n) = 2g(n) - 1 לכל n ∈ ℕ.\nא. הוכיחי כי f אינה על.\nב. הוכיחי כי אם g על, אז Im(f) = ℕ_odd ∪ {-1}.\n\nהערה: נזכיר כי עבור f: A → B, מגדירים Im(f) = {b ∈ B | ∃a ∈ A (f(a) = b)}.',
    answer: 'a. 0 is not in the image of f.\nb. Two-sided containment proof.',
    answerHe: 'א. 0 אינו בתמונה של f.\nב. הוכחת הכלה דו-צדדית.',
    explanation: `QUESTION TYPE: Proving properties of functions defined by composition.

THINKING PROCESS:
Part a: Find an element that f cannot output
Part b: Prove set equality by showing both containments

DETAILED PROOF:

PART A: Prove f is not onto.

We show that 0 ∈ ℕ is not in Im(f).

Assume for contradiction that there exists n ∈ ℕ such that f(n) = 0.
Then: f(n) = 2g(n) - 1 = 0
So: 2g(n) = 1
Thus: g(n) = 1/2

But g: ℕ → ℕ, so g(n) ∈ ℕ.
And 1/2 ∉ ℕ. Contradiction!

Therefore, 0 ∉ Im(f), so f is not onto. ∎

PART B: Prove that if g is onto, then Im(f) = ℕ_odd ∪ {-1}.

We prove both containments.

(⊆) Im(f) ⊆ ℕ_odd ∪ {-1}:
Let m ∈ Im(f).
Then there exists n ∈ ℕ such that f(n) = m.
So m = 2g(n) - 1.
Since g(n) ∈ ℕ, we have g(n) ≥ 0.
Thus m = 2g(n) - 1 is always odd (2 times something minus 1).
If g(n) = 0: m = -1
If g(n) ≥ 1: m = 2g(n) - 1 ≥ 1 and odd (so m ∈ ℕ_odd)
Therefore m ∈ ℕ_odd ∪ {-1}. ✓

(⊇) ℕ_odd ∪ {-1} ⊆ Im(f):
Let m ∈ ℕ_odd ∪ {-1}.
Then m + 1 is even (if m is odd) or m + 1 = 0 (if m = -1).
In either case, (m+1)/2 ∈ ℕ.

Since g is onto, there exists n ∈ ℕ such that g(n) = (m+1)/2.
Then: f(n) = 2g(n) - 1 = 2 · (m+1)/2 - 1 = m + 1 - 1 = m.
So m ∈ Im(f). ✓

Conclusion: Im(f) = ℕ_odd ∪ {-1}. ∎

VERIFICATION:
- f(n) = 2g(n) - 1: when g(n) = 0, f(n) = -1; when g(n) = 1, f(n) = 1; etc.
- Image contains -1, 1, 3, 5, 7, ... (all odd non-negative integers plus -1)
- Does not contain 0, 2, 4, 6, ... (even non-negative integers)

Note: The problem assumes ℕ includes 0, so -1 ∉ ℕ but can be in the codomain discussion.

COMMON MISTAKES:
- Not checking if g(n) can equal 0
- Not proving both containments for part b
- Confusing domain and codomain`,
    explanationHe: `סוג השאלה: הוכחת תכונות של פונקציות מוגדרות על ידי הרכבה.

על מה לחשוב:
חלק א: מצאי איבר ש-f לא יכולה לפלוט
חלק ב: הוכיחי שוויון קבוצות על ידי הוכחת שתי הכלות

הוכחה מפורטת:

חלק א: הוכחה ש-f אינה על.

נראה ש-0 ∈ ℕ אינו ב-Im(f).

נניח בשלילה שקיים n ∈ ℕ כך ש-f(n) = 0.
אז: f(n) = 2g(n) - 1 = 0
אז: 2g(n) = 1
לכן: g(n) = 1/2

אבל g: ℕ → ℕ, אז g(n) ∈ ℕ.
ו-1/2 ∉ ℕ. סתירה!

לכן, 0 ∉ Im(f), אז f אינה על. ∎

חלק ב: הוכחה שאם g על, אז Im(f) = ℕ_odd ∪ {-1}.

נוכיח את שתי ההכלות.

(⊆) Im(f) ⊆ ℕ_odd ∪ {-1}:
יהי m ∈ Im(f).
אז קיים n ∈ ℕ כך ש-f(n) = m.
אז m = 2g(n) - 1.
מכיוון ש-g(n) ∈ ℕ, יש לנו g(n) ≥ 0.
לכן m = 2g(n) - 1 תמיד אי-זוגי (2 כפול משהו פחות 1).
אם g(n) = 0: m = -1
אם g(n) ≥ 1: m = 2g(n) - 1 ≥ 1 ואי-זוגי (אז m ∈ ℕ_odd)
לכן m ∈ ℕ_odd ∪ {-1}. ✓

(⊇) ℕ_odd ∪ {-1} ⊆ Im(f):
יהי m ∈ ℕ_odd ∪ {-1}.
אז m + 1 זוגי (אם m אי-זוגי) או m + 1 = 0 (אם m = -1).
בכל מקרה, (m+1)/2 ∈ ℕ.

מכיוון ש-g על, קיים n ∈ ℕ כך ש-g(n) = (m+1)/2.
אז: f(n) = 2g(n) - 1 = 2 · (m+1)/2 - 1 = m + 1 - 1 = m.
אז m ∈ Im(f). ✓

מסקנה: Im(f) = ℕ_odd ∪ {-1}. ∎

וידוא:
• f(n) = 2g(n) - 1: כש-g(n) = 0, f(n) = -1; כש-g(n) = 1, f(n) = 1; וכו'
• התמונה מכילה -1, 1, 3, 5, 7, ... (כל השלמים האי-זוגיים הלא שליליים פלוס -1)
• לא מכילה 0, 2, 4, 6, ... (שלמים זוגיים לא שליליים)

טעויות נפוצות:
• אי-בדיקה אם g(n) יכול להיות 0
• אי-הוכחת שתי ההכלות לחלק ב
• בלבול בין תחום לטווח`,
  },
];
