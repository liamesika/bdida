'use client';

import { useState, useEffect } from 'react';
import { FileSearch, BarChart3, TrendingUp, PieChart, Calendar } from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import { analyzeExam, getTopicAnalysis } from '@/lib/analysis';
import type { UploadedFile, ExamAnalysis, TopicAnalysis, ExamQuestion, Topic } from '@/types';

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

export default function ExamsPage() {
  const [examFiles, setExamFiles] = useState<UploadedFile[]>([]);
  const [examAnalyses, setExamAnalyses] = useState<Map<string, ExamAnalysis>>(new Map());
  const [topicAnalysis, setTopicAnalysis] = useState<TopicAnalysis[]>([]);
  const [allQuestions, setAllQuestions] = useState<ExamQuestion[]>([]);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);

    const files = await dbHelpers.getFilesByCategory('exam');
    setExamFiles(files);

    const questions = await dbHelpers.getAllExamQuestions();
    setAllQuestions(questions);

    const topics = await getTopicAnalysis();
    setTopicAnalysis(topics);

    // Analyze each exam
    const analyses = new Map<string, ExamAnalysis>();
    for (const file of files) {
      const analysis = await analyzeExam(file.id);
      if (analysis) {
        analyses.set(file.id, analysis);
      }
    }
    setExamAnalyses(analyses);

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded skeleton" />
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl skeleton" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-xl skeleton" />
      </div>
    );
  }

  const selectedAnalysis = selectedExam ? examAnalyses.get(selectedExam) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileSearch className="w-7 h-7 text-purple-600" />
          ניתוח מבחנים קודמים
        </h1>
        <p className="text-gray-500">{examFiles.length} מבחנים • {allQuestions.length} שאלות</p>
      </div>

      {/* Topic Distribution Overview */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-600" />
          התפלגות נושאים בכל המבחנים
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {topicAnalysis.slice(0, 12).map((topic) => (
            <div
              key={topic.topic}
              className="bg-gray-50 rounded-lg p-3 text-center border border-gray-100"
            >
              <p className="text-2xl font-bold text-indigo-600">{topic.frequency}</p>
              <p className="text-sm text-gray-600">{TOPIC_LABELS[topic.topic] || topic.topic}</p>
              <p className="text-xs text-gray-400">הופעות</p>
            </div>
          ))}
        </div>
      </div>

      {/* Exam List */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              רשימת מבחנים
            </h2>
          </div>
          <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
            {examFiles.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                לא נמצאו מבחנים
              </div>
            ) : (
              examFiles.map((file) => {
                const analysis = examAnalyses.get(file.id);
                return (
                  <button
                    key={file.id}
                    onClick={() => setSelectedExam(file.id)}
                    className={`w-full p-4 text-right hover:bg-gray-50 transition-colors ${
                      selectedExam === file.id ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{file.displayTag}</p>
                        <p className="text-sm text-gray-500 truncate">{file.name}</p>
                      </div>
                      {analysis && (
                        <div className="text-left">
                          <p className="text-sm font-medium text-indigo-600">
                            {analysis.totalQuestions} שאלות
                          </p>
                          <p className="text-xs text-gray-400">
                            {analysis.totalPoints} נקודות
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Exam Analysis */}
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              פירוט מבחן
            </h2>
          </div>
          {!selectedExam ? (
            <div className="p-8 text-center text-gray-400">
              בחר מבחן מהרשימה
            </div>
          ) : !selectedAnalysis ? (
            <div className="p-8 text-center text-gray-400">
              אין נתונים למבחן זה
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {/* Topic Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">התפלגות נושאים</h3>
                <div className="space-y-2">
                  {selectedAnalysis.topicDistribution.map((item) => (
                    <div key={item.topic} className="flex items-center gap-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">
                            {TOPIC_LABELS[item.topic] || item.topic}
                          </span>
                          <span className="text-sm text-gray-500">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty Distribution */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">התפלגות קושי</h3>
                <div className="flex gap-2">
                  {selectedAnalysis.difficultyDistribution.map((item) => (
                    <div
                      key={item.difficulty}
                      className={`flex-1 text-center p-2 rounded-lg ${
                        item.difficulty === 'hard'
                          ? 'bg-red-100 text-red-700'
                          : item.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <p className="text-lg font-bold">{item.percentage}%</p>
                      <p className="text-xs">
                        {item.difficulty === 'hard'
                          ? 'קשה'
                          : item.difficulty === 'medium'
                          ? 'בינוני'
                          : 'קל'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patterns */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">דפוסי שאלות</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAnalysis.patterns.map((pattern) => (
                    <span
                      key={pattern.id}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                    >
                      {pattern.description} ({pattern.frequency}x)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* All Patterns */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          דפוסי שאלות חוזרים (כל המבחנים)
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from(
            allQuestions.reduce((acc, q) => {
              const pattern = q.questionPattern;
              acc.set(pattern, (acc.get(pattern) || 0) + 1);
              return acc;
            }, new Map<string, number>())
          )
            .sort((a, b) => b[1] - a[1])
            .slice(0, 12)
            .map(([pattern, count]) => (
              <div
                key={pattern}
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{pattern}</span>
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    {count}x
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
