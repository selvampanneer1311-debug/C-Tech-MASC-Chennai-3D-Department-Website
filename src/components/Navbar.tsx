import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Terminal, 
  Cpu, 
  Layers, 
  Sparkles, 
  Award, 
  Compass, 
  HelpCircle, 
  Mail, 
  GitCompare,
  ExternalLink
} from 'lucide-react';
import { COLLEGE_NAME, WEBSITE_NAME } from '../data/collegeData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'about', label: 'About', icon: HelpCircle },
    { id: 'departments', label: 'Departments', icon: Layers },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'quiz', label: 'Coding Quiz', icon: Terminal },
    { id: 'cs-vs-ca', label: 'CS vs CA', icon: GitCompare },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'roadmap', label: 'Career Roadmap', icon: Compass },
    { id: 'virtual-lab', label: 'Virtual Lab', icon: Terminal },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#030712]/90 backdrop-blur-md border-b border-cyan-500/20 py-2.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & College Identity */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            {/* Dedicated Official College Logo Space */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-950 via-slate-900 to-purple-950 border border-cyan-500/40 p-0.5 shadow-[0_0_15px_rgba(6,182,212,0.25)] flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
              <div className="w-full h-full rounded-[10px] bg-[#070d1e] flex flex-col items-center justify-center text-center p-1">
                <span className="text-[10px] font-black tracking-tighter text-cyan-400 font-mono leading-none">MASC</span>
                <span className="text-[7px] text-slate-400 tracking-widest font-mono uppercase mt-0.5">CHN</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-white font-mono flex items-center">
                  C<sup className="text-cyan-400 text-sm font-black -top-2">2</sup>&nbsp;<span className="text-cyan-400">TECH</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  CS × CA
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight truncate max-w-[210px] sm:max-w-xs">
                Madha Arts & Science College • Kundrathur, Chennai
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('virtual-lab')}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Virtual Lab</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[65px] bg-[#030712]/98 border-b border-cyan-500/20 px-4 pt-3 pb-6 backdrop-blur-xl shadow-2xl max-h-[85vh] overflow-y-auto animate-fadeIn">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 px-3 py-1 mb-2 border-b border-slate-800">
            Navigation Matrix
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm text-left font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('virtual-lab')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 hover:bg-cyan-400"
            >
              <Terminal className="w-4 h-4" />
              <span>Enter Virtual 3D Lab</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
