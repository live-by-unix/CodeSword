import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, CheckCircle, Flame, Calendar } from "lucide-react";

const challenges = [
  {
    language: "python",
    question: "What does `len([1, 2, 3, 4])` return in Python?",
    options: ["3", "4", "5", "Error"],
    correct: "4",
    points: 50,
  },
  {
    language: "java",
    question: "Which keyword is used to inherit a class in Java?",
    options: ["implements", "extends", "inherits", "super"],
    correct: "extends",
    points: 50,
  },
  {
    language: "c",
    question: "What does `sizeof(char)` always return in C?",
    options: ["0", "1", "2", "4"],
    correct: "1",
    points: 50,
  },
  {
    language: "general",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: "O(log n)",
    points: 50,
  },
  {
    language: "python",
    question: "What does `[x**2 for x in range(3)]` produce?",
    options: ["[0, 1, 4]", "[1, 4, 9]", "[0, 1, 2]", "[2, 4, 6]"],
    correct: "[0, 1, 4]",
    points: 50,
  },
  {
    language: "java",
    question: "What is the default value of an int in Java?",
    options: ["null", "0", "undefined", "1"],
    correct: "0",
    points: 50,
  },
  {
    language: "c",
    question: "Which function allocates memory dynamically in C?",
    options: ["alloc()", "malloc()", "new()", "create()"],
    correct: "malloc()",
    points: 50,
  },
  {
    language: "general",
    question: "Which data structure follows LIFO order?",
    options: ["Queue", "Stack", "Tree", "Graph"],
    correct: "Stack",
    points: 50,
  },
];

const langIcons = { python: "🐍", java: "☕", c: "⚡", general: "💻" };

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getStreak() {
  try {
    const data = localStorage.getItem("cs_streak");
    if (!data) return { count: 0, lastDay: 0 };
    return JSON.parse(data);
  } catch {
    return { count: 0, lastDay: 0 };
  }
}

function updateStreak() {
  const today = getDayOfYear();
  const streak = getStreak();
  if (streak.lastDay === today) return streak;
  const newCount = streak.lastDay === today - 1 ? streak.count + 1 : 1;
  const newStreak = { count: newCount, lastDay: today };
  localStorage.setItem("cs_streak", JSON.stringify(newStreak));
  return newStreak;
}

export default function DailyChallenge({ onComplete }) {
  const dayIndex = getDayOfYear() % challenges.length;
  const challenge = challenges[dayIndex];
  const challengeKey = `cs_daily_${getDayOfYear()}`;

  const [selected, setSelected] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [streak, setStreak] = useState(getStreak());

  useEffect(() => {
    setIsComplete(localStorage.getItem(challengeKey) === "done");
    setStreak(getStreak());
  }, [challengeKey]);

  const handleAnswer = (option) => {
    if (isComplete) return;
    setSelected(option);
    if (option === challenge.correct) {
      const newStreak = updateStreak();
      setStreak(newStreak);
      localStorage.setItem(challengeKey, "done");
      setIsComplete(true);
      onComplete?.(challenge.points);
    }
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 text-white overflow-hidden rounded-2xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            Daily Challenge
          </CardTitle>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full text-sm font-bold">
            <Flame className="w-4 h-4" />
            {streak.count} day streak
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div className="flex items-center gap-2 text-sm text-orange-100">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>

        {isComplete ? (
          <div className="text-center py-6">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 text-white" />
            <h3 className="text-xl font-bold mb-1">Challenge Complete!</h3>
            <p className="text-orange-100">You earned {challenge.points} points today. Come back tomorrow!</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{langIcons[challenge.language]}</span>
              <Badge className="bg-white/20 text-white border-0 capitalize">{challenge.language}</Badge>
              <Badge className="bg-white/20 text-white border-0">+{challenge.points} pts</Badge>
            </div>
            <p className="text-lg font-semibold leading-snug">{challenge.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challenge.options.map((option) => {
                const isSelected = selected === option;
                const isCorrect = option === challenge.correct;
                const showResult = selected !== null;
                return (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={showResult}
                    className={`p-3 rounded-xl font-mono text-sm font-medium transition-all text-left ${
                      showResult && isCorrect
                        ? "bg-white text-green-600"
                        : showResult && isSelected && !isCorrect
                        ? "bg-red-900/40 text-white"
                        : "bg-white/15 hover:bg-white/25 text-white"
                    }`}
                  >
                    {option}
                    {showResult && isCorrect && <CheckCircle className="w-4 h-4 inline ml-2" />}
                  </button>
                );
              })}
            </div>
            {selected && selected !== challenge.correct && (
              <p className="text-sm text-orange-100">Not quite! The correct answer is <strong>{challenge.correct}</strong>. Try again tomorrow!</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}