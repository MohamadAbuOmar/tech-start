import { getBlogPosts } from "@/app/actions/pages/blog";
import ClientBlog from "./ClientBlog";
import { Suspense } from "react";

interface ServerBlogProps {
  language: 'en' | 'ar';
}

export async function ServerBlog({ language }: ServerBlogProps) {
  const postsResponse = await getBlogPosts(language);

  if (!postsResponse.success || !postsResponse.data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          {language === 'ar' ? 'لا توجد مقالات متاحة.' : 'No posts available.'}
        </p>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-muted rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <ClientBlog posts={postsResponse.data} />
        </Suspense>
      </div>
    </section>
  );
}
