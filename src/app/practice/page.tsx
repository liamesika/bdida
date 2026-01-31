'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  GraduationCap,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Eye,
  EyeOff,
  Shuffle,
  BookOpen,
  Target,
  Lightbulb,
} from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import type { KnowledgeItem, PracticeResult, Topic } from '@/types';
import { v4 as uuidv4 } from 'uuid';

type PracticeMode = 'flashcard' | 'identify-tool' | 'exam-drill';

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

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'all'>('all');
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);
    let fetchedItems: KnowledgeItem[];

    if (selectedTopic === 'all') {
      fetchedItems = await dbHelpers.getTopLikelihoodItems(50);
    } else {
      fetchedItems = await dbHelpers.getKnowledgeItemsByTopic(selectedTopic);
    }

    // Shuffle
    fetchedItems = fetchedItems.sort(() => Math.random() - 0.5);

    setItems(fetchedItems);
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
    setSessionStart(new Date());
    setLoading(false);
  }, [selectedTopic]);

  useEffect(() => {
    if (mode) {
      loadItems();
    }
  }, [mode, loadItems]);

  const currentItem = items[currentIndex];

  const handleAnswer = async (correct: boolean) => {
    if (!currentItem || !sessionStart) return;

    const result: PracticeResult = {
      id: uuidv4(),
      itemId: currentItem.id,
      attemptedAt: new Date(),
      wasCorrect: correct,
      timeSpentSeconds: Math.round((Date.now() - sessionStart.getTime()) / 1000),
      mode: mode as 'flashcard' | 'identify-tool' | 'exam-drill',
      confidence: correct ? 4 : 2,
    };

    await dbHelpers.addPracticeResult(result);

    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }));

    // Move to next
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const resetSession = () => {
    setMode(null);
    setItems([]);
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  // Mode selection screen
  if (!mode) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-indigo-600" />
            מצב תרגול
          </h1>
          <p className="text-gray-500">בחר מצב תרגול להתחלה</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setMode('flashcard')}
            className="bg-white rounded-xl border border-gray-200 p-6 text-right hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">פלאשקארדס</h3>
            <p className="text-sm text-gray-500">
              כרטיסיות זיכרון עם הגדרות ומשפטים. הפוך כדי לראות את התשובה.
            </p>
          </button>

          <button
            onClick={() => setMode('identify-tool')}
            className="bg-white rounded-xl border border-gray-200 p-6 text-right hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">זיהוי כלי</h3>
            <p className="text-sm text-gray-500">
              ראה תיאור מצב ונסה לזהות איזה משפט/הגדרה מתאים.
            </p>
          </button>

          <button
            onClick={() => setMode('exam-drill')}
            className="bg-white rounded-xl border border-gray-200 p-6 text-right hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200">
              <Lightbulb className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">תרגול מבחן</h3>
            <p className="text-sm text-gray-500">
              שאלות בסגנון מבחן עם דגש על הפריטים הסבירים ביותר.
            </p>
          </button>
        </div>

        {/* Topic Filter */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="font-medium text-gray-700 mb-3">סינון לפי נושא</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                selectedTopic === 'all'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              כל הנושאים
            </button>
            {Object.entries(TOPIC_LABELS).filter(([key]) => key !== 'other').map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSelectedTopic(key as Topic)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  selectedTopic === key
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">טוען שאלות...</p>
        </div>
      </div>
    );
  }

  // No items
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">אין פריטים לתרגול בנושא זה</p>
        <button onClick={resetSession} className="text-indigo-600 hover:underline">
          חזור לבחירת מצב
        </button>
      </div>
    );
  }

  // Session complete
  if (currentIndex >= items.length) {
    const total = score.correct + score.incorrect;
    const percentage = total > 0 ? Math.round((score.correct / total) * 100) : 0;

    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
            percentage >= 70 ? 'bg-green-100' : percentage >= 50 ? 'bg-yellow-100' : 'bg-red-100'
          }`}>
            <span className={`text-3xl font-bold ${
              percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage}%
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">סיימת את התרגול!</h2>
          <p className="text-gray-500 mb-6">
            {score.correct} נכונות מתוך {total} שאלות
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => loadItems()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              סבב נוסף
            </button>
            <button
              onClick={resetSession}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              חזור לתפריט
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Practice session
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={resetSession} className="text-gray-500 hover:text-gray-700 flex items-center gap-1">
          <RotateCcw className="w-4 h-4" />
          יציאה
        </button>
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {currentIndex + 1} / {items.length}
          </p>
          <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-600 flex items-center gap-1">
            <Check className="w-4 h-4" />
            {score.correct}
          </span>
          <span className="text-red-600 flex items-center gap-1">
            <X className="w-4 h-4" />
            {score.incorrect}
          </span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="max-w-2xl mx-auto">
        <div
          className={`flashcard min-h-[400px] cursor-pointer ${isFlipped ? 'flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flashcard-inner">
            {/* Front */}
            <div className="flashcard-front bg-white border border-gray-200 shadow-lg p-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentItem.type === 'theorem' ? 'badge-theorem' :
                    currentItem.type === 'definition' ? 'badge-definition' :
                    currentItem.type === 'proof' ? 'badge-proof' : 'badge-technique'
                  }`}>
                    {currentItem.type === 'theorem' ? 'משפט' :
                     currentItem.type === 'definition' ? 'הגדרה' :
                     currentItem.type === 'proof' ? 'הוכחה' : 'טכניקה'}
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    לחץ להפיכה
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-xl font-medium text-gray-900 text-center">
                    {currentItem.title}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-1 justify-center mt-4">
                  {currentItem.topics.map((topic) => (
                    <span key={topic} className="topic-badge">
                      {TOPIC_LABELS[topic] || topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Back */}
            <div className="flashcard-back bg-indigo-50 border border-indigo-200 shadow-lg p-6">
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-indigo-600 font-medium">תשובה</span>
                  <span className="text-indigo-400 flex items-center gap-1">
                    <EyeOff className="w-4 h-4" />
                    לחץ לחזור
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <div className="verbatim-text text-sm" dir="auto">
                    {currentItem.verbatimText}
                  </div>
                </div>
                <p className="text-xs text-indigo-500 mt-4">
                  מקור: {currentItem.sourceFileName} - עמוד {currentItem.sourcePage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Buttons */}
        {isFlipped && (
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 font-medium"
            >
              <X className="w-5 h-5" />
              לא ידעתי
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 font-medium"
            >
              <Check className="w-5 h-5" />
              ידעתי
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
            הקודם
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === items.length - 1}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            הבא
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
