import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Bookmark, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Plus, 
  Check, 
  Share2, 
  Scale, 
  ExternalLink,
  FolderLock
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateScholarshipMatch } from '../services/matchingService';
import SOPGeneratorModal from '../components/SOPGeneratorModal';
import ScholarshipComparisonModal from '../components/ScholarshipComparisonModal';

export default function ScholarshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    profile, 
    isScholarshipSaved, 
    toggleSaveScholarship, 
    applications, 
    addApplication, 
    documents 
  } = useStudent();

  const [showSOPModal, setShowSOPModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  const scholarship = SCHOLARSHIPS_DATA.find(s => s.id === id);

  if (!scholarship) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-theme-main font-heading">
          Scholarship Not Found
        </h2>
        <p className="text-xs sm:text-sm text-theme-muted">
          The requested opportunity could not be located in our demo catalog.
        </p>
        <Link to="/discover" className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold inline-block">
          Return to Discover
        </Link>
      </div>
    );
  }

  const saved = isScholarshipSaved(scholarship.id);
  const matchResult = calculateScholarshipMatch(profile, scholarship);
  const isAlreadyApplied = applications.some(a => a.scholarshipId === scholarship.id);

  // Compare handler
  const handleAddToCompare = () => {
    setCompareList([scholarship]);
    setShowCompareModal(true);
  };

  const handleTrackApplication = () => {
    if (isAlreadyApplied) return;
    addApplication({
      scholarshipId: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      amount: scholarship.formattedAmount,
      deadline: scholarship.deadline,
      status: 'Interested',
      notes: `Saved to tracker from detail breakdown. Match score: ${matchResult.score}%.`,
    });
    navigate('/applications');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-theme-muted hover:text-theme-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Scholarship Catalog</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCompare}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl border border-theme bg-theme-card text-xs font-bold text-theme-main hover:bg-theme-secondary transition-colors flex items-center gap-1.5"
            title="Compare this opportunity"
          >
            <Scale className="w-3.5 h-3.5 text-theme-primary" />
            <span className="hidden sm:inline">Compare</span>
          </button>

          <button
            onClick={() => toggleSaveScholarship(scholarship.id)}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              saved 
                ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-500'
                : 'border-theme bg-theme-card text-theme-muted hover:text-rose-500 hover:bg-theme-secondary'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{saved ? 'Saved' : 'Save Opportunity'}</span>
          </button>
        </div>
      </div>

      {/* Main Header Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
            {scholarship.category}
          </span>
          <span className="badge-pill bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1">
            <ShieldAlert className="w-3 h-3" />
            DEMO DATA RECORD
          </span>
          <span className="text-xs text-theme-muted font-medium">
            Published for The Outpost Hackathon
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading leading-tight">
            {scholarship.title}
          </h1>
          <p className="text-sm font-semibold text-theme-primary">
            Administered by {scholarship.provider}
          </p>
        </div>

        {/* Highlight Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-theme-secondary/50 border border-theme/60">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Funding Support
            </span>
            <span className="text-lg font-black text-theme-main font-heading">
              {scholarship.formattedAmount}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Degree Level
            </span>
            <span className="text-sm font-bold text-theme-main">
              {scholarship.educationLevel}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Academic Cutoff
            </span>
            <span className="text-sm font-bold text-theme-main">
              Min {scholarship.minPercentage}% marks
            </span>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Deadline Date
            </span>
            <span className="text-sm font-bold text-rose-500">
              {scholarship.deadline}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setShowApplyModal(true)}
            className="btn-primary px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-theme-md"
          >
            <span>Simulate Application Portal</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          <button
            onClick={handleTrackApplication}
            disabled={isAlreadyApplied}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              isAlreadyApplied
                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                : 'btn-outline'
            }`}
          >
            {isAlreadyApplied ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{isAlreadyApplied ? 'Added in Application Tracker' : 'Add to Application Tracker'}</span>
          </button>

          <button
            onClick={() => setShowSOPModal(true)}
            className="btn-outline px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <span>Generate SOP Outline</span>
          </button>
        </div>
      </div>

      {/* Grid: Left Breakdown + Right Why This Match Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Overview, Eligibility, Required Documents, Steps */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Overview */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-3">
            <h3 className="text-lg font-extrabold text-theme-main font-heading">
              Opportunity Overview
            </h3>
            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed font-normal">
              {scholarship.overview}
            </p>
          </div>

          {/* Stated Eligibility Requirements */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <h3 className="text-lg font-extrabold text-theme-main font-heading">
              Eligibility Requirements
            </h3>
            <ul className="space-y-2.5">
              {scholarship.eligibilityCriteria.map((crit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-theme-main">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents Checklist */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-theme-main font-heading flex items-center gap-2">
                <FolderLock className="w-5 h-5 text-theme-primary" />
                Required Verification Documents
              </h3>
              <Link to="/documents" className="text-xs font-bold text-theme-primary hover:underline">
                Open Document Vault →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scholarship.requiredDocuments.map((docName, idx) => {
                // Check if user has this document ready in vault
                const hasInVault = documents.some(
                  d => d.status === 'Ready' && d.name.toLowerCase().includes(docName.toLowerCase().slice(0, 10))
                );

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-theme-secondary/40 border border-theme flex items-center justify-between gap-2"
                  >
                    <span className="text-xs font-bold text-theme-main">{docName}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      hasInVault 
                        ? 'bg-emerald-500/15 text-emerald-700' 
                        : 'bg-amber-500/15 text-amber-700'
                    }`}>
                      {hasInVault ? 'Ready in Vault' : 'Check Vault'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Application Steps & Roadmap */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <h3 className="text-lg font-extrabold text-theme-main font-heading">
              Application Steps & Selection Process
            </h3>
            <div className="space-y-3">
              {scholarship.applicationSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                  <span 
                    className="w-6 h-6 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 mt-0.5"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-theme-muted leading-relaxed font-normal pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: "Why This Match?" Diagnostic Engine */}
        <div className="space-y-8">
          
          {/* Transparent Match Diagnostics Box */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-theme-primary flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Why This Match?
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                matchResult.score >= 80 ? 'bg-emerald-500/15 text-emerald-700' :
                matchResult.score >= 60 ? 'bg-indigo-500/15 text-indigo-700' :
                'bg-amber-500/15 text-amber-700'
              }`}>
                {matchResult.score}% • {matchResult.label}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-theme-secondary/60 border border-theme text-xs space-y-1">
              <span className="font-bold text-theme-main block">Evaluation Summary</span>
              <p className="text-theme-muted leading-relaxed">
                Calculated for <strong>{profile.name}</strong> enrolled in <strong>{profile.course}</strong> at {profile.college}.
              </p>
            </div>

            {/* Satisfied criteria */}
            {matchResult.satisfiedCriteria.length > 0 && (
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                  Satisfied Requirements ({matchResult.satisfiedCriteria.length})
                </h5>
                <ul className="space-y-1.5">
                  {matchResult.satisfiedCriteria.map((sat, i) => (
                    <li key={i} className="text-xs text-theme-main flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Missing or Unmet criteria */}
            {(matchResult.unmetCriteria.length > 0 || matchResult.missingInfo.length > 0) && (
              <div className="space-y-2 pt-2 border-t border-theme">
                <h5 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  Notes & Action Items
                </h5>
                <ul className="space-y-1.5">
                  {matchResult.unmetCriteria.map((unm, i) => (
                    <li key={i} className="text-xs text-theme-muted flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                      <span>{unm}</span>
                    </li>
                  ))}
                  {matchResult.missingInfo.map((mis, i) => (
                    <li key={i} className="text-xs text-theme-muted flex items-start gap-2">
                      <AlertCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{mis}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Step Advice */}
            <div className="p-3.5 rounded-2xl bg-theme-main border border-theme text-xs space-y-1">
              <span className="font-bold text-theme-primary block">Recommended Next Step</span>
              <p className="text-theme-muted">{matchResult.nextAction}</p>
            </div>

            <p className="text-[10px] text-theme-subtle leading-tight">
              {matchResult.disclaimer}
            </p>
          </div>

          {/* Timeline & Milestone Dates */}
          <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
            <h4 className="text-base font-extrabold text-theme-main font-heading flex items-center gap-2">
              <Calendar className="w-4 h-4 text-theme-primary" />
              Application Timeline
            </h4>
            
            <div className="space-y-3 relative pl-4 border-l-2 border-theme-primary/40 ml-2">
              {scholarship.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-theme-primary"></div>
                  <span className="text-[11px] font-bold text-theme-primary block">{item.date}</span>
                  <span className="text-xs text-theme-main font-medium">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-theme-card border border-theme shadow-theme-lg p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-theme">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-extrabold text-theme-main font-heading">
                  Simulated Application Portal
                </h3>
              </div>
              <button 
                onClick={() => setShowApplyModal(false)}
                className="text-theme-muted hover:text-theme-main"
              >
                ✕
              </button>
            </div>

            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
              This opportunity is a <strong>high-fidelity fictional demo record</strong> created for <em>THE OUTPOST Hackathon</em>. In a production build, this button routes to the official trust's authenticated API or government portal.
            </p>

            <div className="p-4 rounded-2xl bg-theme-secondary/70 border border-theme space-y-2">
              <span className="text-xs font-bold text-theme-main block">
                Next Step Action Checklist:
              </span>
              <ul className="text-xs text-theme-muted space-y-1">
                <li>• Add this opportunity to your Kanban Application Tracker.</li>
                <li>• Verify Income Certificate & Grade Transcripts in Document Vault.</li>
                <li>• Draft your 4-section Statement of Purpose using the SOP Starter.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowApplyModal(false)}
                className="btn-outline px-4 py-2 rounded-xl text-xs font-bold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleTrackApplication();
                  setShowApplyModal(false);
                }}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-bold shadow-xs"
              >
                Track in My Applications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOP Generator Modal */}
      <SOPGeneratorModal
        isOpen={showSOPModal}
        onClose={() => setShowSOPModal(false)}
        defaultScholarship={scholarship}
      />

      {/* Comparison Modal */}
      <ScholarshipComparisonModal
        scholarships={compareList}
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        onRemove={() => setCompareList([])}
      />
    </div>
  );
}
