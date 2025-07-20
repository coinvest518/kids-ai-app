import React from 'react';

export function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded font-semibold focus:outline-none focus:ring transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
