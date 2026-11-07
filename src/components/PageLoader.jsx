import React from 'react';
import { Sparkles } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div 
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-theme-sm animate-bounce"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        <Sparkles className="w-6 h-6 animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <h4 className="text-sm font-extrabold text-theme-main font-heading">
          Loading GRANTLY Workspace...
        </h4>
        <p className="text-xs text-theme-muted">
          Your Potential Deserves Funding • Krupa Rathod
        </p>
      </div>
    </div>
  );
}
