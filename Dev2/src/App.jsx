import React, { useState } from 'react';
import { VisualizerCanvas } from './components/VisualizerCanvas';
import { Header } from './components/Header';
import { AudioMixer } from './components/AudioMixer';
import { PomodoroTimer } from './components/PomodoroTimer';
import { TaskManager } from './components/TaskManager';
import { StatsModal } from './components/StatsModal';

export function App() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(45);
  const [sessionsCompleted, setSessionsCompleted] = useState(2);

  const handleSessionComplete = (minutesAdded) => {
    setTotalFocusMinutes((prev) => prev + minutesAdded);
    setSessionsCompleted((prev) => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Dynamic Background Visualizer */}
      <VisualizerCanvas isPlaying={isPlayingAudio} />

      {/* Header */}
      <Header
        onOpenStats={() => setIsStatsOpen(true)}
        totalFocusMinutes={totalFocusMinutes}
      />

      {/* Main Content Layout */}
      <main style={{
        flex: 1,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 5
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Column: Pomodoro & Tasks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <PomodoroTimer onSessionComplete={handleSessionComplete} />
            <TaskManager />
          </div>

          {/* Right Column: Audio Ambient Soundscape Generator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AudioMixer onAudioStateChange={setIsPlayingAudio} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        color: 'var(--text-dim)',
        fontSize: '0.85rem',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(255, 255, 255, 0.04)'
      }}>
        <p>PulseFlow Studio • Powered by Node.js Tooling, React & Web Audio API</p>
      </footer>

      {/* Productivity Stats Modal */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        totalMinutes={totalFocusMinutes}
        sessionsCompleted={sessionsCompleted}
      />
    </div>
  );
}

export default App;
