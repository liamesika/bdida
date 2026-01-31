'use client';

import { useState } from 'react';
import { FileSearch, BarChart3, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { topicFrequencies, getAllExams } from '@/data/exam-data';

export default function ExamsPage() {
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  const exams = getAllExams();
  const totalQuestions = exams.reduce((sum, e) => sum + e.questions.length, 0);

  const selectedExamData = selectedExam
    ? exams.find(e => `${e.year}-${e.moed}` === selectedExam)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileSearch className="w-7 h-7 text-purple-600" />
          ניתוח מבחנים קודמים
        </h1>
        <p className="text-gray-500">{exams.length} מבחנים - {totalQuestions} שאלות עם פתרונות</p>
      </div>

      {/* Topic Frequency */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          סבירות נושאים במבחן
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topicFrequencies.map((topic) => (
            <div
              key={topic.topic}
              className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100"
            >
              <p className={`text-2xl font-bold ${
                topic.percentage >= 80 ? 'text-red-600' :
                topic.percentage >= 60 ? 'text-orange-600' :
                'text-yellow-600'
              }`}>
                {topic.percentage}%
              </p>
              <p className="text-sm text-gray-700 font-medium">{topic.topicHe}</p>
              <p className="text-xs text-gray-400">{topic.count} הופעות</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exam List & Details */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Exam List */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              רשימת מבחנים
            </h2>
          </div>
          <div className="divide-y divide-gray-50">
            {exams.map((exam) => {
              const examId = `${exam.year}-${exam.moed}`;
              return (
                <button
                  key={examId}
                  onClick={() => setSelectedExam(examId)}
                  className={`w-full p-4 text-right hover:bg-gray-50 transition-colors ${
                    selectedExam === examId ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {exam.year} מועד {exam.moed === 'a' ? 'א' : 'ב'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {exam.questions.length} שאלות
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-indigo-600">
                        {exam.questions.reduce((sum, q) => sum + q.points, 0)} נקודות
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Exam Details */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">פירוט מבחן</h2>
          </div>
          {!selectedExamData ? (
            <div className="p-8 text-center text-gray-400">
              בחר מבחן מהרשימה
            </div>
          ) : (
            <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
              {selectedExamData.questions.map((q) => (
                <div key={q.id} className="p-4">
                  <button
                    onClick={() => setExpandedQuestion(expandedQuestion === q.id ? null : q.id)}
                    className="w-full text-right"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            שאלה {q.questionNumber}
                          </span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {q.topic}
                          </span>
                          <span className="text-xs text-gray-500">{q.points} נק'</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{q.question}</p>
                      </div>
                      {expandedQuestion === q.id ? (
                        <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </div>
                  </button>

                  {expandedQuestion === q.id && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">פתרון:</h4>
                      <div className="text-sm whitespace-pre-wrap font-mono" dir="ltr">
                        {q.solution}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
