import React, { useState } from "react";
import { SignIn } from "@clerk/clerk-react";
import { Code2, Zap, Trophy, BookOpen, Gamepad2, ChevronRight, Sparkles, Check } from "lucide-react";

const courses = [
  { icon: "🐍", name: "Python", color: "from-blue-500 to-cyan-400", desc: "Beginner-friendly & versatile" },
  { icon: "☕", name: "Java", color: "from-orange-500 to-amber-400", desc: "Enterprise & OOP mastery" },
  { icon: "⚡", name: "C", color: "from-purple-500 to-violet-400", desc: "Systems & memory" },
  { icon: "⚙️", name: "C++", color: "from-indigo-500 to-blue-400", desc: "Performance & STL" },
  { icon: "🦀", name: "Rust", color: "from-rose-500 to-orange-400", desc: "Safe systems programming" },
  { icon: "🌐", name: "Web Dev", color: "from-teal-500 to-cyan-400", desc: "Full-stack & React" },
];

const features = [
  { icon: BookOpen, title: "600+ Lessons", desc: "100 lessons per language across Python, Java, C, C++, Rust & Web Dev", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Gamepad2, title: "Interactive Games", desc: "Learn by playing — syntax matching, bug hunts, and code challenges", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: Zap, title: "Daily Challenges", desc: "Fresh coding challenges every day to keep your skills sharp", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Trophy, title: "Achievements", desc: "Unlock 26+ achievements and track your progress as you level up", color: "text-yellow-600", bg: "bg-yellow-50" },
];

export default function Landing() {
  const [showSignIn, setShowSignIn] = useState(false);

  if (showSignIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <button
          onClick={() => setShowSignIn(false)}
          className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
        >
          ← Back to home
        </button>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">CodeSword</h1>
        </div>
        <div className="w-full max-w-md">
          <SignIn />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">CodeSword</span>
          </div>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-transparent"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-gray-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Forge Your Coding Skills
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Master <span className="bg-gradient-to-r from-blue-600 to-purple-600 gradient-text">6 Programming</span>
            <br />Languages the Fun Way
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn Python, Java, C, C++, Rust, and Web Development through interactive lessons,
            coding games, and daily challenges. 600+ lessons. Zero boredom.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowSignIn(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2"
            >
              Get Started Free
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Check className="w-4 h-4 text-green-500" />
              No credit card required
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">600+</div>
              <div className="text-sm text-gray-500 font-medium">Lessons</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">6</div>
              <div className="text-sm text-gray-500 font-medium">Languages</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">10+</div>
              <div className="text-sm text-gray-500 font-medium">Games</div>
            </div>
            <div className="w-px h-12 bg-gray-200"></div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">26+</div>
              <div className="text-sm text-gray-500 font-medium">Achievements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Choose Your Path</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Each course has 100 lessons from beginner to advanced, with real code examples and hands-on practice.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.name} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift">
                <div className={`h-24 bg-gradient-to-r ${course.color} flex items-center justify-center`}>
                  <span className="text-5xl">{course.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-sm text-gray-500">{course.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Why CodeSword?</h2>
          <p className="text-gray-600 text-center mb-12">Everything you need to go from beginner to pro — and have fun doing it.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all">
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Coding?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Join CodeSword today and start your journey to becoming a master programmer.</p>
          <button
            onClick={() => setShowSignIn(true)}
            className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
          >
            Get Started Free
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          CodeSword — Forge • Practice • Master
        </div>
      </footer>
    </div>
  );
}