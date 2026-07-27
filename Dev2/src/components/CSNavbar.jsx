import React from 'react';
import { Cpu, Search, Bookmark, Award, Sparkles, Globe, Code2, ShieldCheck, Server } from 'lucide-react';
import { CATEGORIES } from '../data/csKnowledgeData';

export const CSNavbar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  bookmarkCount,
  onOpenQuiz
}) => {
  const iconMap = {
    Sparkles,
    Cpu,
    Globe,
    Code2,
    ShieldCheck,
    Server
  };

  return (
    <header style={{
      position: 'relative',
      zIndex: 10,
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(9, 13, 22, 0.75)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Top Bar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #06B6D4 0%, #8B5CF6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)'
          }}>
            <Cpu size={26} color="#FFF" />
          </div>
          <div>
            <h1 className="text-gradient" style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
              TechPulse <span style={{ fontSize: '0.9rem', color: '#06B6D4', fontWeight: 600 }}>CS STUDIO</span>
            </h1>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Computer Science & Tech Learning Ecosystem</p>
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          minWidth: '280px',
          maxWidth: '420px',
          flex: 1
        }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="ค้นหาบทความ (เช่น CPU, Big-O, OSI, SHA-256)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '10px 16px 10px 42px',
              color: '#FFF',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'all 0.2s ease'
            }}
          />
        </div>

        {/* Right Action Widgets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="glass-button active" onClick={onOpenQuiz}>
            <Award size={18} />
            <span>CS Quiz Challenge</span>
          </button>

          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '8px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
            color: '#F8FAFC'
          }}>
            <Bookmark size={18} color="#06B6D4" />
            <span>บุ๊กมาร์ก: <strong style={{ color: '#06B6D4' }}>{bookmarkCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Category Pills Tabs */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 2rem 1.25rem 2rem',
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '1rem'
      }}>
        {CATEGORIES.map((cat) => {
          const IconComp = iconMap[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                background: isSelected ? `${cat.color}25` : 'rgba(255, 255, 255, 0.03)',
                border: isSelected ? `1px solid ${cat.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                color: isSelected ? '#FFF' : 'var(--text-muted)',
                padding: '8px 16px',
                borderRadius: '99px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <IconComp size={16} color={isSelected ? cat.color : '#94A3B8'} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
