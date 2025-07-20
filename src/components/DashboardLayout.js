"use client";
import React from "react";
import SidebarAdventureMap from "@/components/SidebarAdventureMap";

export default function DashboardLayout({ children, onSelectModule }) {
  return (
    <div className="flex min-h-screen">
      <SidebarAdventureMap onSelectModule={onSelectModule} />
      <main className="flex-1 bg-[#FAFAFB] p-0 md:p-8">
        {children}
      </main>
    </div>
  );
}
