import React, { useState } from 'react';
import { Volume2, VolumeX, CloudRain, BrainCircuit, Waves, Flame, Sparkles, Sliders } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

export const AudioMixer = ({ onAudioStateChange }) => {
  const [masterVol, setMasterVol] = useState(0.8);
  const [volumes, setVolumes] = useState({
    rain: 0.3,
    binaural: 0.2,
    waves: 0,
    campfire: 0,
    space: 0
  });

  const handleMasterChange = (e) => {
    const val = parseFloat(e.target.value);
    setMasterVol(val);
    audioEngine.setMasterVolume(val);
  };

  const handleLayerChange = (layerKey, val) => {
    const newVols = { ...volumes, [layerKey]: val };
    setVolumes(newVols);

    // Call Audio Engine Method
    if (layerKey === 'rain') audioEngine.setRainVolume(val);
    if (layerKey === 'binaural') audioEngine.setBinauralVolume(val);
    if (layerKey === 'waves') audioEngine.setWavesVolume(val);
    if (layerKey === 'campfire') audioEngine.setCampfireVolume(val);
    if (layerKey === 'space') audioEngine.setSpaceVolume(val);

    const hasAnyActive = Object.values(newVols).some((v) => v > 0);
    onAudioStateChange(hasAnyActive);
  };

  const applyPreset = (presetName) => {
    let target = { rain: 0, binaural: 0, waves: 0, campfire: 0, space: 0 };
    
    if (presetName === 'deep') {
      target = { rain: 0.4, binaural: 0.3, waves: 0, campfire: 0, space: 0.2 };
    } else if (presetName === 'rain') {
      target = { rain: 0.7, binaural: 0, waves: 0, campfire: 0.4, space: 0 };
    } else if (presetName === 'cosmic') {
      target = { rain: 0, binaural: 0.2, waves: 0.3, campfire: 0, space: 0.6 };
    } else if (presetName === 'mute') {
      target = { rain: 0, binaural: 0, waves: 0, campfire: 0, space: 0 };
    }

    Object.keys(target).forEach((key) => {
      handleLayerChange(key, target[key]);
    });
  };

  const tracks = [
    { key: 'rain', label: 'เสียงฝนธรรมชาติ', icon: CloudRain, color: '#38BDF8' },
    { key: 'binaural', label: 'ความถี่โฟกัส 40Hz Gamma', icon: BrainCircuit, color: '#8B5CF6' },
    { key: 'waves', label: 'เสียงคลื่นทะเล', icon: Waves, color: '#06B6D4' },
    { key: 'campfire', label: 'เสียงกองไฟ อบอุ่น', icon: Flame, color: '#F59E0B' },
    { key: 'space', label: 'Space Ambient Drone', icon: Sparkles, color: '#EC4899' }
  ];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      {/* Panel Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sliders size={20} color="var(--cyan-accent)" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Ambient Soundscape Engine</h2>
        </div>

        {/* Master Volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '160px' }}>
          {masterVol === 0 ? <VolumeX size={18} color="var(--text-muted)" /> : <Volume2 size={18} color="var(--cyan-accent)" />}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={masterVol}
            onChange={handleMasterChange}
            title="Master Volume"
          />
        </div>
      </div>

      {/* Presets */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button className="glass-button" onClick={() => applyPreset('deep')}>⚡ Deep Focus</button>
        <button className="glass-button" onClick={() => applyPreset('rain')}>🌧️ Rainy Cafe</button>
        <button className="glass-button" onClick={() => applyPreset('cosmic')}>🌌 Cosmic Drift</button>
        <button className="glass-button" onClick={() => applyPreset('mute')} style={{ opacity: 0.7 }}>🔇 ปิดเสียงทั้งหมด</button>
      </div>

      {/* Sound Track Sliders Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        {tracks.map((t) => {
          const Icon = t.icon;
          const currentVal = volumes[t.key];
          const isActive = currentVal > 0;

          return (
            <div
              key={t.key}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr 50px',
                alignItems: 'center',
                gap: '16px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: isActive ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                border: isActive ? `1px solid ${t.color}40` : '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '220px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: isActive ? `${t.color}25` : 'rgba(255,255,255,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={18} color={isActive ? t.color : '#64748B'} />
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: isActive ? 600 : 400, color: isActive ? '#FFF' : 'var(--text-muted)' }}>
                  {t.label}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={currentVal}
                onChange={(e) => handleLayerChange(t.key, parseFloat(e.target.value))}
              />

              <span style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? t.color : 'var(--text-dim)',
                textAlign: 'right'
              }}>
                {Math.round(currentVal * 100)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
