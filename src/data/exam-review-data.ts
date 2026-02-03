// Comprehensive exam review data - aggregated from all exams by topic

import { exam2022BQuestions } from './exam-2022b';
import { exam2023BQuestions } from './exam-2023b';
import { exam2024BQuestions } from './exam-2024b';
import { exam2025BQuestions } from './exam-2025b';

// Unified question interface for the review page
export interface ReviewQuestion {
  id: string;
  examYear: string;
  questionNumber: number;
  points: number;
  type: 'short' | 'open';
  topic: string;
  topicHe: string;
  questionType?: string;
  questionTypeHe?: string;
  thinkingProcess?: string;
  thinkingProcessHe?: string;
  question: string;
  questionHe: string;
  answer: string;
  answerHe: string;
  explanation: string;
  explanationHe: string;
}

// Topic category definitions
export interface TopicCategory {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  icon: string;
  color: string;
  keywords: string[];
}

export const topicCategories: TopicCategory[] = [
  {
    id: 'logic',
    name: 'Logic',
    nameHe: 'לוגיקה',
    description: 'Tautologies, equivalence, quantifiers, truth tables',
    descriptionHe: 'טאוטולוגיות, שקילות, כמתים, טבלאות אמת',
    icon: 'Brain',
    color: 'purple',
    keywords: ['Logic', 'Tautology', 'Quantifier', 'Equivalence', 'לוגיקה', 'טאוטולוגיה', 'כמתים', 'שקילות']
  },
  {
    id: 'sets',
    name: 'Set Theory',
    nameHe: 'תורת הקבוצות',
    description: 'Power sets, membership, subset, symmetric difference, operations',
    descriptionHe: 'קבוצות חזקה, שייכות, הכלה, הפרש סימטרי, פעולות',
    icon: 'Layers',
    color: 'blue',
    keywords: ['Set', 'Power Set', 'Membership', 'Subset', 'Symmetric Difference', 'קבוצות', 'קבוצת חזקה', 'שייכות', 'הכלה', 'הפרש סימטרי']
  },
  {
    id: 'functions',
    name: 'Functions',
    nameHe: 'פונקציות',
    description: 'Injective, surjective, bijective, inverse, composition',
    descriptionHe: 'חח"ע, על, חד-חד ערכית ועל, הופכית, הרכבה',
    icon: 'GitBranch',
    color: 'green',
    keywords: ['Function', 'Injective', 'Surjective', 'Inverse', 'Composition', 'פונקציות', 'חח"ע', 'על', 'הופכית', 'הרכבה']
  },
  {
    id: 'combinatorics',
    name: 'Combinatorics',
    nameHe: 'קומבינטוריקה',
    description: 'Counting, binomial, multinomial, inclusion-exclusion, stars & bars',
    descriptionHe: 'ספירה, בינום, מולטינום, הכלה והדחה, כוכבים ומחיצות',
    icon: 'Calculator',
    color: 'orange',
    keywords: ['Combinatorics', 'Binomial', 'Multinomial', 'Inclusion-Exclusion', 'Distribution', 'Dice', 'Subsets', 'Sequences', 'Symmetry', 'קומבינטוריקה', 'בינום', 'מולטינום', 'הכלה והדחה', 'חלוקה', 'סימטריה']
  },
  {
    id: 'relations',
    name: 'Relations',
    nameHe: 'יחסים',
    description: 'Reflexive, symmetric, transitive, equivalence relations, partial order',
    descriptionHe: 'רפלקסיבי, סימטרי, טרנזיטיבי, יחסי שקילות, סדר חלקי',
    icon: 'Link',
    color: 'pink',
    keywords: ['Relation', 'Reflexive', 'Symmetric', 'Transitive', 'Equivalence', 'Partial Order', 'Antisymmetric', 'יחסים', 'רפלקסיבי', 'סימטרי', 'טרנזיטיבי', 'שקילות', 'סדר חלקי', 'אנטי-סימטרי']
  },
  {
    id: 'graphs',
    name: 'Graphs & Matching',
    nameHe: 'גרפים והתאמות',
    description: 'Hall\'s theorem, stable matching, bipartite graphs',
    descriptionHe: 'משפט הול, התאמות יציבות, גרפים דו-צדדיים',
    icon: 'Network',
    color: 'cyan',
    keywords: ['Graph', 'Hall', 'Matching', 'Stable', 'Bipartite', 'גרפים', 'הול', 'התאמה', 'יציבה', 'דו-צדדי']
  },
  {
    id: 'induction',
    name: 'Induction',
    nameHe: 'אינדוקציה',
    description: 'Mathematical induction, strong induction, structural induction',
    descriptionHe: 'אינדוקציה מתמטית, אינדוקציה חזקה, אינדוקציה מבנית',
    icon: 'Repeat',
    color: 'indigo',
    keywords: ['Induction', 'Strong', 'אינדוקציה', 'חזקה']
  }
];

