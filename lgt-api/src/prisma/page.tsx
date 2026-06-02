'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Sermon {
  id: string;
  title: string;
  preacher: string;
  audioUrl?: string;
  videoUrl?: string;
  transcript?: string;
  summary?: string;
  date: string;
  tags: string[];
}

export default function SermonArchive() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSermons = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const url = query
        ? `${process.env.NEXT_PUBLIC_API_BASE}/sermons/search?q=${encodeURIComponent(query)}`
        : `${process.env.NEXT_PUBLIC_API_BASE}/sermons`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setSermons(data);
    } catch (err: any) {
      console.error('Failed to fetch sermons:', err);
      setError(err.message || 'Failed to load sermons.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSermons();
  }, [fetchSermons]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSermons(searchQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Sermon Archive</h1>
        <p className="text-gray-600">Access spiritual nourishment through our collection of recorded messages.</p>
      </header>

      <form onSubmit={handleSearchSubmit} className="mb-10 flex gap-4 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search sermons by title, preacher, or theme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center text-gray-500">Loading sermons...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && sermons.length === 0 && !error && (
        <p className="text-center text-gray-500">No sermons found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sermons.map((sermon) => (
          <div key={sermon.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded uppercase tracking-wider">
                  Sermon
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(sermon.date).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{sermon.title}</h2>
              <p className="text-gray-600 mb-4 italic">by {sermon.preacher}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {sermon.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                {sermon.audioUrl && (
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                    <PlayIcon /> Listen
                  </button>
                )}
                {/* Add more actions like 'Read Transcript', 'View Summary' */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple Icon Components (You might want to use a dedicated icon library like Heroicons)
const PlayIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
);