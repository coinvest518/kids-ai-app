"use client";
import React from "react";
import ProfileBar from "@/components/ProfileBar";
import CourseOverview from "@/components/CourseOverview";

export default function ModulesPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFB]">
      <ProfileBar />
      <CourseOverview />
    </div>
  );
}
