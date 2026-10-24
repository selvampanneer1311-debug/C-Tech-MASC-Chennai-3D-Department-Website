import React from 'react';
import { X, CheckCircle, GraduationCap, Laptop, Sparkles, BookOpen, Layers } from 'lucide-react';
import { DepartmentInfo } from '../types';

interface DepartmentModalProps {
  department: DepartmentInfo | null;
  onClose: () => void;
  onStartQuiz: (dept: 'CS' | 'CA') => void;
}

export const DepartmentModal: React.FC<DepartmentModalProps> = ({
  department,
  onClose,
  onStartQuiz,
}) => {
  if (!department) return null;

  const isCS = department.id === 'CS';
  const themeGlow = isCS ? 'border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)]' : 'border-purple-500/40 shadow-[0_0_50px_rgba(168,85,247,0.25)]';
  const accentColor = isCS ? 'text-cyan-400' : 'text-purple-400';
  const buttonGradient = isCS 
    ? 'from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950' 
    : 'from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dept-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fadeIn"
    >
      <div
        className={`relative w-full max-w-4xl bg-[#070d1e] rounded-2xl border ${themeGlow} p-6 sm:p-8 max-h-[90vh] overflow-y-auto text-left`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
          aria-label="Close department details dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag & Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono mb-3">
            <span className={accentColor}>{department.codeName}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{department.shortName}</span>
          </div>

          <h3 id="dept-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            {department.fullName}
          </h3>
          <p className={`text-sm sm:text-base font-medium ${accentColor} mt-1 italic`}>
            {department.tagline}
          </p>
        </div>

        {/* Summary */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-8 text-sm text-slate-300 leading-relaxed">
          {department.summary}
        </div>

        {/* 6 Core Curriculum Domains */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className={`w-4 h-4 ${accentColor}`} />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Core Academic Disciplines
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {department.coreDomains.map((domain, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-slate-100">{domain.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{domain.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Highlights & Lab Facilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Curriculum */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className={`w-4 h-4 ${accentColor}`} />
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Curriculum Focus Areas
              </h5>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {department.curriculumHighlights.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className={`w-3.5 h-3.5 ${accentColor} shrink-0`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Labs */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Laptop className={`w-4 h-4 ${accentColor}`} />
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
                Hands-on Lab Environments
              </h5>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {department.labFacilities.map((lab, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Sparkles className={`w-3.5 h-3.5 ${accentColor} shrink-0`} />
                  <span>{lab}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
                Typical Career Avenues
              </div>
              <div className="flex flex-wrap gap-1.5">
                {department.careerAvenues.map((career, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {career}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-400 font-mono">
            Madha Arts and Science College (MASC), Chennai
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
            >
              Close Overview
            </button>
            <button
              onClick={() => {
                onClose();
                onStartQuiz(department.id);
              }}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${buttonGradient} shadow-md transition-all cursor-pointer`}
            >
              Take {department.id} Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
