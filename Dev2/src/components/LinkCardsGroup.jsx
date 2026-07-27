import React from 'react';
import { Briefcase, Send, BookOpen, FileText, Coffee, ExternalLink } from 'lucide-react';

export const LinkCardsGroup = ({ onOpenCoffeeModal, onScrollToProjects, onContactClick }) => {
  const mainLinks = [
    {
      id: 'portfolio',
      title: 'ดูผลงานไฮไลท์ของฉัน',
      subtitle: 'Showcase Projects & Applications',
      icon: Briefcase,
      iconBg: 'bg-violet-100 dark:bg-violet-950/80 text-violet-600 dark:text-violet-400',
      badge: 'NEW',
      badgeBg: 'bg-violet-500 text-white',
      onClick: onScrollToProjects
    },
    {
      id: 'contact',
      title: 'ติดต่องาน & ว่าจ้างโปรเจกต์',
      subtitle: 'Freelance & Contact Information',
      icon: Send,
      iconBg: 'bg-cyan-100 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400',
      badge: 'Available',
      badgeBg: 'bg-emerald-500 text-white',
      onClick: onContactClick
    },
    {
      id: 'blog',
      title: 'อ่านบล็อก & บทความเทคโนโลยี',
      subtitle: 'Articles, Web Dev Tips & Insights',
      icon: BookOpen,
      iconBg: 'bg-pink-100 dark:bg-pink-950/80 text-pink-600 dark:text-pink-400',
      href: 'https://medium.com'
    },
    {
      id: 'resume',
      title: 'ดาวน์โหลด Resume / CV',
      subtitle: 'PDF Resume & Work Experience',
      icon: FileText,
      iconBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
      href: '#'
    },
    {
      id: 'coffee',
      title: 'เลี้ยงกาแฟสนับสนุนฉัน ☕',
      subtitle: 'Buy Me a Coffee / PromptPay',
      icon: Coffee,
      iconBg: 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400',
      badge: 'Support',
      badgeBg: 'bg-rose-500 text-white',
      onClick: onOpenCoffeeModal
    }
  ];

  return (
    <div className="w-full flex flex-col gap-3.5 my-6">
      {mainLinks.map((link) => {
        const IconComp = link.icon;

        const cardContent = (
          <div className="flex items-center justify-between p-4 rounded-2xl glass-card card-hover cursor-pointer border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-300">
            <div className="flex items-center gap-3.5">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-semibold ${link.iconBg} shadow-inner`}>
                <IconComp className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                    {link.title}
                  </span>
                  {link.badge && (
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${link.badgeBg}`}>
                      {link.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  {link.subtitle}
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-violet-500 transition-colors" />
          </div>
        );

        return link.href ? (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            {cardContent}
          </a>
        ) : (
          <button
            key={link.id}
            onClick={link.onClick}
            className="w-full block group text-left"
          >
            {cardContent}
          </button>
        );
      })}
    </div>
  );
};
