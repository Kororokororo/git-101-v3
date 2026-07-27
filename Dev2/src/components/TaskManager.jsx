import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, Plus, Trash2, Tag, CheckCircle2 } from 'lucide-react';

export const TaskManager = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('pulseflow_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: '1', title: 'ออกแบบ UI/UX ของระบบ PulseFlow Studio', priority: 'high', completed: true, pomodoros: 2 },
      { id: '2', title: 'เขียนอัลกอริทึมสังเคราะห์เสียงด้วย Web Audio API', priority: 'high', completed: false, pomodoros: 3 },
      { id: '3', title: 'รีวิวแนวคิดและสถาปัตยกรรมแอปพลิเคชัน', priority: 'medium', completed: false, pomodoros: 1 }
    ];
  });

  const [inputTitle, setInputTitle] = useState('');
  const [priority, setPriority] = useState('high');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('pulseflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: inputTitle.trim(),
      priority,
      completed: false,
      pomodoros: 1
    };

    setTasks([newTask, ...tasks]);
    setInputTitle('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const priorityColors = {
    high: { label: 'High', color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' },
    medium: { label: 'Medium', color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.15)' },
    low: { label: 'Low', color: '#10B981', bg: 'rgba(16, 185, 129, 0.15)' }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} color="var(--primary-purple)" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Smart Flow & Task Manager</h2>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          สำเร็จ {completedCount} / {tasks.length} งาน
        </span>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '10px', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="เพิ่มสิ่งที่ต้องทำในวันนี้..."
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          style={{
            flex: 1,
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '12px 16px',
            color: '#FFF',
            fontSize: '0.92rem',
            outline: 'none'
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '0 12px',
            color: '#FFF',
            fontSize: '0.85rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <option value="high" style={{ background: '#0F172A' }}>🔴 สำคัญมาก</option>
          <option value="medium" style={{ background: '#0F172A' }}>🟡 ปานกลาง</option>
          <option value="low" style={{ background: '#0F172A' }}>🟢 ทั่วไป</option>
        </select>

        <button type="submit" className="glass-button active" style={{ padding: '0 18px' }}>
          <Plus size={18} />
          <span>เพิ่ม</span>
        </button>
      </form>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1.25rem' }}>
        {['all', 'active', 'completed'].map((fKey) => (
          <button
            key={fKey}
            onClick={() => setFilter(fKey)}
            style={{
              background: filter === fKey ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              color: filter === fKey ? '#FFF' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {fKey === 'all' ? 'ทั้งหมด' : fKey === 'active' ? 'กำลังทำ' : 'เสร็จแล้ว'}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto', paddingRight: '4px' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            ไม่มีรายการงานในหมวดหมู่นี้
          </div>
        ) : (
          filteredTasks.map((task) => {
            const pMeta = priorityColors[task.priority];
            return (
              <div
                key={task.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: task.completed ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  opacity: task.completed ? 0.6 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    {task.completed ? (
                      <CheckSquare size={20} color="var(--emerald-accent)" />
                    ) : (
                      <Square size={20} color="var(--text-muted)" />
                    )}
                  </button>

                  <span style={{
                    fontSize: '0.92rem',
                    color: task.completed ? 'var(--text-dim)' : '#FFF',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {task.title}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: pMeta.color,
                    background: pMeta.bg,
                    padding: '2px 8px',
                    borderRadius: '6px'
                  }}>
                    {pMeta.label}
                  </span>

                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.6 }}
                    title="ลบงาน"
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
