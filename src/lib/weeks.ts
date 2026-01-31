import { v4 as uuidv4 } from 'uuid';
import { dbHelpers } from './db';
import type {
  StudyWeek,
  UploadedFile,
  KnowledgeItem,
  Topic,
  ExamCalendar,
  DailyStudySchedule,
  WeekStudyTask,
} from '@/types';

// Extract week number from filename
export function extractWeekNumber(fileName: string): number {
  // Common patterns for week/lecture numbers
  const patterns = [
    /(?:הרצאה|lecture|lec)[_\s-]*(\d+)/i,
    /(?:ex|hw|homework|תרגיל)[_\s-]*(\d+)/i,
    /^(\d+)\.pdf$/i,
    /[_\s-](\d+)[_\s-]/,
    /(\d+)/,
  ];

  for (const pattern of patterns) {
    const match = fileName.match(pattern);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num >= 1 && num <= 15) {
        return num;
      }
    }
  }

  return 1;
}

// Map lecture/homework numbers to weeks
// Typically: Lecture 1-2 = Week 1, Lecture 3 = Week 2, etc.
export function mapToWeek(indexNumber: number): number {
  // Direct mapping: index number is the week
  return indexNumber;
}

// Build study weeks from files and knowledge items
export async function buildStudyWeeks(): Promise<StudyWeek[]> {
  const files = await dbHelpers.getAllFiles();
  const allKnowledgeItems = await dbHelpers.getAllKnowledgeItems();
  const examPatterns = await dbHelpers.getExamPatterns();

  // Group files by week
  const weekFiles: Map<number, { lectures: UploadedFile[]; homework: UploadedFile[]; tutorials: UploadedFile[] }> = new Map();

  // Separate exams (they don't belong to specific weeks)
  const lectures = files.filter(f => f.category === 'lecture');
  const homework = files.filter(f => f.category === 'homework');
  const tutorials = files.filter(f => f.category === 'tutorial');

  // Group lectures by their index number (which represents week)
  for (const lecture of lectures) {
    const weekNum = lecture.indexNumber || extractWeekNumber(lecture.name);
    if (!weekFiles.has(weekNum)) {
      weekFiles.set(weekNum, { lectures: [], homework: [], tutorials: [] });
    }
    weekFiles.get(weekNum)!.lectures.push(lecture);
  }

  // Group homework by their index number
  for (const hw of homework) {
    const weekNum = hw.indexNumber || extractWeekNumber(hw.name);
    if (!weekFiles.has(weekNum)) {
      weekFiles.set(weekNum, { lectures: [], homework: [], tutorials: [] });
    }
    weekFiles.get(weekNum)!.homework.push(hw);
  }

  // Group tutorials
  for (const tut of tutorials) {
    const weekNum = tut.indexNumber || extractWeekNumber(tut.name);
    if (!weekFiles.has(weekNum)) {
      weekFiles.set(weekNum, { lectures: [], homework: [], tutorials: [] });
    }
    weekFiles.get(weekNum)!.tutorials.push(tut);
  }

  // Build weeks
  const weeks: StudyWeek[] = [];
  const sortedWeekNumbers = Array.from(weekFiles.keys()).sort((a, b) => a - b);

  for (const weekNum of sortedWeekNumbers) {
    const weekData = weekFiles.get(weekNum)!;

    // Get all file IDs for this week
    const lectureIds = weekData.lectures.map(f => f.id);
    const homeworkIds = weekData.homework.map(f => f.id);
    const tutorialIds = weekData.tutorials.map(f => f.id);
    const allFileIds = [...lectureIds, ...homeworkIds, ...tutorialIds];

    // Get knowledge items for this week's files
    const weekKnowledgeItems = allKnowledgeItems.filter(item =>
      allFileIds.includes(item.sourceFileId)
    );

    // Separate by type
    const definitions = weekKnowledgeItems.filter(i => i.type === 'definition');
    const theorems = weekKnowledgeItems.filter(i => i.type === 'theorem' || i.type === 'lemma' || i.type === 'corollary');
    const proofs = weekKnowledgeItems.filter(i => i.type === 'proof');
    const techniques = weekKnowledgeItems.filter(i => i.type === 'technique' || i.type === 'algorithm');

    // Collect unique topics
    const topicsSet = new Set<Topic>();
    weekKnowledgeItems.forEach(item => item.topics.forEach(t => topicsSet.add(t)));
    const topics = Array.from(topicsSet);

    // Get example patterns from this week's content
    const examplePatterns = examPatterns
      .filter(p => p.topics.some(t => topics.includes(t)))
      .slice(0, 5)
      .map(p => p.description);

    // Calculate likelihood score (average of all items)
    const likelihoodScores = weekKnowledgeItems.map(i => i.likelihoodScore);
    const avgLikelihood = likelihoodScores.length > 0
      ? Math.round(likelihoodScores.reduce((a, b) => a + b, 0) / likelihoodScores.length)
      : 50;

    // Estimate study time (10 min per definition, 15 min per theorem, 20 min per proof)
    const studyTimeMinutes =
      definitions.length * 10 +
      theorems.length * 15 +
      proofs.length * 20 +
      techniques.length * 10;

    // Generate week title based on topics
    const weekTitle = generateWeekTitle(weekNum, topics, definitions, theorems);

    const week: StudyWeek = {
      id: uuidv4(),
      weekNumber: weekNum,
      title: weekTitle,
      lectureIds,
      homeworkIds,
      tutorialIds,
      topics,
      definitions,
      theorems,
      proofs,
      techniques,
      examplePatterns,
      isCompleted: false,
      likelihoodScore: avgLikelihood,
      studyTimeMinutes: Math.max(studyTimeMinutes, 30), // Minimum 30 min
    };

    weeks.push(week);
  }

  // Save to database
  await dbHelpers.saveStudyWeeks(weeks);

  return weeks;
}

