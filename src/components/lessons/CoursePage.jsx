import React, { useEffect, useState } from "react";
import { Course, Lesson, UserProgress, User } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Clock, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ReactMarkdown from "react-markdown";
import CodeEditor from "@/components/lessons/CodeEditor";

export const courseThemes = {
  python: { icon: "🐍", title: "Python Programming", hoverBg: "hover:bg-blue-50", activeBorder: "border-blue-500", activeBg: "bg-blue-100", progressColor: "[&>div]:bg-blue-500", progressText: "text-blue-600", buttonGradient: "from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600" },
  java: { icon: "☕", title: "Java Development", hoverBg: "hover:bg-orange-50", activeBorder: "border-orange-500", activeBg: "bg-orange-100", progressColor: "[&>div]:bg-orange-500", progressText: "text-orange-600", buttonGradient: "from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600" },
  c: { icon: "⚡", title: "C Programming", hoverBg: "hover:bg-purple-50", activeBorder: "border-purple-500", activeBg: "bg-purple-100", progressColor: "[&>div]:bg-purple-500", progressText: "text-purple-600", buttonGradient: "from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600" },
  cpp: { icon: "⚙️", title: "C++ Development", hoverBg: "hover:bg-indigo-50", activeBorder: "border-indigo-500", activeBg: "bg-indigo-100", progressColor: "[&>div]:bg-indigo-500", progressText: "text-indigo-600", buttonGradient: "from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600" },
  rust: { icon: "🦀", title: "Rust Programming", hoverBg: "hover:bg-rose-50", activeBorder: "border-rose-500", activeBg: "bg-rose-100", progressColor: "[&>div]:bg-rose-500", progressText: "text-rose-600", buttonGradient: "from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600" },
  webdev: { icon: "🌐", title: "Web Development", hoverBg: "hover:bg-teal-50", activeBorder: "border-teal-500", activeBg: "bg-teal-100", progressColor: "[&>div]:bg-teal-500", progressText: "text-teal-600", buttonGradient: "from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600" },
};

export default function CoursePage({ language }) {
  const theme = courseThemes[language];
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userProgress, setUserProgress] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadData();
  }, [language]);

  const loadData = async () => {
    try {
      const [coursesData, lessonsData, progressData, userData] = await Promise.all([
        Course.filter({ language }, "order"),
        Lesson.filter({ language }, "order"),
        UserProgress.list(),
        User.me().catch(() => null)
      ]);

      setCourses(coursesData);
      setLessons(lessonsData);
      setUserProgress(progressData);
      setUser(userData);

      if (lessonsData.length > 0) {
        setSelectedLesson(lessonsData[0]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!user) return;

    try {
      await UserProgress.create({
        user_email: user.email,
        course_slug: selectedLesson?.course_slug,
        lesson_id: lessonId,
        completed: true,
        completion_date: new Date().toISOString()
      });

      loadData();
    } catch (error) {
      console.error("Error marking lesson complete:", error);
    }
  };

  const isLessonCompleted = (lessonId) => {
    return userProgress.some(p => p.lesson_id === lessonId && p.completed);
  };

  const getProgressPercentage = () => {
    if (lessons.length === 0) return 0;
    const completed = userProgress.filter(p => p.completed &&
      lessons.some(l => l.id === p.lesson_id)).length;
    return Math.round((completed / lessons.length) * 100);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon" className="hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{theme.icon}</span>
              <h1 className="text-3xl font-bold text-gray-900">{theme.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Progress value={getProgressPercentage()} className={`flex-1 max-w-xs h-2 ${theme.progressColor}`} />
              <span className={`text-sm font-medium ${theme.progressText}`}>
                {getProgressPercentage()}% Complete
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Lessons
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {lessons.map((lesson, index) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full text-left p-4 ${theme.hoverBg} transition-colors border-l-4 rounded-r-lg ${
                        selectedLesson?.id === lesson.id
                          ? `${theme.activeBorder} ${theme.activeBg}`
                          : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                          isLessonCompleted(lesson.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                          {isLessonCompleted(lesson.id) ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {lesson.title}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            ~30 min
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {selectedLesson ? (
              <>
                {/* Lesson Content */}
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-gray-900">
                      {selectedLesson.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-gray max-w-none">
                    <ReactMarkdown>{selectedLesson.content}</ReactMarkdown>
                  </CardContent>
                </Card>

                {/* Code Editor */}
                {selectedLesson.code_example && (
                  <CodeEditor
                    initialCode={selectedLesson.code_example}
                    language={language}
                    expectedOutput={selectedLesson.expected_output}
                  />
                )}

                {/* Lesson Actions */}
                <div className="flex justify-between items-center">
                  <Button variant="outline" className="hover:bg-gray-100">
                    Previous Lesson
                  </Button>
                  <Button
                    onClick={() => markLessonComplete(selectedLesson.id)}
                    disabled={isLessonCompleted(selectedLesson.id)}
                    className={`bg-gradient-to-r ${theme.buttonGradient} text-white font-semibold px-6 py-3 rounded-xl shadow-lg`}
                  >
                    {isLessonCompleted(selectedLesson.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Mark Complete
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Lessons Available
                  </h3>
                  <p className="text-gray-600">
                    {theme.title} lessons will be added soon. Check back later!
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}