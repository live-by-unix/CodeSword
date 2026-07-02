import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { UserButton } from "@clerk/clerk-react";
import { Lesson, UserProgress } from "@/entities/all";
import {
  BookOpen,
  Code2,
  Trophy,
  Home,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
  { title: "Python Course", url: createPageUrl("PythonCourse"), icon: Code2 },
  { title: "Java Course", url: createPageUrl("JavaCourse"), icon: Code2 },
  { title: "C Programming", url: createPageUrl("CCourse"), icon: Code2 },
  { title: "C++ Course", url: createPageUrl("CppCourse"), icon: Code2 },
  { title: "Rust Course", url: createPageUrl("RustCourse"), icon: Code2 },
  { title: "Web Development", url: createPageUrl("WebDevCourse"), icon: Code2 },
  { title: "Practice Lab", url: createPageUrl("Practice"), icon: BookOpen },
  { title: "Coding Games", url: createPageUrl("Games"), icon: Trophy },
  { title: "Achievements", url: createPageUrl("Achievements"), icon: Trophy }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [progress, setProgress] = useState({ python: 0, java: 0, c: 0, cpp: 0, rust: 0, webdev: 0 });

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const [lessonsData, userProgressData] = await Promise.all([
        Lesson.list("order", 500),
        UserProgress.list(),
      ]);
      const result = {};
      ["python", "java", "c", "cpp", "rust", "webdev"].forEach((lang) => {
        const total = lessonsData.filter((l) => l.language === lang).length;
        const completed = userProgressData.filter(
          (p) => p.completed && lessonsData.some((l) => l.id === p.lesson_id && l.language === lang)
        ).length;
        result[lang] = total > 0 ? Math.round((completed / total) * 100) : 0;
      });
      setProgress(result);
    } catch (e) {
      // silent
    }
  };

  const langs = [
    { key: "python", emoji: "🐍", label: "Python", color: "text-blue-600", bg: "bg-blue-100", bar: "bg-blue-500" },
    { key: "java", emoji: "☕", label: "Java", color: "text-orange-600", bg: "bg-orange-100", bar: "bg-orange-500" },
    { key: "c", emoji: "⚡", label: "C", color: "text-purple-600", bg: "bg-purple-100", bar: "bg-purple-500" },
    { key: "cpp", emoji: "⚙️", label: "C++", color: "text-indigo-600", bg: "bg-indigo-100", bar: "bg-indigo-500" },
    { key: "rust", emoji: "🦀", label: "Rust", color: "text-rose-600", bg: "bg-rose-100", bar: "bg-rose-500" },
    { key: "webdev", emoji: "🌐", label: "Web Dev", color: "text-teal-600", bg: "bg-teal-100", bar: "bg-teal-500" },
  ];

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: #1a1f36;
          --primary-light: #2a3154;
          --accent-python: #3b82f6;
          --accent-java: #f97316;
          --accent-c: #8b5cf6;
          --success: #10b981;
          --background: #f8fafc;
          --surface: #ffffff;
          --text: #1f2937;
          --text-muted: #6b7280;
        }

        body {
          background: var(--background);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .gradient-text {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gradient-bg-main {
          background: linear-gradient(180deg, #f0f4f9 0%, #e6e9ee 100%);
        }

        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r border-gray-100 bg-white/70 backdrop-blur-xl">
          <SidebarHeader className="border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900">CodeSword</h2>
                <p className="text-xs text-gray-500 font-medium">Forge • Practice • Master</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 rounded-xl group ${
                          location.pathname === item.url ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white' : 'text-gray-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                          <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-8 mx-3">
              <div className="glass-effect rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-800">Progress</span>
                </div>
                <div className="space-y-3 text-sm">
                  {langs.map((lang) => (
                    <div key={lang.key}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600 font-medium">{lang.emoji} {lang.label}</span>
                        <span className={`font-bold ${lang.color}`}>{progress[lang.key]}%</span>
                      </div>
                      <div className={`w-full ${lang.bg} rounded-full h-1.5`}>
                        <div className={`${lang.bar} h-1.5 rounded-full transition-all duration-500`} style={{ width: `${progress[lang.key]}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <UserButton />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">Learner</p>
                <p className="text-xs text-gray-500 truncate">Keep coding!</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col gradient-bg-main">
          <header className="bg-white/70 backdrop-blur-xl border-b border-gray-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-xl transition-colors duration-200" />
              <h1 className="text-xl font-bold text-gray-900">CodeSword</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}