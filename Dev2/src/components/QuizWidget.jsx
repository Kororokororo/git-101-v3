import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertCircle, RefreshCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/csKnowledgeData';

export const QuizWidget = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const q = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === q.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (score >= 3) {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      }
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(5, 8, 15, 0.8)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100
    }}>
      <div className="glass-panel" style={{
        maxWidth: '560px',
        width: '90%',
        padding: '2rem',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={20} color="var(--text-muted)" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <Award size={24} color="#8B5CF6" />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Computer Science Challenge</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  คำถามที่ {currentIdx + 1} จาก {QUIZ_QUESTIONS.length}
                </span>
              </div>
            </div>

            {/* Question Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '1.25rem',
              borderRadius: '14px',
              fontSize: '1.05rem',
              fontWeight: 700,
              lineHeight: 1.5,
              marginBottom: '1.5rem',
              color: '#FFF'
            }}>
              {q.question}
            </div>

            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem' }}>
              {q.options.map((opt, idx) => {
                let optStyle = {
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#F8FAFC'
                };

                if (isAnswered) {
                  if (idx === q.correct) {
                    optStyle = { background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', color: '#FFF' };
                  } else if (idx === selectedOpt) {
                    optStyle = { background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', color: '#FFF' };
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    style={{
                      ...optStyle,
                      padding: '14px 18px',
                      borderRadius: '12px',
                      textAlign: 'left',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      cursor: isAnswered ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === q.correct && <CheckCircle2 size={18} color="#10B981" />}
                    {isAnswered && idx === selectedOpt && idx !== q.correct && <AlertCircle size={18} color="#EF4444" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answering */}
            {isAnswered && (
              <div style={{
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.85rem',
                color: '#C4B5FD',
                marginBottom: '1.5rem',
                lineHeight: 1.5
              }}>
                💡 <strong>คำอธิบาย:</strong> {q.explanation}
              </div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button className="glass-button active" onClick={handleNextQuestion} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                <span>{currentIdx + 1 === QUIZ_QUESTIONS.length ? 'ดูสรุปผลคะแนน 🎉' : 'ข้อถัดไป ➔'}</span>
              </button>
            )}
          </div>
        ) : (
          /* Quiz Completed Screen */
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <Sparkles size={48} color="#06B6D4" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }} className="text-gradient">
              ทำแบบทดสอบเรียบร้อย!
            </h3>
            <p style={{ color: 'var(--text-muted)', margin: '8px 0 1.5rem 0' }}>
              คะแนนรวมของคุณในหมวดวิทยาการคอมพิวเตอร์
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '16px',
              fontSize: '3rem',
              fontWeight: 800,
              color: '#06B6D4',
              marginBottom: '1.5rem'
            }}>
              {score} / {QUIZ_QUESTIONS.length}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="glass-button active" onClick={resetQuiz} style={{ flex: 1, justifyContent: 'center' }}>
                <RefreshCcw size={16} />
                <span>ลองทำอีกครั้ง</span>
              </button>
              <button className="glass-button" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>
                <span>ปิดหน้าต่าง</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
