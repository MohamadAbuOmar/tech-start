export interface LocalizedImage {
  id: string;
  url: string;
  title: string | null;
  featured: boolean;
}

export interface LocalizedGallery {
  id: string;
  title: string;
  images: LocalizedImage[];
}

export interface LocalizedVideo {
  id: string;
  url: string;
  title: string;
  description: string | null;
  type: string;
}

export interface LocalizedVideoGallery {
  id: string;
  title: string;
  videos: LocalizedVideo[];
}
