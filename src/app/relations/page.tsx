'use client';

import { useState } from 'react';
import {
  GitBranch,
  BookOpen,
  Lightbulb,
  FileText,
  Wrench,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import {
  getLecture12Content,
  getLecture13Content,
  getAllDefinitions,
  getAllTheorems,
  getAllExamples,
  getAllTechniques,
  getExamQuestions,
} from '@/data/relations-content';

type TabType = 'all' | 'lecture12' | 'lecture13';
type ContentType = 'definitions' | 'theorems' | 'examples' | 'techniques' | 'exam';

export default function RelationsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [activeContent, setActiveContent] = useState<ContentType>('definitions');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const lecture12 = getLecture12Content();
  const lecture13 = getLecture13Content();

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getContent = () => {
    switch (activeContent) {
      case 'definitions':
        if (activeTab === 'lecture12') return lecture12.definitions;
        if (activeTab === 'lecture13') return lecture13.definitions;
        return getAllDefinitions();
      case 'theorems':
        if (activeTab === 'lecture12') return lecture12.theorems;
        if (activeTab === 'lecture13') return lecture13.theorems;
        return getAllTheorems();
      case 'examples':
        if (activeTab === 'lecture12') return lecture12.examples;
        if (activeTab === 'lecture13') return lecture13.examples;
        return getAllExamples();
      case 'techniques':
        if (activeTab === 'lecture12') return lecture12.techniques;
        if (activeTab === 'lecture13') return lecture13.techniques;
        return getAllTechniques();
      case 'exam':
        return getExamQuestions();
      default:
        return [];
    }
  };

  const content = getContent();

  const stats = {
    definitions: getAllDefinitions().length,
    theorems: getAllTheorems().length,
    examples: getAllExamples().length,
    techniques: getAllTechniques().length,
    examQuestions: getExamQuestions().length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GitBranch className="w-7 h-7 text-indigo-600" />
          יחסים - הרצאות 12+13
        </h1>
        <p className="text-gray-500 mt-1">יחסי שקילות ויחסי סדר - סיכום מלא</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.definitions}</p>
          <p className="text-xs text-gray-500">הגדרות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{stats.theorems}</p>
          <p className="text-xs text-gray-500">משפטים</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.examples}</p>
          <p className="text-xs text-gray-500">דוגמאות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{stats.techniques}</p>
          <p className="text-xs text-gray-500">טכניקות</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{stats.examQuestions}</p>
          <p className="text-xs text-gray-500">שאלות ממבחנים</p>
        </div>
      </div>

      {/* Lecture Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          הכל
        </button>
        <button
          onClick={() => setActiveTab('lecture12')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'lecture12'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          הרצאה 12 - יחסי שקילות
        </button>
        <button
          onClick={() => setActiveTab('lecture13')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'lecture13'
              ? 'bg-purple-600 text-white'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          הרצאה 13 - יחסי סדר
        </button>
      </div>

      {/* Content Type Tabs */}
      <div className="flex gap-2 flex-wrap bg-white rounded-xl border border-gray-100 p-2">
        <button
          onClick={() => setActiveContent('definitions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeContent === 'definitions'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          הגדרות
        </button>
        <button
          onClick={() => setActiveContent('theorems')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeContent === 'theorems'
              ? 'bg-purple-100 text-purple-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          משפטים
        </button>
        <button
          onClick={() => setActiveContent('examples')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeContent === 'examples'
              ? 'bg-green-100 text-green-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          דוגמאות
        </button>
        <button
          onClick={() => setActiveContent('techniques')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeContent === 'techniques'
              ? 'bg-orange-100 text-orange-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Wrench className="w-4 h-4" />
          טכניקות
        </button>
        <button
          onClick={() => setActiveContent('exam')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeContent === 'exam'
              ? 'bg-red-100 text-red-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          שאלות ממבחנים
        </button>
      </div>

      {/* Content List */}
      <div className="space-y-4">
        {content.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-500">
            אין תוכן להצגה
          </div>
        ) : (
          content.map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full p-4 flex items-start justify-between text-right hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.lecture === 12
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}
                    >
                      הרצאה {item.lecture}
                    </span>
                    {item.isExamQuestion && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        שאלת מבחן
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900">{item.titleHe}</h3>
                  <p className="text-sm text-gray-500">{item.source}</p>
                </div>
                {expandedItems.has(item.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedItems.has(item.id) && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  {/* Definitions */}
                  {activeContent === 'definitions' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          הגדרה
                        </h4>
                        <div className="verbatim-text whitespace-pre-wrap">{item.contentHe}</div>
                      </div>
                      {item.notation && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">סימון</h4>
                          <code className="bg-white px-3 py-1 rounded border border-gray-200 text-sm">
                            {item.notation}
                          </code>
                        </div>
                      )}
                      {item.examples && item.examples.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">דוגמאות</h4>
                          <ul className="space-y-2">
                            {item.examples.map((ex: any, i: number) => (
                              <li key={i} className="bg-white p-3 rounded border border-gray-200 text-sm">
                                {ex.textHe}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Theorems */}
                  {activeContent === 'theorems' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-purple-600" />
                          ניסוח
                        </h4>
                        <div className="verbatim-text whitespace-pre-wrap">{item.statementHe}</div>
                      </div>
                      {item.proofHe && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            הוכחה
                          </h4>
                          <div className="verbatim-text whitespace-pre-wrap">{item.proofHe}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Examples / Exam Questions */}
                  {(activeContent === 'examples' || activeContent === 'exam') && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" />
                          שאלה
                        </h4>
                        <div className="verbatim-text whitespace-pre-wrap">{item.problemHe}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          פתרון
                        </h4>
                        <div className="verbatim-text whitespace-pre-wrap">{item.solutionHe}</div>
                      </div>
                    </div>
                  )}

                  {/* Techniques */}
                  {activeContent === 'techniques' && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Wrench className="w-4 h-4 text-orange-600" />
                          תיאור
                        </h4>
                        <div className="verbatim-text whitespace-pre-wrap">{item.descriptionHe}</div>
                      </div>
                      {item.stepsHe && item.stepsHe.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">שלבים</h4>
                          <ol className="space-y-2">
                            {item.stepsHe.map((step: string, i: number) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {i + 1}
                                </span>
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Quick Reference Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Equivalence Relations Card */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            יחס שקילות - סיכום מהיר
          </h3>
          <div className="space-y-2 text-sm text-blue-100">
            <p><strong className="text-white">תכונות:</strong> רפלקסיבי + סימטרי + טרנזיטיבי</p>
            <p><strong className="text-white">מחלקת שקילות:</strong> [a]_R = &#123;b ∈ A | aRb&#125;</p>
            <p><strong className="text-white">קבוצת מנה:</strong> A/R = כל מחלקות השקילות</p>
            <p><strong className="text-white">משפט המבנה 1:</strong> [a]_R = [b]_R ⟺ aRb</p>
            <p><strong className="text-white">משפט המבנה 2:</strong> [a]_R ∩ [b]_R = ∅ ⟺ ¬aRb</p>
          </div>
        </div>

        {/* Order Relations Card */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            יחס סדר - סיכום מהיר
          </h3>
          <div className="space-y-2 text-sm text-purple-100">
            <p><strong className="text-white">חלש:</strong> רפלקסיבי + אנטי-סימטרי + טרנזיטיבי (≤)</p>
            <p><strong className="text-white">חזק:</strong> אנטי-רפלקסיבי + א-סימטרי + טרנזיטיבי (&lt;)</p>
            <p><strong className="text-white">מינימלי:</strong> אין אף אחד מתחתיו</p>
            <p><strong className="text-white">מינימום:</strong> כולם מעליו (מינימלי יחיד)</p>
            <p><strong className="text-white">שרשרת:</strong> כל שני איברים ניתנים להשוואה</p>
            <p><strong className="text-white">אנטי-שרשרת:</strong> אין שני איברים ניתנים להשוואה</p>
          </div>
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
              שימו לב להבדלים בין יחסי שקילות ליחסי סדר: שקילות דורשת סימטריה, סדר דורש אנטי-סימטריה.
              בשאלות מבחן על ספירת יחסי שקילות, עדיף לחשוב על חלוקות.
              ביחסי סדר, הבינו היטב את ההבדל בין מינימלי למינימום!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
