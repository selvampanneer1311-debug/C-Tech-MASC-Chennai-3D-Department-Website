import React, { useState, useEffect } from 'react';
import { AnimatedCodeBackground } from './components/AnimatedCodeBackground';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { AboutSection } from './components/AboutSection';
import { DepartmentSection } from './components/DepartmentSection';
import { SkillsSection } from './components/SkillsSection';
import { QuizSection } from './components/QuizSection';
import { CSvsCASection } from './components/CSvsCASection';
import { LeaderboardSection } from './components/LeaderboardSection';
import { CareerRoadmapSection } from './components/CareerRoadmapSection';
import { VirtualLab3D } from './components/VirtualLab3D';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DepartmentType } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [quizCategory, setQuizCategory] = useState<DepartmentType>('CS');
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection observer to track active section while scrolling
  useEffect(() => {
    const sectionIds = [
      'home',
      'about',
      'departments',
      'skills',
      'quiz',
      'cs-vs-ca',
      'leaderboard',
      'roadmap',
      'virtual-lab',
      'contact',
    ];

    const handleScrollObserver = () => {
      const scrollPosition = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollObserver, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollObserver);
  }, []);

  const handleStartQuizFromDept = (dept: DepartmentType) => {
    setQuizCategory(dept);
    scrollToSection('quiz');
  };

  const handleScoreSaved = () => {
    // Refresh leaderboard
    setLeaderboardKey((prev) => prev + 1);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* 1. Animated Live Coding Matrix & Holographic Background */}
      <AnimatedCodeBackground />

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Area */}
      <main className="relative z-10">
        {/* Section 1: Hero */}
        <Hero3D
          onExploreDepartments={() => scrollToSection('departments')}
          onStartQuiz={() => scrollToSection('quiz')}
        />

        {/* Section 2: About College and CODEVERSE */}
        <AboutSection />

        {/* Section 3: Department Selection (CS & CA 3D Cards) */}
        <DepartmentSection onStartQuiz={handleStartQuizFromDept} />

        {/* Section 4: Skills and Technologies (11 skills) */}
        <SkillsSection />

        {/* Section 5: Interactive Coding Quiz */}
        <QuizSection
          initialDepartment={quizCategory}
          onScoreSaved={handleScoreSaved}
        />

        {/* Section 6: CS vs CA Challenge */}
        <CSvsCASection />

        {/* Section 7: Student Leaderboard */}
        <LeaderboardSection
          key={leaderboardKey}
          onTakeQuiz={() => scrollToSection('quiz')}
        />

        {/* Section 8: Career Roadmap (9 trajectories) */}
        <CareerRoadmapSection />

        {/* Section 9: Virtual 3D Computer Lab */}
        <VirtualLab3D />

        {/* Section 10: Contact */}
        <ContactSection />
      </main>

      {/* Section 11: Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}
