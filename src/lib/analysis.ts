import type {
  KnowledgeItem,
  ExamQuestion,
  HomeworkQuestion,
  ExamPattern,
  Topic,
  TopicAnalysis,
  ExamAnalysis,
  PredictionResult,
  LikelihoodAnalysis,
  GapItem,
} from '@/types';
import { dbHelpers } from './db';

// Calculate likelihood scores for knowledge items based on exam appearances
export async function calculateKnowledgeLikelihoods(): Promise<void> {
  const knowledgeItems = await dbHelpers.getAllKnowledgeItems();
  const examQuestions = await dbHelpers.getAllExamQuestions();

  // Count topic frequencies in exams
  const topicFrequency: Record<Topic, number> = {} as Record<Topic, number>;
  const patternFrequency: Record<string, number> = {};

  for (const question of examQuestions) {
    for (const topic of question.topics) {
      topicFrequency[topic] = (topicFrequency[topic] || 0) + 1;
    }
    patternFrequency[question.questionPattern] = (patternFrequency[question.questionPattern] || 0) + 1;
  }

  const totalExamQuestions = examQuestions.length || 1;

  // Update each knowledge item
  for (const item of knowledgeItems) {
    let likelihood = 0;
    let examAppearances = 0;

    // Topic-based likelihood
    for (const topic of item.topics) {
      const freq = topicFrequency[topic] || 0;
      likelihood += (freq / totalExamQuestions) * 40;
    }

    // Type-based weight
    const typeWeights: Record<string, number> = {
      theorem: 25,
      definition: 20,
      proof: 20,
      technique: 15,
      lemma: 15,
      corollary: 10,
      algorithm: 15,
      example: 5,
    };
    likelihood += typeWeights[item.type] || 10;

    // Check for direct mentions in exam questions
    const itemKeywords = item.verbatimText.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    for (const question of examQuestions) {
      const questionLower = question.verbatimText.toLowerCase();
      let matches = 0;
      for (const keyword of itemKeywords.slice(0, 10)) {
        if (questionLower.includes(keyword)) matches++;
      }
      if (matches >= 3) {
        examAppearances++;
        likelihood += 10;
      }
    }

    // Normalize to 0-100
    likelihood = Math.min(100, Math.max(0, Math.round(likelihood)));

    await dbHelpers.updateKnowledgeItem(item.id, {
      likelihoodScore: likelihood,
      examAppearances,
    });
  }
}

// Calculate exam likelihood for homework questions
export async function calculateHomeworkLikelihoods(): Promise<void> {
  const homeworkQuestions = await dbHelpers.getAllHomeworkQuestions();
  const examQuestions = await dbHelpers.getAllExamQuestions();

  for (const hwQuestion of homeworkQuestions) {
    let likelihood = 0;
    const matchingExams: string[] = [];
    let reasons: string[] = [];

    // Topic overlap with exam questions
    const topicOverlap = new Set<Topic>();
    for (const examQ of examQuestions) {
      for (const hwTopic of hwQuestion.topics) {
        if (examQ.topics.includes(hwTopic)) {
          topicOverlap.add(hwTopic);
        }
      }
    }
    likelihood += topicOverlap.size * 15;
    if (topicOverlap.size > 0) {
      reasons.push(`נושאים משותפים: ${Array.from(topicOverlap).join(', ')}`);
    }

    // Pattern matching with exam questions
    const hwKeywords = hwQuestion.verbatimText.toLowerCase().split(/\s+/).filter(w => w.length > 4);

    for (const examQ of examQuestions) {
      const examLower = examQ.verbatimText.toLowerCase();
      let matchScore = 0;

      // Keyword matching
      for (const keyword of hwKeywords.slice(0, 15)) {
        if (examLower.includes(keyword)) matchScore++;
      }

      // Technique matching
      for (const technique of hwQuestion.techniques) {
        if (examQ.techniques.includes(technique)) matchScore += 5;
      }

      if (matchScore >= 5) {
        likelihood += 10;
        matchingExams.push(examQ.id);
        if (matchingExams.length === 1) {
          reasons.push(`דמיון לשאלת מבחן ${examQ.sourceFileName}`);
        }
      }
    }

    // Difficulty bonus (harder homework = more likely on exam)
    if (hwQuestion.difficulty === 'hard') {
      likelihood += 10;
      reasons.push('שאלה מאתגרת');
    }

    // Technique usage bonus
    if (hwQuestion.techniques.length > 0) {
      likelihood += hwQuestion.techniques.length * 5;
      reasons.push(`דורש טכניקות: ${hwQuestion.techniques.join(', ')}`);
    }

    // Normalize
    likelihood = Math.min(100, Math.max(0, Math.round(likelihood)));

    await dbHelpers.updateHomeworkQuestion(hwQuestion.id, {
      examLikelihoodScore: likelihood,
      similarityToExams: matchingExams.length > 0 ? Math.min(100, matchingExams.length * 20) : 0,
      matchingExamQuestions: matchingExams,
      reasonForLikelihood: reasons.join('. '),
    });
  }
}

