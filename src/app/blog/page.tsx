"use client";
import React from "react";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useQuery } from "../lib/convexClient";
import { api } from "../../../convex/_generated/api";
import type { Blog } from "@/types/blog";
import type { FunctionReference } from "convex/server";

const Blog = () => {
  // const blogs = useQuery(api.blogs.list) || [];
  const blogs = useQuery(api.blogs.list.default as FunctionReference<"query">) || [];
  return (
    <>
      <Breadcrumb
        pageName="Blog Lists"
        description="Explore our collection of insightful articles and updates on the latest trends in technology, startups, and SaaS solutions."
      />

      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            {blogs.length === 0 ? (
              <p>No blogs found.</p>
            ) : (
              blogs.map((blog: Blog) => (
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
