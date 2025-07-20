"use client";
import React from "react";
import CourseModule from "@/components/CourseModule";
import { courseModules } from "@/data/courseModules";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ModulePage({ params }) {
  const moduleId = parseInt(params.id, 10);
  const mod = courseModules.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">Module Not Found</h1>
        <p>The module you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFB] font-[Inter] text-[#56565C]">
      {/* Header/Nav matching main page */}
      <nav className="w-full flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <img src="/appwrite.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-extrabold text-xl text-purple-700 tracking-tight">AI Business Adventure</span>
        </Link>
        <Link href="/" className="text-purple-600 font-semibold hover:underline">Home</Link>
      </nav>

      {/* Module Card/Content */}
      <section className="max-w-4xl mx-auto py-8 px-4">
        <Card className="mb-8">
          <div className="flex items-center gap-4 p-6 border-b">
            <Badge className="bg-purple-500">Module {mod.id}</Badge>
            <h1 className="text-2xl font-bold text-purple-700">{mod.title}</h1>
          </div>
        </Card>
        <CourseModule
          moduleNumber={mod.id}
          title={mod.title}
          description={mod.description || mod.objective}
          objective={mod.objective}
          keyConcepts={mod.keyConcepts.map((k, i) => ({ id: String(i+1), title: k, completed: false }))}
          activities={[
            {
              id: "1",
              title: mod.activity,
              description: mod.activity,
              type: "text",
              completed: false,
            },
          ]}
          challenges={[
            {
              id: "1",
              question: mod.prompt,
              completed: false,
            },
          ]}
          extraResources={[mod.resource]}
          xpReward={mod.xp || 100}
          estimatedTime={"45 minutes"}
          difficulty={"Beginner"}
        />
      </section>
    </main>
  );
}
