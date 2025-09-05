"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useTheme } from "next-themes";

export default function AdminDashboard() {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    id: null,
    title: "",
    content: "",
    author: "",
    image_url: "",
    tags: "",
  });
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  useEffect(() => {
    fetchBlogs();
  }, []);

  function showNotification(message, type = "success") {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "" }), 3000);
  }

  async function fetchBlogs() {
    setLoading(true);
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    setBlogs(data || []);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editing) {
        await supabase.from("blogs").update({
          title: form.title,
          content: form.content,
          author: form.author,
          image_url: form.image_url,
          tags: form.tags,
        }).eq("id", form.id);
        showNotification("Post updated successfully!");
      } else {
        await supabase.from("blogs").insert({
          title: form.title,
          content: form.content,
          author: form.author,
          image_url: form.image_url,
          tags: form.tags,
        });
        showNotification("Post created successfully!");
      }
      setForm({ id: null, title: "", content: "", author: "", image_url: "", tags: "" });
      setEditing(false);
      fetchBlogs();
    } catch (error) {
      showNotification("Error saving post: " + error.message, "error");
    }
  }

  function handleEdit(blog) {
    setForm({ ...blog });
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    if (confirm("Are you sure you want to delete this post?")) {
      await supabase.from("blogs").delete().eq("id", id);
      showNotification("Post deleted successfully!");
      fetchBlogs();
    }
  }


  return (
    <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-900 dark:text-gray-100">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 px-5 py-3 rounded-md font-medium z-50 shadow-lg animate-slideIn transition-colors
          ${notification.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}
        `}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center mt-10 pt-5 border-t border-gray-200 dark:border-gray-700 gap-4">
        <h1 className="text-3xl font-bold text-primary dark:text-primary-light mb-0">Admin Dashboard</h1>
        <div className="flex gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md font-medium transition" onClick={() => setActiveTab("create")}> 
            {editing ? "Editing Post" : "Create New Post"}
          </button>
          <button className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-5 py-2 rounded-md font-medium transition hover:bg-gray-200 dark:hover:bg-gray-700" onClick={fetchBlogs}>
            Refresh
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 mt-8">
        <button 
          className={`px-6 py-3 font-medium transition border-b-2 -mb-px focus:outline-none
            ${activeTab === "posts" ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600"}`}
          onClick={() => setActiveTab("posts")}
        >
          All Posts ({blogs.length})
        </button>
        <button 
          className={`px-6 py-3 font-medium transition border-b-2 -mb-px focus:outline-none
            ${activeTab === "create" ? "border-indigo-600 text-indigo-600 dark:text-indigo-400" : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-600"}`}
          onClick={() => setActiveTab("create")}
        >
          {editing ? "Edit Post" : "Create Post"}
        </button>
      </div>

      {/* Create/Edit Form */}
      {activeTab === "create" && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{editing ? "Edit Post" : "Create New Post"}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="font-medium text-gray-700 dark:text-gray-200">Title</label>
              <input
                id="title"
                name="title"
                placeholder="Enter post title"
                value={form.title}
                onChange={handleChange}
                required
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="content" className="font-medium text-gray-700 dark:text-gray-200">Content</label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your content here..."
                value={form.content}
                onChange={handleChange}
                required
                rows={6}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="author" className="font-medium text-gray-700 dark:text-gray-200">Author</label>
                <input
                  id="author"
                  name="author"
                  placeholder="Author name"
                  value={form.author}
                  onChange={handleChange}
                  required
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="image_url" className="font-medium text-gray-700 dark:text-gray-200">Image URL</label>
                <input
                  id="image_url"
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={form.image_url}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tags" className="font-medium text-gray-700 dark:text-gray-200">Tags (comma separated)</label>
              <input
                id="tags"
                name="tags"
                placeholder="technology, design, business"
                value={form.tags}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition">
                {editing ? "Update Post" : "Publish Post"}
              </button>
              {editing && (
                <button 
                  type="button" 
                  className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-2 rounded-md font-medium transition hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => { 
                    setForm({ id: null, title: "", content: "", author: "", image_url: "", tags: "" }); 
                    setEditing(false); 
                  }}
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Posts List */}
      {activeTab === "posts" && (
        <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-0">All Posts</h2>
            <div className="w-full md:w-auto">
              <input type="text" placeholder="Search posts..." className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center py-10 text-gray-500 dark:text-gray-400">
              <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-4"></div>
              <p>Loading posts...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">No posts yet</h3>
              <p className="mb-4">Create your first post to get started</p>
              <button 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium transition"
                onClick={() => setActiveTab("create")}
              >
                Create New Post
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div key={blog.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform hover:-translate-y-1 bg-white dark:bg-gray-800 flex flex-col">
                  {blog.image_url && (
                    <div className="h-40 overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1 flex flex-col p-4">
                    <h3 className="text-lg font-bold text-primary dark:text-primary-light mb-2">{blog.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                      {blog.content.length > 100 
                        ? `${blog.content.substring(0, 100)}...` 
                        : blog.content
                      }
                    </p>
                    <div className="flex flex-col gap-1 text-sm mb-4">
                      <span className="text-gray-700 dark:text-gray-200 font-medium">By {blog.author}</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {Array.isArray(blog.tags) 
                          ? blog.tags.join(", ") 
                          : (blog.tags || "No tags")
                        }
                      </span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <button 
                        onClick={() => handleEdit(blog)}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm font-medium transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}