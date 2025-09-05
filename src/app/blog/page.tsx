
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { supabase } from "../lib/supabaseClient";
import type { Blog } from "@/types/blog";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Page | Free Next.js Template for Startup and SaaS",
  description: "This is Blog Page for Startup Nextjs Template",
  // other metadata
};

const fetchBlogs = async (): Promise<Blog[]> => {
  // Fetch blogs from Supabase
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, content, author, image_url, tags, created_at, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blogs:", error.message);
    return [];
  }

  console.log("Fetched blogs from Supabase:", data);

  // Map Supabase data to Blog type
  return (
    data?.map((item: any) => ({
      id: item.id,
      title: item.title,
      paragraph: item.content, // Map content to paragraph
      image: item.image_url || "/images/blog/blog-01.jpg", // fallback image
      author: {
        name: item.author || "Unknown",
        image: "/images/blog/author-02.png", // fallback author image
        designation: "Author", // fallback designation
      },
      tags: item.tags || [],
      publishDate: item.created_at ? new Date(item.created_at).getFullYear().toString() : "",
    })) || []
  );
};

const Blog = async () => {
  const blogs = await fetchBlogs();
  return (
    <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogs.length === 0 ? (
              <p>No blogs found.</p>
            ) : (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <SingleBlog blog={blog} />
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default Blog;
