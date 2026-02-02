'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  ArrowLeft,
  Target,
  Zap,
} from 'lucide-react';
import { relationProperties, relationTypes } from '@/data/relation-properties';

export default function PropertiesPage() {
  const router = useRouter();
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);
  const [showProofTemplate, setShowProofTemplate] = useState<Record<string, boolean>>({});

  const toggleProperty = (id: string) => {
    setExpandedProperty(expandedProperty === id ? null : id);
  };

  const toggleProofTemplate = (id: string) => {
    setShowProofTemplate(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const propertyColors: Record<string, { bg: string; text: string; border: string }> = {
    reflexive: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    antireflexive: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    symmetric: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    antisymmetric: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    asymmetric: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    transitive: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <button
          onClick={() => router.push('/relations')}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          חזרה ליחסים
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-7 h-7 text-indigo-600" />
          תכונות יחסים - סיכום מלא
        </h1>
        <p className="text-gray-500 mt-1">הגדרות, תבניות הוכחה, ודוגמאות לכל תכונה</p>
      </div>

      {/* Quick Reference - Relation Types */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          סיכום מהיר: סוגי יחסים
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Equivalence Relation */}
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="font-bold text-blue-800 mb-2">{relationTypes.equivalence.nameHe}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {relationTypes.equivalence.properties.map(p => (
                <span key={p} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                  {relationProperties.find(rp => rp.id === p)?.nameHe}
                </span>
              ))}
            </div>
            <p className="text-sm text-blue-600">
              דוגמאות: {relationTypes.equivalence.examples.join(', ')}
            </p>
          </div>

          {/* Weak Partial Order */}
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
            <h3 className="font-bold text-green-800 mb-2">{relationTypes.weakPartialOrder.nameHe}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {relationTypes.weakPartialOrder.properties.map(p => (
                <span key={p} className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">
                  {relationProperties.find(rp => rp.id === p)?.nameHe}
                </span>
              ))}
            </div>
            <p className="text-sm text-green-600">
              דוגמאות: {relationTypes.weakPartialOrder.examples.join(', ')}
            </p>
          </div>

          {/* Strong Partial Order */}
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
            <h3 className="font-bold text-orange-800 mb-2">{relationTypes.strongPartialOrder.nameHe}</h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {relationTypes.strongPartialOrder.properties.map(p => (
                <span key={p} className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs">
                  {relationProperties.find(rp => rp.id === p)?.nameHe}
                </span>
              ))}
            </div>
            <p className="text-sm text-orange-600">
              דוגמאות: {relationTypes.strongPartialOrder.examples.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* All Properties */}
      <div className="space-y-4">
        <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          כל התכונות בפירוט
        </h2>

        {relationProperties.map((property) => {
          const colors = propertyColors[property.id];
          const isExpanded = expandedProperty === property.id;
          const showingProof = showProofTemplate[property.id];

          return (
            <div
              key={property.id}
              className={`bg-white rounded-xl border ${isExpanded ? colors.border : 'border-gray-100'} overflow-hidden transition-all`}
            >
              {/* Header - Always Visible */}
              <button
                onClick={() => toggleProperty(property.id)}
                className={`w-full p-5 text-right flex items-start justify-between ${isExpanded ? colors.bg : 'hover:bg-gray-50'} transition-colors`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 ${colors.bg} ${colors.text} rounded-lg font-bold text-lg`}>
                      {property.nameHe}
                    </span>
                    <span className="text-gray-400 text-sm">{property.name}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{property.definitionHe}</p>
                  <div className="font-mono text-sm bg-gray-100 px-3 py-1.5 rounded inline-block">
                    {property.symbol}
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className={`w-5 h-5 ${colors.text}`} />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-5 border-t border-gray-100 space-y-5">
                  {/* Formal Definition & Negation */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-bold text-gray-700 mb-2">הגדרה פורמלית</h4>
                      <div className="font-mono text-lg">{property.formalDefinition}</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-bold text-red-700 mb-2">שלילה (להפרכה)</h4>
                      <p className="text-red-600">{property.negationHe}</p>
                    </div>
                  </div>

                  {/* Proof Templates */}
                  <div>
                    <button
                      onClick={() => toggleProofTemplate(property.id)}
                      className="flex items-center gap-2 font-bold text-gray-800 mb-3"
                    >
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      תבניות הוכחה/הפרכה
                      {showingProof ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {showingProof && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Proof Template */}
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <h5 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            איך להוכיח
                          </h5>
                          <ol className="space-y-2">
                            {property.proofTemplateHe.map((step, i) => (
                              <li key={i} className="flex items-start gap-2 text-green-800">
                                <span className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        {/* Disprove Template */}
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <h5 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            איך להפריך
                          </h5>
                          <ol className="space-y-2">
                            {property.disproveTemplateHe.map((step, i) => (
                              <li key={i} className="flex items-start gap-2 text-red-800">
                                <span className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="font-bold text-gray-800 mb-3">דוגמאות</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {property.examples.map((example, i) => (
                        <div
                          key={i}
                          className={`p-3 rounded-lg border ${
                            example.isProperty
                              ? 'bg-green-50 border-green-100'
                              : 'bg-red-50 border-red-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {example.isProperty ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className="font-mono font-bold">{example.relation}</span>
                            <span className="text-gray-500 text-sm">על {example.set}</span>
                          </div>
                          <p className={`text-sm ${example.isProperty ? 'text-green-700' : 'text-red-700'}`}>
                            {example.explanationHe}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      טיפים
                    </h4>
                    <ul className="space-y-1">
                      {property.tipsHe.map((tip, i) => (
                        <li key={i} className="text-yellow-800 text-sm flex items-start gap-2">
                          <span className="text-yellow-600">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Important Notes */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-3">נקודות חשובות לזכור</h3>
        <ul className="space-y-2 text-indigo-100">
          <li className="flex items-start gap-2">
            <span>•</span>
            <span><strong className="text-white">רפלקסיבי vs אנטי-רפלקסיבי:</strong> הפכים, אבל יחס יכול להיות לא זה ולא זה!</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span><strong className="text-white">סימטרי vs אנטי-סימטרי:</strong> לא הפכים! יחס יכול להיות שניהם (למשל =)</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span><strong className="text-white">א-סימטרי:</strong> גורר אנטי-רפלקסיבי! (אם aRb → ¬bRa, אז בפרט ¬aRa)</span>
          </li>
          <li className="flex items-start gap-2">
            <span>•</span>
            <span><strong className="text-white">טרנזיטיבי:</strong> התכונה הכי נפוצה - מופיעה גם ביחסי שקילות וגם ביחסי סדר</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
