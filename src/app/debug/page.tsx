'use client';

import { useState, useEffect } from 'react';
import { Bug, Database, FileText, RefreshCw, Trash2, CheckCircle, XCircle, Folder } from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import { useAutoInit } from '@/hooks/useAutoInit';

interface DebugStats {
  files: number;
  knowledgeItems: number;
  examQuestions: number;
  homeworkQuestions: number;
  patterns: number;
  lastIndexedAt: Date | null;
}

interface ScanResult {
  path: string;
  fileCount: number;
  files: { name: string; path: string; category: string; size: number }[];
  categories: {
    lectures: number;
    tutorials: number;
    homework: number;
    exams: number;
  };
}

export default function DebugPage() {
  const { status, reindex } = useAutoInit();
  const [stats, setStats] = useState<DebugStats | null>(null);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadDebugData();
  }, [status.isComplete]);

  async function loadDebugData() {
    setLoading(true);

    // Get DB stats
    const dbStats = await dbHelpers.getStats();
    setStats({
      files: dbStats.totalFiles,
      knowledgeItems: dbStats.totalKnowledgeItems,
      examQuestions: dbStats.totalExamQuestions || 0,
      homeworkQuestions: dbStats.totalHomeworkQuestions || 0,
      patterns: dbStats.totalPatterns || 0,
      lastIndexedAt: dbStats.lastIndexedAt || null,
    });

    // Get scan result
    try {
      const response = await fetch('/api/scan');
      const result = await response.json();
      setScanResult(result);
    } catch (error) {
      console.error('Scan error:', error);
    }

    setLoading(false);
  }

  async function handleClearAll() {
    if (!confirm('האם אתה בטוח? פעולה זו תמחק את כל הנתונים.')) return;

    setClearing(true);
    await dbHelpers.clearAllData();
    await loadDebugData();
    setClearing(false);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded skeleton" />
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Bug className="w-7 h-7 text-red-600" />
            דיבאג
          </h1>
          <p className="text-gray-500">מידע טכני על מצב המערכת</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadDebugData}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            רענן
          </button>
          <button
            onClick={handleClearAll}
            disabled={clearing}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 flex items-center gap-2 disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            {clearing ? 'מוחק...' : 'נקה הכל'}
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-600" />
          מצב מערכת
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">סטטוס אינדקס</span>
              <span className={`flex items-center gap-1 ${status.isComplete ? 'text-green-600' : status.isInitializing ? 'text-yellow-600' : 'text-red-600'}`}>
                {status.isComplete ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    תקין
                  </>
                ) : status.isInitializing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    מאנדקס...
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    לא מאונדקס
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">אינדקס אחרון</span>
              <span className="text-gray-900">
                {stats?.lastIndexedAt
                  ? new Date(stats.lastIndexedAt).toLocaleString('he-IL')
                  : 'אף פעם'}
              </span>
            </div>

            {status.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{status.error}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => reindex()}
              disabled={status.isInitializing}
              className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${status.isInitializing ? 'animate-spin' : ''}`} />
              {status.isInitializing ? 'מאנדקס...' : 'אנדקס מחדש'}
            </button>

            {status.isInitializing && (
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-yellow-700 text-sm">
                  מעבד: {status.currentFile}
                </p>
                <div className="w-full h-2 bg-yellow-200 rounded-full mt-2">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all"
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  {status.processedFiles} / {status.totalFiles}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Path Configuration */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Folder className="w-5 h-5 text-orange-600" />
          נתיב נתונים
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm">
            {scanResult?.path || '/Users/liamesika/Desktop/infi/bdida'}
          </div>
          <div className="flex items-center gap-2">
            {scanResult?.fileCount !== undefined && scanResult.fileCount > 0 ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                נמצאו {scanResult.fileCount} קבצים
              </span>
            ) : (
              <span className="text-red-600 flex items-center gap-1">
                <XCircle className="w-4 h-4" />
                לא נמצאו קבצים
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Database Records */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-green-600" />
          רשומות בבסיס הנתונים
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">{stats?.files || 0}</p>
            <p className="text-sm text-blue-700">קבצים</p>
          </div>
          <div className="text-center p-4 bg-indigo-50 rounded-lg">
            <p className="text-3xl font-bold text-indigo-600">{stats?.knowledgeItems || 0}</p>
            <p className="text-sm text-indigo-700">פריטי ידע</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-3xl font-bold text-purple-600">{stats?.examQuestions || 0}</p>
            <p className="text-sm text-purple-700">שאלות מבחן</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-3xl font-bold text-orange-600">{stats?.homeworkQuestions || 0}</p>
            <p className="text-sm text-orange-700">שאלות שי"ב</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">{stats?.patterns || 0}</p>
            <p className="text-sm text-green-700">דפוסים</p>
          </div>
        </div>
      </div>

      {/* PDF List */}
      {scanResult?.files && (
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-600" />
              רשימת PDFs ({scanResult.files.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {scanResult.files.map((file, index) => (
              <div key={index} className="p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500 truncate">{file.path}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      file.category === 'exam' ? 'bg-purple-100 text-purple-700' :
                      file.category === 'homework' ? 'bg-orange-100 text-orange-700' :
                      file.category === 'lecture' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {file.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {Math.round(file.size / 1024)} KB
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categories Breakdown */}
      {scanResult?.categories && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">חלוקה לפי קטגוריות</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{scanResult.categories.lectures}</p>
              <p className="text-sm text-blue-700">הרצאות</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{scanResult.categories.tutorials}</p>
              <p className="text-sm text-green-700">תרגולים</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{scanResult.categories.homework}</p>
              <p className="text-sm text-orange-700">שיעורי בית</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{scanResult.categories.exams}</p>
              <p className="text-sm text-purple-700">מבחנים</p>
            </div>
          </div>
        </div>
      )}

      {/* Health Checks */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">בדיקות תקינות</h2>
        <div className="space-y-2">
          <HealthCheck
            label="קבצי PDF נמצאו"
            passed={(scanResult?.fileCount || 0) > 0}
          />
          <HealthCheck
            label="פריטי ידע חולצו"
            passed={(stats?.knowledgeItems || 0) > 0}
          />
          <HealthCheck
            label="שאלות מבחן חולצו"
            passed={(stats?.examQuestions || 0) > 0}
          />
          <HealthCheck
            label="שאלות שי״ב חולצו"
            passed={(stats?.homeworkQuestions || 0) > 0}
          />
          <HealthCheck
            label="דפוסים זוהו"
            passed={(stats?.patterns || 0) > 0}
          />
          <HealthCheck
            label="אינדקס עדכני"
            passed={stats?.lastIndexedAt !== null}
          />
        </div>
      </div>
    </div>
  );
}

function HealthCheck({ label, passed }: { label: string; passed: boolean }) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-lg ${
      passed ? 'bg-green-50' : 'bg-red-50'
    }`}>
      {passed ? (
        <CheckCircle className="w-5 h-5 text-green-600" />
      ) : (
        <XCircle className="w-5 h-5 text-red-600" />
      )}
      <span className={passed ? 'text-green-700' : 'text-red-700'}>{label}</span>
    </div>
  );
}
