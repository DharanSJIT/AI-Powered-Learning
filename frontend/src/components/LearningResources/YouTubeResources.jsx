import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

const YouTubeResources = ({ query }) => {
  const [resources, setResources] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = "AIzaSyAovya0mCbqrbASE68dn7oOSRxIb9ApTy0"; // Use .env for storing API key
  const maxResults = 5;

  // Debounced search function
  const debouncedSearch = debounce((query) => {
    setSearchQuery(query);
  }, 500);

  // Fetch resources based on search query
  useEffect(() => {
    if (searchQuery) {
      fetchYouTubeResources(searchQuery);
    }
  }, [searchQuery]);

  const fetchYouTubeResources = async (searchQuery) => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: maxResults,
          q: searchQuery,
          type: 'video',
          key: apiKey,
        },
      });
      setResources(response.data.items);
    } catch (error) {
      setError('Failed to fetch data. Please try again later.');
      console.error("Error fetching YouTube data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h3 className="font-semibold text-2xl text-slate-800 dark:text-white mb-6 text-center">YouTube Resources</h3>
      
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search YouTube Courses..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="w-full p-4 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white transition-all duration-300 ease-in-out"
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center mb-6">
          <div className="w-10 h-10 border-4 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div>
          {resources.length > 0 ? (
            resources.map((resource) => (
              <div
                key={resource.id.videoId}
                className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${resource.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 hover:bg-indigo-50 dark:hover:bg-indigo-800 rounded-lg transition-colors duration-200"
                >
                  {/* Thumbnail */}
                  <img 
                    src={resource.snippet.thumbnails.medium.url} 
                    alt={resource.snippet.title} 
                    className="w-24 h-24 rounded-lg transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="flex flex-col justify-center">
                    <h4 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">
                      {resource.snippet.title}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-gray-400">
                      {resource.snippet.description.length > 100
                        ? `${resource.snippet.description.substring(0, 100)}...`
                        : resource.snippet.description}
                    </p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 dark:text-gray-400">No resources found for this query.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTubeResources;
