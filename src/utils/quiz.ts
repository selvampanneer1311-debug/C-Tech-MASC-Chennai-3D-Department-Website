import { DepartmentType, DifficultyLevel, LeaderboardEntry, QuizQuestion } from '../types';

export interface ScoreResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
}

export function calculateScore(
  userAnswers: Record<string, number>,
  questions: QuizQuestion[]
): ScoreResult {
  if (!questions || questions.length === 0) {
    return { score: 0, total: 0, percentage: 0, passed: false };
  }

  let correctCount = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] !== undefined && userAnswers[q.id] === q.correctIndex) {
      correctCount++;
    }
  });

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);
  const passed = percentage >= 60;

  return {
    score: correctCount,
    total,
    percentage,
    passed,
  };
}

export function getScoreEvaluation(percentage: number): {
  rankTitle: string;
  badgeColor: string;
  commentary: string;
} {
  if (percentage >= 90) {
    return {
      rankTitle: 'CYBER ARCHITECT (ELITE)',
      badgeColor: 'text-cyan-400 border-cyan-500/50 bg-cyan-950/40',
      commentary: 'Exceptional computational intellect! Ready for elite engineering challenges.',
    };
  }
  if (percentage >= 70) {
    return {
      rankTitle: 'SENIOR CODE OPERATIVE',
      badgeColor: 'text-purple-400 border-purple-500/50 bg-purple-950/40',
      commentary: 'Solid algorithmic and application mastery! Keep pushing toward perfection.',
    };
  }
  if (percentage >= 50) {
    return {
      rankTitle: 'SYSTEMS CADET',
      badgeColor: 'text-blue-400 border-blue-500/50 bg-blue-950/40',
      commentary: 'Good conceptual foundation. Review the answer explanations to strengthen your core skills.',
    };
  }
  return {
    rankTitle: 'INITIATE CODER',
    badgeColor: 'text-amber-400 border-amber-500/50 bg-amber-950/40',
    commentary: 'Great start! Explore the Virtual Lab and Skills roadmap to level up your knowledge.',
  };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    // Sort primarily by percentage descending
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    // Then by score descending
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // Then by lower time spent (faster is better)
    return a.timeSpentSeconds - b.timeSpentSeconds;
  });
}

export function filterQuizQuestions(
  allQuestions: QuizQuestion[],
  category: DepartmentType,
  difficulty: DifficultyLevel,
  limit: number = 5
): QuizQuestion[] {
  const filtered = allQuestions.filter(
    (q) => q.category === category && q.difficulty === difficulty
  );
  return filtered.slice(0, limit);
}

export function validateContactForm(
  name: string,
  email: string,
  message: string
): { isValid: boolean; errors: { name?: string; email?: string; message?: string } } {
  const errors: { name?: string; email?: string; message?: string } = {};

  if (!name || name.trim().length < 2) {
    errors.name = 'Please provide your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!message || message.trim().length < 10) {
    errors.message = 'Please provide a message with at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
