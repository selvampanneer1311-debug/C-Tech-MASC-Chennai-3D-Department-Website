import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle, 
  Wrench, 
  Lightbulb, 
  Globe, 
  Layers, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { CAREER_PATHS } from '../data/careerData';
import { CareerPath } from '../types';

export const CareerRoadmapSection: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<CareerPath>(CAREER_PATHS[0]);

  return (
    <section id="roadmap" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>INDUSTRY TRAJECTORIES // PROGRESSION BLUEPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Career Roadmap
          </h2>
          <p className="text-base text-slate-300">
            Comprehensive step-by-step skill paths, tooling stacks, and beginner project benchmarks across 9 flagship software domains.
          </p>
        </div>

        {/* 9 Career Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CAREER_PATHS.map((career) => (
            <button
              key={career.id}
              onClick={() => setSelectedCareer(career)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                selectedCareer.id === career.id
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {career.title}
            </button>
          ))}
        </div>

        {/* Active Career Detail Panel */}
        <div className="glass-panel rounded-2xl p-6 sm:p-10 border-cyan-500/30 shadow-2xl relative overflow-hidden">
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs font-mono px-3 py-1 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                  {selectedCareer.category}
                </span>
                <span className="text-slate-500 font-mono text-xs">•</span>
                <span className="text-xs font-mono text-purple-400">
                  Best Fit: {selectedCareer.bestFitDepartment === 'Both' ? 'CS & CA Departments' : `Dept of ${selectedCareer.bestFitDepartment}`}
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {selectedCareer.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {selectedCareer.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Step-by-Step Learning Order */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                  Recommended Learning Progression
                </h4>
              </div>

              <div className="space-y-3">
                {selectedCareer.learningOrder.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-sm">
                      0{step.step}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white mb-1">{step.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Skills, Tools & Beginner Projects */}
            <div className="lg:col-span-5 space-y-6">
              {/* Essential Skills */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400" />
                  <span>Essential Technical Competencies</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.keySkills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md bg-slate-950 text-slate-200 border border-slate-800 font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tools & Ecosystem */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-purple-400" />
                  <span>Tools & Frameworks</span>
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-md bg-purple-950/40 text-purple-300 border border-purple-500/30 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Beginner-Friendly Practice Ideas */}
              <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span>Beginner Practice Projects</span>
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedCareer.practiceIdeas.map((idea, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold shrink-0">•</span>
                      <span>{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Industry & Regional Scope */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold text-cyan-400">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Industry & Chennai Scope</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedCareer.careerScope}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
