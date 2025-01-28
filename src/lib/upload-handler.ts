import { NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { ensureDir } from './ensure-dir';
import fs from 'fs';

export type FileType = 'image' | 'video';

const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  video: ['video/mp4', 'video/webm', 'video/ogg', 'video/x-matroska', 'application/x-mpegURL', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv']
};

const MAX_SIZES = {
  image: parseInt(process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE || '5242880', 10),
  video: parseInt(process.env.NEXT_PUBLIC_MAX_VIDEO_SIZE || '104857600', 10)
};

export async function handleFileUpload(file: File, type: FileType) {

  if (!file) {
    return {
      success: false,
      error: 'No file provided',
      status: 400
    };
  }

  if (file.size > MAX_SIZES[type]) {
    return {
      success: false,
      error: `File size exceeds maximum limit (${Math.floor(MAX_SIZES[type] / 1024 / 1024)}MB)`,
      status: 400
    };
  }

  if (!ALLOWED_TYPES[type].includes(file.type)) {
    return {
      success: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_TYPES[type].map(t => t.split('/')[1].toUpperCase()).join(', ')}`,
      status: 400
    };
  }

  const uploadDir = path.join(process.cwd(), 'public', `${type}s`);
  try {
    await ensureDir(uploadDir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EACCES') {
      return {
        success: false,
        error: 'Permission denied creating upload directory',
        status: 403
      };
    }
    console.error(`Error creating ${type} upload directory:`, error);
    return {
      success: false,
      error: 'Failed to create upload directory',
      status: 500
    };
  }

  const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `${Date.now()}-${safeFileName}`;
  const filepath = path.join(uploadDir, filename);

  const publicPath = path.join(process.cwd(), 'public', `${type}s`);
  if (!filepath.startsWith(publicPath)) {
    console.error('Security Error: Attempted file path traversal', { filepath, publicPath });
    return {
      success: false,
      error: 'Security Error: Invalid file path',
      status: 400
    };
  }

  let fileHandle: number | null = null;
  try {
    fileHandle = fs.openSync(filepath, 'wx');
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filepath, buffer);
    return {
      success: true,
      url: `/${type}s/${filename}`,
      status: 200
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'EEXIST') {
      return {
        success: false,
        error: 'File already exists',
        status: 409
      };
    }
    if ((error as NodeJS.ErrnoException).code === 'EACCES') {
      return {
        success: false,
        error: 'Permission denied writing file',
        status: 403
      };
    }
    console.error(`Error saving ${type} file:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : `Failed to save ${type} file`,
      status: 500
    };
  } finally {
    if (fileHandle !== null) {
      fs.closeSync(fileHandle);
    }
  }
}
