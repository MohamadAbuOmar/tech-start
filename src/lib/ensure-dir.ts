import { access, mkdir } from 'fs/promises';

export async function ensureDir(dirPath: string) {
  try {
    await access(dirPath);
  } catch {
    try {
      await mkdir(dirPath, { recursive: true, mode: 0o755 });
    } catch (error) {
      console.error('Error creating directory:', error);
      throw new Error('Failed to create upload directory');
    }
  }
}
