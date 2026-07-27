import React, { useState, useEffect } from 'react';
import { Zap, BarChart2, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export const Header = ({ onOpenStats, totalFocusMinutes }) => {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const formattedTime = time.toLocaleTimeString('th-TH', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1.25rem 2rem',
      position: 'relative',
      zIndex: 10,
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
        }}>
          <Zap size={24} color="#FFF" />
        </div>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            PulseFlow <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#06B6D4' }}>STUDIO</span>
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ambient Productivity Workspace</p>
        </div>
      </div>

      {/* Clock & Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '6px 16px',
          borderRadius: '99px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10B981',
            boxShadow: '0 0 10px #10B981'
          }}></span>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#E2E8F0' }}>DEEP FOCUS ACTIVE</span>
        </div>

        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--cyan-accent)',
          letterSpacing: '1px'
        }}>
          {formattedTime}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="glass-button" onClick={onOpenStats} title="View Productivity Stats">
            <BarChart2 size={18} color="#C4B5FD" />
            <span>{totalFocusMinutes} นาที</span>
          </button>

          <button className="glass-button" onClick={toggleFullscreen} title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
