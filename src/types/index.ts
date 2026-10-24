export type DepartmentType = 'CS' | 'CA';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface QuizQuestion {
  id: string;
  category: DepartmentType;
  difficulty: DifficultyLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface LeaderboardEntry {
  id: string;
  studentName: string;
  category: DepartmentType;
  difficulty: DifficultyLevel;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  timeSpentSeconds: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'core-languages' | 'web-dev' | 'data-ai' | 'systems-security';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  keyConcepts: string[];
  departmentAffinity: 'CS' | 'CA' | 'Both';
  iconName: string;
  colorScheme: 'cyan' | 'purple' | 'blue' | 'emerald';
}

export interface CareerPath {
  id: string;
  title: string;
  category: string;
  description: string;
  bestFitDepartment: 'CS' | 'CA' | 'Both';
  keySkills: string[];
  learningOrder: { step: number; title: string; description: string }[];
  tools: string[];
  practiceIdeas: string[];
  careerScope: string;
}

export interface DepartmentInfo {
  id: DepartmentType;
  fullName: string;
  shortName: string;
  codeName: string;
  themeColor: 'cyan' | 'purple';
  tagline: string;
  summary: string;
  coreDomains: { title: string; description: string; icon: string }[];
  curriculumHighlights: string[];
  labFacilities: string[];
  careerAvenues: string[];
}
