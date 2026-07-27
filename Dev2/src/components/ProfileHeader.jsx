import React from 'react';
import { Github, Linkedin, Instagram, Facebook, Mail, Sparkles } from 'lucide-react';

export const ProfileHeader = ({ onCopyEmail }) => {
  const socials = [
    { name: 'GitHub', icon: Github, href: 'https://github.com', color: 'hover:text-purple-500 hover:border-purple-500/40' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-500 hover:border-blue-500/40' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-500 hover:border-pink-500/40' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-cyan-500 hover:border-cyan-500/40' },
    { name: 'Email', icon: Mail, onClick: onCopyEmail, color: 'hover:text-emerald-500 hover:border-emerald-500/40' }
  ];

  return (
    <div className="flex flex-col items-center text-center pt-6 pb-4">
      {/* Avatar Container with Glowing Gradient Ring */}
      <div className="relative group mb-5">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 via-pink-500 to-cyan-400 blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
          alt="Profile Avatar"
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-xl transform group-hover:scale-105 transition duration-300"
        />
        <div className="absolute bottom-1 right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 shadow-md flex items-center justify-center" title="พร้อมรับงาน (Available for Work)">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
        </div>
      </div>

      {/* Name & Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 dark:from-white dark:via-purple-200 dark:to-cyan-200 bg-clip-text text-transparent mb-1">
        Natthakorn Jehram
      </h1>
      
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100/80 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3 border border-violet-200 dark:border-violet-800/40">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Full-Stack Developer & UI/UX Designer</span>
      </div>

      {/* Slogan */}
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-sm px-4 leading-relaxed font-normal mb-5">
        "มุ่งมั่นรังสรรค์ซอฟต์แวร์และดีไซน์เว็บแอปพลิเคชันที่เรียบหรู ใช้งานง่าย ตอบโจทย์ธุรกิจยุคใหม่"
      </p>

      {/* Social Media Buttons Row */}
      <div className="flex items-center gap-3">
        {socials.map((s, idx) => {
          const IconComp = s.icon;
          return s.href ? (
            <a
              key={idx}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 ${s.color}`}
              aria-label={s.name}
              title={s.name}
            >
              <IconComp className="w-5 h-5" />
            </a>
          ) : (
            <button
              key={idx}
              onClick={s.onClick}
              className={`p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 shadow-sm hover:scale-110 active:scale-95 transition-all duration-200 ${s.color}`}
              aria-label={s.name}
              title="คัดลอกอีเมล"
            >
              <IconComp className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
