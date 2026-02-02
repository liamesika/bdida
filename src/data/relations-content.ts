// Relations content from lectures 12-13 - Discrete Mathematics
// Lecture 12: Equivalence Relations (יחסי שקילות)
// Lecture 13: Order Relations (יחסי סדר)

export interface RelationDefinition {
  id: string;
  title: string;
  titleHe: string;
  content: string;
  contentHe: string;
  notation?: string;
  examples?: { text: string; textHe: string }[];
  source: string;
  lecture: number;
}

export interface RelationTheorem {
  id: string;
  title: string;
  titleHe: string;
  statement: string;
  statementHe: string;
  proof?: string;
  proofHe?: string;
  source: string;
  lecture: number;
}

export interface RelationExample {
  id: string;
  title: string;
  titleHe: string;
  problem: string;
  problemHe: string;
  solution: string;
  solutionHe: string;
  source: string;
  lecture: number;
  isExamQuestion?: boolean;
}

export interface RelationTechnique {
  id: string;
  title: string;
  titleHe: string;
  description: string;
  descriptionHe: string;
  steps?: string[];
  stepsHe?: string[];
  source: string;
  lecture: number;
}

// ==================== LECTURE 12: EQUIVALENCE RELATIONS ====================

export const equivalenceDefinitions: RelationDefinition[] = [
  {
    id: 'equiv-def-1',
    title: 'Equivalence Relation',
    titleHe: 'יחס שקילות',
    content: 'Let R be a relation on A. We say R is an equivalence relation on A if:\n1. R is reflexive\n2. R is symmetric\n3. R is transitive',
    contentHe: 'יהי R יחס על A. נאמר ש-R יחס שקילות על A אם:\n1. R רפלקסיבי\n2. R סימטרי\n3. R טרנזיטיבי',
    notation: 'aRb or a ~ b',
    source: 'הרצאה 12, עמוד 2',
    lecture: 12,
  },
  {
    id: 'equiv-def-2',
    title: 'Equivalence Class',
    titleHe: 'מחלקת שקילות',
    content: 'Let R be an equivalence relation on A, and let a ∈ A. The equivalence class of a is the set: [a]_R = {b ∈ A | aRb}',
    contentHe: 'יהי R יחס שקילות על קבוצה A. יהי a ∈ A. מחלקת השקילות של a היא הקבוצה: [a]_R = {b ∈ A | aRb}',
    notation: '[a]_R or [a]',
    examples: [
      {
        text: 'For relation R on Z where aRb ⟺ (a+b) is even: [1]_R = Z_odd, [2]_R = Z_even',
        textHe: 'עבור יחס R על Z כך ש-aRb ⟺ a+b זוגי: [1]_R = Z_odd, [2]_R = Z_even',
      },
    ],
    source: 'הרצאה 12, עמוד 4',
    lecture: 12,
  },
  {
    id: 'equiv-def-3',
    title: 'Quotient Set',
    titleHe: 'קבוצת מנה',
    content: 'The quotient set of equivalence relation R on A is the set of all equivalence classes: A/R = {[a]_R | a ∈ A}',
    contentHe: 'קבוצת המנה של יחס השקילות R היא הקבוצה: A/R = {[a]_R | a ∈ A} - קבוצת כל מחלקות השקילות',
    notation: 'A/R',
    source: 'הרצאה 12, עמוד 4',
    lecture: 12,
  },
  {
    id: 'equiv-def-4',
    title: 'Partition',
    titleHe: 'חלוקה',
    content: 'Let I be an index set. {A_i | i ∈ I} is a partition of A if:\n1. For all i ∈ I: A_i ≠ ∅ (no empty set)\n2. For all i,j ∈ I with i ≠ j: A_i ∩ A_j = ∅ (disjoint sets)\n3. ∪(i∈I) A_i = A (union equals A)',
    contentHe: 'תהי I קבוצת אינדקסים. {A_i | i ∈ I} היא חלוקה של A אם:\n1. לכל i ∈ I: A_i ≠ ∅ (אין קבוצה ריקה)\n2. לכל i,j ∈ I המקיימים i ≠ j: A_i ∩ A_j = ∅ (כל שתי קבוצות שונות הן זרות)\n3. ∪(i∈I) A_i = A (איחוד כל הקבוצות הוא A)',
    examples: [
      {
        text: 'P₁ = {{1,3},{2},{4,6},{5}} is a partition of {1,2,3,4,5,6}',
        textHe: 'P₁ = {{1,3},{2},{4,6},{5}} היא חלוקה של {1,2,3,4,5,6}',
      },
      {
        text: 'P₂ = {{1,2,3,4},{4,5,6}} is NOT a partition (sets not disjoint)',
        textHe: 'P₂ = {{1,2,3,4},{4,5,6}} אינה חלוקה (הקבוצות לא זרות)',
      },
    ],
    source: 'הרצאה 12, עמוד 9',
    lecture: 12,
  },
];

