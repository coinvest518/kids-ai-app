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
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseModules.map((mod) => (
          <Card key={mod.id} className={`border-l-4 ${state.unlockedModules.includes(mod.id) ? 'border-l-blue-500' : 'border-l-gray-300 opacity-60'}`}>
            <CardHeader className="flex flex-row items-center justify-between">
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
