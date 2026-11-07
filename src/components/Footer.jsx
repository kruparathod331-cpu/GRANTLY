import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldAlert, Award, Compass, FolderLock, GraduationCap, Palette } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-theme bg-theme-card mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand & Creator Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-theme-sm"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-theme-main font-heading">
                  GRANTLY
                </span>
                <span className="block text-[11px] font-semibold text-theme-primary">
                  Your Potential Deserves Funding.
                </span>
              </div>
            </div>

            <p className="text-sm text-theme-muted max-w-md leading-relaxed">
              GRANTLY is an independently developed student-focused project created by <strong className="text-theme-main">Krupa Rathod</strong>, designed to make educational financial assistance easier to discover, understand, and manage.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-theme-secondary text-xs font-semibold text-theme-main border border-theme">
              <Award className="w-3.5 h-3.5 text-theme-primary" />
              <span>An original student innovation by Krupa Rathod ✦</span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/discover" className="text-theme-muted hover:text-theme-primary transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 opacity-70" />
                  Discover Scholarships
                </Link>
              </li>
              <li>
                <Link to="/applications" className="text-theme-muted hover:text-theme-primary transition-colors flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 opacity-70" />
                  Application Tracker
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-theme-muted hover:text-theme-primary transition-colors flex items-center gap-2">
                  <FolderLock className="w-3.5 h-3.5 opacity-70" />
                  Document Vault
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-theme-muted hover:text-theme-primary transition-colors flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 opacity-70" />
                  GRANTLY Learn (YouTube)
                </Link>
              </li>
              <li>
                <Link to="/themes" className="text-theme-muted hover:text-theme-primary transition-colors flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 opacity-70" />
                  Dynamic Theme Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon & Demo Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-theme-primary" />
              Outpost Hackathon Demo
            </h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              Curated for <strong className="text-theme-main">THE OUTPOST 6-Hour Frontend Hackathon</strong>. All scholarship entries are high-fidelity fictional demo records for prototype assessment.
            </p>
            <div className="pt-2">
              <span className="text-[11px] text-theme-subtle block">
                Local-first client storage • Zero paid API locks
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with required credit */}
        <div className="mt-12 pt-6 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <p className="flex items-center gap-1">
            Designed & Developed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by <span className="font-bold text-theme-main">Krupa Rathod</span>.
          </p>
          <p>
            © 2026 GRANTLY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
