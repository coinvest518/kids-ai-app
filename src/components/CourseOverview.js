"use client";
import React from "react";
import { useCourse } from '@/context/CourseContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Star } from 'lucide-react';

function CourseOverview({ onSelectModule }) {
  const { courseModules, state } = useCourse();
  const totalModules = courseModules.length;
  const completed = state.progress;
  const percent = Math.round((completed / totalModules) * 100);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Slim Top Header */}
      <header className="w-full bg-white shadow z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <span className="text-lg md:text-2xl font-extrabold text-purple-700 tracking-tight">AI Business Adventure</span>
          {/* Optionally add profile or nav controls here if needed */}
        </div>
      </header>
      {/* Horizontal Module Navigation */}
      <nav className="w-full bg-gradient-to-r from-purple-100 to-blue-100 shadow-inner py-2 px-2 flex overflow-x-auto gap-2 md:gap-4">
        {courseModules.map((m) => (
          <button
            key={m.id}
            onClick={() => onSelectModule && onSelectModule(m.id)}
            className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${state.unlockedModules.includes(m.id) ? 'bg-white text-purple-700 border border-purple-300' : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60'}`}
            disabled={!state.unlockedModules.includes(m.id)}
          >
            Module {m.id}
          </button>
        ))}
      </nav>
      {/* Course Progress Card */}
      <Card className="mb-8 mt-4 max-w-4xl mx-auto">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-3xl font-bold mb-2">AI Business Adventure</CardTitle>
          <CardDescription className="text-lg text-gray-600">Your journey to learn entrepreneurship and AI</CardDescription>
          <div className="w-full mt-4">
            <Progress value={percent} />
            <div className="flex justify-between text-sm mt-1">
              <span>{completed}/{totalModules} Modules Complete</span>
              <span>{percent}%</span>
            </div>
          </div>
        </CardHeader>
      </Card>
      {/* Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {courseModules.map((mod) => (
          <Card
            key={mod.id}
            className={`border-l-4 ${state.unlockedModules.includes(mod.id) ? 'border-l-blue-500' : 'border-l-gray-300 opacity-60'} w-full md:w-[1000px] xl:w-[600px] mx-auto rounded-2xl shadow-md transition-all`}
          >
            <CardHeader className="flex flex-row items-center justify-between py-4 px-4">
              <div>
                <Badge variant="outline" className="text-xs">Module {mod.id}</Badge>
                <CardTitle className="text-lg font-bold mt-1">{mod.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{mod.description || mod.objective}</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                {state.progress >= mod.id && (
                  <Badge className="bg-green-500 text-white flex items-center"><Star className="w-3 h-3 mr-1" /> Complete</Badge>
                )}
                {!state.unlockedModules.includes(mod.id) && (
                  <Badge variant="secondary">Locked</Badge>
                )}
                {onSelectModule && (
                  <button
                    type="button"
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
                    disabled={!state.unlockedModules.includes(mod.id)}
                    onClick={() => onSelectModule(mod.id)}
                  >
                    {state.progress >= mod.id ? 'Review' : 'Start'}
                  </button>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CourseOverview;
