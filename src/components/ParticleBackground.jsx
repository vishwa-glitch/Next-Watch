import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    fullScreen: {
      enable: false,
      zIndex: -1
    },
    background: {
      color: {
        value: 'transparent'
      }
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push'
        },
        onHover: {
          enable: true,
          mode: 'repulse'
        },
        resize: true
      },
      modes: {
        push: {
          particles_nb: 4
        },
        repulse: {
          distance: 100,
          duration: 0.4
        }
      }
    },
    particles: {
      color: {
        value: ['#FF4500', '#00BFFF', '#6A0DAD', '#00FA9A']
      },
      links: {
        color: '#ffffff',
        distance: 150,
        enable: true,
        opacity: 0.2,
        width: 1
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce'
        },
        random: true,
        speed: 1.5,
        straight: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      },
      number: {
        density: {
          enable: true,
          area: 800
        },
        value: 80
      },
      opacity: {
        value: 0.5,
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.1
        }
      },
      shape: {
        type: 'circle'
      },
      size: {
        value: { min: 1, max: 3 },
        animation: {
          enable: true,
          speed: 2,
          minimumValue: 0.1
        }
      }
    },
    detectRetina: true
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particlesConfig}
      className="particles-bg"
    />
  );
};

export default ParticleBackground;
