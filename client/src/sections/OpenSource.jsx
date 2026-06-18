import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, Card, fadeUp } from '../components/UI';
import { FiGitPullRequest, FiGitCommit, FiStar, FiCode } from 'react-icons/fi';

const stats = [
  { Icon: FiGitPullRequest, label: 'Pull Requests', value: '10+', color: '#34d399' },
  { Icon: FiGitCommit,      label: 'Commits',       value: '50+', color: '#818cf8' },
  { Icon: FiCode,           label: 'Features',      value: '5+',  color: '#22d3ee' },
  { Icon: FiStar,           label: 'Bug Fixes',     value: '8+',  color: '#fbbf24' },
];

const prs = [
  { title: 'Wire routing algorithm improvement',    status: 'Merged',    c: '#34d399', bc: 'rgba(52,211,153,0.1)',  bb: 'rgba(52,211,153,0.2)' },
  { title: 'Component interaction enhancements',   status: 'Merged',    c: '#34d399', bc: 'rgba(52,211,153,0.1)',  bb: 'rgba(52,211,153,0.2)' },
  { title: 'Simulation experience improvements',   status: 'Merged',    c: '#34d399', bc: 'rgba(52,211,153,0.1)',  bb: 'rgba(52,211,153,0.2)' },
  { title: 'UI/UX refinements for circuit board',  status: 'Merged',    c: '#34d399', bc: 'rgba(52,211,153,0.1)',  bb: 'rgba(52,211,153,0.2)' },
  { title: 'Performance optimization patches',     status: 'In Review', c: '#fbbf24', bc: 'rgba(251,191,36,0.08)', bb: 'rgba(251,191,36,0.22)' },
];

export default function OpenSource() {
  return (
    <SectionWrapper id="opensource" alt>
      <SectionHeader
        label="Open Source"
        title="Open Source Contributions"
        subtitle="Contributing to the ecosystem — improving tools that developers rely on every day."
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Project card */}
        <motion.div variants={fadeUp} className="glass card-hover"
          style={{ borderRadius: '20px', padding: '28px', borderColor: 'rgba(34,211,238,0.25)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
            <div style={{
              fontSize: '32px', padding: '16px', borderRadius: '16px',
              background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', flexShrink: 0,
            }}>
              🔬
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>OpenHW Studio</h3>
                <span style={{
                  padding: '3px 10px', fontSize: '11px', fontWeight: 700, borderRadius: '999px',
                  background: 'rgba(34,211,238,0.08)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.22)',
                }}>
                  Active Contributor
                </span>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>
                A browser-based electronics simulator supporting Arduino, Raspberry Pi Pico, and other microcontrollers.
                Contributed to core simulation logic, wire routing, and component interaction systems.
              </p>
              <a href="https://github.com/openhwstudio" target="_blank" rel="noreferrer"
                style={{ fontSize: '13px', fontWeight: 600, color: '#22d3ee', textDecoration: 'none' }}>
                View on GitHub →
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="glass card-hover"
              style={{ borderRadius: '16px', padding: '22px', textAlign: 'center' }}>
              <div style={{ color: s.color, display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <s.Icon size={20} />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* PR list */}
        <motion.div variants={fadeUp} className="glass" style={{ borderRadius: '18px', padding: '28px' }}>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '18px' }}>
            // Pull Request Highlights
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {prs.map((pr, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '13px 0', borderBottom: i < prs.length - 1 ? '1px solid var(--border)' : 'none',
                gap: '12px', flexWrap: 'wrap',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiGitPullRequest size={14} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{pr.title}</span>
                </div>
                <span style={{
                  padding: '3px 10px', fontSize: '11px', fontWeight: 700, borderRadius: '999px',
                  background: pr.bc, color: pr.c, border: `1px solid ${pr.bb}`, flexShrink: 0,
                }}>
                  {pr.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
