import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogs: defineTable({
    author: v.string(),
    category: v.string(),
    content: v.string(),
    created_at: v.string(),
    excerpt: v.string(),
    image_url: v.string(),
    slug: v.string(),
    tags: v.string(),
    title: v.string(),
    updated_at: v.string(),
    views: v.string(),
  }),
});