'use client'
import { supabase } from "@/app/lib/supabaseClient";
import type { Blog as BlogType } from "@/types/blog";
import { useEffect, useState } from "react";
import  SectionTitle  from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, content, author, image_url, tags, created_at, updated_at");
      if (error) {
        console.error("Error fetching blogs:", error.message);
        setBlogs([]);
      } else {
        setBlogs(
          data.map((item: any) => ({
            id: item.id,
            title: item.title,
            paragraph: item.content,
            image: item.image_url || "/images/blog/blog-01.jpg",
            author: {
              name: item.author || "Unknown",
              image: "/images/blog/author-01.png",
              designation: "Author",
            },
            tags: Array.isArray(item.tags) ? item.tags : (typeof item.tags === "string" ? [item.tags] : []),
            publishDate: item.created_at ? new Date(item.created_at).getFullYear().toString() : "",
          }))
        );
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {loading ? (
            <div>Loading...</div>
          ) : blogs.length === 0 ? (
            <div>No blogs found.</div>
          ) : (
            blogs.map((blog) => (
              <div key={blog.id} className="w-full">
                <SingleBlog blog={blog} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
