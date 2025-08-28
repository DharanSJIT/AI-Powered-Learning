import React, { useState, useEffect } from "react";

const MediumResources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMediumResources();
  }, []);

  const fetchMediumResources = async () => {
    setLoading(true);

    // Example placeholder - Replace with Medium API / scraper later
    const fetchedResources = [
      {
        title: "The Road to Learn React",
        url: "https://medium.com/the-road-to-learn-react",
        description: "A beginner-friendly guide to mastering React step by step.",
        author: "Robin Wieruch",
        image: "https://source.unsplash.com/800x400/?react,code", // ✅ Working Unsplash placeholder
        tags: ["React", "Frontend", "Web Dev"],
      },
      {
        title: "JavaScript Algorithms",
        url: "https://medium.com/javascript-algorithms",
        description: "Deep dive into algorithms using JavaScript for coding interviews.",
        author: "Oleksii Trekhleb",
        image: "https://source.unsplash.com/800x400/?javascript,programming", // ✅ Working Unsplash placeholder
        tags: ["JavaScript", "DSA", "Coding"],
      },
    ];

    setResources(fetchedResources);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-7xl mx-auto">
      <h3 className="font-bold text-3xl text-slate-800 dark:text-white mb-8 text-center">
        Medium Resources
      </h3>

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-10 w-10 border-t-2 border-indigo-600 border-solid rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
              >
                {/* Thumbnail */}
                <img
                  src={resource.image}
                  alt={resource.title}
                  className="h-40 w-full object-cover"
                />

                {/* Card Content */}
                <div className="p-5">
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 className="font-semibold text-lg text-slate-800 dark:text-white mb-2 hover:text-indigo-600 dark:hover:text-indigo-300">
                      {resource.title}
                    </h4>
                  </a>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 line-clamp-2">
                    {resource.description}
                  </p>

                  {/* Author */}
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3">
                    ✍️ {resource.author}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 dark:text-gray-400">
              No resources found for Medium.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MediumResources;