export const equivalenceTheorems: RelationTheorem[] = [
  {
    id: 'equiv-thm-1',
    title: 'Structure Theorem - Part 1',
    titleHe: 'משפט המבנה - חלק 1',
    statement: 'Let R be an equivalence relation on A and let a,b ∈ A. Then: [a]_R = [b]_R ⟺ aRb',
    statementHe: 'יהי R יחס שקילות על קבוצה A ויהיו a,b ∈ A. אזי: [a]_R = [b]_R ⟺ aRb',
    proof: '(⟸) Assume aRb. We prove [a]_R = [b]_R by showing containment both ways.\nLet x ∈ [a]_R. By definition xRa. From aRb and transitivity, xRb. So x ∈ [b]_R.\nSymmetrically [b]_R ⊆ [a]_R. Therefore [a]_R = [b]_R.\n\n(⟹) Assume [a]_R = [b]_R. R is reflexive, so aRa. Thus a ∈ [a]_R = [b]_R. By definition of equivalence class, aRb.',
    proofHe: '(⟸) נניח aRb. נוכיח הכלה דו-כיוונית.\nיהי x ∈ [a]_R. מהגדרת מחלקת שקילות מתקיים xRa.\nמכך, מההנחה ומהיות R טרנזיטיבי, נסיק ש-xRb. מהגדרת מחלקת שקילות x ∈ [b]_R.\nבאופן סימטרי מוכיחים [b]_R ⊆ [a]_R. מהגדרת שוויון קבוצות [a]_R = [b]_R.\n\n(⟹) נניח [a]_R = [b]_R. R רפלקסיבי לכן aRa. מהגדרת מחלקת שקילות a ∈ [a]_R. מההנחה ומהגדרת שוויון קבוצות a ∈ [b]_R. מהגדרת מחלקת שקילות aRb.',
    source: 'הרצאה 12, עמוד 7',
    lecture: 12,
  },
  {
    id: 'equiv-thm-2',
    title: 'Structure Theorem - Part 2',
    titleHe: 'משפט המבנה - חלק 2',
    statement: 'Let R be an equivalence relation on A and let a,b ∈ A. Then: [a]_R ∩ [b]_R = ∅ ⟺ ¬(aRb)',
    statementHe: 'יהי R יחס שקילות על קבוצה A ויהיו a,b ∈ A. אזי: [a]_R ∩ [b]_R = ∅ ⟺ ¬(aRb)',
    proof: '(⟸) Assume ¬(aRb), and assume by contradiction [a]_R ∩ [b]_R ≠ ∅.\nThere exists x ∈ A such that x ∈ [a]_R ∩ [b]_R.\nBy definition: xRa ∧ xRb. By symmetry: aRx ∧ xRb.\nBy transitivity: aRb. Contradiction.\n\n(⟹) Assume [a]_R ∩ [b]_R = ∅, and assume by contradiction aRb.\nR is reflexive, so b ∈ [b]_R. From the contradiction assumption b ∈ [a]_R.\nSo b ∈ [a]_R ∩ [b]_R, contradicting the assumption.',
    proofHe: '(⟸) נניח ¬(aRb), ונניח בשלילה [a]_R ∩ [b]_R ≠ ∅.\nנובע שקיים x ∈ A כך ש-x ∈ [a]_R ∩ [b]_R.\nמהגדרת חיתוך: x ∈ [a]_R ∧ x ∈ [b]_R.\nמהגדרת מחלקת שקילות: xRa ∧ xRb.\nR סימטרי לכן aRx ∧ xRb. R טרנזיטיבי לכן aRb. בסתירה להנחה.\n\n(⟹) נניח [a]_R ∩ [b]_R = ∅, ונניח בשלילה aRb.\nR רפלקסיבי לכן b ∈ [b]_R. מההנחה בשלילה b ∈ [a]_R.\nמהגדרת חיתוך b ∈ [a]_R ∩ [b]_R. בסתירה להנחה.',
    source: 'הרצאה 12, עמוד 8',
    lecture: 12,
  },
  {
    id: 'equiv-thm-3',
    title: 'Partition and Equivalence Theorem',
    titleHe: 'משפט החלוקה ויחס השקילות',
    statement: 'Let A be a set. Then:\n1. If E is an equivalence relation on A, then A/E (quotient set) is a partition.\n2. For every partition P of A, the following relation is an equivalence relation:\nR = {(a,b) ∈ A×A | ∃S∈P(a ∈ S ∧ b ∈ S)}',
    statementHe: 'תהי A קבוצה. אזי:\n1. אם E הוא יחס שקילות על A אז A/E (קבוצת המנה) היא חלוקה.\n2. עבור כל חלוקה P של A, היחס הבא הוא יחס שקילות:\nR = {(a,b) ∈ A×A | ∃S∈P(a ∈ S ∧ b ∈ S)}',
    source: 'הרצאה 12, עמוד 10',
    lecture: 12,
  },
  {
    id: 'equiv-thm-4',
    title: 'Inverse of Equivalence Relation',
    titleHe: 'היפוך של יחס שקילות',
    statement: 'If R is an equivalence relation on A, then R⁻¹ is also an equivalence relation on A.',
    statementHe: 'אם R יחס שקילות על A אז גם R⁻¹ יחס שקילות.',
    proof: 'Assume R is an equivalence relation (reflexive, symmetric, transitive).\n\nR⁻¹ reflexive: Let a ∈ A. R is reflexive so aRa. By definition of R⁻¹: aR⁻¹a.\n\nR⁻¹ symmetric: Let a,b ∈ A with aR⁻¹b. By definition of R⁻¹: bRa. R is symmetric so aRb. By definition of R⁻¹: bR⁻¹a.\n\nR⁻¹ transitive: Let a,b,c ∈ A with aR⁻¹b ∧ bR⁻¹c. By definition: bRa ∧ cRb. By commutativity of ∧: cRb ∧ bRa. R is transitive so cRa. By definition: aR⁻¹c.',
    proofHe: 'נניח ש-R יחס שקילות, כלומר רפלקסיבי, סימטרי וטרנזיטיבי.\n\nR⁻¹ רפלקסיבי: יהי a ∈ A. R רפלקסיבי לכן aRa. מהגדרת R⁻¹: aR⁻¹a.\n\nR⁻¹ סימטרי: יהיו a,b ∈ A המקיימים aR⁻¹b. מהגדרת R⁻¹: bRa. R סימטרי לכן aRb. מהגדרת R⁻¹: bR⁻¹a.\n\nR⁻¹ טרנזיטיבי: יהיו a,b,c ∈ A המקיימים aR⁻¹b ∧ bR⁻¹c. מהגדרת R⁻¹: bRa ∧ cRb. לפי חילוף של ∧: cRb ∧ bRa. R טרנזיטיבי לכן cRa. מהגדרת R⁻¹: aR⁻¹c.',
    source: 'הרצאה 12, עמוד 14',
    lecture: 12,
  },
];

