// src/components/ui/collapsible.jsx
import React, { useState } from "react";

export function Collapsible({ open, onOpenChange, children }) {
  const [isOpen, setIsOpen] = useState(open);
  const handleToggle = (val) => {
    setIsOpen(val);
    if (onOpenChange) onOpenChange(val);
  };
  return React.Children.map(children, child =>
    React.isValidElement(child)
      ? React.cloneElement(child, { open: isOpen, onOpenChange: handleToggle })
      : child
  );
}

export function CollapsibleContent({ open, children, className = "" }) {
  if (!open) return null;
  return <div className={className}>{children}</div>;
}
