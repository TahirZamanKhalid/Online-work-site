/**
 * Thesis & Assignment Experts - Main JavaScript
 * Mega Dropdown, Contact & Order Action Popovers & Direct WhatsApp Dispatch
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActionPopovers();
  initMegaDropdown();
  initHeroInquiryWidget();
  initServiceCardButtons();
  initOrderFormSync();
  initOrderSubmission();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          const icon = toggleBtn.querySelector('i');
          if (icon) icon.className = 'fas fa-bars';
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }
}

// Action Popovers: Contact Dropdown & Order Now Dropdown
function initActionPopovers() {
  const contactWrapper = document.getElementById('contactDropdownWrapper');
  const contactBtn = document.getElementById('contactDropdownBtn');

  const orderWrapper = document.getElementById('orderDropdownWrapper');
  const orderBtn = document.getElementById('orderDropdownBtn');

  const orderViaWebsiteLink = document.getElementById('orderViaWebsiteLink');

  // Toggle Contact Popover
  if (contactBtn && contactWrapper) {
    contactBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (orderWrapper) orderWrapper.classList.remove('open');
      contactWrapper.classList.toggle('open');
    });
  }

  // Toggle Order Popover
  if (orderBtn && orderWrapper) {
    orderBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (contactWrapper) contactWrapper.classList.remove('open');
      orderWrapper.classList.toggle('open');
    });
  }

  // Order via Website form link
  if (orderViaWebsiteLink) {
    orderViaWebsiteLink.addEventListener('click', (e) => {
      if (orderWrapper) orderWrapper.classList.remove('open');
    });
  }

  // Close popovers on click outside
  document.addEventListener('click', (e) => {
    if (contactWrapper && !contactWrapper.contains(e.target)) {
      contactWrapper.classList.remove('open');
    }
    if (orderWrapper && !orderWrapper.contains(e.target)) {
      orderWrapper.classList.remove('open');
    }
  });

  // Close popovers on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (contactWrapper) contactWrapper.classList.remove('open');
      if (orderWrapper) orderWrapper.classList.remove('open');
    }
  });
}

// Mega Dropdown for Mobile
function initMegaDropdown() {
  const dropdownToggle = document.querySelector('.nav-item-dropdown .dropdown-toggle');
  const dropdownParent = document.querySelector('.nav-item-dropdown');

  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdownParent.classList.toggle('active');
      }
    });
  }
}

// Hero Quick Inquiry Widget
function initHeroInquiryWidget() {
  const calcCard = document.querySelector('.calculator-card');
  if (!calcCard) return;

  const serviceSelect = calcCard.querySelector('#calc-service');
  const levelSelect = calcCard.querySelector('#calc-level');
  const deadlineSelect = calcCard.querySelector('#calc-deadline');
  const pageDisplay = calcCard.querySelector('#calc-pages-display');
  const wordDisplay = calcCard.querySelector('#calc-words-display');
  const btnMinus = calcCard.querySelector('#calc-btn-minus');
  const btnPlus = calcCard.querySelector('#calc-btn-plus');
  const orderNowBtn = calcCard.querySelector('#calc-order-btn');
  const whatsappBtn = calcCard.querySelector('#calc-whatsapp-btn');

  let pageCount = 1;

  function updateWidget() {
    if (!serviceSelect || !levelSelect || !deadlineSelect) return;

    if (pageDisplay) pageDisplay.textContent = `${pageCount} Page${pageCount > 1 ? 's' : ''}`;
    if (wordDisplay) wordDisplay.textContent = `(${pageCount * 250} Words)`;

    if (whatsappBtn) {
      const serviceName = serviceSelect.options[serviceSelect.selectedIndex]?.text || serviceSelect.value;
      const levelName = levelSelect.options[levelSelect.selectedIndex]?.text || levelSelect.value;
      const deadlineName = deadlineSelect.options[deadlineSelect.selectedIndex]?.text || deadlineSelect.value;

      const message = `Hello! I would like to inquire about an academic assignment:%0A` +
        `• Service: ${encodeURIComponent(serviceName)}%0A` +
        `• Academic Level: ${encodeURIComponent(levelName)}%0A` +
        `• Deadline: ${encodeURIComponent(deadlineName)}%0A` +
        `• Length: ${pageCount} Pages (${pageCount * 250} Words)%0A%0A` +
        `Please assist me with placing my order.`;

      const phone = '447915609384';
      whatsappBtn.href = `https://wa.me/${phone}?text=${message}`;
    }
  }

  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', (e) => {
      e.preventDefault();
      syncHeroToOrderForm(serviceSelect.value, levelSelect.value, deadlineSelect.value, pageCount);
      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnMinus) {
    btnMinus.addEventListener('click', (e) => {
      e.preventDefault();
      if (pageCount > 1) {
        pageCount--;
        updateWidget();
      }
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener('click', (e) => {
      e.preventDefault();
      pageCount++;
      updateWidget();
    });
  }

  [serviceSelect, levelSelect, deadlineSelect].forEach(el => {
    if (el) el.addEventListener('change', updateWidget);
  });

  updateWidget();
}

// Service Card (Image 2 style) & Mega Item Selectors
function initServiceCardButtons() {
  const serviceElements = document.querySelectorAll('[data-select-service], [data-service-quick]');
  serviceElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceVal = el.getAttribute('data-select-service') || el.getAttribute('data-service-quick');
      const orderForm = document.getElementById('main-order-form');
      const serviceDropdown = document.getElementById('order-service');

      if (serviceDropdown && serviceVal) {
        serviceDropdown.value = serviceVal;
        serviceDropdown.dispatchEvent(new Event('change'));
      }

      // Close mobile menu if open
      const navMenu = document.querySelector('.nav-menu');
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const toggleBtn = document.querySelector('.mobile-nav-toggle i');
        if (toggleBtn) toggleBtn.className = 'fas fa-bars';
      }

      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
      }

      if (orderForm) {
        orderForm.style.transition = 'box-shadow 0.35s ease';
        orderForm.style.boxShadow = '0 0 0 4px rgba(229, 57, 53, 0.35)';
        setTimeout(() => {
          orderForm.style.boxShadow = '';
        }, 1200);
      }
    });
  });
}

function syncHeroToOrderForm(service, level, deadline, pages) {
  const serviceEl = document.getElementById('order-service');
  const levelEl = document.getElementById('order-level');
  const deadlineEl = document.getElementById('order-deadline');
  const pagesEl = document.getElementById('order-pages');

  if (serviceEl && service) serviceEl.value = service;
  if (levelEl && level) levelEl.value = level;
  if (deadlineEl && deadline) deadlineEl.value = deadline;
  if (pagesEl && pages) {
    pagesEl.value = pages;
    if (!pagesEl.value) {
      const opt = new Option(`${pages} Page(s)`, pages);
      pagesEl.add(opt);
      pagesEl.value = pages;
    }
  }

  updateOrderPageSummary();
}

// Live Order Form Preview Synchronization
function initOrderFormSync() {
  const orderForm = document.getElementById('main-order-form');
  if (!orderForm) return;

  const inputsToListen = ['#order-service', '#order-level', '#order-deadline', '#order-pages', '#order-format', '#order-topic'];
  inputsToListen.forEach(selector => {
    const el = orderForm.querySelector(selector);
    if (el) {
      el.addEventListener('input', updateOrderPageSummary);
      el.addEventListener('change', updateOrderPageSummary);
    }
  });

  updateOrderPageSummary();
}

function updateOrderPageSummary() {
  const orderForm = document.getElementById('main-order-form');
  if (!orderForm) return;

  const serviceEl = orderForm.querySelector('#order-service');
  const levelEl = orderForm.querySelector('#order-level');
  const deadlineEl = orderForm.querySelector('#order-deadline');
  const pagesEl = orderForm.querySelector('#order-pages');
  const formatEl = orderForm.querySelector('#order-format');
  const topicEl = orderForm.querySelector('#order-topic');

  const summaryService = document.getElementById('summary-service-text');
  const summaryLevel = document.getElementById('summary-level-text');
  const summaryDeadline = document.getElementById('summary-deadline-text');
  const summaryPages = document.getElementById('summary-pages-text');
  const summaryFormat = document.getElementById('summary-format-text');
  const summaryTopic = document.getElementById('summary-topic-text');

  if (serviceEl && summaryService) {
    summaryService.textContent = serviceEl.options[serviceEl.selectedIndex]?.text || '-';
  }
  if (levelEl && summaryLevel) {
    summaryLevel.textContent = levelEl.options[levelEl.selectedIndex]?.text || '-';
  }
  if (deadlineEl && summaryDeadline) {
    summaryDeadline.textContent = deadlineEl.options[deadlineEl.selectedIndex]?.text || '-';
  }
  if (pagesEl && summaryPages) {
    const p = parseInt(pagesEl.value, 10) || 1;
    summaryPages.textContent = `${p} Page${p > 1 ? 's' : ''} (${p * 250} Words)`;
  }
  if (formatEl && summaryFormat) {
    summaryFormat.textContent = formatEl.options[formatEl.selectedIndex]?.text || 'Standard';
  }
  if (topicEl && summaryTopic) {
    summaryTopic.textContent = topicEl.value.trim() ? topicEl.value.trim() : 'To be specified';
  }
}

// Order Form Submit Handling
function initOrderSubmission() {
  const orderForm = document.getElementById('main-order-form');
  if (!orderForm) return;

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = orderForm.querySelector('#order-name')?.value || 'Client';
    const email = orderForm.querySelector('#order-email')?.value || '';
    const phone = orderForm.querySelector('#order-phone')?.value || '';
    const service = orderForm.querySelector('#order-service')?.options[orderForm.querySelector('#order-service').selectedIndex]?.text || '';
    const level = orderForm.querySelector('#order-level')?.options[orderForm.querySelector('#order-level').selectedIndex]?.text || '';
    const deadline = orderForm.querySelector('#order-deadline')?.options[orderForm.querySelector('#order-deadline').selectedIndex]?.text || '';
    const pages = orderForm.querySelector('#order-pages')?.value || '1';
    const format = orderForm.querySelector('#order-format')?.options[orderForm.querySelector('#order-format').selectedIndex]?.text || 'APA';
    const topic = orderForm.querySelector('#order-topic')?.value || 'Assignment';
    const instructions = orderForm.querySelector('#order-instructions')?.value || 'Standard university guidelines';

    const message = `*NEW ASSIGNMENT ORDER - Thesis & Assignment Experts*%0A%0A` +
      `*Client Information:*%0A` +
      `• Name: ${encodeURIComponent(name)}%0A` +
      `• Email: ${encodeURIComponent(email)}%0A` +
      `• WhatsApp/Phone: ${encodeURIComponent(phone)}%0A%0A` +
      `*Assignment Details:*%0A` +
      `• Topic: ${encodeURIComponent(topic)}%0A` +
      `• Service: ${encodeURIComponent(service)}%0A` +
      `• Academic Level: ${encodeURIComponent(level)}%0A` +
      `• Deadline: ${encodeURIComponent(deadline)}%0A` +
      `• Length: ${encodeURIComponent(pages)} Page(s) (${parseInt(pages, 10) * 250} Words)%0A` +
      `• Citation Style: ${encodeURIComponent(format)}%0A%0A` +
      `*Instructions:*%0A` +
      `${encodeURIComponent(instructions)}`;

    const whatsappNumber = '447915609384';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    const formContainer = orderForm.parentElement;
    formContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem;">
        <div style="width: 72px; height: 72px; background: #ecfdf5; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin: 0 auto 1.5rem auto;">
          <i class="fas fa-check-circle"></i>
        </div>
        <h3 style="color: #0f172a; margin-bottom: 0.75rem; font-size: 1.5rem;">Assignment Request Submitted!</h3>
        <p style="color: #64748b; max-width: 520px; margin: 0 auto 1.75rem auto; font-size: 1rem;">
          Thank you, <strong>${name}</strong>! Your assignment specifications for <strong>"${topic}"</strong> have been received. Connect with your academic supervisor on WhatsApp to finalize your requirements.
        </p>
        <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
          <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-lg">
            <i class="fab fa-whatsapp"></i> Chat on WhatsApp Now
          </a>
          <button onclick="window.location.reload();" class="btn btn-outline btn-lg">
            Submit Another Paper
          </button>
        </div>
      </div>
    `;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 1000);
  });
}
