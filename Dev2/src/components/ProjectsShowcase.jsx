import React from 'react';
import { ExternalLink, Sparkles, Code2, Flame } from 'lucide-react';

export const ProjectsShowcase = ({ sectionRef }) => {
  const projects = [
    {
      id: 1,
      title: 'PulseFlow Studio',
      subtitle: 'Ambient Focus & Audio Synthesis Workspace',
      description: 'แพลตฟอร์มสังเคราะห์เสียงบรรยากาศ (Web Audio API) และสมาธิสำหรับคนทำงานสาย Deep Work',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
      tags: ['React', 'Web Audio API', 'Tailwind CSS'],
      link: '#'
    },
    {
      id: 2,
      title: 'TechPulse CS Studio',
      subtitle: 'Computer Science Interactive Learning Hub',
      description: 'ศูนย์เรียนรู้และทดลองแอนิเมชันอัลกอริทึม (Sorting Visualizer, CPU Cycle Simulator, Crypto Sandbox)',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      tags: ['React', 'HTML5 Canvas', 'Data Structures'],
      link: '#'
    },
    {
      id: 3,
      title: 'AuraCraft E-Commerce',
      subtitle: 'Modern Storefront & Analytics Dashboard',
      description: 'เว็บไซต์ร้านค้าออนไลน์ประสิทธิภาพสูง พร้อมระบบจัดการสินค้าและแดชบอร์ดสรุปยอดขาย',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      tags: ['Next.js', 'Tailwind', 'Stripe Integration'],
      link: '#'
    }
  ];

  return (
    <div ref={sectionRef} className="w-full pt-8 pb-6 border-t border-slate-200/80 dark:border-slate-800/80">
      {/* Section Title */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-violet-500" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            ผลงานไฮไลท์ (Featured Works)
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400">
          3 Projects
        </span>
      </div>

      {/* Projects Cards Stack */}
      <div className="flex flex-col gap-4">
        {projects.map((p) => (
          <div
            key={p.id}
            className="group glass-card rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:border-cyan-400/50 dark:hover:border-cyan-500/50 transition-all duration-300 card-hover"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Cover Image */}
              <div className="relative w-full sm:w-32 h-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-slate-200 dark:bg-slate-800">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              </div>

              {/* Details */}
              <div className="flex-1 text-left w-full">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base group-hover:text-cyan-500 transition-colors">
                    {p.title}
                  </h3>
                  <a
                    href={p.link}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition"
                    title="เปิดดูผลงาน"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2.5 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-violet-600 dark:text-violet-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
