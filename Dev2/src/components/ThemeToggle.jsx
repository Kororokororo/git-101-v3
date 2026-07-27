import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-3 rounded-full bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:scale-110 active:scale-95 transition-all duration-300 shadow-md border border-slate-300/50 dark:border-slate-700/50"
      aria-label="Toggle Theme"
      title={isDark ? "สลับเป็น Light Mode" : "สลับเป็น Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600" />
      )}
    </button>
  );
};
