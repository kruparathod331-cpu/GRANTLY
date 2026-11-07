import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, FileDown, BookOpen, Lightbulb } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function SOPGeneratorModal({ isOpen, onClose, defaultScholarship = null }) {
  const { profile } = useStudent();

  const [targetProgram, setTargetProgram] = useState(
    defaultScholarship?.title || 'STEM Leadership & Innovation Fellowship'
  );
  const [courseField, setCourseField] = useState(profile.course || 'Computer Science & Engineering');
  const [keyProject, setKeyProject] = useState('Full-stack accessibility web platform addressing local education hurdles');
  const [personalMotivation, setPersonalMotivation] = useState('Overcoming financial constraints as a first-generation technology student');
  const [futureVision, setFutureVision] = useState('Building scalable open-source tools for rural digital literacy and educational access');
  
  const [generatedSOP, setGeneratedSOP] = useState(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e) => {
    e.preventDefault();

    const outline = `STATEMENT OF PURPOSE (SOP) — DRAFT OUTLINE
Applicant: ${profile.name || 'Student Candidate'}
Target Opportunity: ${targetProgram}
Field of Study: ${courseField}

---------------------------------------------------------
SECTION 1: THE CATALYST & PASSION (HOOK)
---------------------------------------------------------
"My journey in ${courseField} is driven by a desire to transform abstract concepts into tangible solutions that empower underserved communities. Growing up, I experienced firsthand how ${personalMotivation.toLowerCase()} can create invisible barriers to advancement. Rather than accepting these limitations, they forged my resolve to excel academically and dedicate my engineering skills to solving high-impact problems."

Key Writing Guidance:
• Keep the opening clear of overused quotes.
• Ground your origin story in a genuine observation or challenge.

---------------------------------------------------------
SECTION 2: ACADEMIC RIGOR & PRACTICAL EXECUTION
---------------------------------------------------------
"During my coursework at ${profile.college || 'my university'}, where I have maintained an academic standard of ${profile.percentage || '84.5'}%, I actively sought opportunities to translate classroom theory into working software. A defining milestone was spearheading the development of a ${keyProject}. This project demanded rigorous problem-solving, collaborative execution, and deep technical resilience."

Key Writing Guidance:
• Highlight quantifiable impact (users reached, efficiency gains, test accuracy).
• State the tools and methodologies you mastered through the process.

---------------------------------------------------------
SECTION 3: FINANCIAL CONTEXT & RESILIENCE
---------------------------------------------------------
"Pursuing higher education while managing household economic realities has reinforced my discipline and resourcefulness. While financial constraints present logistical hurdles—such as accessing premium learning tools and conference travel—they have never deterred my commitment. Receiving ${targetProgram} would eliminate immediate financial stress, allowing me to focus entirely on research and academic excellence."

Key Writing Guidance:
• Discuss financial background with dignity and integrity.
• Focus on what funding enables rather than purely dwelling on difficulty.

---------------------------------------------------------
SECTION 4: LONG-TERM IMPACT & GIVE-BACK COMMITMENT
---------------------------------------------------------
"Looking ahead, my goal is ${futureVision}. I view this scholarship not simply as financial aid, but as an investment in a reciprocal journey. With this support, I intend to establish peer mentoring circles for aspiring students from similar backgrounds, ensuring that the door opened for me remains accessible to future generations."

Key Writing Guidance:
• Clearly state your 3-to-5 year career direction.
• Detail how the awarding foundation's ethos connects with your future trajectory.
`;

    setGeneratedSOP(outline);
  };

  const handleCopy = () => {
    if (!generatedSOP) return;
    navigator.clipboard.writeText(generatedSOP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    if (!generatedSOP) return;
    const blob = new Blob([generatedSOP], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `SOP_Outline_${profile.name ? profile.name.replace(/\s+/g, '_') : 'Student'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-3xl max-h-[90vh] rounded-3xl bg-theme-card border border-theme shadow-theme-lg flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-theme bg-theme-secondary">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-theme-main font-heading">
                Interactive SOP Starter & Outline Builder
              </h3>
              <p className="text-xs text-theme-muted">
                Structure your Statement of Purpose using authentic student milestones.
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!generatedSOP ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-theme-secondary/60 border border-theme flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-theme-primary shrink-0 mt-0.5" />
                <p className="text-xs text-theme-muted leading-relaxed">
                  GRANTLY SOP Starter crafts a structured four-part narrative outline based on your genuine academic background. It serves as a structural scaffold to help you write with clarity and impact.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">
                    Target Opportunity / Scholarship
                  </label>
                  <input
                    type="text"
                    value={targetProgram}
                    onChange={(e) => setTargetProgram(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                    placeholder="e.g. Aditi Empower STEM Fellowship"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-theme-main mb-1">
                    Academic Field / Course
                  </label>
                  <input
                    type="text"
                    value={courseField}
                    onChange={(e) => setCourseField(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                    placeholder="e.g. Computer Science & Engineering"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Key Academic Milestone, Research, or Project
                </label>
                <input
                  type="text"
                  value={keyProject}
                  onChange={(e) => setKeyProject(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  placeholder="e.g. Built automated scholarship eligibility tracker using React"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Personal Background or Challenge Overcome
                </label>
                <input
                  type="text"
                  value={personalMotivation}
                  onChange={(e) => setPersonalMotivation(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  placeholder="e.g. Overcoming financial hurdles as a first-generation engineer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-theme-main mb-1">
                  Long-term Vision & Contribution
                </label>
                <input
                  type="text"
                  value={futureVision}
                  onChange={(e) => setFutureVision(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
                  placeholder="e.g. Designing open-source civic technologies and mentoring junior students"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-theme-muted hover:bg-theme-secondary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-theme-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate SOP Outline
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-theme-muted uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-theme-primary" />
                  Generated 4-Section Narrative Framework
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-xl border border-theme bg-theme-card text-xs font-bold text-theme-main hover:bg-theme-secondary transition-colors flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy Outline'}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-xl border border-theme bg-theme-card text-xs font-bold text-theme-main hover:bg-theme-secondary transition-colors flex items-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Download .txt
                  </button>
                </div>
              </div>

              <textarea
                value={generatedSOP}
                onChange={(e) => setGeneratedSOP(e.target.value)}
                rows={16}
                className="w-full p-4 rounded-2xl border border-theme bg-theme-main text-theme-main font-mono text-xs leading-relaxed focus:outline-none focus:border-theme-primary resize-y"
              />

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => setGeneratedSOP(null)}
                  className="text-xs font-bold text-theme-muted hover:text-theme-primary transition-colors"
                >
                  ← Edit Inputs & Regenerate
                </button>
                <button
                  onClick={onClose}
                  className="btn-primary px-5 py-2 rounded-xl text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
