import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Zap, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioEngine } from '../utils/audioEngine';

export const PomodoroTimer = ({ onSessionComplete }) => {
  const [mode, setMode] = useState('work'); // 'work' | 'short' | 'long'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(25 * 60);

  const timerRef = useRef(null);

  const modes = {
    work: { name: 'Focus Phase', duration: 25 * 60, color: '#8B5CF6', icon: Zap },
    short: { name: 'Short Break', duration: 5 * 60, color: '#06B6D4', icon: Coffee },
    long: { name: 'Rest & Recharge', duration: 15 * 60, color: '#10B981', icon: Moon }
  };

  const currentModeConfig = modes[mode];

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            
            // Audio chime & confetti
            audioEngine.playChime();
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

            if (mode === 'work') {
              onSessionComplete(Math.round(initialTime / 60));
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, mode, initialTime, onSessionComplete]);

  const changeMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    const dur = modes[newMode].duration;
    setTimeLeft(dur);
    setInitialTime(dur);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  // Format Time
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // SVG Progress calculation
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / initialTime) * circumference;

  const IconComponent = currentModeConfig.icon;

  return (
    <div className="glass-panel" style={{
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    }}>
      {/* Mode Switcher */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: 'rgba(255, 255, 255, 0.04)',
        padding: '6px',
        borderRadius: '14px',
        marginBottom: '2rem'
      }}>
        {Object.keys(modes).map((mKey) => (
          <button
            key={mKey}
            onClick={() => changeMode(mKey)}
            style={{
              background: mode === mKey ? modes[mKey].color : 'transparent',
              color: mode === mKey ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '10px',
              padding: '8px 16px',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.25 ease'
            }}
          >
            {modes[mKey].name}
          </button>
        ))}
      </div>

      {/* SVG Circular Timer */}
      <div style={{ position: 'relative', width: '260px', height: '260px', marginBottom: '1.5rem' }}>
        <svg width="260" height="260" viewBox="0 0 260 260">
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="10"
          />
          <circle
            cx="130"
            cy="130"
            r={radius}
            fill="none"
            stroke={currentModeConfig.color}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.8s ease',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              filter: `drop-shadow(0 0 12px ${currentModeConfig.color}80)`
            }}
          />
        </svg>

        {/* Center Display */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: currentModeConfig.color, marginBottom: '4px' }}>
            <IconComponent size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {currentModeConfig.name}
            </span>
          </div>
          <span style={{
            fontSize: '3.4rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: '#FFF',
            letterSpacing: '-1px'
          }}>
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleTimer}
          style={{
            background: isRunning ? 'rgba(239, 68, 68, 0.2)' : currentModeConfig.color,
            border: isRunning ? '1px solid #EF4444' : 'none',
            color: '#FFF',
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isRunning ? 'none' : `0 0 25px ${currentModeConfig.color}60`,
            transition: 'all 0.2s ease'
          }}
        >
          {isRunning ? <Pause size={24} color="#EF4444" /> : <Play size={24} style={{ marginLeft: '4px' }} />}
        </button>

        <button
          onClick={resetTimer}
          className="glass-button"
          style={{ width: '44px', height: '44px', borderRadius: '50%', padding: 0, justifyContent: 'center' }}
          title="Reset Timer"
        >
          <RotateCcw size={18} color="var(--text-muted)" />
        </button>
      </div>
    </div>
  );
};
