import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { education } from '../utils/data';
import { FiBookOpen } from 'react-icons/fi';

const cfg = {
  Education: { Icon: FiBookOpen, accent: '#c084fc', bg: 'rgba(192,132,252,0.08)', border: 'rgba(192,132,252,0.25)', dot: '#a855f7' },
};

export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionHeader
        label="Education"
        title="Academic Background"
        subtitle="My educational journey and qualifications."
      />

      {/* Timeline */}
      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', paddingLeft: '48px' }}>
        <div className="timeline-line" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {education.map((edu, i) => {
            const c = cfg.Education;
            return (
              <motion.div key={edu.id} variants={fadeUp} custom={i} style={{ position: 'relative' }}>
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
                  <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '4px 12px', fontSize: '11px', fontWeight: 700,
                      borderRadius: '999px', background: c.bg, color: c.accent,
                      border: `1px solid ${c.border}`, fontFamily: "'JetBrains Mono', monospace",
                    }}>
                      <c.Icon size={12} /> Education
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                      {edu.year}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {edu.degree}
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: c.accent, marginBottom: '0px' }}>
                    {edu.institution}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
