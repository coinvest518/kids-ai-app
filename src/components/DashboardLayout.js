"use client";
import React from "react";
import SidebarAdventureMap from "@/components/SidebarAdventureMap";

export default function DashboardLayout({ children, onSelectModule }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <SidebarAdventureMap onSelectModule={onSelectModule} />
      <main className="flex-1 bg-[#FAFAFB] p-2 md:p-8">
        {children}
      </main>
    </div>
  );
}
