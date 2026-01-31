'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, BookOpen, Lightbulb, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { getAllWeeks } from '@/data/weeks-content';

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'definition' | 'theorem' | 'technique'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const weeks = getAllWeeks();

  // Flatten all items from weeks
  const allItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      type: 'definition' | 'theorem' | 'technique';
      content: string;
      week: number;
      topic: string;
    }> = [];

    weeks.forEach(week => {
      const topicName = week.titleHe;
      week.definitions.forEach((d) => {
        items.push({
          id: d.id,
          title: d.title,
          type: 'definition',
          content: d.content,
          week: week.weekNumber,
          topic: topicName,
        });
      });
      week.theorems.forEach((t) => {
        items.push({
          id: t.id,
          title: t.title,
          type: 'theorem',
          content: t.statement + (t.proof ? `\n\nהוכחה:\n${t.proof}` : ''),
          week: week.weekNumber,
          topic: topicName,
        });
      });
      week.techniques.forEach((t) => {
        items.push({
          id: t.id,
          title: t.title,
          type: 'technique',
          content: t.description + (t.steps ? '\n\n' + t.steps.join('\n') : ''),
          week: week.weekNumber,
          topic: topicName,
        });
      });
    });

    return items;
  }, [weeks]);

  const filteredItems = useMemo(() => {
    return allItems.filter(item => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!item.title.toLowerCase().includes(query) &&
            !item.content.toLowerCase().includes(query) &&
            !item.topic.toLowerCase().includes(query)) {
          return false;
        }
      }
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      return true;
    });
  }, [allItems, searchQuery, selectedType]);

  const stats = {
    definitions: allItems.filter(i => i.type === 'definition').length,
    theorems: allItems.filter(i => i.type === 'theorem').length,
    techniques: allItems.filter(i => i.type === 'technique').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-blue-600" />
          בסיס ידע
        </h1>
        <p className="text-gray-500">
          {stats.definitions} הגדרות - {stats.theorems} משפטים - {stats.techniques} טכניקות
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש בהגדרות, משפטים, טכניקות..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
              selectedType === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            הכל ({allItems.length})
          </button>
          <button
            onClick={() => setSelectedType('definition')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
              selectedType === 'definition'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            הגדרות ({stats.definitions})
          </button>
          <button
            onClick={() => setSelectedType('theorem')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
              selectedType === 'theorem'
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            משפטים ({stats.theorems})
          </button>
          <button
            onClick={() => setSelectedType('technique')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 ${
              selectedType === 'technique'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Wrench className="w-4 h-4" />
            טכניקות ({stats.techniques})
          </button>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">לא נמצאו פריטים</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                className="w-full p-4 text-right"
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === 'definition' ? 'bg-blue-100' :
                      item.type === 'theorem' ? 'bg-purple-100' : 'bg-green-100'
                    }`}>
                      {item.type === 'definition' ? (
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      ) : item.type === 'theorem' ? (
                        <Lightbulb className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Wrench className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                          שבוע {item.week}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{item.topic}</p>
                    </div>
                  </div>
                  {expandedId === item.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </div>
              </button>

              {expandedId === item.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="whitespace-pre-wrap text-sm text-gray-700" dir="auto">
                    {item.content}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <Link
                      href={`/weeks/${item.week}`}
                      className="text-sm text-indigo-600 hover:underline"
                    >
                      לשבוע {item.week} המלא
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