// Generate a descriptive title for the week
function generateWeekTitle(weekNum: number, topics: Topic[], definitions: KnowledgeItem[], theorems: KnowledgeItem[]): string {
  const topicLabels: Record<Topic, string> = {
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
    other: 'נושאים נוספים',
  };

  // Get main topics (up to 2)
  const mainTopics = topics
    .filter(t => t !== 'other')
    .slice(0, 2)
    .map(t => topicLabels[t])
    .join(' + ');

  if (mainTopics) {
    return `שבוע ${weekNum}: ${mainTopics}`;
  }

  return `שבוע ${weekNum}`;
}

// Build exam calendar for Feb 4, 2025
export async function buildExamCalendar(): Promise<ExamCalendar> {
  const weeks = await dbHelpers.getAllStudyWeeks();

  // Exam date: Feb 4, 2025 (Wednesday)
  const examDate = new Date(2025, 1, 4); // Month is 0-indexed

  // Available study days before exam: Sat, Sun, Mon, Tue
  // Feb 1 (Sat), Feb 2 (Sun), Feb 3 (Mon), Feb 4 is exam day
  // But we should include more days to cover all weeks
  // Let's go back to find enough Sat/Sun/Mon/Tue days

  const availableDays: Date[] = [];
  const studyDayNames = ['Saturday', 'Sunday', 'Monday', 'Tuesday'];

  // Start from exam date and go backwards to find study days
  let currentDate = new Date(examDate);
  currentDate.setDate(currentDate.getDate() - 1); // Start from day before exam

  // We need enough days to cover all weeks
  // Aim for at least 2 weeks of study days
  while (availableDays.length < 8) {
    const dayOfWeek = currentDate.getDay();
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, 6 = Saturday
    if (dayOfWeek === 0 || dayOfWeek === 1 || dayOfWeek === 2 || dayOfWeek === 6) {
      availableDays.unshift(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Sort weeks by likelihood (highest priority first)
  const sortedWeeks = [...weeks].sort((a, b) => b.likelihoodScore - a.likelihoodScore);

  // Distribute weeks across available days
  const dailySchedule: DailyStudySchedule[] = [];
  const weeksPerDay = Math.ceil(sortedWeeks.length / availableDays.length);

  const dayNames: Record<number, string> = {
    0: 'יום ראשון',
    1: 'יום שני',
    2: 'יום שלישי',
    6: 'שבת',
  };

  for (let i = 0; i < availableDays.length; i++) {
    const date = availableDays[i];
    const dayOfWeek = date.getDay();
    const dayName = dayNames[dayOfWeek] || date.toLocaleDateString('he-IL', { weekday: 'long' });

    // Get weeks for this day
    const startIdx = i * weeksPerDay;
    const endIdx = Math.min(startIdx + weeksPerDay, sortedWeeks.length);
    const dayWeeks = sortedWeeks.slice(startIdx, endIdx);

    if (dayWeeks.length === 0) continue;

    const tasks: WeekStudyTask[] = [];
    let totalMinutes = 0;

    for (const week of dayWeeks) {
      // Add review definitions task
      if (week.definitions.length > 0) {
        tasks.push({
          id: uuidv4(),
          weekNumber: week.weekNumber,
          taskType: 'review-definitions',
          description: `חזרה על ${week.definitions.length} הגדרות - שבוע ${week.weekNumber}`,
          itemIds: week.definitions.map(d => d.id),
          estimatedMinutes: week.definitions.length * 5,
          isCompleted: false,
          priority: week.likelihoodScore >= 70 ? 'critical' : week.likelihoodScore >= 50 ? 'high' : 'medium',
        });
        totalMinutes += week.definitions.length * 5;
      }

      // Add review theorems task
      if (week.theorems.length > 0) {
        tasks.push({
          id: uuidv4(),
          weekNumber: week.weekNumber,
          taskType: 'review-theorems',
          description: `חזרה על ${week.theorems.length} משפטים - שבוע ${week.weekNumber}`,
          itemIds: week.theorems.map(t => t.id),
          estimatedMinutes: week.theorems.length * 10,
          isCompleted: false,
          priority: week.likelihoodScore >= 70 ? 'critical' : week.likelihoodScore >= 50 ? 'high' : 'medium',
        });
        totalMinutes += week.theorems.length * 10;
      }

      // Add review proofs task
      if (week.proofs.length > 0) {
        tasks.push({
          id: uuidv4(),
          weekNumber: week.weekNumber,
          taskType: 'review-proofs',
          description: `חזרה על ${week.proofs.length} הוכחות - שבוע ${week.weekNumber}`,
          itemIds: week.proofs.map(p => p.id),
          estimatedMinutes: week.proofs.length * 15,
          isCompleted: false,
          priority: week.likelihoodScore >= 70 ? 'critical' : 'high',
        });
        totalMinutes += week.proofs.length * 15;
      }

      // Add practice task
      tasks.push({
        id: uuidv4(),
        weekNumber: week.weekNumber,
        taskType: 'practice',
        description: `תרגול שבוע ${week.weekNumber}`,
        itemIds: [],
        estimatedMinutes: 20,
        isCompleted: false,
        priority: 'medium',
      });
      totalMinutes += 20;
    }

    dailySchedule.push({
      date,
      dayName,
      weekNumbers: dayWeeks.map(w => w.weekNumber),
      tasks,
      totalMinutes,
      isCompleted: false,
    });
  }

  const calendar: ExamCalendar = {
    id: uuidv4(),
    examDate,
    availableDays,
    dailySchedule,
    createdAt: new Date(),
    totalWeeks: weeks.length,
    completedWeeks: weeks.filter(w => w.isCompleted).length,
  };

  await dbHelpers.saveExamCalendar(calendar);

  return calendar;
}

// Get overall progress
export async function getOverallProgress(): Promise<{
  totalWeeks: number;
  completedWeeks: number;
  totalDefinitions: number;
  totalTheorems: number;
  totalProofs: number;
  overallPercentage: number;
}> {
  const weeks = await dbHelpers.getAllStudyWeeks();

  const totalWeeks = weeks.length;
  const completedWeeks = weeks.filter(w => w.isCompleted).length;
  const totalDefinitions = weeks.reduce((sum, w) => sum + w.definitions.length, 0);
  const totalTheorems = weeks.reduce((sum, w) => sum + w.theorems.length, 0);
  const totalProofs = weeks.reduce((sum, w) => sum + w.proofs.length, 0);
  const overallPercentage = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

  return {
    totalWeeks,
    completedWeeks,
    totalDefinitions,
    totalTheorems,
    totalProofs,
    overallPercentage,
  };
}
