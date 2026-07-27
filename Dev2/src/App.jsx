import React, { useState, useEffect } from 'react';
import { CyberCanvas } from './components/CyberCanvas';
import { CSNavbar } from './components/CSNavbar';
import { TopicCard } from './components/TopicCard';
import { TopicDetailModal } from './components/TopicDetailModal';
import { QuizWidget } from './components/QuizWidget';
import { AlgorithmVisualizer } from './components/AlgorithmVisualizer';
import { CpuSimulator } from './components/CpuSimulator';
import { CryptoSandbox } from './components/CryptoSandbox';
import { TOPICS } from './data/csKnowledgeData';
import { Sparkles, Terminal, Code2, Cpu, ShieldCheck } from 'lucide-react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeToolTab, setActiveToolTab] = useState('algo'); // 'algo' | 'cpu' | 'crypto'

  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('cs_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return ['cpu-architecture', 'sorting-algorithms'];
  });

  useEffect(() => {
    localStorage.setItem('cs_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (topicId) => {
    if (bookmarks.includes(topicId)) {
      setBookmarks(bookmarks.filter(id => id !== topicId));
    } else {
      setBookmarks([...bookmarks, topicId]);
    }
  };

  // Filter Topics
  const filteredTopics = TOPICS.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Background Canvas */}
      <CyberCanvas />

      {/* Header & Navbar */}
      <CSNavbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        bookmarkCount={bookmarks.length}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Content Workspace */}
      <main style={{
        flex: 1,
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem'
      }}>

        {/* Featured Interactive Playground Section */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={22} color="#06B6D4" />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Interactive CS Simulators & Playgrounds</h2>
            </div>

            {/* Tool Switcher Tabs */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`glass-button ${activeToolTab === 'algo' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('algo')}
              >
                <Code2 size={16} />
                <span>Sorting Visualizer</span>
              </button>

              <button
                className={`glass-button ${activeToolTab === 'cpu' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('cpu')}
              >
                <Cpu size={16} />
                <span>CPU Cycle Sim</span>
              </button>

              <button
                className={`glass-button ${activeToolTab === 'crypto' ? 'active' : ''}`}
                onClick={() => setActiveToolTab('crypto')}
              >
                <ShieldCheck size={16} />
                <span>Crypto Sandbox</span>
              </button>
            </div>
          </div>

          {/* Active Tool View */}
          {activeToolTab === 'algo' && <AlgorithmVisualizer />}
          {activeToolTab === 'cpu' && <CpuSimulator />}
          {activeToolTab === 'crypto' && <CryptoSandbox />}
        </section>

        {/* Knowledge Articles Grid Section */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <Sparkles size={22} color="#8B5CF6" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
              บทความความรู้คอมพิวเตอร์ ({filteredTopics.length})
            </h2>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
              ไม่พบบทความที่ตรงกับคำค้นหา "{searchQuery}"
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '1.5rem'
            }}>
              {filteredTopics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  isBookmarked={bookmarks.includes(topic.id)}
                  onToggleBookmark={toggleBookmark}
                  onOpenDetail={setSelectedTopic}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '1.75rem',
        color: 'var(--text-dim)',
        fontSize: '0.85rem',
        position: 'relative',
        zIndex: 5,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <p>TechPulse CS Studio • Interactive Computer Science & Tech Knowledge Hub • Built with Node.js & React</p>
      </footer>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        isOpen={!!selectedTopic}
        onClose={() => setSelectedTopic(null)}
        isBookmarked={selectedTopic ? bookmarks.includes(selectedTopic.id) : false}
        onToggleBookmark={toggleBookmark}
      />

      {/* CS Quiz Widget Modal */}
      <QuizWidget
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}

export default App;
