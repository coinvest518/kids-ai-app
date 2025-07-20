// src/components/ui/checkbox.jsx
import React from "react";

export function Checkbox({ checked, onCheckedChange, className = "", ...props }) {
  return (
    <input
      type="checkbox"
      className={`form-checkbox h-5 w-5 text-blue-600 ${className}`}
      checked={!!checked}
      onChange={e => onCheckedChange && onCheckedChange(e.target.checked)}
      {...props}
    />
  );
}
