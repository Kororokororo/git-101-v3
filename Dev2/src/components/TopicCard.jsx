import React from 'react';
import { Bookmark, Clock, Sparkles, Cpu, Globe, Code2, ShieldCheck, Server } from 'lucide-react';

export const TopicCard = ({ topic, isBookmarked, onToggleBookmark, onOpenDetail }) => {
  const iconMap = {
    hardware: Cpu,
    networking: Globe,
    algorithms: Code2,
    security: ShieldCheck,
    web: Server
  };

  const IconComp = iconMap[topic.category] || Sparkles;

  return (
    <div
      className="glass-panel"
      onClick={() => onOpenDetail(topic)}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '100%',
        position: 'relative'
      }}
    >
      <div>
        {/* Top Meta Badges */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '4px 10px',
            borderRadius: '99px',
            fontSize: '0.78rem',
            color: '#E2E8F0',
            fontWeight: 600
          }}>
            <IconComp size={14} color="#06B6D4" />
            <span>{topic.readTime}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(topic.id);
            }}
            style={{
              background: isBookmarked ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: isBookmarked ? '1px solid #06B6D4' : '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Bookmark size={16} color={isBookmarked ? '#06B6D4' : '#64748B'} fill={isBookmarked ? '#06B6D4' : 'none'} />
          </button>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '8px', color: '#FFF' }}>
          {topic.title}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
          {topic.subtitle}
        </p>
      </div>

      {/* Footer Tags */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: 'auto' }}>
        {topic.tags.map((tag, i) => (
          <span
            key={i}
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              background: 'rgba(139, 92, 246, 0.12)',
              color: '#C4B5FD',
              padding: '3px 8px',
              borderRadius: '6px'
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
