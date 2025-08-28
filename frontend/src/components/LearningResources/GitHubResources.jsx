import React, { useState, useEffect } from 'react';

const GitHubResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGitHubResources();
  }, []);

  const fetchGitHubResources = async () => {
    setLoading(true);
    // Example placeholder - Replace this with actual GitHub search API or any other resource API
    const fetchedResources = [
      { title: 'React Repository', url: 'https://github.com/facebook/react' },
      { title: 'JavaScript Algorithms', url: 'https://github.com/trekhleb/javascript-algorithms' },
    ];
    setResources(fetchedResources);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-4xl mx-auto">
      <h3 className="font-semibold text-2xl text-slate-800 dark:text-white mb-6">GitHub Resources</h3>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-indigo-600 border-solid rounded-full"></div>
        </div>
      ) : (
        <div>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div
                key={index}
                className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                >
                  <h4 className="font-semibold text-lg text-slate-800 dark:text-white">{resource.title}</h4>
                </a>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Click to explore this resource on GitHub.
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No resources found for GitHub.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GitHubResources;
