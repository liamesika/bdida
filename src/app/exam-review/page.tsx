'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  Filter,
  GitBranch,
  GraduationCap,
  Layers,
  Lightbulb,
  Link,
  Network,
  Repeat,
  Search,
  Target,
  FileText,
  Award,
} from 'lucide-react';
import {
  getQuestionsByCategory,
  getReviewStats,
  topicCategories,
  type ReviewQuestion,
  type TopicCategory,
} from '@/data/exam-review-data';

// Icon mapping for topic categories
const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Calculator: <Calculator className="w-5 h-5" />,
  Link: <Link className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Repeat: <Repeat className="w-5 h-5" />,
};

// Color classes for categories
const colorClasses: Record<string, { bg: string; border: string; text: string; light: string }> = {
  purple: { bg: 'bg-purple-100', border: 'border-purple-200', text: 'text-purple-700', light: 'bg-purple-50' },
  blue: { bg: 'bg-blue-100', border: 'border-blue-200', text: 'text-blue-700', light: 'bg-blue-50' },
  green: { bg: 'bg-green-100', border: 'border-green-200', text: 'text-green-700', light: 'bg-green-50' },
  orange: { bg: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700', light: 'bg-orange-50' },
  pink: { bg: 'bg-pink-100', border: 'border-pink-200', text: 'text-pink-700', light: 'bg-pink-50' },
  cyan: { bg: 'bg-cyan-100', border: 'border-cyan-200', text: 'text-cyan-700', light: 'bg-cyan-50' },
  indigo: { bg: 'bg-indigo-100', border: 'border-indigo-200', text: 'text-indigo-700', light: 'bg-indigo-50' },
};

export default function ExamReviewPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('all');

  const questionsByCategory = useMemo(() => getQuestionsByCategory(), []);
  const stats = useMemo(() => getReviewStats(), []);

  // Filter questions by search and exam
  const filterQuestions = (questions: ReviewQuestion[]) => {
    return questions.filter((q) => {
      // Filter by exam
      if (selectedExam !== 'all' && q.examYear !== selectedExam) return false;

      // Filter by search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          q.question.toLowerCase().includes(query) ||
          q.questionHe.includes(searchQuery) ||
          q.topic.toLowerCase().includes(query) ||
          q.topicHe.includes(searchQuery) ||
          q.answer.toLowerCase().includes(query) ||
          q.answerHe.includes(searchQuery) ||
          (q.questionTypeHe && q.questionTypeHe.includes(searchQuery))
        );
      }

      return true;
    });
  };

  // Get filtered categories with their questions
  const filteredCategories = useMemo(() => {
    const result: { category: TopicCategory; questions: ReviewQuestion[] }[] = [];

    for (const category of topicCategories) {
      const questions = questionsByCategory.get(category.id) || [];
      const filtered = filterQuestions(questions);

      if (filtered.length > 0) {
        // If a specific category is selected, only include that category
        if (selectedCategory === null || selectedCategory === category.id) {
          result.push({ category, questions: filtered });
        }
      }
    }

    return result;
  }, [questionsByCategory, selectedCategory, searchQuery, selectedExam]);

  const totalFilteredQuestions = filteredCategories.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/exams')}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          חזרה למבחנים
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-indigo-600" />
          חזרה לפי נושאים
        </h1>
        <p className="text-gray-500 mt-1">
          כל השאלות מכל המבחנים (2022-2025) מאורגנות לפי נושאים - הכנה מושלמת למבחן!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</p>
          <p className="text-sm text-gray-500">שאלות סה&quot;כ</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calculator className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.shortQuestions}</p>
          <p className="text-sm text-gray-500">שאלות קצרות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.openQuestions}</p>
          <p className="text-sm text-gray-500">שאלות פתוחות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <GraduationCap className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.exams.length}</p>
          <p className="text-sm text-gray-500">מבחנים</p>
        </div>
      </div>

      {/* Category Filter Cards */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-gray-800">בחרי נושא</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`p-3 rounded-lg border text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="block">כל הנושאים</span>
            <span className="text-xs opacity-75">({stats.totalQuestions})</span>
          </button>
          {topicCategories.map((category) => {
            const count = questionsByCategory.get(category.id)?.length || 0;
            const colors = colorClasses[category.color];
            const isSelected = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  isSelected
                    ? `${colors.bg} ${colors.border} ${colors.text}`
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {iconMap[category.icon]}
                </div>
                <span className="block text-xs">{category.nameHe}</span>
                <span className="text-xs opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-gray-800">סינון נוסף</span>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="חיפוש בשאלות..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">כל המבחנים</option>
            <option value="2022B">מבחן 2022 מועד ב&apos;</option>
            <option value="2023B">מבחן 2023 מועד ב&apos;</option>
            <option value="2024B">מבחן 2024 מועד ב&apos;</option>
            <option value="2025B">מבחן 2025 מועד ב&apos;</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">מציג {totalFilteredQuestions} שאלות</div>

      {/* Questions by Category */}
      {filteredCategories.map(({ category, questions }) => (
        <CategorySection key={category.id} category={category} questions={questions} />
      ))}

      {/* Empty State */}
      {totalFilteredQuestions === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">לא נמצאו שאלות התואמות את החיפוש</p>
        </div>
      )}

      {/* Study Tips */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">טיפים לחזרה לפי נושאים</h3>
            <ul className="text-indigo-100 space-y-1 text-sm">
              <li>1. עברי על כל נושא בנפרד - זה יעזור לך לזהות דפוסים</li>
              <li>2. שימי לב ל&quot;על מה לחשוב&quot; - זה המפתח לפתרון מהיר</li>
              <li>3. סוג השאלה חשוב - הוא מנחה את שיטת הפתרון</li>
              <li>4. תרגלי שאלות דומות מכמה מבחנים לחיזוק ההבנה</li>
              <li>5. אל תדלגי על ההסברים - גם אם קראת פעם אחת!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Category Section Component
function CategorySection({
  category,
  questions,
}: {
  category: TopicCategory;
  questions: ReviewQuestion[];
}) {
  const colors = colorClasses[category.color];

  return (
    <div className="space-y-4">
      {/* Category Header */}
      <div
        className={`${colors.light} ${colors.border} border rounded-xl p-4 sticky top-0 z-10`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center`}>
            <span className={colors.text}>{iconMap[category.icon]}</span>
          </div>
          <div>
            <h2 className={`font-bold text-lg ${colors.text}`}>{category.nameHe}</h2>
            <p className="text-sm text-gray-500">{category.descriptionHe}</p>
          </div>
          <div className="mr-auto">
            <span className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-full text-sm font-medium`}>
              {questions.length} שאלות
            </span>
          </div>
        </div>
      </div>

      {/* Questions */}
      {questions.map((question, index) => (
        <QuestionCard key={question.id} question={question} index={index + 1} categoryColor={category.color} />
      ))}
    </div>
  );
}

// Question Card Component - No Dropdowns, Everything Visible
function QuestionCard({
  question,
  index,
  categoryColor,
}: {
  question: ReviewQuestion;
  index: number;
  categoryColor: string;
}) {
  const colors = colorClasses[categoryColor];
  const typeStyle =
    question.type === 'short'
      ? { bg: 'bg-green-100', text: 'text-green-700', label: 'קצרה' }
      : { bg: 'bg-purple-100', text: 'text-purple-700', label: 'פתוחה' };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Question Header */}
      <div className={`p-5 ${colors.light} border-b ${colors.border}`}>
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded text-xs font-medium`}>
            #{index}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
            {question.examYear}
          </span>
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
            שאלה {question.questionNumber}
          </span>
          <span className={`px-2 py-0.5 ${typeStyle.bg} ${typeStyle.text} rounded text-xs font-medium`}>
            {typeStyle.label}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
            {question.points} נקודות
          </span>
        </div>

        {/* Topic */}
        <div className="text-xs text-gray-500 mb-2">{question.topicHe}</div>

        {/* Question Type Badge */}
        {question.questionTypeHe && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs border border-amber-100">
              <Target className="w-3 h-3" />
              {question.questionTypeHe}
            </span>
          </div>
        )}

        {/* Question Text */}
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">
          {question.questionHe}
        </p>
      </div>

      {/* Content - Always Visible */}
      <div className="p-5 space-y-4">
        {/* Thinking Process */}
        {question.thinkingProcessHe && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-amber-600" />
              <span className="font-bold text-amber-800">על מה לחשוב כדי לפתור?</span>
            </div>
            <p className="text-amber-900 text-sm leading-relaxed">{question.thinkingProcessHe}</p>
          </div>
        )}

        {/* Answer */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="font-bold text-green-800">תשובה סופית</span>
          </div>
          <div className="font-mono text-lg text-green-900 bg-white px-3 py-2 rounded border border-green-200 whitespace-pre-wrap">
            {question.answerHe}
          </div>
        </div>

        {/* Hebrew Explanation */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-blue-800">הסבר מפורט</span>
          </div>
          <div className="text-blue-900 whitespace-pre-wrap leading-relaxed text-sm">
            {question.explanationHe}
          </div>
        </div>

        {/* English Explanation */}
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-gray-600" />
            <span className="font-bold text-gray-700">Explanation (English)</span>
          </div>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm font-mono" dir="ltr">
            {question.explanation}
          </div>
        </div>
      </div>
    </div>
  );
}
