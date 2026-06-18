import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { experience } from '../utils/data';
import { FiBriefcase, FiGitPullRequest } from 'react-icons/fi';

const cfg = {
  Internship:    { Icon: FiBriefcase,     accent: '#818cf8', bg: 'rgba(99,102,241,0.08)',  border: 'rgba(99,102,241,0.25)',  dot: '#6366f1' },
  'Open Source': { Icon: FiGitPullRequest, accent: '#22d3ee', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.25)',   dot: '#06b6d4' },
};

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeader
        label="Experience"
        title="Work & Contributions"
        subtitle="Real-world experience building products and contributing to open-source ecosystems."
      />

      {/* Timeline */}
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', paddingLeft: '48px' }}>
        <div className="timeline-line" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {experience.map((exp, i) => {
            const c = cfg[exp.type];
            return (
              <motion.div key={exp.id} variants={fadeUp} custom={i} style={{ position: 'relative' }}>
                {/* Dot */}
                <div style={{
                  position: 'absolute', left: '-38px', top: '24px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: c.dot, border: '3px solid var(--bg-primary)',
                  boxShadow: `0 0 10px ${c.dot}`,
                }} />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, boxShadow: `0 12px 40px ${c.bg}` }}
                  className="glass card-hover"
                  style={{ borderRadius: '18px', padding: '28px', borderColor: c.border, transition: 'all 0.25s' }}
                >
                  {/* Type badge */}
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '4px 12px', fontSize: '11px', fontWeight: 700,
                      borderRadius: '999px', background: c.bg, color: c.accent,
                      border: `1px solid ${c.border}`, fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      <c.Icon size={12} /> {exp.type}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {exp.role}
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: c.accent, marginBottom: '18px' }}>
                    {exp.company}
                  </p>

                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: c.dot, flexShrink: 0, marginTop: '8px' }} />
                        {r}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
