import Dexie, { type EntityTable } from 'dexie';
import type {
  UploadedFile,
  KnowledgeItem,
  ExamQuestion,
  HomeworkQuestion,
  StudySession,
  StudyPlan,
  PracticeResult,
  ExamPattern,
  StudyWeek,
  WeekProgress,
  ExamCalendar,
} from '@/types';

// Database schema for BDIDA - Discrete Mathematics
class BdidaDB extends Dexie {
  files!: EntityTable<UploadedFile, 'id'>;
  knowledgeItems!: EntityTable<KnowledgeItem, 'id'>;
  examQuestions!: EntityTable<ExamQuestion, 'id'>;
  homeworkQuestions!: EntityTable<HomeworkQuestion, 'id'>;
  studySessions!: EntityTable<StudySession, 'id'>;
  studyPlans!: EntityTable<StudyPlan, 'id'>;
  practiceResults!: EntityTable<PracticeResult, 'id'>;
  examPatterns!: EntityTable<ExamPattern, 'id'>;
  studyWeeks!: EntityTable<StudyWeek, 'id'>;
  weekProgress!: EntityTable<WeekProgress, 'weekId'>;
  examCalendar!: EntityTable<ExamCalendar, 'id'>;
  settings!: EntityTable<{ id: string; value: unknown }, 'id'>;

  constructor() {
    super('BdidaDB');

    this.version(2).stores({
      files: 'id, category, indexNumber, displayTag, uploadedAt, isProcessed, path',
      knowledgeItems: 'id, type, sourceFileId, *topics, isInReviewList, likelihoodScore, examAppearances, createdAt',
      examQuestions: 'id, sourceFileId, *topics, difficulty, questionPattern, isFromHomework, year',
      homeworkQuestions: 'id, sourceFileId, homeworkNumber, examLikelihoodScore, *topics',
      studySessions: 'id, date, mode',
      studyPlans: 'id, examDate, createdAt',
      practiceResults: 'id, itemId, attemptedAt, wasCorrect',
      examPatterns: 'id, pattern, frequency, *topics',
      studyWeeks: 'id, weekNumber, isCompleted, likelihoodScore',
      weekProgress: 'weekId, weekNumber, completionPercentage',
      examCalendar: 'id, examDate, createdAt',
      settings: 'id',
    });
  }
}

export const db = new BdidaDB();

