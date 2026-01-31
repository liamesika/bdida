'use client';

import { Bug, BookOpen, FileQuestion, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { getAllWeeks } from '@/data/weeks-content';
import { getAllHomework } from '@/data/homework-data';
import { getAllExams, topicFrequencies } from '@/data/exam-data';

export default function DebugPage() {
  const weeks = getAllWeeks();
  const homework = getAllHomework();
  const exams = getAllExams();

  const stats = {
    weeks: weeks.length,
    definitions: weeks.reduce((sum, w) => sum + w.definitions.length, 0),
    theorems: weeks.reduce((sum, w) => sum + w.theorems.length, 0),
    techniques: weeks.reduce((sum, w) => sum + w.techniques.length, 0),
    homeworkSets: homework.length,
    homeworkQuestions: homework.reduce((sum, h) => sum + h.questions.length, 0),
    exams: exams.length,
    examQuestions: exams.reduce((sum, e) => sum + e.questions.length, 0),
    topics: topicFrequencies.length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Bug className="w-7 h-7 text-gray-600" />
          סטטוס מערכת
        </h1>
        <p className="text-gray-500">סטטיסטיקות על הנתונים הסטטיים</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-green-800 font-medium">המערכת עובדת במצב סטטי - אין צורך ב-API או בסיס נתונים</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">תוכן שבועי</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span>שבועות:</span><span className="font-bold">{stats.weeks}</span></p>
            <p className="flex justify-between"><span>הגדרות:</span><span className="font-bold">{stats.definitions}</span></p>
            <p className="flex justify-between"><span>משפטים:</span><span className="font-bold">{stats.theorems}</span></p>
            <p className="flex justify-between"><span>טכניקות:</span><span className="font-bold">{stats.techniques}</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <FileQuestion className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900">שיעורי בית</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span>תרגילים:</span><span className="font-bold">{stats.homeworkSets}</span></p>
            <p className="flex justify-between"><span>שאלות:</span><span className="font-bold">{stats.homeworkQuestions}</span></p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900">מבחנים</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span>מבחנים:</span><span className="font-bold">{stats.exams}</span></p>
            <p className="flex justify-between"><span>שאלות:</span><span className="font-bold">{stats.examQuestions}</span></p>
            <p className="flex justify-between"><span>נושאים:</span><span className="font-bold">{stats.topics}</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">קישורים מהירים</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/" className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">דף הבית</Link>
          <Link href="/weeks" className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200">שבועות</Link>
          <Link href="/homework" className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200">שיעורי בית</Link>
          <Link href="/exams" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">מבחנים</Link>
          <Link href="/likelihood" className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">סבירות</Link>
        </div>
      </div>
    </div>
  );
}
