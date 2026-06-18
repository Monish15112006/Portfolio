import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper, SectionHeader, fadeUp } from '../components/UI';
import { FiGithub, FiStar, FiGitBranch, FiBook } from 'react-icons/fi';
import { data } from '../utils/data';

const GITHUB_USER = 'monish';

const staticRepos = [
  { id: 1, name: 'ai-career-twin',      description: 'AI-powered career guidance platform',       language: 'JavaScript', stargazers_count: 12, forks_count: 3, html_url: '#' },
  { id: 2, name: 'url-shortener',        description: 'High-performance URL shortener with Redis',  language: 'JavaScript', stargazers_count: 8,  forks_count: 2, html_url: '#' },
  { id: 3, name: 'ecommerce-platform',   description: 'Full-featured MERN e-commerce app',          language: 'JavaScript', stargazers_count: 6,  forks_count: 1, html_url: '#' },
  { id: 4, name: 'openrouter-clone',     description: 'Unified AI provider platform',               language: 'TypeScript', stargazers_count: 10, forks_count: 4, html_url: '#' },
];

const statCards = [
  { Icon: FiBook,      label: 'Repositories', value: '20+' },
  { Icon: FiStar,      label: 'Stars Earned',  value: '45+' },
  { Icon: FiGithub,    label: 'Followers',     value: '30+' },
  { Icon: FiGitBranch, label: 'Contributions', value: '100+' },
];

const langColors = { JavaScript: '#f7df1e', TypeScript: '#3178c6', Python: '#3572a5', 'C++': '#f34b7d' };

export default function GitHub() {
  const [repos] = useState(staticRepos);

  return (
    <SectionWrapper id="github">
      <SectionHeader
        label="GitHub"
        title="GitHub Activity"
        subtitle="Building in public — consistent contributions and open-source engagement."
      />

      <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          {statCards.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="glass card-hover"
              style={{ borderRadius: '16px', padding: '22px', textAlign: 'center' }}>
              <div style={{ color: '#818cf8', display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <s.Icon size={18} />
              </div>
              <div className="gradient-text" style={{ fontSize: '1.9rem', fontWeight: 900, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        <motion.div variants={fadeUp} className="glass"
          style={{ borderRadius: '18px', padding: '28px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace", marginBottom: '16px' }}>
            // GitHub contribution activity
          </p>
          <img
            src={`https://ghchart.rshah.org/6366f1/${GITHUB_USER}`}
            alt="GitHub Contributions"
            style={{ width: '100%', borderRadius: '8px', opacity: 0.8 }}
            onError={e => { e.target.style.display = 'none'; }}
          />
          <a href={data.github} target="_blank" rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '13px', fontWeight: 600, color: '#818cf8', textDecoration: 'none' }}>
            <FiGithub size={14} /> View GitHub Profile →
          </a>
        </motion.div>

        {/* Repos grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {repos.map((repo, i) => (
            <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"
              variants={fadeUp} custom={i}
              className="glass card-hover"
              style={{ borderRadius: '16px', padding: '20px', display: 'block', textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
                  {repo.name}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <FiStar size={12} /> {repo.stargazers_count}
                </span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px' }}>
                {repo.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: langColors[repo.language] || '#888', flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{repo.language}</span>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <FiGitBranch size={11} /> {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
