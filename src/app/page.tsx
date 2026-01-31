'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  TrendingUp,
  FileQuestion,
  GraduationCap,
  Clock,
  Target,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { useAutoInit } from '@/hooks/useAutoInit';
import { dbHelpers } from '@/lib/db';
import type { KnowledgeItem, HomeworkQuestion, ExamPattern } from '@/types';

export default function Dashboard() {
  const { status, reindex } = useAutoInit();
  const [topItems, setTopItems] = useState<KnowledgeItem[]>([]);
  const [topHomework, setTopHomework] = useState<HomeworkQuestion[]>([]);
  const [patterns, setPatterns] = useState<ExamPattern[]>([]);
  const [stats, setStats] = useState<{
    definitions: number;
    theorems: number;
    proofs: number;
    techniques: number;
  } | null>(null);

  useEffect(() => {
    if (status.isComplete) {
      loadDashboardData();
    }
  }, [status.isComplete]);

  async function loadDashboardData() {
    const items = await dbHelpers.getTopLikelihoodItems(5);
    setTopItems(items);

    const hw = await dbHelpers.getHomeworkQuestionsByLikelihood();
    setTopHomework(hw.slice(0, 5));

    const p = await dbHelpers.getExamPatterns();
    setPatterns(p.slice(0, 5));

    const allItems = await dbHelpers.getAllKnowledgeItems();
    setStats({
      definitions: allItems.filter(i => i.type === 'definition').length,
      theorems: allItems.filter(i => i.type === 'theorem').length,
      proofs: allItems.filter(i => i.type === 'proof').length,
      techniques: allItems.filter(i => i.type === 'technique' || i.type === 'algorithm').length,
    });
  }

  // Loading state
  if (status.isInitializing) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">טוען את בסיס הידע...</h2>
          <p className="text-gray-500">{status.currentFile}</p>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300 progress-animate"
              style={{ width: `${status.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400">
            {status.processedFiles} / {status.totalFiles} קבצים
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (status.error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-semibold text-gray-900">שגיאה בטעינה</h2>
          <p className="text-gray-500 max-w-md">{status.error}</p>
          <button
            onClick={reindex}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            נסה שוב
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">לוח בקרה</h1>
          <p className="text-gray-500">מתמטיקה בדידה - סקירה כללית</p>
        </div>
        <button
          onClick={reindex}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>עדכן אינדקס</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.definitions || 0}</p>
              <p className="text-xs text-gray-500">הגדרות</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.theorems || 0}</p>
              <p className="text-xs text-gray-500">משפטים</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.proofs || 0}</p>
              <p className="text-xs text-gray-500">הוכחות</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats?.techniques || 0}</p>
              <p className="text-xs text-gray-500">טכניקות</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Exam Items */}
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
            {topItems.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                אין נתונים עדיין
              </div>
            ) : (
              topItems.map((item, index) => (
                <div key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                      ${index === 0 ? 'likelihood-critical' : index < 3 ? 'likelihood-high' : 'likelihood-medium'}
                    `}>
                      {item.likelihoodScore}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-sm text-gray-500 capitalize">{item.type}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Homework Questions */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-orange-600" />
                שאלות שי"ב לתרגל
              </h2>
              <Link href="/homework" className="text-sm text-indigo-600 hover:underline">
                הצג הכל
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {topHomework.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                אין נתונים עדיין
              </div>
            ) : (
              topHomework.map((q) => (
                <div key={q.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                      ${q.examLikelihoodScore >= 70 ? 'likelihood-critical' : q.examLikelihoodScore >= 50 ? 'likelihood-high' : 'likelihood-medium'}
                    `}>
                      {q.examLikelihoodScore}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">
                        שי"ב {q.homeworkNumber} - שאלה {q.questionNumber}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {q.topics.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Exam Patterns */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              דפוסי שאלות נפוצים
            </h2>
            <Link href="/exams" className="text-sm text-indigo-600 hover:underline">
              ניתוח מלא
            </Link>
          </div>
        </div>
        <div className="p-4">
          {patterns.length === 0 ? (
            <div className="text-center text-gray-400 py-4">
              אין נתונים עדיין
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {pattern.description}
                    </span>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                      {pattern.frequency}x
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pattern.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="topic-badge">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link
          href="/practice"
          className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-4 hover:from-indigo-600 hover:to-indigo-700 transition-all card-hover"
        >
          <GraduationCap className="w-6 h-6 mb-2" />
          <p className="font-semibold">התחל תרגול</p>
          <p className="text-sm text-indigo-100">פלאשקארדס ותרגילים</p>
        </Link>

        <Link
          href="/knowledge"
          className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 hover:from-blue-600 hover:to-blue-700 transition-all card-hover"
        >
          <BookOpen className="w-6 h-6 mb-2" />
          <p className="font-semibold">בסיס ידע</p>
          <p className="text-sm text-blue-100">הגדרות ומשפטים</p>
        </Link>

        <Link
          href="/likelihood"
          className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 hover:from-orange-600 hover:to-orange-700 transition-all card-hover"
        >
          <TrendingUp className="w-6 h-6 mb-2" />
          <p className="font-semibold">סבירות למבחן</p>
          <p className="text-sm text-orange-100">מה הכי חשוב</p>
        </Link>

        <Link
          href="/roadmap"
          className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 hover:from-green-600 hover:to-green-700 transition-all card-hover"
        >
          <Target className="w-6 h-6 mb-2" />
          <p className="font-semibold">מפת לימוד</p>
          <p className="text-sm text-green-100">תכנית מותאמת</p>
        </Link>
      </div>
    </div>
  );
}
