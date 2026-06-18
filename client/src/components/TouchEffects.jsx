import { useEffect, useRef, useState } from 'react';

/* ── Ripple on click ── */
function createRipple(x, y) {
  const el = document.createElement('span');
  el.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    width:6px; height:6px;
    border-radius:50%;
    transform:translate(-50%,-50%) scale(0);
    background:radial-gradient(circle, rgba(139,92,246,0.9), rgba(99,102,241,0.6));
    box-shadow:0 0 12px rgba(99,102,241,0.8), 0 0 24px rgba(139,92,246,0.5);
    pointer-events:none; z-index:99998;
    animation:portfolio-ripple 0.7s ease-out forwards;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

/* ── Spark burst on click ── */
function createSparks(x, y) {
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#a78bfa', '#f59e0b'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('span');
    const angle = (i / 10) * 360;
    const dist  = 28 + Math.random() * 32;
    const color = colors[Math.floor(Math.random() * colors.length)];
    el.style.cssText = `
      position:fixed; left:${x}px; top:${y}px;
      width:${2 + Math.random() * 3}px; height:${2 + Math.random() * 3}px;
      border-radius:50%; background:${color};
      box-shadow:0 0 6px ${color};
      pointer-events:none; z-index:99997;
      transform:translate(-50%,-50%);
      animation:portfolio-spark-${i} 0.55s ease-out forwards;
    `;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes portfolio-spark-${i} {
        0%   { transform:translate(-50%,-50%) translate(0,0) scale(1); opacity:1; }
        100% { transform:translate(-50%,-50%) translate(${Math.cos((angle*Math.PI)/180)*dist}px,${Math.sin((angle*Math.PI)/180)*dist}px) scale(0); opacity:0; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(el);
    setTimeout(() => { el.remove(); style.remove(); }, 560);
  }
}

export default function TouchEffects() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const ringPos  = useRef({ x: -200, y: -200 });
  const rafRef   = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /* inject global keyframes once */
    const styleEl = document.createElement('style');
    styleEl.id = 'portfolio-touch-styles';
    styleEl.textContent = `
      @keyframes portfolio-ripple {
        0%   { transform:translate(-50%,-50%) scale(0); opacity:1; }
        100% { transform:translate(-50%,-50%) scale(28); opacity:0; }
      }
      * { cursor: none !important; }
    `;
    document.head.appendChild(styleEl);

    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x === undefined) return;
      mouseRef.current = { x, y };
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px';
        dotRef.current.style.top  = y + 'px';
      }
      if (!visible) setVisible(true);
    };

    const onClick = (e) => {
      createRipple(e.clientX, e.clientY);
      createSparks(e.clientX, e.clientY);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    /* smooth ring follow via rAF */
    const animate = () => {
      const { x: mx, y: my } = mouseRef.current;
      const { x: rx, y: ry } = ringPos.current;
      const nx = rx + (mx - rx) * 0.12;
      const ny = ry + (my - ry) * 0.12;
      ringPos.current = { x: nx, y: ny };
      if (ringRef.current) {
        ringRef.current.style.left = nx + 'px';
        ringRef.current.style.top  = ny + 'px';
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    /* cursor change on interactive elements */
    const onHoverIn = () => {
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%,-50%) scale(2.2)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1.6)';
      if (ringRef.current) ringRef.current.style.borderColor = '#a78bfa';
      if (ringRef.current) ringRef.current.style.boxShadow = '0 0 20px rgba(167,139,250,0.7), 0 0 40px rgba(99,102,241,0.4)';
    };
    const onHoverOut = () => {
      if (dotRef.current)  dotRef.current.style.transform  = 'translate(-50%,-50%) scale(1)';
      if (ringRef.current) ringRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (ringRef.current) ringRef.current.style.borderColor = 'rgba(99,102,241,0.8)';
      if (ringRef.current) ringRef.current.style.boxShadow = '0 0 10px rgba(99,102,241,0.5), 0 0 20px rgba(99,102,241,0.25)';
    };

    const attachHover = () => {
      document.querySelectorAll('a,button,input,textarea,[role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };
    attachHover();
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('click', onClick);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      observer.disconnect();
      styleEl.remove();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <span
        ref={dotRef}
        style={{
          position: 'fixed', zIndex: 99999,
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #a78bfa, #6366f1)',
          boxShadow: '0 0 8px rgba(99,102,241,1), 0 0 16px rgba(139,92,246,0.8)',
          pointerEvents: 'none',
          transform: 'translate(-50%,-50%) scale(1)',
          transition: 'transform 0.15s ease, opacity 0.2s ease',
          opacity: visible ? 1 : 0,
          left: '-200px', top: '-200px',
        }}
      />

      {/* Outer lagging ring */}
      <span
        ref={ringRef}
        style={{
          position: 'fixed', zIndex: 99998,
          width: '36px', height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(99,102,241,0.8)',
          boxShadow: '0 0 10px rgba(99,102,241,0.5), 0 0 20px rgba(99,102,241,0.25)',
          background: 'rgba(99,102,241,0.04)',
          pointerEvents: 'none',
          transform: 'translate(-50%,-50%) scale(1)',
          transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
          opacity: visible ? 1 : 0,
          left: '-200px', top: '-200px',
        }}
      />
    </>
  );
}
