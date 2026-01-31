'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, Target, BookOpen, Lightbulb } from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import { getLikelihoodAnalysis, generatePredictions } from '@/lib/analysis';
import type { LikelihoodAnalysis, PredictionResult, Topic } from '@/types';

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

export default function LikelihoodPage() {
  const [analysis, setAnalysis] = useState<LikelihoodAnalysis | null>(null);
  const [predictions, setPredictions] = useState<PredictionResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'theorems' | 'definitions' | 'proofs' | 'techniques' | 'predictions'>('theorems');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const analysisData = await getLikelihoodAnalysis();
      setAnalysis(analysisData);

      const predictionData = await generatePredictions();
      setPredictions(predictionData);
    } catch (error) {
      console.error('Error loading analysis:', error);
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded skeleton" />
        <div className="grid md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl skeleton" />
          ))}
        </div>
        <div className="h-96 bg-gray-200 rounded-xl skeleton" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">לא ניתן לטעון את הניתוח</p>
      </div>
    );
  }

  const tabs = [
    { id: 'theorems', label: 'משפטים', count: analysis.topTheorems.length },
    { id: 'definitions', label: 'הגדרות', count: analysis.topDefinitions.length },
    { id: 'proofs', label: 'הוכחות', count: analysis.topProofs.length },
    { id: 'techniques', label: 'טכניקות', count: analysis.topTechniques.length },
    { id: 'predictions', label: 'ניבויים', count: predictions.length },
  ] as const;

  const currentItems =
    activeTab === 'theorems' ? analysis.topTheorems :
    activeTab === 'definitions' ? analysis.topDefinitions :
    activeTab === 'proofs' ? analysis.topProofs :
    activeTab === 'techniques' ? analysis.topTechniques : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-indigo-600" />
          סבירות למבחן
        </h1>
        <p className="text-gray-500">דירוג לפי סבירות הופעה במבחן, מבוסס על מבחנים קודמים</p>
      </div>

      {/* Gaps Alert */}
      {analysis.gaps.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h3 className="font-medium text-orange-800 flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5" />
            פערים שזוהו
          </h3>
          <ul className="space-y-2">
            {analysis.gaps.slice(0, 3).map((gap, index) => (
              <li key={index} className="text-sm text-orange-700">
                <span className="font-medium">{gap.description}</span>
                <span className="text-orange-600"> - {gap.suggestedAction}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab.label}
            <span className="mr-1.5 text-xs bg-gray-200 px-1.5 py-0.5 rounded-full">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'predictions' ? (
        <div className="space-y-3">
          {predictions.map((pred, index) => (
            <div
              key={pred.itemId}
              className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0
                    ${pred.likelihood >= 70 ? 'likelihood-critical' :
                      pred.likelihood >= 50 ? 'likelihood-high' :
                      pred.likelihood >= 30 ? 'likelihood-medium' : 'likelihood-low'}
                  `}
                >
                  {pred.likelihood}%
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      pred.itemType === 'theorem' ? 'badge-theorem' :
                      pred.itemType === 'definition' ? 'badge-definition' :
                      pred.itemType === 'technique' ? 'badge-technique' : 'badge-algorithm'
                    }`}>
                      {pred.itemType === 'theorem' ? 'משפט' :
                       pred.itemType === 'definition' ? 'הגדרה' :
                       pred.itemType === 'technique' ? 'טכניקה' : 'סוג שאלה'}
                    </span>
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{pred.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pred.reasons.map((reason, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {currentItems.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">אין פריטים בקטגוריה זו</p>
            </div>
          ) : (
            currentItems.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0
                      ${item.likelihoodScore >= 70 ? 'likelihood-critical' :
                        item.likelihoodScore >= 50 ? 'likelihood-high' :
                        item.likelihoodScore >= 30 ? 'likelihood-medium' : 'likelihood-low'}
                    `}
                  >
                    {item.likelihoodScore}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400">#{index + 1}</span>
                      {item.examAppearances > 0 && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                          {item.examAppearances} הופעות במבחנים
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.topics.map((topic) => (
                        <span key={topic} className="topic-badge">
                          {TOPIC_LABELS[topic] || topic}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.verbatimText.substring(0, 150)}...</p>
                    <p className="text-xs text-gray-400 mt-2">
                      מקור: {item.sourceFileName} - עמוד {item.sourcePage}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
