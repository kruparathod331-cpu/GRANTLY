import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  GraduationCap, 
  Coins, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStudent } from '../context/StudentContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useStudent();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: profile.name || '',
    email: profile.email || '',
    phone: profile.phone || '',
    country: profile.country || 'India',
    state: profile.state || 'Maharashtra',
    college: profile.college || 'National Institute of Technology, Mumbai',
    degree: profile.degree || 'B.Tech',
    degreeLevel: profile.degreeLevel || 'Undergraduate',
    course: profile.course || 'Computer Science',
    academicYear: profile.academicYear || '3rd Year',
    percentage: profile.percentage || '84.5',
    annualIncome: profile.annualIncome || '450000',
    interests: profile.interests || ['STEM', 'Computer Science', 'Merit-based'],
    preferredLocation: profile.preferredLocation || 'All India & Global',
  });

  const totalSteps = 3;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Final submission
      updateProfile(formData);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // silent fallback
      }

      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Onboarding Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-theme-secondary text-xs font-bold text-theme-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Step {step} of {totalSteps}: Personalized Student Setup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-theme-main font-heading">
          {step === 1 && "Personal & Academic Background"}
          {step === 2 && "Degree & Course Details"}
          {step === 3 && "Financial Context & Preferences"}
        </h1>
        <p className="text-xs sm:text-sm text-theme-muted">
          We use this data locally in your browser to calculate transparent scholarship matches.
        </p>

        {/* Stepper Progress Bar */}
        <div className="w-full bg-theme-secondary h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${(step / totalSteps) * 100}%`,
              backgroundColor: 'var(--primary)' 
            }}
          />
        </div>
      </div>

      {/* Form Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-md">
        <form onSubmit={handleNext} className="space-y-6">
          
          {/* STEP 1: Personal & Basic Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1.5">
                  Full Student Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="student@college.edu.in"
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Country of Study *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => handleChange('country', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    State / Region *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Telangana">Telangana</option>
                    <option value="All India">Other / All India</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Academic Details */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1.5">
                  College / University Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.college}
                  onChange={(e) => handleChange('college', e.target.value)}
                  placeholder="e.g. National Institute of Technology, Mumbai"
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Degree Level *
                  </label>
                  <select
                    value={formData.degreeLevel}
                    onChange={(e) => handleChange('degreeLevel', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  >
                    <option value="Undergraduate">Undergraduate (B.Tech, B.Sc, B.A, B.Com)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech, M.S, M.Sc, M.A)</option>
                    <option value="Diploma">Diploma / Vocational</option>
                    <option value="Doctoral">PhD / Research Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Degree Title
                  </label>
                  <input
                    type="text"
                    value={formData.degree}
                    onChange={(e) => handleChange('degree', e.target.value)}
                    placeholder="e.g. B.Tech / B.E."
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Primary Course / Major *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  >
                    <option value="Computer Science">Computer Science & IT</option>
                    <option value="Artificial Intelligence">Artificial Intelligence & Data Science</option>
                    <option value="Electrical Engineering">Electrical & Electronics</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Biotechnology">Biotechnology & Life Sciences</option>
                    <option value="Commerce">Commerce & Economics</option>
                    <option value="Arts">Humanities, Law & Arts</option>
                    <option value="Medicine">Medicine & Nursing</option>
                    <option value="Design">Design, Architecture & Fine Arts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1.5">
                    Academic Year *
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => handleChange('academicYear', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  >
                    <option value="1st Year">1st Year (Freshman)</option>
                    <option value="2nd Year">2nd Year (Sophomore)</option>
                    <option value="3rd Year">3rd Year (Junior)</option>
                    <option value="4th Year">4th Year (Senior)</option>
                    <option value="Final Year">Final Year / Graduating</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1.5">
                  Aggregate Academic Percentage or CGPA *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="40"
                    max="100"
                    required
                    value={formData.percentage}
                    onChange={(e) => handleChange('percentage', e.target.value)}
                    placeholder="e.g. 84.5"
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary pr-12"
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-bold text-theme-muted">
                    %
                  </span>
                </div>
                <span className="text-[11px] text-theme-muted mt-1 block">
                  If your college grades in CGPA (e.g. 8.4/10), enter the converted percentage or equivalent (e.g. 84.0).
                </span>
              </div>
            </div>
          )}

          {/* STEP 3: Financial Background & Interests */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <label className="block text-xs font-bold text-theme-main mb-1.5">
                  Annual Household Family Income (INR) *
                </label>
                <select
                  value={formData.annualIncome}
                  onChange={(e) => handleChange('annualIncome', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                >
                  <option value="200000">Below ₹2,00,000 / year (Priority Need-Based)</option>
                  <option value="350000">₹2,00,000 to ₹3,50,000 / year</option>
                  <option value="450000">₹3,50,000 to ₹6,00,000 / year</option>
                  <option value="800000">₹6,00,000 to ₹8,00,000 / year</option>
                  <option value="1200000">Above ₹8,00,000 / year (Merit/Abroad Focused)</option>
                </select>
                <span className="text-[11px] text-theme-muted mt-1 block">
                  Many government and foundation fellowships require official income certificates for verification.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-2">
                  Select Funding Categories of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableInterests.map((interest) => {
                    const selected = formData.interests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={interest}
                        onClick={() => handleInterestToggle(interest)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                          selected
                            ? 'bg-theme-secondary border-theme-primary text-theme-main shadow-xs'
                            : 'bg-theme-main border-theme text-theme-muted hover:border-theme-primary'
                        }`}
                      >
                        <span className="truncate">{interest}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-theme-primary shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-theme-secondary/70 border border-theme flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-[11px] text-theme-muted leading-relaxed">
                  Your profile will be securely saved in your browser's LocalStorage. You can edit any parameter anytime from your Profile settings.
                </p>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-theme flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-outline px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="btn-primary px-7 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-theme-sm"
            >
              <span>{step === totalSteps ? 'Launch Dashboard ✨' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
