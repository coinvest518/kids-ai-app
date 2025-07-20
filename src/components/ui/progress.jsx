import React from 'react';

export function Progress({ value = 0, className = '', ...props }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`} {...props}>
      <div
        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
