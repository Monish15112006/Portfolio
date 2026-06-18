import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { codingProfiles } from '../utils/data';
import { FiCode } from 'react-icons/fi';

export default function CodingProfiles() {
  return (
    <SectionWrapper id="coding-profiles" alt>
      <SectionHeader
        label="Profiles"
        title="Coding Profiles"
        subtitle="Competitive programming and problem-solving statistics."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {codingProfiles.map((profile, i) => (
          <motion.a
            key={profile.id}
            href={profile.link}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            custom={i}
            whileHover={{ y: -5 }}
            className="glass card-hover"
            style={{
              display: 'block', textDecoration: 'none',
              borderRadius: '16px', padding: '24px',
              border: '1px solid rgba(251,146,60,0.2)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: 'rgba(251,146,60,0.1)', color: '#fb923c',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px', flexShrink: 0,
              }}>
                <FiCode />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {profile.platform}
              </h3>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {profile.stats}
            </p>
          </motion.a>
        ))}
      </div>
    </SectionWrapper>
  );
}
