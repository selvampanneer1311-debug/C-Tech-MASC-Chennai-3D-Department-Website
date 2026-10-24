import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScore,
  getScoreEvaluation,
  formatTime,
  sortLeaderboard,
  validateContactForm,
  filterQuizQuestions
} from './quiz';
import { QuizQuestion, LeaderboardEntry } from '../types';

test('calculateScore calculates correct count and percentage', () => {
  const dummyQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      category: 'CS',
      difficulty: 'easy',
      question: 'Test Q1',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 1,
      explanation: 'Explanation 1',
    },
    {
      id: 'q2',
      category: 'CS',
      difficulty: 'easy',
      question: 'Test Q2',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 0,
      explanation: 'Explanation 2',
    },
    {
      id: 'q3',
      category: 'CS',
      difficulty: 'easy',
      question: 'Test Q3',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 2,
      explanation: 'Explanation 3',
    },
    {
      id: 'q4',
      category: 'CS',
      difficulty: 'easy',
      question: 'Test Q4',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 3,
      explanation: 'Explanation 4',
    },
  ];

  // 3 out of 4 correct = 75%
  const answers = {
    q1: 1, // correct
    q2: 0, // correct
    q3: 1, // incorrect (expected 2)
    q4: 3, // correct
  };

  const result = calculateScore(answers, dummyQuestions);
  assert.equal(result.score, 3);
  assert.equal(result.total, 4);
  assert.equal(result.percentage, 75);
  assert.equal(result.passed, true);
});

test('calculateScore handles empty inputs gracefully', () => {
  const result = calculateScore({}, []);
  assert.equal(result.score, 0);
  assert.equal(result.percentage, 0);
  assert.equal(result.passed, false);
});

test('getScoreEvaluation assigns appropriate rank and badge', () => {
  const elite = getScoreEvaluation(95);
  assert.ok(elite.rankTitle.includes('ELITE'));

  const junior = getScoreEvaluation(40);
  assert.ok(junior.rankTitle.includes('INITIATE'));
});

test('formatTime properly formats seconds to mm:ss', () => {
  assert.equal(formatTime(0), '00:00');
  assert.equal(formatTime(65), '01:05');
  assert.equal(formatTime(300), '05:00');
});

test('sortLeaderboard ranks higher percentages and faster times first', () => {
  const entries: LeaderboardEntry[] = [
    {
      id: '1',
      studentName: 'Alice',
      category: 'CS',
      difficulty: 'easy',
      score: 3,
      totalQuestions: 4,
      percentage: 75,
      date: '2026-10-24',
      timeSpentSeconds: 40,
    },
    {
      id: '2',
      studentName: 'Bob',
      category: 'CS',
      difficulty: 'easy',
      score: 4,
      totalQuestions: 4,
      percentage: 100,
      date: '2026-10-24',
      timeSpentSeconds: 50,
    },
    {
      id: '3',
      studentName: 'Charlie',
      category: 'CS',
      difficulty: 'easy',
      score: 3,
      totalQuestions: 4,
      percentage: 75,
      date: '2026-10-24',
      timeSpentSeconds: 30, // same score as Alice but faster
    },
  ];

  const sorted = sortLeaderboard(entries);
  assert.equal(sorted[0].studentName, 'Bob'); // 100%
  assert.equal(sorted[1].studentName, 'Charlie'); // 75% in 30s
  assert.equal(sorted[2].studentName, 'Alice'); // 75% in 40s
});

test('validateContactForm rejects invalid emails and short fields', () => {
  const invalid = validateContactForm('A', 'not-an-email', 'short');
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm('Sreejith MASC', 'sreejith@example.com', 'Interested in CS department course structure.');
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('filterQuizQuestions filters by category and difficulty', () => {
  const sampleQuestions: QuizQuestion[] = [
    { id: '1', category: 'CS', difficulty: 'easy', question: 'q', options: ['a','b','c','d'], correctIndex: 0, explanation: '' },
    { id: '2', category: 'CS', difficulty: 'hard', question: 'q', options: ['a','b','c','d'], correctIndex: 0, explanation: '' },
    { id: '3', category: 'CA', difficulty: 'easy', question: 'q', options: ['a','b','c','d'], correctIndex: 0, explanation: '' },
  ];

  const csEasy = filterQuizQuestions(sampleQuestions, 'CS', 'easy');
  assert.equal(csEasy.length, 1);
  assert.equal(csEasy[0].id, '1');
});
