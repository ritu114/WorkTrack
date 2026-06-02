import React from 'react';
import { X } from 'lucide-react';
import { cn } from './index';

export function Modal({ isOpen, onClose, title, children, className }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className={cn("bg-[#0F172A] border border-[#334155] rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col", className)}
        role="dialog"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#334155]">
          <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#1E293B] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
