import { SignIn } from "@clerk/clerk-react";
import { Code2 } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Code2 className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">CodeSword</h1>
      </div>
      <SignIn />
    </div>
  );
}