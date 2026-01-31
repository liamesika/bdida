'use client';

import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { dbHelpers } from '@/lib/db';
import KnowledgeCard from '@/components/KnowledgeCard';
import type { KnowledgeItem, KnowledgeItemType, Topic } from '@/types';

const TYPE_OPTIONS: { value: KnowledgeItemType | 'all'; label: string }[] = [
  { value: 'all', label: 'הכל' },
  { value: 'definition', label: 'הגדרות' },
  { value: 'theorem', label: 'משפטים' },
  { value: 'lemma', label: 'למות' },
  { value: 'proof', label: 'הוכחות' },
  { value: 'technique', label: 'טכניקות' },
  { value: 'algorithm', label: 'אלגוריתמים' },
  { value: 'example', label: 'דוגמאות' },
];

const TOPIC_OPTIONS: { value: Topic | 'all'; label: string }[] = [
  { value: 'all', label: 'כל הנושאים' },
  { value: 'logic', label: 'לוגיקה' },
  { value: 'sets', label: 'קבוצות' },
  { value: 'relations', label: 'יחסים' },
  { value: 'functions', label: 'פונקציות' },
  { value: 'induction', label: 'אינדוקציה' },
  { value: 'recursion', label: 'רקורסיה' },
  { value: 'combinatorics', label: 'קומבינטוריקה' },
  { value: 'graphs', label: 'גרפים' },
  { value: 'trees', label: 'עצים' },
  { value: 'number-theory', label: 'תורת המספרים' },
  { value: 'probability', label: 'הסתברות' },
];

export default function KnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<KnowledgeItemType | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<Topic | 'all'>('all');
  const [showReviewOnly, setShowReviewOnly] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    const allItems = await dbHelpers.getAllKnowledgeItems();
    setItems(allItems);
    setLoading(false);
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.verbatimText.toLowerCase().includes(query) ||
          item.topics.some((t) => t.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) return false;

      // Topic filter
      if (selectedTopic !== 'all' && !item.topics.includes(selectedTopic)) return false;

      // Review list filter
      if (showReviewOnly && !item.isInReviewList) return false;

      return true;
    });
  }, [items, searchQuery, selectedType, selectedTopic, showReviewOnly]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => b.likelihoodScore - a.likelihoodScore);
  }, [filteredItems]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      filtered: filteredItems.length,
      inReview: items.filter((i) => i.isInReviewList).length,
    };
  }, [items, filteredItems]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedTopic('all');
    setShowReviewOnly(false);
  };

  const hasActiveFilters = searchQuery || selectedType !== 'all' || selectedTopic !== 'all' || showReviewOnly;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded skeleton" />
        <div className="h-12 bg-gray-200 rounded skeleton" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl skeleton" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">בסיס ידע</h1>
        <p className="text-gray-500">
          {stats.total} פריטים • {stats.inReview} ברשימת חזרה
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש בהגדרות, משפטים, הוכחות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3">
          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as KnowledgeItemType | 'all')}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Topic Filter */}
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value as Topic | 'all')}
            className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:ring-2 focus:ring-indigo-500"
          >
            {TOPIC_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Review List Toggle */}
          <button
            onClick={() => setShowReviewOnly(!showReviewOnly)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showReviewOnly
                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            רשימת חזרה בלבד
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              נקה פילטרים
            </button>
          )}
        </div>

        {/* Results Count */}
        {hasActiveFilters && (
          <p className="text-sm text-gray-500">
            מציג {stats.filtered} מתוך {stats.total} פריטים
          </p>
        )}
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {sortedItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">לא נמצאו פריטים התואמים את החיפוש</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-2 text-indigo-600 hover:underline text-sm"
              >
                נקה פילטרים
              </button>
            )}
          </div>
        ) : (
          sortedItems.map((item) => (
            <KnowledgeCard key={item.id} item={item} onUpdate={loadItems} />
          ))
        )}
      </div>
    </div>
  );
}