// Analyze exam patterns
export async function analyzeExamPatterns(): Promise<ExamPattern[]> {
  const examQuestions = await dbHelpers.getAllExamQuestions();
  const patternMap = new Map<string, ExamPattern>();

  for (const question of examQuestions) {
    const pattern = question.questionPattern;

    if (!patternMap.has(pattern)) {
      patternMap.set(pattern, {
        id: pattern,
        pattern,
        description: getPatternDescription(pattern),
        frequency: 0,
        exampleQuestionIds: [],
        relatedTheorems: [],
        topics: [],
        typicalPoints: 0,
        difficulty: 'medium',
      });
    }

    const p = patternMap.get(pattern)!;
    p.frequency++;
    p.exampleQuestionIds.push(question.id);

    // Merge topics
    for (const topic of question.topics) {
      if (!p.topics.includes(topic)) {
        p.topics.push(topic);
      }
    }

    // Track points
    if (question.points) {
      p.typicalPoints = Math.round(
        (p.typicalPoints * (p.exampleQuestionIds.length - 1) + question.points) / p.exampleQuestionIds.length
      );
    }

    // Update difficulty based on majority
    if (question.difficulty === 'hard' && p.difficulty !== 'hard') {
      p.difficulty = 'hard';
    }
  }

  const patterns = Array.from(patternMap.values()).sort((a, b) => b.frequency - a.frequency);

  await dbHelpers.saveExamPatterns(patterns);

  return patterns;
}

// Get human-readable pattern description
function getPatternDescription(pattern: string): string {
  const descriptions: Record<string, string> = {
    'prove-by-induction': 'הוכחה באינדוקציה - להוכיח טענה על מספרים טבעיים או מבנים רקורסיביים',
    'prove-bijection': 'הוכחת חח"ע ועל - להוכיח שפונקציה היא ביקציה',
    'count-combinations': 'בעיית ספירה - לספור כמה דרכים/אפשרויות קיימות',
    'prove-equivalence': 'הוכחת שקילות - להוכיח ששני ביטויים/יחסים שקולים',
    'find-recurrence': 'מציאת נוסחת נסיגה - למצוא נוסחה רקורסיבית',
    'solve-recurrence': 'פתרון נוסחת נסיגה - למצוא נוסחה סגורה',
    'prove-graph-property': 'הוכחת תכונה בגרף - להוכיח טענה על גרפים',
    'find-spanning-tree': 'מציאת עץ פורש - למצוא עץ פורש מינימלי/כלשהו',
    'prove-set-equality': 'הוכחת שוויון קבוצות - להוכיח A=B בהכלה הדדית',
    'prove-divisibility': 'הוכחת התחלקות - להוכיח a|b',
    'find-gcd': 'מציאת מ.מ.ג - להשתמש באלגוריתם אוקלידס',
    'truth-table': 'טבלת אמת - לבנות טבלת אמת ולבדוק תכונות לוגיות',
    'pigeonhole': 'עקרון שובך יונים - להשתמש בעקרון לקיום',
    'euler-hamilton': 'מסלולי אוילר/המילטון - למצוא/להוכיח קיום מסלולים',
    'prove-relation-property': 'תכונות יחס - להוכיח רפלקסיביות/סימטריות/טרנזיטיביות',
    'modular-arithmetic': 'חשבון מודולרי - לעבוד עם חפיפויות מודולריות',
    'general': 'שאלה כללית',
  };

  return descriptions[pattern] || 'שאלה כללית';
}

