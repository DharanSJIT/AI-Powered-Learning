import React, { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa'; // For loading spinner

const UdemyResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUdemyResources();
  }, []);

  const fetchUdemyResources = async () => {
    setLoading(true);
    // Example placeholder - Replace with an actual Udemy API request
    const fetchedResources = [
      { title: 'React for Beginners', url: 'https://www.udemy.com/course/react-for-beginners/' },
      { title: 'JavaScript Essentials', url: 'https://www.udemy.com/course/javascript-essentials/' },
    ];
    setResources(fetchedResources);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-lg mx-auto">
      <h3 className="font-semibold text-2xl text-slate-800 dark:text-white mb-6 text-center">Udemy Resources</h3>
      
      {loading ? (
        <div className="flex justify-center items-center space-x-2">
          <FaSpinner className="animate-spin text-indigo-600 dark:text-indigo-400 text-2xl" />
          <span className="text-indigo-600 dark:text-indigo-400">Loading...</span>
        </div>
      ) : (
        <div>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div
                key={index}
                className="mb-6 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 hover:bg-indigo-50 dark:hover:bg-indigo-800 rounded-lg transition-colors duration-200"
                >
                  <h4 className="font-semibold text-lg text-slate-800 dark:text-white mb-2">{resource.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Click to open course</p>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No resources found for Udemy.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UdemyResources;
