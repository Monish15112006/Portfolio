import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowUp } from 'react-icons/fi';
import { HiOutlineDownload } from 'react-icons/hi';
import { data } from '../utils/data';

const socials = [
  { Icon: FiGithub,   href: data.github },
  { Icon: FiLinkedin, href: data.linkedin },
  { Icon: FiMail,     href: `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}` },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border)',
      padding: '48px 24px',
    }}>
      <div className="container">
        {/* Main row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '24px', marginBottom: '32px',
        }}>
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="gradient-text"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '17px', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer' }}
          >
            &lt;Monish /&gt;
          </motion.button>

          {/* Quote */}
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontStyle: 'italic', textAlign: 'center' }}>
            "Building software that bridges ideas and reality."
          </p>

          {/* Social + Resume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {socials.map(({ Icon, href }, i) => (
              <motion.a key={i} href={href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="glass"
                style={{ padding: '9px', borderRadius: '10px', color: 'var(--text-secondary)', display: 'flex', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <Icon size={16} />
              </motion.a>
            ))}
            <motion.a
              href={data.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download="Monish_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              className="glass"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '9px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <HiOutlineDownload size={15} /> Resume
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px',
          paddingTop: '24px', borderTop: '1px solid var(--border)',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Monish. Built with React + Vite + Tailwind CSS.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Designed & Developed by Monish 🚀
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="glass"
            style={{ padding: '8px', borderRadius: '9px', border: 'none', cursor: 'pointer', color: '#818cf8', display: 'flex' }}
          >
            <FiArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
