'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  BookmarkPlus,
  BookmarkCheck,
  FileText,
  ExternalLink,
} from 'lucide-react';
import type { KnowledgeItem } from '@/types';
import { dbHelpers } from '@/lib/db';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  onUpdate?: () => void;
}

const TYPE_LABELS: Record<string, { label: string; className: string }> = {
  definition: { label: 'הגדרה', className: 'badge-definition' },
  theorem: { label: 'משפט', className: 'badge-theorem' },
  lemma: { label: 'למה', className: 'badge-lemma' },
  corollary: { label: 'מסקנה', className: 'badge-lemma' },
  proof: { label: 'הוכחה', className: 'badge-proof' },
  technique: { label: 'טכניקה', className: 'badge-technique' },
  algorithm: { label: 'אלגוריתם', className: 'badge-algorithm' },
  example: { label: 'דוגמה', className: 'badge-example' },
};

const TOPIC_LABELS: Record<string, string> = {
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

export default function KnowledgeCard({ item, onUpdate }: KnowledgeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInReview, setIsInReview] = useState(item.isInReviewList);

  const typeInfo = TYPE_LABELS[item.type] || { label: item.type, className: 'badge-example' };

  const handleToggleReview = async () => {
    const newValue = await dbHelpers.toggleReviewList(item.id);
    setIsInReview(newValue);
    onUpdate?.();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-3">
          {/* Likelihood Badge */}
          <div
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0
              ${item.likelihoodScore >= 70 ? 'likelihood-critical' :
                item.likelihoodScore >= 50 ? 'likelihood-high' :
                item.likelihoodScore >= 30 ? 'likelihood-medium' : 'likelihood-low'}
            `}
          >
            {item.likelihoodScore}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.className}`}>
                {typeInfo.label}
              </span>
              {item.topics.map((topic) => (
                <span key={topic} className="topic-badge">
                  {TOPIC_LABELS[topic] || topic}
                </span>
              ))}
            </div>
            <h3 className="font-medium text-gray-900 line-clamp-2">{item.title}</h3>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleReview();
            }}
            className={`p-2 rounded-lg shrink-0 ${
              isInReview
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-400 hover:text-indigo-600 hover:bg-gray-100'
            }`}
            title={isInReview ? 'הסר מרשימת חזרה' : 'הוסף לרשימת חזרה'}
          >
            {isInReview ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <BookmarkPlus className="w-5 h-5" />
            )}
          </button>

          <button className="p-2 text-gray-400 shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Verbatim Text */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              טקסט מקורי
            </h4>
            <div className="verbatim-text" dir="auto">
              {item.verbatimText}
            </div>
          </div>

          {/* Source Reference */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ExternalLink className="w-4 h-4" />
              <span>
                {item.sourceFileName} - עמוד {item.sourcePage}
              </span>
            </div>
          </div>

          {/* When to Use */}
          <div className="px-4 pb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">מתי להשתמש</h4>
            <p className="text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg">
              {item.whenToUse}
            </p>
          </div>

          {/* Exam Appearances */}
          {item.examAppearances > 0 && (
            <div className="px-4 pb-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700 font-medium">הופעות במבחנים:</span>
                <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  {item.examAppearances} פעמים
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
