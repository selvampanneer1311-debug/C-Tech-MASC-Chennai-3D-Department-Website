import React, { useState } from 'react';
import { 
  GitCompare, 
  Cpu, 
  LayoutGrid, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { CS_VS_CA_DIMENSIONS, PATHWAY_QUIZ } from '../data/comparisonData';

export const CSvsCASection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'challenge'>('matrix');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, 'CS' | 'CA'>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuizOption = (questionId: number, choice: 'CS' | 'CA') => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: choice }));
  };

  const calculateQuizResult = () => {
    const csCount = Object.values(quizAnswers).filter((v) => v === 'CS').length;
    const caCount = Object.values(quizAnswers).filter((v) => v === 'CA').length;
    return { csCount, caCount };
  };

  const { csCount, caCount } = calculateQuizResult();

  return (
    <section id="cs-vs-ca" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
            <span>DISCIPLINARY COMPARISON & APTITUDE MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            CS vs CA Challenge
          </h2>
          <p className="text-base text-slate-300">
            Understand the exact distinction between Computer Science (B.Sc CS) and Computer Applications (BCA) to make an informed, confident academic and career choice.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Comparative Matrix
          </button>
          <button
            onClick={() => setActiveTab('challenge')}
            className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'challenge'
                ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Find Your Pathway Challenge
          </button>
        </div>

        {/* Tab 1: Comparative Matrix */}
        {activeTab === 'matrix' ? (
          <div>
            {/* Header Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* CS Banner */}
              <div className="glass-panel p-6 rounded-2xl border-cyan-500/30 bg-gradient-to-br from-cyan-950/30 via-slate-900/60 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Computer Science (B.Sc CS)</h3>
                    <span className="text-xs font-mono text-cyan-400">The "Why & How It Computes" Approach</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on mathematical rigor, algorithmic efficiency, compiler mechanics, operating systems, and building core technological engines from the hardware level up.
                </p>
              </div>

              {/* CA Banner */}
              <div className="glass-panel p-6 rounded-2xl border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-slate-900/60 to-transparent">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-400 flex items-center justify-center">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Computer Applications (BCA)</h3>
                    <span className="text-xs font-mono text-purple-400">The "What It Solves & Builds" Approach</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Focuses on full-stack web platforms, mobile application development, enterprise database tooling, user experience design, and creating client-ready digital products.
                </p>
              </div>
            </div>

            {/* Dimensional Rows */}
            <div className="space-y-4">
              {CS_VS_CA_DIMENSIONS.map((item, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-xl p-5 border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                      {item.dimension}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* CS Side */}
                    <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs">
                      <div className="text-[11px] font-mono font-bold text-cyan-400 mb-1">
                        COMPUTER SCIENCE
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-2">{item.computerScience}</p>
                      <div className="inline-block px-2 py-0.5 rounded bg-cyan-950/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                        {item.csHighlight}
                      </div>
                    </div>

                    {/* CA Side */}
                    <div className="p-3.5 rounded-lg bg-purple-950/20 border border-purple-500/20 text-xs">
                      <div className="text-[11px] font-mono font-bold text-purple-400 mb-1">
                        COMPUTER APPLICATIONS
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-2">{item.computerApplications}</p>
                      <div className="inline-block px-2 py-0.5 rounded bg-purple-950/80 text-[10px] font-mono text-purple-300 border border-purple-500/30">
                        {item.caHighlight}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Tab 2: Find Your Pathway Challenge Quiz */
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-purple-500/30 max-w-3xl mx-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Aptitude Challenge Assessment</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Which Department Aligns with Your Passions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-8 leading-relaxed">
              Answer the 4 scenario questions below. Based on your preferences, C² Tech will recommend whether Computer Science or Computer Applications is your natural fit!
            </p>

            <div className="space-y-6 mb-8">
              {PATHWAY_QUIZ.map((q) => {
                const answer = quizAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-sm font-semibold text-white mb-3">
                      <span className="font-mono text-xs text-purple-400 mr-2">0{q.id}.</span>
                      {q.question}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => handleSelectQuizOption(q.id, 'CS')}
                        className={`text-left p-3 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                          answer === 'CS'
                            ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-[10px] text-cyan-400 font-bold mb-1">Option A</span>
                        {q.optionCS}
                      </button>

                      <button
                        onClick={() => handleSelectQuizOption(q.id, 'CA')}
                        className={`text-left p-3 rounded-lg text-xs font-mono transition-all border cursor-pointer ${
                          answer === 'CA'
                            ? 'bg-purple-950/70 border-purple-400 text-purple-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-[10px] text-purple-400 font-bold mb-1">Option B</span>
                        {q.optionCA}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Results or Submit Button */}
            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < PATHWAY_QUIZ.length}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
              >
                Analyze My Results ({Object.keys(quizAnswers).length}/{PATHWAY_QUIZ.length} answered)
              </button>
            ) : (
              <div className="p-6 rounded-xl bg-slate-950 border border-purple-500/40 text-center animate-fadeIn">
                <div className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">
                  EVALUATION RESULT
                </div>
                <h4 className="text-2xl font-black text-white mb-3">
                  {csCount > caCount
                    ? 'Recommended: Department of Computer Science (B.Sc CS)'
                    : caCount > csCount
                    ? 'Recommended: Department of Computer Applications (BCA)'
                    : 'Balanced Polymath: Both CS and CA are Excellent Fits!'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed mb-6">
                  {csCount > caCount
                    ? 'You are intrigued by computational depth, algorithmic performance, memory management, and system architecture. The Department of Computer Science will provide you with strong theoretical foundations!'
                    : caCount > csCount
                    ? 'You enjoy crafting user-facing digital applications, modern web ecosystems, database architectures, and deploying tangible software tools. The Department of Computer Applications is tailored for your practical creativity!'
                    : 'You possess a balanced interest in both low-level algorithmic problem solving and practical full-stack application development.'}
                </p>

                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-5 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Aptitude Assessment</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
