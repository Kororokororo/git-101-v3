import React from 'react';
import { X, Award, Flame, Clock, Zap, Share2 } from 'lucide-react';

export const StatsModal = ({ isOpen, onClose, totalMinutes, sessionsCompleted }) => {
  if (!isOpen) return null;

  const flowScore = Math.min(100, Math.round((totalMinutes / 60) * 25 + sessionsCompleted * 10));

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(5, 8, 15, 0.75)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-panel" style={{
        maxWidth: '480px',
        width: '90%',
        padding: '2rem',
        position: 'relative',
        animation: 'floatSlow 6s ease-in-out infinite'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <X size={20} color="var(--text-muted)" />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <Award size={24} color="var(--cyan-accent)" />
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Productivity Flow Report</h2>
        </div>

        {/* Big Score Badge */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(6,182,212,0.15) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '16px',
          padding: '1.5rem',
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Daily Flow Score
          </span>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#FFF', lineHeight: 1.1, margin: '8px 0' }} className="text-gradient">
            {flowScore} <span style={{ fontSize: '1.5rem', color: 'var(--cyan-accent)' }}>/ 100</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            สภาวะจิตใจจดจ่อระดับสูงสุด (Peak Focus State)
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '1.5rem' }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '14px',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cyan-accent)', marginBottom: '4px' }}>
              <Clock size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>เวลาโฟกัสรวม</span>
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFF' }}>{totalMinutes} นาที</span>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '14px',
            borderRadius: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--amber-accent)', marginBottom: '4px' }}>
              <Flame size={16} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Streak ความต่อเนื่อง</span>
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFF' }}>3 วันรวด 🔥</span>
          </div>
        </div>

        <button
          className="glass-button active"
          onClick={() => {
            alert('คัดลอกสถิติของคุณไปยัง Clipboard แล้ว! พร้อมแชร์ลง Social Media');
            onClose();
          }}
          style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
        >
          <Share2 size={18} />
          <span>แชร์สรุปสถิติลงโซเชียล</span>
        </button>
      </div>
    </div>
  );
};
