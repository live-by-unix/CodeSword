import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Code, Sparkles, Trophy, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import CodeEditor from "../components/lessons/CodeEditor";

const playgrounds = {
  python: {
    icon: "🐍", label: "Python", gradient: "from-blue-500 to-cyan-400",
    desc: "Python is perfect for beginners! Readable, versatile, and great for data science and automation.",
    code: `# Welcome to Python!\nprint("Hello, CodeSword!")\n\nname = "Coder"\nprint(f"Welcome, {name}!")\n\n# Try a list comprehension:\nsquares = [x**2 for x in range(1, 6)]\nprint(squares)`,
    output: `Hello, CodeSword!\nWelcome, Coder!\n[1, 4, 9, 16, 25]`,
  },
  java: {
    icon: "☕", label: "Java", gradient: "from-orange-500 to-amber-400",
    desc: "Java is a powerful, object-oriented language used for enterprise apps, Android, and large-scale systems.",
    code: `// Welcome to Java!\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, CodeSword!");\n        String name = "Coder";\n        System.out.println("Welcome, " + name + "!");\n    }\n}`,
    output: `Hello, CodeSword!\nWelcome, Coder!`,
  },
  c: {
    icon: "⚡", label: "C", gradient: "from-purple-500 to-violet-400",
    desc: "C is the foundation of modern programming. Learn memory management, pointers, and system-level concepts.",
    code: `// Welcome to C!\n#include <stdio.h>\n\nint main() {\n    printf("Hello, CodeSword!\\n");\n    printf("Welcome, Coder!\\n");\n    return 0;\n}`,
    output: `Hello, CodeSword!\nWelcome, Coder!`,
  },
  cpp: {
    icon: "⚙️", label: "C++", gradient: "from-indigo-500 to-blue-400",
    desc: "Master modern C++ with OOP, templates, and the STL for high-performance applications.",
    code: `// Welcome to C++!\n#include <iostream>\n#include <vector>\n\nint main() {\n    std::cout << "Hello, CodeSword!" << std::endl;\n    std::vector<int> nums = {1, 2, 3, 4, 5};\n    for (int n : nums)\n        std::cout << n * n << " ";\n    std::cout << std::endl;\n    return 0;\n}`,
    output: `Hello, CodeSword!\n1 4 9 16 25 `,
  },
  rust: {
    icon: "🦀", label: "Rust", gradient: "from-rose-500 to-orange-400",
    desc: "Learn safe, concurrent systems programming with Rust. Master ownership and borrowing.",
    code: `// Welcome to Rust!\nfn main() {\n    println!("Hello, CodeSword!");\n    let nums = vec![1, 2, 3, 4, 5];\n    let squares: Vec<i32> = nums.iter().map(|n| n * n).collect();\n    println!("{:?}", squares);\n}`,
    output: `Hello, CodeSword!\n[1, 4, 9, 16, 25]`,
  },
  webdev: {
    icon: "🌐", label: "Web Dev", gradient: "from-teal-500 to-cyan-400",
    desc: "Build modern web apps with HTML, CSS, JavaScript, and React. Full-stack from the ground up.",
    code: `// Welcome to JavaScript!\nconst name = "CodeSword";\nconsole.log(\`Hello, \${name}!\`);\n\nconst nums = [1, 2, 3, 4, 5];\nconst squares = nums.map(n => n * n);\nconsole.log(squares);`,
    output: `Hello, CodeSword!\n[1, 4, 9, 16, 25]`,
  },
};

