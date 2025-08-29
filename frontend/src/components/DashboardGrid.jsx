import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  HelpCircle, 
  StickyNote, 
  FileText, 
  TrendingUp, 
  Users, 
  Bookmark, 
  CheckSquare, 
  Settings,
  Star,
  ChevronRight,
  Zap,
  Brain,
  Target
} from "lucide-react";

export default function DashboardGrid({ user }) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const tools = [
    {
      id: 1,
      label: "Learning Path",
      route: "/learning-path",
      gradient: "from-sky-400 to-cyan-500",
      icon: BookOpen,
      description: "Personalized learning journey",
      badge: "AI-Powered",
      featured: true
    },
    {
      id: 2,
      label: "Quiz Generator",
      route: "/quiz-generator",
      gradient: "from-orange-400 to-red-500",
      icon: HelpCircle,
      description: "Test your knowledge",
      badge: "Interactive"
    },
    {
      id: 3,
      label: "Learning Resources",
      route: "/notes",
      gradient: "from-teal-400 to-emerald-500",
      icon: StickyNote,
      description: "Organize your study materials",
      badge: "Essential"
    },
    {
      id: 4,
      label: "Summarization",
      route: "/summarization",
      gradient: "from-yellow-400 to-orange-500",
      icon: FileText,
      description: "AI-powered text summarization",
      badge: "Smart",
      featured: true
    },
   
      {
  id: 5,
  label: "Image Analysis",
  route: "/image-analysis",
  gradient: "from-red-400 to-pink-600",
  icon: Settings,
  description: "Customize your experience",
  badge: "Personalize"
},
 {
      id: 6,
      label: "Progress Tracker",
      route: "/progress-tracker",
      gradient: "from-purple-500 to-violet-600",
      icon: TrendingUp,
      description: "Monitor your learning progress",
      badge: "Analytics"
    },
    {
      id: 7,
      label: "Bookmarks",
      route: "/bookmarks",
      gradient: "from-rose-400 to-pink-500",
      icon: Bookmark,
      description: "Save important resources",
      badge: "Quick Access"
    },
     {
      id: 8,
      label: "To-Do List",
      route: "/todo-list",
      gradient: "from-indigo-500 to-purple-600",
      icon: CheckSquare,
      description: "Manage your tasks efficiently",
      badge: "Productivity"
    },
  
    {
      id: 9,
      label: "AI Mentor",
      route: "/mentor",
      gradient: "from-green-400 to-emerald-600",
      icon: Users,
      description: "Get personalized guidance",
      badge: "24/7 Support",
      featured: true
    },
    
   

    {
      id: 10,
      label: "Settings",
      route: "/settings",
      gradient: "from-gray-600 to-gray-800",
      icon: Settings,
      description: "Customize your experience",
      badge: "Personalize"
    },
    {
      id: 10,
      label: "DocumentAnalyzer",
      route: "/document-analyzer",
      gradient: "from-gray-600 to-gray-800",
      icon: Settings,
      description: "Customize your experience",
      badge: "Personalize"
    },
  ];

  const featuredTools = tools.filter(tool => tool.featured);
  const regularTools = tools.filter(tool => !tool.featured);

  const stats = [
    { label: "Tools Available", value: "10", icon: Zap },
    { label: "AI Features", value: "5", icon: Brain },
    { label: "Your Progress", value: "75%", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Welcome Section */}
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {getGreeting()}, {user?.displayName || "Learner"}! 👋
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  Ready to continue your learning journey? Explore our AI-powered tools designed to enhance your education.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Today is {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-4">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Tools Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Featured Tools</h2>
              <div className="h-px bg-gradient-to-r from-yellow-400 to-orange-500 flex-1 ml-4"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {featuredTools.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(tool.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <button
                    onClick={() => navigate(tool.route)}
                    className={`
                      w-full h-48 rounded-3xl shadow-xl hover:shadow-2xl
                      bg-gradient-to-br ${tool.gradient}
                      transform transition-all duration-500 hover:scale-105 hover:-translate-y-2
                      relative overflow-hidden group
                    `}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                    {/* Content */}
                    <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <tool.icon className="w-8 h-8 mb-2" />
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                          {tool.badge}
                        </span>
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-xl font-bold mb-2">{tool.label}</h3>
                        <p className="text-sm opacity-90 mb-3">{tool.description}</p>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <span>Explore</span>
                          <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                            hoveredCard === tool.id ? 'translate-x-1' : ''
                          }`} />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* All Tools Grid */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Learning Tools</h2>
              <div className="h-px bg-gradient-to-r from-blue-400 to-purple-500 flex-1 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(tool.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <button
                    onClick={() => navigate(tool.route)}
                    className={`
                      w-full h-36 rounded-2xl shadow-lg hover:shadow-xl
                      bg-gradient-to-br ${tool.gradient}
                      transform transition-all duration-300 hover:scale-105 hover:-translate-y-1
                      relative overflow-hidden group
                    `}
                  >
                    {/* Glass morphism effect */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content */}
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between text-white">
                      <div className="flex justify-between items-start">
                        <tool.icon className="w-7 h-7" />
                        {tool.featured && (
                          <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        )}
                      </div>
                      
                      <div className="text-left">
                        <h3 className="text-lg font-bold mb-1">{tool.label}</h3>
                        <p className="text-xs opacity-80 mb-2 line-clamp-2">{tool.description}</p>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          {tool.badge}
                        </span>
                      </div>
                    </div>

                    {/* Animated arrow */}
                    <div className={`
                      absolute bottom-4 right-4 transform transition-all duration-300
                      ${hoveredCard === tool.id ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}
                    `}>
                      <ChevronRight className="w-5 h-5 text-white" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Ready to supercharge your learning?</h3>
                <p className="text-blue-100 mb-6">Explore our AI-powered tools and take your education to the next level!</p>
                <button 
                  onClick={() => navigate('/learning-path')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Learning Journey →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}