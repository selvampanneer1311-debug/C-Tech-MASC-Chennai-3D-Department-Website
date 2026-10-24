import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Compass, 
  Layers, 
  CheckCircle2, 
  Milestone,
  MapPin,
  Plane,
  Bus,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { COLLEGE_NAME, WEBSITE_NAME, TAGLINE, C2_TECH_TIMELINE, COLLEGE_LOCATION } from '../data/collegeData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>INSTITUTION & DIGITAL VISION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            About the College & <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">C² Tech</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Cultivating next-generation software architects and computational problem solvers at{' '}
            <strong className="text-white font-semibold">Madha Arts and Science College (MASC), Kundrathur, Chennai</strong>.
          </p>
        </div>

        {/* Dual Pillar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Madha Arts & Science College */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-8 border-cyan-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">Madha Arts and Science College (MASC)</h3>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Kundrathur, Chennai, Tamil Nadu</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Madha Arts and Science College, situated along Somangalam Road in Kundrathur, Chennai, is committed to delivering quality higher education that prepares students for dynamic professional environments. Through dedicated academic faculties, structured curricula, and computational laboratories, the college provides students with an encouraging environment to excel in Computer Science and Computer Applications.
              </p>

              <div className="space-y-3 mb-6 text-sm text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Focused curriculum delivery under the Department of Computer Science & Department of Computer Applications.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Hands-on laboratory sessions reinforcing programming fundamentals, systems commands, and web/application development.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span>Encouraging ethical practices, teamwork, and technical versatility suited for Chennai and global IT ecosystems.</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>LOCATION // KUNDRATHUR, CHENNAI</span>
              <span className="text-cyan-400 font-semibold">DEPT: CS × CA</span>
            </div>
          </div>

          {/* Right: The C² Tech Digital Universe */}
          <div className="lg:col-span-6 glass-panel rounded-2xl p-8 border-purple-500/20 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">The C² Tech Initiative</h3>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">{TAGLINE}</span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                <strong>C² Tech</strong> (Computer Science × Computer Applications) is the dedicated futuristic digital portal engineered for students of Madha Arts and Science College. It breaks traditional static boundaries by transforming departmental learning into an interactive, visual, and experiential journey.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-purple-500/20">
                  <span className="text-purple-400 font-mono text-xs block mb-1">01 // Interactive 3D Lab</span>
                  <p className="text-xs text-slate-300">Live code runner and 3D visual workstations for immediate practice.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20">
                  <span className="text-cyan-400 font-mono text-xs block mb-1">02 // Adaptive Quizzes</span>
                  <p className="text-xs text-slate-300">Algorithmic and application challenge modules across Easy, Medium, and Hard.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-sky-500/20">
                  <span className="text-sky-400 font-mono text-xs block mb-1">03 // CS vs CA Matrix</span>
                  <p className="text-xs text-slate-300">Comparative roadmap clarifying Computer Science vs Computer Applications.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border-emerald-500/20">
                  <span className="text-emerald-400 font-mono text-xs block mb-1">04 // Career Acceleration</span>
                  <p className="text-xs text-slate-300">Practical career milestones for 9 top software engineering disciplines.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>PLATFORM // C² TECH HUB</span>
              <span className="text-purple-400 font-semibold">100% INTERACTIVE</span>
            </div>
          </div>
        </div>

        {/* Dedicated College Location & Connectivity Showcase Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border-cyan-500/30 mb-16 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>OFFICIAL CAMPUS LOCATION</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Madha Arts and Science College Campus
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Kundrathur - Kovur Corridor, Chennai, Tamil Nadu
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://maps.google.com/?q=Madha+Arts+and+Science+College+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions (Google Maps)</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Address Details */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-cyan-400 font-bold">
                <MapPin className="w-4 h-4" />
                <span>Postal Address</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-mono">
                {COLLEGE_LOCATION.institution}<br />
                {COLLEGE_LOCATION.street}<br />
                {COLLEGE_LOCATION.area}<br />
                {COLLEGE_LOCATION.post}<br />
                {COLLEGE_LOCATION.city} - {COLLEGE_LOCATION.pincode}<br />
                {COLLEGE_LOCATION.state}
              </p>
            </div>

            {/* Travel Proximity */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-purple-400 font-bold">
                <Plane className="w-4 h-4" />
                <span>Airport & Metro Connectivity</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>~7.7 km from Chennai International Airport (Meenambakkam).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>Direct road connectivity via Kovur, Porur, and Pallavaram-Thoraipakkam highway.</span>
                </li>
              </ul>
            </div>

            {/* Transit & Bus Junction */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center gap-2 mb-2 text-xs font-mono text-emerald-400 font-bold">
                <Bus className="w-4 h-4" />
                <span>Public Transit Access</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Nearest Bus Stops: Kovur Church / Anakaputhur Junction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>Frequent bus connectivity linking Guindy, Tambaram, Vadapalani, and Poonamallee.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Futuristic Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-8 justify-center">
            <Milestone className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold uppercase tracking-wider text-white font-mono">
              C² Tech Evolution Matrix
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {C2_TECH_TIMELINE.map((item, index) => (
              <div
                key={index}
                className="relative glass-panel p-6 rounded-xl border-slate-700 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400 tracking-wider font-bold">
                    {item.phase}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.date}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end text-[11px] font-mono text-cyan-400/80">
                  <span>DEPLOYED // READY</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
