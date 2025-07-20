"use client";

import React from "react";
import { useCourse } from "@/context/CourseContext";
import CourseModule from "./CourseModule";
import UserProfile from "./UserProfile";

export default function ModuleView({ moduleId, onComplete, onSelectModule }) {
  const { courseModules, state } = useCourse();
  const mod = courseModules.find((m) => m.id === moduleId);
  if (!mod) return <div>Module not found.</div>;

  // Map old module data to new CourseModuleProps
  const keyConcepts = (mod.keyConcepts || []).map((c, i) => ({
    id: String(i + 1),
    title: c,
    completed: false,
  }));
  const activities = mod.activity
    ? [
        {
          id: "1",
          title: mod.activity,
          description: mod.activity,
          type: "text",
          completed: false,
        },
      ]
    : [];
  const challenges = mod.prompt
    ? [
        {
          id: "1",
          question: mod.prompt,
          completed: false,
        },
      ]
    : [];
  const extraResources = mod.resource ? [mod.resource] : [];

  // Modern, single-header, horizontal module nav design
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Slim Top Header */}
      <header className="w-full bg-white shadow z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <span className="text-lg md:text-2xl font-extrabold text-purple-700 tracking-tight">AI Business Adventure</span>
          <div className="hidden md:block">
            <UserProfile />
          </div>
        </div>
      </header>
      {/* Horizontal Module Navigation */}
      <nav className="w-full bg-gradient-to-r from-purple-100 to-blue-100 shadow-inner py-2 px-2 flex overflow-x-auto gap-2 md:gap-4">
        {courseModules.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelectModule && onSelectModule(m.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${m.id === moduleId ? 'bg-purple-600 text-white shadow' : state.unlockedModules.includes(m.id) ? 'bg-white text-purple-700 border border-purple-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed'} ${!state.unlockedModules.includes(m.id) ? 'opacity-60' : ''}`}
            disabled={!state.unlockedModules.includes(m.id)}
          >
            Module {m.id}
          </button>
        ))}
      </nav>
      {/* Main Module Content */}
      <main className="flex-1 flex items-center justify-center p-2 md:p-4">
        <div className="max-w-3xl w-full mx-auto">
          <CourseModule
            moduleNumber={mod.id}
            title={mod.title}
            description={mod.description || ""}
            objective={mod.objective || ""}
            keyConcepts={keyConcepts}
            activities={activities}
            challenges={challenges}
            extraResources={extraResources}
            xpReward={mod.xp || 100}
            estimatedTime={mod.estimatedTime || "45 minutes"}
            difficulty={mod.difficulty || "Beginner"}
            aiContext={`Module: ${mod.title}\nKey Concepts: ${(mod.keyConcepts || []).join(", ")}`}
            onBack={onComplete}
          />
        </div>
      </main>
    </div>
  );
}
