'use client';

import Link from 'next/link';
import {
  BookOpen,
  TrendingUp,
  FileQuestion,
  GraduationCap,
  Clock,
  Target,
  Layers,
  Calculator,
} from 'lucide-react';
import { getAllWeeks } from '@/data/weeks-content';
import { topicFrequencies } from '@/data/exam-data';
import { studyStats, keyFormulas } from '@/data/study-plan';

export default function Dashboard() {
  const weeks = getAllWeeks();

  // Calculate stats from static data
  const stats = {
    definitions: weeks.reduce((sum, w) => sum + w.definitions.length, 0),
    theorems: weeks.reduce((sum, w) => sum + w.theorems.length, 0),
    techniques: weeks.reduce((sum, w) => sum + w.techniques.length, 0),
    weeks: weeks.length,
  };

  // Get top topics by exam likelihood
  const topTopics = topicFrequencies.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">לוח בקרה</h1>
          <p className="text-gray-500">מתמטיקה בדידה - סקירה כללית</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg">
          <Clock className="w-4 h-4" />
          <span className="font-bold">מבחן: 4 בפברואר 2025</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.definitions}</p>
              <p className="text-xs text-gray-500">הגדרות</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.theorems}</p>
              <p className="text-xs text-gray-500">משפטים</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.techniques}</p>
              <p className="text-xs text-gray-500">טכניקות</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.weeks}</p>
              <p className="text-xs text-gray-500">שבועות</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Topics by Exam Likelihood */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                הכי סביר במבחן
              </h2>
              <Link href="/likelihood" className="text-sm text-indigo-600 hover:underline">
                הצג הכל
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {topTopics.map((topic, index) => (
              <div key={topic.topic} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                    ${topic.percentage >= 80 ? 'bg-red-500' : topic.percentage >= 60 ? 'bg-orange-500' : 'bg-yellow-500'}
                  `}>
                    {topic.percentage}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{topic.topicHe}</p>
                    <p className="text-sm text-gray-500">הופיע {topic.count} פעמים במבחנים</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Study Plan */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                תכנית לימוד
              </h2>
              <Link href="/roadmap" className="text-sm text-indigo-600 hover:underline">
                תכנית מלאה
              </Link>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <p className="font-medium text-indigo-900">שבת 1.2 - אינדוקציה + פונקציות</p>
              <p className="text-sm text-indigo-700">חזרה מהירה + תרגול ממבחנים</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-medium text-blue-900">ראשון 2.2 - קומבינטוריקה + קבוצות</p>
              <p className="text-sm text-blue-700">שינון נוסחאות + תרגול</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-medium text-purple-900">שני 3.2 - עש"ה + סימולציית מבחן</p>
              <p className="text-sm text-purple-700">מבחן הכנה בתנאי אמת</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-medium text-green-900">שלישי 4.2 - יום המבחן</p>
              <p className="text-sm text-green-700">חזרה אחרונה על נוסחאות</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Formulas Preview */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-600" />
              נוסחאות חשובות
            </h2>
            <Link href="/formulas" className="text-sm text-indigo-600 hover:underline">
              כל הנוסחאות
            </Link>
          </div>
        </div>
        <div className="p-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {keyFormulas.combinatorics.slice(0, 3).map((f, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-mono text-sm text-gray-700">{f.formula}</p>
                <p className="text-xs text-gray-500 mt-1">{f.name}</p>
              </div>
            ))}
            {keyFormulas.induction.slice(0, 2).map((f, i) => (
              <div key={`ind-${i}`} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-mono text-sm text-gray-700">{f.formula}</p>
                <p className="text-xs text-gray-500 mt-1">{f.name}</p>
              </div>
            ))}
            {keyFormulas.sets.slice(0, 1).map((f, i) => (
              <div key={`sets-${i}`} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <p className="font-mono text-sm text-gray-700">{f.formula}</p>
                <p className="text-xs text-gray-500 mt-1">{f.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/weeks"
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-4 hover:from-indigo-600 hover:to-indigo-700 transition-all"
        >
          <Layers className="w-6 h-6 mb-2" />
          <p className="font-semibold">לימוד שבועי</p>
          <p className="text-sm text-indigo-100">סיכומים לפי שבועות</p>
        </Link>

        <Link
          href="/homework"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          <FileQuestion className="w-6 h-6 mb-2" />
          <p className="font-semibold">שיעורי בית</p>
          <p className="text-sm text-blue-100">תרגילים ופתרונות</p>
        </Link>

        <Link
          href="/exams"
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 hover:from-orange-600 hover:to-orange-700 transition-all"
        >
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="font-semibold">מבחנים</p>
          <p className="text-sm text-orange-100">מבחני עבר + ניתוח</p>
        </Link>

        <Link
          href="/roadmap"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 hover:from-green-600 hover:to-green-700 transition-all"
        >
          <Target className="w-6 h-6 mb-2" />
          <p className="font-semibold">מפת לימוד</p>
          <p className="text-sm text-green-100">תכנית מותאמת</p>
        </Link>
      </div>
    </div>
  );
}
