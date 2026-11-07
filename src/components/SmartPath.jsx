import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  CircleDot, 
  UserCheck, 
  Compass, 
  FileCheck2, 
  FolderLock, 
  Send, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function SmartPath() {
  const { profile, savedIds, documents, applications } = useStudent();

  const isProfileComplete = Boolean(profile.name && profile.course && profile.percentage);
  const isDiscovered = savedIds.length > 0;
  const isEligibilityChecked = isDiscovered; // eligibility calculated automatically
  const isDocumentsReady = documents.filter(d => d.status === 'Ready').length >= 3;
  const isSubmitted = applications.some(a => ['Submitted', 'Under Review', 'Approved'].includes(a.status));
  const isTracking = applications.length > 0;

  const steps = [
    {
      id: 1,
      title: 'Complete Profile',
      desc: 'Academic & income data',
      icon: UserCheck,
      completed: isProfileComplete,
      current: !isProfileComplete,
      path: '/profile'
    },
    {
      id: 2,
      title: 'Discover Matches',
      desc: 'Bookmark opportunities',
      icon: Compass,
      completed: isDiscovered,
      current: isProfileComplete && !isDiscovered,
      path: '/discover'
    },
    {
      id: 3,
      title: 'Check Eligibility',
      desc: 'Transparent diagnostics',
      icon: FileCheck2,
      completed: isEligibilityChecked,
      current: isDiscovered && !isDocumentsReady,
      path: '/discover'
    },
    {
      id: 4,
      title: 'Prepare Documents',
      desc: 'Transcripts, SOP & income',
      icon: FolderLock,
      completed: isDocumentsReady,
      current: isEligibilityChecked && !isDocumentsReady,
      path: '/documents'
    },
    {
      id: 5,
      title: 'Submit Application',
      desc: 'Review and send',
      icon: Send,
      completed: isSubmitted,
      current: isDocumentsReady && !isSubmitted,
      path: '/applications'
    },
    {
      id: 6,
      title: 'Track Progress',
      desc: 'Status & milestones',
      icon: TrendingUp,
      completed: isTracking,
      current: isSubmitted && isTracking,
      path: '/applications'
    }
  ];

  const completedCount = steps.filter(s => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-theme-primary block mb-0.5">
            Structured Funding Journey
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-theme-main font-heading">
            GRANTLY Smart Path™
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-theme-muted block">Roadmap Progress</span>
            <span className="text-sm font-extrabold text-theme-primary">{completedCount} of 6 Completed ({progressPercent}%)</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-theme-secondary flex items-center justify-center font-bold text-xs text-theme-primary border border-theme">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Visual Roadmap Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <Link
              key={step.id}
              to={step.path}
              className={`p-3.5 rounded-2xl border transition-all text-left flex flex-col justify-between group ${
                step.completed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100 hover:border-emerald-500'
                  : step.current
                  ? 'bg-theme-secondary border-theme-primary shadow-xs ring-2 ring-primary/20'
                  : 'bg-theme-main/50 border-theme text-theme-muted hover:border-theme-primary'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div 
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                      step.completed
                        ? 'bg-emerald-600 text-white'
                        : step.current
                        ? 'bg-theme-primary text-white'
                        : 'bg-theme-secondary text-theme-muted'
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                  </div>
                  {step.current && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-theme-primary text-white animate-soft-pulse">
                      Active
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-theme-main group-hover:text-theme-primary transition-colors">
                  {step.title}
                </div>
                <div className="text-[11px] text-theme-muted mt-0.5 line-clamp-1">
                  {step.desc}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-theme/60 flex items-center justify-between text-[11px] font-semibold text-theme-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
