'use client';

import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbHelpers } from '@/lib/db';
import {
  extractKnowledgeItems,
  extractHomeworkQuestions,
  extractExamQuestions,
  suggestCategory,
  extractIndexNumber,
  generateDisplayTag,
} from '@/lib/pdf-extractor';
import { runFullAnalysis } from '@/lib/analysis';
import { buildStudyWeeks, buildExamCalendar } from '@/lib/weeks';
import type { UploadedFile, FileCategory } from '@/types';

interface InitStatus {
  isInitializing: boolean;
  isComplete: boolean;
  currentFile: string;
  progress: number;
  totalFiles: number;
  processedFiles: number;
  error: string | null;
  stats: {
    files: number;
    knowledgeItems: number;
    examQuestions: number;
    homeworkQuestions: number;
  };
}

interface ScanResult {
  files: {
    name: string;
    path: string;
    category: FileCategory;
    size: number;
  }[];
}

interface ExtractResult {
  success?: boolean;
  error?: string;
  pageCount: number;
  pages: { pageNumber: number; text: string }[];
  fullText: string;
}

export function useAutoInit() {
  const [status, setStatus] = useState<InitStatus>({
    isInitializing: false,
    isComplete: false,
    currentFile: '',
    progress: 0,
    totalFiles: 0,
    processedFiles: 0,
    error: null,
    stats: {
      files: 0,
      knowledgeItems: 0,
      examQuestions: 0,
      homeworkQuestions: 0,
    },
  });

  const scanAndIndex = useCallback(async (forceReindex: boolean = false) => {
    // Check if already indexed
    if (!forceReindex) {
      const needsReindex = await dbHelpers.needsReindex();
      if (!needsReindex) {
        const stats = await dbHelpers.getStats();
        setStatus(prev => ({
          ...prev,
          isComplete: true,
          stats: {
            files: stats.totalFiles,
            knowledgeItems: stats.totalKnowledgeItems,
            examQuestions: stats.totalExamQuestions || 0,
            homeworkQuestions: stats.totalHomeworkQuestions || 0,
          },
        }));
        return;
      }
    }

    setStatus(prev => ({ ...prev, isInitializing: true, error: null }));

    try {
      // Clear existing data if reindexing
      if (forceReindex) {
        await dbHelpers.clearAllData();
      }

      // Scan the bdida folder via API
      const scanResponse = await fetch('/api/scan');
      const scanResult: ScanResult & { error?: string } = await scanResponse.json();

      if (scanResult.error) {
        throw new Error(scanResult.error);
      }

      const files = scanResult.files;
      setStatus(prev => ({ ...prev, totalFiles: files.length }));

      let knowledgeItemCount = 0;
      let examQuestionCount = 0;
      let homeworkQuestionCount = 0;

      // Process each PDF
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        setStatus(prev => ({
          ...prev,
          currentFile: file.name,
          progress: Math.round(((i + 1) / files.length) * 100),
          processedFiles: i + 1,
        }));

        try {
          // Check if already processed
          const existingFile = await dbHelpers.getFileByPath(file.path);
          if (existingFile && existingFile.isProcessed) {
            continue;
          }

          // Extract PDF text via server API
          const extractResponse = await fetch('/api/extract', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ filePath: file.path }),
          });

          const extractResult: ExtractResult = await extractResponse.json();
          if (extractResult.error) {
            console.error(`Failed to extract ${file.name}:`, extractResult.error);
            continue;
          }

          // Create extraction object for processing
          const extraction = {
            pageCount: extractResult.pageCount,
            pages: extractResult.pages.map(p => ({
              pageNumber: p.pageNumber,
              text: p.text,
              lines: p.text.split('\n').filter((line: string) => line.trim()),
            })),
            fullText: extractResult.fullText,
          };

          // Create file record
          const category = file.category || suggestCategory(file.name, extraction.fullText);
          const indexNumber = extractIndexNumber(file.name);
          const displayTag = generateDisplayTag(category, indexNumber, file.name);

          const fileId = uuidv4();
          const uploadedFile: UploadedFile = {
            id: fileId,
            name: file.name,
            path: file.path,
            category,
            indexNumber,
            displayTag,
            uploadedAt: new Date(),
            fileSize: file.size,
            pageCount: extraction.pageCount,
            extractedText: extraction.fullText,
            isProcessed: true,
          };

          await dbHelpers.addFile(uploadedFile);

          // Extract knowledge items from lectures
          if (category === 'lecture' || category === 'tutorial') {
            const items = extractKnowledgeItems(extraction.pages, fileId, file.name);
            if (items.length > 0) {
              await dbHelpers.addKnowledgeItems(items);
              knowledgeItemCount += items.length;
            }
          }

          // Extract homework questions
          if (category === 'homework') {
            const hwNumber = extractIndexNumber(file.name);
            const questions = extractHomeworkQuestions(extraction.pages, fileId, file.name, hwNumber);
            if (questions.length > 0) {
              await dbHelpers.addHomeworkQuestions(questions);
              homeworkQuestionCount += questions.length;
            }

            // Also extract any knowledge items from solutions
            const items = extractKnowledgeItems(extraction.pages, fileId, file.name);
            if (items.length > 0) {
              await dbHelpers.addKnowledgeItems(items);
              knowledgeItemCount += items.length;
            }
          }

          // Extract exam questions
          if (category === 'exam') {
            const questions = extractExamQuestions(extraction.pages, fileId, file.name);
            if (questions.length > 0) {
              await dbHelpers.addExamQuestions(questions);
              examQuestionCount += questions.length;
            }
          }
        } catch (fileError) {
          console.error(`Error processing ${file.name}:`, fileError);
          // Continue with other files
        }
      }

      // Run analysis
      setStatus(prev => ({ ...prev, currentFile: 'מנתח נתונים ומחשב סבירויות...' }));
      await runFullAnalysis();

      // Build weekly study structure
      setStatus(prev => ({ ...prev, currentFile: 'בונה מערכת לימוד שבועית...' }));
      await buildStudyWeeks();

      // Build exam calendar
      setStatus(prev => ({ ...prev, currentFile: 'בונה לוח לימודים למבחן...' }));
      await buildExamCalendar();

      // Save last indexed timestamp
      await dbHelpers.setSetting('lastIndexedAt', new Date());

      setStatus({
        isInitializing: false,
        isComplete: true,
        currentFile: '',
        progress: 100,
        totalFiles: files.length,
        processedFiles: files.length,
        error: null,
        stats: {
          files: files.length,
          knowledgeItems: knowledgeItemCount,
          examQuestions: examQuestionCount,
          homeworkQuestions: homeworkQuestionCount,
        },
      });
    } catch (error) {
      console.error('Initialization error:', error);
      setStatus(prev => ({
        ...prev,
        isInitializing: false,
        error: String(error),
      }));
    }
  }, []);

  // Auto-init on mount
  useEffect(() => {
    scanAndIndex(false);
  }, [scanAndIndex]);

  const reindex = useCallback(() => {
    scanAndIndex(true);
  }, [scanAndIndex]);

  return { status, reindex };
}

export default useAutoInit;