// Helper functions for database operations
export const dbHelpers = {
  // Files
  async addFile(file: UploadedFile): Promise<string> {
    return await db.files.add(file);
  },

  async getFile(id: string): Promise<UploadedFile | undefined> {
    return await db.files.get(id);
  },

  async getFileByPath(path: string): Promise<UploadedFile | undefined> {
    return await db.files.where('path').equals(path).first();
  },

  async getAllFiles(): Promise<UploadedFile[]> {
    return await db.files.toArray();
  },

  async getFilesByCategory(category: UploadedFile['category']): Promise<UploadedFile[]> {
    return await db.files.where('category').equals(category).sortBy('indexNumber');
  },

  async updateFile(id: string, changes: Partial<UploadedFile>): Promise<void> {
    await db.files.update(id, changes);
  },

  async deleteFile(id: string): Promise<void> {
    await db.knowledgeItems.where('sourceFileId').equals(id).delete();
    await db.examQuestions.where('sourceFileId').equals(id).delete();
    await db.homeworkQuestions.where('sourceFileId').equals(id).delete();
    await db.files.delete(id);
  },

  // Knowledge Items
  async addKnowledgeItem(item: KnowledgeItem): Promise<string> {
    return await db.knowledgeItems.add(item);
  },

  async addKnowledgeItems(items: KnowledgeItem[]): Promise<void> {
    await db.knowledgeItems.bulkAdd(items);
  },

  async getKnowledgeItem(id: string): Promise<KnowledgeItem | undefined> {
    return await db.knowledgeItems.get(id);
  },

  async getAllKnowledgeItems(): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.toArray();
  },

  async getKnowledgeItemsByType(type: KnowledgeItem['type']): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.where('type').equals(type).toArray();
  },

  async getKnowledgeItemsByTopic(topic: string): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.where('topics').equals(topic).toArray();
  },

  async getReviewList(): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.filter(item => item.isInReviewList).toArray();
  },

  async getTopLikelihoodItems(limit: number = 20): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.orderBy('likelihoodScore').reverse().limit(limit).toArray();
  },

  async getTopExamItems(limit: number = 20): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.orderBy('examAppearances').reverse().limit(limit).toArray();
  },

  async updateKnowledgeItem(id: string, changes: Partial<KnowledgeItem>): Promise<void> {
    await db.knowledgeItems.update(id, changes);
  },

  async toggleReviewList(id: string): Promise<boolean> {
    const item = await db.knowledgeItems.get(id);
    if (item) {
      const newValue = !item.isInReviewList;
      await db.knowledgeItems.update(id, { isInReviewList: newValue });
      return newValue;
    }
    return false;
  },

  // Exam Questions
  async addExamQuestion(question: ExamQuestion): Promise<string> {
    return await db.examQuestions.add(question);
  },

  async addExamQuestions(questions: ExamQuestion[]): Promise<void> {
    await db.examQuestions.bulkAdd(questions);
  },

  async getAllExamQuestions(): Promise<ExamQuestion[]> {
    return await db.examQuestions.toArray();
  },

  async getExamQuestionsByFile(fileId: string): Promise<ExamQuestion[]> {
    return await db.examQuestions.where('sourceFileId').equals(fileId).toArray();
  },

  async getExamQuestionsByTopic(topic: string): Promise<ExamQuestion[]> {
    return await db.examQuestions.where('topics').equals(topic).toArray();
  },

  async getExamQuestionsByYear(year: number): Promise<ExamQuestion[]> {
    return await db.examQuestions.where('year').equals(year).toArray();
  },

  // Homework Questions
  async addHomeworkQuestion(question: HomeworkQuestion): Promise<string> {
    return await db.homeworkQuestions.add(question);
  },

  async addHomeworkQuestions(questions: HomeworkQuestion[]): Promise<void> {
    await db.homeworkQuestions.bulkAdd(questions);
  },

  async getAllHomeworkQuestions(): Promise<HomeworkQuestion[]> {
    return await db.homeworkQuestions.toArray();
  },

  async getHomeworkQuestionsByLikelihood(): Promise<HomeworkQuestion[]> {
    return await db.homeworkQuestions.orderBy('examLikelihoodScore').reverse().toArray();
  },

  async getHomeworkQuestionsByNumber(hwNumber: number): Promise<HomeworkQuestion[]> {
    return await db.homeworkQuestions.where('homeworkNumber').equals(hwNumber).toArray();
  },

  async updateHomeworkQuestion(id: string, changes: Partial<HomeworkQuestion>): Promise<void> {
    await db.homeworkQuestions.update(id, changes);
  },

  // Study Sessions
  async addStudySession(session: StudySession): Promise<string> {
    return await db.studySessions.add(session);
  },

  async getStudySessions(): Promise<StudySession[]> {
    return await db.studySessions.orderBy('date').reverse().toArray();
  },

  async getTodaySessions(): Promise<StudySession[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await db.studySessions.filter(s => new Date(s.date) >= today).toArray();
  },

  // Study Plans
  async saveStudyPlan(plan: StudyPlan): Promise<string> {
    return await db.studyPlans.put(plan);
  },

  async getActiveStudyPlan(): Promise<StudyPlan | undefined> {
    const plans = await db.studyPlans.orderBy('createdAt').reverse().toArray();
    return plans[0];
  },

  // Practice Results
  async addPracticeResult(result: PracticeResult): Promise<string> {
    return await db.practiceResults.add(result);
  },

  async getPracticeResultsForItem(itemId: string): Promise<PracticeResult[]> {
    return await db.practiceResults.where('itemId').equals(itemId).toArray();
  },

  async getRecentPracticeResults(limit: number = 50): Promise<PracticeResult[]> {
    return await db.practiceResults.orderBy('attemptedAt').reverse().limit(limit).toArray();
  },

  // Exam Patterns
  async saveExamPatterns(patterns: ExamPattern[]): Promise<void> {
    await db.examPatterns.clear();
    await db.examPatterns.bulkAdd(patterns);
  },

  async getExamPatterns(): Promise<ExamPattern[]> {
    return await db.examPatterns.orderBy('frequency').reverse().toArray();
  },

  async getPatternsByTopic(topic: string): Promise<ExamPattern[]> {
    return await db.examPatterns.where('topics').equals(topic).toArray();
  },

  // Settings
  async getSetting<T>(key: string): Promise<T | undefined> {
    const setting = await db.settings.get(key);
    return setting?.value as T | undefined;
  },

  async setSetting(key: string, value: unknown): Promise<void> {
    await db.settings.put({ id: key, value });
  },

  // Stats
  async getStats() {
    const files = await db.files.toArray();
    const sessions = await db.studySessions.orderBy('date').reverse().toArray();

    let studyStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dayStart = new Date(checkDate);
      const dayEnd = new Date(checkDate);
      dayEnd.setDate(dayEnd.getDate() + 1);

      const sessionsOnDay = sessions.filter(s => {
        const sessionDate = new Date(s.date);
        return sessionDate >= dayStart && sessionDate < dayEnd;
      });

      if (sessionsOnDay.length > 0) {
        studyStreak++;
      } else if (i > 0) {
        break;
      }
    }

    const lastIndexedAt = await db.settings.get('lastIndexedAt');

    return {
      totalFiles: files.length,
      lectureCount: files.filter(f => f.category === 'lecture').length,
      tutorialCount: files.filter(f => f.category === 'tutorial').length,
      homeworkCount: files.filter(f => f.category === 'homework').length,
      examCount: files.filter(f => f.category === 'exam').length,
      totalKnowledgeItems: await db.knowledgeItems.count(),
      totalExamQuestions: await db.examQuestions.count(),
      totalHomeworkQuestions: await db.homeworkQuestions.count(),
      totalQuestions: (await db.examQuestions.count()) + (await db.homeworkQuestions.count()),
      totalPatterns: await db.examPatterns.count(),
      studyStreak,
      lastStudyDate: sessions[0]?.date,
      lastIndexedAt: lastIndexedAt?.value as Date | undefined,
    };
  },

  // Clear all data
  async clearAllData(): Promise<void> {
    await db.files.clear();
    await db.knowledgeItems.clear();
    await db.examQuestions.clear();
    await db.homeworkQuestions.clear();
    await db.studySessions.clear();
    await db.studyPlans.clear();
    await db.practiceResults.clear();
    await db.examPatterns.clear();
    await db.settings.clear();
  },

  // Check if data needs reindexing
  async needsReindex(): Promise<boolean> {
    const fileCount = await db.files.count();
    if (fileCount === 0) return true;

    const lastIndexed = await db.settings.get('lastIndexedAt');
    if (!lastIndexed) return true;

    return false;
  },

  // Study Weeks
  async saveStudyWeeks(weeks: StudyWeek[]): Promise<void> {
    await db.studyWeeks.clear();
    await db.studyWeeks.bulkAdd(weeks);
  },

  async getAllStudyWeeks(): Promise<StudyWeek[]> {
    return await db.studyWeeks.orderBy('weekNumber').toArray();
  },

  async getStudyWeek(weekNumber: number): Promise<StudyWeek | undefined> {
    return await db.studyWeeks.where('weekNumber').equals(weekNumber).first();
  },

  async updateStudyWeek(id: string, changes: Partial<StudyWeek>): Promise<void> {
    await db.studyWeeks.update(id, changes);
  },

  async markWeekCompleted(weekNumber: number): Promise<void> {
    const week = await db.studyWeeks.where('weekNumber').equals(weekNumber).first();
    if (week) {
      await db.studyWeeks.update(week.id, {
        isCompleted: true,
        completedAt: new Date()
      });
    }
  },

  async markWeekIncomplete(weekNumber: number): Promise<void> {
    const week = await db.studyWeeks.where('weekNumber').equals(weekNumber).first();
    if (week) {
      await db.studyWeeks.update(week.id, {
        isCompleted: false,
        completedAt: undefined
      });
    }
  },

  // Week Progress
  async saveWeekProgress(progress: WeekProgress): Promise<void> {
    await db.weekProgress.put(progress);
  },

  async getWeekProgress(weekId: string): Promise<WeekProgress | undefined> {
    return await db.weekProgress.get(weekId);
  },

  async getAllWeekProgress(): Promise<WeekProgress[]> {
    return await db.weekProgress.orderBy('weekNumber').toArray();
  },

  // Exam Calendar
  async saveExamCalendar(calendar: ExamCalendar): Promise<void> {
    await db.examCalendar.clear();
    await db.examCalendar.add(calendar);
  },

  async getExamCalendar(): Promise<ExamCalendar | undefined> {
    const calendars = await db.examCalendar.toArray();
    return calendars[0];
  },

  async updateExamCalendar(id: string, changes: Partial<ExamCalendar>): Promise<void> {
    await db.examCalendar.update(id, changes);
  },

  // Get knowledge items by file
  async getKnowledgeItemsByFile(fileId: string): Promise<KnowledgeItem[]> {
    return await db.knowledgeItems.where('sourceFileId').equals(fileId).toArray();
  },
};

export default db;
