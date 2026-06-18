import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { skills } from '../utils/data';

const palette = {
  Languages:      { accent: '#60a5fa', bg: 'rgba(96,165,250,0.08)',  border: 'rgba(96,165,250,0.22)' },
  Technologies:   { accent: '#34d399', bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.22)' },
  Database:       { accent: '#fb923c', bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.22)' },
  Tools:          { accent: '#22d3ee', bg: 'rgba(34,211,238,0.08)', border: 'rgba(34,211,238,0.22)' },
  'Core Concepts':{ accent: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.22)' },
};

export default function Skills() {
  return (
    <SectionWrapper id="skills" alt>
      <SectionHeader
        label="Tech Stack"
        title="Skills & Technologies"
        subtitle="A curated set of tools and technologies I use to build production-grade software."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {Object.entries(skills).map(([cat, items], i) => {
          const p = palette[cat] || palette.Tools;
          return (
            <motion.div
              key={cat}
              variants={fadeUp}
              custom={i}
              className="glass card-hover"
              style={{ borderRadius: '18px', padding: '24px', borderColor: p.border }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.accent, boxShadow: `0 0 8px ${p.accent}` }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: p.accent, letterSpacing: '0.04em', fontFamily: "'JetBrains Mono', monospace" }}>
                  {cat}
                </span>
              </div>

              {/* Skill pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {items.map(skill => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.06 }}
                    style={{
                      padding: '5px 12px', fontSize: '12px', fontWeight: 500,
                      borderRadius: '8px', background: p.bg, color: p.accent,
                      border: `1px solid ${p.border}`, cursor: 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
