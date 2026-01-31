'use client';

import { useState, useMemo } from 'react';
import { FileQuestion, Search, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { homeworkSets, getAllHomework } from '@/data/homework-data';

export default function HomeworkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHw, setSelectedHw] = useState<number | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allHomework = getAllHomework();
  const hwNumbers = allHomework.map(hw => hw.number);

  const filteredQuestions = useMemo(() => {
    let questions = allHomework.flatMap(hw => hw.questions);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      questions = questions.filter(q =>
        q.question.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        q.solution.toLowerCase().includes(query)
      );
    }

    if (selectedHw !== 'all') {
      questions = questions.filter(q => q.homeworkNumber === selectedHw);
    }

    return questions;
  }, [allHomework, searchQuery, selectedHw]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileQuestion className="w-7 h-7 text-orange-600" />
          שיעורי בית
        </h1>
        <p className="text-gray-500">שאלות ופתרונות מלאים מכל התרגילים</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש בשאלות ופתרונות..."
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
          filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                className="w-full p-4 text-right"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        שי"ב {q.homeworkNumber}
                      </span>
                      <span className="text-sm text-gray-500">
                        שאלה {q.questionNumber}{q.subQuestion ? q.subQuestion : ''}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                        {q.topic}
                      </span>
                    </div>
                    <p className="text-gray-900 text-sm line-clamp-2">{q.question}</p>
                  </div>
                  {expandedId === q.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </div>
              </button>

              {expandedId === q.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <h4 className="font-medium text-gray-700 mb-2">שאלה מלאה</h4>
                  <div className="bg-white p-3 rounded-lg mb-4 text-sm whitespace-pre-wrap">
                    {q.question}
                  </div>

                  <h4 className="font-medium text-gray-700 mb-2">פתרון</h4>
                  <div className="bg-green-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-mono" dir="ltr">
                    {q.solution}
                  </div>

                  {q.keyTechnique && (
                    <div className="mt-4">
                      <span className="text-xs text-gray-500">טכניקה מרכזית: </span>
                      <span className="text-sm bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                        {q.keyTechnique}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
