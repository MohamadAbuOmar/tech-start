import { unlink, access } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export type FileType = 'image' | 'video';

export async function handleFileDelete(url: string, type: FileType) {
  try {
    // For YouTube videos, just return success
    if (type === 'video' && (url.includes('youtube.com') || url.includes('youtu.be'))) {
      return { success: true, status: 200 };
    }

    const publicPath = path.join(process.cwd(), 'public');
    const relativePath = url.startsWith('/') ? url.slice(1) : url;
    const filePath = path.join(publicPath, relativePath);

    // Validate file path is within allowed directory
    const allowedDir = path.join(process.cwd(), 'public', `${type}s`);
    if (!filePath.startsWith(allowedDir)) {
      console.error('Security Error: Invalid file path:', filePath);
      return { 
        success: false, 
        error: 'Security Error: Invalid file path',
        status: 400 
      };
    }

    // Create a file descriptor to lock the file
    let fileHandle: number | null = null;
    try {
      fileHandle = fs.openSync(filePath, 'r+');
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return { success: true, status: 200 }; // File doesn't exist
      }
      if ((error as NodeJS.ErrnoException).code === 'EACCES') {
        return {
          success: false,
          error: 'Permission denied',
          status: 403
        };
      }
      throw error;
    }

    try {
      await unlink(filePath);
      console.log(`Successfully deleted ${type}:`, filePath);
      return { success: true, status: 200 };
    } finally {
      if (fileHandle !== null) {
        fs.closeSync(fileHandle);
      }
    }
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : `Failed to delete ${type} file`;
    console.error(`Error deleting ${type}:`, error);
    
    if ((error as NodeJS.ErrnoException).code === 'EBUSY') {
      return {
        success: false,
        error: 'File is in use by another process',
        status: 409
      };
    }

    return { 
      success: false, 
      error: errMsg,
      status: 500 
    };
  }
}