export const equivalenceExamples: RelationExample[] = [
  {
    id: 'equiv-ex-1',
    title: 'Proving Equivalence Relation - Even Sum',
    titleHe: 'הוכחת יחס שקילות - סכום זוגי',
    problem: 'Let R be a relation on Z defined as: aRb ⟺ (a+b) ∈ Z_even. Prove R is an equivalence relation.',
    problemHe: 'יהי R יחס מעל Z המוגדר באופן הבא: aRb ⟺ (a+b) ∈ Z_even. הוכיחו ש-R הוא יחס שקילות.',
    solution: 'R reflexive: Let a ∈ Z. 2a ∈ Z_even (since a is integer). So a+a ∈ Z_even. By definition: aRa.\n\nR symmetric: Let a,b ∈ Z with aRb. By definition: a+b ∈ Z_even. By commutativity: b+a ∈ Z_even. By definition: bRa.\n\nR transitive: Let a,b,c ∈ Z with aRb ∧ bRc. By definition: a+b ∈ Z_even ∧ b+c ∈ Z_even. Sum of evens is even: a+2b+c ∈ Z_even. Since 2b ∈ Z_even, difference of evens is even: a+c ∈ Z_even. By definition: aRc.',
    solutionHe: 'R רפלקסיבי: יהי a ∈ Z. ברור ש-2a ∈ Z_even (כי a שלם). כלומר a+a ∈ Z_even. מהגדרת R: aRa.\n\nR סימטרי: יהיו a,b ∈ Z המקיימים aRb. מהגדרת R: a+b ∈ Z_even. מחילוף בחיבור: b+a ∈ Z_even. מהגדרת R: bRa.\n\nR טרנזיטיבי: יהיו a,b,c ∈ Z המקיימים aRb ∧ bRc. מהגדרת R: a+b ∈ Z_even ∧ b+c ∈ Z_even. סכום זוגיים הוא זוגי לכן a+2b+c ∈ Z_even. ברור ש-2b ∈ Z_even (כי b שלם). הפרש זוגיים הוא זוגי לכן a+c ∈ Z_even. מהגדרת R: aRc.',
    source: 'הרצאה 12, עמוד 3',
    lecture: 12,
  },
  {
    id: 'equiv-ex-2',
    title: 'Finding Equivalence Classes - Even Sum',
    titleHe: 'מציאת מחלקות שקילות - סכום זוגי',
    problem: 'For R defined as aRb ⟺ (a+b) ∈ Z_even, find the equivalence classes and quotient set.',
    problemHe: 'עבור R המוגדר כ-aRb ⟺ (a+b) ∈ Z_even, מצאו את מחלקות השקילות ואת קבוצת המנה.',
    solution: '[1]_R = {a ∈ Z | aR1} = {a ∈ Z | a+1 ∈ Z_even} = Z_odd = {...,-3,-1,1,3,5,7,...}\n\n[2]_R = {a ∈ Z | aR2} = {a ∈ Z | a+2 ∈ Z_even} = Z_even = {...,-4,-2,0,2,4,6,...}\n\nNote that Z = [1]_R ∪ [2]_R, so we\'re done!\n\nZ/R = {[1]_R, [2]_R} = {[-4]_R, [117]_R} = {Z_odd, Z_even}',
    solutionHe: '[1]_R = {a ∈ Z | aR1} = {a ∈ Z | a+1 ∈ Z_even} = Z_odd = {...,-3,-1,1,3,5,7,...}\n\n[2]_R = {a ∈ Z | aR2} = {a ∈ Z | a+2 ∈ Z_even} = Z_even = {...,-4,-2,0,2,4,6,...}\n\nנשים לב ש-Z = [1]_R ∪ [2]_R ולכן סיימנו!\n\nZ/R = {[1]_R, [2]_R} = {[-4]_R, [117]_R} = {Z_odd, Z_even}',
    source: 'הרצאה 12, עמוד 5',
    lecture: 12,
  },
  {
    id: 'equiv-ex-3',
    title: 'Finding Equivalence Classes - Square Equality',
    titleHe: 'מציאת מחלקות שקילות - שוויון ריבועים',
    problem: 'Let E be an equivalence relation on Z defined as: xEy ⟺ x² = y². Find the equivalence classes and quotient set.',
    problemHe: 'יהי E יחס שקילות מעל Z המוגדר באופן הבא: xEy ⟺ x² = y². מצאו את מחלקות השקילות ואת קבוצת המנה.',
    solution: '[0]_E = {x ∈ Z | xE0} = {x ∈ Z | x² = 0²} = {0}\n\n[1]_E = {x ∈ Z | xE1} = {x ∈ Z | x² = 1²} = {1,-1}\n\n[2]_E = {x ∈ Z | xE2} = {x ∈ Z | x² = 2²} = {2,-2}\n\nGeneralizing: [a]_E = {x ∈ Z | xEa} = {x ∈ Z | x² = a²} = {a,-a}\n\nNote: We don\'t write a ∈ Z because that would have duplicates.\nThe quotient set: Z/E = {[a]_E | a ∈ N}',
    solutionHe: '[0]_E = {x ∈ Z | xE0} = {x ∈ Z | x² = 0²} = {0}\n\n[1]_E = {x ∈ Z | xE1} = {x ∈ Z | x² = 1²} = {1,-1}\n\n[2]_E = {x ∈ Z | xE2} = {x ∈ Z | x² = 2²} = {2,-2}\n\nנכליל: [a]_E = {x ∈ Z | xEa} = {x ∈ Z | x² = a²} = {a,-a}\n\nשימו לב: לא נכתוב a ∈ Z כי אז יש כפילויות של המחלקות. הדרישה היא לכתוב ללא כפילויות.\nקבוצת המנה: Z/E = {[a]_E | a ∈ N}',
    source: 'הרצאה 12, עמוד 6',
    lecture: 12,
  },
  {
    id: 'equiv-ex-4',
    title: 'Exam Question - Counting Equivalence Relations',
    titleHe: 'תרגיל ממבחן - ספירת יחסי שקילות',
    problem: 'Let A = {1,2,3,4,5,6}. How many equivalence relations on A contain {(1,2),(2,4),(3,3),(3,6),(5,5)} and are disjoint from {(2,6)}? Write explicitly the relation with maximum number of elements.',
    problemHe: 'תהי A = {1,2,3,4,5,6}. כמה יחסי שקילות על A מכילים את {(1,2),(2,4),(3,3),(3,6),(5,5)} וזרים ל-{(2,6)}? כתבו במפורש את היחס שבו מספר האיברים הוא הגדול ביותר.',
    solution: 'It\'s easier to think about partitions!\nElements in same equivalence class must be in same partition.\n\nFrom the pairs: 1,2,4 are in same class; 3,6 are in same class.\n(2,6) NOT in relation means 2 and 6 in different classes.\n\nPossible partitions:\nP₁ = {{1,2,4}, {3,6}, {5}} → |E₁| = 3² + 2² + 1² = 14\nP₂ = {{1,2,4,5}, {3,6}} → |E₂| = 4² + 2² = 20 ← Maximum!\nP₃ = {{1,2,4}, {3,5,6}} → |E₃| = 3² + 3² = 18\n\nAnswer: 3 equivalence relations.\n\nE₂ = {1,2,4,5}² ∪ {3,6}² = {(1,1),(1,2),(1,4),(1,5),(2,1),(2,2),(2,4),(2,5),(4,1),(4,2),(4,4),(4,5),(5,1),(5,2),(5,4),(5,5),(3,3),(3,6),(6,3),(6,6)}',
    solutionHe: 'הרבה יותר קל לחשוב על חלוקות שמקיימות את התנאים!\nנזכור שאיברים שהם זוג ביחס נמצאים באותה מחלקת שקילות.\n\nמהזוגות: 1,2,4 באותה מחלקה; 3,6 באותה מחלקה.\n(2,6) לא ביחס אומר ש-2 ו-6 במחלקות שונות.\n\nחלוקות אפשריות:\nP₁ = {{1,2,4}, {3,6}, {5}} → |E₁| = 3² + 2² + 1² = 14\nP₂ = {{1,2,4,5}, {3,6}} → |E₂| = 4² + 2² = 20 ← מקסימום!\nP₃ = {{1,2,4}, {3,5,6}} → |E₃| = 3² + 3² = 18\n\nתשובה: 3 יחסי שקילות.\n\nE₂ = {1,2,4,5}² ∪ {3,6}² = {(1,1),(1,2),(1,4),(1,5),(2,1),(2,2),(2,4),(2,5),(4,1),(4,2),(4,4),(4,5),(5,1),(5,2),(5,4),(5,5),(3,3),(3,6),(6,3),(6,6)}',
    source: 'הרצאה 12, עמוד 11',
    lecture: 12,
    isExamQuestion: true,
  },
  {
    id: 'equiv-ex-5',
    title: 'Exam Question - Quotient Set with Divisibility',
    titleHe: 'תרגיל ממבחן - קבוצת מנה עם חלוקה',
    problem: 'Let R be an equivalence relation on N defined as: mRn ⟺ 4|(n-m) ∨ n·m ∈ N_odd. Find N/R.',
    problemHe: 'יהי R יחס שקילות מעל N, המוגדר כך: mRn ⟺ 4|(n-m) ∨ n·m ∈ N_odd. כתבו במפורש את N/R.',
    solution: '[0]_R = {n ∈ N | nR0} = {n ∈ N | 4|(n-0) ∨ n·0 ∈ N_odd}\n= {n ∈ N | 4|n} = {0,4,8,12,...}\n\n[1]_R = {n ∈ N | nR1} = {n ∈ N | 4|(n-1) ∨ n·1 ∈ N_odd}\n= {1,3,5,7,...} ∪ {1,5,9,...} = N_odd = {1,3,5,7,...}\n\n[2]_R = {n ∈ N | nR2} = {n ∈ N | 4|(n-2) ∨ n·2 ∈ N_odd}\n= {2,6,10,14,...}\n\nNote: N = [0]_R ∪ [1]_R ∪ [2]_R, so we\'re done!\n\nN/R = {[0]_R, [1]_R, [2]_R}',
    solutionHe: '[0]_R = {n ∈ N | nR0} = {n ∈ N | 4|(n-0) ∨ n·0 ∈ N_odd}\n= {n ∈ N | 4|n} = {0,4,8,12,...}\n\n[1]_R = {n ∈ N | nR1} = {n ∈ N | 4|(n-1) ∨ n·1 ∈ N_odd}\n= {1,5,9,...} ∪ אי זוגיים = N_odd = {1,3,5,7,...}\n\n[2]_R = {n ∈ N | nR2} = {n ∈ N | 4|(n-2) ∨ n·2 ∈ N_odd}\n= {2,6,10,14,...}\n\nנשים לב ש-N = [0]_R ∪ [1]_R ∪ [2]_R ולכן סיימנו!\n\nN/R = {[0]_R, [1]_R, [2]_R}',
    source: 'הרצאה 12, עמוד 12',
    lecture: 12,
    isExamQuestion: true,
  },
  {
    id: 'equiv-ex-6',
    title: 'Exam Question - Equivalence Classes on Cartesian Product',
    titleHe: 'תרגיל ממבחן - מחלקות שקילות על מכפלה קרטזית',
    problem: 'Find the equivalence classes of E on A = {1,2,3}² defined as: (a,b)E(c,d) ⟺ (a+b) mod 3 = (c+d) mod 3.',
    problemHe: 'מצאו את מחלקות השקילות של יחס השקילות E על הקבוצה A = {1,2,3}² אשר מוגדר כך: (a,b)E(c,d) ⟺ (a+b) mod 3 = (c+d) mod 3.',
    solution: 'First calculate A: A = {(1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3)}\n\nTwo elements from A (two ordered pairs) are related if their sum leaves the same remainder when divided by 3.\n\nCalculate remainders:\n(1,1)→2, (1,2)→0, (1,3)→1, (2,1)→0, (2,2)→1, (2,3)→2, (3,1)→1, (3,2)→2, (3,3)→0\n\n[(1,2)]_E = {(1,2), (2,1), (3,3)} (remainder 0)\n[(1,3)]_E = {(1,3), (3,1), (2,2)} (remainder 1)\n[(1,1)]_E = {(1,1), (2,3), (3,2)} (remainder 2)\n\nNote: A = [(1,2)]_E ∪ [(1,3)]_E ∪ [(1,1)]_E, done!',
    solutionHe: 'נחשב את A: A = {(1,1),(1,2),(1,3),(2,1),(2,2),(2,3),(3,1),(3,2),(3,3)}\n\nשני איברים מ-A (שני זוגות סדורים) הם זוג ביחס אם סכום איברי הזוג משאיר אותה שארית בחלוקה ל-3.\n\nנבדוק איזו שארית מתקבלת מכל זוג:\n(1,1)→2, (1,2)→0, (1,3)→1, (2,1)→0, (2,2)→1, (2,3)→2, (3,1)→1, (3,2)→2, (3,3)→0\n\n[(1,2)]_E = {(1,2), (2,1), (3,3)} (שארית 0)\n[(1,3)]_E = {(1,3), (3,1), (2,2)} (שארית 1)\n[(1,1)]_E = {(1,1), (2,3), (3,2)} (שארית 2)\n\nנשים לב ש-A = [(1,2)]_E ∪ [(1,3)]_E ∪ [(1,1)]_E ולכן סיימנו!',
    source: 'הרצאה 12, עמוד 13',
    lecture: 12,
    isExamQuestion: true,
  },
];

