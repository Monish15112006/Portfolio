import { motion } from 'framer-motion';

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function SectionWrapper({ children, id, alt = false }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className={`section${alt ? ' section-alt' : ''}`}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

export function SectionHeader({ label, title, subtitle, center = true }) {
  return (
    <motion.div variants={fadeUp} style={{ textAlign: center ? 'center' : 'left', marginBottom: '56px' }}>
      <div className="section-label">{label}</div>
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="section-subtitle" style={{ margin: center ? '0 auto' : '0' }}>{subtitle}</p>
      )}
    </motion.div>
  );
}

export function Card({ children, className = '', style = {}, hover = true }) {
  return (
    <motion.div
      variants={fadeUp}
      className={`glass rounded-2xl ${hover ? 'card-hover' : ''} ${className}`}
      style={{ padding: '24px', ...style }}
    >
      {children}
    </motion.div>
  );
}
