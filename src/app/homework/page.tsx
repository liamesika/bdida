'use client';

import { useState, useEffect, useMemo } from 'react';
import { FileQuestion, Search, TrendingUp, Link as LinkIcon, Filter } from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import type { HomeworkQuestion, Topic } from '@/types';

const TOPIC_LABELS: Record<Topic, string> = {
  logic: 'לוגיקה',
  sets: 'קבוצות',
  relations: 'יחסים',
  functions: 'פונקציות',
  induction: 'אינדוקציה',
  recursion: 'רקורסיה',
  combinatorics: 'קומבינטוריקה',
  graphs: 'גרפים',
  trees: 'עצים',
  'number-theory': 'תורת המספרים',
  'boolean-algebra': 'אלגברה בוליאנית',
  algorithms: 'אלגוריתמים',
  probability: 'הסתברות',
  other: 'אחר',
};

export default function HomeworkPage() {
  const [questions, setQuestions] = useState<HomeworkQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHw, setSelectedHw] = useState<number | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    setLoading(true);
    const allQuestions = await dbHelpers.getHomeworkQuestionsByLikelihood();
    setQuestions(allQuestions);
    setLoading(false);
  }

  const hwNumbers = useMemo(() => {
    const numbers = new Set(questions.map((q) => q.homeworkNumber));
    return Array.from(numbers).sort((a, b) => a - b);
  }, [questions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!q.verbatimText.toLowerCase().includes(query) &&
            !q.topics.some((t) => t.toLowerCase().includes(query))) {
          return false;
        }
      }
      if (selectedHw !== 'all' && q.homeworkNumber !== selectedHw) {
        return false;
      }
      return true;
    });
  }, [questions, searchQuery, selectedHw]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded skeleton" />
        <div className="h-12 bg-gray-200 rounded skeleton" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileQuestion className="w-7 h-7 text-orange-600" />
          ניבוי שאלות שיעורי בית
        </h1>
        <p className="text-gray-500">שאלות מדורגות לפי סבירות הופעה במבחן</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש בשאלות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedHw('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
              selectedHw === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            כל השי"ב
          </button>
          {hwNumbers.map((num) => (
            <button
              key={num}
              onClick={() => setSelectedHw(num)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedHw === num
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              שי"ב {num}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">לא נמצאו שאלות</p>
          </div>
        ) : (
          filteredQuestions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      w-14 h-14 rounded-xl flex flex-col items-center justify-center text-white shrink-0
                      ${q.examLikelihoodScore >= 70 ? 'likelihood-critical' :
                        q.examLikelihoodScore >= 50 ? 'likelihood-high' :
                        q.examLikelihoodScore >= 30 ? 'likelihood-medium' : 'likelihood-low'}
                    `}
                  >
                    <span className="text-lg font-bold">{q.examLikelihoodScore}</span>
                    <span className="text-xs opacity-80">%</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        שי"ב {q.homeworkNumber} - שאלה {q.questionNumber}
                      </span>
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        q.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                        q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {q.difficulty === 'hard' ? 'קשה' : q.difficulty === 'medium' ? 'בינוני' : 'קל'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {q.topics.map((topic) => (
                        <span key={topic} className="topic-badge">
                          {TOPIC_LABELS[topic] || topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {q.verbatimText.substring(0, 150)}...
                    </p>
                  </div>
                </div>
              </div>

              {expandedId === q.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">טקסט מלא</h4>
                  <div className="verbatim-text mb-4">{q.verbatimText}</div>

                  {q.reasonForLikelihood && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-orange-600" />
                        סיבות לדירוג
                      </h4>
                      <p className="text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
                        {q.reasonForLikelihood}
                      </p>
                    </div>
                  )}

                  {q.techniques.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">טכניקות נדרשות</h4>
                      <div className="flex flex-wrap gap-2">
                        {q.techniques.map((tech) => (
                          <span
                            key={tech}
                            className="text-sm bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-400">
                    מקור: {q.sourceFileName} - עמוד {q.sourcePage}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
