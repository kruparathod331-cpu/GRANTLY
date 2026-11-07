import React from 'react';
import { 
  Palette, 
  Check, 
  Sparkles, 
  Eye, 
  SunMoon, 
  Layers, 
  CheckCircle2, 
  Monitor,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useTheme } from '../context/ThemeContext';

export default function ThemeStudio() {
  const { theme, setTheme, themes, activeThemeMeta } = useTheme();

  const handleSelectTheme = (themeId) => {
    setTheme(themeId);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // silent
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm relative overflow-hidden">
        <div 
          className="absolute right-0 top-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              Dynamic Visual Customizer
            </span>
            <span className="text-xs text-theme-muted font-semibold">
              • 6 Curated Gen Z & Editorial Palettes
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading">
            GRANTLY Theme Studio
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl leading-relaxed">
            Personalize your workspace aesthetics. One click updates the entire platform—navigation, backgrounds, cards, buttons, modals, and GRANTLY AI.
          </p>
        </div>

        {/* Current Active Theme Indicator */}
        <div className="p-4 rounded-2xl bg-theme-secondary border border-theme flex items-center gap-3 self-start md:self-auto">
          <div 
            className="w-10 h-10 rounded-xl border-2 border-white/50 shadow-xs shrink-0"
            style={{ backgroundColor: activeThemeMeta.colors.primary }}
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
              Currently Active
            </span>
            <h4 className="text-sm font-extrabold text-theme-main font-heading">
              {activeThemeMeta.name}
            </h4>
          </div>
        </div>
      </div>

      {/* 6 Themes Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((th) => {
          const isSelected = theme === th.id;

          return (
            <div
              key={th.id}
              onClick={() => handleSelectTheme(th.id)}
              className={`rounded-3xl border transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer group card-hover-lift relative overflow-hidden ${
                isSelected
                  ? 'border-2 border-theme-primary shadow-theme-md ring-4 ring-primary/20 bg-theme-card'
                  : 'border-theme bg-theme-card hover:border-theme-primary shadow-theme-sm'
              }`}
            >
              <div>
                {/* Header & Active Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-black font-heading text-theme-main flex items-center gap-2">
                      {th.name}
                      {th.isDefault && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-theme-secondary text-theme-primary">
                          Default
                        </span>
                      )}
                    </h3>
                    <span className="text-xs font-semibold text-theme-muted">
                      {th.tagline}
                    </span>
                  </div>

                  <div 
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isSelected 
                        ? 'bg-theme-primary text-white shadow-xs' 
                        : 'bg-theme-secondary text-theme-muted group-hover:text-theme-main'
                    }`}
                  >
                    {isSelected ? <Check className="w-4 h-4" /> : <Layers className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <p className="text-xs text-theme-muted leading-relaxed mb-5">
                  {th.description}
                </p>

                {/* Interactive Mini Mockup Component inside card */}
                <div 
                  className="rounded-2xl p-4 border border-black/5 shadow-inner space-y-3 mb-4"
                  style={{ backgroundColor: th.colors.bg }}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold" style={{ color: th.colors.text }}>
                    <span>Live Theme Preview</span>
                    <span 
                      className="px-2 py-0.5 rounded-full text-[10px]"
                      style={{ backgroundColor: th.colors.secondary, color: th.colors.text }}
                    >
                      Active
                    </span>
                  </div>

                  {/* Sample Mock Button & Metric */}
                  <div 
                    className="p-3 rounded-xl border border-black/5 bg-white/90 shadow-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase text-zinc-500 block">Sample Grant</span>
                      <span className="text-xs font-black text-zinc-900">₹2,50,000 / yr</span>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg text-[11px] font-bold text-white shadow-xs"
                      style={{ backgroundColor: th.colors.primary }}
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Color Swatches Grid */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-theme-muted block">
                    Hex Color Palette
                  </span>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Object.entries(th.colors).map(([key, hex]) => (
                      <div key={key} className="text-center group/swatch" title={`${key}: ${hex}`}>
                        <div 
                          className="h-8 rounded-lg border border-black/10 shadow-2xs transition-transform group-hover/swatch:scale-105"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[9px] font-mono text-theme-subtle block mt-0.5 truncate">
                          {hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-theme/60 flex items-center justify-between">
                <span className="text-xs font-bold text-theme-muted">
                  {isSelected ? 'Currently Applied' : 'Click to apply theme'}
                </span>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    isSelected
                      ? 'btn-primary'
                      : 'btn-outline hover:border-theme-primary'
                  }`}
                >
                  {isSelected ? 'Active ✨' : 'Select Theme'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accessibility & Design Notes Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-secondary/40 border border-theme space-y-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-theme-primary" />
          <h3 className="text-base font-extrabold text-theme-main font-heading">
            Design System & Accessibility Standards
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
          GRANTLY's dynamic themes are powered by standard <strong>CSS Custom Properties (Variables)</strong> with instant zero-reload DOM updates. All six palettes have been vetted for WCAG contrast readability across text, interactive buttons, badges, and modals.
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-theme-muted pt-2 border-t border-theme">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Automatic LocalStorage Persistence
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Full Component-Level Reactivity
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Zero External CSS Library Overhead
          </span>
        </div>
      </div>
    </div>
  );
}
