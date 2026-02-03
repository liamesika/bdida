'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  FileQuestion,
  GraduationCap,
  FileSearch,
  Map,
  Bug,
  Menu,
  X,
  Calendar,
  Layers,
  GitBranch,
  Target,
  ClipboardList,
  FileCheck,
  Star,
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  labelHe: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    labelHe: 'לוח בקרה',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    href: '/weeks',
    label: 'Weekly Study',
    labelHe: 'לימוד שבועי',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    href: '/calendar',
    label: 'Exam Calendar',
    labelHe: 'לוח למבחן',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    href: '/knowledge',
    label: 'Knowledge Base',
    labelHe: 'בסיס ידע',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    href: '/likelihood',
    label: 'Exam Likelihood',
    labelHe: 'סבירות למבחן',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    href: '/homework',
    label: 'Homework Predictor',
    labelHe: 'ניבוי שיעורי בית',
    icon: <FileQuestion className="w-5 h-5" />,
  },
  {
    href: '/practice',
    label: 'Practice Mode',
    labelHe: 'תרגול',
    icon: <GraduationCap className="w-5 h-5" />,
  },
  {
    href: '/exams',
    label: 'Past Exams',
    labelHe: 'מבחנים קודמים',
    icon: <FileSearch className="w-5 h-5" />,
  },
  {
    href: '/exam-review',
    label: 'Exam Review',
    labelHe: 'חזרה לפי נושאים',
    icon: <Star className="w-5 h-5" />,
  },
  {
    href: '/roadmap',
    label: 'Study Roadmap',
    labelHe: 'מפת לימוד',
    icon: <Map className="w-5 h-5" />,
  },
  {
    href: '/relations',
    label: 'Relations',
    labelHe: 'יחסים (12+13)',
    icon: <GitBranch className="w-5 h-5" />,
  },
  {
    href: '/properties',
    label: 'Properties',
    labelHe: 'תכונות יחסים',
    icon: <Target className="w-5 h-5" />,
  },
  {
    href: '/exam-analysis',
    label: 'Exam Analysis',
    labelHe: 'ניתוח שאלות מבחן',
    icon: <ClipboardList className="w-5 h-5" />,
  },
  {
    href: '/exam-2023b',
    label: 'Exam 2023B',
    labelHe: 'מבחן 2023 מועד ב',
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    href: '/exam-2024b',
    label: 'Exam 2024B',
    labelHe: 'מבחן 2024 מועד ב',
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    href: '/exam-2025b',
    label: 'Exam 2025B',
    labelHe: 'מבחן 2025 מועד ב',
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    href: '/exam-2022b',
    label: 'Exam 2022B',
    labelHe: 'מבחן 2022 מועד ב',
    icon: <FileCheck className="w-5 h-5" />,
  },
  {
    href: '/debug',
    label: 'Debug',
    labelHe: 'דיבאג',
    icon: <Bug className="w-5 h-5" />,
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoPopupOpen, setLogoPopupOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => setLogoPopupOpen(true)}>
              <Image src="/logo.png" alt="L.M Logo" width={100} height={40} className="h-8 w-auto cursor-pointer" />
            </button>
          </div>
          <div className="w-10" />
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 z-40 h-full w-64 bg-white border-l border-gray-200
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-center">
              <button onClick={() => setLogoPopupOpen(true)}>
                <Image src="/logo.png" alt="L.M Logo" width={150} height={60} className="h-12 w-auto cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-colors duration-150
                    ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className={isActive ? 'text-indigo-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.labelHe}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              מבוסס על החומרים שלך בלבד
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:mr-64 pt-16 lg:pt-0 min-h-screen flex flex-col">
        <div className="p-4 md:p-6 lg:p-8 flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="p-4 border-t border-gray-200 bg-white">
          <div className="text-center text-sm text-gray-500">
            Built by <span className="font-medium text-gray-700">Lia Mesika</span>. All rights reserved.
          </div>
        </footer>
      </main>

      {/* Logo Popup */}
      {logoPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setLogoPopupOpen(false)}
        >
          <div className="relative">
            <button
              onClick={() => setLogoPopupOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src="/logo.png"
              alt="L.M Logo"
              width={400}
              height={200}
              className="max-w-[90vw] max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
