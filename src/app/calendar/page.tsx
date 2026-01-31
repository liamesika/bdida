'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  AlertTriangle,
  RefreshCw,
  Loader2,
  Target,
  BookOpen,
  ChevronLeft,
} from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import { buildStudyWeeks, buildExamCalendar } from '@/lib/weeks';
import type { ExamCalendar, DailyStudySchedule, WeekStudyTask } from '@/types';
import { format, differenceInDays, isToday, isBefore, isAfter } from 'date-fns';
import { he } from 'date-fns/locale';

export default function CalendarPage() {
  const [calendar, setCalendar] = useState<ExamCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [building, setBuilding] = useState(false);

  useEffect(() => {
    loadCalendar();
  }, []);

  async function loadCalendar() {
    setLoading(true);

    // Make sure weeks exist
    const weeks = await dbHelpers.getAllStudyWeeks();
    if (weeks.length === 0) {
      await buildStudyWeeks();
    }

    // Load or build calendar
    let cal = await dbHelpers.getExamCalendar();
    if (!cal) {
      setBuilding(true);
      cal = await buildExamCalendar();
      setBuilding(false);
    }

    setCalendar(cal);
    setLoading(false);
  }

  async function handleRebuild() {
    setBuilding(true);
    await buildStudyWeeks();
    const cal = await buildExamCalendar();
    setCalendar(cal);
    setBuilding(false);
  }

  async function toggleTaskCompletion(dayIndex: number, taskId: string) {
    if (!calendar) return;

    const updatedSchedule = [...calendar.dailySchedule];
    const day = updatedSchedule[dayIndex];
    const task = day.tasks.find(t => t.id === taskId);

    if (task) {
      task.isCompleted = !task.isCompleted;

      // Check if all tasks for day are complete
      day.isCompleted = day.tasks.every(t => t.isCompleted);

      const updatedCalendar = {
        ...calendar,
        dailySchedule: updatedSchedule,
      };

      await dbHelpers.saveExamCalendar(updatedCalendar);
      setCalendar(updatedCalendar);
    }
  }

  const examDate = calendar ? new Date(calendar.examDate) : new Date(2025, 1, 4);
  const daysUntilExam = differenceInDays(examDate, new Date());

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-500">
            {building ? 'בונה לוח לימודים...' : 'טוען לוח זמנים...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-7 h-7 text-indigo-600" />
            לוח לימודים למבחן
          </h1>
          <p className="text-gray-500">תכנית לימודים אוטומטית עד למבחן</p>
        </div>
        <button
          onClick={handleRebuild}
          disabled={building}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${building ? 'animate-spin' : ''}`} />
          {building ? 'בונה...' : 'בנה מחדש'}
        </button>
      </div>

      {/* Exam Countdown */}
      <div className={`rounded-xl p-6 ${
        daysUntilExam <= 3 ? 'bg-red-50 border border-red-200' :
        daysUntilExam <= 7 ? 'bg-orange-50 border border-orange-200' :
        'bg-indigo-50 border border-indigo-200'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className={`text-xl font-bold ${
              daysUntilExam <= 3 ? 'text-red-800' :
              daysUntilExam <= 7 ? 'text-orange-800' :
              'text-indigo-800'
            }`}>
              המבחן ב-{format(examDate, 'EEEE, d בMMMM yyyy', { locale: he })}
            </h2>
            <p className={`${
              daysUntilExam <= 3 ? 'text-red-600' :
              daysUntilExam <= 7 ? 'text-orange-600' :
              'text-indigo-600'
            }`}>
              יום רביעי, 4 בפברואר 2025
            </p>
          </div>
          <div className={`text-center px-6 py-3 rounded-xl ${
            daysUntilExam <= 3 ? 'bg-red-100' :
            daysUntilExam <= 7 ? 'bg-orange-100' :
            'bg-indigo-100'
          }`}>
            <p className={`text-4xl font-bold ${
              daysUntilExam <= 3 ? 'text-red-700' :
              daysUntilExam <= 7 ? 'text-orange-700' :
              'text-indigo-700'
            }`}>
              {daysUntilExam}
            </p>
            <p className={`text-sm ${
              daysUntilExam <= 3 ? 'text-red-600' :
              daysUntilExam <= 7 ? 'text-orange-600' :
              'text-indigo-600'
            }`}>
              ימים נותרו
            </p>
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
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">שבת</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">יום ראשון</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">יום שני</span>
          <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">יום שלישי</span>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          התכנית מבוססת על לימוד בימים אלו בלבד
        </p>
      </div>

      {/* Daily Schedule */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">תכנית לימודים יומית</h2>

        {calendar?.dailySchedule.map((day, dayIndex) => {
          const dayDate = new Date(day.date);
          const isPast = isBefore(dayDate, new Date()) && !isToday(dayDate);
          const isTodayDate = isToday(dayDate);
          const completedTasks = day.tasks.filter(t => t.isCompleted).length;
          const totalTasks = day.tasks.length;

          return (
            <div
              key={dayIndex}
              className={`bg-white rounded-xl border overflow-hidden ${
                isTodayDate ? 'border-indigo-300 ring-2 ring-indigo-100' :
                isPast ? 'border-gray-200 opacity-60' :
                'border-gray-100'
              }`}
            >
              {/* Day Header */}
              <div className={`p-4 border-b ${
                isTodayDate ? 'bg-indigo-50 border-indigo-100' :
                day.isCompleted ? 'bg-green-50 border-green-100' :
                'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {day.isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : isTodayDate ? (
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {day.dayName} - {format(dayDate, 'd/M', { locale: he })}
                      </h3>
                      <p className="text-sm text-gray-500">
                        שבועות: {day.weekNumbers.join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{day.totalMinutes} דקות</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {completedTasks}/{totalTasks} משימות
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      day.isCompleted ? 'bg-green-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="divide-y divide-gray-50">
                {day.tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 flex items-start gap-3 ${
                      task.isCompleted ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <button
                      onClick={() => toggleTaskCompletion(dayIndex, task.id)}
                      className={`mt-0.5 shrink-0 ${
                        task.isCompleted ? 'text-green-600' : 'text-gray-400 hover:text-green-600'
                      }`}
                    >
                      {task.isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium ${
                        task.isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          task.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {task.priority === 'critical' ? 'קריטי' :
                           task.priority === 'high' ? 'חשוב' : 'רגיל'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {task.estimatedMinutes} דקות
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/weeks/${task.weekNumber}`}
                      className="text-indigo-600 hover:text-indigo-700 text-sm flex items-center gap-1"
                    >
                      לשבוע
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-medium text-gray-700 mb-3">מקרא עדיפויות</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs">קריטי</span>
            <span className="text-sm text-gray-500">נושאים עם סבירות גבוהה מאוד למבחן</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs">חשוב</span>
            <span className="text-sm text-gray-500">נושאים עם סבירות גבוהה למבחן</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">רגיל</span>
            <span className="text-sm text-gray-500">נושאים עם סבירות בינונית</span>
          </div>
        </div>
      </div>
    </div>
  );
}
