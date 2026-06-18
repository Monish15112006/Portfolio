import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── constants ─── */
const GOLD   = '#f59e0b';
const ORANGE = '#fb923c';
const CYAN   = '#06b6d4';
const WHITE  = '#ffffffee';
const INDIGO = '#6366f1';
const PURPLE = '#8b5cf6';

function lerp(a, b, t) { return a + (b - a) * t; }
function rand(min, max) { return Math.random() * (max - min) + min; }

/* ─── Spark particles ─── */
class Spark {
  constructor(cx, cy) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(1.5, 5.5);
    this.x = cx; this.y = cy;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1;
    this.decay = rand(0.012, 0.028);
    this.size = rand(1.5, 3.5);
    this.color = [GOLD, ORANGE, CYAN, WHITE][Math.floor(rand(0, 4))];
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.vy += 0.06;
    this.life -= this.decay;
    this.vx *= 0.97; this.vy *= 0.97;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

/* ─── Rune character set ─── */
const RUNES = ['ᚠ','ᚢ','ᚦ','ᚨ','ᚱ','ᚲ','ᚷ','ᚹ','ᚺ','ᚾ','ᛁ','ᛃ','ᛇ','ᛈ','ᛉ','ᛊ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛜ','ᛞ','ᛟ'];

export default function StrangeIntro({ onDone }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ t: 0, sparks: [], phase: 0 });
  const rafRef    = useRef(null);
  const [showSkip, setShowSkip]       = useState(false);
  const [portalOpen, setPortalOpen]   = useState(false);
  const [finished, setFinished]       = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let W, H, cx, cy;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cx = W / 2; cy = H / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    const s = stateRef.current;

    function drawRing(ctx, cx, cy, r, width, color, alpha, dash = []) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth   = width;
      ctx.shadowColor = color;
      ctx.shadowBlur  = 18;
      ctx.setLineDash(dash);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    function drawRotatingRunes(ctx, cx, cy, r, count, t, color, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle   = color;
      ctx.shadowColor = color;
      ctx.shadowBlur  = 10;
      ctx.font        = `${Math.max(10, r * 0.11)}px serif`;
      ctx.textAlign   = 'center';
      ctx.textBaseline= 'middle';
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.fillText(RUNES[(i + Math.floor(t * 3)) % RUNES.length], 0, 0);
        ctx.restore();
      }
      ctx.restore();
    }

    function drawMandala(ctx, cx, cy, r, t, alpha) {
      const petals = 8;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.3);
      for (let i = 0; i < petals; i++) {
        const angle = (i / petals) * Math.PI * 2;
        ctx.save();
        ctx.rotate(angle);
        // petal
        ctx.beginPath();
        ctx.strokeStyle = GOLD;
        ctx.lineWidth = 1.2;
        ctx.shadowColor = GOLD;
        ctx.shadowBlur = 12;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.5, -r * 0.3, r * 0.5, -r * 0.7, 0, -r);
        ctx.bezierCurveTo(-r * 0.5, -r * 0.7, -r * 0.5, -r * 0.3, 0, 0);
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    }

    function drawSriYantra(ctx, cx, cy, r, t, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 1;
      ctx.shadowColor = ORANGE;
      ctx.shadowBlur = 10;
      ctx.translate(cx, cy);
      ctx.rotate(t * 0.15);
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i / 6) * Math.PI * 2);
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.866, r * 0.5);
        ctx.lineTo(-r * 0.866, r * 0.5);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
    }

    function drawPortalCore(ctx, cx, cy, r, t, alpha) {
      // Vortex layers
      const layers = 6;
      for (let i = layers; i >= 0; i--) {
        const layerR = r * (i / layers);
        const hue    = (i * 30 + t * 40) % 360;
        const grad   = ctx.createRadialGradient(cx, cy, 0, cx, cy, layerR);
        grad.addColorStop(0, `hsla(${hue}, 100%, 60%, ${alpha * 0.35})`);
        grad.addColorStop(1, `hsla(${hue + 60}, 100%, 40%, 0)`);
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.fillStyle   = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, layerR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function drawLightning(ctx, x1, y1, x2, y2, branches, alpha) {
      if (alpha <= 0 || branches < 1) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = CYAN;
      ctx.lineWidth   = branches * 0.6;
      ctx.shadowColor = CYAN;
      ctx.shadowBlur  = 12;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      const mx = (x1 + x2) / 2 + rand(-30, 30);
      const my = (y1 + y2) / 2 + rand(-30, 30);
      ctx.quadraticCurveTo(mx, my, x2, y2);
      ctx.stroke();
      ctx.restore();
      if (branches > 1 && Math.random() > 0.4) {
        const bx = mx + rand(-40, 40);
        const by = my + rand(-40, 40);
        drawLightning(ctx, mx, my, bx, by, branches - 1, alpha * 0.6);
      }
    }

    function spawnSparks(cx, cy, count) {
      for (let i = 0; i < count; i++) s.sparks.push(new Spark(cx, cy));
    }

    /* ─── main animation loop ─── */
    function draw(ts) {
      rafRef.current = requestAnimationFrame(draw);
      s.t += 0.016;
      const t = s.t;

      /* clear */
      ctx.clearRect(0, 0, W, H);

      /* full-screen dark bg with vignette */
      const vg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
      vg.addColorStop(0, 'rgba(5,5,20,0.0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.92)');
      ctx.fillStyle = '#05050f';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);

      /* ── phase timeline ──
         0–1.5s  : rings coalesce
         1.5–3s  : mandala + runes spin up
         3–5s    : full portal blazing
         5–6s    : implode / reveal  */
      const phase = Math.min(t / 5.5, 1);
      s.phase = phase;

      const easeIn = x => x * x;
      const easeOut = x => 1 - (1 - x) * (1 - x);

      /* base portal radius grows */
      const baseR = Math.min(cx, cy) * 0.52 * easeOut(Math.min(t / 2.5, 1));

      /* ── outer energy rings ── */
      for (let i = 0; i < 5; i++) {
        const ringR   = baseR * (0.7 + i * 0.12) + Math.sin(t * 1.4 + i) * 6;
        const ringAlp = 0.25 + 0.15 * Math.sin(t * 2 + i * 1.3);
        const colors  = [GOLD, ORANGE, CYAN, INDIGO, PURPLE];
        drawRing(ctx, cx, cy, ringR, 1.2 + i * 0.3, colors[i], ringAlp * Math.min(t * 0.9, 1), [8, 4 + i * 2]);
      }

      /* ── Sri-Yantra triangles ── */
      if (t > 0.6) {
        drawSriYantra(ctx, cx, cy, baseR * 0.82, t, Math.min((t - 0.6) * 0.7, 0.5));
      }

      /* ── Mandala petals ── */
      if (t > 1.0) {
        drawMandala(ctx, cx, cy, baseR * 0.65, t, Math.min((t - 1.0) * 0.55, 0.7));
      }

      /* ── Rune rings ── */
      if (t > 0.8) {
        const runeAlpha = Math.min((t - 0.8) * 0.6, 0.9);
        drawRotatingRunes(ctx, cx, cy, baseR * 1.05, 18, t * 0.8, GOLD, runeAlpha);
        drawRotatingRunes(ctx, cx, cy, baseR * 0.75, 12, -t * 1.1, ORANGE, runeAlpha * 0.7);
        drawRotatingRunes(ctx, cx, cy, baseR * 0.42, 8, t * 1.5, CYAN, runeAlpha * 0.55);
      }

      /* ── Portal vortex core ── */
      if (t > 1.5) {
        drawPortalCore(ctx, cx, cy, baseR * 0.55, t, Math.min((t - 1.5) * 0.5, 0.85));
      }

      /* ── Solid inner glow ring ── */
      drawRing(ctx, cx, cy, baseR * 0.56, 3, GOLD, Math.min(t * 0.5, 0.9) * (0.7 + 0.3 * Math.sin(t * 4)));
      drawRing(ctx, cx, cy, baseR * 0.56, 12, GOLD, 0.08 + 0.05 * Math.sin(t * 3));

      /* ── Lightning arcs (burst at t > 2) ── */
      if (t > 2 && Math.random() > 0.55) {
        const a1 = rand(0, Math.PI * 2);
        const a2 = a1 + rand(0.5, 1.8);
        const r1 = baseR * 0.56;
        drawLightning(
          ctx,
          cx + Math.cos(a1) * r1, cy + Math.sin(a1) * r1,
          cx + Math.cos(a2) * r1, cy + Math.sin(a2) * r1,
          3, 0.7 + 0.3 * Math.sin(t * 6),
        );
      }

      /* ── Spark shower (continuous after t>1) ── */
      if (t > 1 && Math.random() > 0.6) {
        const a = rand(0, Math.PI * 2);
        const spawnR = baseR * (0.5 + Math.random() * 0.1);
        spawnSparks(cx + Math.cos(a) * spawnR, cy + Math.sin(a) * spawnR, 2);
      }

      /* update + draw sparks */
      s.sparks = s.sparks.filter(sp => sp.life > 0);
      s.sparks.forEach(sp => { sp.update(); sp.draw(ctx); });

      /* ── Grand burst at t ≈ 3.5 ── */
      if (t > 3.4 && t < 3.6 && Math.random() > 0.3) {
        spawnSparks(cx, cy, 30);
      }

      /* ── Implode + white flash at t ≈ 4.5 ── */
      if (t > 4.3) {
        const flashAlpha = Math.min((t - 4.3) * 0.9, 1);
        ctx.save();
        ctx.globalAlpha = flashAlpha;
        ctx.fillStyle   = 'white';
        ctx.fillRect(0, 0, W, H);
        ctx.restore();

        if (t > 5.3 && !portalOpen) {
          setPortalOpen(true);
          setTimeout(() => { setFinished(true); onDone(); }, 600);
        }
      }

      /* ── Subtle screen shake at peak ── */
      if (t > 3.2 && t < 4.5) {
        canvas.style.transform = `translate(${rand(-2, 2)}px, ${rand(-2, 2)}px)`;
      } else {
        canvas.style.transform = '';
      }
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleSkip = () => {
    cancelAnimationFrame(rafRef.current);
    setFinished(true);
    onDone();
  };

  if (finished) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#05050f',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <canvas ref={canvasRef} style={{ display: 'block', position: 'absolute', inset: 0 }} />

      {/* Centre text that fades in */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{
          position: 'relative', zIndex: 10, textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ times: [0, 0.2, 0.7, 1], duration: 3, delay: 1.8 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            letterSpacing: '0.25em',
            color: GOLD,
            textTransform: 'uppercase',
            textShadow: `0 0 20px ${GOLD}`,
            marginBottom: '12px',
          }}
        >
          The Multiverse Awaits
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ times: [0, 0.15, 0.75, 1], duration: 3.2, delay: 2.1 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(9px, 1.2vw, 12px)',
            letterSpacing: '0.35em',
            color: CYAN,
            textTransform: 'uppercase',
            textShadow: `0 0 14px ${CYAN}`,
          }}
        >
          Entering Portfolio
        </motion.p>
      </motion.div>

      {/* Skip button */}
      <AnimatePresence>
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={handleSkip}
            style={{
              position: 'absolute', bottom: '32px', right: '32px',
              zIndex: 20, padding: '9px 20px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em',
              fontFamily: "'JetBrains Mono', monospace",
              color: GOLD, background: 'rgba(245,158,11,0.08)',
              border: `1px solid rgba(245,158,11,0.35)`,
              borderRadius: '8px', cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.18)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(245,158,11,0.08)')}
          >
            Skip Intro ⟶
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