export const equivalenceTechniques: RelationTechnique[] = [
  {
    id: 'equiv-tech-1',
    title: 'Proving Equivalence Relation',
    titleHe: 'הוכחת יחס שקילות',
    description: 'To prove R is an equivalence relation, prove all 3 properties. To disprove, show one property fails.',
    descriptionHe: 'כדי להוכיח ש-R הוא יחס שקילות, נוכיח את כל 3 התכונות. כדי להפריך, נפריך את אחת התכונות.',
    steps: [
      'Reflexive: Let a ∈ A. Show aRa.',
      'Symmetric: Let a,b ∈ A with aRb. Show bRa.',
      'Transitive: Let a,b,c ∈ A with aRb ∧ bRc. Show aRc.',
    ],
    stepsHe: [
      'רפלקסיבי: יהי a ∈ A. נוכיח aRa.',
      'סימטרי: יהיו a,b ∈ A המקיימים aRb. נוכיח bRa.',
      'טרנזיטיבי: יהיו a,b,c ∈ A המקיימים aRb ∧ bRc. נוכיח aRc.',
    ],
    source: 'הרצאה 12, עמוד 2',
    lecture: 12,
  },
  {
    id: 'equiv-tech-2',
    title: 'Finding Equivalence Classes',
    titleHe: 'מציאת מחלקות שקילות',
    description: 'Start with a representative element and find all elements related to it.',
    descriptionHe: 'נתחיל עם איבר מייצג ונמצא את כל האיברים הקשורים אליו.',
    steps: [
      'Choose a representative a ∈ A',
      'Calculate [a]_R = {b ∈ A | aRb} using the relation definition',
      'Repeat for elements not yet covered',
      'Verify that union of all classes equals A',
    ],
    stepsHe: [
      'נבחר מייצג a ∈ A',
      'נחשב [a]_R = {b ∈ A | aRb} לפי הגדרת היחס',
      'נחזור על התהליך עבור איברים שעדיין לא כוסו',
      'נוודא שאיחוד כל המחלקות שווה ל-A',
    ],
    source: 'הרצאה 12, עמודים 4-6',
    lecture: 12,
  },
  {
    id: 'equiv-tech-3',
    title: 'Counting Equivalence Relations via Partitions',
    titleHe: 'ספירת יחסי שקילות דרך חלוקות',
    description: 'Instead of thinking about all equivalence relations, think about partitions that satisfy the conditions.',
    descriptionHe: 'במקום לחשוב על כל יחסי השקילות, נחשוב על חלוקות שמקיימות את התנאים.',
    steps: [
      'Identify which elements must be in the same class (from given pairs)',
      'Identify which elements must be in different classes (from forbidden pairs)',
      'List all valid partitions',
      'For relation size: |R| = sum of squares of class sizes',
    ],
    stepsHe: [
      'נזהה אילו איברים חייבים להיות באותה מחלקה (מהזוגות הנתונים)',
      'נזהה אילו איברים חייבים להיות במחלקות שונות (מהזוגות האסורים)',
      'נמנה את כל החלוקות החוקיות',
      'לגודל היחס: |R| = סכום ריבועי גדלי המחלקות',
    ],
    source: 'הרצאה 12, עמוד 11',
    lecture: 12,
  },
];

// ==================== LECTURE 13: ORDER RELATIONS ====================

