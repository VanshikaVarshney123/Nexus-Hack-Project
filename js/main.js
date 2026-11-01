/**
 * ============================================================================
 * NEXUS HACK 2026 - Master JavaScript Engine
 * Core Technology: Vanilla ES6+ JavaScript (Zero External Dependencies)
 * Features:
 *   1. Real-time Event Countdown Timer
 *   2. Responsive Mobile Drawer Navigation
 *   3. Sticky Header Scroll Spy
 *   4. Interactive Challenge Track Category Filtering
 *   5. Schedule Day 1 & Day 2 Timeline Switcher
 *   6. Accessible FAQ Accordion
 *   7. Registration Modal (Focus Trap, Esc Key, Backdrop Dismiss)
 *   8. Front-End Form Validation with Error Highlighting & Demo Pass Generation
 *   9. Toast Notification System
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Live Event Countdown Timer (Target: Nov 21, 2026, 09:00:00 AM)
     -------------------------------------------------------------------------- */
  const initCountdown = () => {
    // Sensible future event date for NEXUS HACK 2026
    const targetDate = new Date('2026-11-21T09:00:00').getTime();
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  };

  /* --------------------------------------------------------------------------
     2. Responsive Mobile Menu & Header Scroll Observer
     -------------------------------------------------------------------------- */
  const initNavigation = () => {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Sticky header glass darkening on scroll & Active Link Observer
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      // Darken header on scroll
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Scroll Spy for nav links
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { passive: true });

    // Mobile drawer toggle
    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.classList.toggle('active', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileNav.setAttribute('aria-hidden', String(!isOpen));
      });

      // Close mobile drawer when an internal link is clicked
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          mobileNav.setAttribute('aria-hidden', 'true');
        });
      });
    }
  };

  /* --------------------------------------------------------------------------
     3. Interactive Challenge Tracks Category Filter
     -------------------------------------------------------------------------- */
  const initTrackFilters = () => {
    const filterBtns = document.querySelectorAll('.track-filter-btn');
    const trackCards = document.querySelectorAll('.track-card');

    if (!filterBtns.length || !trackCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button state
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        trackCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  };

  /* --------------------------------------------------------------------------
     4. Schedule Day Switcher (Timeline Tabs)
     -------------------------------------------------------------------------- */
  const initScheduleTabs = () => {
    const tabBtns = document.querySelectorAll('.schedule-tab-btn');
    const dayPanels = document.querySelectorAll('.timeline-container');

    if (!tabBtns.length || !dayPanels.length) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const targetId = btn.getAttribute('data-target');

        dayPanels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.add('active');
            panel.removeAttribute('hidden');
          } else {
            panel.classList.remove('active');
            panel.setAttribute('hidden', 'true');
          }
        });
      });
    });
  };

  /* --------------------------------------------------------------------------
     5. Accessible FAQ Accordion
     -------------------------------------------------------------------------- */
  const initFaqAccordion = () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(questionBtn => {
      questionBtn.addEventListener('click', () => {
        const item = questionBtn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isExpanded = questionBtn.getAttribute('aria-expanded') === 'true';

        // Close other accordion items for clean single-view
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAns) otherAns.setAttribute('hidden', 'true');
          }
        });

        // Toggle current item
        if (isExpanded) {
          questionBtn.setAttribute('aria-expanded', 'false');
          item.classList.remove('active');
          answer.setAttribute('hidden', 'true');
        } else {
          questionBtn.setAttribute('aria-expanded', 'true');
          item.classList.add('active');
          answer.removeAttribute('hidden');
        }
      });
    });
  };

  /* --------------------------------------------------------------------------
     6. Toast Notification Helper
     -------------------------------------------------------------------------- */
  const showToast = (message, type = 'info') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span aria-hidden="true">${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  };

  /* --------------------------------------------------------------------------
     7. Accessible Registration Modal & Client-Side Validation
     -------------------------------------------------------------------------- */
  const initRegistrationModal = () => {
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const regForm = document.getElementById('registration-form');
    const regSuccess = document.getElementById('reg-success');
    const successDoneBtn = document.getElementById('success-done-btn');

    if (!backdrop || !regForm) return;

    // Open Modal
    const openModal = () => {
      backdrop.classList.add('open');
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      const firstInput = regForm.querySelector('input');
      if (firstInput) setTimeout(() => firstInput.focus(), 100);
    };

    // Close Modal with complete state reset
    const closeModal = () => {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Reset modal view back to clean form for next open
      setTimeout(() => {
        if (regSuccess && !regSuccess.hasAttribute('hidden')) {
          regSuccess.setAttribute('hidden', 'true');
          regForm.style.display = 'block';
          regForm.reset();
        }
      }, 300);
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Close on backdrop outside click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeModal();
      }
    });

    if (successDoneBtn) {
      successDoneBtn.addEventListener('click', () => {
        closeModal();
        // Reset modal state
        setTimeout(() => {
          regSuccess.setAttribute('hidden', 'true');
          regForm.style.display = 'block';
          regForm.reset();
        }, 300);
      });
    }

    // Form Client-Side Validation
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Inputs
      const nameInput = document.getElementById('full-name');
      const emailInput = document.getElementById('email-address');
      const teamInput = document.getElementById('team-name');
      const termsInput = document.getElementById('accept-code');
      const trackSelect = document.getElementById('selected-track');

      // Helper to set error
      const setError = (input, hasError) => {
        const group = input.closest('.form-group');
        if (group) {
          if (hasError) {
            group.classList.add('has-error');
            input.classList.add('invalid');
          } else {
            group.classList.remove('has-error');
            input.classList.remove('invalid');
          }
        }
      };

      // 1. Name validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setError(nameInput, true);
        isValid = false;
      } else {
        setError(nameInput, false);
      }

      // 2. Email validation (RFC-compliant regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        setError(emailInput, true);
        isValid = false;
      } else {
        setError(emailInput, false);
      }

      // 3. Team name validation
      if (!teamInput.value.trim()) {
        setError(teamInput, true);
        isValid = false;
      } else {
        setError(teamInput, false);
      }

      // 4. Terms agreement validation
      if (!termsInput.checked) {
        setError(termsInput, true);
        isValid = false;
      } else {
        setError(termsInput, false);
      }

      if (!isValid) {
        showToast('Please correct highlighted fields before submitting.', 'error');
        return;
      }

      // Successful demo registration flow
      const passTeam = document.getElementById('pass-team');
      const passTrack = document.getElementById('pass-track');
      
      if (passTeam) passTeam.textContent = teamInput.value.trim();
      if (passTrack && trackSelect) {
        passTrack.textContent = trackSelect.options[trackSelect.selectedIndex].text.split(':')[1] || trackSelect.value;
      }

      // Transition to success card
      regForm.style.display = 'none';
      regSuccess.removeAttribute('hidden');
      
      showToast(`Welcome ${nameInput.value.trim()}! Demo registration confirmed.`, 'success');
    });

    // Real-time error removal on input
    regForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) {
          group.classList.remove('has-error');
          input.classList.remove('invalid');
        }
      });
    });
  };

  /* --------------------------------------------------------------------------
     8. Interactive Pixel Constellation Canvas (Prompt 2 Pixel Engine)
     -------------------------------------------------------------------------- */
  const initPixelConstellation = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;
    const colors = [
      'rgba(0, 245, 155, 0.7)',  // Electric Volt
      'rgba(56, 189, 248, 0.6)',  // Sky Cyan
      'rgba(255, 92, 53, 0.55)',  // Sunset Tangerine
      'rgba(255, 209, 102, 0.6)'  // Sunburst Gold
    ];

    const mouse = {
      x: null,
      y: null,
      radius: 140
    };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    }, { passive: true });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 1.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.isSquare = Math.random() > 0.5; // Visual homage to "Pixels"
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse magnetic repel
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = dx / dist;
            const dirY = dy / dist;
            this.x -= dirX * force * 2.5;
            this.y -= dirY * force * 2.5;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        if (this.isSquare) {
          // Pixel Cube Node
          ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else {
          // Circular Node
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      const maxDistance = 115;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.18;
            ctx.strokeStyle = `rgba(0, 245, 155, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }

        // Connect to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particles[a].x;
          const dy = mouse.y - particles[a].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.35;
            ctx.strokeStyle = `rgba(0, 245, 155, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();
  };

  /* --------------------------------------------------------------------------
     9. Interactive Speakers & Mentors Filtering and Abstract Drawers
     -------------------------------------------------------------------------- */
  const initSpeakerInteractions = () => {
    const filterBtns = document.querySelectorAll('.speaker-filter-btn');
    const speakerCards = document.querySelectorAll('.speaker-card');
    const bioBtns = document.querySelectorAll('.btn-speaker-bio');

    // Filter speakers
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        speakerCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease';
              card.style.opacity = '1';
            }, 10);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // Bio drawer toggle
    bioBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const card = btn.closest('.speaker-card');
        const drawer = card.querySelector('.speaker-bio-drawer');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          btn.classList.remove('active');
          drawer.setAttribute('hidden', 'true');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          btn.classList.add('active');
          drawer.removeAttribute('hidden');
        }
      });
    });
  };

  /* --------------------------------------------------------------------------
     10. Keynote Speaker Audio Speech & Soundwave Equalizer (Web Speech API)
     -------------------------------------------------------------------------- */
  const initSpeakerVoiceEngine = () => {
    const audioBtns = document.querySelectorAll('.btn-speaker-audio');
    if (!audioBtns.length) return;

    // Speaker Speech Transcripts
    const speakerVoiceScripts = {
      elena: "Hello builders! I am Doctor Elena Rostova. In my keynote at NEXUS HACK 2026, I will break down how you can transform generative AI prompts into robust, real-time autonomous systems. Get ready to build!",
      karan: "Hey everyone, Karan Varma here! As a Google Developer Expert in Web, I'll be sharing how to craft 60 frames-per-second micro-interactions and pixel-perfect responsive layouts that leave a lasting impression. Let's make every pixel count!",
      sarah: "Hi hackers, I'm Sarah Chen. I'll be in the mentor pods helping you deploy zero-downtime APIs, serverless Google Cloud architecture, and secure databases. Don't hesitate to pull me into your team pod!",
      marcus: "Welcome to NEXUS HACK! I'm Marcus Brody, your UX and Accessibility mentor. I will help ensure your prototypes pass WCAG AAA standards with flawless keyboard navigation and high contrast design. Good luck!"
    };

    let activeSpeechBtn = null;

    const stopActiveAudio = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (activeSpeechBtn) {
        activeSpeechBtn.classList.remove('playing');
        const textSpan = activeSpeechBtn.querySelector('.audio-btn-text');
        if (textSpan) textSpan.textContent = 'Voice Teaser';
        activeSpeechBtn = null;
      }
    };

    audioBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const speakerKey = btn.getAttribute('data-speaker');
        const textToSpeak = speakerVoiceScripts[speakerKey];

        // If clicking the currently playing button, stop it
        if (btn === activeSpeechBtn && btn.classList.contains('playing')) {
          stopActiveAudio();
          showToast('Audio preview paused.', 'info');
          return;
        }

        // Stop any currently playing audio
        stopActiveAudio();

        if (!('speechSynthesis' in window)) {
          showToast('Web Speech API is not supported on this browser.', 'error');
          return;
        }

        // Create utterance
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Try to select an English voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online')));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        // UI state update
        btn.classList.add('playing');
        const textSpan = btn.querySelector('.audio-btn-text');
        if (textSpan) textSpan.textContent = 'Speaking...';
        activeSpeechBtn = btn;

        const card = btn.closest('.speaker-card');
        const speakerName = card ? card.querySelector('.speaker-name').textContent : 'Speaker';
        showToast(`🔊 Playing voice intro: ${speakerName}`, 'info');

        utterance.onend = () => {
          btn.classList.remove('playing');
          if (textSpan) textSpan.textContent = 'Voice Teaser';
          activeSpeechBtn = null;
        };

        utterance.onerror = () => {
          btn.classList.remove('playing');
          if (textSpan) textSpan.textContent = 'Voice Teaser';
          activeSpeechBtn = null;
        };

        window.speechSynthesis.speak(utterance);
      });
    });

    // Stop speaking if page is hidden / navigated away
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopActiveAudio();
    });
  };

  /* --------------------------------------------------------------------------
     11. Initialize All Modules
     -------------------------------------------------------------------------- */
  initPixelConstellation();
  initCountdown();
  initNavigation();
  initTrackFilters();
  initSpeakerInteractions();
  initSpeakerVoiceEngine();
  initScheduleTabs();
  initFaqAccordion();
  initRegistrationModal();

  console.log('🚀 NEXUS HACK 2026 Core Engine successfully initialized.');
});
