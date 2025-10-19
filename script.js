// Telegram WebApp Integration and Interactive Features
class TelegramWebApp {
  constructor() {
    this.tg = window.Telegram?.WebApp;
    this.isTelegram = !!this.tg;
    this.user = null;
    this.init();
  }

  init() {
    // Initialize Telegram WebApp
    if (this.isTelegram) {
      this.tg.ready();
      this.tg.expand();
      this.user = this.tg.initDataUnsafe?.user;
      this.applyTelegramTheme();
      this.setupTelegramEvents();
    }

    // Initialize app features
    this.setupEventListeners();
    this.setupAnimations();
    this.setupProjectCards();
    this.setupContactButtons();
    this.setupLoadingStates();
    this.setupToastNotifications();
    
    // Show loading overlay briefly
    this.showLoading();
    
    // Initialize app after loading
    setTimeout(() => {
      this.hideLoading();
      this.animateOnLoad();
    }, 1000);
  }

  // Apply Telegram theme colors
  applyTelegramTheme() {
    if (!this.isTelegram) return;

    const root = document.documentElement;
    const themeParams = this.tg.themeParams;

    if (themeParams.bg_color) {
      root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
    }
    if (themeParams.text_color) {
      root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
    }
    if (themeParams.hint_color) {
      root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
    }
    if (themeParams.link_color) {
      root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
    }
    if (themeParams.button_color) {
      root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
    }
    if (themeParams.button_text_color) {
      root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
    }
    if (themeParams.secondary_bg_color) {
      root.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color);
    }
  }

  // Setup Telegram-specific events
  setupTelegramEvents() {
    if (!this.isTelegram) return;

    // Handle viewport changes
    this.tg.onEvent('viewportChanged', () => {
      this.tg.expand();
    });

    // Handle theme changes
    this.tg.onEvent('themeChanged', () => {
      this.applyTelegramTheme();
    });

    // Handle back button
    this.tg.BackButton.onClick(() => {
      this.tg.close();
    });
  }

  // Setup event listeners
  setupEventListeners() {
    // Contact button
    const contactBtn = document.getElementById('contactBtn');
    if (contactBtn) {
      contactBtn.addEventListener('click', () => this.handleContact());
    }

    // Portfolio button
    const portfolioBtn = document.getElementById('portfolioBtn');
    if (portfolioBtn) {
      portfolioBtn.addEventListener('click', () => this.handlePortfolio());
    }

    // Project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => this.handleProjectClick(e));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
  }

  // Setup animations
  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Setup project cards interactions
  setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      // Add hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });

      // Add focus for accessibility
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View ${card.querySelector('.project-title').textContent} project`);
    });
  }

  // Setup contact buttons
  setupContactButtons() {
    const buttons = document.querySelectorAll('.contact-btn');
    
    buttons.forEach(button => {
      button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(0) scale(0.98)';
      });

      button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(-2px) scale(1)';
      });

      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Setup loading states
  setupLoadingStates() {
    this.loadingOverlay = document.getElementById('loadingOverlay');
  }

  // Setup toast notifications
  setupToastNotifications() {
    this.toast = document.getElementById('toast');
  }

  // Handle contact button click
  handleContact() {
    if (this.isTelegram) {
      // Use Telegram's contact functionality
      this.tg.openTelegramLink('https://t.me/muhammadjon_tojiyev');
    } else {
      // Fallback for non-Telegram environments
      this.showToast('Telegram orqali bog\'lanish uchun @muhammadjon_tojiyev');
    }
  }

  // Handle portfolio button click
  handlePortfolio() {
    if (this.isTelegram) {
      // Open external link in Telegram
      this.tg.openLink('https://github.com/mixtjyv09-bit');
    } else {
      // Fallback for non-Telegram environments
      window.open('https://github.com/mixtjyv09-bit', '_blank');
    }
  }

  // Handle project card clicks
  handleProjectClick(event) {
    const card = event.currentTarget;
    const project = card.dataset.project;
    
    // Add click animation
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
      card.style.transform = '';
    }, 150);

    // Handle different projects
    switch (project) {
      case 'portfolio':
        this.showProjectDetails('Portfolio Web App', {
          description: 'Telegram WebApp yordamida yaratilgan zamonaviy portfolio ilovasi',
          technologies: ['HTML5', 'CSS3', 'JavaScript', 'Telegram WebApp API'],
          features: ['Responsive Design', 'Telegram Integration', 'Modern UI/UX', 'Dark Mode Support']
        });
        break;
      case 'bot':
        this.showProjectDetails('Telegram Bot', {
          description: 'Kuchli funksiyalar bilan jihozlangan Telegram bot',
          technologies: ['Python', 'Telegram Bot API', 'SQLite', 'Web Scraping'],
          features: ['User Management', 'Data Processing', 'File Handling', 'Scheduled Tasks']
        });
        break;
      case 'panel':
        this.showProjectDetails('Linux Panel', {
          description: 'Server boshqarish uchun web interfeys',
          technologies: ['React', 'Node.js', 'Linux', 'Docker'],
          features: ['Server Monitoring', 'File Management', 'Process Control', 'System Administration']
        });
        break;
    }
  }

  // Show project details
  showProjectDetails(title, details) {
    const message = `
