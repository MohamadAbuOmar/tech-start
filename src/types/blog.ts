export interface LocalizedPost {
  id: number;
  slug: string;
  type: string;
  title: string;
  description: string | null;
  content: string;
  imageUrl: string | null;
  readTime: string | null;
  published: boolean;
  featured: boolean;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
  tags: LocalizedTag[];
}

export interface LocalizedTag {
  id: number;
  slug: string;
  name: string;
}
