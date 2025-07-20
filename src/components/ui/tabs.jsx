// src/components/ui/tabs.jsx
import React, { useState } from "react";

export function Tabs({ defaultValue, children, className = "" }) {
  const [active, setActive] = useState(defaultValue);
  // Clone children and inject active value
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { active, setActive })
          : child
      )}
    </div>
  );
}

export function TabsList({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children, active, setActive, className = "" }) {
  const isActive = active === value;
  return (
    <button
      className={`px-4 py-2 rounded-t ${isActive ? "bg-white font-bold" : "bg-gray-100"} ${className}`}
      onClick={() => setActive(value)}
      type="button"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, active, children, className = "" }) {
  if (active !== value) return null;
  return <div className={className}>{children}</div>;
}
