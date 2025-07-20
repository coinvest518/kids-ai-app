import React from 'react';

export function Badge({ children, className = '', variant, ...props }) {
  let base = 'inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold';
  let color = '';
  if (variant === 'secondary') color = 'bg-gray-300 text-gray-700';
  else color = 'bg-purple-500 text-white';
  return (
    <span className={`${base} ${color} ${className}`} {...props}>
      {children}
    </span>
  );
}
