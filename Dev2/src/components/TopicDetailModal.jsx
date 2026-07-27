import React from 'react';
import { X, Bookmark, Share2, Sparkles, BookOpen } from 'lucide-react';
import { AlgorithmVisualizer } from './AlgorithmVisualizer';
import { CpuSimulator } from './CpuSimulator';
import { CryptoSandbox } from './CryptoSandbox';

export const TopicDetailModal = ({ topic, isOpen, onClose, isBookmarked, onToggleBookmark }) => {
  if (!isOpen || !topic) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(5, 8, 15, 0.85)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '1.5rem'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '840px',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              {topic.tags.map((t, i) => (
                <span key={i} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#06B6D4', background: 'rgba(6, 182, 212, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                  {t}
                </span>
              ))}
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>{topic.title}</h2>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onToggleBookmark(topic.id)}
              className="glass-button"
              style={{ padding: '8px 14px' }}
            >
              <Bookmark size={16} color={isBookmarked ? '#06B6D4' : '#FFF'} fill={isBookmarked ? '#06B6D4' : 'none'} />
              <span>{isBookmarked ? 'บันทึกแล้ว' : 'บุ๊กมาร์ก'}</span>
            </button>

            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <X size={22} color="var(--text-muted)" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '2rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Summary Box */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.1)',
            borderLeft: '4px solid #8B5CF6',
            padding: '1rem 1.25rem',
            borderRadius: '0 12px 12px 0',
            fontSize: '0.95rem',
            color: '#E2E8F0',
            lineHeight: 1.6
          }}>
            💡 <strong>สรุปสาระสำคัญ:</strong> {topic.summary}
          </div>

          {/* Embedded Interactive Tool if applicable */}
          {topic.interactiveType === 'algo-vis' && <AlgorithmVisualizer />}
          {topic.interactiveType === 'cpu-sim' && <CpuSimulator />}
          {topic.interactiveType === 'crypto-sandbox' && <CryptoSandbox />}

          {/* Main Content Render */}
          <div
            style={{
              lineHeight: 1.8,
              fontSize: '0.98rem',
              color: '#CBD5E1',
              whiteSpace: 'pre-line'
            }}
          >
            {topic.content}
          </div>
        </div>
      </div>
    </div>
  );
};
