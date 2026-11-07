import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  LayoutDashboard, 
  FileText, 
  Bookmark, 
  FolderLock, 
  GraduationCap, 
  Palette, 
  User, 
  Bell, 
  Menu, 
  X,
  ChevronRight,
  SunMoon
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { profile, applications } = useStudent();
  const { cycleTheme, activeThemeMeta } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Deadlines count for notifications (e.g. applications due soon)
  const pendingDeadlines = applications.filter(a => ['Preparing', 'Interested'].includes(a.status));

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Discover', path: '/discover', icon: Compass },
    { name: 'Applications', path: '/applications', icon: FileText },
    { name: 'Saved', path: '/saved', icon: Bookmark },
    { name: 'Document Vault', path: '/documents', icon: FolderLock },
    { name: 'GRANTLY Learn', path: '/learn', icon: GraduationCap },
    { name: 'Theme Studio', path: '/themes', icon: Palette },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-theme transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Mandatory Creator Branding */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-theme-sm group-hover:scale-105 transition-transform"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-theme-main font-heading leading-tight flex items-center gap-1.5">
                  GRANTLY
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--primary)' }}></span>
                </span>
                {/* Visible creator credit right below / beside the logo as requested */}
                <span className="text-[11px] font-semibold tracking-wide text-theme-muted flex items-center gap-1">
                  Created by <strong className="text-theme-primary font-bold">Krupa Rathod</strong>
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                    active
                      ? 'bg-theme-secondary text-theme-main shadow-xs'
                      : 'text-theme-muted hover:text-theme-main hover:bg-theme-card'
                  }`}
                  style={active ? { color: 'var(--text-main)', borderBottom: '2px solid var(--primary)' } : {}}
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions: Theme switcher, Notification, Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Theme Cycle Button */}
            <button
              onClick={cycleTheme}
              title={`Active Theme: ${activeThemeMeta.name}. Click to switch theme.`}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-theme bg-theme-card text-theme-muted hover:text-theme-main hover:border-theme-primary transition-all flex items-center gap-1.5 text-xs font-semibold shadow-xs"
            >
              <span 
                className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                style={{ backgroundColor: activeThemeMeta.colors.primary }}
              />
              <span className="hidden md:inline">{activeThemeMeta.name.split(' ')[0]}</span>
              <SunMoon className="w-3.5 h-3.5 opacity-70" />
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-xl border border-theme bg-theme-card text-theme-muted hover:text-theme-main transition-colors relative"
                title="Application deadline radar"
              >
                <Bell className="w-4 h-4" />
                {pendingDeadlines.length > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-soft-pulse"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {pendingDeadlines.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div 
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-theme-card border border-theme shadow-theme-lg p-4 z-50 animate-in fade-in"
                >
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-theme">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-theme-primary" />
                      Deadline Radar
                    </h4>
                    <span className="text-[11px] font-semibold text-theme-primary">{pendingDeadlines.length} Due Soon</span>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {pendingDeadlines.length === 0 ? (
                      <p className="text-xs text-theme-muted py-2 text-center">No urgent deadlines pending. You are on track!</p>
                    ) : (
                      pendingDeadlines.map((app) => (
                        <Link
                          key={app.id}
                          to="/applications"
                          onClick={() => setShowNotifications(false)}
                          className="block p-2.5 rounded-xl bg-theme-secondary hover:bg-theme-main transition-colors text-left"
                        >
                          <div className="text-xs font-bold text-theme-main truncate">{app.title}</div>
                          <div className="flex items-center justify-between mt-1 text-[11px] text-theme-muted">
                            <span>Status: {app.status}</span>
                            <span className="font-semibold text-theme-primary">Due: {app.deadline}</span>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>
                  <Link
                    to="/applications"
                    onClick={() => setShowNotifications(false)}
                    className="mt-3 block text-center py-1.5 rounded-lg text-xs font-bold text-theme-primary hover:bg-theme-secondary transition-colors"
                  >
                    View All Applications →
                  </Link>
                </div>
              )}
            </div>

            {/* Profile Avatar & Link */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-theme bg-theme-card hover:bg-theme-secondary transition-all"
            >
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {profile.name ? profile.name.charAt(0) : 'S'}
              </div>
              <span className="hidden sm:inline text-xs font-bold text-theme-main truncate max-w-[90px]">
                {profile.name ? profile.name.split(' ')[0] : 'Student'}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-xl border border-theme bg-theme-card text-theme-muted hover:text-theme-main"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-theme bg-theme-card px-4 pt-3 pb-6 space-y-2 animate-in fade-in">
          <div className="p-3 mb-2 rounded-xl bg-theme-secondary flex items-center justify-between">
            <span className="text-xs font-bold text-theme-main">GRANTLY Student Ecosystem</span>
            <span className="text-[11px] font-semibold text-theme-primary">Created by Krupa Rathod</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    active
                      ? 'bg-theme-secondary text-theme-main font-bold'
                      : 'text-theme-muted hover:text-theme-main hover:bg-theme-main'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-theme-primary" />
                    {link.name}
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-theme flex items-center justify-between">
            <span className="text-xs text-theme-muted">Theme: <strong>{activeThemeMeta.name}</strong></span>
            <button
              onClick={cycleTheme}
              className="px-3 py-1.5 rounded-xl border border-theme text-xs font-bold text-theme-primary bg-theme-secondary"
            >
              Switch Theme
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
