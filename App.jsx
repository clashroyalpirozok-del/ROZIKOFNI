import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './brawlstyle.css'; // ← ИМЯ ФАЙЛА ИЗМЕНЕНО!

const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjdmZWJlNmFiLTkyMDItNDJhNi05Y2Q4LWY5NDNjNWE2NzUyNyIsImlhdCI6MTc4NDQ4OTI3MCwic3ViIjoiZGV2ZWxvcGVyLzAyOWI3NTAyLTE3MDMtNGI1OS04Y2Q1LWNjMzc4NzYxYzZkMCIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTI4LjEyOC4xMjguMTI4Il0sInR5cGUiOiJjbGllbnQifV19.Qo6NXjK_XAn2G_lKJl5DqDokvmvL1C2Hu_XCW8dDeimwRBf986obeBM3GcCQseQZDUi65MhV1M6xerNgw_bWRw';
const CLUB_TAG = '#29QLUYOPO';

function App() {
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchClub = async () => {
    try {
      setLoading(true);
      setError(false);
      const cleanTag = CLUB_TAG.replace('#', '');
      const response = await axios.get(
        `https://bsproxy.royaleapi.dev/v1/clubs/%23${cleanTag}`,
        { headers: { 'Authorization': `Bearer ${API_KEY}` } }
      );
      setClub(response.data);
      createCelebration();
    } catch (error) {
      console.error('Ошибка:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClub();
    const interval = setInterval(fetchClub, 30000);
    return () => clearInterval(interval);
  }, []);

  const createCelebration = () => {
    for (let i = 0; i < 30; i++) {
      const star = document.createElement('div');
      star.className = 'brawl-star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 2 + 's';
      star.style.width = (Math.random() * 10 + 5) + 'px';
      star.style.height = star.style.width;
      document.body.appendChild(star);
      setTimeout(() => star.remove(), 3000);
    }
  };

  const getRoleInfo = (role) => {
    const roles = {
      president: { emoji: '👑', color: '#FFD700', label: 'Президент' },
      vicePresident: { emoji: '⚡', color: '#FF6B6B', label: 'Вице-президент' },
      senior: { emoji: '⭐', color: '#4ECDC4', label: 'Старший' },
      member: { emoji: '🎯', color: '#95E1D3', label: 'Боец' }
    };
    return roles[role] || roles.member;
  };

  if (error) {
    return (
      <div className="brawl-container">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="error-card"
        >
          <div className="brawl-icon">😱</div>
          <h2>КЛУБ НЕ НАЙДЕН</h2>
          <p>Проверь тег: {CLUB_TAG}</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="brawl-button" 
            onClick={fetchClub}
          >
            🔄 ПОВТОРИТЬ
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="brawl-container">
        <div className="loading-wrapper">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} 
            className="brawl-loader" 
          />
          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="loading-text"
          >
            ЗАГРУЗКА БОЙЦОВ...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="brawl-container">
      {/* Шапка клуба */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ type: 'spring', stiffness: 300 }}
        className="club-header"
      >
        <div className="club-badge">
          <span className="club-emoji">⚔️</span>
        </div>
        <h1 className="club-name">{club.name}</h1>
        <p className="club-tag">#{club.tag}</p>
        <div className="club-stats">
          <motion.span 
            whileHover={{ scale: 1.1 }}
            className="stat-item"
          >
            🏆 {club.trophies}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.1 }}
            className="stat-item"
          >
            👥 {club.members?.length || 0}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.1 }}
            className="stat-item"
          >
            🏅 {club.requiredTrophies}+
          </motion.span>
        </div>
      </motion.div>

      {/* Список игроков */}
      <div className="members-list">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="members-title"
        >
          🔥 БОЙЦЫ КЛУБА
        </motion.h3>
        
        <AnimatePresence>
          {club.members?.map((member, index) => {
            const roleInfo = getRoleInfo(member.role);
            return (
              <motion.div
                key={member.tag}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ 
                  delay: index * 0.05, 
                  type: 'spring',
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(245, 166, 35, 0.3)'
                }}
                className="member-card"
                style={{ borderColor: roleInfo.color }}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="avatar-wrapper"
                  style={{ borderColor: roleInfo.color }}
                >
                  <img
                    src={`https://cdn.brawlstats.com/avatars/${member.avatarId || 0}.png`}
                    className="member-avatar"
                    onError={(e) => { 
                      e.target.src = 'https://cdn.brawlstats.com/avatars/0.png'; 
                    }}
                    alt={member.name}
                  />
                </motion.div>
                
                <div className="member-info">
                  <div className="member-name">{member.name}</div>
                  <div className="member-role" style={{ color: roleInfo.color }}>
                    {roleInfo.emoji} {roleInfo.label}
                  </div>
                  <div className="member-trophies">🏆 {member.trophies}</div>
                </div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 2,
                    delay: index * 0.1,
                    ease: "easeInOut"
                  }}
                  className="online-dot"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Кнопка обновления */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 40px rgba(245, 166, 35, 0.5)'
        }}
        whileTap={{ scale: 0.95 }}
        className="refresh-btn"
        onClick={fetchClub}
      >
        🔄 ОБНОВИТЬ
      </motion.button>
    </div>
  );
}

export default App;
