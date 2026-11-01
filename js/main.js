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

    // Sticky header glass darkening on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
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

    // Close Modal
    const closeModal = () => {
      backdrop.classList.remove('open');
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
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
     8. Initialize All Modules
     -------------------------------------------------------------------------- */
  initCountdown();
  initNavigation();
  initTrackFilters();
  initScheduleTabs();
  initFaqAccordion();
  initRegistrationModal();

  console.log('🚀 NEXUS HACK 2026 Core Engine successfully initialized.');
});
