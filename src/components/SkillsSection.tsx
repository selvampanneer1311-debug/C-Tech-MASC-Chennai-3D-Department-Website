import React, { useState } from 'react';
import { 
  Code, 
  Layout, 
  Atom, 
  FileCode2, 
  Coffee, 
  Cpu, 
  Database, 
  GitBranch, 
  Palette, 
  Brain, 
  ShieldAlert,
  Sparkles,
  Filter
} from 'lucide-react';
import { SKILLS_DATA } from '../data/skillsData';
import { SkillItem } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Layout,
  Code,
  Atom,
  FileCode2,
  Coffee,
  Cpu,
  Database,
  GitBranch,
  Palette,
  Brain,
  ShieldAlert,
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'core-languages', label: 'Core Languages' },
    { id: 'web-dev', label: 'Web & UI/UX' },
    { id: 'data-ai', label: 'Data & AI' },
    { id: 'systems-security', label: 'Systems & Security' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? SKILLS_DATA
    : SKILLS_DATA.filter((s) => s.category === activeCategory);

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'Intermediate':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'Advanced':
        return 'text-purple-400 bg-purple-950/60 border-purple-500/40';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-700';
    }
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL PROFICIENCY MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-base text-slate-300">
            Essential languages, architectural stacks, and contemporary toolsets curated for students of Computer Science and Computer Applications.
          </p>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.35)] scale-105'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 11 Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = ICON_MAP[skill.iconName] || Code;
            return (
              <div
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className="group relative glass-panel rounded-xl p-5 border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(6,182,212,0.18)] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Level Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-cyan-400 group-hover:bg-cyan-950/40 flex items-center justify-center text-cyan-400 transition-colors shadow-inner">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getLevelBadgeColor(
                        skill.level
                      )}`}
                    >
                      {skill.level}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {skill.description}
                  </p>
                </div>

                {/* Footer Tag & Concepts */}
                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {skill.keyConcepts.slice(0, 2).map((concept, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {concept}
                      </span>
                    ))}
                    {skill.keyConcepts.length > 2 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400">
                        +{skill.keyConcepts.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>AFFINITY: {skill.departmentAffinity}</span>
                    <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      Inspect →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Skill Detail Modal */}
      {selectedSkill && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-lg glass-panel bg-[#070d1e] rounded-2xl border border-cyan-500/40 p-6 sm:p-8 text-left shadow-[0_0_40px_rgba(6,182,212,0.3)]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  {React.createElement(ICON_MAP[selectedSkill.iconName] || Code, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${getLevelBadgeColor(selectedSkill.level)}`}>
                    Level: {selectedSkill.level}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900 border border-slate-700"
                aria-label="Close skill dialog"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedSkill.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Core Mastery Milestones
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedSkill.keyConcepts.map((item, i) => (
                  <div key={i} className="text-xs text-slate-200 p-2 rounded-lg bg-slate-900 border border-slate-800">
                    • {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 mb-6 flex items-center justify-between">
              <span>Department Alignment:</span>
              <span className="font-mono font-bold text-cyan-400">
                {selectedSkill.departmentAffinity === 'Both'
                  ? 'Computer Science & Computer Applications'
                  : selectedSkill.departmentAffinity === 'CS'
                  ? 'Department of Computer Science'
                  : 'Department of Computer Applications'}
              </span>
            </div>

            <button
              onClick={() => setSelectedSkill(null)}
              className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
