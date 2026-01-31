import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function extractPDFText(filePath: string): Promise<{
  pageCount: number;
  pages: { pageNumber: number; text: string }[];
  fullText: string;
}> {
  // Try using pdftotext if available (from poppler)
  try {
    const { stdout } = await execAsync(`pdftotext -layout "${filePath}" -`);
    const fullText = stdout;

    // Split by form feed character (page break) or estimate pages
    const pageTexts = fullText.split('\f').filter(p => p.trim());
    const pages = pageTexts.map((text, i) => ({
      pageNumber: i + 1,
      text: text.trim(),
    }));

    return {
      pageCount: pages.length || 1,
      pages: pages.length > 0 ? pages : [{ pageNumber: 1, text: fullText }],
      fullText,
    };
  } catch {
    // pdftotext not available, try Python
  }

  // Try using Python with PyPDF2
  try {
    const pythonScript = `
import sys
import json
try:
    from pypdf import PdfReader
except ImportError:
    from PyPDF2 import PdfReader

reader = PdfReader("${filePath.replace(/"/g, '\\"')}")
pages = []
for i, page in enumerate(reader.pages):
    text = page.extract_text() or ""
    pages.append({"pageNumber": i + 1, "text": text})

result = {
    "pageCount": len(reader.pages),
    "pages": pages,
    "fullText": "\\n\\n".join(p["text"] for p in pages)
}
print(json.dumps(result))
`;

    const { stdout } = await execAsync(`python3 -c '${pythonScript.replace(/'/g, "'\"'\"'")}'`);
    return JSON.parse(stdout);
  } catch {
    // Python not available or error
  }

  // Fallback: use pdfjs-dist with proper configuration
  const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

  const dataBuffer = await fs.readFile(filePath);
  const uint8Array = new Uint8Array(dataBuffer);

  const loadingTask = pdfjsLib.getDocument({
    data: uint8Array,
    useSystemFonts: true,
    disableFontFace: true,
    verbosity: 0,
    isEvalSupported: false,
    useWorkerFetch: false,
  });

  const pdf = await loadingTask.promise;
  const pages: { pageNumber: number; text: string }[] = [];
  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    try {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => {
          if ('str' in item) {
            return (item as { str: string }).str;
          }
          return '';
        })
        .join(' ');

      pages.push({
        pageNumber: i,
        text: pageText,
      });
      textParts.push(pageText);
    } catch (pageError) {
      console.error(`Error extracting page ${i}:`, pageError);
      pages.push({
        pageNumber: i,
        text: '',
      });
    }
  }

  const fullText = textParts.join('\n\n');

  return {
    pageCount: pdf.numPages,
    pages,
    fullText,
  };
}

// Extract text from PDF on server
export async function POST(request: NextRequest) {
  try {
    const { filePath } = await request.json();

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 });
    }

    // Security check: ensure path is within bdida directory
    const allowedBase = '/Users/liamesika/Desktop/infi/bdida';
    if (!filePath.startsWith(allowedBase)) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 403 });
    }

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const extraction = await extractPDFText(filePath);

    return NextResponse.json({
      success: true,
      pageCount: extraction.pageCount,
      pages: extraction.pages,
      fullText: extraction.fullText,
    });
  } catch (error) {
    console.error('Extract error:', error);
    return NextResponse.json({
      error: 'Failed to extract PDF',
      details: String(error),
    }, { status: 500 });
  }
}
