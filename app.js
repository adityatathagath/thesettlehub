// DOM elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initScrollEffects();
  initAnimations();
  initCounters();
  initNavigation();
  initSmoothScroll();
});

// Sticky header on scroll
function initScrollEffects() {
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for header styling
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Animation on scroll
function initAnimations() {
  const animationElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
  
  const animationObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        // Stop observing this element once animated
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animationElements.forEach(element => {
    animationObserver.observe(element);
  });
}

// Counter animations for traction metrics
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = function() {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Navigation functionality
function initNavigation() {
  // Mobile navigation toggle
  navToggle.addEventListener('click', function() {
    navMenu.classList.toggle('show');
    navToggle.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('show');
      navToggle.classList.remove('active');
      
      // Reset hamburger menu
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
  
  // Highlight active nav link based on scroll position
  window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const correspondingNavLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
    
    if (correspondingNavLink) {
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        correspondingNavLink.classList.add('active');
      }
    }
  });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') return;
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Phone mockup interaction
document.addEventListener('DOMContentLoaded', function() {
  const phones = document.querySelectorAll('.phone');
  
  phones.forEach((phone, index) => {
    phone.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    phone.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

// Add staggered animation delay for grid items
document.addEventListener('DOMContentLoaded', function() {
  const grids = [
    '.problem__grid .problem__card',
    '.solution__grid .solution__card',
    '.investment__metrics .metric-card',
    '.traction__grid .traction__card',
    '.team__grid .team__card'
  ];
  
  grids.forEach(gridSelector => {
    const items = document.querySelectorAll(gridSelector);
    items.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`;
    });
  });
});

// Parallax effect for hero section
document.addEventListener('DOMContentLoaded', function() {
  const heroPattern = document.querySelector('.hero__pattern');
  
  if (heroPattern) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      heroPattern.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
  }
});

// Form handling (if forms are added later)
function handleFormSubmission(formElement) {
  formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state
    const submitButton = formElement.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(function() {
      submitButton.textContent = 'Message Sent!';
      setTimeout(function() {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        formElement.reset();
      }, 2000);
    }, 1000);
  });
}

// Initialize any forms that might be added
document.addEventListener('DOMContentLoaded', function() {
  const forms = document.querySelectorAll('form');
  forms.forEach(handleFormSubmission);
});

// Add loading states for CTA buttons
document.addEventListener('DOMContentLoaded', function() {
  const ctaButtons = document.querySelectorAll('.cta .btn');
  
  ctaButtons.forEach(button => {
    // Skip if it's a mailto or tel link
    if (button.href && (button.href.includes('mailto:') || button.href.includes('tel:'))) {
      return;
    }
    
    button.addEventListener('click', function(e) {
      // Add click effect
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
});

// Optimize scroll performance
let ticking = false;

function updateScrollEffects() {
  updateActiveNavLink();
  
  // Update header scroll state
  const currentScroll = window.pageYOffset;
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  ticking = false;
}

function requestScrollUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
}

// Replace the existing scroll listener with the optimized version
window.addEventListener('scroll', requestScrollUpdate);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
  // ESC key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    navToggle.classList.remove('active');
    
    // Reset hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
  const focusableElements = document.querySelectorAll(
    'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
  );
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '2px solid var(--color-primary)';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
});

// Add error handling for images that might not load
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      // If an image fails to load, hide it gracefully
      this.style.display = 'none';
    });
  });
});

// Performance monitoring (basic)
window.addEventListener('load', function() {
  // Log page load performance
  const loadTime = performance.now();
  console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
  
  // Prefetch important resources
  const importantLinks = document.querySelectorAll('a[href^="#"]');
  importantLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const href = this.getAttribute('href');
      if (href !== '#') {
        // Pre-calculate scroll position for smoother scrolling
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          // Store calculated position for faster access
          this.dataset.scrollPosition = targetPosition;
        }
      }
    });
  });
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', function() {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
    navToggle.classList.remove('active');
    
    // Reset hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Add touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
  touchEndY = e.changedTouches[0].screenY;
  // You can add swipe gestures here if needed
});

// Initialize everything when the page is fully loaded
window.addEventListener('load', function() {
  // Remove any loading states
  document.body.classList.add('loaded');
  
  // Trigger any animations that should happen on page load
  const heroContent = document.querySelector('.hero__content');
  if (heroContent) {
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }
});