export const orderDefinitions: RelationDefinition[] = [
  {
    id: 'order-def-1',
    title: 'Weak Partial Order',
    titleHe: 'יחס סדר חלקי חלש',
    content: 'Let A be a set and R a relation on A. We say R is a weak partial order on A if:\n1. R is reflexive: ∀a∈A(aRa)\n2. R is anti-symmetric: ∀a,b∈A((aRb ∧ bRa) → a=b)\n3. R is transitive: ∀a,b,c∈A((aRb ∧ bRc) → aRc)',
    contentHe: 'תהי A קבוצה ויהי R יחס על A. נאמר ש-R יחס סדר חלקי חלש על A אם:\n1. R רפלקסיבי: ∀a∈A(aRa)\n2. R אנטי-סימטרי: ∀a,b∈A((aRb ∧ bRa) → a=b)\n3. R טרנזיטיבי: ∀a,b,c∈A((aRb ∧ bRc) → aRc)',
    notation: '≤, ≥, ⊆',
    source: 'הרצאה 13, עמוד 2',
    lecture: 13,
  },
  {
    id: 'order-def-2',
    title: 'Strong Partial Order',
    titleHe: 'יחס סדר חלקי חזק',
    content: 'Let A be a set and R a relation on A. We say R is a strong partial order on A if:\n1. R is anti-reflexive: ∀a∈A(¬aRa)\n2. R is asymmetric: ∀a,b∈A(aRb → ¬bRa)\n3. R is transitive: ∀a,b,c∈A((aRb ∧ bRc) → aRc)\n\nNote: Anti-reflexive follows directly from asymmetric!',
    contentHe: 'תהי A קבוצה ויהי R יחס על A. נאמר ש-R יחס סדר חלקי חזק על A אם:\n1. R אנטי-רפלקסיבי: ∀a∈A(¬aRa)\n2. R א-סימטרי: ∀a,b∈A(aRb → ¬bRa)\n3. R טרנזיטיבי: ∀a,b,c∈A((aRb ∧ bRc) → aRc)\n\nהערה: אנטי-רפלקסיבי נובע ישירות מא-סימטרי!',
    notation: '<, >, ⊂',
    source: 'הרצאה 13, עמוד 2',
    lecture: 13,
  },
  {
    id: 'order-def-3',
    title: 'Converting Between Weak and Strong Orders',
    titleHe: 'המרה בין יחס סדר חלש לחזק',
    content: 'If R is a weak partial order on A, then R* = R \\ {(x,x) | x ∈ A} is a strong partial order.\nIf R* is a strong partial order on A, then R = R* ∪ {(x,x) | x ∈ A} is a weak partial order.',
    contentHe: 'אם R הוא יחס סדר חלש על A אז R* = R \\ {(x,x) | x ∈ A} הוא יחס סדר חזק.\nאם R* הוא יחס סדר חזק על A אז R = R* ∪ {(x,x) | x ∈ A} הוא יחס סדר חלש.',
    source: 'הרצאה 13, עמוד 3',
    lecture: 13,
  },
  {
    id: 'order-def-4',
    title: 'Comparable Elements',
    titleHe: 'איברים ניתנים להשוואה',
    content: 'Let R be a partial order on A and let a,b ∈ A. We say a,b are comparable in R if aRb ∨ bRa.',
    contentHe: 'יהי R יחס סדר חלקי על קבוצה A ויהיו a,b ∈ A. נאמר ש-a,b ניתנים להשוואה ביחס אם aRb ∨ bRa.',
    source: 'הרצאה 13, עמוד 6',
    lecture: 13,
  },
  {
    id: 'order-def-5',
    title: 'Total (Linear) Order',
    titleHe: 'יחס סדר מלא (קווי)',
    content: 'R is a total (linear) order on A if every two distinct elements in A are comparable.\nFormally: ∀a,b∈A((a ≠ b) → (aRb ∨ bRa))',
    contentHe: 'נאמר ש-R יחס סדר מלא (קווי) על A אם כל שני איברים שונים ב-A ניתנים להשוואה ביחס.\nכלומר אם: ∀a,b∈A((a ≠ b) → (aRb ∨ bRa))',
    examples: [
      {
        text: '≤ on N is a total order',
        textHe: '≤ על N הוא יחס סדר מלא',
      },
      {
        text: '⊆ on P({1,2,3}) is NOT a total order ({1} and {2} are not comparable)',
        textHe: '⊆ על P({1,2,3}) אינו יחס סדר מלא ({1} ו-{2} לא ניתנים להשוואה)',
      },
    ],
    source: 'הרצאה 13, עמוד 6',
    lecture: 13,
  },
  {
    id: 'order-def-6',
    title: 'Minimal and Maximal Elements',
    titleHe: 'איברים מינימליים ומקסימליים',
    content: 'Let R be a partial order on A and let a ∈ A.\n• a is minimal if for all b ∈ A with b ≠ a: ¬(bRa) [no one below it]\n• a is maximal if for all b ∈ A with b ≠ a: ¬(aRb) [no one above it]',
    contentHe: 'יהי R יחס סדר חלקי על קבוצה A ויהי a ∈ A.\n• נאמר ש-a הוא איבר מינימלי אם לכל b ∈ A המקיים b ≠ a מתקיים ¬(bRa) [אין אף אחד מתחתיו]\n• נאמר ש-a הוא איבר מקסימלי אם לכל b ∈ A המקיים b ≠ a מתקיים ¬(aRb) [אין אף אחד מעליו]',
    source: 'הרצאה 13, עמוד 8',
    lecture: 13,
  },
  {
    id: 'order-def-7',
    title: 'Minimum and Maximum',
    titleHe: 'מינימום ומקסימום',
    content: 'Let R be a partial order on A and let a ∈ A.\n• a is the minimum if for all b ∈ A with b ≠ a: aRb [everyone is above it - root]\n• a is the maximum if for all b ∈ A with b ≠ a: bRa [everyone is below it - top]',
    contentHe: 'יהי R יחס סדר חלקי על קבוצה A ויהי a ∈ A.\n• נאמר ש-a הוא מינימום אם לכל b ∈ A המקיים b ≠ a מתקיים aRb [כולם מעליו - שורש]\n• נאמר ש-a הוא מקסימום אם לכל b ∈ A המקיים b ≠ a מתקיים bRa [כולם מתחתיו - צמרת]',
    source: 'הרצאה 13, עמוד 8',
    lecture: 13,
  },
  {
    id: 'order-def-8',
    title: 'Chain',
    titleHe: 'שרשרת',
    content: 'Let (A,R) be a partially ordered set. A set B ⊆ A is called a chain if every two distinct elements in B are comparable in R.\nFormally: ∀a,b∈B((a ≠ b) → (aRb ∨ bRa))',
    contentHe: 'תהי (A,R) קבוצה סדורה חלקית. קבוצה B ⊆ A נקראת שרשרת אם כל שני איברים שונים ב-B ניתנים להשוואה ביחס.\nכלומר: ∀a,b∈B((a ≠ b) → (aRb ∨ bRa))',
    source: 'הרצאה 13, עמוד 17',
    lecture: 13,
  },
  {
    id: 'order-def-9',
    title: 'Anti-chain',
    titleHe: 'אנטי-שרשרת',
    content: 'Let (A,R) be a partially ordered set. A set D ⊆ A is called an anti-chain if every two distinct elements in D are NOT comparable in R.\nFormally: ∀a,b∈D((a ≠ b) → ¬(aRb ∨ bRa))',
    contentHe: 'תהי (A,R) קבוצה סדורה חלקית. קבוצה D ⊆ A נקראת אנטי-שרשרת אם כל שני איברים שונים ב-D אינם ניתנים להשוואה ביחס.\nכלומר: ∀a,b∈D((a ≠ b) → ¬(aRb ∨ bRa))',
    source: 'הרצאה 13, עמוד 17',
    lecture: 13,
  },
  {
    id: 'order-def-10',
    title: 'Maximal Chain/Anti-chain',
    titleHe: 'שרשרת/אנטי-שרשרת מקסימלית',
    content: 'A chain/anti-chain is called maximal if there is no chain/anti-chain that properly contains it.',
    contentHe: 'שרשרת/אנטי-שרשרת נקראת מקסימלית אם אין שרשרת/אנטי-שרשרת שמכילה אותה ממש.',
    source: 'הרצאה 13, עמוד 17',
    lecture: 13,
  },
  {
    id: 'order-def-11',
    title: 'Transitive Closure',
    titleHe: 'סגור טרנזיטיבי',
    content: 'Let R be a relation on A. The transitive closure of R, denoted R⁺, is the minimal relation containing R that is transitive.\n\nEquivalently: aR⁺b ⟺ ∃a₁,a₂,...,aₖ∈A(aRa₁ ∧ a₁Ra₂ ∧ ... ∧ aₖ₋₁Raₖ ∧ aₖRb)',
    contentHe: 'יהי R יחס על A. הסגור הטרנזיטיבי של R, אשר יסומן R⁺, הוא היחס המינימלי המכיל את R, אשר הינו טרנזיטיבי.\n\nבאופן שקול: aR⁺b ⟺ ∃a₁,a₂,...,aₖ∈A(aRa₁ ∧ a₁Ra₂ ∧ ... ∧ aₖ₋₁Raₖ ∧ aₖRb)',
    examples: [
      {
        text: 'R = {(1,2),(2,3),(3,4)} → R⁺ = R ∪ {(1,3),(1,4),(2,4)}',
        textHe: 'R = {(1,2),(2,3),(3,4)} → R⁺ = R ∪ {(1,3),(1,4),(2,4)}',
      },
      {
        text: 'xRy ⟺ x = y+1 (successor) → xR⁺y ⟺ x > y',
        textHe: 'xRy ⟺ x = y+1 (עוקב) → xR⁺y ⟺ x > y',
      },
    ],
    source: 'הרצאה 13, עמוד 20',
    lecture: 13,
  },
];

