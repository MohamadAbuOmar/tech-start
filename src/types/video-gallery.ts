export interface Video {
  id: string;
  url: string;
  title_en: string;
  title_ar: string;
  description_en?: string | null;
  description_ar?: string | null;
  createdAt: Date;
  galleryId: string;
}

export interface VideoGallery {
  id: string;
  title_en: string;
  title_ar: string;
  createdAt: Date;
  updatedAt: Date;
  videos: Video[];
}

export interface FormattedVideoGallery extends Omit<VideoGallery, 'createdAt'> {
  createdAt: string;
}

export interface VideoUpload {
  url: string;
  title_en: string;
  title_ar: string;
  description_en: string | null;
  description_ar: string | null;
  type: 'youtube' | 'local';  // Add this line
}

export interface VideoFormData {
  title_en: string;
  title_ar: string;
  date: string;
  videos: VideoUpload[];
}
