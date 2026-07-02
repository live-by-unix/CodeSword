import React, { useEffect, useState } from "react";
import { Course, Lesson, UserProgress, User } from "@/entities/all";
import { Sparkles, BookOpen, Code, TrendingUp, Flame, Target, Trophy, Clock } from "lucide-react";
import LanguageCard from "../components/dashboard/LanguageCard";
import StatsOverview from "../components/dashboard/StatsOverview";
import DailyChallenge from "../components/dashboard/DailyChallenge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const langMeta = {
  python: { icon: "🐍", color: "text-blue-600", bg: "bg-blue-50", bar: "bg-blue-500" },
  java: { icon: "☕", color: "text-orange-600", bg: "bg-orange-50", bar: "bg-orange-500" },
  c: { icon: "⚡", color: "text-purple-600", bg: "bg-purple-50", bar: "bg-purple-500" },
  cpp: { icon: "⚙️", color: "text-indigo-600", bg: "bg-indigo-50", bar: "bg-indigo-500" },
  rust: { icon: "🦀", color: "text-rose-600", bg: "bg-rose-50", bar: "bg-rose-500" },
  webdev: { icon: "🌐", color: "text-teal-600", bg: "bg-teal-50", bar: "bg-teal-500" },
};

const languages = [
  { language: "python", title: "Python Programming", description: "Learn the most popular programming language for beginners. Perfect for data science, web development, and automation.", difficulty: "beginner", pageName: "PythonCourse" },
  { language: "java", title: "Java Development", description: "Master object-oriented programming with Java. Build robust applications and understand enterprise development.", difficulty: "intermediate", pageName: "JavaCourse" },
  { language: "c", title: "C Programming", description: "Understand the fundamentals of programming with C. Learn memory management and system-level programming.", difficulty: "intermediate", pageName: "CCourse" },
  { language: "cpp", title: "C++ Development", description: "Master modern C++ programming with OOP, templates, and the STL. Build high-performance applications and games.", difficulty: "intermediate", pageName: "CppCourse" },
  { language: "rust", title: "Rust Programming", description: "Learn safe, concurrent systems programming with Rust. Master ownership, borrowing, and lifetimes.", difficulty: "advanced", pageName: "RustCourse" },
  { language: "webdev", title: "Web Development", description: "Build modern web applications with HTML, CSS, JavaScript, and React. From frontend to full-stack.", difficulty: "beginner", pageName: "WebDevCourse" },
];

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [coursesData, lessonsData, userProgressData, userData] = await Promise.all([
        Course.list("order"),
        Lesson.list("order", 500),
        UserProgress.list(),
        User.me().catch(() => null),
      ]);
      setCourses(coursesData);
      setLessons(lessonsData);
      setUserProgress(userProgressData);
      setUser(userData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const getLessonCount = (language) => lessons.filter(l => l.language === language).length;

  const getCompletedCount = (language) =>
    userProgress.filter(p => p.completed && lessons.some(l => l.id === p.lesson_id && l.language === language)).length;

  const getLanguageProgress = (language) => {
    const total = getLessonCount(language);
    if (total === 0) return 0;
    return Math.round((getCompletedCount(language) / total) * 100);
  };

  const getLanguageStats = (language) => ({
    totalLessons: getLessonCount(language),
    completedLessons: getCompletedCount(language),
    estimatedHours: Math.ceil(getLessonCount(language) * 0.5),
  });

  const totalLessons = lessons.length;
  const totalCompleted = userProgress.filter(p => p.completed).length;
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Streak from localStorage
  const getStreak = () => {
    try {
      const data = localStorage.getItem("cs_streak");
      if (!data) return 0;
      return JSON.parse(data).count || 0;
    } catch {
      return 0;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-sm border border-blue-100">
            <Sparkles className="w-4 h-4" />
            Welcome back to CodeSword
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Forge Your Code Skills
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {totalCompleted > 0
              ? `You've completed ${totalCompleted} of ${totalLessons} lessons. Keep the momentum going!`
              : "Pick a language and start your journey. 600 lessons, games, and challenges await."}
          </p>
        </div>

        {/* Stats */}
        <StatsOverview
          totalHoursLearned={Math.floor(totalCompleted * 0.5)}
          lessonsCompleted={totalCompleted}
          currentStreak={getStreak()}
          totalProjects={Math.floor(totalCompleted / 20)}
        />

        {/* Daily Challenge + Overall Progress */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-1">
            <DailyChallenge />
          </div>
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Your Progress Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{totalCompleted}</div>
                    <div className="text-xs text-gray-500">Lessons Done</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{overallProgress}%</div>
                    <div className="text-xs text-gray-500">Overall</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">{getStreak()}</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                </div>
                {languages.map((lang) => {
                  const meta = langMeta[lang.language];
                  const stats = getLanguageStats(lang.language);
                  const pct = getLanguageProgress(lang.language);
                  return (
                    <div key={lang.language} className="flex items-center gap-3">
                      <span className="text-xl w-8">{meta.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">{lang.title}</span>
                          <span className={`font-semibold ${meta.color}`}>{stats.completedLessons}/{stats.totalLessons}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div className={`${meta.bar} h-2 rounded-full transition-all duration-500`} style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Language Cards */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Path</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {languages.map((lang) => {
              const stats = getLanguageStats(lang.language);
              const progress = getLanguageProgress(lang.language);
              return (
                <LanguageCard
                  key={lang.language}
                  language={lang.language}
                  title={lang.title}
                  description={lang.description}
                  progress={progress}
                  totalLessons={stats.totalLessons}
                  completedLessons={stats.completedLessons}
                  estimatedHours={stats.estimatedHours}
                  difficulty={lang.difficulty}
                  pageName={lang.pageName}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link to={createPageUrl("Practice")}>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover-lift cursor-pointer overflow-hidden rounded-2xl">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Code className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Practice Lab</h3>
                  <p className="text-blue-100 text-sm">Write code in 6 languages with instant feedback.</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to={createPageUrl("Games")}>
            <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-600 to-violet-500 text-white hover-lift cursor-pointer overflow-hidden rounded-2xl">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Coding Games</h3>
                  <p className="text-purple-100 text-sm">Play games, earn points, and level up your skills.</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}