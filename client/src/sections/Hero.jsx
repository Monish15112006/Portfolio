import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiGithub, FiLinkedin, FiArrowDown, FiMail } from 'react-icons/fi';
import { HiOutlineDownload } from 'react-icons/hi';
import ParticleBackground from '../components/ParticleBackground';
import { data } from '../utils/data';
import profilePic from '../assets/hero.png';

// Removed orbit icons and polar functions for a cleaner look

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
        paddingTop: '68px',
      }}
    >
      <ParticleBackground />

      {/* Ambient orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-12%',
        width: '560px', height: '560px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-10%',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      {/* ── Two-column layout ── */}
      <div
        className="container"
        style={{
          position: 'relative', zIndex: 10,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'center',
          gap: 'clamp(32px, 6vw, 80px)',
          paddingTop: '24px',
          paddingBottom: '80px',
        }}
      >

        {/* ── LEFT: text content ── */}
        <div style={{ maxWidth: '620px' }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '24px' }}
          >
            <span className="section-label">👋 Welcome to my portfolio</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              marginBottom: '18px',
              color: 'var(--text-primary)',
            }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">{data.name}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.2rem)',
              fontWeight: 600,
              minHeight: '32px',
              marginBottom: '18px',
            }}
          >
            <TypeAnimation
              sequence={[
                'Building scalable web applications.', 2200,
                'Creating modern backend systems.', 2200,
                'Contributing to open source.', 2200,
                'Solving real-world problems.', 2200,
              ]}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{ color: '#818cf8' }}
            />
          </motion.div>

          {/* Headline */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            style={{
              fontSize: '0.975rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              marginBottom: '22px',
              maxWidth: '520px',
            }}
          >
            {data.headline}
          </motion.p>

          {/* Role badges */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}
          >
            {data.role.map(r => (
              <span key={r} style={{
                padding: '5px 14px', fontSize: '11px', fontWeight: 600,
                color: '#67e8f9', background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.22)', borderRadius: '999px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {r}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '36px' }}
          >
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('projects')}
              className="glow-btn"
              style={{
                padding: '12px 26px', fontSize: '14px', fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer',
              }}
            >
              View Projects
            </motion.button>
            <motion.a
              href={data.resumeUrl}
              download="Monish_Resume.pdf"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="glass"
              style={{
                padding: '12px 26px', fontSize: '14px', fontWeight: 700,
                color: 'var(--text-primary)', borderRadius: '12px',
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                textDecoration: 'none', cursor: 'pointer',
              }}
            >
              <HiOutlineDownload size={17} /> Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('contact')}
              style={{
                padding: '12px 26px', fontSize: '14px', fontWeight: 700,
                color: '#818cf8', background: 'transparent',
                border: '1px solid rgba(99,102,241,0.35)', borderRadius: '12px',
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(99,102,241,0.1)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{ display: 'flex', gap: '10px' }}
          >
            {[
              { icon: <FiGithub size={17} />, href: data.github, label: 'GitHub' },
              { icon: <FiLinkedin size={17} />, href: data.linkedin, label: 'LinkedIn' },
              { icon: <FiMail size={17} />, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}`, label: 'Email' },
            ].map(({ icon, href, label }, i) => (
              <motion.a
                key={i} href={href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.08, y: -2 }}
                className="glass"
                style={{
                  padding: '10px 18px', borderRadius: '11px',
                  color: 'var(--text-secondary)', display: 'flex',
                  alignItems: 'center', gap: '8px',
                  textDecoration: 'none', transition: 'color 0.2s',
                  fontSize: '13px', fontWeight: 600,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {icon} {label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: profile image ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
          style={{ position: 'relative', flexShrink: 0 }}
          className="hidden-mobile"
        >
          {/* Outer glow bloom */}
          <div style={{
            position: 'absolute', inset: '-32px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.18) 40%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(8px)',
          }} />

          {/* Spinning gradient border ring — thick */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: '-8px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #6366f1 0%, #a78bfa 25%, #06b6d4 50%, #f59e0b 75%, #6366f1 100%)',
              zIndex: 1,
              filter: 'drop-shadow(0 0 14px #6366f1) drop-shadow(0 0 28px #8b5cf6)',
            }}
          />

          {/* Background-colour gap ring — wide margin */}
          <div style={{
            position: 'absolute', inset: '0px',
            borderRadius: '50%',
            background: 'var(--bg-primary)',
            zIndex: 2,
            boxShadow: 'inset 0 0 20px rgba(99,102,241,0.15)',
          }} />

          {/* Bright inner glow ring */}
          <div style={{
            position: 'absolute', inset: '6px',
            borderRadius: '50%',
            border: '2px solid rgba(99,102,241,0.6)',
            boxShadow: '0 0 16px rgba(99,102,241,0.7), 0 0 32px rgba(139,92,246,0.4), inset 0 0 16px rgba(99,102,241,0.2)',
            zIndex: 3,
            pointerEvents: 'none',
          }} />

          {/* Profile image */}
          <div style={{
            position: 'relative', zIndex: 4,
            width: 'clamp(240px, 28vw, 360px)',
            height: 'clamp(240px, 28vw, 360px)',
            borderRadius: '50%',
            overflow: 'hidden',
          }}>
            <img
              src={profilePic}
              alt="Monish"
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top center',
                display: 'block',
              }}
            />
            {/* Subtle bottom gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, transparent 65%, rgba(5,5,15,0.25) 100%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            style={{
              position: 'absolute', bottom: '-8px', left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
              display: 'flex', alignItems: 'center', gap: '7px',
              padding: '8px 18px',
              background: 'rgba(17,17,34,0.85)',
              border: '1px solid rgba(52,211,153,0.3)',
              borderRadius: '999px',
              backdropFilter: 'blur(16px)',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#34d399',
              boxShadow: '0 0 8px #34d399',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#34d399' }}>
              Open to Opportunities
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('about')}
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '28px', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10, background: 'none', border: 'none',
          cursor: 'pointer', color: '#6366f1',
        }}
      >
        <FiArrowDown size={22} />
      </motion.button>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
