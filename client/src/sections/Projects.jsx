import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { projects } from '../utils/data';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const typeStyle = {
  'Open Source': { color: '#22d3ee', bg: 'rgba(6,182,212,0.08)',   border: 'rgba(6,182,212,0.22)' },
  'AI':          { color: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.22)' },
  'Full Stack':  { color: '#818cf8', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.22)' },
};

const filters = ['All', 'Featured', 'AI', 'Full Stack', 'Open Source'];

export default function Projects() {
  const [active, setActive] = useState('All');

  const filtered = projects.filter(p => {
    if (active === 'All') return true;
    if (active === 'Featured') return p.featured;
    return p.type === active;
  });

  return (
    <SectionWrapper id="projects" alt>
      <SectionHeader
        label="Projects"
        title="Things I've Built"
        subtitle="A showcase of full-stack applications, AI tools, and open-source contributions."
      />

      {/* Filter bar */}
      <motion.div variants={fadeUp} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            style={{
              padding: '7px 18px', fontSize: '13px', fontWeight: 600,
              borderRadius: '999px', cursor: 'pointer', transition: 'all 0.2s',
              background: active === f ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.04)',
              color: active === f ? '#fff' : 'var(--text-secondary)',
              border: active === f ? '1px solid #6366f1' : '1px solid var(--border)',
            }}
          >
            {f}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filtered.map((project, i) => {
          const ts = typeStyle[project.type] || typeStyle['Full Stack'];
          return (
            <motion.div
              key={project.id}
              variants={fadeUp}
              custom={i}
              layout
              className="glass card-hover"
              style={{
                borderRadius: '18px', padding: '24px',
                display: 'flex', flexDirection: 'column',
                borderColor: ts.border,
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  padding: '4px 12px', fontSize: '11px', fontWeight: 700,
                  borderRadius: '999px', background: ts.bg, color: ts.color,
                  border: `1px solid ${ts.border}`, fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {project.type}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a href={project.github} target="_blank" rel="noreferrer"
                    style={{ padding: '6px', borderRadius: '8px', display: 'flex', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = ts.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                    <FiGithub size={14} />
                  </a>
                  <a href={project.demo} target="_blank" rel="noreferrer"
                    style={{ padding: '6px', borderRadius: '8px', display: 'flex', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = ts.color)}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                    <FiExternalLink size={14} />
                  </a>
                </div>
              </div>

              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
                {project.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px', flex: 1 }}>
                {project.description}
              </p>

              {/* Highlights */}
              <ul style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {project.highlights.map((h, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: ts.color, flexShrink: 0 }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                {project.tech.map(t => (
                  <span key={t} style={{
                    padding: '3px 9px', fontSize: '11px', borderRadius: '5px',
                    background: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)',
                    border: '1px solid var(--border)', fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
