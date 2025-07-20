// src/components/ui/textarea.jsx
import React from "react";

export function Textarea({ value, onChange, className = "", ...props }) {
  return (
    <textarea
      className={`form-textarea w-full rounded border px-3 py-2 ${className}`}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
