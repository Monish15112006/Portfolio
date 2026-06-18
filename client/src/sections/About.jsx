import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionWrapper, SectionHeader, Card, fadeUp } from '../components/UI';
import { useCounter } from '../hooks';
import { data } from '../utils/data';

const stats = [
  { label: 'Projects Built',    value: 10, suffix: '+' },
  { label: 'Problems Solved',   value: 970, suffix: '+' },
  { label: 'Technologies',      value: 20, suffix: '+' },
  { label: 'Achievements',      value: 3,  suffix: '+'  },
];

const cards = [
  {
    emoji: '🎓', title: "B.Tech in Information Technology", sub: 'Sri Eshwar College of Engineering',
    tags: ['DSA', 'DBMS', 'OOPS', 'Problem Solving'],
    border: 'rgba(99,102,241,0.3)', tagColor: '#a5b4fc', tagBg: 'rgba(99,102,241,0.08)',
  },
  {
    emoji: '💼', title: 'MERN Stack Developer Intern', sub: 'Internship',
    tags: ['ReactJS', 'Node.js', 'Express.js', 'MongoDB'],
    border: 'rgba(139,92,246,0.3)', tagColor: '#c4b5fd', tagBg: 'rgba(139,92,246,0.08)',
  },
  {
    emoji: '🚀', title: 'Full Stack & AI Projects', sub: 'Various Platforms',
    tags: ['React.js', 'OpenCV', 'REST APIs', 'Deep Learning'],
    border: 'rgba(6,182,212,0.3)', tagColor: '#67e8f9', tagBg: 'rgba(6,182,212,0.08)',
  },
];

function StatCard({ stat }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(stat.value, 1600, inView);
  return (
    <motion.div ref={ref} variants={fadeUp} className="glass card-hover" style={{
      borderRadius: '16px', padding: '28px 20px', textAlign: 'center',
    }}>
      <div className="gradient-text" style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1, marginBottom: '8px' }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeader
        label="About Me"
        title="Passionate about building impactful software"
        subtitle="Computer Science student and MERN Stack Developer on a mission to solve real-world problems through technology."
      />

      {/* Bio + Cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', marginBottom: '56px', alignItems: 'start' }}>

        {/* Left – bio */}
        <motion.div variants={fadeUp}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px', fontSize: '15px' }}>
            {data.bio}
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '28px', fontSize: '15px' }}>
            I enjoy solving real-world problems through software engineering, backend development, modern web technologies, and collaborative open-source contributions.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {data.focus.map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – info cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {cards.map((c, i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 1} className="glass card-hover"
              style={{ borderRadius: '16px', padding: '20px', borderColor: c.border }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  fontSize: '22px', padding: '10px', borderRadius: '12px',
                  background: c.tagBg, border: `1px solid ${c.border}`, flexShrink: 0,
                }}>
                  {c.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--text-primary)', marginBottom: '3px' }}>{c.title}</div>
                  <div style={{ fontSize: '12px', color: c.tagColor, fontWeight: 600, marginBottom: '10px' }}>{c.sub}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {c.tags.map(t => (
                      <span key={t} style={{
                        padding: '2px 8px', fontSize: '11px', borderRadius: '5px',
                        background: c.tagBg, color: c.tagColor, border: `1px solid ${c.border}`,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {stats.map(s => <StatCard key={s.label} stat={s} />)}
      </div>
    </SectionWrapper>
  );
}
