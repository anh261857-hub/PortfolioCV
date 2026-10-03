/**
 * LUXURY PINK FAIRYTALE — AMBIENT PARTICLES & CINEMATIC PARALLAX ENGINE
 * Procedural Floating Rose Petals, Fireflies, Champagne Sparkles & Parallax
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let isRunning = !prefersReducedMotion;
  let mouse = { x: width / 2, y: height / 2, active: false, targetX: 0, targetY: 0, currentX: 0, currentY: 0 };

  // Track window resizing
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;

    // Normalized mouse (-1 to 1) for smooth parallax
    mouse.targetX = (e.clientX / width - 0.5) * 2;
    mouse.targetY = (e.clientY / height - 0.5) * 2;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  // --- 1. Rose Petal Class (3D Flutter & Gentle Sway) ---
  class RosePetal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -35;
      this.size = 11 + Math.random() * 15;
      this.speedY = 0.45 + Math.random() * 0.95;
      this.speedX = -0.25 + Math.random() * 0.55;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = 0.012 + Math.random() * 0.018;
      this.opacity = 0.4 + Math.random() * 0.45;
      this.swayFreq = 0.006 + Math.random() * 0.006;
      this.swayAmp = 0.4 + Math.random() * 0.5;

      // Color variations (blush, soft pink, dusty rose, champagne rim)
      const colors = [
        { r: 248, g: 221, b: 232 },
        { r: 243, g: 198, b: 216 },
        { r: 233, g: 169, b: 195 },
        { r: 255, g: 242, b: 246 }
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * this.swayFreq) * this.swayAmp;
      this.rotation += this.rotSpeed;
      this.flip += this.flipSpeed;

      // Gentle interactive breeze on hover
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / dist) * force * 1.2;
        }
      }

      // Reset when offscreen
      if (this.y > height + 40 || this.x < -50 || this.x > width + 50) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(1, Math.cos(this.flip));

      // Organic Petal Shape
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.85, -this.size * 0.75, this.size * 0.85, this.size * 0.75, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.85, this.size * 0.75, -this.size * 0.85, -this.size * 0.75, 0, -this.size);
      ctx.closePath();

      // Soft Radial Gradient
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
      grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
      grad.addColorStop(0.75, `rgba(${this.color.r - 20}, ${this.color.g - 30}, ${this.color.b - 20}, ${this.opacity * 0.85})`);
      grad.addColorStop(1, `rgba(216, 184, 120, ${this.opacity * 0.35})`);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(233, 169, 195, 0.22)';
      ctx.shadowBlur = 5;
      ctx.fill();

      // Vein Line
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.65);
      ctx.lineTo(0, this.size * 0.65);
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
      ctx.lineWidth = 0.6;
      ctx.stroke();

      ctx.restore();
    }
  }

  // --- 2. Firefly Class ---
  class Firefly {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.size = 1.4 + Math.random() * 2.2;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.025;
      this.baseAlpha = 0.25 + Math.random() * 0.45;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += this.pulseSpeed;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      const alpha = this.baseAlpha + Math.sin(this.pulse) * 0.3;
      if (alpha <= 0) return;

      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 246, 205, ${alpha})`;
      ctx.shadowColor = 'rgba(216, 184, 120, 0.85)';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();
    }
  }

  // --- 3. Champagne Sparkle Star Class ---
  class SparkleStar {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : Math.random() * height;
      this.size = 2.5 + Math.random() * 4.5;
      this.alpha = 0;
      this.maxAlpha = 0.35 + Math.random() * 0.45;
      this.life = 0;
      this.maxLife = 50 + Math.random() * 80;
      this.growing = true;
    }

    update() {
      this.life++;
      if (this.growing) {
        this.alpha += 0.025;
        if (this.alpha >= this.maxAlpha) {
          this.growing = false;
        }
      } else {
        this.alpha -= 0.012;
      }

      if (this.life >= this.maxLife || this.alpha <= 0) {
        this.reset();
      }
    }

    draw() {
      if (this.alpha <= 0) return;

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = `rgba(255, 248, 225, ${this.alpha})`;
      ctx.shadowColor = 'rgba(216, 184, 120, 0.75)';
      ctx.shadowBlur = 6;

      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.quadraticCurveTo(0, 0, this.size, 0);
      ctx.quadraticCurveTo(0, 0, 0, this.size);
      ctx.quadraticCurveTo(0, 0, -this.size, 0);
      ctx.quadraticCurveTo(0, 0, 0, -this.size);
      ctx.fill();

      ctx.restore();
    }
  }

  // Population scaled by screen size
  const petalCount = Math.min(24, Math.floor(width / 55));
  const fireflyCount = Math.min(28, Math.floor(width / 50));
  const sparkleCount = Math.min(16, Math.floor(width / 75));

  const petals = Array.from({ length: petalCount }, () => new RosePetal());
  const fireflies = Array.from({ length: fireflyCount }, () => new Firefly());
  const sparkles = Array.from({ length: sparkleCount }, () => new SparkleStar());

  // Parallax DOM Elements in Hero
  const parallaxCastle = document.querySelector('.hero-parallax-castle');
  const parallaxGlow = document.querySelector('.hero-celestial-glow');
  const parallaxMist = document.querySelector('.hero-parallax-mist');
  const parallaxContent = document.querySelector('.hero-content');

  // Render & Parallax Loop
  function loop() {
    if (!isRunning) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth Lerp Mouse for Cinematic Parallax
    if (!prefersReducedMotion) {
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.06;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.06;

      if (parallaxCastle) {
        parallaxCastle.style.transform = `translate3d(${mouse.currentX * 10}px, ${mouse.currentY * 6}px, 0)`;
      }
      if (parallaxGlow) {
        parallaxGlow.style.transform = `translate3d(calc(-50% + ${mouse.currentX * -6}px), calc(-50% + ${mouse.currentY * -4}px), 0)`;
      }
      if (parallaxMist) {
        parallaxMist.style.transform = `translate3d(${mouse.currentX * -14}px, ${mouse.currentY * -6}px, 0)`;
      }
      if (parallaxContent && width > 768) {
        parallaxContent.style.transform = `translate3d(${mouse.currentX * -4}px, ${mouse.currentY * -3}px, 0)`;
      }
    }

    // Draw fireflies
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update();
      fireflies[i].draw();
    }

    // Draw sparkles
    for (let i = 0; i < sparkles.length; i++) {
      sparkles[i].update();
      sparkles[i].draw();
    }

    // Draw rose petals
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    requestAnimationFrame(loop);
  }

  if (!prefersReducedMotion) {
    requestAnimationFrame(loop);
  }

  // Pause when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isRunning = false;
    } else if (!prefersReducedMotion) {
      isRunning = true;
      requestAnimationFrame(loop);
    }
  });

  // Global toggle API
  window.toggleFairytaleAmbience = function () {
    isRunning = !isRunning;
    if (isRunning) {
      requestAnimationFrame(loop);
    } else {
      ctx.clearRect(0, 0, width, height);
      if (parallaxCastle) parallaxCastle.style.transform = '';
      if (parallaxGlow) parallaxGlow.style.transform = '';
      if (parallaxMist) parallaxMist.style.transform = '';
      if (parallaxContent) parallaxContent.style.transform = '';
    }
    return isRunning;
  };
})();
