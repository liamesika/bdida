'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Lightbulb,
  FileText,
  Wrench,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { getWeekContent, getAllWeeks, type Definition, type Theorem, type Technique } from '@/data/weeks-content';

export default function WeekDetailPage() {
  const params = useParams();
  const router = useRouter();
  const weekNumber = parseInt(params.weekNumber as string, 10);
  const week = getWeekContent(weekNumber);
  const allWeeks = getAllWeeks();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'definitions' | 'theorems' | 'techniques' | 'formulas'>('definitions');

  if (!week) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">שבוע לא נמצא</h1>
        <button
          onClick={() => router.push('/weeks')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          חזרה לרשימת השבועות
        </button>
      </div>
    );
  }

  const prevWeek = allWeeks.find(w => w.weekNumber === weekNumber - 1);
  const nextWeek = allWeeks.find(w => w.weekNumber === weekNumber + 1);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-l from-indigo-600 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 text-indigo-200 text-sm mb-2">
          <span>שבוע {weekNumber}</span>
          <span>•</span>
          <span>הרצאות {week.lectures.join(', ')}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{week.titleHe}</h1>
        <p className="text-indigo-100">{week.summary}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {week.topics.map((topic, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white/20 rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl border border-gray-100 p-1 flex gap-1">
        <TabButton
          active={activeTab === 'definitions'}
          onClick={() => setActiveTab('definitions')}
          icon={<BookOpen className="w-4 h-4" />}
          label="הגדרות"
          count={week.definitions.length}
        />
        <TabButton
          active={activeTab === 'theorems'}
          onClick={() => setActiveTab('theorems')}
          icon={<Lightbulb className="w-4 h-4" />}
          label="משפטים"
          count={week.theorems.length}
        />
        <TabButton
          active={activeTab === 'techniques'}
          onClick={() => setActiveTab('techniques')}
          icon={<Wrench className="w-4 h-4" />}
          label="טכניקות"
          count={week.techniques.length}
        />
        <TabButton
          active={activeTab === 'formulas'}
          onClick={() => setActiveTab('formulas')}
          icon={<Calculator className="w-4 h-4" />}
          label="נוסחאות"
          count={week.keyFormulas?.length || 0}
        />
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'definitions' && (
          <div className="space-y-4">
            {week.definitions.map((def) => (
              <DefinitionCard key={def.id} definition={def} onCopy={handleCopy} copiedId={copiedId} />
            ))}
          </div>
        )}

        {activeTab === 'theorems' && (
          <div className="space-y-4">
            {week.theorems.length === 0 ? (
              <EmptyState message="אין משפטים בשבוע זה" />
            ) : (
              week.theorems.map((thm) => (
                <TheoremCard key={thm.id} theorem={thm} onCopy={handleCopy} copiedId={copiedId} />
              ))
            )}
          </div>
        )}

        {activeTab === 'techniques' && (
          <div className="space-y-4">
            {week.techniques.length === 0 ? (
              <EmptyState message="אין טכניקות בשבוע זה" />
            ) : (
              week.techniques.map((tech) => (
                <TechniqueCard key={tech.id} technique={tech} />
              ))
            )}
          </div>
        )}

        {activeTab === 'formulas' && (
          <div className="space-y-4">
            {/* Key Formulas */}
            {week.keyFormulas && week.keyFormulas.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  נוסחאות מפתח
                </h3>
                <div className="grid gap-3">
                  {week.keyFormulas.map((formula, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg font-mono text-sm group"
                    >
                      <span className="text-blue-900" dir="ltr">{formula}</span>
                      <button
                        onClick={() => handleCopy(formula, `formula-${i}`)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-blue-100 rounded"
                      >
                        {copiedId === `formula-${i}` ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-blue-600" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exam Tips */}
            {week.examTips && week.examTips.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  טיפים למבחן
                </h3>
                <ul className="space-y-2">
                  {week.examTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        {prevWeek ? (
          <button
            onClick={() => router.push(`/weeks/${prevWeek.weekNumber}`)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            <div className="text-right">
              <div className="text-xs text-gray-400">שבוע קודם</div>
              <div className="font-medium">{prevWeek.titleHe}</div>
            </div>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => router.push('/weeks')}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          כל השבועות
        </button>

        {nextWeek ? (
          <button
            onClick={() => router.push(`/weeks/${nextWeek.weekNumber}`)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <div className="text-left">
              <div className="text-xs text-gray-400">שבוע הבא</div>
              <div className="font-medium">{nextWeek.titleHe}</div>
            </div>
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
      <span className={`px-1.5 py-0.5 rounded-full text-xs ${
        active ? 'bg-white/20' : 'bg-gray-200'
      }`}>
        {count}
      </span>
    </button>
  );
}

function DefinitionCard({
  definition,
  onCopy,
  copiedId,
}: {
  definition: Definition;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
      <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">הגדרה</span>
            <h3 className="font-bold text-blue-900">{definition.title}</h3>
          </div>
          <button
            onClick={() => onCopy(definition.content, definition.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-blue-100 rounded"
            title="העתק"
          >
            {copiedId === definition.id ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{definition.content}</p>

        {definition.notation && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">סימון:</span>
            <code className="px-2 py-0.5 bg-gray-100 rounded text-gray-800" dir="ltr">
              {definition.notation}
            </code>
          </div>
        )}

        {definition.examples && definition.examples.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">דוגמאות:</p>
            <ul className="space-y-1">
              {definition.examples.map((ex, i) => (
                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span dir="auto">{ex}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-xs text-gray-400 pt-2">
          <FileText className="w-3 h-3 inline ml-1" />
          {definition.source}
        </div>
      </div>
    </div>
  );
}

function TheoremCard({
  theorem,
  onCopy,
  copiedId,
}: {
  theorem: Theorem;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  const [showProof, setShowProof] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
      <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full">משפט</span>
            <h3 className="font-bold text-purple-900">{theorem.title}</h3>
          </div>
          <button
            onClick={() => onCopy(theorem.statement, theorem.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-purple-100 rounded"
            title="העתק"
          >
            {copiedId === theorem.id ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-purple-600" />
            )}
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-100">
          <p className="text-gray-800 font-medium whitespace-pre-wrap" dir="auto">
            {theorem.statement}
          </p>
        </div>

        {theorem.proof && (
          <div>
            <button
              onClick={() => setShowProof(!showProof)}
              className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
            >
              {showProof ? 'הסתר הוכחה' : 'הצג הוכחה'}
              <ChevronLeft className={`w-4 h-4 transition-transform ${showProof ? 'rotate-90' : ''}`} />
            </button>
            {showProof && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{theorem.proof}</p>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-400 pt-2">
          <FileText className="w-3 h-3 inline ml-1" />
          {theorem.source}
        </div>
      </div>
    </div>
  );
}

function TechniqueCard({ technique }: { technique: Technique }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-green-50 px-4 py-3 border-b border-green-100">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">טכניקה</span>
          <h3 className="font-bold text-green-900">{technique.title}</h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <p className="text-gray-800">{technique.description}</p>

        {technique.steps && technique.steps.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">שלבים:</p>
            <ol className="space-y-1">
              {technique.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm">
            <span className="font-medium text-amber-800">מתי להשתמש: </span>
            <span className="text-amber-700">{technique.whenToUse}</span>
          </p>
        </div>

        <div className="text-xs text-gray-400 pt-2">
          <FileText className="w-3 h-3 inline ml-1" />
          {technique.source}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
      <p className="text-gray-500">{message}</p>
    </div>
  );
}
