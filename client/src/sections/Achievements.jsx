import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { achievements } from '../utils/data';

export default function Achievements() {
  return (
    <SectionWrapper id="achievements">
      <SectionHeader
        label="Recognition"
        title="Achievements & Awards"
        subtitle="Milestones earned through competitive programming, hackathons, and open-source contributions."
      />

      <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative', paddingLeft: '52px' }}>
        <div className="timeline-line" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              variants={fadeUp}
              custom={i}
              whileHover={{ x: 5 }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px' }}
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.15, rotate: 6 }}
                style={{
                  position: 'absolute', left: '-52px',
                  width: '40px', height: '40px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '12px', fontSize: '18px',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  flexShrink: 0,
                }}
              >
                {a.icon}
              </motion.div>

              {/* Row card */}
              <div
                className="glass card-hover"
                style={{
                  flex: 1, borderRadius: '14px', padding: '16px 20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: '8px',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {a.title}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <span style={{
                    padding: '3px 10px', fontSize: '11px', fontWeight: 600, borderRadius: '999px',
                    background: 'rgba(99,102,241,0.1)', color: '#818cf8',
                    border: '1px solid rgba(99,102,241,0.2)',
                  }}>
                    {a.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>
                    {a.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
