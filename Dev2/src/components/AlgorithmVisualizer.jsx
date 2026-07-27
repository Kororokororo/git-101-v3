import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BarChart3, Shuffle } from 'lucide-react';

export const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(16);
  const [speed, setSpeed] = useState(60);
  const [algorithm, setAlgorithm] = useState('bubble'); // 'bubble' | 'selection' | 'insertion'
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });

  const isSortingRef = useRef(false);
  isSortingRef.current = isSorting;

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    setIsSorting(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setStats({ comparisons: 0, swaps: 0 });

    const newArr = [];
    for (let i = 0; i < arraySize; i++) {
      newArr.push(Math.floor(Math.random() * 85) + 15);
    }
    setArray(newArr);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- Bubble Sort ---
  const runBubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;
    let comps = 0;
    let swaps = 0;
    let sorted = [];

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSortingRef.current) return;

        setActiveIndices([j, j + 1]);
        comps++;
        setStats({ comparisons: comps, swaps });

        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          setArray([...arr]);
          setStats({ comparisons: comps, swaps });
        }

        await sleep(101 - speed);
      }
      sorted.push(n - i - 1);
      setSortedIndices([...sorted]);
    }
    setIsSorting(false);
    setActiveIndices([]);
  };

  // --- Selection Sort ---
  const runSelectionSort = async () => {
    let arr = [...array];
    let n = arr.length;
    let comps = 0;
    let swaps = 0;
    let sorted = [];

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (!isSortingRef.current) return;
        setActiveIndices([i, j, minIdx]);
        comps++;
        setStats({ comparisons: comps, swaps });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
        await sleep(101 - speed);
      }

      if (minIdx !== i) {
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swaps++;
        setArray([...arr]);
      }
      sorted.push(i);
      setSortedIndices([...sorted]);
    }
    setIsSorting(false);
    setActiveIndices([]);
  };

  const handleStartSort = () => {
    setIsSorting(true);
    if (algorithm === 'bubble') runBubbleSort();
    if (algorithm === 'selection') runSelectionSort();
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BarChart3 size={20} color="var(--amber-accent)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Data Structure & Sorting Visualizer</h3>
        </div>

        {/* Algorithm Select */}
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
          style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '10px',
            padding: '6px 14px',
            color: '#FFF',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        >
          <option value="bubble">Bubble Sort - O(n²)</option>
          <option value="selection">Selection Sort - O(n²)</option>
        </select>
      </div>

      {/* Control Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        background: 'rgba(255, 255, 255, 0.03)',
        padding: '12px 16px',
        borderRadius: '12px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="glass-button active" onClick={handleStartSort} disabled={isSorting}>
            <Play size={16} />
            <span>เริ่มเรียงลำดับ</span>
          </button>
          <button className="glass-button" onClick={generateRandomArray} disabled={isSorting}>
            <Shuffle size={16} />
            <span>สุ่มข้อมูลใหม่</span>
          </button>
        </div>

        {/* Sliders */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '130px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>จำนวนสมาชิก ({arraySize})</span>
            <input
              type="range"
              min="10"
              max="28"
              value={arraySize}
              onChange={(e) => setArraySize(parseInt(e.target.value))}
              disabled={isSorting}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '130px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ความเร็วแอนิเมชัน</span>
            <input
              type="range"
              min="10"
              max="95"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          <div>เปรียบเทียบ: <strong style={{ color: '#06B6D4' }}>{stats.comparisons}</strong></div>
          <div>สลับตำแหน่ง: <strong style={{ color: '#F59E0B' }}>{stats.swaps}</strong></div>
        </div>
      </div>

      {/* Visualizer Bar Chart Canvas Container */}
      <div style={{
        height: '220px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '6px',
        background: 'rgba(9, 13, 22, 0.8)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '1.5rem 1rem 1rem 1rem'
      }}>
        {array.map((val, idx) => {
          let barColor = 'rgba(139, 92, 246, 0.6)'; // Default Purple
          if (activeIndices.includes(idx)) barColor = '#06B6D4'; // Comparing Cyan
          if (sortedIndices.includes(idx)) barColor = '#10B981'; // Sorted Emerald

          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${val}%`,
                background: barColor,
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.1s ease',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                boxShadow: activeIndices.includes(idx) ? '0 0 15px #06B6D4' : 'none'
              }}
            >
              <span style={{ fontSize: '0.7rem', color: '#FFF', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                {arraySize <= 20 ? val : ''}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
