// All relation properties with definitions, proof templates, and examples

export interface RelationProperty {
  id: string;
  name: string;
  nameHe: string;
  symbol: string;
  definition: string;
  definitionHe: string;
  formalDefinition: string;
  negation: string;
  negationHe: string;
  proofTemplate: string[];
  proofTemplateHe: string[];
  disproveTemplate: string[];
  disproveTemplateHe: string[];
  examples: {
    relation: string;
    set: string;
    isProperty: boolean;
    explanation: string;
    explanationHe: string;
  }[];
  tips: string[];
  tipsHe: string[];
}

export const relationProperties: RelationProperty[] = [
  {
    id: 'reflexive',
    name: 'Reflexive',
    nameHe: 'רפלקסיבי',
    symbol: '∀a∈A: aRa',
    definition: 'Every element is related to itself',
    definitionHe: 'כל איבר קשור לעצמו',
    formalDefinition: '∀a∈A(aRa)',
    negation: 'There exists an element not related to itself',
    negationHe: 'קיים איבר שלא קשור לעצמו',
    proofTemplate: [
      'Let a ∈ A',
      'Show that aRa using the relation definition',
      'Conclude: R is reflexive',
    ],
    proofTemplateHe: [
      'יהי a ∈ A',
      'נוכיח ש-aRa לפי הגדרת היחס',
      'מסקנה: R רפלקסיבי',
    ],
    disproveTemplate: [
      'Find specific a ∈ A',
      'Show that (a,a) ∉ R',
      'Conclude: R is not reflexive',
    ],
    disproveTemplateHe: [
      'נמצא a ∈ A ספציפי',
      'נראה ש-(a,a) ∉ R',
      'מסקנה: R לא רפלקסיבי',
    ],
    examples: [
      {
        relation: '≤ on ℕ',
        set: 'ℕ',
        isProperty: true,
        explanation: 'For all n ∈ ℕ: n ≤ n ✓',
        explanationHe: 'לכל n ∈ ℕ: n ≤ n ✓',
      },
      {
        relation: '< on ℕ',
        set: 'ℕ',
        isProperty: false,
        explanation: '1 < 1 is false ✗',
        explanationHe: '1 < 1 שקר ✗',
      },
      {
        relation: '= on any set',
        set: 'A',
        isProperty: true,
        explanation: 'For all a: a = a ✓',
        explanationHe: 'לכל a: a = a ✓',
      },
      {
        relation: '⊆ on P(A)',
        set: 'P(A)',
        isProperty: true,
        explanation: 'For all B ⊆ A: B ⊆ B ✓',
        explanationHe: 'לכל B ⊆ A: B ⊆ B ✓',
      },
    ],
    tips: [
      'Check if diagonal elements (a,a) are in R',
      'In matrix representation: check if all diagonal entries are 1',
    ],
    tipsHe: [
      'בדקו אם איברי האלכסון (a,a) נמצאים ב-R',
      'בייצוג מטריצה: בדקו אם כל האלכסון הוא 1',
    ],
  },
  {
    id: 'antireflexive',
    name: 'Anti-reflexive (Irreflexive)',
    nameHe: 'אנטי-רפלקסיבי',
    symbol: '∀a∈A: ¬(aRa)',
    definition: 'No element is related to itself',
    definitionHe: 'אף איבר לא קשור לעצמו',
    formalDefinition: '∀a∈A(¬aRa)',
    negation: 'There exists an element related to itself',
    negationHe: 'קיים איבר שקשור לעצמו',
    proofTemplate: [
      'Let a ∈ A',
      'Show that ¬(aRa) - that is, (a,a) ∉ R',
      'Conclude: R is anti-reflexive',
    ],
    proofTemplateHe: [
      'יהי a ∈ A',
      'נוכיח ש-¬(aRa) - כלומר (a,a) ∉ R',
      'מסקנה: R אנטי-רפלקסיבי',
    ],
    disproveTemplate: [
      'Find specific a ∈ A',
      'Show that (a,a) ∈ R',
      'Conclude: R is not anti-reflexive',
    ],
    disproveTemplateHe: [
      'נמצא a ∈ A ספציפי',
      'נראה ש-(a,a) ∈ R',
      'מסקנה: R לא אנטי-רפלקסיבי',
    ],
    examples: [
      {
        relation: '< on ℕ',
        set: 'ℕ',
        isProperty: true,
        explanation: 'For all n: n < n is false ✓',
        explanationHe: 'לכל n: n < n שקר ✓',
      },
      {
        relation: '≤ on ℕ',
        set: 'ℕ',
        isProperty: false,
        explanation: '1 ≤ 1 is true ✗',
        explanationHe: '1 ≤ 1 אמת ✗',
      },
      {
        relation: '≠ on any set',
        set: 'A',
        isProperty: true,
        explanation: 'For all a: a ≠ a is false, so ¬(aRa) ✓',
        explanationHe: 'לכל a: a ≠ a שקר, לכן ¬(aRa) ✓',
      },
      {
        relation: '⊂ (proper subset)',
        set: 'P(A)',
        isProperty: true,
        explanation: 'No set is a proper subset of itself ✓',
        explanationHe: 'אין קבוצה שהיא תת-קבוצה ממש של עצמה ✓',
      },
    ],
    tips: [
      'Opposite of reflexive (but a relation can be neither!)',
      'In matrix: all diagonal entries must be 0',
    ],
    tipsHe: [
      'הפוך מרפלקסיבי (אבל יחס יכול להיות לא זה ולא זה!)',
      'במטריצה: כל האלכסון חייב להיות 0',
    ],
  },
  {
    id: 'symmetric',
    name: 'Symmetric',
    nameHe: 'סימטרי',
    symbol: '∀a,b∈A: aRb → bRa',
    definition: 'If a is related to b, then b is related to a',
    definitionHe: 'אם a קשור ל-b, אז b קשור ל-a',
    formalDefinition: '∀a,b∈A(aRb → bRa)',
    negation: 'There exist a,b where aRb but not bRa',
    negationHe: 'קיימים a,b כך ש-aRb אבל לא bRa',
    proofTemplate: [
      'Let a,b ∈ A such that aRb',
      'Show that bRa using the relation definition',
      'Conclude: R is symmetric',
    ],
    proofTemplateHe: [
      'יהיו a,b ∈ A המקיימים aRb',
      'נוכיח ש-bRa לפי הגדרת היחס',
      'מסקנה: R סימטרי',
    ],
    disproveTemplate: [
      'Find specific a,b ∈ A',
      'Show that aRb but ¬(bRa)',
      'Conclude: R is not symmetric',
    ],
    disproveTemplateHe: [
      'נמצא a,b ∈ A ספציפיים',
      'נראה ש-aRb אבל ¬(bRa)',
      'מסקנה: R לא סימטרי',
    ],
    examples: [
      {
        relation: '= on any set',
        set: 'A',
        isProperty: true,
        explanation: 'If a = b then b = a ✓',
        explanationHe: 'אם a = b אז b = a ✓',
      },
      {
        relation: '≤ on ℕ',
        set: 'ℕ',
        isProperty: false,
        explanation: '1 ≤ 2 but 2 ≤ 1 is false ✗',
        explanationHe: '1 ≤ 2 אבל 2 ≤ 1 שקר ✗',
      },
      {
        relation: '"same parity" on ℤ',
        set: 'ℤ',
        isProperty: true,
        explanation: 'If a,b have same parity, so do b,a ✓',
        explanationHe: 'אם ל-a,b אותה זוגיות, גם ל-b,a ✓',
      },
      {
        relation: '"x divides y" on ℕ',
        set: 'ℕ',
        isProperty: false,
        explanation: '2|4 but 4∤2 ✗',
        explanationHe: '2|4 אבל 4∤2 ✗',
      },
    ],
    tips: [
      'In matrix: must be symmetric matrix (M = M^T)',
      'In graph: every edge goes both directions',
    ],
    tipsHe: [
      'במטריצה: חייבת להיות מטריצה סימטרית (M = M^T)',
      'בגרף: כל קשת הולכת לשני הכיוונים',
    ],
  },
  {
    id: 'antisymmetric',
    name: 'Anti-symmetric',
    nameHe: 'אנטי-סימטרי',
    symbol: '∀a,b∈A: (aRb ∧ bRa) → a=b',
    definition: 'If a is related to b AND b is related to a, then a equals b',
    definitionHe: 'אם a קשור ל-b וגם b קשור ל-a, אז a שווה ל-b',
    formalDefinition: '∀a,b∈A((aRb ∧ bRa) → a=b)',
    negation: 'There exist a≠b where aRb and bRa',
    negationHe: 'קיימים a≠b כך ש-aRb וגם bRa',
    proofTemplate: [
      'Let a,b ∈ A such that aRb ∧ bRa',
      'Show that a = b',
      'Conclude: R is anti-symmetric',
    ],
    proofTemplateHe: [
      'יהיו a,b ∈ A המקיימים aRb ∧ bRa',
      'נוכיח ש-a = b',
      'מסקנה: R אנטי-סימטרי',
    ],
    disproveTemplate: [
      'Find specific a,b ∈ A with a ≠ b',
      'Show that aRb and bRa',
      'Conclude: R is not anti-symmetric',
    ],
    disproveTemplateHe: [
      'נמצא a,b ∈ A ספציפיים עם a ≠ b',
      'נראה ש-aRb וגם bRa',
      'מסקנה: R לא אנטי-סימטרי',
    ],
    examples: [
      {
        relation: '≤ on ℕ',
        set: 'ℕ',
        isProperty: true,
        explanation: 'If a ≤ b and b ≤ a then a = b ✓',
        explanationHe: 'אם a ≤ b וגם b ≤ a אז a = b ✓',
      },
      {
        relation: '⊆ on P(A)',
        set: 'P(A)',
        isProperty: true,
        explanation: 'If A ⊆ B and B ⊆ A then A = B ✓',
        explanationHe: 'אם A ⊆ B וגם B ⊆ A אז A = B ✓',
      },
      {
        relation: '"x divides y" on ℕ\\{0}',
        set: 'ℕ\\{0}',
        isProperty: true,
        explanation: 'If a|b and b|a then a = b ✓',
        explanationHe: 'אם a|b וגם b|a אז a = b ✓',
      },
      {
        relation: '"same parity" on ℤ',
        set: 'ℤ',
        isProperty: false,
        explanation: '2 and 4 have same parity both ways, but 2 ≠ 4 ✗',
        explanationHe: '2 ו-4 באותה זוגיות בשני הכיוונים, אבל 2 ≠ 4 ✗',
      },
    ],
    tips: [
      'NOT the opposite of symmetric!',
      'A relation can be both symmetric AND anti-symmetric (e.g., =)',
      'Key for partial order relations',
    ],
    tipsHe: [
      'זה לא ההפך מסימטרי!',
      'יחס יכול להיות גם סימטרי וגם אנטי-סימטרי (למשל =)',
      'מפתח ליחסי סדר חלקיים',
    ],
  },
  {
    id: 'asymmetric',
    name: 'Asymmetric',
    nameHe: 'א-סימטרי',
    symbol: '∀a,b∈A: aRb → ¬(bRa)',
    definition: 'If a is related to b, then b is NOT related to a',
    definitionHe: 'אם a קשור ל-b, אז b לא קשור ל-a',
    formalDefinition: '∀a,b∈A(aRb → ¬bRa)',
    negation: 'There exist a,b where aRb and bRa',
    negationHe: 'קיימים a,b כך ש-aRb וגם bRa',
    proofTemplate: [
      'Let a,b ∈ A such that aRb',
      'Show that ¬(bRa)',
      'Conclude: R is asymmetric',
    ],
    proofTemplateHe: [
      'יהיו a,b ∈ A המקיימים aRb',
      'נוכיח ש-¬(bRa)',
      'מסקנה: R א-סימטרי',
    ],
    disproveTemplate: [
      'Find specific a,b ∈ A',
      'Show that aRb and bRa',
      'Conclude: R is not asymmetric',
    ],
    disproveTemplateHe: [
      'נמצא a,b ∈ A ספציפיים',
      'נראה ש-aRb וגם bRa',
      'מסקנה: R לא א-סימטרי',
    ],
    examples: [
      {
        relation: '< on ℕ',
        set: 'ℕ',
        isProperty: true,
        explanation: 'If a < b then b < a is impossible ✓',
        explanationHe: 'אם a < b אז b < a בלתי אפשרי ✓',
      },
      {
        relation: '≤ on ℕ',
        set: 'ℕ',
        isProperty: false,
        explanation: '1 ≤ 1 and 1 ≤ 1, both true ✗',
        explanationHe: '1 ≤ 1 ו-1 ≤ 1, שניהם נכונים ✗',
      },
      {
        relation: '"x is parent of y"',
        set: 'People',
        isProperty: true,
        explanation: 'If A is parent of B, B cannot be parent of A ✓',
        explanationHe: 'אם A הורה של B, אז B לא יכול להיות הורה של A ✓',
      },
    ],
    tips: [
      'Asymmetric implies anti-reflexive!',
      'Stronger than anti-symmetric',
      'Used in strong partial orders (<, ⊂)',
    ],
    tipsHe: [
      'א-סימטרי גורר אנטי-רפלקסיבי!',
      'חזק יותר מאנטי-סימטרי',
      'משמש ביחסי סדר חזקים (<, ⊂)',
    ],
  },
  {
    id: 'transitive',
    name: 'Transitive',
    nameHe: 'טרנזיטיבי',
    symbol: '∀a,b,c∈A: (aRb ∧ bRc) → aRc',
    definition: 'If a is related to b and b is related to c, then a is related to c',
    definitionHe: 'אם a קשור ל-b ו-b קשור ל-c, אז a קשור ל-c',
    formalDefinition: '∀a,b,c∈A((aRb ∧ bRc) → aRc)',
    negation: 'There exist a,b,c where aRb and bRc but not aRc',
    negationHe: 'קיימים a,b,c כך ש-aRb ו-bRc אבל לא aRc',
    proofTemplate: [
      'Let a,b,c ∈ A such that aRb ∧ bRc',
      'Show that aRc using the relation definition',
      'Conclude: R is transitive',
    ],
    proofTemplateHe: [
      'יהיו a,b,c ∈ A המקיימים aRb ∧ bRc',
      'נוכיח ש-aRc לפי הגדרת היחס',
      'מסקנה: R טרנזיטיבי',
    ],
    disproveTemplate: [
      'Find specific a,b,c ∈ A',
      'Show that aRb and bRc but ¬(aRc)',
      'Conclude: R is not transitive',
    ],
    disproveTemplateHe: [
      'נמצא a,b,c ∈ A ספציפיים',
      'נראה ש-aRb ו-bRc אבל ¬(aRc)',
      'מסקנה: R לא טרנזיטיבי',
    ],
    examples: [
      {
        relation: '≤ on ℕ',
        set: 'ℕ',
        isProperty: true,
        explanation: 'If a ≤ b and b ≤ c then a ≤ c ✓',
        explanationHe: 'אם a ≤ b ו-b ≤ c אז a ≤ c ✓',
      },
      {
        relation: '= on any set',
        set: 'A',
        isProperty: true,
        explanation: 'If a = b and b = c then a = c ✓',
        explanationHe: 'אם a = b ו-b = c אז a = c ✓',
      },
      {
        relation: '"x is friend of y"',
        set: 'People',
        isProperty: false,
        explanation: 'A friend of my friend is not necessarily my friend ✗',
        explanationHe: 'חבר של חבר שלי לא בהכרח חבר שלי ✗',
      },
      {
        relation: '⊆ on P(A)',
        set: 'P(A)',
        isProperty: true,
        explanation: 'If A ⊆ B and B ⊆ C then A ⊆ C ✓',
        explanationHe: 'אם A ⊆ B ו-B ⊆ C אז A ⊆ C ✓',
      },
    ],
    tips: [
      'Most common property in proofs',
      'Often use chain of implications',
      'Key property for both equivalence and order relations',
    ],
    tipsHe: [
      'התכונה הכי נפוצה בהוכחות',
      'לעתים משתמשים בשרשרת של גרירות',
      'תכונה מפתח גם ליחסי שקילות וגם ליחסי סדר',
    ],
  },
];

// Summary of relation types
export const relationTypes = {
  equivalence: {
    name: 'Equivalence Relation',
    nameHe: 'יחס שקילות',
    properties: ['reflexive', 'symmetric', 'transitive'],
    examples: ['=', 'same parity', 'congruence mod n'],
  },
  weakPartialOrder: {
    name: 'Weak Partial Order',
    nameHe: 'יחס סדר חלקי חלש',
    properties: ['reflexive', 'antisymmetric', 'transitive'],
    examples: ['≤', '⊆', 'divides |'],
  },
  strongPartialOrder: {
    name: 'Strong Partial Order',
    nameHe: 'יחס סדר חלקי חזק',
    properties: ['antireflexive', 'asymmetric', 'transitive'],
    examples: ['<', '⊂', 'proper divides'],
  },
};
