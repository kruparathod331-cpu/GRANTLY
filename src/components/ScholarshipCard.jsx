import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Check, 
  Plus, 
  Scale, 
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { calculateScholarshipMatch } from '../services/matchingService';

export default function ScholarshipCard({ 
  scholarship, 
  onSelectForCompare = null, 
  isSelectedForCompare = false 
}) {
  const { profile, isScholarshipSaved, toggleSaveScholarship, addApplication, applications } = useStudent();

  const saved = isScholarshipSaved(scholarship.id);
  const matchResult = calculateScholarshipMatch(profile, scholarship);
  const isAlreadyApplied = applications.some(a => a.scholarshipId === scholarship.id);

  // Urgency calculation
  const deadlineDate = new Date(scholarship.deadline);
  const now = new Date();
  const diffDays = Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24));
  const isUrgent = diffDays > 0 && diffDays <= 20;

  const handleQuickTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAlreadyApplied) return;
    addApplication({
      scholarshipId: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      amount: scholarship.formattedAmount,
      deadline: scholarship.deadline,
      status: 'Interested',
      notes: `Discovered from catalog. Match score: ${matchResult.score}%.`,
    });
  };

  return (
    <div className="rounded-3xl bg-theme-card border border-theme shadow-theme-sm hover:shadow-theme-md transition-all duration-200 p-5 flex flex-col justify-between relative group card-hover-lift">
      
      {/* Top Header: Demo badge & Save button */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="badge-pill bg-theme-secondary text-theme-main text-[10px] font-bold">
              {scholarship.category}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <ShieldAlert className="w-2.5 h-2.5" />
              DEMO DATA
            </span>
            {isUrgent && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 animate-soft-pulse">
                {diffDays} days left
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {onSelectForCompare && (
              <button
                onClick={() => onSelectForCompare(scholarship)}
                className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                  isSelectedForCompare
                    ? 'bg-theme-primary text-white border-theme-primary'
                    : 'border-theme bg-theme-card text-theme-muted hover:text-theme-main hover:bg-theme-secondary'
                }`}
                title="Select to compare side-by-side"
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => toggleSaveScholarship(scholarship.id)}
              className={`p-2 rounded-xl border transition-all ${
                saved
                  ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                  : 'border-theme bg-theme-card text-theme-muted hover:text-rose-500 hover:bg-theme-secondary'
              }`}
              title={saved ? 'Remove from saved' : 'Save opportunity'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Provider */}
        <Link to={`/scholarships/${scholarship.id}`} className="block group-hover:text-theme-primary transition-colors">
          <h3 className="font-extrabold text-base sm:text-lg text-theme-main font-heading leading-snug line-clamp-2">
            {scholarship.title}
          </h3>
        </Link>
        <p className="text-xs text-theme-muted mt-1 font-medium">
          by {scholarship.provider}
        </p>

        {/* Funding Amount Highlight */}
        <div className="mt-4 p-3 rounded-2xl bg-theme-secondary/60 border border-theme/60 flex items-baseline justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Funding Support
            </span>
            <span className="text-lg font-black text-theme-main font-heading">
              {scholarship.formattedAmount}
            </span>
          </div>

          {/* Match Score Indicator */}
          <div className="text-right">
            <span className="text-[10px] font-semibold text-theme-muted block">Profile Match</span>
            <div className="inline-flex items-center gap-1 text-xs font-black text-theme-primary">
              <Sparkles className="w-3 h-3" />
              <span>{matchResult.score}%</span>
            </div>
          </div>
        </div>

        {/* Short Summary */}
        <p className="text-xs text-theme-muted mt-3 line-clamp-2 leading-relaxed">
          {scholarship.summary}
        </p>

        {/* Key Attributes Pills */}
        <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-theme-muted">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-theme-primary" />
            {scholarship.educationLevel}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-theme-primary" />
            {scholarship.location}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-theme-primary" />
            {scholarship.deadline}
          </span>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="mt-5 pt-4 border-t border-theme flex items-center justify-between gap-2">
        <Link
          to={`/scholarships/${scholarship.id}`}
          className="btn-outline flex-1 py-2 px-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1 hover:border-theme-primary transition-all"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleQuickTrack}
          disabled={isAlreadyApplied}
          className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
            isAlreadyApplied
              ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
              : 'btn-primary shadow-theme-sm'
          }`}
          title={isAlreadyApplied ? 'Already in your Application Tracker' : 'Add to Application Tracker'}
        >
          {isAlreadyApplied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Tracked</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Track</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
