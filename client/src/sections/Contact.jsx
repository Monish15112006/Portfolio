import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { FiSend, FiMail, FiGithub, FiLinkedin, FiCheck, FiAlertCircle } from 'react-icons/fi';
import { data } from '../utils/data';

const initForm = { name: '', email: '', subject: '', message: '' };

const contacts = [
  { Icon: FiMail,     label: 'Email',    value: 'monish.rk2024it@sece.ac.in', href: `https://mail.google.com/mail/?view=cm&fs=1&to=${data.email}` },
  { Icon: FiGithub,   label: 'GitHub',   value: 'github.com/monish',    href: data.github },
  { Icon: FiLinkedin, label: 'LinkedIn', value: 'linkedin.com/in/monish',href: data.linkedin },
];

export default function Contact() {
  const [form, setForm] = useState(initForm);
  const [status, setStatus] = useState('idle');

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Using formsubmit.co for zero-configuration direct email sending
      await axios.post('https://formsubmit.co/ajax/monish.rk2024it@sece.ac.in', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        _subject: `New Portfolio Message: ${form.subject}`,
      });
      setStatus('success');
      setForm(initForm);
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus('idle'), 4000);
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', fontSize: '14px',
    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
    borderRadius: '12px', color: 'var(--text-primary)',
    fontFamily: "'Inter', sans-serif", outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  return (
    <SectionWrapper id="contact" alt>
      <SectionHeader
        label="Contact"
        title="Get In Touch"
        subtitle="Open to internship opportunities, freelance projects, and full-time roles."
      />

      <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>

        {/* Left info */}
        <motion.div variants={fadeUp}>
          <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Let's build something great
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '28px' }}>
            Whether you have a project, opportunity, or just want to connect — my inbox is always open.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {contacts.map(({ Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="glass card-hover"
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '14px', textDecoration: 'none' }}>
                <div style={{
                  padding: '9px', borderRadius: '10px',
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                  color: '#818cf8', display: 'flex', flexShrink: 0,
                }}>
                  <Icon size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right form */}
        <motion.div variants={fadeUp}>
          <form onSubmit={onSubmit} className="glass" style={{ borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { name: 'name',    label: 'Name',    type: 'text',  placeholder: 'Your name' },
                { name: 'email',   label: 'Email',   type: 'email', placeholder: 'your@email.com' },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                  <input name={f.name} type={f.type} value={form[f.name]} onChange={onChange} required
                    placeholder={f.placeholder} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              ))}
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Subject</label>
              <input name="subject" value={form.subject} onChange={onChange} required
                placeholder="What's this about?" style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Message</label>
              <textarea name="message" value={form.message} onChange={onChange} required rows={5}
                placeholder="Tell me about your project or opportunity..."
                style={{ ...inputStyle, resize: 'none' }}
                onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.6)'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.12)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              className="glow-btn"
              style={{
                padding: '13px', fontSize: '14px', fontWeight: 700,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: status === 'loading' ? 0.7 : 1,
              }}
            >
              {status === 'loading' && <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />}
              {status === 'success' && <FiCheck size={16} />}
              {status === 'error' && <FiAlertCircle size={16} />}
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Try Again' : <><FiSend size={15} /> Send Message</>}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </SectionWrapper>
  );
}
