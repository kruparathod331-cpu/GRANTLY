import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Compass, 
  Bookmark, 
  FileText, 
  Clock, 
  Coins, 
  FolderLock, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Bot, 
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateScholarshipMatch } from '../services/matchingService';
import SmartPath from '../components/SmartPath';
import ScholarshipCard from '../components/ScholarshipCard';
import SOPGeneratorModal from '../components/SOPGeneratorModal';

export default function Dashboard() {
  const { 
    profile, 
    savedIds, 
    applications, 
    documents, 
    documentMetrics, 
    readinessScore 
  } = useStudent();

  const [showSOPModal, setShowSOPModal] = useState(false);

  // Time-based dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Matched scholarships with score >= 60%
  const matchedScholarships = SCHOLARSHIPS_DATA.map(s => ({
    ...s,
    match: calculateScholarshipMatch(profile, s),
  })).sort((a, b) => b.match.score - a.match.score);

  const bestMatches = matchedScholarships.filter(s => s.match.score >= 60).slice(0, 3);
  const totalMatchedCount = matchedScholarships.filter(s => s.match.score >= 60).length;

  // Potential funding aggregate from matched scholarships
  const totalPotentialFunding = matchedScholarships
    .filter(s => s.match.score >= 60)
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const formattedPotential = `₹${(totalPotentialFunding / 100000).toFixed(1)} Lakhs`;

  // Active applications
  const activeApps = applications.filter(a => ['Interested', 'Preparing', 'Submitted', 'Under Review'].includes(a.status));

  // Upcoming deadlines in next 45 days
  const upcomingDeadlines = [...SCHOLARSHIPS_DATA]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* 1. Welcome Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm relative overflow-hidden">
        <div 
          className="absolute right-0 top-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              Personalized Student Command Center
            </span>
            <span className="text-xs text-theme-muted hidden sm:inline">
              • Academic Profile: <strong>{profile.percentage}%</strong> ({profile.course})
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading tracking-tight">
            {getGreeting()}, {profile.name ? profile.name.split(' ')[0] : 'Scholar'}! ✨
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl">
            "Your next opportunity could be closer than you think." Track deadlines, organize documents, and unlock tailored funding opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={() => setShowSOPModal(true)}
            className="btn-outline px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <span>SOP Starter</span>
          </button>

          <Link
            to="/discover"
            className="btn-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-theme-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Opportunities</span>
          </Link>
        </div>
      </div>

      {/* 2. Key Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
        
        {/* Scholarships Matched */}
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
              Matches
            </span>
            <div className="w-7 h-7 rounded-lg bg-theme-secondary flex items-center justify-center text-theme-primary">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-theme-main font-heading">
            {totalMatchedCount}
          </div>
          <span className="text-[11px] text-theme-muted block truncate">
            Based on {profile.course}
          </span>
        </div>

        {/* Saved Opportunities */}
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
              Saved
            </span>
            <div className="w-7 h-7 rounded-lg bg-theme-secondary flex items-center justify-center text-theme-primary">
              <Bookmark className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-theme-main font-heading">
            {savedIds.length}
          </div>
          <Link to="/saved" className="text-[11px] font-bold text-theme-primary hover:underline block truncate">
            View Bookmarked →
          </Link>
        </div>

        {/* Applications in Progress */}
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
              In Progress
            </span>
            <div className="w-7 h-7 rounded-lg bg-theme-secondary flex items-center justify-center text-theme-primary">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-theme-main font-heading">
            {activeApps.length}
          </div>
          <Link to="/applications" className="text-[11px] font-bold text-theme-primary hover:underline block truncate">
            Kanban Board →
          </Link>
        </div>

        {/* Document Readiness */}
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
              Doc Vault
            </span>
            <div className="w-7 h-7 rounded-lg bg-theme-secondary flex items-center justify-center text-theme-primary">
              <FolderLock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 font-heading">
            {documentMetrics.percentage}%
          </div>
          <span className="text-[11px] text-theme-muted block truncate">
            {documentMetrics.ready} of {documentMetrics.total} Ready
          </span>
        </div>

        {/* Potential Funding */}
        <div className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
              Potential Aid
            </span>
            <div className="w-7 h-7 rounded-lg bg-theme-secondary flex items-center justify-center text-theme-primary">
              <Coins className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-2xl font-black text-theme-main font-heading">
            {formattedPotential}
          </div>
          <span className="text-[11px] text-theme-muted block truncate">
            Est. Eligible Grants
          </span>
        </div>
      </div>

      {/* 3. Smart Path Roadmap Stepper */}
      <SmartPath />

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Recommended Scholarships & Quick Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Best Matches */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-theme-main font-heading">
                  Top Profile Matches For You
                </h3>
                <p className="text-xs text-theme-muted">
                  Calculated against your degree in <strong>{profile.course}</strong> with <strong>{profile.percentage}%</strong> aggregate.
                </p>
              </div>
              <Link 
                to="/discover" 
                className="text-xs font-bold text-theme-primary hover:underline flex items-center gap-1"
              >
                <span>View All ({SCHOLARSHIPS_DATA.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bestMatches.slice(0, 2).map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          </div>

          {/* Application Pipeline Snapshot */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-theme-main font-heading flex items-center gap-2">
                  <FileText className="w-4 h-4 text-theme-primary" />
                  Active Application Tracker Snapshot
                </h3>
                <p className="text-xs text-theme-muted">
                  Real-time pipeline of your targeted funding applications.
                </p>
              </div>
              <Link to="/applications" className="btn-outline px-3 py-1.5 rounded-xl text-xs font-bold">
                Open Kanban
              </Link>
            </div>

            <div className="divide-y divide-theme">
              {applications.slice(0, 3).map((app) => (
                <div key={app.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <h5 className="font-bold text-theme-main line-clamp-1">{app.title}</h5>
                    <span className="text-[11px] text-theme-muted">{app.provider} • Due: {app.deadline}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    app.status === 'Approved' ? 'bg-emerald-500/15 text-emerald-700' :
                    app.status === 'Under Review' ? 'bg-indigo-500/15 text-indigo-700' :
                    app.status === 'Submitted' ? 'bg-blue-500/15 text-blue-700' :
                    'bg-theme-secondary text-theme-main'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="p-6 rounded-3xl bg-theme-secondary/40 border border-theme space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-theme-muted">
              Quick Action Shortcuts
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <Link
                to="/discover"
                className="p-3 rounded-2xl bg-theme-card border border-theme text-center hover:border-theme-primary transition-all flex flex-col items-center gap-1.5"
              >
                <Compass className="w-5 h-5 text-theme-primary" />
                <span className="text-xs font-bold text-theme-main">Find Grants</span>
              </Link>

              <Link
                to="/documents"
                className="p-3 rounded-2xl bg-theme-card border border-theme text-center hover:border-theme-primary transition-all flex flex-col items-center gap-1.5"
              >
                <FolderLock className="w-5 h-5 text-theme-primary" />
                <span className="text-xs font-bold text-theme-main">Audit Docs</span>
              </Link>

              <button
                onClick={() => setShowSOPModal(true)}
                className="p-3 rounded-2xl bg-theme-card border border-theme text-center hover:border-theme-primary transition-all flex flex-col items-center gap-1.5"
              >
                <Sparkles className="w-5 h-5 text-theme-primary" />
                <span className="text-xs font-bold text-theme-main">SOP Outline</span>
              </button>

              <Link
                to="/learn"
                className="p-3 rounded-2xl bg-theme-card border border-theme text-center hover:border-theme-primary transition-all flex flex-col items-center gap-1.5"
              >
                <GraduationCap className="w-5 h-5 text-theme-primary" />
                <span className="text-xs font-bold text-theme-main">Video Hub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Readiness Score, Deadline Radar & Learning */}
        <div className="space-y-8">
          
          {/* Application Readiness Score Card */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-theme-primary">
                Readiness Diagnostic
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-theme-secondary text-theme-main">
                Indicative
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div 
                className="w-18 h-18 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-theme-sm shrink-0"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                {readinessScore}%
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-theme-main font-heading">
                  Application Readiness
                </h4>
                <p className="text-xs text-theme-muted leading-relaxed">
                  Calculated from profile completion, document readiness, and pipeline activity.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-theme text-xs">
              <div className="flex justify-between items-center text-theme-muted">
                <span>Profile Parameters</span>
                <span className="font-bold text-emerald-600">30 / 30 pts</span>
              </div>
              <div className="flex justify-between items-center text-theme-muted">
                <span>Document Vault Ready</span>
                <span className="font-bold text-theme-primary">{documentMetrics.ready} of {documentMetrics.total} docs</span>
              </div>
              <div className="flex justify-between items-center text-theme-muted">
                <span>Active Target Pipeline</span>
                <span className="font-bold text-theme-main">{activeApps.length} tracked</span>
              </div>
            </div>
          </div>

          {/* Deadline Radar */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-theme-main font-heading flex items-center gap-2">
                <Clock className="w-4 h-4 text-theme-primary" />
                Deadline Radar
              </h3>
              <span className="text-xs font-semibold text-rose-500">Upcoming</span>
            </div>

            <div className="space-y-2.5">
              {upcomingDeadlines.map((opp) => (
                <Link
                  key={opp.id}
                  to={`/scholarships/${opp.id}`}
                  className="block p-3 rounded-2xl bg-theme-secondary/50 hover:bg-theme-secondary border border-theme transition-all group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-theme-main line-clamp-1 group-hover:text-theme-primary transition-colors">
                      {opp.title}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-theme-muted">
                    <span>{opp.formattedAmount}</span>
                    <span className="font-bold text-rose-500">{opp.deadline}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* YouTube Learning Recommendation */}
          <div className="p-5 rounded-3xl bg-theme-secondary/40 border border-theme space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-primary block">
              Featured Video Guide
            </span>
            <h4 className="text-sm font-extrabold text-theme-main font-heading">
              Writing Winning Personal Statements
            </h4>
            <p className="text-xs text-theme-muted leading-relaxed">
              Learn the 4-part structure that helps students win full funding in competitive fellowships.
            </p>
            <Link
              to="/learn"
              className="btn-outline w-full py-2 px-3 rounded-xl text-xs font-bold text-center block"
            >
              Stream Masterclass in Learn →
            </Link>
          </div>
        </div>
      </div>

      {/* SOP Generator Modal */}
      <SOPGeneratorModal
        isOpen={showSOPModal}
        onClose={() => setShowSOPModal(false)}
      />
    </div>
  );
}