// Helper function to categorize a question by its topic
function categorizeQuestion(topic: string, topicHe: string): string {
  const lowerTopic = topic.toLowerCase();
  const lowerTopicHe = topicHe.toLowerCase();

  for (const category of topicCategories) {
    for (const keyword of category.keywords) {
      if (lowerTopic.includes(keyword.toLowerCase()) ||
          lowerTopicHe.includes(keyword.toLowerCase()) ||
          topic.includes(keyword) ||
          topicHe.includes(keyword)) {
        return category.id;
      }
    }
  }

  return 'combinatorics'; // Default to combinatorics for uncategorized
}

// Transform exam questions to review format
function transformToReviewQuestion(
  q: any,
  examYear: string
): ReviewQuestion {
  return {
    id: q.id,
    examYear,
    questionNumber: q.questionNumber,
    points: q.points,
    type: q.type,
    topic: q.topic,
    topicHe: q.topicHe,
    questionType: q.questionType,
    questionTypeHe: q.questionTypeHe,
    thinkingProcess: q.thinkingProcess,
    thinkingProcessHe: q.thinkingProcessHe,
    question: q.question,
    questionHe: q.questionHe,
    answer: q.answer,
    answerHe: q.answerHe,
    explanation: q.explanation,
    explanationHe: q.explanationHe,
  };
}

// Get all questions organized by category
export function getQuestionsByCategory(): Map<string, ReviewQuestion[]> {
  const categoryMap = new Map<string, ReviewQuestion[]>();

  // Initialize all categories
  for (const category of topicCategories) {
    categoryMap.set(category.id, []);
  }

  // Add 2022B questions
  for (const q of exam2022BQuestions) {
    const categoryId = categorizeQuestion(q.topic, q.topicHe);
    const reviewQ = transformToReviewQuestion(q, '2022B');
    categoryMap.get(categoryId)?.push(reviewQ);
  }

  // Add 2023B questions
  for (const q of exam2023BQuestions) {
    const categoryId = categorizeQuestion(q.topic, q.topicHe);
    const reviewQ = transformToReviewQuestion(q, '2023B');
    categoryMap.get(categoryId)?.push(reviewQ);
  }

  // Add 2024B questions
  for (const q of exam2024BQuestions) {
    const categoryId = categorizeQuestion(q.topic, q.topicHe);
    const reviewQ = transformToReviewQuestion(q, '2024B');
    categoryMap.get(categoryId)?.push(reviewQ);
  }

  // Add 2025B questions
  for (const q of exam2025BQuestions) {
    const categoryId = categorizeQuestion(q.topic, q.topicHe);
    const reviewQ = transformToReviewQuestion(q, '2025B');
    categoryMap.get(categoryId)?.push(reviewQ);
  }

  return categoryMap;
}

// Get all questions as flat array
export function getAllReviewQuestions(): ReviewQuestion[] {
  const allQuestions: ReviewQuestion[] = [];

  exam2022BQuestions.forEach(q => {
    allQuestions.push(transformToReviewQuestion(q, '2022B'));
  });

  exam2023BQuestions.forEach(q => {
    allQuestions.push(transformToReviewQuestion(q, '2023B'));
  });

  exam2024BQuestions.forEach(q => {
    allQuestions.push(transformToReviewQuestion(q, '2024B'));
  });

  exam2025BQuestions.forEach(q => {
    allQuestions.push(transformToReviewQuestion(q, '2025B'));
  });

  return allQuestions;
}

// Statistics
export function getReviewStats() {
  const questions = getAllReviewQuestions();
  const byCategory = getQuestionsByCategory();

  return {
    totalQuestions: questions.length,
    shortQuestions: questions.filter(q => q.type === 'short').length,
    openQuestions: questions.filter(q => q.type === 'open').length,
    exams: ['2022B', '2023B', '2024B', '2025B'],
    categoryCounts: Array.from(byCategory.entries()).map(([id, qs]) => ({
      id,
      count: qs.length,
      category: topicCategories.find(c => c.id === id)
    }))
  };
}