const challenges = [
  {
    title: "Reverse a String",
    language: "python",
    difficulty: "Easy",
    desc: "Write Python code that reverses the string 'hello' and prints it.",
    starter: "# Reverse the string 'hello'\nresult = \nprint(result)",
    expected: "olleh",
    hint: "Use slicing: string[::-1]",
  },
  {
    title: "Sum of Array",
    language: "python",
    difficulty: "Easy",
    desc: "Calculate and print the sum of [10, 20, 30, 40, 50].",
    starter: "# Sum the array\nnums = [10, 20, 30, 40, 50]\nresult = \nprint(result)",
    expected: "150",
    hint: "Use the built-in sum() function",
  },
  {
    title: "FizzBuzz",
    language: "python",
    difficulty: "Medium",
    desc: "Print numbers 1-15, but 'Fizz' for multiples of 3, 'Buzz' for multiples of 5, 'FizzBuzz' for both.",
    starter: "# FizzBuzz\nfor i in range(1, 16):\n    # Your code here\n    pass",
    expected: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    hint: "Check i % 3 == 0 and i % 5 == 0",
  },
  {
    title: "Find the Maximum",
    language: "java",
    difficulty: "Easy",
    desc: "Find and print the maximum value in the array {5, 12, 3, 8, 15, 7}.",
    starter: "// Find the max\nint[] nums = {5, 12, 3, 8, 15, 7};\nint max = nums[0];\n// Your code here\nSystem.out.println(max);",
    expected: "15",
    hint: "Loop through and compare each element",
  },
  {
    title: "Even or Odd",
    language: "c",
    difficulty: "Easy",
    desc: "Print 'Even' if the number 7 is even, 'Odd' if it's odd.",
    starter: "// Even or Odd\n#include <stdio.h>\nint main() {\n    int n = 7;\n    // Your code here\n    return 0;\n}",
    expected: "Odd",
    hint: "Use the modulo operator: n % 2 == 0 means even",
  },
];

export default function Practice() {
  const [activeTab, setActiveTab] = useState("python");
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const startChallenge = (challenge) => {
    setActiveChallenge(challenge);
    setUserAnswer(challenge.starter);
    setResult(null);
    setShowHint(false);
  };

  const checkAnswer = () => {
    const normalized = userAnswer.trim().replace(/\s+/g, " ").toLowerCase();
    const expected = activeChallenge.expected.trim().replace(/\s+/g, " ").toLowerCase();
    const isCorrect = normalized.includes(expected) || expected.includes(normalized);
    setResult({ success: isCorrect });
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to={createPageUrl("Dashboard")}>
            <Button variant="outline" size="icon" className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Code className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Practice Lab</h1>
            </div>
            <p className="text-gray-600">Write code in 6 languages, solve challenges, and get instant feedback.</p>
          </div>
        </div>

        {/* Coding Challenges */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-600" />
            <h2 className="text-2xl font-bold text-gray-900">Coding Challenges</h2>
          </div>
          {activeChallenge ? (
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{playgrounds[activeChallenge.language]?.icon || "💻"}</span>
                    {activeChallenge.title}
                    <span className="text-sm font-normal text-gray-500 capitalize">{activeChallenge.difficulty}</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveChallenge(null)}>Close</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{activeChallenge.desc}</p>
                {showHint && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">{activeChallenge.hint}</p>
                  </div>
                )}
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="font-mono text-sm w-full min-h-40 p-4 bg-gray-900 text-green-400 rounded-xl border-0 focus:outline-none"
                />
                {result && (
                  <div className={`flex items-center gap-2 p-3 rounded-xl ${result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                    {result.success ? <CheckCircle className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                    <p className={`text-sm font-medium ${result.success ? "text-green-800" : "text-red-800"}`}>
                      {result.success ? "Correct! Great job! 🎉" : "Not quite right. Check your output and try again."}
                    </p>
                  </div>
                )}
                <div className="flex gap-3">
                  <Button onClick={checkAnswer} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6">
                    <CheckCircle className="w-4 h-4 mr-2" /> Check Answer
                  </Button>
                  <Button variant="outline" onClick={() => setShowHint(!showHint)}>
                    <Lightbulb className="w-4 h-4 mr-2" /> {showHint ? "Hide Hint" : "Show Hint"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {challenges.map((ch, i) => (
                <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover-lift cursor-pointer rounded-2xl" >
                  <CardContent className="p-5" onClick={() => startChallenge(ch)}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{playgrounds[ch.language]?.icon || "💻"}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        ch.difficulty === "Easy" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>{ch.difficulty}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{ch.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{ch.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Language Playground */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Free Play Ground</h2>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-white/90 backdrop-blur-sm shadow-lg border-0">
              {Object.entries(playgrounds).map(([key, p]) => (
                <TabsTrigger key={key} value={key} className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium">
                  {p.icon} {p.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(playgrounds).map(([key, p]) => (
              <TabsContent key={key} value={key} className="space-y-6">
                <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl">{p.icon}</span> {p.label} Playground
                    </CardTitle>
                    <p className="text-gray-600">{p.desc}</p>
                  </CardHeader>
                </Card>
                <CodeEditor initialCode={p.code} language={key} expectedOutput={p.output} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}