import React, { useState } from "react";

function News() {
  // State untuk daftar pengumuman dan input pengumuman baru
  const [newsList, setNewsList] = useState([
    { id: 1, title: "New Feature Released", content: "Our platform now supports live chat!" },
    { id: 2, title: "Scheduled Maintenance", content: "The system will be down for maintenance on Dec 1, 2024." },
  ]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // Fungsi untuk menambahkan pengumuman baru
  const addNews = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("Both title and content are required.");
      return;
    }

    const newAnnouncement = {
      id: newsList.length + 1, // ID unik
      title: newTitle,
      content: newContent,
    };

    setNewsList([newAnnouncement, ...newsList]); // Tambahkan ke awal daftar
    setNewTitle("");
    setNewContent("");
  };

  // Fungsi untuk mereset input pengumuman
  const resetForm = () => {
    setNewTitle("");
    setNewContent("");
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-6 dark:bg-gray-900">
      {/* Bagian Daftar Pengumuman */}
      <div className="p-6 bg-white rounded shadow-md w-2/3 mr-6 dark:bg-gray-800">
        <h1 className="text-xl font-bold text-purple-600 mb-4">News Announcements</h1>

        {/* Tampilkan daftar pengumuman */}
        {newsList.length > 0 ? (
          <div className="space-y-4">
            {newsList.map((news) => (
              <div
                key={news.id}
                className="p-4 bg-purple-50 rounded shadow dark:bg-purple-900"
              >
                <h2 className="text-lg font-bold text-purple-800 dark:text-purple-300">
                  {news.title}
                </h2>
                <p className="text-sm text-purple-700 mt-2 dark:text-purple-400">
                  {news.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No announcements available.
          </p>
        )}
      </div>

      {/* Bagian Admin */}
      <div className="p-6 bg-purple-50 rounded shadow-md w-1/3 dark:bg-purple-900">
        <h2 className="text-lg font-bold text-purple-600 mb-4 dark:text-purple-300">
          Admin Only
        </h2>

        {/* Form untuk menambahkan pengumuman baru */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600 dark:text-purple-300">
            Title
          </label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="block w-full mt-1 p-2 border border-purple-300 rounded-md focus:ring focus:ring-purple-400 focus:outline-none dark:bg-purple-800 dark:border-purple-700 dark:text-purple-300"
            placeholder="Enter announcement title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-purple-600 dark:text-purple-300">
            Content
          </label>
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="block w-full mt-1 p-2 border border-purple-300 rounded-md focus:ring focus:ring-purple-400 focus:outline-none dark:bg-purple-800 dark:border-purple-700 dark:text-purple-300"
            placeholder="Enter announcement content"
            rows="4"
          ></textarea>
        </div>

        {/* Tombol Tambah dan Reset */}
        <button
          onClick={addNews}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Add Announcement
        </button>
        <button
          onClick={resetForm}
          className="w-full bg-gray-300 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default News;