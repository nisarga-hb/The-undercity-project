/**
 * Project Undercity - Interactive Effects & Animations
 * Chronicles of Piltover & Zaun CTF Landing Page
 */

(function () {
  'use strict';

  // ===== LOADING SCREEN =====
  window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1800);
  });

  // ===== MATRIX RAIN CANVAS =====
  function initMatrixRain() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01アイウエオカキクケコサシスセソ⬡◊∆∇∞≡≈';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    function draw() {
      ctx.fillStyle = 'rgba(11, 16, 32, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#4cc9f0';
      ctx.font = fontSize + 'px Sora';

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Vary brightness
        const brightness = Math.random();
        if (brightness > 0.95) {
          ctx.fillStyle = '#8be9fd';
        } else if (brightness > 0.8) {
          ctx.fillStyle = '#4cc9f0';
        } else {
          ctx.fillStyle = 'rgba(76, 201, 240, 0.4)';
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ===== DATA STREAMS CANVAS =====
  function initDataStreams() {
    const canvas = document.getElementById('data-streams-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const streams = [];
    const streamCount = 15;

    for (let i = 0; i < streamCount; i++) {
      streams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 50 + Math.random() * 200,
        speed: 0.5 + Math.random() * 2,
        opacity: 0.05 + Math.random() * 0.15,
        width: 0.5 + Math.random() * 1.5,
        isRed: Math.random() > 0.6,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streams.forEach((s) => {
        const gradient = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
        const color = s.isRed ? '76, 201, 240' : '157, 78, 221';
        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${color}, ${s.opacity})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.length);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.width;
        ctx.stroke();

        s.y += s.speed;
        if (s.y > canvas.height) {
          s.y = -s.length;
          s.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ===== DIGITAL DUST PARTICLES =====
  function initDigitalDust() {
    const container = document.getElementById('digital-dust');
    if (!container) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'dust-particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = 6 + Math.random() * 6 + 's';

      // Mix arcane and shimmer particles
      if (Math.random() > 0.7) {
        particle.style.background = '#6bff95';
      } else if (Math.random() > 0.5) {
        particle.style.background = '#c8a96b';
        particle.style.width = '1px';
        particle.style.height = '1px';
      }

      container.appendChild(particle);
    }
  }

  // ===== PARALLAX HERO LAYERS =====
  function initParallaxHero() {
    const layerGrid = document.getElementById('layer-grid');
    const layerCity = document.getElementById('layer-city');

    if (!layerGrid || !layerCity) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
      // Smooth lerp
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      layerGrid.style.transform = `translate(${currentX * 15}px, ${currentY * 10}px) scale(1.05)`;
      layerCity.style.transform = `translate(${currentX * 8}px, ${currentY * 5}px) scale(1.02)`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  // ===== SCROLL REVEAL ANIMATIONS =====
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  // ===== HEXTECH GEM MOUSE INTERACTION =====
  function initHextechInteraction() {
    const gem = document.getElementById('hextech-gem');
    if (!gem) return;

    const section = document.getElementById('hextech');

    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gem.style.transform = `translateY(${-15 + y * 10}px) rotate(${x * 5}deg) scale(${1 + Math.abs(x) * 0.05})`;
    });

    section.addEventListener('mouseleave', () => {
      gem.style.transform = '';
    });
  }

  // ===== FISHBONES GLITCH EFFECT =====
  function initFishbonesGlitch() {
    const img = document.getElementById('fishbones-img');
    if (!img) return;

    setInterval(() => {
      if (Math.random() > 0.85) {
        img.style.filter = `brightness(0.7) contrast(1.1) hue-rotate(${Math.random() * 10}deg)`;
        img.style.transform = `translateX(${(Math.random() - 0.5) * 4}px)`;

        setTimeout(() => {
          img.style.filter = 'brightness(0.7) contrast(1.1)';
          img.style.transform = 'translateX(0)';
        }, 100);
      }
    }, 2000);
  }

  // ===== COUNTDOWN TIMER =====
  function initCountdown() {
    const el = document.getElementById('countdown-ticker');
    if (!el) return;

    // Random countdown effect
    setInterval(() => {
      const h = String(Math.floor(Math.random() * 24)).padStart(2, '0');
      const m = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      const s = String(Math.floor(Math.random() * 60)).padStart(2, '0');
      el.textContent = `${h}:${m}:${s}`;
    }, 1000);
  }

  // ===== CTA BUTTON RIPPLE =====
  function initCTAButton() {
    const btn = document.getElementById('cta-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      // Scroll to top with a dramatic effect
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== TYPEWRITER EFFECT FOR HEXTECH SIGNATURE =====
  function initTypewriterEffect() {
    const signature = document.querySelector('.hextech-signature code');
    if (!signature) return;

    const originalHTML = signature.innerHTML;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a blinking cursor effect
            const cursor = document.createElement('span');
            cursor.textContent = '█';
            cursor.style.animation = 'blink 0.8s ease-in-out infinite';
            cursor.style.color = '#2ea8d5';
            signature.appendChild(cursor);

            // Remove cursor after 3s
            setTimeout(() => cursor.remove(), 3000);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(signature);
  }

  // ===== CALLOUT PANEL PULSE =====
  function initCalloutPulse() {
    const panels = document.querySelectorAll('.callout-panel');

    panels.forEach((panel, i) => {
      // Staggered entrance
      panel.style.opacity = '0';
      panel.style.transform = 'translateX(20px)';

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                panel.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                panel.style.opacity = '1';
                panel.style.transform = 'translateX(0)';
              }, i * 200);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(panel);
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHORS =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ===== SECTION PROGRESS INDICATOR =====
  function initProgressIndicator() {
    const sections = document.querySelectorAll('.section');
    
    // Create progress dots
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 100;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    sections.forEach((section, i) => {
      const dot = document.createElement('div');
      dot.style.cssText = `
        width: 8px;
        height: 8px;
        border: 1px solid rgba(76, 201, 240, 0.4);
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
      `;
      dot.addEventListener('click', () => {
        section.scrollIntoView({ behavior: 'smooth' });
      });
      dot.setAttribute('data-section-index', i);
      progressContainer.appendChild(dot);
    });

    document.body.appendChild(progressContainer);

    // Highlight active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            progressContainer.querySelectorAll('div').forEach((dot, i) => {
              if (i === index) {
                dot.style.background = '#4cc9f0';
                dot.style.borderColor = '#4cc9f0';
                dot.style.boxShadow = '0 0 12px rgba(76, 201, 240, 0.6)';
                dot.style.transform = 'scale(1.3)';
              } else {
                dot.style.background = 'transparent';
                dot.style.borderColor = 'rgba(76, 201, 240, 0.4)';
                dot.style.boxShadow = 'none';
                dot.style.transform = 'scale(1)';
              }
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // ===== INITIALIZE ALL =====
  document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initDataStreams();
    initDigitalDust();
    initParallaxHero();
    initScrollReveal();
    initHextechInteraction();
    initFishbonesGlitch();
    initCountdown();
    initCTAButton();
    initTypewriterEffect();
    initCalloutPulse();
    initSmoothScroll();
    initProgressIndicator();
  });
})();

function initSignalIntegrity() {
  const baseValue = 98.7;
  const variation = 11; // ±11% variation
  const elements = document.querySelectorAll('.signal-integrity');

  if (!elements.length) {
    return;
  }

  setInterval(() => {
    const randomVariation = (Math.random() - 0.5) * 2 * variation;
    const newValue = Math.max(0, Math.min(100, baseValue + randomVariation));
    const formattedValue = newValue.toFixed(1);

    elements.forEach((el) => {
      el.textContent = formattedValue;
    });
  }, 2000); // Updates every 2 seconds
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', initSignalIntegrity);