export const orderTheorems: RelationTheorem[] = [
  {
    id: 'order-thm-1',
    title: 'Minimum is Unique Minimal',
    titleHe: 'מינימום הוא מינימלי יחיד',
    statement: 'Let R be a partial order on A and let a ∈ A.\n1. If a is the minimum, then it is the unique minimal element.\n2. If a is the maximum, then it is the unique maximal element.',
    statementHe: 'יהי R יחס סדר חלקי על קבוצה A ויהי a ∈ A.\n1. אם a הוא מינימום אז הוא מינימלי יחיד.\n2. אם a הוא מקסימום אז הוא מקסימלי יחיד.',
    proof: 'Proof that a is minimal: From the definition of minimum, for all b ≠ a: aRb. Since R is anti-symmetric or asymmetric, in any case ¬(bRa). By definition of minimal, a is minimal.\n\nProof of uniqueness: Assume by contradiction there exists m ∈ A with m ≠ a and m is also minimal. So for all b ≠ m: ¬(bRm). In particular, for a ∈ A with a ≠ m: ¬(aRm). But a is minimum, so aRm. Contradiction.',
    proofHe: 'הוכחה ש-a מינימלי: מהגדרת מינימום, לכל b ≠ a מתקיים aRb. מהיות R יחס סדר הרי שהוא אנטי סימטרי או א-סימטרי. כלומר בכל מקרה ¬(bRa). מהגדרת מינימלי מתקיים ש-a מינימלי.\n\nהוכחת יחידות: נניח בשלילה שקיים m ∈ A המקיים m ≠ a וכמו כן m מינימלי. לכן לכל b ∈ A המקיים b ≠ m מתקיים ¬(bRm). בפרט, עבור a ∈ A, המקיים a ≠ m מתקיים ¬(aRm). בסתירה לכך ש-a מינימום ולכן aRm.',
    source: 'הרצאה 13, עמודים 9-10',
    lecture: 13,
  },
  {
    id: 'order-thm-2',
    title: 'No Unique Minimal Implies No Minimum',
    titleHe: 'אין מינימלי יחיד אז אין מינימום',
    statement: '3. If there is no unique minimal element (none or more than one), then there is no minimum.\n4. If there is no unique maximal element (none or more than one), then there is no maximum.',
    statementHe: '3. אם אין מינימלי יחיד (אין בכלל או יש יותר מאחד) אז אין מינימום.\n4. אם אין מקסימלי יחיד (אין בכלל או יש יותר מאחד) אז אין מקסימום.',
    proof: 'These are the contrapositive of theorems 1 and 2.',
    proofHe: 'משפטים 3,4 הם קונטרה פוזיטיב של משפטים 1,2 בהתאמה.',
    source: 'הרצאה 13, עמוד 9',
    lecture: 13,
  },
  {
    id: 'order-thm-3',
    title: 'Unique Minimal on Finite Set',
    titleHe: 'מינימלי יחיד בקבוצה סופית',
    statement: 'In a partial order defined on a finite set, a unique minimal element IS the minimum.',
    statementHe: 'ביחס סדר המוגדר על קבוצה סופית מינימלי יחיד הוא מינימום.',
    proof: 'Note: This is NOT true for infinite sets! See counterexample with -1 and N.',
    proofHe: 'הערה: זה לא נכון לקבוצות אינסופיות! ראו דוגמה נגדית עם -1 ו-N.',
    source: 'הרצאה 13, עמוד 11',
    lecture: 13,
  },
];

