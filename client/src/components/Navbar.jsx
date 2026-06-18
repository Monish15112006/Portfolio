import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useScrollProgress, useTheme } from '../hooks';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Achievements', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggle } = useTheme();
  const progress = useScrollProgress();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
        }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ top: '2px' }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass shadow-[0_1px_40px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '68px' }}>
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold gradient-text"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '18px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            &lt;Monish /&gt;
          </motion.button>

          {/* Desktop */}
          <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
            {links.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--text-secondary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.target.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.target.style.color = 'var(--text-secondary)')}
              >
                {link}
              </button>
            ))}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggle}
              className="glass"
              style={{
                padding: '8px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isDark
                ? <FiSun size={15} style={{ color: '#fbbf24' }} />
                : <FiMoon size={15} style={{ color: '#818cf8' }} />}
            </motion.button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center" style={{ gap: '10px' }}>
            <button onClick={toggle} className="glass" style={{ padding: '8px', borderRadius: '10px', cursor: 'pointer', display:'flex' }}>
              {isDark ? <FiSun size={15} style={{ color: '#fbbf24' }} /> : <FiMoon size={15} style={{ color: '#818cf8' }} />}
            </button>
            <button onClick={() => setOpen(!open)} className="glass" style={{ padding: '8px', borderRadius: '10px', cursor: 'pointer', display:'flex' }}>
              {open ? <FiX size={17} /> : <FiMenu size={17} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass"
              style={{ borderTop: '1px solid var(--border)' }}
            >
              <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {links.map(link => (
                  <button key={link} onClick={() => scrollTo(link)}
                    style={{ textAlign: 'left', fontSize: '15px', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
