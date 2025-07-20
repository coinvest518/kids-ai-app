"use client";
import React from "react";
import { useCourse } from "@/context/CourseContext";
import { Rocket, Trophy, Brain, BookOpen, Lightbulb, DollarSign, Globe, Play, Target, Award, Users } from 'lucide-react';

const moduleIcons = [Rocket, Lightbulb, Target, Users, Brain, BookOpen, Brain, Globe, DollarSign, Trophy, Play, Award];

export default function SidebarAdventureMap({ onSelectModule }) {
  const { courseModules, state } = useCourse();
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-gradient-to-b from-blue-400 via-purple-500 to-pink-400 p-4 text-white rounded-r-3xl shadow-2xl">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center">
          <Rocket className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-100 to-blue-200 bg-clip-text text-transparent">Adventure Map</h2>
        <p className="text-sm text-purple-100 mt-1">Track your journey!</p>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {courseModules.map((mod, idx) => {
          const Icon = moduleIcons[idx] || Rocket;
          const unlocked = state.unlockedModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-left shadow-md border-2 ${
                unlocked
                  ? "bg-white/20 border-white/40 hover:bg-white/30"
                  : "bg-white/10 border-white/10 opacity-60 cursor-not-allowed"
              } ${state.progress >= mod.id ? "ring-2 ring-green-300" : ""}`}
              onClick={() => unlocked && onSelectModule && onSelectModule(mod.id)}
              disabled={!unlocked}
            >
              <span className={`rounded-full p-2 ${unlocked ? "bg-gradient-to-tr from-yellow-300 to-pink-300" : "bg-gray-200"}`}>
                <Icon className={`w-6 h-6 ${unlocked ? "text-purple-700" : "text-gray-400"}`} />
              </span>
              <span className="flex-1">
                <span className="block text-base font-bold">Module {mod.id}</span>
                <span className="block text-xs text-purple-100">{mod.title}</span>
              </span>
              {state.progress >= mod.id && (
                <span className="ml-2 bg-green-400 text-white text-xs px-2 py-1 rounded-full">✓</span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
