"use client";

import { LocalizedPost } from "@/types/blog";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ClientBlogProps {
  posts: LocalizedPost[];
}

export default function ClientBlog({ posts }: ClientBlogProps) {
  const { isRTL } = useLanguage();

  return (
    <AnimatePresence mode="wait">
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
        {posts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <Link href={`/blog/${post.slug}`} className="group">
              {post.imageUrl && (
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {post.readTime && <span>{post.readTime}</span>}
                  <time dateTime={post.createdAt.toISOString()}>
                    {new Date(post.createdAt).toLocaleDateString(isRTL ? 'ar' : 'en', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </AnimatePresence>
  );
}
