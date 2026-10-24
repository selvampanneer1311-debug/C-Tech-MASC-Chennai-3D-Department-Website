import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Trophy, 
  Medal, 
  Filter, 
  Trash2, 
  Clock, 
  User, 
  Sparkles, 
  Info,
  Calendar,
  Flame
} from 'lucide-react';
import { DepartmentType, LeaderboardEntry } from '../types';
import { formatTime, sortLeaderboard } from '../utils/quiz';

const SAMPLE_STARTER_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'sample-1',
    studentName: 'Aravind K. (Student Demo)',
    category: 'CS',
    difficulty: 'medium',
    score: 4,
    totalQuestions: 4,
    percentage: 100,
    date: 'Oct 24, 2026',
    timeSpentSeconds: 42,
  },
  {
    id: 'sample-2',
    studentName: 'Priya R. (Student Demo)',
    category: 'CA',
    difficulty: 'medium',
    score: 4,
    totalQuestions: 4,
    percentage: 100,
    date: 'Oct 24, 2026',
    timeSpentSeconds: 58,
  },
  {
    id: 'sample-3',
    studentName: 'Karthik S. (Student Demo)',
    category: 'CS',
    difficulty: 'easy',
    score: 4,
    totalQuestions: 4,
    percentage: 100,
    date: 'Oct 23, 2026',
    timeSpentSeconds: 65,
  },
];

interface LeaderboardSectionProps {
  onTakeQuiz: () => void;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ onTakeQuiz }) => {
  const [filterCategory, setFilterCategory] = useState<'ALL' | DepartmentType>('ALL');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const loadLeaderboard = () => {
    try {
      const stored = localStorage.getItem('masc_codeverse_leaderboard');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      }
      // If none saved yet, seed with sample entries so the podium renders cleanly
      setEntries(SAMPLE_STARTER_ENTRIES);
      localStorage.setItem('masc_codeverse_leaderboard', JSON.stringify(SAMPLE_STARTER_ENTRIES));
    } catch {
      setEntries(SAMPLE_STARTER_ENTRIES);
    }
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const clearLeaderboard = () => {
    if (window.confirm('Reset all saved device scores to default demo state?')) {
      localStorage.removeItem('masc_codeverse_leaderboard');
      setEntries(SAMPLE_STARTER_ENTRIES);
    }
  };

  const filtered = entries.filter((e) => {
    if (filterCategory === 'ALL') return true;
    return e.category === filterCategory;
  });

  const sorted = sortLeaderboard(filtered);
  const topThree = sorted.slice(0, 3);
  const remaining = sorted.slice(3);

  return (
    <section id="leaderboard" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>HALL OF VALOR // LOCAL DEVICE SCORES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Student Leaderboard
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Showcasing high scorers from the Interactive Coding Quiz.
          </p>
        </div>

        {/* Clear Disclaimer Banner */}
        <div className="max-w-3xl mx-auto mb-8 p-3.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-white">Device Storage Notice:</strong> Scores shown here are stored on this device using client-side LocalStorage. C² Tech does not invent official college rankings. Complete a coding quiz to register your own score!
          </p>
        </div>

        {/* Controls Bar: Filters & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            {(['ALL', 'CS', 'CA'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'ALL' ? 'All Departments' : cat === 'CS' ? 'Dept of CS' : 'Dept of CA'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onTakeQuiz}
              className="px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase bg-purple-600/30 text-purple-300 border border-purple-500/40 hover:bg-purple-600/50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Take Quiz & Rank</span>
            </button>

            <button
              onClick={clearLeaderboard}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              title="Reset saved scores"
              aria-label="Reset leaderboard"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Top 3 Podium (1st Gold, 2nd Silver, 3rd Bronze) */}
        {topThree.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 items-end">
            {/* 2nd Place (Silver) */}
            {topThree[1] && (
              <div className="order-2 md:order-1 glass-panel rounded-2xl p-6 border-slate-400/30 text-center relative shadow-[0_0_25px_rgba(148,163,184,0.15)] flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-300 text-slate-200 flex items-center justify-center font-black text-lg mb-3 shadow-md">
                  2
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
                  SILVER OPERATIVE
                </span>
                <h4 className="text-base font-bold text-white mb-2 truncate max-w-[200px]">
                  {topThree[1].studentName}
                </h4>
                <div className="text-2xl font-black text-slate-200 mb-2 font-mono">
                  {topThree[1].percentage}%
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {topThree[1].category}
                  </span>
                  <span>{formatTime(topThree[1].timeSpentSeconds)}</span>
                </div>
              </div>
            )}

            {/* 1st Place (Gold / Champion Pedestal) */}
            {topThree[0] && (
              <div className="order-1 md:order-2 glass-panel rounded-2xl p-8 border-amber-400/50 text-center relative shadow-[0_0_40px_rgba(251,191,36,0.25)] flex flex-col items-center scale-105 z-10 bg-gradient-to-b from-amber-950/20 via-slate-900 to-[#070d1e]">
                <div className="absolute -top-4 w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-[0_0_15px_#f59e0b]">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="w-14 h-14 rounded-full bg-amber-950/80 border-2 border-amber-400 text-amber-300 flex items-center justify-center font-black text-2xl mb-3 shadow-lg mt-2">
                  1
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-1 font-bold">
                  CYBER APEX CHAMPION
                </span>
                <h4 className="text-lg font-extrabold text-white mb-2 truncate max-w-[220px]">
                  {topThree[0].studentName}
                </h4>
                <div className="text-3xl font-black text-amber-300 mb-2 font-mono">
                  {topThree[0].percentage}%
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                    {topThree[0].category}
                  </span>
                  <span>{formatTime(topThree[0].timeSpentSeconds)}</span>
                  <span>• {topThree[0].difficulty}</span>
                </div>
              </div>
            )}

            {/* 3rd Place (Bronze) */}
            {topThree[2] && (
              <div className="order-3 glass-panel rounded-2xl p-6 border-amber-700/30 text-center relative shadow-[0_0_25px_rgba(180,83,9,0.15)] flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-amber-950/60 border-2 border-amber-700 text-amber-400 flex items-center justify-center font-black text-lg mb-3 shadow-md">
                  3
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 mb-1">
                  BRONZE OPERATIVE
                </span>
                <h4 className="text-base font-bold text-white mb-2 truncate max-w-[200px]">
                  {topThree[2].studentName}
                </h4>
                <div className="text-2xl font-black text-amber-600 mb-2 font-mono">
                  {topThree[2].percentage}%
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {topThree[2].category}
                  </span>
                  <span>{formatTime(topThree[2].timeSpentSeconds)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detailed Leaderboard Table for remaining entries */}
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl border-slate-800 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>FULL SCORE ROSTER</span>
            <span>TOTAL RECORDS: {sorted.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Dept</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {sorted.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-200">
                      {index === 0 ? '🥇 #1' : index === 1 ? '🥈 #2' : index === 2 ? '🥉 #3' : `#${index + 1}`}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white">
                      {item.studentName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        item.category === 'CS' 
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30' 
                          : 'bg-purple-950/80 text-purple-300 border border-purple-500/30'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 capitalize text-slate-400">{item.difficulty}</td>
                    <td className="py-3.5 px-4 font-bold text-cyan-400">
                      {item.score}/{item.totalQuestions} ({item.percentage}%)
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">{formatTime(item.timeSpentSeconds)}</td>
                    <td className="py-3.5 px-4 text-slate-400">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
