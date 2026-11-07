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
  SunMoon,
  LogIn,
  UserPlus,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useTheme } from '../context/ThemeContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const location = useLocation();
  const { 
    profile, 
    applications, 
    isAuthenticated, 
    authModalOpen, 
    authModalTab, 
    openAuthModal, 
    closeAuthModal, 
    logoutUser 
  } = useStudent();
  const { cycleTheme, activeThemeMeta } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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
    <>
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
                  {/* Visible creator credit right below / beside the logo */}
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

            {/* Right Side Actions: Auth buttons, Theme switcher, Notification, Profile */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              
              {/* Sign In & Log In Buttons (Requested by User) */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-theme bg-theme-card text-theme-main hover:border-theme-primary hover:bg-theme-secondary text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
                  title="Open Log In dialog"
                >
                  <LogIn className="w-3.5 h-3.5 text-theme-primary" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={() => openAuthModal('signin')}
                  className="btn-primary px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                  title="Open Sign In / Register dialog"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>

              {/* Quick Theme Cycle Button */}
              <button
                onClick={cycleTheme}
                title={`Active Theme: ${activeThemeMeta.name}. Click to switch theme.`}
                className="hidden sm:flex p-2 rounded-xl border border-theme bg-theme-card text-theme-muted hover:text-theme-main hover:border-theme-primary transition-all items-center gap-1.5 text-xs font-semibold shadow-xs"
              >
                <span 
                  className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                  style={{ backgroundColor: activeThemeMeta.colors.primary }}
                />
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

              {/* Profile Avatar & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl border border-theme bg-theme-card hover:bg-theme-secondary transition-all"
                  title="Student Profile Menu"
                >
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {profile.name ? profile.name.charAt(0) : 'S'}
                  </div>
                  <span className="hidden md:inline text-xs font-bold text-theme-main truncate max-w-[80px]">
                    {profile.name ? profile.name.split(' ')[0] : 'Student'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-theme-muted hidden sm:inline" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-theme-card border border-theme shadow-theme-lg p-2.5 z-50 animate-in fade-in text-xs space-y-1">
                    <div className="p-2 border-b border-theme/60 mb-1">
                      <span className="font-extrabold text-theme-main block truncate">{profile.name}</span>
                      <span className="text-[11px] text-theme-muted block truncate">{profile.email}</span>
                      <span className="text-[10px] font-bold text-theme-primary uppercase mt-1 inline-block">
                        {isAuthenticated ? '● Signed In' : '○ Guest Mode'}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-theme-main hover:bg-theme-secondary transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-theme-primary" />
                      <span>Student Dashboard</span>
                    </Link>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-theme-main hover:bg-theme-secondary transition-colors font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-theme-primary" />
                      <span>Profile & Settings</span>
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        openAuthModal('login');
                      }}
                      className="w-full text-left flex items-center gap-2 p-2 rounded-xl text-theme-main hover:bg-theme-secondary transition-colors font-medium"
                    >
                      <LogIn className="w-3.5 h-3.5 text-theme-primary" />
                      <span>Switch / Log In Account</span>
                    </button>

                    <div className="pt-1 border-t border-theme/60 mt-1">
                      {isAuthenticated ? (
                        <button
                          onClick={() => {
                            logoutUser();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors font-bold"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sign Out</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            openAuthModal('signin');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 p-2 rounded-xl text-theme-primary hover:bg-theme-secondary transition-colors font-bold"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Sign In / Register</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

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
          <div className="lg:hidden border-t border-theme bg-theme-card px-4 pt-3 pb-6 space-y-3 animate-in fade-in">
            <div className="p-3 rounded-xl bg-theme-secondary flex items-center justify-between">
              <span className="text-xs font-bold text-theme-main">GRANTLY Student Ecosystem</span>
              <span className="text-[11px] font-semibold text-theme-primary">Created by Krupa Rathod</span>
            </div>

            {/* Mobile Log In and Sign In Buttons */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-theme/60">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="py-2 px-3 rounded-xl border border-theme bg-theme-main text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-theme-primary" />
                <span>Log In</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('signin');
                }}
                className="btn-primary py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
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

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={closeAuthModal}
        initialTab={authModalTab}
      />
    </>
  );
}
