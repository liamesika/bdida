'use client';

import { useRouter } from 'next/navigation';
import {
  Layers,
  BookOpen,
  Lightbulb,
  Wrench,
  ChevronLeft,
  GraduationCap,
} from 'lucide-react';
import { getAllWeeks } from '@/data/weeks-content';

export default function WeeksPage() {
  const router = useRouter();
  const weeks = getAllWeeks();

  const totalDefinitions = weeks.reduce((sum, w) => sum + w.definitions.length, 0);
  const totalTheorems = weeks.reduce((sum, w) => sum + w.theorems.length, 0);
  const totalTechniques = weeks.reduce((sum, w) => sum + w.techniques.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Layers className="w-7 h-7 text-indigo-600" />
          לימוד שבועי
        </h1>
        <p className="text-gray-500 mt-1">סיכומים מסודרים לפי שבועות הקורס</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-indigo-600">{weeks.length}</p>
          <p className="text-sm text-gray-500">שבועות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{totalDefinitions}</p>
          <p className="text-sm text-gray-500">הגדרות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">{totalTheorems}</p>
          <p className="text-sm text-gray-500">משפטים</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{totalTechniques}</p>
          <p className="text-sm text-gray-500">טכניקות</p>
        </div>
      </div>

      {/* Weeks Grid */}
      <div className="grid gap-4">
        {weeks.map((week) => (
          <button
            key={week.weekNumber}
            onClick={() => router.push(`/weeks/${week.weekNumber}`)}
            className="bg-white rounded-xl border border-gray-100 p-5 text-right hover:border-indigo-200 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center font-bold text-lg">
                    {week.weekNumber}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{week.titleHe}</h3>
                    <p className="text-sm text-gray-500">הרצאות {week.lectures.join(', ')}</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3">{week.summary}</p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {week.topics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-blue-600">
                    <BookOpen className="w-4 h-4" />
                    {week.definitions.length} הגדרות
                  </span>
                  <span className="flex items-center gap-1 text-purple-600">
                    <Lightbulb className="w-4 h-4" />
                    {week.theorems.length} משפטים
                  </span>
                  <span className="flex items-center gap-1 text-green-600">
                    <Wrench className="w-4 h-4" />
                    {week.techniques.length} טכניקות
                  </span>
                </div>
              </div>

              <ChevronLeft className="w-5 h-5 text-gray-300 group-hover:text-indigo-600 transition-colors mt-2" />
            </div>
          </button>
        ))}
      </div>

      {/* Special Summaries */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          סיכומים מיוחדים
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/weeks/functions-summary')}
            className="p-4 bg-gradient-to-l from-indigo-500 to-purple-500 rounded-xl text-white text-right hover:from-indigo-600 hover:to-purple-600 transition-all"
          >
            <h3 className="font-bold text-lg mb-1">סיכום מלא: פונקציות</h3>
            <p className="text-indigo-100 text-sm">כולל שיעורי בית 5 + דוגמאות מפורטות</p>
          </button>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">טיפ ללימוד</h3>
            <p className="text-indigo-100">
              מומלץ ללמוד את החומר בסדר השבועות. כל שבוע בונה על השבועות הקודמים.
              התחל מהגדרות, עבור למשפטים, ולבסוף תרגל את הטכניקות.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
