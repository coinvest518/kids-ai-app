// src/components/ProfileBar.js
import React from "react";
import { useCourse } from "@/context/CourseContext";

export default function ProfileBar() {
  const { state } = useCourse();
  return (
    <div className="w-full flex items-center justify-between bg-blue-50 px-4 py-2 border-b">
      <div>
        <span className="font-bold">Level {state.level}</span>
        <span className="ml-4">XP: {state.xp}</span>
      </div>
      <div>
        {state.badges.map((b, i) => (
          <span key={i} className="inline-block bg-yellow-300 rounded px-2 py-1 mx-1 text-xs font-semibold">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
