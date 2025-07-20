"use client";
import React from "react";
import UserProfile from "@/components/UserProfile";
import { CourseProvider } from "@/context/CourseContext";

export default function ProfilePage() {
  return (
    <CourseProvider>
      <div className="min-h-screen bg-[#FAFAFB]">
        <UserProfile />
      </div>
    </CourseProvider>
  );
}
