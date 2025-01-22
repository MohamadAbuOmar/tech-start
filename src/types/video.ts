export interface VideoUpload {
  url: string;
  title: string;
  description: string | null;
}

export interface VideoFormData {
  title: string;
  date: string;
  videos: VideoUpload[];
}

export type CreateVideoGalleryResponse = {
  success: boolean;
  error?: string;
  videoGallery?: VideoGallery;
  data?: VideoGallery;
};

export interface VideoGallery {
  id: string;
  title: string;
  createdAt: Date;
  videos: VideoUpload[];
}
