import React from 'react';

export function Card({ children, className = '', ...props }) {
  return <div className={`rounded-xl border bg-white shadow ${className}`} {...props}>{children}</div>;
}

export function CardHeader({ children, className = '', ...props }) {
  return <div className={`p-6 border-b rounded-t-xl ${className}`} {...props}>{children}</div>;
}

export function CardTitle({ children, className = '', ...props }) {
  return <h2 className={`font-bold text-xl ${className}`} {...props}>{children}</h2>;
}

export function CardDescription({ children, className = '', ...props }) {
  return <p className={`text-gray-600 ${className}`} {...props}>{children}</p>;
}

export function CardContent({ children, className = '', ...props }) {
  return <div className={`p-6 ${className}`} {...props}>{children}</div>;
}
