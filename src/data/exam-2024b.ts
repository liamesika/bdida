// 2024 Moed B Exam - Full Solutions

export interface ExamQuestion2024B {
  id: string;
  questionNumber: number;
  points: number;
  type: 'short' | 'open';
  subParts?: { part: string; question: string; questionHe: string; answer: string; answerHe: string; explanation: string; explanationHe: string }[];
  topic: string;
  topicHe: string;
  question: string;
  questionHe: string;
  answer: string;
  answerHe: string;
  explanation: string;
  explanationHe: string;
}

export const exam2024BQuestions: ExamQuestion2024B[] = [
  // ========== Part A - Short Questions ==========
  {
    id: '2024b-q1',
    questionNumber: 1,
    points: 6,
    type: 'short',
    topic: 'Logic - Equivalence',
    topicHe: 'לוגיקה - שקילות',
    question: 'From the four propositions below, write the numbers of propositions that are NOT equivalent to ¬q → (p ∨ ¬s):\n1. ¬s → (p ∨ q)\n2. ¬p → ¬(s → q)\n3. (¬p ∧ s) → q\n4. q ∧ p ∧ ¬s',
    questionHe: 'מבין ארבעת הפסוקים הבאים, כתבו את מספרי הפסוקים אשר אינם שקולים לפסוק ¬q → (p ∨ ¬s):\n1. ¬s → (p ∨ q)\n2. ¬p → ¬(s → q)\n3. (¬p ∧ s) → q\n4. q ∧ p ∧ ¬s',
    answer: '1, 2, 4',
    answerHe: '1, 2, 4',
    explanation: `Original: ¬q → (p ∨ ¬s)
Using implication rule: q ∨ (p ∨ ¬s) = p ∨ q ∨ ¬s

Let's check each:

1. ¬s → (p ∨ q) = s ∨ p ∨ q = p ∨ q ∨ s
   NOT equivalent (has s instead of ¬s)

2. ¬p → ¬(s → q) = ¬p → (s ∧ ¬q) = p ∨ (s ∧ ¬q)
   NOT equivalent

3. (¬p ∧ s) → q = ¬(¬p ∧ s) ∨ q = (p ∨ ¬s) ∨ q = p ∨ q ∨ ¬s ✓
   EQUIVALENT

4. q ∧ p ∧ ¬s
   NOT equivalent (conjunction, not disjunction)

Answer: 1, 2, 4`,
    explanationHe: `מקור: ¬q → (p ∨ ¬s)
לפי כלל הגרירה: q ∨ (p ∨ ¬s) = p ∨ q ∨ ¬s

נבדוק כל אחד:

1. ¬s → (p ∨ q) = s ∨ p ∨ q = p ∨ q ∨ s
   לא שקול (יש s במקום ¬s)

2. ¬p → ¬(s → q) = ¬p → (s ∧ ¬q) = p ∨ (s ∧ ¬q)
   לא שקול

3. (¬p ∧ s) → q = ¬(¬p ∧ s) ∨ q = (p ∨ ¬s) ∨ q = p ∨ q ∨ ¬s ✓
   שקול

4. q ∧ p ∧ ¬s
   לא שקול (קוניונקציה, לא דיסיונקציה)

תשובה: 1, 2, 4`
  },
  {
    id: '2024b-q2',
    questionNumber: 2,
    points: 6,
    type: 'short',
    topic: 'Sets - Counterexample',
    topicHe: 'קבוצות - דוגמה נגדית',
    question: 'Disprove: If (A\\B) ∩ (A\\C) = ∅ then A ⊆ B ∩ C.',
    questionHe: 'הפריכו: אם (A\\B) ∩ (A\\C) = ∅ אז A ⊆ B ∩ C.',
    answer: 'A = {1}, B = {1,2}, C = {3}',
    answerHe: 'A = {1}, B = {1,2}, C = {3}',
    explanation: `Counterexample: A = {1}, B = {1,2}, C = {3}

Check the premise:
• A\\B = {1}\\{1,2} = ∅
• A\\C = {1}\\{3} = {1}
• (A\\B) ∩ (A\\C) = ∅ ∩ {1} = ∅ ✓

Check the conclusion:
• B ∩ C = {1,2} ∩ {3} = ∅
• A ⊆ B ∩ C means {1} ⊆ ∅? NO! ✗

The premise is true but the conclusion is false, so the implication is disproven.`,
    explanationHe: `דוגמה נגדית: A = {1}, B = {1,2}, C = {3}

בדיקת ההנחה:
• A\\B = {1}\\{1,2} = ∅
• A\\C = {1}\\{3} = {1}
• (A\\B) ∩ (A\\C) = ∅ ∩ {1} = ∅ ✓

בדיקת המסקנה:
• B ∩ C = {1,2} ∩ {3} = ∅
• A ⊆ B ∩ C משמע {1} ⊆ ∅? לא! ✗

ההנחה נכונה אבל המסקנה שגויה, לכן הגרירה מופרכת.`
  },
  {
    id: '2024b-q3',
    questionNumber: 3,
    points: 6,
    type: 'short',
    topic: 'Functions - Injective',
    topicHe: 'פונקציות - חח"ע',
    question: 'Write explicitly an injective function f: P(ℤ\\{5}) → P(ℤ)\\P({5}).',
    questionHe: 'כתבו במפורש פונקציה f: P(ℤ\\{5}) → P(ℤ)\\P({5}) אשר הינה חח"ע.',
    answer: 'f(A) = A if A ≠ ∅, f(∅) = {1,5}',
    answerHe: 'f(A) = A אם A ≠ ∅, f(∅) = {1,5}',
    explanation: `Domain: P(ℤ\\{5}) = all subsets of ℤ that don't contain 5
Codomain: P(ℤ)\\P({5}) = all subsets of ℤ EXCEPT ∅ and {5}

The function:
f(A) = {
  A      if A ≠ ∅
  {1,5}  if A = ∅
}

Why this works:
• For A ≠ ∅: A doesn't contain 5 (from domain), and A ≠ ∅, A ≠ {5}, so A ∈ codomain ✓
• For A = ∅: {1,5} ≠ ∅ and {1,5} ≠ {5}, so {1,5} ∈ codomain ✓

Injective:
• If f(A) = f(B) and both ≠ ∅, then A = B ✓
• If A = ∅ and B ≠ ∅, then f(A) = {1,5} contains 5, but f(B) = B doesn't contain 5 (from domain), so f(A) ≠ f(B) ✓`,
    explanationHe: `תחום: P(ℤ\\{5}) = כל תתי-הקבוצות של ℤ שלא מכילות 5
טווח: P(ℤ)\\P({5}) = כל תתי-הקבוצות של ℤ חוץ מ-∅ ו-{5}

הפונקציה:
f(A) = {
  A      אם A ≠ ∅
  {1,5}  אם A = ∅
}

למה זה עובד:
• עבור A ≠ ∅: A לא מכילה 5 (מהתחום), ו-A ≠ ∅, A ≠ {5}, אז A בטווח ✓
• עבור A = ∅: {1,5} ≠ ∅ ו-{1,5} ≠ {5}, אז {1,5} בטווח ✓

חח"ע:
• אם f(A) = f(B) ושניהם ≠ ∅, אז A = B ✓
• אם A = ∅ ו-B ≠ ∅, אז f(A) = {1,5} מכילה 5, אבל f(B) = B לא מכילה 5 (מהתחום), אז f(A) ≠ f(B) ✓`
  },
  {
    id: '2024b-q4',
    questionNumber: 4,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Race Ordering',
    topicHe: 'קומבינטוריקה - סדר במרוץ',
    question: 'In a race there are 8 runners wearing shirts of colors: red, pink, orange, yellow, green, blue, purple, and black. It is known that:\n- Red finished before Pink\n- Orange finished before Yellow\n- Green finished before Blue\n- Purple finished before Black\nHow many different possibilities are there for the entire race result? (Note: no two runners can finish at exactly the same time)',
    questionHe: 'במרוץ יש 8 רצים שלובשים חולצות בצבעים: אדום, ורוד, כתום, צהוב, ירוק, כחול, סגול ושחור.\nידוע שהרץ בחולצה האדומה הגיע לקו הסיום לפני הרץ בחולצה הורודה.\nידוע שהרץ בחולצה הכתומה הגיע לקו הסיום לפני הרץ בחולצה הצהובה.\nידוע שהרץ בחולצה הירוקה הגיע לקו הסיום לפני הרץ בחולצה הכחולה.\nידוע שהרץ בחולצה הסגולה הגיע לקו הסיום לפני הרץ בחולצה השחורה.\nכמה אפשרויות שונות יש לתוצאת המרוץ כולו?',
    answer: 'C(8,2) · C(6,2) · C(4,2) · C(2,2) = 8!/(2!)⁴ = 2520',
    answerHe: 'C(8,2) · C(6,2) · C(4,2) · C(2,2) = 8!/(2!)⁴ = 2520',
    explanation: `We have 4 pairs with ordering constraints:
(Red, Pink), (Orange, Yellow), (Green, Blue), (Purple, Black)

Method: Choose positions for each pair, then order within pair is fixed.

Step 1: Choose 2 positions out of 8 for Red-Pink pair: C(8,2)
        The earlier position goes to Red, later to Pink.

Step 2: Choose 2 positions out of remaining 6 for Orange-Yellow: C(6,2)
        The earlier position goes to Orange, later to Yellow.

Step 3: Choose 2 positions out of remaining 4 for Green-Blue: C(4,2)

Step 4: Choose 2 positions out of remaining 2 for Purple-Black: C(2,2)

Total: C(8,2) · C(6,2) · C(4,2) · C(2,2)
     = 28 · 15 · 6 · 1
     = 2520

Alternative: This is the multinomial coefficient C(8; 2,2,2,2) = 8!/(2!·2!·2!·2!) = 2520`,
    explanationHe: `יש לנו 4 זוגות עם אילוצי סדר:
(אדום, ורוד), (כתום, צהוב), (ירוק, כחול), (סגול, שחור)

שיטה: בוחרים מיקומים לכל זוג, ואז הסדר בתוך הזוג קבוע.

שלב 1: בוחרים 2 מיקומים מתוך 8 לזוג אדום-ורוד: C(8,2)
        המיקום המוקדם הולך לאדום, המאוחר לורוד.

שלב 2: בוחרים 2 מיקומים מתוך 6 שנותרו לכתום-צהוב: C(6,2)
        המיקום המוקדם הולך לכתום, המאוחר לצהוב.

שלב 3: בוחרים 2 מיקומים מתוך 4 שנותרו לירוק-כחול: C(4,2)

שלב 4: בוחרים 2 מיקומים מתוך 2 שנותרו לסגול-שחור: C(2,2)

סה"כ: C(8,2) · C(6,2) · C(4,2) · C(2,2)
     = 28 · 15 · 6 · 1
     = 2520

חלופית: זה המקדם המולטינומי C(8; 2,2,2,2) = 8!/(2!·2!·2!·2!) = 2520`
  },
  {
    id: '2024b-q5',
    questionNumber: 5,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Sequences',
    topicHe: 'קומבינטוריקה - סדרות',
    question: 'How many different sequences of length 20 of natural numbers exist if the following two conditions hold:\n1. The first element is 0 and the last element is m (m < 20).\n2. Each element equals its predecessor or is greater by exactly 1.',
    questionHe: 'כמה סדרות שונות באורך 20 של מספרים טבעיים קיימות אם מתקיימים שני התנאים הבאים:\n1. האיבר הראשון בסדרה הוא 0 והאיבר האחרון בסדרה הוא m (m < 20).\n2. כל איבר בסדרה שווה לקודמו או גדול ממנו ב-1 בדיוק.',
    answer: 'C(19, m)',
    answerHe: 'C(19, m)',
    explanation: `We start at 0 and end at m after 20 elements.
Between consecutive elements, we can either:
• Stay the same (jump of 0), or
• Increase by 1 (jump of 1)

There are 19 "gaps" between 20 consecutive elements.
To go from 0 to m, we need exactly m jumps of size 1.
The remaining (19 - m) jumps are of size 0.

We need to choose which m positions (out of 19) will have a jump of 1.

Answer: C(19, m)

Example: If m = 3, we choose 3 positions for "+1" jumps:
C(19, 3) = 969 different sequences`,
    explanationHe: `מתחילים ב-0 ומסיימים ב-m אחרי 20 איברים.
בין איברים עוקבים, אפשר:
• להישאר באותו מקום (קפיצה של 0), או
• לעלות ב-1 (קפיצה של 1)

יש 19 "פערים" בין 20 איברים עוקבים.
כדי לעבור מ-0 ל-m, צריך בדיוק m קפיצות בגודל 1.
שאר (19 - m) הקפיצות הן בגודל 0.

צריך לבחור באילו m מיקומים (מתוך 19) תהיה קפיצה של 1.

תשובה: C(19, m)

דוגמה: אם m = 3, בוחרים 3 מיקומים לקפיצות "+1":
C(19, 3) = 969 סדרות שונות`
  },
  {
    id: '2024b-q6',
    questionNumber: 6,
    points: 6,
    type: 'short',
    topic: 'Combinatorics - Inclusion-Exclusion',
    topicHe: 'קומבינטוריקה - הכלה והדחה',
    question: 'What is the number of integer solutions to the equation x₁ + x₂ + x₃ + x₄ + x₅ + x₆ = 15 satisfying ∀i: 0 ≤ xᵢ ≤ 5?',
    questionHe: 'מהו מספר הפתרונות השלמים למשוואה x₁ + x₂ + x₃ + x₄ + x₅ + x₆ = 15 המקיימים ∀i: 0 ≤ xᵢ ≤ 5?',
    answer: 'C(20,5) - C(6,1)·C(14,5) + C(6,2)·C(8,5)',
    answerHe: 'C(20,5) - C(6,1)·C(14,5) + C(6,2)·C(8,5)',
    explanation: `Using Inclusion-Exclusion for upper bound constraint.

Without upper bound: distributing 15 among 6 variables with xᵢ ≥ 0
= C(15 + 6 - 1, 5) = C(20, 5)

Let Aᵢ = {solutions where xᵢ ≥ 6}
We want to subtract solutions violating the upper bound.

|Aᵢ| = solutions with xᵢ ≥ 6
     = C(15 - 6 + 6 - 1, 5) = C(14, 5)

|Aᵢ ∩ Aⱼ| = solutions with xᵢ ≥ 6 and xⱼ ≥ 6
          = C(15 - 12 + 6 - 1, 5) = C(8, 5)

|Aᵢ ∩ Aⱼ ∩ Aₖ| = solutions with three variables ≥ 6
               = C(15 - 18 + 6 - 1, 5) = C(2, 5) = 0 (need 18, have only 15)

By Inclusion-Exclusion:
C(20,5) - C(6,1)·C(14,5) + C(6,2)·C(8,5)
= 15504 - 6·2002 + 15·56
= 15504 - 12012 + 840
= 4332`,
    explanationHe: `שימוש בהכלה והדחה לאילוץ החסם העליון.

בלי חסם עליון: חלוקת 15 בין 6 משתנים עם xᵢ ≥ 0
= C(15 + 6 - 1, 5) = C(20, 5)

נגדיר Aᵢ = {פתרונות בהם xᵢ ≥ 6}
רוצים להחסיר פתרונות שמפרים את החסם העליון.

|Aᵢ| = פתרונות עם xᵢ ≥ 6
     = C(15 - 6 + 6 - 1, 5) = C(14, 5)

|Aᵢ ∩ Aⱼ| = פתרונות עם xᵢ ≥ 6 וגם xⱼ ≥ 6
          = C(15 - 12 + 6 - 1, 5) = C(8, 5)

|Aᵢ ∩ Aⱼ ∩ Aₖ| = פתרונות עם שלושה משתנים ≥ 6
               = C(15 - 18 + 6 - 1, 5) = C(2, 5) = 0 (צריך 18, יש רק 15)

לפי הכלה והדחה:
C(20,5) - C(6,1)·C(14,5) + C(6,2)·C(8,5)
= 15504 - 6·2002 + 15·56
= 15504 - 12012 + 840
= 4332`
  },
  {
    id: '2024b-q7',
    questionNumber: 7,
    points: 6,
    type: 'short',
    topic: 'Relations - Equivalence Classes',
    topicHe: 'יחסים - מחלקות שקילות',
    question: 'Let A = {0,1,2,...,999}. Define an equivalence relation R on A: xRy iff the set of digits composing x equals the set of digits composing y. For example, 23R332 because for both the set is {2,3}. Also, 5R555 because for both the set is {5}. But ¬(450R454) because the sets {0,4,5} and {4,5} are different. How many equivalence classes does the relation have?',
    questionHe: 'תהי A = {0,1,2,...,999}. נגדיר יחס שקילות R על A באופן הבא: xRy אם"ם קבוצת הספרות המרכיבות את המספר x שווה לקבוצת הספרות המרכיבות את המספר y. למשל 23R332 כי עבור שניהם הקבוצה היא {2,3}, כמו כן 5R555 כי עבור שניהם הקבוצה היא {5}. אבל ¬(450R454) כי הקבוצות {0,4,5},{4,5} שונות. כמה מחלקות שקילות יש ביחס?',
    answer: 'C(10,1) + C(10,2) + C(10,3) = 10 + 45 + 120 = 175',
    answerHe: 'C(10,1) + C(10,2) + C(10,3) = 10 + 45 + 120 = 175',
    explanation: `Each equivalence class corresponds to a non-empty subset of digits {0,1,2,...,9}.

Numbers in A = {0,1,...,999} have at most 3 digits.
So the set of digits can have size 1, 2, or 3.

• Size 1: Choose 1 digit from 10 → C(10,1) = 10 classes
  (e.g., {5} represents 5, 55, 555)

• Size 2: Choose 2 digits from 10 → C(10,2) = 45 classes
  (e.g., {2,3} represents 23, 32, 223, 232, 322, 233, 323, 332)

• Size 3: Choose 3 digits from 10 → C(10,3) = 120 classes
  (e.g., {1,2,3} represents 123, 132, 213, 231, 312, 321)

Total equivalence classes: 10 + 45 + 120 = 175`,
    explanationHe: `כל מחלקת שקילות מתאימה לתת-קבוצה לא ריקה של ספרות {0,1,2,...,9}.

מספרים ב-A = {0,1,...,999} הם בעלי לכל היותר 3 ספרות.
לכן קבוצת הספרות יכולה להיות בגודל 1, 2, או 3.

• גודל 1: בוחרים ספרה 1 מתוך 10 → C(10,1) = 10 מחלקות
  (למשל, {5} מייצגת 5, 55, 555)

• גודל 2: בוחרים 2 ספרות מתוך 10 → C(10,2) = 45 מחלקות
  (למשל, {2,3} מייצגת 23, 32, 223, 232, 322, 233, 323, 332)

• גודל 3: בוחרים 3 ספרות מתוך 10 → C(10,3) = 120 מחלקות
  (למשל, {1,2,3} מייצגת 123, 132, 213, 231, 312, 321)

סה"כ מחלקות שקילות: 10 + 45 + 120 = 175`
  },
  {
    id: '2024b-q8',
    questionNumber: 8,
    points: 6,
    type: 'short',
    topic: 'Relations - Special Property',
    topicHe: 'יחסים - תכונה מיוחדת',
    question: 'Give an example of a relation R on a non-empty set A such that R is not symmetric, not transitive, but satisfies the following property: ∀x,y,z ∈ A((xRy ∧ yRz) → (x = z))',
    questionHe: 'תנו דוגמה ליחס R על קבוצה לא ריקה A כך ש-R לא סימטרי, לא טרנזיטיבי, אבל מקיים את התכונה הבאה: ∀x,y,z ∈ A((xRy ∧ yRz) → (x = z))',
    answer: 'A = {1,2,3,4}, R = {(1,2), (2,1), (3,4)}',
    answerHe: 'A = {1,2,3,4}, R = {(1,2), (2,1), (3,4)}',
    explanation: `A = {1,2,3,4}
R = {(1,2), (2,1), (3,4)}

Check NOT symmetric:
• (3,4) ∈ R but (4,3) ∉ R ✓

Check NOT transitive:
• (1,2) ∈ R and (2,1) ∈ R but (1,1) ∉ R ✓

Check the property ∀x,y,z((xRy ∧ yRz) → (x = z)):

All pairs (x,y) with xRy: (1,2), (2,1), (3,4)
For each, check if there's z with yRz:
• (1,2): 2R1 exists, need 1 = 1? Yes ✓
• (2,1): 1R2 exists, need 2 = 2? Yes ✓
• (3,4): no z with 4Rz, so vacuously true ✓

The property is satisfied!`,
    explanationHe: `A = {1,2,3,4}
R = {(1,2), (2,1), (3,4)}

בדיקה שלא סימטרי:
• (3,4) ∈ R אבל (4,3) ∉ R ✓

בדיקה שלא טרנזיטיבי:
• (1,2) ∈ R ו-(2,1) ∈ R אבל (1,1) ∉ R ✓

בדיקת התכונה ∀x,y,z((xRy ∧ yRz) → (x = z)):

כל הזוגות (x,y) עם xRy: (1,2), (2,1), (3,4)
לכל אחד, בודקים אם יש z עם yRz:
• (1,2): קיים 2R1, צריך 1 = 1? כן ✓
• (2,1): קיים 1R2, צריך 2 = 2? כן ✓
• (3,4): אין z עם 4Rz, אז נכון באופן ריק ✓

התכונה מתקיימת!`
  },

  // ========== Part B - Open Questions ==========
  {
    id: '2024b-q9',
    questionNumber: 9,
    points: 16,
    type: 'open',
    topic: 'Induction - Strong Induction',
    topicHe: 'אינדוקציה - אינדוקציה חזקה',
    question: 'Prove by induction that for all natural n ≥ 12, there exist k, l ∈ ℕ such that n = 4k + 5l.',
    questionHe: 'הוכיחו באינדוקציה שלכל n ≥ 12 טבעי, קיימים k, l ∈ ℕ כך ש-n = 4k + 5l.',
    answer: 'Proof by strong induction',
    answerHe: 'הוכחה באינדוקציה חזקה',
    explanation: `We prove by strong induction on n.

Base cases: n = 12, 13, 14, 15

• n = 12: k = 3, l = 0 → 4(3) + 5(0) = 12 ✓
• n = 13: k = 2, l = 1 → 4(2) + 5(1) = 13 ✓
• n = 14: k = 1, l = 2 → 4(1) + 5(2) = 14 ✓
• n = 15: k = 0, l = 3 → 4(0) + 5(3) = 15 ✓

Induction step:
Assume the claim holds for all t with 12 ≤ t < n (where n ≥ 16).
We prove the claim for n.

For n ≥ 16, consider n - 4.
Since n ≥ 16, we have n - 4 ≥ 12, so the induction hypothesis applies.
By I.H., there exist a, b ∈ ℕ such that n - 4 = 4a + 5b.

Choose k = a + 1, l = b.
Clearly k, l ∈ ℕ.

Then:
4k + 5l = 4(a + 1) + 5b = 4a + 4 + 5b = (4a + 5b) + 4 = (n - 4) + 4 = n ✓

We have proven the claim by strong induction for all n ≥ 12. ∎`,
    explanationHe: `נוכיח באינדוקציה חזקה על n.

בסיס: n = 12, 13, 14, 15

• עבור n = 12: k = 3, l = 0 → 4(3) + 5(0) = 12 ✓
• עבור n = 13: k = 2, l = 1 → 4(2) + 5(1) = 13 ✓
• עבור n = 14: k = 1, l = 2 → 4(1) + 5(2) = 14 ✓
• עבור n = 15: k = 0, l = 3 → 4(0) + 5(3) = 15 ✓

צעד האינדוקציה:
נניח את נכונות הטענה לכל t עם 12 ≤ t < n (כאשר n ≥ 16).
נוכיח את נכונות הטענה עבור n.

עבור n ≥ 16, נתבונן ב-n - 4.
מכיוון ש-n ≥ 16, מתקיים n - 4 ≥ 12, אז הנחת האינדוקציה חלה.
לפי ה.א., קיימים a, b ∈ ℕ כך ש-n - 4 = 4a + 5b.

נבחר k = a + 1, l = b.
ברור ש-k, l ∈ ℕ.

אז:
4k + 5l = 4(a + 1) + 5b = 4a + 4 + 5b = (4a + 5b) + 4 = (n - 4) + 4 = n ✓

הוכחנו באינדוקציה את נכונות הטענה לכל n ≥ 12 טבעי. ∎`
  },
  {
    id: '2024b-q10',
    questionNumber: 10,
    points: 20,
    type: 'open',
    topic: 'Functions - Surjectivity and Injectivity',
    topicHe: 'פונקציות - על וחח"ע',
    question: 'Given functions f, g: ℕ → ℕ. It is known that for all n ∈ ℕ: f(n) = 2g(n) - 1.\na. Prove that f is not surjective.\nb. Prove that if f is injective then g is also injective.',
    questionHe: 'נתונות הפונקציות f, g: ℕ → ℕ. ידוע שלכל n ∈ ℕ מתקיים: f(n) = 2g(n) - 1.\nא. הוכיחו ש-f אינה על.\nב. הוכיחו שאם f חח"ע אז גם g חח"ע.',
    answer: 'a. 0 has no preimage. b. Use f\'s injectivity to show g\'s injectivity.',
    answerHe: 'א. ל-0 אין מקור. ב. משתמשים בחח"עות של f להוכיח חח"עות של g.',
    explanation: `Part a: Prove f is not surjective

We show that 0 ∈ ℕ has no preimage under f.

Assume by contradiction that there exists n ∈ ℕ such that f(n) = 0.
By the given condition: f(n) = 2g(n) - 1 = 0
Therefore: 2g(n) = 1
So: g(n) = 0.5

This contradicts g(n) ∈ ℕ (natural numbers).

Therefore, 0 has no preimage, so f is not surjective. ∎

Part b: Prove if f is injective then g is injective

Assume f is injective.
Let n₁, n₂ ∈ ℕ such that g(n₁) = g(n₂).

Then:
2g(n₁) = 2g(n₂)
2g(n₁) - 1 = 2g(n₂) - 1
f(n₁) = f(n₂)

Since f is injective: n₁ = n₂

Therefore g is injective. ∎`,
    explanationHe: `חלק א: הוכיחו ש-f אינה על

נראה ש-0 ∈ ℕ אין לו מקור תחת f.

נניח בשלילה שקיים n ∈ ℕ כך ש-f(n) = 0.
לפי הנתון: f(n) = 2g(n) - 1 = 0
לכן: 2g(n) = 1
אז: g(n) = 0.5

בסתירה לכך ש-g(n) ∈ ℕ (מספרים טבעיים).

לכן, ל-0 אין מקור, כך ש-f אינה על. ∎

חלק ב: הוכיחו שאם f חח"ע אז גם g חח"ע

נניח ש-f חח"ע.
יהיו n₁, n₂ ∈ ℕ המקיימים g(n₁) = g(n₂).

אז:
2g(n₁) = 2g(n₂)
2g(n₁) - 1 = 2g(n₂) - 1
f(n₁) = f(n₂)

מהיות f חח"ע: n₁ = n₂

לכן g חח"ע. ∎`
  },
  {
    id: '2024b-q11',
    questionNumber: 11,
    points: 16,
    type: 'open',
    topic: 'Relations - Classification',
    topicHe: 'יחסים - סיווג',
    question: 'For each of the following relations, determine whether it is an equivalence relation, a weak partial order, a strong partial order, or none of these, and prove your answer.\na. R on ℕ × (ℕ\\{0}) defined by: (a,b)R(c,d) iff a·d = b·c\nb. S on ℕ × (ℕ\\{0}) defined by: (a,b)S(c,d) iff a·c = b·d',
    questionHe: 'עבור כל אחד מהיחסים הבאים קבעו האם הוא יחס שקילות, יחס סדר חלקי חלש, יחס סדר חלקי חזק או אף אחד מהם והוכיחו את תשובתכם.\nא. R יחס על ℕ × (ℕ\\{0}) המוגדר ע"י: (a,b)R(c,d) אם"ם a·d = b·c\nב. S יחס על ℕ × (ℕ\\{0}) המוגדר ע"י: (a,b)S(c,d) אם"ם a·c = b·d',
    answer: 'a. R is an equivalence relation. b. S is none of the above.',
    answerHe: 'א. R הוא יחס שקילות. ב. S אינו אף אחד מהנ"ל.',
    explanation: `Part a: R is an EQUIVALENCE RELATION

Reflexive: Let (a,b) ∈ ℕ × (ℕ\\{0}).
a·b = b·a (commutativity of multiplication)
So (a,b)R(a,b) ✓

Symmetric: Let (a,b), (c,d) ∈ ℕ × (ℕ\\{0}) with (a,b)R(c,d).
Then a·d = b·c.
By commutativity: c·b = d·a, i.e., (c,d)R(a,b) ✓

Transitive: Let (a,b), (c,d), (e,f) with (a,b)R(c,d) and (c,d)R(e,f).
Then: a·d = b·c and c·f = d·e
Since b, d, f ≠ 0, we get: a/b = c/d and c/d = e/f
So a/b = e/f, meaning a·f = b·e
Therefore (a,b)R(e,f) ✓

R is an equivalence relation (represents equal fractions a/b = c/d). ∎

Part b: S is NONE OF THE ABOVE

NOT reflexive (needed for equivalence and weak partial order):
(1,2)S(1,2) requires 1·1 = 2·2, i.e., 1 = 4. FALSE ✗

NOT antireflexive (needed for strong partial order):
(1,1)S(1,1) requires 1·1 = 1·1, i.e., 1 = 1. TRUE ✓
So S is not antireflexive ✗

Therefore S is neither an equivalence relation, nor a weak partial order, nor a strong partial order. ∎`,
    explanationHe: `חלק א: R הוא יחס שקילות

רפלקסיבי: יהי (a,b) ∈ ℕ × (ℕ\\{0}).
a·b = b·a (חילופיות הכפל)
לכן (a,b)R(a,b) ✓

סימטרי: יהיו (a,b), (c,d) ∈ ℕ × (ℕ\\{0}) עם (a,b)R(c,d).
אז a·d = b·c.
מחילופיות: c·b = d·a, כלומר (c,d)R(a,b) ✓

טרנזיטיבי: יהיו (a,b), (c,d), (e,f) עם (a,b)R(c,d) וגם (c,d)R(e,f).
אז: a·d = b·c וגם c·f = d·e
מכיוון ש-b, d, f ≠ 0, נקבל: a/b = c/d וגם c/d = e/f
לכן a/b = e/f, כלומר a·f = b·e
ולכן (a,b)R(e,f) ✓

R הוא יחס שקילות (מייצג שברים שווים a/b = c/d). ∎

חלק ב: S אינו אף אחד מהנ"ל

לא רפלקסיבי (נדרש לשקילות וסדר חלקי חלש):
(1,2)S(1,2) דורש 1·1 = 2·2, כלומר 1 = 4. שקר ✗

לא אנטי-רפלקסיבי (נדרש לסדר חלקי חזק):
(1,1)S(1,1) דורש 1·1 = 1·1, כלומר 1 = 1. אמת ✓
לכן S לא אנטי-רפלקסיבי ✗

לכן S אינו לא יחס שקילות, לא יחס סדר חלקי חלש, ולא יחס סדר חלקי חזק. ∎`
  },
];

export const examInfo2024B = {
  year: 2024,
  semester: 'B',
  title: 'מבחן במתמטיקה בדידה - 2024 מועד ב\'',
  totalPoints: 100,
  duration: '3 שעות',
  shortQuestions: 8,
  openQuestions: 3,
  shortQuestionPoints: 6,
  openQuestionPoints: [16, 20, 16],
};
