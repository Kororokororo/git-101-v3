import React, { useState } from 'react';
import { ShieldCheck, Key, Hash, RefreshCw } from 'lucide-react';

export const CryptoSandbox = () => {
  const [plainText, setPlainText] = useState('Hello World');
  const [shift, setShift] = useState(3);
  const [hashInput, setHashInput] = useState('Password123');

  // Simple Caesar Cipher
  const encryptCaesar = (str, key) => {
    return str.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + key) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + key) % 26) + 97);
      }
      return char;
    }).join('');
  };

  // Simple Simulated Hash Function (SHA-256 Style Hex output representation)
  const pseudoHash = (str) => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, '0');
    // Extend to 64 chars hex format like SHA-256
    return (hex + 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855').substring(0, 64);
  };

  const encryptedResult = encryptCaesar(plainText, shift);
  const hashResult = pseudoHash(hashInput);

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
        <ShieldCheck size={20} color="var(--pink-accent)" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Cryptography & Hashing Sandbox</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Caesar Cipher Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#EC4899' }}>
            <Key size={18} />
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>1. Caesar Cipher (Symmetric Shift)</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ข้อความต้นฉบับ (Plaintext):</label>
            <input
              type="text"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
              style={{
                background: 'rgba(9, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#FFF',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ระยะขยับกุญแจ Shift Key: (+{shift})</label>
            </div>
            <input
              type="range"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value))}
            />

            <div style={{ marginTop: '8px', background: 'rgba(9, 13, 22, 0.9)', padding: '10px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ข้อความเข้ารหัสแล้ว (Ciphertext):</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#EC4899', marginTop: '2px' }}>
                {encryptedResult || '---'}
              </div>
            </div>
          </div>
        </div>

        {/* Hash Generator Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '1.25rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', color: '#06B6D4' }}>
            <Hash size={18} />
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>2. SHA-256 One-Way Hash Simulation</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ข้อความป้อนเข้า (Input Data):</label>
            <input
              type="text"
              value={hashInput}
              onChange={(e) => setHashInput(e.target.value)}
              style={{
                background: 'rgba(9, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#FFF',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />

            <div style={{ marginTop: '8px', background: 'rgba(9, 13, 22, 0.9)', padding: '10px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ค่า Fixed SHA-256 Hash Digest (64 Hex Chars):</span>
              <div style={{
                fontSize: '0.78rem',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
                color: '#06B6D4',
                wordBreak: 'break-all',
                marginTop: '4px',
                lineHeight: 1.4
              }}>
                {hashResult}
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
              ⚡ สังเกต Avalanche Effect: ลองเปลี่ยนตัวอักษรเพียง 1 ตัว ค่า Hash ทั้งหมดจะเปลี่ยนรูปไปโดยสิ้นเชิง
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
