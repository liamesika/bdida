'use client';

import Link from 'next/link';
import { Map, Calendar, Clock, Target, CheckCircle, Circle } from 'lucide-react';
import { generateStudyPlan, keyFormulas, studyStats } from '@/data/study-plan';

export default function RoadmapPage() {
  const plan = generateStudyPlan()[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Map className="w-7 h-7 text-green-600" />
          מפת לימוד
        </h1>
        <p className="text-gray-500">תכנית לימוד מותאמת למבחן - 4 בפברואר 2025</p>
      </div>

      {/* Exam Countdown */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">המבחן ביום רביעי, 4 בפברואר 2025</h2>
            <p className="text-red-100">ימי לימוד: שבת, ראשון, שני, שלישי</p>
          </div>
          <div className="text-center bg-white/20 rounded-xl px-6 py-3">
            <p className="text-4xl font-bold">{studyStats.daysUntilExam}</p>
            <p className="text-sm text-red-100">ימים</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{studyStats.totalHours}</p>
          <p className="text-sm text-gray-500">שעות לימוד</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{studyStats.topicsToReview}</p>
          <p className="text-sm text-gray-500">נושאים לחזרה</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{studyStats.practiceQuestionsTarget}</p>
          <p className="text-sm text-gray-500">שאלות לתרגל</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">1</p>
          <p className="text-sm text-gray-500">סימולציית מבחן</p>
        </div>
      </div>

      {/* Daily Plan */}
      <div className="bg-white rounded-xl border border-gray-100">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-green-600" />
            תכנית יומית
          </h2>
        </div>
        <div className="divide-y divide-gray-50">
          {plan.days.map((day, index) => (
            <div key={day.date} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-indigo-100 text-indigo-700' :
                    index === 1 ? 'bg-blue-100 text-blue-700' :
                    index === 2 ? 'bg-purple-100 text-purple-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{day.dayNameHe} - {day.date.slice(5)}</h3>
                    <p className="text-sm text-gray-500">
                      {day.topics.map(t => t.nameHe).join(' + ')}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">
                    {day.topics.reduce((sum, t) => sum + t.estimatedHours, 0)} שעות
                  </p>
                </div>
              </div>

              <div className="space-y-2 mr-13">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      task.type === 'exam-simulation' ? 'bg-red-50' :
                      task.type === 'practice' ? 'bg-blue-50' :
                      task.type === 'memorize' ? 'bg-yellow-50' : 'bg-gray-50'
                    }`}
                  >
                    <Circle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{task.title}</p>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {task.estimatedMinutes} דקות
                        </span>
                        {task.resources.length > 0 && (
                          <span className="text-xs text-indigo-600">
                            {task.resources.join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Formulas */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          נוסחאות חשובות לשינון
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">קומבינטוריקה</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {keyFormulas.combinatorics.map((f, i) => (
                <div key={i} className="p-2 bg-blue-50 rounded-lg">
                  <p className="font-mono text-sm text-blue-800">{f.formula}</p>
                  <p className="text-xs text-blue-600">{f.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">אינדוקציה</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {keyFormulas.induction.map((f, i) => (
                <div key={i} className="p-2 bg-purple-50 rounded-lg">
                  <p className="font-mono text-sm text-purple-800">{f.formula}</p>
                  <p className="text-xs text-purple-600">{f.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">קבוצות</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {keyFormulas.sets.map((f, i) => (
                <div key={i} className="p-2 bg-green-50 rounded-lg">
                  <p className="font-mono text-sm text-green-800">{f.formula}</p>
                  <p className="text-xs text-green-600">{f.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">לוגיקה</h3>
            <div className="grid md:grid-cols-2 gap-2">
              {keyFormulas.logic.map((f, i) => (
                <div key={i} className="p-2 bg-orange-50 rounded-lg">
                  <p className="font-mono text-sm text-orange-800">{f.formula}</p>
                  <p className="text-xs text-orange-600">{f.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link
          href="/weeks"
          className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 hover:bg-indigo-100 transition-colors"
        >
          <h3 className="font-semibold text-indigo-900">לימוד שבועי</h3>
          <p className="text-sm text-indigo-600">סיכומים מסודרים</p>
        </Link>
        <Link
          href="/homework"
          className="bg-orange-50 border border-orange-200 rounded-xl p-4 hover:bg-orange-100 transition-colors"
        >
          <h3 className="font-semibold text-orange-900">שיעורי בית</h3>
          <p className="text-sm text-orange-600">שאלות ופתרונות</p>
        </Link>
        <Link
          href="/exams"
          className="bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition-colors"
        >
          <h3 className="font-semibold text-purple-900">מבחני עבר</h3>
          <p className="text-sm text-purple-600">ניתוח ופתרונות</p>
        </Link>
      </div>
    </div>
  );
}