// Analyze a single exam
export async function analyzeExam(fileId: string): Promise<ExamAnalysis | null> {
  const file = await dbHelpers.getFile(fileId);
  if (!file || file.category !== 'exam') return null;

  const questions = await dbHelpers.getExamQuestionsByFile(fileId);
  if (questions.length === 0) return null;

  // Topic distribution
  const topicCounts: Record<Topic, number> = {} as Record<Topic, number>;
  for (const q of questions) {
    for (const topic of q.topics) {
      topicCounts[topic] = (topicCounts[topic] || 0) + 1;
    }
  }

  const topicDistribution = Object.entries(topicCounts)
    .map(([topic, count]) => ({
      topic: topic as Topic,
      count,
      percentage: Math.round((count / questions.length) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  // Difficulty distribution
  const difficultyCounts: Record<string, number> = { easy: 0, medium: 0, hard: 0 };
  for (const q of questions) {
    difficultyCounts[q.difficulty]++;
  }

  const difficultyDistribution = Object.entries(difficultyCounts)
    .map(([difficulty, count]) => ({
      difficulty,
      percentage: Math.round((count / questions.length) * 100),
    }));

  // Total points
  const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);

  // Get patterns for this exam
  const patternCounts: Record<string, number> = {};
  for (const q of questions) {
    patternCounts[q.questionPattern] = (patternCounts[q.questionPattern] || 0) + 1;
  }

  const patterns: ExamPattern[] = Object.entries(patternCounts).map(([pattern, count]) => ({
    id: `${fileId}-${pattern}`,
    pattern,
    description: getPatternDescription(pattern),
    frequency: count,
    exampleQuestionIds: questions.filter(q => q.questionPattern === pattern).map(q => q.id),
    relatedTheorems: [],
    topics: [],
    typicalPoints: 0,
    difficulty: 'medium',
  }));

  const yearMatch = file.name.match(/(20\d{2})/);
  const semesterMatch = file.name.match(/moed[_\s]*([ab])/i);

  return {
    examId: fileId,
    year: yearMatch ? parseInt(yearMatch[1]) : 0,
    semester: semesterMatch ? semesterMatch[1].toUpperCase() : '',
    totalQuestions: questions.length,
    topicDistribution,
    difficultyDistribution,
    patterns,
    totalPoints,
  };
}

// Get topic analysis across all exams
export async function getTopicAnalysis(): Promise<TopicAnalysis[]> {
  const examQuestions = await dbHelpers.getAllExamQuestions();
  const topicData: Record<Topic, { count: number; points: number; patterns: Set<string> }> = {} as any;

  for (const q of examQuestions) {
    for (const topic of q.topics) {
      if (!topicData[topic]) {
        topicData[topic] = { count: 0, points: 0, patterns: new Set() };
      }
      topicData[topic].count++;
      topicData[topic].points += q.points || 0;
      topicData[topic].patterns.add(q.questionPattern);
    }
  }

  const knowledgeItems = await dbHelpers.getAllKnowledgeItems();

  return Object.entries(topicData)
    .map(([topic, data]) => ({
      topic: topic as Topic,
      frequency: data.count,
      averagePoints: data.count > 0 ? Math.round(data.points / data.count) : 0,
      relatedTheorems: knowledgeItems
        .filter(item => item.topics.includes(topic as Topic) && item.type === 'theorem')
        .map(item => item.id),
      commonPatterns: Array.from(data.patterns),
      difficulty: (data.count > 5 ? 'hard' : data.count > 2 ? 'medium' : 'easy') as 'easy' | 'medium' | 'hard',
    }))
    .sort((a, b) => b.frequency - a.frequency);
}

// Generate predictions for what will appear on the exam
export async function generatePredictions(): Promise<PredictionResult[]> {
  const knowledgeItems = await dbHelpers.getTopLikelihoodItems(30);
  const patterns = await dbHelpers.getExamPatterns();
  const examQuestions = await dbHelpers.getAllExamQuestions();

  const predictions: PredictionResult[] = [];

  // Top theorems
  for (const item of knowledgeItems.filter(i => i.type === 'theorem' || i.type === 'definition')) {
    const appearances = examQuestions
      .filter(q => {
        const itemKeywords = item.verbatimText.toLowerCase().split(/\s+/).filter(w => w.length > 4);
        const questionLower = q.verbatimText.toLowerCase();
        return itemKeywords.filter(k => questionLower.includes(k)).length >= 3;
      })
      .map(q => ({
        examId: q.sourceFileId,
        year: q.year || 0,
        context: q.verbatimText.substring(0, 100),
      }));

    predictions.push({
      itemId: item.id,
      itemType: item.type === 'theorem' ? 'theorem' : 'definition',
      title: item.title,
      likelihood: item.likelihoodScore,
      reasons: [
        `ציון סבירות: ${item.likelihoodScore}%`,
        `הופיע ${item.examAppearances} פעמים במבחנים`,
        `נושאים: ${item.topics.join(', ')}`,
      ],
      sourceAppearances: appearances,
    });
  }

  // Top patterns as question types
  for (const pattern of patterns.slice(0, 10)) {
    predictions.push({
      itemId: pattern.id,
      itemType: 'question-type',
      title: pattern.description,
      likelihood: Math.min(100, pattern.frequency * 15),
      reasons: [
        `הופיע ${pattern.frequency} פעמים`,
        `נושאים: ${pattern.topics.join(', ')}`,
        `ניקוד טיפוסי: ${pattern.typicalPoints} נקודות`,
      ],
      sourceAppearances: pattern.exampleQuestionIds.slice(0, 3).map(id => {
        const q = examQuestions.find(eq => eq.id === id);
        return {
          examId: q?.sourceFileId || '',
          year: q?.year || 0,
          context: q?.verbatimText.substring(0, 100) || '',
        };
      }),
    });
  }

  return predictions.sort((a, b) => b.likelihood - a.likelihood);
}

// Generate likelihood analysis report
export async function getLikelihoodAnalysis(): Promise<LikelihoodAnalysis> {
  await calculateKnowledgeLikelihoods();

  const allItems = await dbHelpers.getAllKnowledgeItems();

  const topTheorems = allItems
    .filter(i => i.type === 'theorem')
    .sort((a, b) => b.likelihoodScore - a.likelihoodScore)
    .slice(0, 10);

  const topProofs = allItems
    .filter(i => i.type === 'proof')
    .sort((a, b) => b.likelihoodScore - a.likelihoodScore)
    .slice(0, 10);

  const topDefinitions = allItems
    .filter(i => i.type === 'definition')
    .sort((a, b) => b.likelihoodScore - a.likelihoodScore)
    .slice(0, 10);

  const topTechniques = allItems
    .filter(i => i.type === 'technique' || i.type === 'algorithm')
    .sort((a, b) => b.likelihoodScore - a.likelihoodScore)
    .slice(0, 10);

  // Identify gaps
  const gaps: GapItem[] = [];

  const examQuestions = await dbHelpers.getAllExamQuestions();
  const coveredTopics = new Set<Topic>();
  for (const item of allItems) {
    item.topics.forEach(t => coveredTopics.add(t));
  }

  // Check which topics appear in exams but have low coverage
  const examTopics: Record<Topic, number> = {} as Record<Topic, number>;
  for (const q of examQuestions) {
    for (const t of q.topics) {
      examTopics[t] = (examTopics[t] || 0) + 1;
    }
  }

  for (const [topic, count] of Object.entries(examTopics)) {
    const itemsOnTopic = allItems.filter(i => i.topics.includes(topic as Topic));
    if (count > 3 && itemsOnTopic.length < 5) {
      gaps.push({
        description: `נושא ${topic} נפוץ במבחנים אך יש מעט חומר בבסיס הידע`,
        reason: `הופיע ${count} פעמים במבחנים, רק ${itemsOnTopic.length} פריטי ידע`,
        suggestedAction: `לסקור את ההרצאות והתרגולים בנושא ${topic}`,
        relatedTopics: [topic as Topic],
        priority: count > 5 ? 'critical' : 'high',
      });
    }
  }

  return {
    topTheorems,
    topProofs,
    topDefinitions,
    topTechniques,
    gaps,
    lastUpdated: new Date(),
  };
}

// Run full analysis pipeline
export async function runFullAnalysis(): Promise<void> {
  await calculateKnowledgeLikelihoods();
  await calculateHomeworkLikelihoods();
  await analyzeExamPatterns();
}
