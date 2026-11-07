import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Search, 
  Scale, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  ShieldAlert, 
  Compass,
  ArrowUpDown
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { SCHOLARSHIPS_DATA } from '../data/scholarships';
import { calculateScholarshipMatch } from '../services/matchingService';
import ScholarshipCard from '../components/ScholarshipCard';
import ScholarshipComparisonModal from '../components/ScholarshipComparisonModal';

export default function SavedScholarships() {
  const { savedIds, toggleSaveScholarship, profile } = useStudent();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match');

  // Compare selection (up to 3)
  const [compareList, setCompareList] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Retrieve saved scholarships from data
  const savedScholarships = SCHOLARSHIPS_DATA.filter(s => savedIds.includes(s.id));

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

  const filteredSaved = savedScholarships.filter((s) => {
    const q = searchQuery.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q);
  }).sort((a, b) => {
    if (sortBy === 'match') {
      return calculateScholarshipMatch(profile, b).score - calculateScholarshipMatch(profile, a).score;
    }
    if (sortBy === 'funding') {
      return (b.amount || 0) - (a.amount || 0);
    }
    if (sortBy === 'deadline') {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              Bookmarked Opportunities
            </span>
            <span className="text-xs text-theme-muted">
              • <strong>{savedScholarships.length} Saved</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading">
            Saved Scholarships & Comparison
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl">
            Review your shortlisted opportunities, monitor deadlines, and compare eligibility criteria side-by-side.
          </p>
        </div>

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
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Toolbar */}
      {savedScholarships.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-theme-card border border-theme">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved opportunities..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-theme-muted" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs border border-theme bg-theme-main text-theme-main font-semibold focus:outline-none"
            >
              <option value="match">Sort by Match Score</option>
              <option value="funding">Sort by Highest Funding</option>
              <option value="deadline">Sort by Nearest Deadline</option>
            </select>
          </div>
        </div>
      )}

      {/* Content Grid */}
      {savedScholarships.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-theme-card border border-theme space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-theme-secondary flex items-center justify-center mx-auto text-theme-primary">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-extrabold text-theme-main font-heading">
            No saved scholarships yet
          </h3>
          <p className="text-xs sm:text-sm text-theme-muted max-w-md mx-auto">
            Click the bookmark icon on any scholarship in the Discover catalog to save it here for quick tracking and comparison.
          </p>
          <Link
            to="/discover"
            className="btn-primary px-6 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-theme-sm"
          >
            <Compass className="w-4 h-4" />
            <span>Discover Scholarships</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSaved.map((s) => (
            <ScholarshipCard
              key={s.id}
              scholarship={s}
              onSelectForCompare={handleToggleCompare}
              isSelectedForCompare={compareList.some(item => item.id === s.id)}
            />
          ))}
        </div>
      )}

      {/* Comparison Modal */}
      <ScholarshipComparisonModal
        scholarships={compareList}
        isOpen={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        onRemove={handleRemoveCompare}
      />
    </div>
  );
}
