// src/components/ModuleView.js
import React from "react";
import { useCourse } from "@/context/CourseContext";
import CourseModule from "./CourseModule";

export default function ModuleView({ moduleId, onComplete }) {
  const { courseModules } = useCourse();
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

  // You can add more logic to map XP, time, and difficulty if available in your data
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <button
          className="mb-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
          onClick={onComplete}
        >
          ← Back to Map
        </button>
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
        />
      </div>
    </div>
  );
}
