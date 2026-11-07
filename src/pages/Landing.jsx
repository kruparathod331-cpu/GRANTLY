import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  CheckCircle2, 
  FolderLock, 
  FileText, 
  GraduationCap, 
  Palette, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  Clock, 
  Users, 
  HelpCircle,
  Lightbulb,
  Heart
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import ScholarshipCard from '../components/ScholarshipCard';

export default function Landing() {
  const { profile } = useStudent();
  const featuredScholarships = SCHOLARSHIPS_DATA.filter(s => s.featured).slice(0, 3);

  const steps = [
    { num: '01', title: 'DISCOVER', desc: 'Browse verified high-value scholarships, fellowships & student grants.' },
    { num: '02', title: 'MATCH', desc: 'Transparent profile diagnostics calculate eligibility without guesswork.' },
    { num: '03', title: 'UNDERSTAND', desc: 'Break down complex government & trust criteria into clear checklists.' },
    { num: '04', title: 'PREPARE', desc: 'Organize verified marksheets, income certificates & winning SOP drafts.' },
    { num: '05', title: 'APPLY', desc: 'Navigate application deadlines with automated reminders and guides.' },
    { num: '06', title: 'TRACK', desc: 'Manage your pipeline on a fluid Kanban board from Interest to Approval.' },
    { num: '07', title: 'LEARN', desc: 'Stream video masterclasses on essay writing, interviews & overseas funding.' },
  ];

  const valueProps = [
    {
      title: 'Zero Algorithmic Black Box',
      desc: 'Our transparent "Why This Match?" engine explains every satisfied and missing requirement so students know exactly where they stand.',
      icon: ShieldCheck,
    },
    {
      title: 'Built for Indian & Global Students',
      desc: 'From state need-based fee waivers to QS Top 100 international fellowships, discover funding across engineering, arts, medicine, and research.',
      icon: Compass,
    },
    {
      title: 'Centralized Document Vault',
      desc: 'Keep transcripts, income proofs, and recommendation letters audit-ready. Never scramble 10 minutes before a deadline portal closes.',
      icon: FolderLock,
    },
    {
      title: 'Contextual AI Companion',
      desc: 'GRANTLY AI helps outline your Statement of Purpose, answers financial aid terminology, and flags impending application cut-offs.',
      icon: Sparkles,
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Soft background ambient glows */}
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] rounded-full blur-3xl opacity-25 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          
          {/* Creator Innovation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-secondary border border-theme shadow-xs animate-in fade-in">
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <span className="text-xs font-bold text-theme-main">
              An original student innovation by <strong className="text-theme-primary">Krupa Rathod</strong> ✦
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-theme-main font-heading tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Your Future Is Worth <span className="text-theme-primary underline decoration-theme-primary/30 decoration-wavy">Funding.</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-theme-muted max-w-2xl mx-auto leading-relaxed font-normal">
            Discover scholarships that match your potential, prepare stronger applications, and manage every opportunity in one place.
          </p>

          {/* Primary & Secondary Call to Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/discover"
              className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold flex items-center justify-center gap-2 shadow-theme-md"
            >
              <span>Find My Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="btn-outline w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm sm:text-base font-extrabold flex items-center justify-center gap-2"
            >
              <span>Explore GRANTLY</span>
            </Link>
          </div>

          {/* Micro social proof / metrics */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-theme-muted">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              16+ Verified Demo Scholarships
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Transparent Match Diagnostics
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Interactive YouTube Learn Hub
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              6 Dynamic UI Themes
            </span>
          </div>

          {/* Hero Visual: Mockup Showcase Dashboard */}
          <div className="mt-12 sm:mt-16 rounded-3xl border border-theme bg-theme-card p-3 sm:p-6 shadow-theme-lg text-left max-w-5xl mx-auto overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-theme text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                <span className="ml-2 font-mono text-theme-muted hidden sm:inline">grantly.app/dashboard</span>
              </div>
              <span className="text-[11px] font-bold text-theme-primary bg-theme-secondary px-2.5 py-1 rounded-full">
                Live Prototype Preview
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-theme-secondary/50 border border-theme space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
                  Funding Discovered
                </span>
                <div className="text-2xl font-black text-theme-main font-heading">
                  ₹18,50,000+
                </div>
                <p className="text-xs text-theme-muted">Across 8 matched engineering & merit opportunities.</p>
              </div>

              <div className="p-4 rounded-2xl bg-theme-secondary/50 border border-theme space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
                  Application Readiness
                </span>
                <div className="text-2xl font-black text-emerald-600 font-heading">
                  85% Ready
                </div>
                <p className="text-xs text-theme-muted">5 of 6 essential verification documents ready.</p>
              </div>

              <div className="p-4 rounded-2xl bg-theme-secondary/50 border border-theme space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted">
                  Next Urgent Deadline
                </span>
                <div className="text-2xl font-black text-rose-500 font-heading">
                  Nov 28, 2026
                </div>
                <p className="text-xs text-theme-muted">Aditi Empower STEM Fellowship (18 days remaining).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW GRANTLY WORKS (7-STAGE JOURNEY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-theme-primary">
            The Product Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-theme-main font-heading">
            How GRANTLY Works
          </h2>
          <p className="text-sm text-theme-muted">
            The student journey shouldn't be fragmented across 20 unverified portals. Here is our seamless 7-step architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-4 rounded-2xl bg-theme-card border border-theme shadow-xs hover:border-theme-primary transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-black font-heading text-theme-primary block mb-2">
                  {st.num}
                </span>
                <h3 className="font-extrabold text-sm text-theme-main font-heading mb-1">
                  {st.title}
                </h3>
                <p className="text-xs text-theme-muted leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED SCHOLARSHIPS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary block mb-1">
              Curated Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-main font-heading">
              Featured High-Impact Scholarships
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted mt-1">
              Explore high-value fellowships across engineering, women in tech, and grassroots need-based aid.
            </p>
          </div>
          <Link
            to="/discover"
            className="btn-outline px-4 py-2 rounded-xl text-xs font-bold self-start sm:self-auto flex items-center gap-1.5"
          >
            <span>View All 16 Scholarships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredScholarships.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      </section>

      {/* 4. WHY STUDENTS NEED GRANTLY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-theme-secondary/40 border border-theme p-8 sm:p-12 space-y-10">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-theme-primary">
              Solving Real Student Friction
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-main font-heading">
              Why Students Need GRANTLY
            </h2>
            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
              Every year, thousands of crores in scholarship funds remain unallocated or missed because students discover deadlines 24 hours too late or misread eligibility clauses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((vp, i) => {
              const Icon = vp.icon;
              return (
                <div key={i} className="p-5 rounded-2xl bg-theme-card border border-theme space-y-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--primary)' }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-theme-main font-heading">
                    {vp.title}
                  </h4>
                  <p className="text-xs text-theme-muted leading-relaxed">
                    {vp.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. ABOUT THE CREATOR (MANDATORY REQUIREMENT) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme shadow-theme-sm relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: 'var(--primary)' }}
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-theme-sm shrink-0"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              KR
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-theme-primary uppercase tracking-wider">
                  Product Creator & Architect
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-theme-secondary text-theme-main">
                  The Outpost Hackathon
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-theme-main font-heading">
                About the Creator — Krupa Rathod
              </h3>

              {/* Exact wording requested in prompt section 2 */}
              <p className="text-xs sm:text-sm text-theme-muted leading-relaxed font-normal">
                "GRANTLY is an independently developed student-focused project created by <strong className="text-theme-main font-bold">Krupa Rathod</strong>, designed to make educational financial assistance easier to discover, understand and manage."
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-theme-muted">
                <span className="flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5 text-theme-primary" />
                  Frontend Architecture & UX Design
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold">
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  Empowering Student Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
        <div 
          className="rounded-3xl p-10 sm:p-16 border border-theme shadow-theme-md text-center space-y-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%)' }}
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="badge-pill bg-theme-primary text-white text-xs">
              Take Control of Your Funding Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-theme-main font-heading tracking-tight">
              Ready to find scholarships that fit you?
            </h2>
            <p className="text-sm sm:text-base text-theme-muted">
              Start by discovering matching opportunities, organizing your Document Vault, and tracking applications with zero stress.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/onboarding"
              className="btn-primary px-8 py-3.5 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 shadow-theme-md"
            >
              <span>Personalize My Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/discover"
              className="btn-outline px-8 py-3.5 rounded-2xl text-sm font-extrabold"
            >
              <span>Browse Catalog (16 Demo Grants)</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
