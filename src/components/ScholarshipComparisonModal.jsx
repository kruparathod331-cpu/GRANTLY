import React from 'react';
import { X, Scale, Sparkles, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { calculateScholarshipMatch } from '../services/matchingService';

export default function ScholarshipComparisonModal({ 
  scholarships = [], 
  onClose, 
  onRemove = () => {} 
}) {
  const { profile } = useStudent();

  if (!scholarships || scholarships.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-5xl max-h-[92vh] rounded-3xl bg-theme-card border border-theme shadow-theme-lg flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-theme bg-theme-secondary">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-theme-main font-heading">
                Side-by-Side Scholarship Comparison
              </h3>
              <p className="text-xs text-theme-muted">
                Comparing {scholarships.length} opportunities against your academic profile.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-theme-muted hover:text-theme-main hover:bg-theme-main transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto overflow-y-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-theme">
                <th className="py-3 px-4 text-xs font-bold uppercase tracking-wider text-theme-muted w-1/4">
                  Feature / Criteria
                </th>
                {scholarships.map((s) => {
                  const match = calculateScholarshipMatch(profile, s);
                  return (
                    <th key={s.id} className="py-3 px-4 w-1/3 align-top">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="badge-pill bg-theme-secondary text-[10px] font-bold">
                            {s.category}
                          </span>
                          <button
                            onClick={() => onRemove(s.id)}
                            className="text-xs text-rose-500 hover:underline"
                            title="Remove from comparison"
                          >
                            Remove
                          </button>
                        </div>
                        <h4 className="font-extrabold text-sm text-theme-main font-heading line-clamp-2">
                          {s.title}
                        </h4>
                        <div className="inline-flex items-center gap-1 text-xs font-bold text-theme-primary">
                          <Sparkles className="w-3 h-3" />
                          <span>Match Score: {match.score}% ({match.label})</span>
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-theme text-xs">
              
              {/* Funding Support */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Funding Support (INR)
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4">
                    <span className="font-extrabold text-sm text-theme-main block">
                      {s.formattedAmount}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Provider */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Provider / Trust
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-theme-muted">
                    {s.provider}
                  </td>
                ))}
              </tr>

              {/* Education Level */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Degree Level
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-theme-muted">
                    {s.educationLevel}
                  </td>
                ))}
              </tr>

              {/* Academic Requirement */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Min Percentage / CGPA
                </td>
                {scholarships.map((s) => {
                  const studentPct = parseFloat(profile.percentage || 0);
                  const meets = studentPct >= s.minPercentage;
                  return (
                    <td key={s.id} className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-bold">
                        {meets ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        )}
                        <span>{s.minPercentage}% required</span>
                      </div>
                      <span className="text-[11px] text-theme-muted block mt-0.5">
                        Your score: {profile.percentage}% ({meets ? 'Eligible' : 'Below cutoff'})
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Income Ceiling */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Family Income Ceiling
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-theme-muted">
                    {s.maxAnnualIncome ? `Under ₹${(s.maxAnnualIncome / 100000).toFixed(1)} LPA` : 'No upper ceiling specified'}
                  </td>
                ))}
              </tr>

              {/* Location */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Eligible Domicile / Scope
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-theme-muted">
                    {s.location}
                  </td>
                ))}
              </tr>

              {/* Deadline */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Application Deadline
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 font-bold text-theme-primary">
                    {s.deadline}
                  </td>
                ))}
              </tr>

              {/* Required Documents count */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Key Required Documents
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4 text-theme-muted">
                    <ul className="list-disc list-inside space-y-1">
                      {s.requiredDocuments.slice(0, 3).map((d, i) => (
                        <li key={i} className="truncate">{d}</li>
                      ))}
                      {s.requiredDocuments.length > 3 && (
                        <li className="text-theme-primary font-semibold">
                          +{s.requiredDocuments.length - 3} more items
                        </li>
                      )}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Action row */}
              <tr>
                <td className="py-3.5 px-4 font-bold text-theme-main bg-theme-secondary/30">
                  Deep Dive
                </td>
                {scholarships.map((s) => (
                  <td key={s.id} className="py-3.5 px-4">
                    <Link
                      to={`/scholarships/${s.id}`}
                      onClick={onClose}
                      className="btn-primary py-2 px-3 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-theme-sm"
                    >
                      <span>Full Opportunity Breakdown</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
