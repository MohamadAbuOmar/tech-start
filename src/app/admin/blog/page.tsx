import db from "@/app/db/db";
import DisplayBlogs from "@/components/admin/Blog/DisplayBlogs";
import { Suspense } from "react";
async function fetchBlogs() {
  const blogs = await db.post.findMany({
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return blogs;
}

export default async function Blogs() {
  const blogs = await fetchBlogs();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayBlogs initialBlogs={blogs} />
      </Suspense>
    </div>
  );
}