export const orderExamples: RelationExample[] = [
  {
    id: 'order-ex-1',
    title: 'Hasse Diagram - Divisibility',
    titleHe: 'דיאגרמת הסה - יחס החלוקה',
    problem: 'Draw the Hasse diagram for the divisibility relation on A = {1,2,3,5,7,10,15,30}. Find minimals, maximals, minimum, maximum, and determine if total.',
    problemHe: 'ציירו דיאגרמת הסה עבור יחס החלוקה על A = {1,2,3,5,7,10,15,30}. מצאו מינימליים, מקסימליים, מינימום, מקסימום, וקבעו אם מלא.',
    solution: 'Minimals: 1\nMaximals: 7, 30\nMinimum: 1\nMaximum: None (7 and 30 are not comparable)\nTotal? No! (e.g., 2 and 3 are not comparable)',
    solutionHe: 'מינימליים: 1\nמקסימליים: 7, 30\nמינימום: 1\nמקסימום: אין (7 ו-30 לא ניתנים להשוואה)\nמלא? לא! (למשל 2 ו-3 לא ניתנים להשוואה)',
    source: 'הרצאה 13, עמוד 4',
    lecture: 13,
  },
  {
    id: 'order-ex-2',
    title: 'Hasse Diagram - ≥ on N',
    titleHe: 'דיאגרמת הסה - ≥ על N',
    problem: 'Analyze the ≥ relation on N: Find minimals, maximals, minimum, maximum, and determine if total.',
    problemHe: 'נתחו את היחס ≥ על N: מצאו מינימליים, מקסימליים, מינימום, מקסימום, וקבעו אם מלא.',
    solution: 'Minimals: None (N is infinite going up)\nMaximals: 0 (the smallest natural number)\nMinimum: None\nMaximum: 0\nTotal? Yes! For any two different naturals, one is greater.',
    solutionHe: 'מינימליים: אין (N אינסופית למעלה)\nמקסימליים: 0 (המספר הטבעי הקטן ביותר)\nמינימום: אין\nמקסימום: 0\nמלא? כן! לכל שני טבעיים שונים, אחד גדול מהשני.',
    source: 'הרצאה 13, עמוד 5',
    lecture: 13,
  },
  {
    id: 'order-ex-3',
    title: 'Hasse Diagram - ⊆ on P({1,2,3})\\{∅}',
    titleHe: 'דיאגרמת הסה - ⊆ על P({1,2,3})\\{∅}',
    problem: 'Analyze the ⊆ relation on P({1,2,3})\\{∅}: Find minimals, maximals, minimum, maximum, and determine if total.',
    problemHe: 'נתחו את היחס ⊆ על P({1,2,3})\\{∅}: מצאו מינימליים, מקסימליים, מינימום, מקסימום, וקבעו אם מלא.',
    solution: 'Minimals: {1}, {2}, {3}\nMaximals: {1,2,3}\nMinimum: None (3 minimals, not unique)\nMaximum: {1,2,3}\nTotal? No! ({1} and {2} are not comparable)',
    solutionHe: 'מינימליים: {1}, {2}, {3}\nמקסימליים: {1,2,3}\nמינימום: אין (3 מינימליים, לא יחיד)\nמקסימום: {1,2,3}\nמלא? לא! ({1} ו-{2} לא ניתנים להשוואה)',
    source: 'הרצאה 13, עמוד 5',
    lecture: 13,
  },
  {
    id: 'order-ex-4',
    title: 'Proving Order is Not Total',
    titleHe: 'הוכחה שיחס סדר אינו מלא',
    problem: 'Give examples (without explanation) to show these orders are not total:\n1. R₁ on P(A)×P(A) where A={1,2,3,4,5}: (B,C)R₁(D,E) ⟺ B⊆D ∧ C⊆E\n2. R₂ on continuous functions on [0,1]: fR₂g ⟺ ∀x∈[0,1](f(x)≤g(x))\n3. R₃ on finite binary words: w₁R₃w₂ ⟺ w₁ is prefix of w₂',
    problemHe: 'תנו דוגמה (ללא הסבר) לכך שיחסי הסדר הבאים אינם מלאים:\n1. R₁ על P(A)×P(A) כאשר A={1,2,3,4,5}: (B,C)R₁(D,E) ⟺ B⊆D ∧ C⊆E\n2. R₂ על הפונקציות הרציפות בקטע [0,1]: fR₂g ⟺ ∀x∈[0,1](f(x)≤g(x))\n3. R₃ על המילים הבינאריות הסופיות: w₁R₃w₂ ⟺ w₁ היא תחילית של w₂',
    solution: '1. (B,C) = ({1},{2}), (D,E) = ({3},{4})\n2. f(x) = x, g(x) = 1-x\n3. w₁ = 1, w₂ = 0',
    solutionHe: '1. (B,C) = ({1},{2}), (D,E) = ({3},{4})\n2. f(x) = x, g(x) = 1-x\n3. w₁ = 1, w₂ = 0',
    source: 'הרצאה 13, עמוד 7',
    lecture: 13,
  },
  {
    id: 'order-ex-5',
    title: 'Exam Question - Modifying Order Relations',
    titleHe: 'תרגיל ממבחן - שינוי יחסי סדר',
    problem: 'Let A = {2,3,4,6,12} and S = {(x,y) ∈ A×A | x|y}.\na. Write a total order on A that contains S.\nb. Write an order on A that is contained in S and has exactly 3 minimal elements.',
    problemHe: 'תהי A = {2,3,4,6,12}. תהי S = {(x,y) ∈ A×A | x|y}.\nא. כתבו יחס סדר מלא על A שמכיל את S.\nב. כתבו יחס סדר על A שמוכל ב-S ושיש לו בדיוק שלושה איברים מינימליים.',
    solution: 'a. S is not total because some pairs are not comparable. Add pairs to make it total:\nR₁ = S ∪ {(2,3), (3,4), (4,6)}\n\nb. Currently S has 2 minimal elements (2 and 3). Remove pairs to get 3 minimals:\nR₂ = S \\ {(2,4)}\nMinimal elements are: 2, 3, 4',
    solutionHe: 'א. S זה לא יחס מלא כי יש זוגות שלא ניתנים להשוואה ביחס. נוסיף זוגות כנדרש:\nR₁ = S ∪ {(2,3), (3,4), (4,6)}\n\nב. כרגע יש שני איברים מינימליים (2 ו-3). נוריד זוגות כנדרש:\nR₂ = S \\ {(2,4)}\nהאיברים המינימליים הם: 2, 3, 4',
    source: 'הרצאה 13, עמוד 12',
    lecture: 13,
    isExamQuestion: true,
  },
  {
    id: 'order-ex-6',
    title: 'Chains and Anti-chains Example',
    titleHe: 'דוגמה לשרשראות ואנטי-שרשראות',
    problem: 'For the given order on A = {1,2,3,...,9}, find chains and anti-chains and determine if they are maximal.',
    problemHe: 'עבור יחס הסדר הנתון על A = {1,2,3,...,9}, מצאו שרשראות ואנטי-שרשראות וקבעו אם הן מקסימליות.',
    solution: 'Example chains:\n{1,2,3,4} - maximal\n{1,8,9} - maximal\n{3,4} - NOT maximal\n{5} - NOT maximal\n{1,2,5,7} - maximal\n{2,3,6} - NOT maximal\n\nExample anti-chains:\n{4,6,7,9} - maximal\n{4,6,7,8} - maximal\n{1} - maximal (only element at that level)\n{5} - NOT maximal\n{2,8} - maximal\n{4,6} - NOT maximal\n\n{5,7,8} - neither chain nor anti-chain!',
    solutionHe: 'דוגמאות לשרשראות:\n{1,2,3,4} - מקסימלית\n{1,8,9} - מקסימלית\n{3,4} - לא מקסימלית\n{5} - לא מקסימלית\n{1,2,5,7} - מקסימלית\n{2,3,6} - לא מקסימלית\n\nדוגמאות לאנטי-שרשראות:\n{4,6,7,9} - מקסימלית\n{4,6,7,8} - מקסימלית\n{1} - מקסימלית\n{5} - לא מקסימלית\n{2,8} - מקסימלית\n{4,6} - לא מקסימלית\n\n{5,7,8} - לא שרשרת ולא אנטי-שרשרת!',
    source: 'הרצאה 13, עמוד 18',
    lecture: 13,
  },
  {
    id: 'order-ex-7',
    title: 'Exam Question - Infinite Anti-chain',
    titleHe: 'תרגיל ממבחן - אנטי-שרשרת אינסופית',
    problem: 'Let B be the set of non-empty binary words (finite length, at least 1). Define partial order R on B: w₁Rw₂ if w₁ is a prefix of w₂. Find an infinite anti-chain D ⊆ B and prove your claim.',
    problemHe: 'תהי B קבוצת המילים הבינאריות שאינן ריקות (כלומר אורכן סופי ולפחות 1). נגדיר יחס סדר חלקי R על הקבוצה B באופן הבא: w₁Rw₂ אם w₁ היא תחילית (prefix) של w₂. מצאו אנטי-שרשרת אינסופית D ⊆ B והוכיחו את קביעתכם.',
    solution: 'D = {01, 001, 0001, 00001, ...}\n\nClearly D is infinite. We prove it\'s an anti-chain:\nLet W₁, W₂ ∈ D with W₁ ≠ W₂.\nW₁, W₂ are of the form 0...01 where m,n ∈ N\\{0} and WLOG m > n.\n\nW₂ ≮ W₁: W₂ is longer than W₁, so cannot be its prefix.\nW₁ ≮ W₂: Look at position n+1. In W₁ there is 1, in W₂ there is 0 (since it has at least 1 more zero).\n\nThus, any two distinct elements are not comparable, so D is an anti-chain.',
    solutionHe: 'D = {01, 001, 0001, 00001, ...}\n\nברור מההגדרה ש-D אינסופית. נוכיח שהיא אנטי-שרשרת:\nתהיינה W₁, W₂ ∈ D המקיימות W₁ ≠ W₂.\nW₁, W₂ הן מהצורה 0...01 כאשר m,n ∈ N\\{0} ונניח בה״כ ש-m > n.\n\nW₂ ⊀ W₁: כי W₂ ארוכה מ-W₁ ולכן לא יכולה להיות תחילית שלה.\nW₁ ⊀ W₂: נתבונן במקום ה-n+1. ב-W₁ יש 1 וב-W₂ יש 0 (כי מספר האפסים בה ארוך לפחות ב-1).\n\nמכאן, שכל שני איברים שונים אינם ניתנים להשוואה ביחס ו-D אנטי שרשרת.',
    source: 'הרצאה 13, עמוד 19',
    lecture: 13,
    isExamQuestion: true,
  },
  {
    id: 'order-ex-8',
    title: 'Order Relation with Two Conditions',
    titleHe: 'יחס סדר עם שני תנאים',
    problem: 'Define relation R on (N\\{0})² as: (x₁,y₁)R(x₂,y₂) ⟺ x₁ ≤ x₂ ∧ y₁|y₂.\na. Prove R is not total.\nb. Prove R is a partial order.\nc. Find minimal, maximal, minimum, maximum elements.',
    problemHe: 'נגדיר את היחס R מעל (N\\{0})² באופן הבא: (x₁,y₁)R(x₂,y₂) ⟺ x₁ ≤ x₂ ∧ y₁|y₂.\nא. הוכיחו שהיחס אינו מלא.\nב. הוכיחו ש-R יחס סדר חלקי.\nג. מצאו איברים מינימליים ומקסימליים, מינימום ומקסימום.',
    solution: 'a. Not total: Choose (1,2), (1,3) ∈ (N\\{0})². Clearly (1,2) ≠ (1,3).\n3 ∤ 2 so (1,2) ⊀ (1,3). 2 ∤ 3 so (1,3) ⊀ (1,2).\nThus (1,2),(1,3) are not comparable.\n\nb. R reflexive: Let (x,y) ∈ (N\\{0})². Clearly x ≤ x ∧ y|y. By definition: (x,y)R(x,y).\n\nR anti-symmetric: Let (x₁,y₁),(x₂,y₂) ∈ (N\\{0})² with (x₁,y₁)R(x₂,y₂) ∧ (x₂,y₂)R(x₁,y₁).\nBy definition: x₁ ≤ x₂ ∧ y₁|y₂ ∧ x₂ ≤ x₁ ∧ y₂|y₁.\nSince ≤ is anti-symmetric: x₁ = x₂.\nSince | is anti-symmetric on N\\{0}: y₁ = y₂.\nThus (x₁,y₁) = (x₂,y₂).\n\nR transitive: Similar using transitivity of ≤ and |.\n\nc. Minimum: (1,1) - prove for all (x,y): 1 ≤ x ∧ 1|y.\nMinimals: (1,1) is the unique minimal (since it\'s minimum).\nMaximals: None (for any (x,y), (x+1,2y) is above it).\nMaximum: None (no maximals means no maximum).',
    solutionHe: 'א. לא מלא: נבחר את (1,2),(1,3) ∈ (N\\{0})². ברור ש-(1,2) ≠ (1,3).\n3 ∤ 2 לכן לפי הגדרת R: (1,2) ⊀ (1,3). 2 ∤ 3 לכן לפי הגדרת R: (1,3) ⊀ (1,2).\nכלומר (1,2),(1,3) אינם ניתנים להשוואה ביחס.\n\nב. R רפלקסיבי: יהי (x,y) ∈ (N\\{0})². ברור שמתקיים x ≤ x ∧ y|y. לכן לפי הגדרת R: (x,y)R(x,y).\n\nR אנטי-סימטרי: יהיו (x₁,y₁),(x₂,y₂) ∈ (N\\{0})² המקיימים (x₁,y₁)R(x₂,y₂) ∧ (x₂,y₂)R(x₁,y₁).\nמהגדרת R: x₁ ≤ x₂ ∧ y₁|y₂ ∧ x₂ ≤ x₁ ∧ y₂|y₁.\nמהיות היחס ≤ אנטי-סימטרי נסיק x₁ = x₂.\nמהיות היחס | אנטי-סימטרי על N\\{0} נסיק y₁ = y₂.\nמהגדרת שוויון זוגות סדורים: (x₁,y₁) = (x₂,y₂).\n\nR טרנזיטיבי: באופן דומה עם טרנזיטיביות של ≤ ו-|.\n\nג. מינימום: (1,1) - נוכיח שלכל (x,y): 1 ≤ x ∧ 1|y.\nמינימליים: (1,1) מינימלי יחיד (כי הוא מינימום).\nמקסימליים: אין (לכל (x,y), (x+1,2y) מעליו).\nמקסימום: אין (אין מקסימליים אז אין מקסימום).',
    source: 'הרצאה 13, עמודים 13-16',
    lecture: 13,
    isExamQuestion: true,
  },
];

