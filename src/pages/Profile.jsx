import React, { useState } from 'react';
import { 
  User, 
  GraduationCap, 
  Coins, 
  Sparkles, 
  Save, 
  RotateCcw, 
  ShieldAlert, 
  CheckCircle2, 
  Palette, 
  Bell, 
  MapPin, 
  Mail, 
  Phone, 
  Check,
  AlertTriangle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';
import { useTheme } from '../context/ThemeContext';

export default function Profile() {
  const { profile, updateProfile, resetAllData } = useStudent();
  const { theme, setTheme, themes } = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const availableInterests = [
    'STEM',
    'Computer Science',
    'Women in STEM',
    'Need-based',
    'Merit-based',
    'Study Abroad',
    'Arts & Design',
    'First-Gen Student',
    'Rural Upliftment',
    'Medical & Healthcare'
  ];

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const interests = prev.interests || [];
      const exists = interests.includes(interest);
      if (exists) {
        return { ...prev, interests: interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...interests, interest] };
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);

    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch {
      // silent
    }
  };

  const handleConfirmReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    setFormData({ ...profile });
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-theme-sm shrink-0"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {profile.name ? profile.name.charAt(0) : 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-theme-main font-heading">
                {profile.name || 'Student Profile'}
              </h1>
              <span className="badge-pill bg-emerald-500/15 text-emerald-700 text-[10px] font-bold">
                Active Scholar
              </span>
            </div>
            <p className="text-xs text-theme-muted mt-0.5">
              {profile.degree} in {profile.course} • {profile.college}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {!isEditing ? (
            <button
              onClick={() => {
                setFormData({ ...profile });
                setIsEditing(true);
              }}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-bold shadow-xs"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="btn-outline px-4 py-2 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {savedToast && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully! Match scores recalculated across catalog.</span>
        </div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Academic & Educational Information */}
        <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-theme">
            <GraduationCap className="w-4 h-4 text-theme-primary" />
            <h3 className="text-sm font-extrabold text-theme-main font-heading uppercase tracking-wider">
              Educational Qualifications & Institution
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-theme-main mb-1">Affiliated College / University</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.college}
                onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Enrolled Course / Major</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.course}
                onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Degree Level</label>
              <select
                disabled={!isEditing}
                value={formData.degreeLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, degreeLevel: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              >
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
                <option value="Diploma">Diploma / Vocational</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Current Academic Year</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.academicYear}
                onChange={(e) => setFormData(prev => ({ ...prev, academicYear: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Aggregate Academic Score (% or CGPA)</label>
              <input
                type="number"
                step="0.1"
                disabled={!isEditing}
                value={formData.percentage}
                onChange={(e) => setFormData(prev => ({ ...prev, percentage: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Annual Household Income (INR)</label>
              <input
                type="number"
                step="10000"
                disabled={!isEditing}
                value={formData.annualIncome}
                onChange={(e) => setFormData(prev => ({ ...prev, annualIncome: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Regional Details */}
        <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-theme">
            <User className="w-4 h-4 text-theme-primary" />
            <h3 className="text-sm font-extrabold text-theme-main font-heading uppercase tracking-wider">
              Contact & Domicile Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-theme-main mb-1">Full Legal Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Registered Student Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">State / Province</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>

            <div>
              <label className="block font-bold text-theme-main mb-1">Country</label>
              <input
                type="text"
                disabled={!isEditing}
                value={formData.country}
                onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                className={`w-full px-3 py-2 rounded-xl border border-theme bg-theme-main text-theme-main focus:outline-none ${!isEditing ? 'opacity-80' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Scholarship Interests */}
        <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-theme">
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <h3 className="text-sm font-extrabold text-theme-main font-heading uppercase tracking-wider">
              Target Funding Categories
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {availableInterests.map((interest) => {
              const selected = (formData.interests || []).includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  disabled={!isEditing}
                  onClick={() => handleInterestToggle(interest)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    selected
                      ? 'bg-theme-secondary text-theme-main border border-theme-primary font-bold'
                      : 'bg-theme-main text-theme-muted border border-theme'
                  } ${!isEditing ? 'cursor-default' : 'cursor-pointer hover:border-theme-primary'}`}
                >
                  <span>{interest}</span>
                  {selected && <Check className="w-3 h-3 text-theme-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button (when editing) */}
        {isEditing && (
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-outline px-5 py-2.5 rounded-xl text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary px-7 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-theme-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        )}
      </form>

      {/* Section 4: Visual Theme Preference */}
      <div className="p-6 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-theme">
          <Palette className="w-4 h-4 text-theme-primary" />
          <h3 className="text-sm font-extrabold text-theme-main font-heading uppercase tracking-wider">
            Quick Visual Theme Selection
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {themes.map((th) => {
            const isSelected = theme === th.id;
            return (
              <button
                key={th.id}
                onClick={() => setTheme(th.id)}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'border-theme-primary bg-theme-secondary ring-2 ring-primary/20 shadow-xs'
                    : 'border-theme bg-theme-main hover:border-theme-primary'
                }`}
              >
                <div 
                  className="w-6 h-6 rounded-full border border-black/10"
                  style={{ backgroundColor: th.colors.primary }}
                />
                <span className="text-[11px] font-bold text-theme-main truncate max-w-full">
                  {th.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 5: Reset All Demo Data (Destructive Action with confirmation) */}
      <div className="p-6 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h4 className="text-xs font-bold text-rose-800 dark:text-rose-200 uppercase tracking-wider">
            Reset Demo Data & LocalStorage
          </h4>
        </div>

        <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
          Need to test the initial state or re-run the onboarding wizard? This action resets your saved scholarships, custom applications, and document checklist to default mock values.
        </p>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-xs"
          >
            Reset All Stored Data
          </button>
        ) : (
          <div className="p-4 rounded-2xl bg-white dark:bg-rose-950/80 border border-rose-300 dark:border-rose-800 space-y-3">
            <span className="text-xs font-bold text-rose-700 block">
              Are you sure? This will restore all data back to original hackathon mock state.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleConfirmReset}
                className="px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-1.5 rounded-xl text-xs font-bold border border-theme text-theme-main hover:bg-theme-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
