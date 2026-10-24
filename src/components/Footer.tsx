import React from 'react';
import { Terminal, Shield, ArrowUp, Github, Linkedin, Globe } from 'lucide-react';
import { COLLEGE_NAME, WEBSITE_NAME, TAGLINE } from '../data/collegeData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#02050f] border-t border-cyan-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: College & Brand identity (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white font-mono flex items-center">
                  C<sup className="text-cyan-400 text-sm font-black -top-2">2</sup>&nbsp;<span className="text-cyan-400">TECH</span>
                </span>
                <span className="text-[10px] block font-mono text-cyan-300">
                  DIGITAL UNIVERSE // MASC CHENNAI
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {COLLEGE_NAME}
              </h4>
              <p className="text-xs font-mono text-cyan-400">
                Somangalam Road, Kundrathur, Chennai - 600 128
              </p>
              <p className="text-[11px] font-mono text-purple-400">
                {WEBSITE_NAME} — {TAGLINE}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 font-mono leading-relaxed">
              <strong className="text-white block mb-0.5">CAMPUS LOCATION</strong>
              Madha Nagar, Somangalam Road, Erandamkattalai, Sadhanandhapuram, Thandalam Post (Near Kovur / Kundrathur), Chennai - 600 128, Tamil Nadu.
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The flagship digital portal connecting students of the Department of Computer Science and Department of Computer Applications through experiential 3D visualization, interactive quizzes, and career blueprints.
            </p>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Fast Pathways
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Home Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  About MASC & C² Tech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('departments')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  CS & CA Departments
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Interactive Coding Quiz
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('virtual-lab')}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Virtual 3D Computer Lab
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Departments & Features (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Academic Divisions
            </h5>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-white block">Department of Computer Science</span>
                <span className="text-[11px] text-cyan-400 font-mono">Algorithms • OS • Systems Programming • AI</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-white block">Department of Computer Applications</span>
                <span className="text-[11px] text-purple-400 font-mono">Web Tech • Full-Stack • Mobile Apps • UI/UX</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Top scroll */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="text-center sm:text-left">
            <p className="text-slate-400">
              © {new Date().getFullYear()} {COLLEGE_NAME}. All rights reserved.
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Designed & Developed for MASC Computer Science & Computer Applications Students.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-1.5 cursor-pointer text-slate-300"
            aria-label="Scroll back to top of page"
          >
            <span>Top of Universe</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