export const orderTechniques: RelationTechnique[] = [
  {
    id: 'order-tech-1',
    title: 'Drawing Hasse Diagrams',
    titleHe: 'ציור דיאגרמת הסה',
    description: 'Hasse diagrams visually represent partial orders.',
    descriptionHe: 'דיאגרמת הסה מייצגת יחסי סדר באופן ויזואלי.',
    steps: [
      'If a is left of b in the relation (aRb), then a is below b in the diagram',
      'Draw direct edge between elements that are related with no element in between',
      'Do not draw self-loops even if the relation is reflexive',
    ],
    stepsHe: [
      'אם a משמאל ל-b ביחס (aRb), אז a מתחת ל-b בדיאגרמה',
      'נצייר חץ/קו ישיר בין כל שני איברים שהם זוג ביחס ואין ביניהם "מתווך"',
      'לא נצייר חץ מאיבר לעצמו גם אם היחס רפלקסיבי',
    ],
    source: 'הרצאה 13, עמוד 4',
    lecture: 13,
  },
  {
    id: 'order-tech-2',
    title: 'Proving Order is Total',
    titleHe: 'הוכחה שיחס סדר הוא מלא',
    description: 'Write a general proof following the definition.',
    descriptionHe: 'נכתוב הוכחה כללית לפי ההגדרה.',
    steps: [
      'Let a,b ∈ A',
      'Assume: a ≠ b',
      'Prove: aRb ∨ bRa',
    ],
    stepsHe: [
      'יהיו a,b ∈ A',
      'נניח: a ≠ b',
      'נוכיח: aRb ∨ bRa',
    ],
    source: 'הרצאה 13, עמוד 6',
    lecture: 13,
  },
  {
    id: 'order-tech-3',
    title: 'Proving Order is NOT Total',
    titleHe: 'הוכחה שיחס סדר אינו מלא',
    description: 'Give a specific counterexample.',
    descriptionHe: 'ניתן דוגמה ספציפית לשני איברים שונים ב-A שלא ניתנים להשוואה ביחס.',
    steps: [
      'Find a,b ∈ A with a ≠ b',
      'Show: ¬(aRb) ∧ ¬(bRa)',
    ],
    stepsHe: [
      'נמצא a,b ∈ A המקיימים a ≠ b',
      'נראה: ¬(aRb) ∧ ¬(bRa)',
    ],
    source: 'הרצאה 13, עמוד 6',
    lecture: 13,
  },
  {
    id: 'order-tech-4',
    title: 'Finding Special Elements Strategy',
    titleHe: 'אסטרטגיה למציאת איברים מיוחדים',
    description: 'Use theorems to save work when finding min/max/minimal/maximal elements.',
    descriptionHe: 'נשתמש במשפטים כדי לחסוך עבודה במציאת איברים מינימליים/מקסימליים/מינימום/מקסימום.',
    steps: [
      'If there is minimum/maximum, find it first - then by theorem it\'s the unique minimal/maximal',
      'If there are multiple minimals/maximals (or none), find them first - then by theorem there is no minimum/maximum',
    ],
    stepsHe: [
      'אם יש מינימום/מקסימום, נמצא אותו קודם - אז לפי משפט הוא מינימלי/מקסימלי יחיד',
      'אם יש כמה מינימליים/מקסימליים (או שאין בכלל), נמצא אותם קודם - אז לפי משפט אין מינימום/מקסימום',
    ],
    source: 'הרצאה 13, עמוד 9',
    lecture: 13,
  },
];

// Helper functions
export function getAllDefinitions(): RelationDefinition[] {
  return [...equivalenceDefinitions, ...orderDefinitions];
}

export function getAllTheorems(): RelationTheorem[] {
  return [...equivalenceTheorems, ...orderTheorems];
}

export function getAllExamples(): RelationExample[] {
  return [...equivalenceExamples, ...orderExamples];
}

export function getAllTechniques(): RelationTechnique[] {
  return [...equivalenceTechniques, ...orderTechniques];
}

export function getExamQuestions(): RelationExample[] {
  return getAllExamples().filter(ex => ex.isExamQuestion);
}

export function getLecture12Content() {
  return {
    definitions: equivalenceDefinitions,
    theorems: equivalenceTheorems,
    examples: equivalenceExamples,
    techniques: equivalenceTechniques,
  };
}

export function getLecture13Content() {
  return {
    definitions: orderDefinitions,
    theorems: orderTheorems,
    examples: orderExamples,
    techniques: orderTechniques,
  };
}
