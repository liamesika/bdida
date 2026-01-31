import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Hardcoded data source path
const DATA_SOURCE_PATH = '/Users/liamesika/Desktop/infi/bdida';

interface FileInfo {
  name: string;
  path: string;
  category: 'lecture' | 'tutorial' | 'homework' | 'exam';
  size: number;
}

// Scan the bdida directory for all PDFs
export async function GET() {
  try {
    const files: FileInfo[] = [];

    // Check if directory exists
    try {
      await fs.access(DATA_SOURCE_PATH);
    } catch {
      return NextResponse.json({
        error: 'Data source directory not found',
        path: DATA_SOURCE_PATH,
        files: [],
      }, { status: 404 });
    }

    // Scan subdirectories
    const subdirs = ['lecture', 'hw', 'tutorial', 'past-exams'];

    for (const subdir of subdirs) {
      const subdirPath = path.join(DATA_SOURCE_PATH, subdir);

      try {
        await fs.access(subdirPath);
        const entries = await fs.readdir(subdirPath, { withFileTypes: true });

        for (const entry of entries) {
          if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
            const filePath = path.join(subdirPath, entry.name);
            const stats = await fs.stat(filePath);

            // Determine category
            let category: FileInfo['category'] = 'lecture';
            if (subdir === 'hw') category = 'homework';
            else if (subdir === 'tutorial') category = 'tutorial';
            else if (subdir === 'past-exams') category = 'exam';
            else if (subdir === 'lecture') category = 'lecture';

            files.push({
              name: entry.name,
              path: filePath,
              category,
              size: stats.size,
            });
          }
        }
      } catch {
        // Subdirectory doesn't exist, skip it
        continue;
      }
    }

    // Also scan root for any PDFs
    try {
      const rootEntries = await fs.readdir(DATA_SOURCE_PATH, { withFileTypes: true });
      for (const entry of rootEntries) {
        if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
          const filePath = path.join(DATA_SOURCE_PATH, entry.name);
          const stats = await fs.stat(filePath);

          files.push({
            name: entry.name,
            path: filePath,
            category: 'lecture', // Default
            size: stats.size,
          });
        }
      }
    } catch {
      // Ignore errors
    }

    return NextResponse.json({
      success: true,
      path: DATA_SOURCE_PATH,
      fileCount: files.length,
      files,
      categories: {
        lectures: files.filter(f => f.category === 'lecture').length,
        tutorials: files.filter(f => f.category === 'tutorial').length,
        homework: files.filter(f => f.category === 'homework').length,
        exams: files.filter(f => f.category === 'exam').length,
      },
    });
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json({
      error: 'Failed to scan directory',
      details: String(error),
    }, { status: 500 });
  }
}
