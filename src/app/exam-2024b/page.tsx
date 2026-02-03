'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  Filter,
  Search,
  Lightbulb,
  GraduationCap,
  ArrowLeft,
  FileText,
  Clock,
  Award,
  Calculator,
} from 'lucide-react';
import { exam2024BQuestions, examInfo2024B } from '@/data/exam-2024b';

export default function Exam2024BPage() {
  const router = useRouter();
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'short' | 'open'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  const filteredQuestions = useMemo(() => {
    return exam2024BQuestions.filter(q => {
      if (selectedType !== 'all' && q.type !== selectedType) return false;

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          q.question.toLowerCase().includes(query) ||
          q.questionHe.includes(searchQuery) ||
          q.topic.toLowerCase().includes(query) ||
          q.topicHe.includes(searchQuery) ||
          q.answer.toLowerCase().includes(query) ||
          q.answerHe.includes(searchQuery)
        );
      }

      return true;
    });
  }, [selectedType, searchQuery]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  const toggleExplanation = (id: string) => {
    setShowExplanation(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
          {examInfo2024B.title}
        </h1>
        <p className="text-gray-500 mt-1">פתרונות מלאים ומפורטים לכל השאלות</p>
      </div>

      {/* Exam Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{examInfo2024B.shortQuestions + examInfo2024B.openQuestions}</p>
          <p className="text-sm text-gray-500">שאלות סה"כ</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Calculator className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{examInfo2024B.shortQuestions}</p>
          <p className="text-sm text-gray-500">שאלות קצרות ({examInfo2024B.shortQuestionPoints} נק')</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{examInfo2024B.openQuestions}</p>
          <p className="text-sm text-gray-500">שאלות פתוחות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{examInfo2024B.duration}</p>
          <p className="text-sm text-gray-500">זמן מבחן</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-gray-800">סינון שאלות</span>
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
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as 'all' | 'short' | 'open')}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">כל השאלות</option>
            <option value="short">שאלות קצרות בלבד</option>
            <option value="open">שאלות פתוחות בלבד</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        מציג {filteredQuestions.length} שאלות
      </div>

      {/* Part A - Short Questions */}
      {(selectedType === 'all' || selectedType === 'short') && filteredQuestions.some(q => q.type === 'short') && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-gray-900 bg-gradient-to-l from-green-50 to-emerald-50 px-4 py-3 rounded-xl border border-green-100">
            חלק א' - שאלות קצרות ({examInfo2024B.shortQuestionPoints} נקודות כל אחת)
          </h2>

          {filteredQuestions.filter(q => q.type === 'short').map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isExpanded={expandedQuestion === question.id}
              showingExplanation={showExplanation[question.id]}
              onToggle={() => toggleQuestion(question.id)}
              onToggleExplanation={() => toggleExplanation(question.id)}
            />
          ))}
        </div>
      )}

      {/* Part B - Open Questions */}
      {(selectedType === 'all' || selectedType === 'open') && filteredQuestions.some(q => q.type === 'open') && (
        <div className="space-y-4">
          <h2 className="font-bold text-lg text-gray-900 bg-gradient-to-l from-purple-50 to-indigo-50 px-4 py-3 rounded-xl border border-purple-100">
            חלק ב' - שאלות פתוחות
          </h2>

          {filteredQuestions.filter(q => q.type === 'open').map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isExpanded={expandedQuestion === question.id}
              showingExplanation={showExplanation[question.id]}
              onToggle={() => toggleQuestion(question.id)}
              onToggleExplanation={() => toggleExplanation(question.id)}
            />
          ))}
        </div>
      )}

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
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">טיפים למבחן 2024</h3>
            <ul className="text-indigo-100 space-y-1 text-sm">
              <li>• השאלות אינן מסודרות לפי קושי עולה - עברו על כולן!</li>
              <li>• בשאלות קצרות - אין צורך בהסברים אלא אם התבקשתם</li>
              <li>• בשאלות פתוחות - הקפידו על כתיבה מסודרת וברורה</li>
              <li>• השתמשו בדף הנוסחאות - הוא חלק מהמבחן!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuestionCardProps {
  question: {
    id: string;
    questionNumber: number;
    points: number;
    type: 'short' | 'open';
    topic: string;
    topicHe: string;
    questionHe: string;
    question: string;
    answer: string;
    answerHe: string;
    explanation: string;
    explanationHe: string;
  };
  isExpanded: boolean;
  showingExplanation: boolean;
  onToggle: () => void;
  onToggleExplanation: () => void;
}

function QuestionCard({ question, isExpanded, showingExplanation, onToggle, onToggleExplanation }: QuestionCardProps) {
  const typeStyle = question.type === 'short'
    ? { bg: 'bg-green-100', text: 'text-green-700', label: 'קצרה' }
    : { bg: 'bg-purple-100', text: 'text-purple-700', label: 'פתוחה' };

  return (
    <div
      className={`bg-white rounded-xl border ${isExpanded ? 'border-indigo-200 shadow-md' : 'border-gray-100'} overflow-hidden transition-all`}
    >
      {/* Question Header */}
      <button
        onClick={onToggle}
        className={`w-full p-5 text-right ${isExpanded ? 'bg-indigo-50' : 'hover:bg-gray-50'} transition-colors`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                שאלה {question.questionNumber}
              </span>
              <span className={`px-2 py-0.5 ${typeStyle.bg} ${typeStyle.text} rounded text-xs font-medium`}>
                {typeStyle.label}
              </span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                {question.points} נקודות
              </span>
              <span className="text-xs text-gray-400">
                {question.topicHe}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{question.questionHe}</p>
          </div>

          <div className="flex items-center gap-2">
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
            <div className="font-mono text-lg text-green-900 bg-white px-3 py-2 rounded border border-green-200 whitespace-pre-wrap">
              {question.answerHe}
            </div>
          </div>

          {/* Explanation Toggle */}
          <button
            onClick={onToggleExplanation}
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
          )}
        </div>
      )}
    </div>
  );
}
