// Core types for BDIDA - Discrete Mathematics Study App

export type FileCategory = 'lecture' | 'tutorial' | 'homework' | 'exam';

export interface UploadedFile {
  id: string;
  name: string;
  path: string;
  category: FileCategory;
  indexNumber: number;
  displayTag: string;
  uploadedAt: Date;
  fileSize: number;
  pageCount: number;
  extractedText: string;
  isProcessed: boolean;
}

// Discrete Math specific types
export type KnowledgeItemType = 'definition' | 'theorem' | 'lemma' | 'corollary' | 'proof' | 'technique' | 'algorithm' | 'example';

// Discrete Mathematics topics
export type Topic =
  | 'logic'              // Propositional logic, predicate logic
  | 'sets'               // Set theory, operations
  | 'relations'          // Relations, equivalence, partial orders
  | 'functions'          // Functions, bijections, compositions
  | 'induction'          // Mathematical induction, strong induction
  | 'recursion'          // Recursive definitions, recurrence relations
  | 'combinatorics'      // Counting, permutations, combinations
  | 'graphs'             // Graph theory
  | 'trees'              // Trees, spanning trees
  | 'number-theory'      // Divisibility, primes, modular arithmetic
  | 'boolean-algebra'    // Boolean algebra, logic gates
  | 'algorithms'         // Algorithm analysis, complexity
  | 'probability'        // Discrete probability
  | 'other';

export interface KnowledgeItem {
  id: string;
  type: KnowledgeItemType;
  title: string;
  verbatimText: string;        // EXACT quote - NEVER modify
  sourceFileId: string;
  sourceFileName: string;
  sourcePage: number;
  sourceSection?: string;
  topics: Topic[];
  whenToUse: string;
  linkedQuestionIds: string[];
  linkedItemIds: string[];
  isInReviewList: boolean;
  likelihoodScore: number;     // 0-100
  createdAt: Date;
  lastReviewedAt?: Date;
  reviewCount: number;
  examAppearances: number;     // How many times appeared in exams
}

export interface ExamQuestion {
  id: string;
  sourceFileId: string;
  sourceFileName: string;
  sourcePage: number;
  questionNumber: number;
  subQuestion?: string;        // e.g., "a", "b", "c"
  verbatimText: string;
  solutionText?: string;       // Verbatim solution if available
  topics: Topic[];
  difficulty: 'easy' | 'medium' | 'hard';
  points?: number;
  requiredTheorems: string[];
  questionPattern: string;
  techniques: string[];        // Required techniques
  isFromHomework: boolean;
  originalHomeworkId?: string;
  year?: number;
  semester?: string;           // 'A' or 'B'
}

export interface HomeworkQuestion {
  id: string;
  sourceFileId: string;
  sourceFileName: string;
  sourcePage: number;
  homeworkNumber: number;
  questionNumber: number;
  subQuestion?: string;
  verbatimText: string;
  solutionText?: string;
  topics: Topic[];
  difficulty: 'easy' | 'medium' | 'hard';
  requiredTheorems: string[];
  techniques: string[];
  similarityToExams: number;   // 0-100
  examLikelihoodScore: number; // 0-100
  matchingExamQuestions: string[];
  reasonForLikelihood?: string;
}

export interface StudySession {
  id: string;
  date: Date;
  duration: number;
  itemsStudied: string[];
  questionsAttempted: string[];
  correctAnswers: number;
  mode: 'flashcard' | 'identify-tool' | 'exam-drill' | 'proof-practice';
}

export interface StudyPlan {
  id: string;
  examDate: Date;
  hoursPerDay: number;
  weakTopics: Topic[];
  createdAt: Date;
  dailyPlans: DailyPlan[];
}

export interface DailyPlan {
  date: Date;
  tasks: StudyTask[];
  isCompleted: boolean;
}

