import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

export default function ParticleBackground() {
  const init = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={init}
      className="absolute inset-0 z-0"
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: 'repulse' } },
          modes: { repulse: { distance: 100, duration: 0.4 } },
        },
        particles: {
          color: { value: ['#6366f1', '#8b5cf6', '#06b6d4'] },
          links: { color: '#6366f1', distance: 150, enable: true, opacity: 0.15, width: 1 },
          move: { enable: true, speed: 0.8, direction: 'none', random: true, outModes: { default: 'bounce' } },
          number: { density: { enable: true, area: 900 }, value: 60 },
          opacity: { value: { min: 0.1, max: 0.4 } },
          shape: { type: 'circle' },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