🏗️ ${title}

📝 ${details.description}

🛠️ Texnologiyalar: ${details.technologies.join(', ')}

✨ Xususiyatlar: ${details.features.join(', ')}

Batafsil ma'lumot uchun bog'laning!
    `;

    if (this.isTelegram) {
      this.tg.showAlert(message);
    } else {
      alert(message);
    }
  }

  // Handle keyboard navigation
  handleKeyboardNavigation(event) {
    if (event.key === 'Escape') {
      if (this.isTelegram) {
        this.tg.close();
      }
    }
  }

  // Show loading overlay
  showLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('active');
    }
  }

  // Hide loading overlay
  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.remove('active');
    }
  }

  // Animate elements on load
  animateOnLoad() {
    const elements = document.querySelectorAll('.header, .about-section, .projects-section, .experience-section');
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('slide-up');
      }, index * 200);
    });
  }

  // Show toast notification
  showToast(message, type = 'success') {
    if (!this.toast) return;

    const toastContent = this.toast.querySelector('.toast-content');
    const toastMessage = this.toast.querySelector('.toast-message');
    const toastIcon = this.toast.querySelector('.toast-icon');

    // Update content
    toastMessage.textContent = message;
    
    // Update icon based on type
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    toastIcon.textContent = icons[type] || icons.success;

    // Update colors
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    };
    this.toast.style.background = colors[type] || colors.success;

    // Show toast
    this.toast.classList.add('show');

    // Auto hide after 3 seconds
    setTimeout(() => {
      this.toast.classList.remove('show');
    }, 3000);
  }

  // Utility: Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Utility: Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }

  init() {
    // Monitor page load time
    window.addEventListener('load', () => {
      this.metrics.loadTime = performance.now();
      console.log(`Page loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
    });

    // Monitor user interactions
    this.trackInteractions();
  }

  trackInteractions() {
    const elements = document.querySelectorAll('button, .project-card, .contact-btn');
    
    elements.forEach(element => {
      element.addEventListener('click', () => {
        console.log(`User clicked: ${element.tagName} - ${element.textContent.trim()}`);
      });
    });
  }
}

// Error handling
class ErrorHandler {
  constructor() {
    this.setupGlobalErrorHandling();
  }

  setupGlobalErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error);
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason);
    });
  }

  handleError(error) {
    // Log error for debugging
    console.error('Error handled:', error);
    
    // Show user-friendly message
    if (window.telegramWebApp) {
      window.telegramWebApp.showToast('Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.', 'error');
    }
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main app
  window.telegramWebApp = new TelegramWebApp();
  
  // Initialize performance monitoring
  window.performanceMonitor = new PerformanceMonitor();
  
  // Initialize error handling
  window.errorHandler = new ErrorHandler();

  // Add app ready class for styling
  document.body.classList.add('app-ready');

  console.log('🚀 Telegram WebApp initialized successfully!');
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TelegramWebApp, PerformanceMonitor, ErrorHandler };
}