export interface StudyTask {
  id: string;
  type: 'review-lecture' | 'review-definitions' | 'memorize-theorem' | 'memorize-proof' | 'practice-problems' | 'exam-simulation';
  description: string;
  targetItems: string[];
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface PracticeResult {
  id: string;
  itemId: string;
  attemptedAt: Date;
  wasCorrect: boolean;
  timeSpentSeconds: number;
  mode: 'flashcard' | 'identify-tool' | 'exam-drill';
  confidence: number;          // 1-5 self-rating
}

export interface ExamPattern {
  id: string;
  pattern: string;
  description: string;
  frequency: number;           // How many times appeared
  exampleQuestionIds: string[];
  relatedTheorems: string[];
  topics: Topic[];
  typicalPoints: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface TopicAnalysis {
  topic: Topic;
  frequency: number;           // Appearances in exams
  averagePoints: number;
  relatedTheorems: string[];
  commonPatterns: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface AppStats {
  totalFiles: number;
  lectureCount: number;
  tutorialCount: number;
  homeworkCount: number;
  examCount: number;
  totalKnowledgeItems: number;
  totalQuestions: number;
  studyStreak: number;
  lastStudyDate?: Date;
  lastIndexedAt?: Date;
}

export interface LikelihoodAnalysis {
  topTheorems: KnowledgeItem[];
  topProofs: KnowledgeItem[];
  topDefinitions: KnowledgeItem[];
  topTechniques: KnowledgeItem[];
  gaps: GapItem[];
  lastUpdated: Date;
}

export interface GapItem {
  description: string;
  reason: string;
  suggestedAction: string;
  relatedTopics: Topic[];
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export interface ExamAnalysis {
  examId: string;
  year: number;
  semester: string;
  totalQuestions: number;
  topicDistribution: { topic: Topic; count: number; percentage: number }[];
  difficultyDistribution: { difficulty: string; percentage: number }[];
  patterns: ExamPattern[];
  totalPoints: number;
}

export interface PredictionResult {
  itemId: string;
  itemType: 'theorem' | 'definition' | 'technique' | 'question-type';
  title: string;
  likelihood: number;          // 0-100
  reasons: string[];
  sourceAppearances: { examId: string; year: number; context: string }[];
}

// For Hebrew RTL support
export type Direction = 'rtl' | 'ltr';
export type Language = 'he' | 'en';

// Data source config - hardcoded path
export const DATA_SOURCE_PATH = '/Users/liamesika/Desktop/infi/bdida';

// Week-based study system types
export interface StudyWeek {
  id: string;
  weekNumber: number;
  title: string;
  lectureIds: string[];
  homeworkIds: string[];
  tutorialIds: string[];
  topics: Topic[];
  definitions: KnowledgeItem[];
  theorems: KnowledgeItem[];
  proofs: KnowledgeItem[];
  techniques: KnowledgeItem[];
  examplePatterns: string[];
  isCompleted: boolean;
  completedAt?: Date;
  likelihoodScore: number;        // 0-100 based on exam frequency
  studyTimeMinutes: number;       // Estimated study time
}

export interface WeekProgress {
  weekId: string;
  weekNumber: number;
  definitionsReviewed: number;
  theoremsReviewed: number;
  proofsReviewed: number;
  practiceCompleted: number;
  lastStudiedAt?: Date;
  completionPercentage: number;
}

export interface ExamCalendar {
  id: string;
  examDate: Date;                 // Feb 4, 2025
  availableDays: Date[];          // Sat, Sun, Mon, Tue before exam
  dailySchedule: DailyStudySchedule[];
  createdAt: Date;
  totalWeeks: number;
  completedWeeks: number;
}

export interface DailyStudySchedule {
  date: Date;
  dayName: string;                // Saturday, Sunday, etc.
  weekNumbers: number[];          // Which weeks to study
  tasks: WeekStudyTask[];
  totalMinutes: number;
  isCompleted: boolean;
}

export interface WeekStudyTask {
  id: string;
  weekNumber: number;
  taskType: 'review-definitions' | 'review-theorems' | 'review-proofs' | 'practice' | 'exam-questions';
  description: string;
  itemIds: string[];
  estimatedMinutes: number;
  isCompleted: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
}
