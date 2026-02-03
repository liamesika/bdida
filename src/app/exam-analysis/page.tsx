'use client';

import { useState, useMemo } from 'react';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  Filter,
  Search,
  Lightbulb,
  GraduationCap,
  BarChart3,
} from 'lucide-react';
import {
  examQuestions,
  getWeekTopics,
  ExamQuestion,
} from '@/data/exam-questions';

export default function ExamAnalysisPage() {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const weekTopics = getWeekTopics();

  const filteredQuestions = useMemo(() => {
    return examQuestions.filter(q => {
      // Week filter
      if (selectedWeek !== 'all' && q.week !== selectedWeek) return false;

      // Difficulty filter
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          q.question.toLowerCase().includes(query) ||
          q.questionHe.includes(searchQuery) ||
          q.topic.toLowerCase().includes(query) ||
          q.topicHe.includes(searchQuery) ||
          q.answer.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [selectedWeek, selectedDifficulty, searchQuery]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const toggleExplanation = (id: string) => {
    setShowExplanation(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const difficultyColors = {
    easy: { bg: 'bg-green-100', text: 'text-green-700', label: 'קל' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'בינוני' },
    hard: { bg: 'bg-red-100', text: 'text-red-700', label: 'קשה' },
  };

  const stats = useMemo(() => ({
    total: examQuestions.length,
    byWeek: weekTopics.map(w => ({
      ...w,
      count: examQuestions.filter(q => q.week === w.week).length,
    })),
    byDifficulty: {
      easy: examQuestions.filter(q => q.difficulty === 'easy').length,
      medium: examQuestions.filter(q => q.difficulty === 'medium').length,
      hard: examQuestions.filter(q => q.difficulty === 'hard').length,
    },
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-indigo-600" />
          ניתוח שאלות מבחנים
        </h1>
        <p className="text-gray-500 mt-1">שאלות ממבחני עבר 2012-2018 עם פתרונות מלאים ומפורטים</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
          <p className="text-sm text-gray-500">שאלות סה"כ</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{stats.byDifficulty.easy}</p>
          <p className="text-sm text-gray-500">קלות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-yellow-600">{stats.byDifficulty.medium}</p>
          <p className="text-sm text-gray-500">בינוניות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-red-600">{stats.byDifficulty.hard}</p>
          <p className="text-sm text-gray-500">קשות</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-gray-800">סינון שאלות</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="חיפוש..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Week Filter */}
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">כל השבועות</option>
            {weekTopics.map((w) => (
              <option key={w.week} value={w.week}>
                שבוע {w.week}: {w.topicHe}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">כל רמות הקושי</option>
            <option value="easy">קל</option>
            <option value="medium">בינוני</option>
            <option value="hard">קשה</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        מציג {filteredQuestions.length} שאלות {selectedWeek !== 'all' && `(שבוע ${selectedWeek})`}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => {
          const isExpanded = expandedQuestion === question.id;
          const showingExplanation = showExplanation[question.id];
          const diffStyle = difficultyColors[question.difficulty];

          return (
            <div
              key={question.id}
              className={`bg-white rounded-xl border ${isExpanded ? 'border-indigo-200 shadow-md' : 'border-gray-100'} overflow-hidden transition-all`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleQuestion(question.id)}
                className={`w-full p-5 text-right ${isExpanded ? 'bg-indigo-50' : 'hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                        שבוע {question.week}
                      </span>
                      <span className={`px-2 py-0.5 ${diffStyle.bg} ${diffStyle.text} rounded text-xs font-medium`}>
                        {diffStyle.label}
                      </span>
                      <span className="text-xs text-gray-400">
                        {question.topicHe}
                      </span>
                    </div>

                    {/* Question Text */}
                    <p className="text-gray-800 leading-relaxed">{question.questionHe}</p>

                    {question.question !== question.questionHe && (
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed" dir="ltr">
                        {question.question}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-5 border-t border-gray-100 space-y-5">
                  {/* Answer */}
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-800">תשובה סופית</span>
                    </div>
                    <div className="font-mono text-lg text-green-900 bg-white px-3 py-2 rounded border border-green-200">
                      {question.answer}
                    </div>
                  </div>

                  {/* Explanation Toggle */}
                  <button
                    onClick={() => toggleExplanation(question.id)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    <Lightbulb className="w-5 h-5" />
                    {showingExplanation ? 'הסתר הסבר מפורט' : 'הצג הסבר מפורט'}
                    {showingExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Full Explanation */}
                  {showingExplanation && (
                    <div className="space-y-4">
                      {/* Hebrew Explanation */}
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-3">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-blue-800">הסבר מפורט</span>
                        </div>
                        <div className="text-blue-900 whitespace-pre-wrap leading-relaxed text-sm">
                          {question.explanationHe}
                        </div>
                      </div>

                      {/* English Explanation */}
                      {question.explanation !== question.explanationHe && (
                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-gray-600" />
                            <span className="font-bold text-gray-700">Explanation (English)</span>
                          </div>
                          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm font-mono" dir="ltr">
                            {question.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">לא נמצאו שאלות התואמות את החיפוש</p>
        </div>
      )}

      {/* Study Tips */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">טיפים ללימוד משאלות מבחנים</h3>
            <ul className="text-indigo-100 space-y-1 text-sm">
              <li>• התחילו מהשאלות הקלות ועברו לקשות בהדרגה</li>
              <li>• נסו לפתור כל שאלה לבד לפני שמסתכלים על התשובה</li>
              <li>• שימו לב לתבניות שחוזרות על עצמן בין השאלות</li>
              <li>• תרגלו שאלות מכל הנושאים, לא רק מהנושאים שאתם מכירים</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
