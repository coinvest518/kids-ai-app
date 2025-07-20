"use client";
import React from "react";
import ProfileBar from "@/components/ProfileBar";
import CourseOverview from "@/components/CourseOverview";
import { CourseProvider } from "@/context/CourseContext";

export default function ModulesPage() {
  return (
    <CourseProvider>
      <div className="min-h-screen bg-[#FAFAFB]">
        <ProfileBar />
        <CourseOverview />
      </div>
    </CourseProvider>
  );
}
