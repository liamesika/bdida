'use client';

import { useState, useEffect } from 'react';
import { Map, Calendar, Clock, Target, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import { getLikelihoodAnalysis, getTopicAnalysis } from '@/lib/analysis';
import type { StudyPlan, DailyPlan, StudyTask, Topic, KnowledgeItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { addDays, format, differenceInDays, isToday, isBefore, startOfDay } from 'date-fns';

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

export default function RoadmapPage() {
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [examDate, setExamDate] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(3);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [topItems, setTopItems] = useState<KnowledgeItem[]>([]);

  useEffect(() => {
    loadPlan();
  }, []);

  async function loadPlan() {
    setLoading(true);
    const existingPlan = await dbHelpers.getActiveStudyPlan();
    if (existingPlan) {
      setPlan(existingPlan);
      setExamDate(format(new Date(existingPlan.examDate), 'yyyy-MM-dd'));
      setHoursPerDay(existingPlan.hoursPerDay);
    }

    const items = await dbHelpers.getTopLikelihoodItems(30);
    setTopItems(items);

    setLoading(false);
  }

  async function generatePlan() {
    if (!examDate) return;

    setGenerating(true);

    const exam = new Date(examDate);
    const today = startOfDay(new Date());
    const daysUntilExam = differenceInDays(exam, today);

    if (daysUntilExam <= 0) {
      alert('תאריך המבחן חייב להיות בעתיד');
      setGenerating(false);
      return;
    }

    // Get analysis data
    const analysis = await getLikelihoodAnalysis();
    const topicAnalysis = await getTopicAnalysis();

    // Prioritize topics by exam frequency
    const prioritizedTopics = topicAnalysis
      .sort((a, b) => b.frequency - a.frequency)
      .map(t => t.topic);

    // Create daily plans
    const dailyPlans: DailyPlan[] = [];
    const minutesPerDay = hoursPerDay * 60;

    // Get all items sorted by likelihood
    const allItems = await dbHelpers.getTopLikelihoodItems(100);

    let itemIndex = 0;

    for (let day = 0; day < daysUntilExam; day++) {
      const date = addDays(today, day);
      const tasks: StudyTask[] = [];
      let remainingMinutes = minutesPerDay;

      // Phase based on days remaining
      const daysLeft = daysUntilExam - day;
      const phase = daysLeft > daysUntilExam * 0.6 ? 'learning' :
                    daysLeft > daysUntilExam * 0.3 ? 'review' : 'intensive';

      if (phase === 'learning') {
        // Learning phase: focus on new material
        while (remainingMinutes >= 20 && itemIndex < allItems.length) {
          const item = allItems[itemIndex];
          const taskTime = item.type === 'proof' ? 30 : item.type === 'theorem' ? 20 : 15;

          if (taskTime <= remainingMinutes) {
            tasks.push({
              id: uuidv4(),
              type: item.type === 'proof' ? 'memorize-proof' : 'memorize-theorem',
              description: `לימוד: ${item.title}`,
              targetItems: [item.id],
              estimatedMinutes: taskTime,
              isCompleted: false,
              priority: item.likelihoodScore >= 70 ? 'critical' : item.likelihoodScore >= 50 ? 'high' : 'medium',
            });
            remainingMinutes -= taskTime;
            itemIndex++;
          } else {
            break;
          }
        }

        // Add practice
        if (remainingMinutes >= 30) {
          tasks.push({
            id: uuidv4(),
            type: 'practice-problems',
            description: 'תרגול שאלות מהשי"ב',
            targetItems: [],
            estimatedMinutes: 30,
            isCompleted: false,
            priority: 'medium',
          });
          remainingMinutes -= 30;
        }
      } else if (phase === 'review') {
        // Review phase: revisit high-priority items
        const reviewItems = allItems.slice(0, 20);
        for (const item of reviewItems.slice(0, 5)) {
          if (remainingMinutes < 15) break;
          tasks.push({
            id: uuidv4(),
            type: 'review-definitions',
            description: `חזרה: ${item.title}`,
            targetItems: [item.id],
            estimatedMinutes: 15,
            isCompleted: false,
            priority: item.likelihoodScore >= 70 ? 'critical' : 'high',
          });
          remainingMinutes -= 15;
        }

        // Add exam simulation
        if (remainingMinutes >= 45) {
          tasks.push({
            id: uuidv4(),
            type: 'exam-simulation',
            description: 'סימולציית מבחן - פתרון שאלות בלחץ זמן',
            targetItems: [],
            estimatedMinutes: 45,
            isCompleted: false,
            priority: 'high',
          });
          remainingMinutes -= 45;
        }
      } else {
        // Intensive phase: last few days
        tasks.push({
          id: uuidv4(),
          type: 'review-definitions',
          description: 'חזרה על הגדרות ומשפטים מרכזיים',
          targetItems: allItems.slice(0, 10).map(i => i.id),
          estimatedMinutes: 60,
          isCompleted: false,
          priority: 'critical',
        });
        remainingMinutes -= 60;

        if (remainingMinutes >= 60) {
          tasks.push({
            id: uuidv4(),
            type: 'exam-simulation',
            description: 'סימולציית מבחן מלאה',
            targetItems: [],
            estimatedMinutes: 90,
            isCompleted: false,
            priority: 'critical',
          });
        }
      }

      dailyPlans.push({
        date,
        tasks,
        isCompleted: false,
      });
    }

    const newPlan: StudyPlan = {
      id: uuidv4(),
      examDate: exam,
      hoursPerDay,
      weakTopics: prioritizedTopics.slice(0, 3),
      createdAt: new Date(),
      dailyPlans,
    };

    await dbHelpers.saveStudyPlan(newPlan);
    setPlan(newPlan);
    setGenerating(false);
  }

  async function toggleTask(dayIndex: number, taskId: string) {
    if (!plan) return;

    const updatedPlan = { ...plan };
    const task = updatedPlan.dailyPlans[dayIndex].tasks.find(t => t.id === taskId);
    if (task) {
      task.isCompleted = !task.isCompleted;

      // Check if day is complete
      const allComplete = updatedPlan.dailyPlans[dayIndex].tasks.every(t => t.isCompleted);
      updatedPlan.dailyPlans[dayIndex].isCompleted = allComplete;

      await dbHelpers.saveStudyPlan(updatedPlan);
      setPlan(updatedPlan);
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded skeleton" />
        <div className="h-48 bg-gray-200 rounded-xl skeleton" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  const today = startOfDay(new Date());
  const daysUntilExam = plan ? differenceInDays(new Date(plan.examDate), today) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Map className="w-7 h-7 text-green-600" />
          מפת לימוד
        </h1>
        <p className="text-gray-500">תכנית לימוד מותאמת אישית לקראת המבחן</p>
      </div>

      {/* Plan Generator */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-green-600" />
          יצירת תכנית לימוד
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">תאריך מבחן</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">שעות ליום</label>
            <input
              type="number"
              min="1"
              max="12"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseInt(e.target.value) || 3)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={generatePlan}
              disabled={!examDate || generating}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  מייצר...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4" />
                  {plan ? 'עדכן תכנית' : 'צור תכנית'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Plan Overview */}
      {plan && (
        <>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{daysUntilExam}</p>
                  <p className="text-xs text-gray-500">ימים למבחן</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{plan.hoursPerDay * daysUntilExam}</p>
                  <p className="text-xs text-gray-500">שעות לימוד מתוכננות</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {plan.dailyPlans.filter(d => d.isCompleted).length}/{plan.dailyPlans.length}
                  </p>
                  <p className="text-xs text-gray-500">ימים הושלמו</p>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Tasks */}
          {plan.dailyPlans.some(d => isToday(new Date(d.date))) && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                המשימות של היום
              </h2>
              <div className="space-y-2">
                {plan.dailyPlans
                  .find(d => isToday(new Date(d.date)))
                  ?.tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        task.isCompleted ? 'bg-white/20' : 'bg-white/10'
                      }`}
                    >
                      <button
                        onClick={() => {
                          const dayIndex = plan.dailyPlans.findIndex(d => isToday(new Date(d.date)));
                          toggleTask(dayIndex, task.id);
                        }}
                        className="shrink-0"
                      >
                        {task.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-200" />
                        ) : (
                          <Circle className="w-5 h-5 text-white/60" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className={task.isCompleted ? 'line-through opacity-60' : ''}>
                          {task.description}
                        </p>
                        <p className="text-sm text-white/60">{task.estimatedMinutes} דקות</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        task.priority === 'critical' ? 'bg-red-400/30' :
                        task.priority === 'high' ? 'bg-orange-400/30' : 'bg-white/20'
                      }`}>
                        {task.priority === 'critical' ? 'קריטי' :
                         task.priority === 'high' ? 'גבוה' : 'בינוני'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Full Plan */}
          <div className="bg-white rounded-xl border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">תכנית מלאה</h2>
            </div>
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
              {plan.dailyPlans.map((day, dayIndex) => {
                const dayDate = new Date(day.date);
                const isPast = isBefore(dayDate, today) && !isToday(dayDate);

                return (
                  <div
                    key={dayIndex}
                    className={`p-4 ${isToday(dayDate) ? 'bg-green-50' : isPast ? 'bg-gray-50 opacity-60' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {day.isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : isPast ? (
                          <AlertCircle className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                        <span className="font-medium text-gray-900">
                          {format(dayDate, 'dd/MM/yyyy')}
                          {isToday(dayDate) && <span className="text-green-600 mr-2">(היום)</span>}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {day.tasks.filter(t => t.isCompleted).length}/{day.tasks.length} משימות
                      </span>
                    </div>
                    <div className="space-y-1 mr-7">
                      {day.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <button
                            onClick={() => toggleTask(dayIndex, task.id)}
                            disabled={isPast && !isToday(dayDate)}
                          >
                            {task.isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-300" />
                            )}
                          </button>
                          <span className={task.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'}>
                            {task.description}
                          </span>
                          <span className="text-xs text-gray-400">({task.estimatedMinutes} דק')</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
