// 2023 Moed B Exam - Full Solutions

export interface ExamQuestion2023B {
  id: string;
  questionNumber: number;
  points: number;
  type: 'short' | 'open';
  topic: string;
  topicHe: string;
  question: string;
  questionHe: string;
  answer: string;
  answerHe: string;
  explanation: string;
  explanationHe: string;
}

export const exam2023BQuestions: ExamQuestion2023B[] = [
  // ========== Part A - Short Questions ==========
  {
    id: '2023b-q1',
    questionNumber: 1,
    points: 6,
    type: 'short',
    topic: 'Logic - Tautology',
    topicHe: 'לוגיקה - טאוטולוגיה',
    question: 'A proposition δ is called a tautology if only T values appear in its truth table. Given α = p → q, β = ¬(p ∧ q). Write a proposition γ such that α ∨ γ and β ∨ γ are tautologies, but γ is not a tautology.',
    questionHe: 'פסוק δ ייקרא טאוטולוגיה אם בטבלת האמת שלו מופיעים ערכי T בלבד. נתונים הפסוקים α = p → q, β = ¬(p ∧ q). כתבו פסוק γ כך שהפסוקים α ∨ γ, β ∨ γ הם טאוטולוגיות, אבל γ אינו טאוטולוגיה.',
    answer: 'γ = p',
    answerHe: 'γ = p',
    explanation: `We need γ such that:
1. α ∨ γ is a tautology: (p → q) ∨ γ must always be true
2. β ∨ γ is a tautology: ¬(p ∧ q) ∨ γ must always be true
3. γ is NOT a tautology

Let γ = p:
• α ∨ γ = (p → q) ∨ p
  When p=T: p=T, so the disjunction is T
  When p=F: p→q = T, so the disjunction is T
  ✓ Always true (tautology)

• β ∨ γ = ¬(p ∧ q) ∨ p
  When p=T: p=T, so the disjunction is T
  When p=F: ¬(p ∧ q) = ¬F = T, so the disjunction is T
  ✓ Always true (tautology)

• γ = p is clearly not a tautology (false when p=F)`,
    explanationHe: `צריך למצוא γ כך ש:
1. α ∨ γ טאוטולוגיה: (p → q) ∨ γ תמיד אמת
2. β ∨ γ טאוטולוגיה: ¬(p ∧ q) ∨ γ תמיד אמת
3. γ אינו טאוטולוגיה

ניקח γ = p:
• α ∨ γ = (p → q) ∨ p
  כאשר p=T: p=T, אז הדיסיונקציה T
  כאשר p=F: p→q = T, אז הדיסיונקציה T
  ✓ תמיד אמת (טאוטולוגיה)

• β ∨ γ = ¬(p ∧ q) ∨ p
  כאשר p=T: p=T, אז הדיסיונקציה T
  כאשר p=F: ¬(p ∧ q) = ¬F = T, אז הדיסיונקציה T
  ✓ תמיד אמת (טאוטולוגיה)

• γ = p בבירור אינו טאוטולוגיה (שקר כאשר p=F)`
  },
  {
    id: '2023b-q2',
    questionNumber: 2,
    points: 6,
    type: 'short',
    topic: 'Sets - Power Set',
    topicHe: 'קבוצות - קבוצת חזקה',
    question: 'Given the claim "For all 2 sets A, B: P(A\\B) ≠ P(A)\\P(B)". If the claim is true, explain briefly why. If not, provide a counterexample.',
    questionHe: 'נתונה הטענה "לכל 2 קבוצות A, B מתקיים P(A\\B) ≠ P(A)\\P(B)". אם הטענה נכונה, הסבירו מדוע בקצרה. אם הטענה אינה נכונה, הביאו דוגמה נגדית.',
    answer: 'The claim is TRUE',
    answerHe: 'הטענה נכונה',
    explanation: `The claim is TRUE.

Key observation:
• ∅ ∈ P(A\\B) - because ∅ is a subset of any set
• ∅ ∉ P(A)\\P(B) - because ∅ ∈ P(B) (∅ is a subset of any set)

Since P(A)\\P(B) = {X ∈ P(A) | X ∉ P(B)}
And ∅ ∈ P(B) for any B, we have ∅ ∉ P(A)\\P(B)

But ∅ ⊆ A\\B always, so ∅ ∈ P(A\\B)

Therefore P(A\\B) ≠ P(A)\\P(B) for any A, B.`,
    explanationHe: `הטענה נכונה.

תצפית מפתח:
• ∅ ∈ P(A\\B) - כי ∅ תת-קבוצה של כל קבוצה
• ∅ ∉ P(A)\\P(B) - כי ∅ ∈ P(B) (∅ תת-קבוצה של כל קבוצה)

מכיוון ש-P(A)\\P(B) = {X ∈ P(A) | X ∉ P(B)}
ו-∅ ∈ P(B) לכל B, אז ∅ ∉ P(A)\\P(B)

אבל ∅ ⊆ A\\B תמיד, אז ∅ ∈ P(A\\B)

לכן P(A\\B) ≠ P(A)\\P(B) לכל A, B.`
  },
  {
    id: '2023b-q3',
    questionNumber: 3,
    points: 6,
    type: 'short',
    topic: 'Functions - Inverse',
    topicHe: 'פונקציות - הופכית',
    question: 'Let A, B, C ⊆ ℝ satisfying: A ∪ B = C and A ∩ B = ∅. Let f: P(A) × P(B) → P(C) defined by f(S,T) = S ∪ T. Given that f is invertible, find f⁻¹.',
    questionHe: 'תהיינה A, B, C ⊆ ℝ המקיימות: A ∪ B = C וגם A ∩ B = ∅. תהי f: P(A) × P(B) → P(C) המוגדרת כך: f(S,T) = S ∪ T. ידוע כי f הפיכה. מצאו את f⁻¹.',
    answer: 'f⁻¹(K) = (K ∩ A, K ∩ B)',
    answerHe: 'f⁻¹(K) = (K ∩ A, K ∩ B)',
    explanation: `Since A ∩ B = ∅ and A ∪ B = C, every element in C belongs to exactly one of A or B.

For any K ⊆ C:
• K ∩ A contains exactly the elements of K that are in A
• K ∩ B contains exactly the elements of K that are in B
• (K ∩ A) ∪ (K ∩ B) = K (since every element of K is in A or B)
• (K ∩ A) ∩ (K ∩ B) = ∅ (since A ∩ B = ∅)

Verification:
f(f⁻¹(K)) = f(K ∩ A, K ∩ B) = (K ∩ A) ∪ (K ∩ B) = K ✓
f⁻¹(f(S,T)) = f⁻¹(S ∪ T) = ((S ∪ T) ∩ A, (S ∪ T) ∩ B) = (S, T) ✓

Therefore: f⁻¹: P(C) → P(A) × P(B), f⁻¹(K) = (K ∩ A, K ∩ B)`,
    explanationHe: `מכיוון ש-A ∩ B = ∅ ו-A ∪ B = C, כל איבר ב-C שייך בדיוק לאחת מ-A או B.

לכל K ⊆ C:
• K ∩ A מכיל בדיוק את איברי K שב-A
• K ∩ B מכיל בדיוק את איברי K שב-B
• (K ∩ A) ∪ (K ∩ B) = K (כי כל איבר של K ב-A או ב-B)
• (K ∩ A) ∩ (K ∩ B) = ∅ (כי A ∩ B = ∅)

בדיקה:
f(f⁻¹(K)) = f(K ∩ A, K ∩ B) = (K ∩ A) ∪ (K ∩ B) = K ✓
f⁻¹(f(S,T)) = f⁻¹(S ∪ T) = ((S ∪ T) ∩ A, (S ∪ T) ∩ B) = (S, T) ✓

לכן: f⁻¹: P(C) → P(A) × P(B), f⁻¹(K) = (K ∩ A, K ∩ B)`
  },
  {
    id: '2023b-q4',
    questionNumber: 4,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Dice',
    topicHe: 'קומבינטוריקה - קוביות',
    question: 'We roll 10 identical dice. It is known that in the set of numbers obtained on the dice there are exactly 3 elements (i.e., only three numbers appear in the result. For example, on each of the 10 dice, only 2, 3, or 5 appeared). How many such rolls are possible?',
    questionHe: 'מטילים 10 קוביות זהות. ידוע שבקבוצת המספרים שהתקבלו על גבי הקוביות יש בדיוק 3 איברים (כלומר יש רק שלושה מספרים שמופיעים בתוצאת הזריקה. למשל, על כל אחת מ-10 הקוביות יצא 2 או 3 או 5 בלבד). כמה אפשרויות יש להטלות כאלה?',
    answer: 'C(6,3) · C(9,7) = 20 · 36 = 720',
    answerHe: 'C(6,3) · C(9,7) = 20 · 36 = 720',
    explanation: `Step 1: Choose which 3 numbers appear
C(6,3) = 20 ways to choose 3 numbers from {1,2,3,4,5,6}

Step 2: Place one of each chosen number on a die
Since we need EXACTLY 3 different numbers, each must appear at least once.
We place each of the 3 numbers on one die - only 1 way (dice are identical).

Step 3: Distribute the remaining 7 dice among the 3 numbers
We have 7 remaining identical dice to distribute among 3 categories.
This is "distributing k identical balls into n distinct cells":
C(7 + 3 - 1, 7) = C(9, 7) = 36

Total: C(6,3) · C(9,7) = 20 · 36 = 720`,
    explanationHe: `שלב 1: בוחרים אילו 3 מספרים יופיעו
C(6,3) = 20 דרכים לבחור 3 מספרים מתוך {1,2,3,4,5,6}

שלב 2: מניחים כל אחד מהמספרים שנבחרו על קוביה
מכיוון שצריך בדיוק 3 מספרים שונים, כל אחד חייב להופיע לפחות פעם אחת.
נניח כל אחד מ-3 המספרים על קוביה - אפשרות אחת בלבד (הקוביות זהות).

שלב 3: מפזרים את 7 הקוביות הנותרות בין 3 המספרים
יש לנו 7 קוביות זהות נותרות לפזר בין 3 קטגוריות.
זה "חלוקת k כדורים זהים ל-n תאים שונים":
C(7 + 3 - 1, 7) = C(9, 7) = 36

סה"כ: C(6,3) · C(9,7) = 20 · 36 = 720`
  },
  {
    id: '2023b-q5',
    questionNumber: 5,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Subsets',
    topicHe: 'קומבינטוריקה - תת-קבוצות',
    question: 'Find |{X | {1,2,3,4} ⊆ X ⊆ {1,2,3,...,200}}|.',
    questionHe: 'מצאו את |{X | {1,2,3,4} ⊆ X ⊆ {1,2,3,...,200}}|.',
    answer: '2¹⁹⁶',
    answerHe: '2¹⁹⁶',
    explanation: `We need to count subsets X of {1,2,...,200} that contain {1,2,3,4}.

The elements 1, 2, 3, 4 MUST be in X.
For each of the remaining 196 elements (5, 6, ..., 200), we can choose:
• Include it in X, or
• Not include it in X

So we have 2 choices for each of 196 elements.

Total: 2¹⁹⁶`,
    explanationHe: `צריך לספור תת-קבוצות X של {1,2,...,200} שמכילות את {1,2,3,4}.

האיברים 1, 2, 3, 4 חייבים להיות ב-X.
לכל אחד מ-196 האיברים הנותרים (5, 6, ..., 200), נוכל לבחור:
• לכלול אותו ב-X, או
• לא לכלול אותו ב-X

אז יש לנו 2 בחירות לכל אחד מ-196 איברים.

סה"כ: 2¹⁹⁶`
  },
  {
    id: '2023b-q6',
    questionNumber: 6,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Binomial Sum',
    topicHe: 'קומבינטוריקה - סכום בינומי',
    question: 'Simplify the following sum as much as possible: Σᵢ₌₀ᵏ C(i+(n-1), i). Your answer should contain at most 6 characters.',
    questionHe: 'פשטו את הסכום הבא ככל הניתן: Σᵢ₌₀ᵏ C(i+(n-1), i). על תשובתכם להכיל לכל היותר 6 תווים.',
    answer: 'C(k+n,k)',
    answerHe: 'C(k+n,k)',
    explanation: `This sum represents distributing at most k balls into n cells.

Interpretation:
• C(i+(n-1), i) = C(i+n-1, n-1) counts ways to distribute exactly i identical balls into n distinct cells
• Summing from i=0 to k counts distributing at most k balls

Alternative interpretation:
Distributing at most k balls into n cells is equivalent to distributing exactly k balls into n+1 cells (the extra cell gets "unused" balls).

This equals C(k + (n+1) - 1, k) = C(k+n, k)

By the identity: Σᵢ₌₀ᵏ C(n-1+i, i) = C(n+k, k)`,
    explanationHe: `הסכום מייצג חלוקה של לכל היותר k כדורים ל-n תאים.

פרשנות:
• C(i+(n-1), i) = C(i+n-1, n-1) סופר דרכים לחלק בדיוק i כדורים זהים ל-n תאים שונים
• סכימה מ-i=0 עד k סופרת חלוקה של לכל היותר k כדורים

פרשנות חלופית:
חלוקה של לכל היותר k כדורים ל-n תאים שקולה לחלוקה של בדיוק k כדורים ל-n+1 תאים (התא הנוסף מקבל את הכדורים ש"לא חולקו").

זה שווה ל-C(k + (n+1) - 1, k) = C(k+n, k)

לפי הזהות: Σᵢ₌₀ᵏ C(n-1+i, i) = C(n+k, k)`
  },
  {
    id: '2023b-q7',
    questionNumber: 7,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Inclusion-Exclusion',
    topicHe: 'קומבינטוריקה - הכלה והדחה',
    question: 'How many natural number solutions are there to the equation x₁ + ... + x₆ = 50 under the constraint 5 ≤ xᵢ ≤ 10 for all 1 ≤ i ≤ 6?',
    questionHe: 'כמה פתרונות טבעיים יש למשוואה x₁ + ... + x₆ = 50 תחת האילוץ 5 ≤ xᵢ ≤ 10 לכל 1 ≤ i ≤ 6?',
    answer: 'C(25,5) - C(6,1)C(19,5) + C(6,2)C(13,5) - C(6,3)C(7,5)',
    answerHe: 'C(25,5) - C(6,1)C(19,5) + C(6,2)C(13,5) - C(6,3)C(7,5)',
    explanation: `Step 1: Substitute yᵢ = xᵢ - 5 to handle lower bound
Now 0 ≤ yᵢ ≤ 5 and y₁ + ... + y₆ = 50 - 30 = 20

Step 2: Use Inclusion-Exclusion for upper bound yᵢ ≤ 5
Let Aᵢ = {solutions where yᵢ ≥ 6}

Without upper bound: C(20+5, 5) = C(25, 5)

|Aᵢ| = C(14+5, 5) = C(19, 5) (substitute zᵢ = yᵢ - 6)
|Aᵢ ∩ Aⱼ| = C(8+5, 5) = C(13, 5)
|Aᵢ ∩ Aⱼ ∩ Aₖ| = C(2+5, 5) = C(7, 5)
Higher intersections = 0 (would need negative sum)

By Inclusion-Exclusion:
C(25,5) - C(6,1)C(19,5) + C(6,2)C(13,5) - C(6,3)C(7,5)
= 53130 - 6·11628 + 15·1287 - 20·21
= 53130 - 69768 + 19305 - 420
= 2247`,
    explanationHe: `שלב 1: נציב yᵢ = xᵢ - 5 לטיפול בחסם תחתון
עכשיו 0 ≤ yᵢ ≤ 5 ו-y₁ + ... + y₆ = 50 - 30 = 20

שלב 2: שימוש בהכלה והדחה לחסם עליון yᵢ ≤ 5
נגדיר Aᵢ = {פתרונות בהם yᵢ ≥ 6}

בלי חסם עליון: C(20+5, 5) = C(25, 5)

|Aᵢ| = C(14+5, 5) = C(19, 5) (הצבה zᵢ = yᵢ - 6)
|Aᵢ ∩ Aⱼ| = C(8+5, 5) = C(13, 5)
|Aᵢ ∩ Aⱼ ∩ Aₖ| = C(2+5, 5) = C(7, 5)
חיתוכים גבוהים יותר = 0 (היו צריכים סכום שלילי)

לפי הכלה והדחה:
C(25,5) - C(6,1)C(19,5) + C(6,2)C(13,5) - C(6,3)C(7,5)
= 53130 - 6·11628 + 15·1287 - 20·21
= 53130 - 69768 + 19305 - 420
= 2247`
  },
  {
    id: '2023b-q8',
    questionNumber: 8,
    points: 6,
    type: 'short',
    topic: 'Relations - Counting',
    topicHe: 'יחסים - ספירה',
    question: 'Let A = {1,2,3}. How many reflexive and antisymmetric relations on A exist?',
    questionHe: 'תהי A = {1,2,3}. כמה יחסים רפלקסיביים ואנטי-סימטריים על A קיימים?',
    answer: '3³ = 27',
    answerHe: '3³ = 27',
    explanation: `For a relation R on A = {1,2,3} to be:
• Reflexive: (1,1), (2,2), (3,3) MUST be in R
• Antisymmetric: For a ≠ b, if (a,b) ∈ R then (b,a) ∉ R

For the diagonal pairs (1,1), (2,2), (3,3): Must include all → 1 way

For each off-diagonal pair {a,b} where a ≠ b:
The pairs are: {1,2}, {1,3}, {2,3}
For each pair, we have 3 options:
1. Include neither (a,b) nor (b,a)
2. Include only (a,b)
3. Include only (b,a)
(Cannot include both - would violate antisymmetry)

Number of pairs: 3
Choices per pair: 3

Total: 3³ = 27`,
    explanationHe: `כדי שיחס R על A = {1,2,3} יהיה:
• רפלקסיבי: (1,1), (2,2), (3,3) חייבים להיות ב-R
• אנטי-סימטרי: לכל a ≠ b, אם (a,b) ∈ R אז (b,a) ∉ R

לזוגות האלכסוניים (1,1), (2,2), (3,3): חייבים לכלול את כולם → דרך אחת

לכל זוג לא-אלכסוני {a,b} כאשר a ≠ b:
הזוגות הם: {1,2}, {1,3}, {2,3}
לכל זוג, יש לנו 3 אפשרויות:
1. לא לכלול לא (a,b) ולא (b,a)
2. לכלול רק (a,b)
3. לכלול רק (b,a)
(אי אפשר לכלול את שניהם - יפר אנטי-סימטריות)

מספר זוגות: 3
בחירות לכל זוג: 3

סה"כ: 3³ = 27`
  },
  {
    id: '2023b-q9',
    questionNumber: 9,
    points: 6,
    type: 'short',
    topic: 'Relations - Equivalence Classes',
    topicHe: 'יחסים - מחלקות שקילות',
    question: 'Let A be the set of surjective functions from ℕ to ℕ. Define an equivalence relation R on A: for f, g ∈ A, fRg iff there exists an invertible h ∈ A such that f ∘ h = h ∘ g. Find |[iℕ]ᴿ|.',
    questionHe: 'תהי A קבוצת הפונקציות המלאות מ-ℕ ל-ℕ. נגדיר יחס שקילות R מעל A באופן הבא: עבור f, g ∈ A, נאמר ש-fRg אם ורק אם קיימת h ∈ A הפיכה המקיימת f ∘ h = h ∘ g. מצאו את |[iℕ]ᴿ|.',
    answer: '1',
    answerHe: '1',
    explanation: `We need to find the equivalence class of iℕ (the identity function on ℕ).

For f to be in [iℕ]ᴿ, we need:
fRiℕ, meaning there exists invertible h such that f ∘ h = h ∘ iℕ = h

So f ∘ h = h, which means f = h ∘ h⁻¹ = iℕ (composing both sides with h⁻¹ on the right)

Wait, let's be more careful:
f ∘ h = h
Composing with h⁻¹ on the right:
f ∘ h ∘ h⁻¹ = h ∘ h⁻¹
f = iℕ

Therefore, the only function equivalent to iℕ is iℕ itself.

|[iℕ]ᴿ| = 1`,
    explanationHe: `צריך למצוא את מחלקת השקילות של iℕ (פונקציית הזהות על ℕ).

כדי ש-f תהיה ב-[iℕ]ᴿ, צריך:
fRiℕ, כלומר קיימת h הפיכה כך ש-f ∘ h = h ∘ iℕ = h

אז f ∘ h = h, שמשמעותו f = h ∘ h⁻¹ = iℕ (הרכבה משני הצדדים עם h⁻¹ מימין)

בזהירות:
f ∘ h = h
מרכיבים עם h⁻¹ מימין:
f ∘ h ∘ h⁻¹ = h ∘ h⁻¹
f = iℕ

לכן, הפונקציה היחידה השקולה ל-iℕ היא iℕ עצמה.

|[iℕ]ᴿ| = 1`
  },
  {
    id: '2023b-q10',
    questionNumber: 10,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Multinomial',
    topicHe: 'קומבינטוריקה - מולטינום',
    question: 'Simplify the following sum: Σᵢ₊ⱼ₊ₖ₊ₗ₌₅₀ (17!)/(i!j!k!l!) · (-1)^(j+l). Your answer should contain at most 6 characters. No sigma in your answer.',
    questionHe: 'פשטו את הסכום הבא: Σᵢ₊ⱼ₊ₖ₊ₗ₌₅₀ (17!)/(i!j!k!l!) · (-1)^(j+l). על תשובתכם להכיל לכל היותר 6 תווים. אין להשאיר סיגמה בתשובתכם.',
    answer: '0',
    answerHe: '0',
    explanation: `Wait, let me reconsider. The sum has 17! in the numerator but i+j+k+l=50.
This seems like the problem might have a typo, but let's analyze the structure.

Notice that (-1)^(j+l) = (-1)^j · (-1)^l

Using the multinomial theorem:
(x₁ + x₂ + x₃ + x₄)^n = Σ (n!)/(i!j!k!l!) · x₁^i · x₂^j · x₃^k · x₄^l

If we set x₁ = 1, x₂ = -1, x₃ = 1, x₄ = -1:
(1 + (-1) + 1 + (-1))^n = (0)^n = 0 (for n > 0)

This equals Σ (n!)/(i!j!k!l!) · 1^i · (-1)^j · 1^k · (-1)^l
= Σ (n!)/(i!j!k!l!) · (-1)^(j+l)

Regardless of the exact value of n (whether 17 or 50), since the base is 0 and n > 0, the answer is 0.

Answer: 0`,
    explanationHe: `נשתמש בנוסחת המולטינום:
(x₁ + x₂ + x₃ + x₄)^n = Σ (n!)/(i!j!k!l!) · x₁^i · x₂^j · x₃^k · x₄^l

אם נציב x₁ = 1, x₂ = -1, x₃ = 1, x₄ = -1:
(1 + (-1) + 1 + (-1))^n = (0)^n = 0 (עבור n > 0)

זה שווה ל-Σ (n!)/(i!j!k!l!) · 1^i · (-1)^j · 1^k · (-1)^l
= Σ (n!)/(i!j!k!l!) · (-1)^(j+l)

שימו לב ש-(-1)^(j+l) = (-1)^j · (-1)^l

ללא קשר לערך המדויק של n, מכיוון שהבסיס הוא 0 ו-n > 0, התשובה היא 0.

תשובה: 0`
  },
  {
    id: '2023b-q11',
    questionNumber: 11,
    points: 6,
    type: 'short',
    topic: 'Relations - Partial Order',
    topicHe: 'יחסים - סדר חלקי',
    question: 'Let T be a partial order on ℕ defined by: xTy ⟺ (x = y) ∨ (y - x > 1). Write minimal elements, maximal elements, minimum and maximum (if they exist).',
    questionHe: 'יהי T יחס סדר חלקי מעל ℕ המוגדר כך: xTy ⟺ (x = y) ∨ (y - x > 1). כתבו איברים מינימליים, מקסימליים, מינימום ומקסימום (אם יש כאלה).',
    answer: 'Minimals: 0, 1 | Maximals, Minimum, Maximum: None',
    answerHe: 'מינימלים: 0, 1 | מקסימלים, מינימום, מקסימום: אין',
    explanation: `Analyzing the relation xTy ⟺ (x = y) ∨ (y - x > 1):
• xTx always (reflexive)
• xTy when y - x > 1, i.e., y ≥ x + 2

Examples:
• 0T2, 0T3, 0T4, ... (0 relates to all numbers ≥ 2)
• 1T3, 1T4, 1T5, ... (1 relates to all numbers ≥ 3)
• 0 does NOT relate to 1 (1 - 0 = 1, not > 1)
• 1 does NOT relate to 0

Minimal elements (no element below them):
• 0 is minimal: no x ≠ 0 with xT0 (would need 0 - x > 1, impossible for x ∈ ℕ)
• 1 is minimal: no x ≠ 1 with xT1 (would need 1 - x > 1, so x < 0, impossible)
• 2 is NOT minimal: 0T2 ✓

Minimals: {0, 1}

Maximal elements: None (for any n, nT(n+2))

Minimum: None (0 and 1 are both minimal but neither relates to the other)

Maximum: None (no largest element)`,
    explanationHe: `ניתוח היחס xTy ⟺ (x = y) ∨ (y - x > 1):
• xTx תמיד (רפלקסיבי)
• xTy כאשר y - x > 1, כלומר y ≥ x + 2

דוגמאות:
• 0T2, 0T3, 0T4, ... (0 ביחס לכל המספרים ≥ 2)
• 1T3, 1T4, 1T5, ... (1 ביחס לכל המספרים ≥ 3)
• 0 לא ביחס ל-1 (1 - 0 = 1, לא > 1)
• 1 לא ביחס ל-0

איברים מינימליים (אין איבר מתחתיהם):
• 0 מינימלי: אין x ≠ 0 עם xT0 (היה צריך 0 - x > 1, בלתי אפשרי עבור x ∈ ℕ)
• 1 מינימלי: אין x ≠ 1 עם xT1 (היה צריך 1 - x > 1, אז x < 0, בלתי אפשרי)
• 2 לא מינימלי: 0T2 ✓

מינימלים: {0, 1}

איברים מקסימליים: אין (לכל n, מתקיים nT(n+2))

מינימום: אין (0 ו-1 שניהם מינימליים אבל אף אחד לא ביחס לשני)

מקסימום: אין (אין איבר גדול ביותר)`
  },
  {
    id: '2023b-q12',
    questionNumber: 12,
    points: 6,
    type: 'short',
    topic: 'Graph Theory - Hall\'s Theorem',
    topicHe: 'תורת הגרפים - משפט הול',
    question: 'Six guests are invited to a party: Eliot, Bentzi, Galila, Daniela, Hedi, and Violet. Each has drink preferences listed. Given one of each drink type, can each guest be matched to a drink they like? If yes, give the matching. If no, explain briefly.',
    questionHe: 'למסיבה מוזמנים 6 אורחים: אליוט, בנצי, גלילה, דניאלה, הדי וויולט. להלן רשימת העדפות של האורחים למשקאות אלכוהוליים. בהנחה שיש משקה אחד מכל סוג, האם ניתן להתאים לכל אורח משקה שיאהב?',
    answer: 'Not possible - Hall\'s condition violated',
    answerHe: 'לא ניתן - תנאי הול מופר',
    explanation: `Guest preferences:
• Eliot: Gin, Martini, Aperol Spritz
• Bentzi: Gin, Aperol Spritz, Martini, Vodka, Mojito
• Galila: Margarita, Gin
• Daniela: Aperol Spritz, Gin, Martini, Margarita
• Hedi: Gin, Margarita, Aperol Spritz
• Violet: Aperol Spritz, Margarita

By Hall's Marriage Theorem, a perfect matching exists iff for every subset S of guests, |N(S)| ≥ |S| (where N(S) is the set of drinks liked by at least one guest in S).

Consider S = {Eliot, Galila, Daniela, Hedi, Violet} (5 guests, excluding Bentzi):

N(S) = drinks liked by at least one of them:
• Eliot: Gin, Martini, Aperol Spritz
• Galila: Margarita, Gin
• Daniela: Aperol Spritz, Gin, Martini, Margarita
• Hedi: Gin, Margarita, Aperol Spritz
• Violet: Aperol Spritz, Margarita

N(S) = {Gin, Martini, Aperol Spritz, Margarita} → |N(S)| = 4

But |S| = 5 > 4 = |N(S)|

Hall's condition is violated, so NO perfect matching exists.`,
    explanationHe: `העדפות האורחים:
• אליוט: ג'ין, מרטיני, אפרול שפריץ
• בנצי: ג'ין, אפרול שפריץ, מרטיני, וודקה, מוחיטו
• גלילה: מרגריטה, ג'ין
• דניאלה: אפרול שפריץ, ג'ין, מרטיני, מרגריטה
• הדי: ג'ין, מרגריטה, אפרול שפריץ
• ויולט: אפרול שפריץ, מרגריטה

לפי משפט החתונה של הול, קיים שידוך מושלם אם"ם לכל תת-קבוצה S של אורחים, |N(S)| ≥ |S| (כאשר N(S) היא קבוצת המשקאות שלפחות אורח אחד ב-S אוהב).

ניקח S = {אליוט, גלילה, דניאלה, הדי, ויולט} (5 אורחים, בלי בנצי):

N(S) = משקאות שלפחות אחד מהם אוהב:
• אליוט: ג'ין, מרטיני, אפרול שפריץ
• גלילה: מרגריטה, ג'ין
• דניאלה: אפרול שפריץ, ג'ין, מרטיני, מרגריטה
• הדי: ג'ין, מרגריטה, אפרול שפריץ
• ויולט: אפרול שפריץ, מרגריטה

N(S) = {ג'ין, מרטיני, אפרול שפריץ, מרגריטה} → |N(S)| = 4

אבל |S| = 5 > 4 = |N(S)|

תנאי הול מופר, לכן לא קיים שידוך מושלם.`
  },

  // ========== Part B - Open Questions ==========
  {
    id: '2023b-q13',
    questionNumber: 13,
    points: 14,
    type: 'open',
    topic: 'Functions - Surjectivity Proof',
    topicHe: 'פונקציות - הוכחת על',
    question: 'Let f: ℝ → ℝ be a function with a left inverse. Let g be a left inverse of f. Define h: ℝ → (0,1] by h(x) = 1/(1+(g(x))²) for all x ∈ ℝ. Prove or disprove: h is surjective.',
    questionHe: 'תהי f: ℝ → ℝ פונקציה הפיכה משמאל. תהי g הופכית שמאלית של f. נגדיר h: ℝ → (0,1] ע"י h(x) = 1/(1+(g(x))²) לכל x ∈ ℝ. הוכיחו או הפריכו: h על.',
    answer: 'TRUE - h is surjective',
    answerHe: 'נכון - h על',
    explanation: `The claim is TRUE.

Lemma 1: g is surjective.
Proof: Given that g is a left inverse of f, we have g ∘ f = iℝ.
We proved in class that the identity function is surjective, so g ∘ f = iℝ is surjective.
By a theorem from class, if g ∘ f is surjective, then g is surjective. ∎

Lemma 2: The function k: ℝ → (0,1], k(x) = 1/(1+x²) is surjective.
Proof: Let y ∈ (0,1]. We note that:
  0 < y ≤ 1
  1/y ≥ 1
  1/y - 1 ≥ 0
So we can choose x = √(1/y - 1) ∈ ℝ.

Then k(x) = 1/(1+x²) = 1/(1 + (1/y - 1)) = 1/(1/y) = y ✓ ∎

Now, observe that h = k ∘ g (composition):
h(x) = 1/(1+(g(x))²) = k(g(x))

Since composition of surjective functions is surjective, and both g and k are surjective, we conclude that h = k ∘ g is surjective. ∎`,
    explanationHe: `הטענה נכונה.

טענת עזר 1: g על.
הוכחה: נתון כי g הופכית שמאלית של f, כלומר g ∘ f = iℝ.
ראינו בכיתה כי פונקציית הזהות על, ובפרט g ∘ f = iℝ על.
מטענה מש"ב, אם g ∘ f על אז g על. ∎

טענת עזר 2: הפונקציה k: ℝ → (0,1], k(x) = 1/(1+x²) על.
הוכחה: יהי y ∈ (0,1]. נשים לב כי:
  0 < y ≤ 1
  1/y ≥ 1
  1/y - 1 ≥ 0
ולכן ניתן לבחור x = √(1/y - 1) ∈ ℝ.

אז k(x) = 1/(1+x²) = 1/(1 + (1/y - 1)) = 1/(1/y) = y ✓ ∎

כעת, נשים לב ש-h = k ∘ g (הרכבה):
h(x) = 1/(1+(g(x))²) = k(g(x))

מכיוון שהרכבה של פונקציות על היא על, וגם g וגם k על, נסיק ש-h = k ∘ g על. ∎`
  },
  {
    id: '2023b-q14',
    questionNumber: 14,
    points: 14,
    type: 'open',
    topic: 'Sets - Induction Proof',
    topicHe: 'קבוצות - הוכחה באינדוקציה',
    question: 'Let U be a set and let A ∈ P(U). Define a sequence of sets Aₙ as follows: A₀ = A, and for all n ≥ 1, Aₙ = Āₙ₋₁ ∪ A. Prove that for all natural m ≥ 1: A₂ₘ = A and A₂ₘ₋₁ = U.',
    questionHe: 'תהי U קבוצה ותהי A ∈ P(U). נגדיר סדרת קבוצות Aₙ באופן הבא: A₀ = A ולכל n ≥ 1 נגדיר Aₙ = Āₙ₋₁ ∪ A. הוכיחו שלכל m ≥ 1 טבעי מתקיים A₂ₘ = A וגם A₂ₘ₋₁ = U.',
    answer: 'Proof by induction on m',
    answerHe: 'הוכחה באינדוקציה על m',
    explanation: `We prove by induction on m.

Base case: m = 1
• A₂ₘ₋₁ = A₁ = Ā₀ ∪ A = Ā ∪ A = U ✓
  (by definition of A₀, and complement union with original equals universal set)

• A₂ₘ = A₂ = Ā₁ ∪ A = Ū ∪ A = ∅ ∪ A = A ✓
  (by the line above, and complement of universal set is empty)

Induction hypothesis: Assume for m ≥ 1:
A₂ₘ = A and A₂ₘ₋₁ = U

Induction step: Prove for m + 1:
• A₂(ₘ₊₁)₋₁ = A₂ₘ₊₁ = Ā₂ₘ ∪ A
  = Ā ∪ A (by induction hypothesis, A₂ₘ = A)
  = U ✓

• A₂(ₘ₊₁) = A₂ₘ₊₂ = Ā₂ₘ₊₁ ∪ A
  = Ū ∪ A (by the line above, A₂ₘ₊₁ = U)
  = ∅ ∪ A
  = A ✓

We have proven by induction that the claim holds for all natural m ≥ 1. ∎`,
    explanationHe: `נוכיח באינדוקציה על m.

בסיס: m = 1
• A₂ₘ₋₁ = A₁ = Ā₀ ∪ A = Ā ∪ A = U ✓
  (לפי הגדרת A₀, ואיחוד המשלים עם המקורי שווה לקבוצה האוניברסלית)

• A₂ₘ = A₂ = Ā₁ ∪ A = Ū ∪ A = ∅ ∪ A = A ✓
  (לפי השורה למעלה, והמשלים של הקבוצה האוניברסלית הוא הריק)

הנחת האינדוקציה: נניח עבור m ≥ 1:
A₂ₘ = A וגם A₂ₘ₋₁ = U

צעד האינדוקציה: נוכיח עבור m + 1:
• A₂(ₘ₊₁)₋₁ = A₂ₘ₊₁ = Ā₂ₘ ∪ A
  = Ā ∪ A (לפי הנחת האינדוקציה, A₂ₘ = A)
  = U ✓

• A₂(ₘ₊₁) = A₂ₘ₊₂ = Ā₂ₘ₊₁ ∪ A
  = Ū ∪ A (לפי השורה למעלה, A₂ₘ₊₁ = U)
  = ∅ ∪ A
  = A ✓

הוכחנו באינדוקציה את נכונות הטענה לכל m ≥ 1 טבעי. ∎`
  },
];

export const examInfo = {
  year: 2023,
  semester: 'B',
  title: 'מבחן במתמטיקה בדידה - 2023 מועד ב\'',
  totalPoints: 100,
  duration: '3 שעות',
  shortQuestions: 12,
  openQuestions: 2,
  shortQuestionPoints: 6,
  openQuestionPoints: 14,
};
