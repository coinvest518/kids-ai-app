// src/components/AdventureMap.js
import React from "react";
import { useCourse } from "@/context/CourseContext";

export default function AdventureMap({ onSelectModule }) {
  const { courseModules, state } = useCourse();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Adventure Map</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {courseModules.map((mod) => (
          <button
            key={mod.id}
            className={`w-40 h-32 rounded-lg shadow flex flex-col items-center justify-center transition-all border-2 ${
              state.unlockedModules.includes(mod.id)
                ? "bg-green-100 border-green-400 hover:bg-green-200"
                : "bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed"
            }`}
            onClick={() =>
              state.unlockedModules.includes(mod.id) && onSelectModule(mod.id)
            }
            disabled={!state.unlockedModules.includes(mod.id)}
          >
            <span className="text-lg font-semibold">Module {mod.id}</span>
            <span className="text-sm mt-2">{mod.title}</span>
            {state.progress >= mod.id && (
              <span className="mt-2 text-green-600 font-bold">✓ Complete</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
