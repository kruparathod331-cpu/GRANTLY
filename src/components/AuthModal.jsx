import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  CheckCircle2, 
  LogIn, 
  UserPlus, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }) {
  const { loginUser, profile } = useStudent();

  const [activeTab, setActiveTab] = useState(initialTab); // 'login' or 'signin'
  const [showPassword, setShowPassword] = useState(false);

  // Log in form state
  const [loginEmail, setLoginEmail] = useState(profile.email || 'aarav.patel@student.edu.in');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Sign in / Sign up form state
  const [signName, setSignName] = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signCollege, setSignCollege] = useState('');
  const [signCourse, setSignCourse] = useState('Computer Science');
  const [signPassword, setSignPassword] = useState('');

  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const triggerCelebration = (msg) => {
    setToastMessage(msg);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // silent
    }
    setTimeout(() => {
      setToastMessage('');
      onClose();
    }, 1200);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginUser({
      email: loginEmail,
      name: loginEmail.includes('aarav') ? profile.name : loginEmail.split('@')[0],
    });
    triggerCelebration(`Welcome back, ${profile.name ? profile.name.split(' ')[0] : 'Student'}! ✨`);
  };

  const handleQuickDemoLogin = () => {
    loginUser({
      name: 'Aarav Patel',
      email: 'aarav.patel@student.edu.in',
      college: 'National Institute of Technology, Mumbai',
      degree: 'B.Tech',
      course: 'Computer Science',
      percentage: '84.5',
      annualIncome: '450000',
    });
    triggerCelebration('Logged in successfully as Demo Student Aarav Patel! 🚀');
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!signName.trim() || !signEmail.trim()) return;

    loginUser({
      name: signName.trim(),
      email: signEmail.trim(),
      college: signCollege.trim() || 'University Institute of Technology',
      course: signCourse || 'Computer Science',
      degree: 'Undergraduate',
      percentage: '82.0',
    });
    triggerCelebration(`Welcome to GRANTLY, ${signName.split(' ')[0]}! Account created.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md rounded-3xl bg-theme-card border border-theme shadow-theme-lg flex flex-col overflow-hidden relative"
      >
        {/* Top Decorative Sparkle Background */}
        <div 
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-25 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-theme bg-theme-secondary/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-theme-sm"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-theme-main font-heading leading-tight">
                Student Gateway
              </h3>
              <span className="text-[11px] font-semibold text-theme-muted block">
                GRANTLY • Created by Krupa Rathod
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-theme-muted hover:text-theme-main hover:bg-theme-main transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Toast Banner */}
        {toastMessage && (
          <div className="p-3 bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tabs Switcher: Log In vs Sign In */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-theme-secondary border border-theme text-xs font-bold">
            <button
              onClick={() => setActiveTab('login')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-theme-card text-theme-main shadow-xs font-extrabold'
                  : 'text-theme-muted hover:text-theme-main'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => setActiveTab('signin')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'signin'
                  ? 'bg-theme-card text-theme-main shadow-xs font-extrabold'
                  : 'text-theme-muted hover:text-theme-main'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign In / Sign Up</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Log In Form */}
        {activeTab === 'login' && (
          <div className="p-6 space-y-4">
            {/* Quick Demo Access for Hackathon Judges */}
            <div className="p-3.5 rounded-2xl bg-theme-secondary/70 border border-theme flex items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="text-xs font-extrabold text-theme-main block">
                  Hackathon Reviewer Access
                </span>
                <span className="text-[11px] text-theme-muted block">
                  Pre-configured demo profile with live applications
                </span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="btn-primary px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs shrink-0"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>1-Click Log In</span>
              </button>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Student Email / College ID
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="student@college.edu.in"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-theme-main">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Demo Mode: Enter any password or click "1-Click Log In" to sign in instantly.')}
                    className="text-[11px] text-theme-primary font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-theme-muted hover:text-theme-main"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer text-theme-muted select-none">
                  <input type="checkbox" defaultChecked className="rounded accent-indigo-600" />
                  <span>Remember this device</span>
                </label>
                <span className="text-[11px] text-theme-subtle">SSL 256-bit encrypted</span>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-theme-sm mt-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In to GRANTLY</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-theme/60 text-xs text-theme-muted">
              Don't have a profile yet?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className="text-theme-primary font-bold hover:underline"
              >
                Sign In / Register here
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Sign In / Create Account Form */}
        {activeTab === 'signin' && (
          <div className="p-6 space-y-4">
            <form onSubmit={handleSignInSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Full Student Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    required
                    value={signName}
                    onChange={(e) => setSignName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Official Student Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
                  <input
                    type="email"
                    required
                    value={signEmail}
                    onChange={(e) => setSignEmail(e.target.value)}
                    placeholder="priya.sharma@college.edu.in"
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={signCollege}
                    onChange={(e) => setSignCollege(e.target.value)}
                    placeholder="e.g. IIT Bombay"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">
                    Major / Course
                  </label>
                  <select
                    value={signCourse}
                    onChange={(e) => setSignCourse(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none font-medium"
                  >
                    <option value="Computer Science">Computer Science & IT</option>
                    <option value="Artificial Intelligence">AI & Data Science</option>
                    <option value="Electrical Engineering">Electrical & Electronics</option>
                    <option value="Mechanical Engineering">Mechanical</option>
                    <option value="Biotechnology">Biotechnology</option>
                    <option value="Commerce">Commerce & Economics</option>
                    <option value="Arts">Humanities & Law</option>
                    <option value="Medicine">Medicine & Health</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Create Account Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={signPassword}
                    onChange={(e) => setSignPassword(e.target.value)}
                    placeholder="Choose a password (min 6 chars)"
                    className="w-full pl-10 pr-10 py-2 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-2.5 text-theme-muted hover:text-theme-main"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-theme-secondary/50 border border-theme text-[11px] text-theme-muted flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Your profile data is stored locally in your browser to personalize scholarship matching.
                </span>
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-theme-sm mt-1"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign In & Create Account</span>
              </button>
            </form>

            <div className="text-center pt-2 border-t border-theme/60 text-xs text-theme-muted">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-theme-primary font-bold hover:underline"
              >
                Log In here
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
