import React, { useState, useEffect, useRef } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import { ProfileHeader } from './components/ProfileHeader';
import { LinkCardsGroup } from './components/LinkCardsGroup';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CoffeeModal } from './components/CoffeeModal';
import { Check, Copy } from 'lucide-react';

export function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme_preference');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [isCoffeeModalOpen, setIsCoffeeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('natthakorn.j@example.com');
    showToast('คัดลอกอีเมลเรียบร้อยแล้ว! 📩 (natthakorn.j@example.com)');
  };

  const handleScrollToProjects = () => {
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    showToast('ขอบคุณที่สนใจติดต่องาน! สามารถส่งอีเมลได้ที่ natthakorn.j@example.com');
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-between p-4 sm:p-6 overflow-x-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background Decorative Ambient Glow Orbs */}
      <div className="fixed top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="fixed bottom-10 right-10 w-[300px] h-[300px] bg-gradient-to-br from-pink-500/10 to-violet-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Top Navbar Header */}
      <header className="w-full max-w-md flex justify-between items-center z-10 py-2">
        <div className="text-xs font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
          Digital Business Card
        </div>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </header>

      {/* Main Digital Card Wrapper */}
      <main className="w-full max-w-md z-10 flex flex-col items-center my-auto">
        <ProfileHeader onCopyEmail={handleCopyEmail} />
        
        <LinkCardsGroup
          onOpenCoffeeModal={() => setIsCoffeeModalOpen(true)}
          onScrollToProjects={handleScrollToProjects}
          onContactClick={handleContactClick}
        />

        <ProjectsShowcase sectionRef={projectsRef} />
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md text-xs font-semibold animate-bounce-slow">
          <Check className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full max-w-md text-center py-6 text-xs text-slate-400 dark:text-slate-500 z-10 border-t border-slate-200/50 dark:border-slate-800/50 mt-4">
        <p>© {new Date().getFullYear()} Natthakorn Jehram. All rights reserved.</p>
        <p className="mt-1 text-[11px] text-slate-400/80">Built with React & Tailwind CSS</p>
      </footer>

      {/* Coffee Support Modal */}
      <CoffeeModal
        isOpen={isCoffeeModalOpen}
        onClose={() => setIsCoffeeModalOpen(false)}
      />
    </div>
  );
}

export default App;
