/**
 * LUXURY PINK FAIRYTALE — MAIN APPLICATION CONTROLLER (main.js)
 */

(function () {
  'use strict';

  let audioCtx = null;
  let soundEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playFairyChime(type = 'sparkle') {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    if (type === 'sparkle') {
      const frequencies = [659.25, 830.61, 987.77, 1318.51];

      frequencies.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(
          0.045,
          now + idx * 0.08 + 0.02
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + idx * 0.08 + 0.8
        );

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.85);
      });

    } else if (type === 'seal') {
      const notes = [440, 554.37, 659.25];

      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.1);

        gain.gain.setValueAtTime(0, now + idx * 0.1);
        gain.gain.linearRampToValueAtTime(
          0.06,
          now + idx * 0.1 + 0.03
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + idx * 0.1 + 1.2
        );

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + idx * 0.1);
        osc.stop(now + idx * 0.1 + 1.3);
      });
    }
  }

  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const royalNav = document.querySelector('.royal-nav');

  if (mobileMenuBtn && royalNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = royalNav.classList.toggle('open');

      mobileMenuBtn.classList.toggle('active', isOpen);

      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    royalNav.querySelectorAll('.royal-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        royalNav.classList.remove('open');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  const header = document.querySelector('.royal-header');

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  const revealElements =
    document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

  } else {
    revealElements.forEach((el) => {
      el.classList.add('revealed');
    });
  }

  const ambienceBtn =
    document.getElementById('ambience-toggle-btn');

  if (ambienceBtn) {
    ambienceBtn.addEventListener('click', () => {

      let isCanvasRunning = true;

      if (window.toggleFairytaleAmbience) {
        isCanvasRunning =
          window.toggleFairytaleAmbience();
      }

      soundEnabled = isCanvasRunning;

      if (soundEnabled) {
        playFairyChime('sparkle');

        ambienceBtn.innerHTML =
          '<span class="sparkle-icon">✦</span> Magic: On';

        ambienceBtn.style.opacity = '1';

      } else {

        ambienceBtn.innerHTML =
          '<span class="sparkle-icon">✧</span> Magic: Off';

        ambienceBtn.style.opacity = '0.7';
      }
    });
  }

  const contactForm =
    document.getElementById('royal-contact-form');

  const sealConfirmationModal =
    document.getElementById('seal-confirmation-modal');

  const closeConfirmationBtn =
    document.getElementById('close-confirmation-btn');

  if (contactForm) {

    contactForm.addEventListener('submit', (e) => {

      e.preventDefault();

      const submitBtn =
        contactForm.querySelector('button[type="submit"]');

      const nameInput =
        document.getElementById('sender-name');

      const emailInput =
        document.getElementById('sender-email');

      const messageInput =
        document.getElementById('sender-message');

      if (
        !nameInput.value.trim() ||
        !emailInput.value.trim() ||
        !messageInput.value.trim()
      ) {

        alert(
          'Please fill out all fields of the invitation letter.'
        );

        return;
      }

      if (submitBtn) {

        submitBtn.disabled = true;

        submitBtn.innerHTML =
          'Sealing Letter with Gold Wax... ✦';
      }

      playFairyChime('seal');

      setTimeout(() => {

        if (sealConfirmationModal) {
          sealConfirmationModal.classList.add('active');
        }

        if (submitBtn) {

          submitBtn.disabled = false;

          submitBtn.innerHTML =
            'SEND MESSAGE ✦';
        }

        contactForm.reset();

      }, 1200);
    });
  }

  if (
    closeConfirmationBtn &&
    sealConfirmationModal
  ) {

    closeConfirmationBtn.addEventListener(
      'click',
      () => {
        sealConfirmationModal.classList.remove('active');
      }
    );

    sealConfirmationModal.addEventListener(
      'click',
      (e) => {

        if (e.target === sealConfirmationModal) {
          sealConfirmationModal.classList.remove('active');
        }

      }
    );
  }

  document
    .querySelectorAll(
      '.btn-royal-primary, .btn-royal-secondary'
    )
    .forEach((btn) => {

      btn.addEventListener('click', () => {
        playFairyChime('sparkle');
      });

    });

})();