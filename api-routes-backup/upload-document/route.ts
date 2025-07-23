import { type NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { existsSync } from 'node:fs';
import DOMPurify from 'isomorphic-dompurify';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = join(process.cwd(), 'uploads');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
];

interface UploadedFileInfo {
  id: string;
  originalName: string;
  filename: string;
  size: number;
  mimetype: string;
  category: string;
  uploadedAt: string;
  url: string;
}

// Ensure upload directory exists
async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// Sanitize filename
function sanitizeFilename(filename: string): string {
  // Remove potentially dangerous characters and normalize
  const sanitized = filename
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 100); // Limit length

  return DOMPurify.sanitize(sanitized);
}

// Validate file type
function validateFileType(file: File): boolean {
  return ALLOWED_TYPES.includes(file.type);
}

// Validate file size
function validateFileSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

// Generate unique filename
function generateUniqueFilename(originalName: string): string {
  const extension = originalName.split('.').pop() || '';
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
  const sanitizedName = sanitizeFilename(nameWithoutExt);
  const uuid = uuidv4();

  return `${sanitizedName}_${uuid}.${extension}`;
}

// Virus scan simulation (in production, integrate with actual antivirus)
async function scanForViruses(buffer: Buffer): Promise<{ clean: boolean; threat?: string }> {
  // Simulate virus scanning delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Check for suspicious patterns (basic example)
  const content = buffer.toString('binary');
  const suspiciousPatterns = ['eval(', 'javascript:', '<script', 'exec(', 'system('];

  for (const pattern of suspiciousPatterns) {
    if (content.includes(pattern)) {
      return { clean: false, threat: 'Suspicious content detected' };
    }
  }

  return { clean: true };
}

// Log upload activity
async function logUpload(fileInfo: UploadedFileInfo, userInfo?: any) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event: 'file_upload',
    fileId: fileInfo.id,
    filename: fileInfo.originalName,
    size: fileInfo.size,
    category: fileInfo.category,
    userInfo: userInfo || 'anonymous',
  };

  // In production, log to your preferred logging service
  console.log('File upload:', logEntry);
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDir();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    // Validate file type
    if (!validateFileType(file)) {
      return NextResponse.json({ error: `File type ${file.type} is not allowed` }, { status: 400 });
    }

    // Validate file size
    if (!validateFileSize(file)) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Scan for viruses/malware
    const scanResult = await scanForViruses(buffer);
    if (!scanResult.clean) {
      return NextResponse.json(
        { error: `Security scan failed: ${scanResult.threat}` },
        { status: 400 }
      );
    }

    // Generate safe filename
    const uniqueFilename = generateUniqueFilename(file.name);
    const filePath = join(UPLOAD_DIR, uniqueFilename);

    // Save file
    await writeFile(filePath, buffer);

    // Create file info
    const fileInfo: UploadedFileInfo = {
      id: uuidv4(),
      originalName: file.name,
      filename: uniqueFilename,
      size: file.size,
      mimetype: file.type,
      category: DOMPurify.sanitize(category),
      uploadedAt: new Date().toISOString(),
      url: `/uploads/${uniqueFilename}`,
    };

    // Log the upload
    await logUpload(fileInfo);

    // In production, save file metadata to database
    // await saveFileMetadata(fileInfo);

    return NextResponse.json({
      success: true,
      file: fileInfo,
      url: fileInfo.url,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: 'Document Upload API',
      allowedTypes: ALLOWED_TYPES,
      maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
      endpoint: 'POST /api/upload-document',
    },
    { status: 200 }
  );
}
