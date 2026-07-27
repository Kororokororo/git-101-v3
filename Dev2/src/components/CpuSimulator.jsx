import React, { useState } from 'react';
import { Cpu, Play, FastForward, RotateCcw, ArrowRight } from 'lucide-react';

export const CpuSimulator = () => {
  const [step, setStep] = useState(0); // 0: Fetch, 1: Decode, 2: Execute, 3: Writeback
  const [pc, setPc] = useState(100);
  const [mar, setMar] = useState('---');
  const [mdr, setMdr] = useState('---');
  const [cir, setCir] = useState('---');
  const [acc, setAcc] = useState(0);
  const [logs, setLogs] = useState(['ระบบ CPU พร้อมทำงาน กรุณากด Step เพื่อเริ่มคำสั่ง']);

  const memory = {
    100: 'ADD 15',
    101: 'SUB 5',
    102: 'STORE ACC'
  };

  const stepsInfo = [
    { title: '1. FETCH (ดึงคำสั่ง)', desc: 'ย้ายตำแหน่งจาก PC ไป MAR แล้วดึงคำสั่งจาก RAM เข้า MDR -> CIR' },
    { title: '2. DECODE (ถอดรหัส)', desc: 'ถอดรหัส Opcode ใน CIR (เช่น ADD 15) เตรียมส่งต่อให้ ALU' },
    { title: '3. EXECUTE (ประมวลผล)', desc: 'ALU คำนวณค่า ACC = ACC + 15' },
    { title: '4. WRITEBACK (บันทึก)', desc: 'อัปเดตค่าใน Accumulator และเพิ่มค่า Program Counter (PC + 1)' }
  ];

  const handleNextStep = () => {
    if (step === 0) {
      setMar(pc);
      const instruction = memory[pc] || 'NOP';
      setMdr(instruction);
      setCir(instruction);
      setLogs((prev) => [`[FETCH] ดึงคำสั่ง "${instruction}" จาก Address [${pc}]`, ...prev]);
      setStep(1);
    } else if (step === 1) {
      setLogs((prev) => [`[DECODE] ถอดรหัสคำสั่ง "${cir}" -> เตรียมบวกค่า 15 ลง Accumulator`, ...prev]);
      setStep(2);
    } else if (step === 2) {
      const newAcc = acc + 15;
      setAcc(newAcc);
      setLogs((prev) => [`[EXECUTE] ALU คำนวณค่าใหม่สำเร็จ ACC = ${newAcc}`, ...prev]);
      setStep(3);
    } else if (step === 3) {
      const nextPc = pc + 1 > 102 ? 100 : pc + 1;
      setPc(nextPc);
      setMar('---');
      setMdr('---');
      setCir('---');
      setLogs((prev) => [`[WRITEBACK] เพิ่มค่า PC -> ${nextPc} พร้อมเริ่มคำสั่งถัดไป`, ...prev]);
      setStep(0);
    }
  };

  const handleReset = () => {
    setStep(0);
    setPc(100);
    setMar('---');
    setMdr('---');
    setCir('---');
    setAcc(0);
    setLogs(['รีเซ็ต CPU เรียบร้อย']);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Cpu size={20} color="var(--cyan-accent)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>CPU Instruction Cycle Simulator</h3>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="glass-button active" onClick={handleNextStep}>
            <FastForward size={16} />
            <span>ถัดไป (Step)</span>
          </button>
          <button className="glass-button" onClick={handleReset}>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Cycle Stage Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        marginBottom: '1.5rem'
      }}>
        {stepsInfo.map((s, idx) => (
          <div
            key={idx}
            style={{
              background: step === idx ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: step === idx ? '1px solid #06B6D4' : '1px solid rgba(255, 255, 255, 0.06)',
              padding: '12px',
              borderRadius: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: step === idx ? '#06B6D4' : '#94A3B8' }}>
              {s.title}
            </div>
          </div>
        ))}
      </div>

      {/* Registers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '1.5rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>PC (Program Counter)</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#8B5CF6' }}>{pc}</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MAR (Address Reg)</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#06B6D4' }}>{mar}</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MDR / CIR (Instruction)</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#F59E0B' }}>{cir}</div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '10px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ACC (Accumulator)</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#10B981' }}>{acc}</div>
        </div>
      </div>

      {/* Logs Console */}
      <div style={{
        background: 'rgba(9, 13, 22, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '10px',
        padding: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        color: '#A5B4FC',
        maxHeight: '110px',
        overflowY: 'auto'
      }}>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: '4px' }}>👉 {log}</div>
        ))}
      </div>
    </div>
  );
};
