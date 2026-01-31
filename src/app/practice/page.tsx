'use client';

import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { getAllWeeks } from '@/data/weeks-content';

type PracticeMode = 'flashcard' | 'definitions' | 'theorems';

export default function PracticePage() {
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [shuffled, setShuffled] = useState(false);

  const weeks = getAllWeeks();

  // Create flashcard items from static data
  const allItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      content: string;
      type: 'definition' | 'theorem' | 'technique';
      week: number;
      topic: string;
    }> = [];

    weeks.forEach(week => {
      const topicName = week.titleHe;
      if (mode === 'flashcard' || mode === 'definitions') {
        week.definitions.forEach((d) => {
          items.push({
            id: d.id,
            title: d.title,
            content: d.content,
            type: 'definition',
            week: week.weekNumber,
            topic: topicName,
          });
        });
      }
      if (mode === 'flashcard' || mode === 'theorems') {
        week.theorems.forEach((t) => {
          items.push({
            id: t.id,
            title: t.title,
            content: t.statement,
            type: 'theorem',
            week: week.weekNumber,
            topic: topicName,
          });
        });
      }
    });

    // Shuffle if requested
    if (shuffled) {
      return items.sort(() => Math.random() - 0.5);
    }
    return items;
  }, [weeks, mode, shuffled]);

  const currentItem = allItems[currentIndex];

  const handleAnswer = (correct: boolean) => {
    setScore(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }));

    if (currentIndex < allItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < allItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const resetSession = () => {
    setMode(null);
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
  };

  const startMode = (newMode: PracticeMode) => {
    setMode(newMode);
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
    setShuffled(true);
  };

  // Mode selection
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
            onClick={() => startMode('flashcard')}
            className="bg-white rounded-xl border border-gray-200 p-6 text-right hover:border-indigo-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">הכל ביחד</h3>
            <p className="text-sm text-gray-500">
              כל ההגדרות והמשפטים בערבוב
            </p>
          </button>

          <button
            onClick={() => startMode('definitions')}
            className="bg-white rounded-xl border border-gray-200 p-6 text-right hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">הגדרות בלבד</h3>
            <p className="text-sm text-gray-500">
              תרגול כל ההגדרות מהקורס
            </p>
          </button>

          <button
            onClick={() => startMode('theorems')}
            className="bg-white rounded-xl border border-gray-200 p-6 text-right hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">משפטים בלבד</h3>
            <p className="text-sm text-gray-500">
              תרגול כל המשפטים מהקורס
            </p>
          </button>
        </div>
      </div>
    );
  }

  // No items
  if (allItems.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 mb-4">אין פריטים לתרגול</p>
        <button onClick={resetSession} className="text-indigo-600 hover:underline">
          חזור לבחירת מצב
        </button>
      </div>
    );
  }

  // Session complete
  if (currentIndex >= allItems.length) {
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
              onClick={() => startMode(mode)}
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
            {currentIndex + 1} / {allItems.length}
          </p>
          <div className="w-32 h-1.5 bg-gray-200 rounded-full mt-1">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / allItems.length) * 100}%` }}
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
          className="min-h-[400px] cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front */}
            {!isFlipped && (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 min-h-[400px]">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentItem.type === 'theorem' ? 'bg-purple-100 text-purple-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {currentItem.type === 'theorem' ? 'משפט' : 'הגדרה'}
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
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                      שבוע {currentItem.week}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                      {currentItem.topic}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Back */}
            {isFlipped && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl shadow-lg p-6 min-h-[400px]">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-indigo-600 font-medium">תשובה</span>
                    <span className="text-indigo-400 flex items-center gap-1">
                      <EyeOff className="w-4 h-4" />
                      לחץ לחזור
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="text-sm whitespace-pre-wrap" dir="auto">
                      {currentItem.content}
                    </div>
                  </div>
                </div>
              </div>
            )}
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
            disabled={currentIndex === allItems.length - 1}
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
