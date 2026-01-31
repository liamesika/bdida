'use client';

import Link from 'next/link';
import { Calendar, Clock, Target, CheckCircle, Circle, ChevronLeft } from 'lucide-react';
import { generateStudyPlan, studyStats } from '@/data/study-plan';

export default function CalendarPage() {
  const plan = generateStudyPlan()[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-indigo-600" />
          לוח לימודים למבחן
        </h1>
        <p className="text-gray-500">תכנית לימודים עד ל-4 בפברואר 2025</p>
      </div>

      {/* Exam Countdown */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">המבחן ביום רביעי</h2>
            <p className="text-red-100">4 בפברואר 2025</p>
          </div>
          <div className="text-center bg-white/20 rounded-xl px-6 py-3">
            <p className="text-4xl font-bold">{studyStats.daysUntilExam}</p>
            <p className="text-sm text-red-100">ימים נותרו</p>
          </div>
        </div>
      </div>

      {/* Study Days Info */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" />
          ימי לימוד זמינים
        </h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium">שבת 1.2</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">ראשון 2.2</span>
          <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium">שני 3.2</span>
          <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium">שלישי 4.2</span>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">תכנית לימודים יומית</h2>

        {plan.days.map((day, dayIndex) => (
          <div
            key={day.date}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            {/* Day Header */}
            <div className={`p-4 border-b ${
              dayIndex === 0 ? 'bg-indigo-50 border-indigo-100' :
              dayIndex === 1 ? 'bg-blue-50 border-blue-100' :
              dayIndex === 2 ? 'bg-purple-50 border-purple-100' :
              'bg-green-50 border-green-100'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    dayIndex === 0 ? 'bg-indigo-500' :
                    dayIndex === 1 ? 'bg-blue-500' :
                    dayIndex === 2 ? 'bg-purple-500' :
                    'bg-green-500'
                  }`}>
                    {dayIndex + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {day.dayNameHe} - {day.date.slice(5)}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {day.topics.map(t => t.nameHe).join(' + ')}
                    </p>
                  </div>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      {day.tasks.reduce((sum, t) => sum + t.estimatedMinutes, 0)} דקות
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="divide-y divide-gray-50">
              {day.tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 flex items-start gap-3 hover:bg-gray-50"
                >
                  <Circle className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.type === 'exam-simulation' ? 'bg-red-100 text-red-700' :
                        task.type === 'practice' ? 'bg-blue-100 text-blue-700' :
                        task.type === 'memorize' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {task.type === 'exam-simulation' ? 'סימולציה' :
                         task.type === 'practice' ? 'תרגול' :
                         task.type === 'memorize' ? 'שינון' : 'חזרה'}
                      </span>
                      <span className="text-xs text-gray-500">
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

      {/* Legend */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-medium text-gray-700 mb-3">מקרא סוגי משימות</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">חזרה</span>
            <span className="text-sm text-gray-500">קריאה ועיון בחומר</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs">תרגול</span>
            <span className="text-sm text-gray-500">פתרון שאלות</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs">שינון</span>
            <span className="text-sm text-gray-500">לימוד בעל פה</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">סימולציה</span>
            <span className="text-sm text-gray-500">מבחן בתנאי אמת</span>
          </div>
        </div>
      </div>
    </div>
  );
}
