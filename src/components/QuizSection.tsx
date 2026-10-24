import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Terminal, 
  Clock, 
  RotateCcw, 
  CheckCircle, 
  XCircle, 
  Award, 
  ArrowRight, 
  Save, 
  Flame, 
  Check, 
  Layers, 
  HelpCircle 
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { DepartmentType, DifficultyLevel, LeaderboardEntry, QuizQuestion } from '../types';
import { calculateScore, formatTime, getScoreEvaluation } from '../utils/quiz';

interface QuizSectionProps {
  initialDepartment?: DepartmentType;
  onScoreSaved?: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ 
  initialDepartment = 'CS',
  onScoreSaved
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DepartmentType>(initialDepartment);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');

  // Quiz State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Leaderboard save state
  const [studentName, setStudentName] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // Initialize or Reset Questions
  const loadQuestions = () => {
    const matching = QUIZ_QUESTIONS.filter(
      (q) => q.category === selectedCategory && q.difficulty === difficulty
    );
    // Shuffle questions
    const shuffled = [...matching].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    setQuizFinished(false);
    setTimerSeconds(30);
    setTotalTimeSpent(0);
    setIsTimerActive(true);
    setIsSaved(false);
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedCategory, difficulty]);

  // Sync prop changes
  useEffect(() => {
    if (initialDepartment) {
      setSelectedCategory(initialDepartment);
    }
  }, [initialDepartment]);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTimerActive || quizFinished) return;

    const timer = setInterval(() => {
      setTotalTimeSpent((prev) => prev + 1);
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          // Time expired for this question -> auto-reveal explanation
          setShowExplanation(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, quizFinished, currentIndex]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (showExplanation || !currentQ) return;

    setSelectedOption(idx);
    setShowExplanation(true);

    const updatedAnswers = { ...userAnswers, [currentQ.id]: idx };
    setUserAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setTimerSeconds(30);
    } else {
      // Quiz Finished
      setQuizFinished(true);
      setIsTimerActive(false);

      const finalScore = calculateScore(userAnswers, questions);
      if (finalScore.percentage >= 60) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
    }
  };

  const scoreResult = calculateScore(userAnswers, questions);
  const evaluation = getScoreEvaluation(scoreResult.percentage);

  const handleSaveToLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || isSaved) return;

    const newEntry: LeaderboardEntry = {
      id: `score-${Date.now()}`,
      studentName: studentName.trim(),
      category: selectedCategory,
      difficulty,
      score: scoreResult.score,
      totalQuestions: scoreResult.total,
      percentage: scoreResult.percentage,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timeSpentSeconds: totalTimeSpent,
    };

    try {
      const stored = localStorage.getItem('masc_codeverse_leaderboard');
      const parsed: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
      parsed.push(newEntry);
      localStorage.setItem('masc_codeverse_leaderboard', JSON.stringify(parsed));
      setIsSaved(true);
      if (onScoreSaved) {
        onScoreSaved();
      }
    } catch {
      setIsSaved(true);
    }
  };

  return (
    <section id="quiz" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>KNOWLEDGE ARENA // EVALUATION MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Interactive Coding Quiz
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real-time algorithmic & application challenges with immediate feedback, timer pacing, and device-saved leaderboards.
          </p>
        </div>

        {/* Category & Difficulty Selection Bar */}
        <div className="glass-panel p-4 rounded-2xl border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Category Tabs: CS vs CA */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('CS')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'CS'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Dept of Computer Science
            </button>
            <button
              onClick={() => setSelectedCategory('CA')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'CA'
                  ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Dept of Computer Applications
            </button>
          </div>

          {/* Difficulty Tabs: Easy, Medium, Hard */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center">
            {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all cursor-pointer ${
                  difficulty === level
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Quiz Body */}
        {!quizFinished ? (
          questions.length > 0 && currentQ ? (
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border-cyan-500/20 relative shadow-2xl">
              {/* Progress Bar & Header */}
              <div className="flex items-center justify-between mb-4 text-xs font-mono">
                <span className="text-cyan-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>

                {/* Question Countdown Timer */}
                <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  <Clock className={`w-3.5 h-3.5 ${timerSeconds <= 8 ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`} />
                  <span className={timerSeconds <= 8 ? 'text-rose-400 font-bold' : ''}>
                    {timerSeconds}s
                  </span>
                </div>
              </div>

              {/* Visual Progress Line */}
              <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 leading-relaxed">
                {currentQ.question}
              </h3>

              {/* 4 Options Grid */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  let optionStyles = 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (showExplanation) {
                    if (idx === currentQ.correctIndex) {
                      optionStyles = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
                    } else if (selectedOption === idx) {
                      optionStyles = 'bg-rose-950/70 border-rose-500 text-rose-200';
                    } else {
                      optionStyles = 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-60';
                    }
                  } else if (selectedOption === idx) {
                    optionStyles = 'bg-cyan-950/60 border-cyan-400 text-cyan-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-4 rounded-xl border font-mono text-xs sm:text-sm transition-all duration-200 flex items-center justify-between cursor-pointer ${optionStyles}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-950 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-800 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {showExplanation && idx === currentQ.correctIndex && (
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {showExplanation && selectedOption === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Feedback Explanation Box */}
              {showExplanation && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-bold">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span className={selectedOption === currentQ.correctIndex ? 'text-emerald-400' : 'text-amber-400'}>
                      {selectedOption === currentQ.correctIndex ? 'Correct Analysis' : 'Explanation & Insight'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Navigation Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={loadQuestions}
                  className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart Quiz</span>
                </button>

                {showExplanation && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 glass-panel rounded-2xl">
              <p className="text-slate-400 text-sm">Loading quiz questions for this category...</p>
            </div>
          )
        ) : (
          /* Finished Screen */
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border-cyan-500/30 text-center relative shadow-2xl animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
              QUIZ COMPLETED // {selectedCategory} • {difficulty.toUpperCase()}
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              Performance Assessment
            </h3>

            {/* Score Stats */}
            <div className="flex items-center justify-center gap-6 my-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-w-[120px]">
                <span className="text-xs font-mono text-slate-400 block mb-1">Score</span>
                <span className="text-2xl sm:text-3xl font-black text-cyan-400">
                  {scoreResult.score} / {scoreResult.total}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-w-[120px]">
                <span className="text-xs font-mono text-slate-400 block mb-1">Accuracy</span>
                <span className="text-2xl sm:text-3xl font-black text-purple-400">
                  {scoreResult.percentage}%
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 min-w-[120px]">
                <span className="text-xs font-mono text-slate-400 block mb-1">Time</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400">
                  {formatTime(totalTimeSpent)}
                </span>
              </div>
            </div>

            {/* Evaluation Badge */}
            <div className={`inline-block px-4 py-2 rounded-xl border text-xs font-mono font-bold mb-4 ${evaluation.badgeColor}`}>
              RANK: {evaluation.rankTitle}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8">
              {evaluation.commentary}
            </p>

            {/* Save to Local Leaderboard Form */}
            <form onSubmit={handleSaveToLeaderboard} className="max-w-md mx-auto mb-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-left text-xs font-mono text-slate-400 mb-2">
                Submit score to device leaderboard:
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Student Name / Roll No"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  disabled={isSaved}
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={isSaved || !studentName.trim()}
                  className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-cyan-500 text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              {isSaved && (
                <div className="text-[11px] text-emerald-400 mt-2 text-left font-mono">
                  ✓ Recorded to local device storage! Check the Student Leaderboard section.
                </div>
              )}
            </form>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={loadQuestions}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-cyan-400" />
                <span>Try Another Random Set</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
