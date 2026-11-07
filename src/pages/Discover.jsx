import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  ArrowUpDown, 
  Sparkles, 
  Scale, 
  ShieldAlert, 
  RotateCcw,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateScholarshipMatch } from '../services/matchingService';
import ScholarshipCard from '../components/ScholarshipCard';
import ScholarshipComparisonModal from '../components/ScholarshipComparisonModal';

export default function Discover() {
  const { profile } = useStudent();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [onlyEligible, setOnlyEligible] = useState(false);
  const [maxIncomeFilter, setMaxIncomeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('best-match');

  // Compare Drawer state (up to 3)
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Available categories
  const categories = [
    'All',
    'STEM',
    'Computer Science',
    'Women in STEM',
    'Need-based',
    'Merit-based',
    'Study Abroad',
    'Arts & Design'
  ];

  const educationLevels = ['All', 'Undergraduate', 'Postgraduate'];

  // Comparison toggle handler
  const handleToggleCompare = (scholarship) => {
    setCompareList(prev => {
      const exists = prev.some(s => s.id === scholarship.id);
      if (exists) {
        return prev.filter(s => s.id !== scholarship.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 scholarships at a time.');
          return prev;
        }
        return [...prev, scholarship];
      }
    });
  };

  const handleRemoveCompare = (id) => {
    setCompareList(prev => prev.filter(s => s.id !== id));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setOnlyEligible(false);
    setMaxIncomeFilter('all');
    setSortBy('best-match');
  };

  // Filter & Sort Logic
  const filteredScholarships = useMemo(() => {
    return SCHOLARSHIPS_DATA.filter((s) => {
      // 1. Text Search (title, provider, eligible courses, summary, location)
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const titleMatch = s.title.toLowerCase().includes(q);
        const providerMatch = s.provider.toLowerCase().includes(q);
        const summaryMatch = s.summary.toLowerCase().includes(q);
        const locationMatch = s.location.toLowerCase().includes(q);
        const courseMatch = (s.eligibleCourses || []).some(c => c.toLowerCase().includes(q));
        const tagMatch = (s.tags || []).some(t => t.toLowerCase().includes(q));
        if (!titleMatch && !providerMatch && !summaryMatch && !locationMatch && !courseMatch && !tagMatch) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'All' && s.category !== selectedCategory) {
        return false;
      }

      // 3. Education Level
      if (selectedLevel !== 'All' && s.educationLevel !== selectedLevel && s.educationLevel !== 'All') {
        return false;
      }

      // 4. Max Income Ceiling filter
      if (maxIncomeFilter !== 'all') {
        const ceiling = parseInt(maxIncomeFilter, 10);
        if (s.maxAnnualIncome && s.maxAnnualIncome < ceiling) {
          return false;
        }
      }

      // 5. Only Eligible Toggle (based on student profile score >= 60%)
      if (onlyEligible) {
        const match = calculateScholarshipMatch(profile, s);
        if (match.score < 60) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'best-match') {
        const matchA = calculateScholarshipMatch(profile, a).score;
        const matchB = calculateScholarshipMatch(profile, b).score;
        return matchB - matchA;
      }
      if (sortBy === 'highest-funding') {
        return (b.amount || 0) - (a.amount || 0);
      }
      if (sortBy === 'nearest-deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      }
      if (sortBy === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedLevel, maxIncomeFilter, onlyEligible, sortBy, profile]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              Discovery Engine
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <ShieldAlert className="w-2.5 h-2.5" />
              16 DEMO RECORDS
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading">
            Discover Scholarships & Grants
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl">
            Search, filter, and calculate transparent match diagnostics for student funding opportunities across India and globally.
          </p>
        </div>

        {/* Comparison Trigger Pill */}
        {compareList.length > 0 && (
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-theme-secondary border border-theme-primary">
            <Scale className="w-4 h-4 text-theme-primary" />
            <span className="text-xs font-bold text-theme-main">
              {compareList.length} Selected
            </span>
            <button
              onClick={() => setShowCompareModal(true)}
              className="btn-primary py-1.5 px-3 rounded-xl text-xs font-bold shadow-xs"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-theme-muted hover:text-rose-500"
              title="Clear comparison list"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-5 sm:p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
        
        {/* Search Bar & Sorter */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-3 relative">
            <Search className="w-4 h-4 text-theme-muted absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by scholarship name, provider, course (e.g. Computer Science), or keywords..."
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-theme-muted hover:text-theme-main"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <ArrowUpDown className="w-4 h-4 text-theme-muted absolute left-3.5 top-3" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
            >
              <option value="best-match">Sort: Best Match Score</option>
              <option value="highest-funding">Sort: Highest Funding</option>
              <option value="nearest-deadline">Sort: Nearest Deadline</option>
              <option value="alphabetical">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Filter Categories Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-theme/60">
          <span className="text-xs font-bold text-theme-muted flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5 text-theme-primary" />
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'btn-primary shadow-xs'
                  : 'bg-theme-secondary text-theme-muted hover:text-theme-main border border-theme'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filters: Level, Income, Eligible only */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-theme-muted">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-2.5 py-1 rounded-xl border border-theme bg-theme-main text-theme-main text-xs font-medium"
              >
                {educationLevels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="font-bold text-theme-muted">Income Cap:</span>
              <select
                value={maxIncomeFilter}
                onChange={(e) => setMaxIncomeFilter(e.target.value)}
                className="px-2.5 py-1 rounded-xl border border-theme bg-theme-main text-theme-main text-xs font-medium"
              >
                <option value="all">All Income Ceilings</option>
                <option value="350000">Up to ₹3.5 Lakhs</option>
                <option value="600000">Up to ₹6.0 Lakhs</option>
                <option value="800000">Up to ₹8.0 Lakhs</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyEligible}
                onChange={(e) => setOnlyEligible(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span className="font-bold text-theme-main">
                Show Only High Matches (≥60%)
              </span>
            </label>
          </div>

          {(searchQuery || selectedCategory !== 'All' || selectedLevel !== 'All' || onlyEligible || maxIncomeFilter !== 'all') && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-theme-primary hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Meta */}
      <div className="flex items-center justify-between text-xs text-theme-muted px-1">
        <span>
          Showing <strong>{filteredScholarships.length}</strong> opportunities
          {filteredScholarships.length !== SCHOLARSHIPS_DATA.length && ` (filtered from ${SCHOLARSHIPS_DATA.length})`}
        </span>
        <span className="text-theme-subtle">
          Scores calculated against profile: {profile.course} ({profile.percentage}%)
        </span>
      </div>

      {/* Cards Grid */}
      {filteredScholarships.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-theme-card border border-theme space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-theme-secondary flex items-center justify-center mx-auto text-theme-primary">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-theme-main font-heading">
            No scholarships found matching your query
          </h3>
          <p className="text-xs sm:text-sm text-theme-muted max-w-md mx-auto">
            Try adjusting your search keywords, broadening category filters, or unchecking the "High Matches Only" toggle.
          </p>
          <button
            onClick={clearAllFilters}
            className="btn-primary px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map((s) => (
            <ScholarshipCard
              key={s.id}
              scholarship={s}
              onSelectForCompare={handleToggleCompare}
              isSelectedForCompare={compareList.some(item => item.id === s.id)}
            />
          ))}
        </div>
      )}

      {/* Standalone Comparison Modal */}
      <ScholarshipComparisonModal
        scholarships={compareList}
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        onRemove={handleRemoveCompare}
      />
    </div>
  );
}
