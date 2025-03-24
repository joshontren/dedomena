// Add interactive hover effects to showcase expertise
const expertiseItems = document.querySelectorAll('.expertise-item, .credential');
  
if (expertiseItems.length > 0) {
  expertiseItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-3px) scale(1.05)';
      item.style.boxShadow = '0 5px 15px rgba(182, 30, 35, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
      item.style.boxShadow = '';
    });
  });
}

// Enhance hero section on scroll
const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero__title');

if (hero && heroTitle) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;
    const scrollPercentage = Math.min(scrollY / (heroHeight / 2), 1);
    
    heroTitle.style.transform = `scale(${1 - (scrollPercentage * 0.1)})`;
    heroTitle.style.opacity = 1 - (scrollPercentage * 0.5);
  });
}

// Add dynamic color change to highlight class on scroll
const highlights = document.querySelectorAll('.highlight');

if (highlights.length > 0) {
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    highlights.forEach(highlight => {
      const hue = (scrollY / 10) % 30; // This will cycle through a portion of red hues
      highlight.style.color = `hsl(${350 + hue}, 75%, 40%)`;
    });
  });
}

// Add page loading progress bar
window.addEventListener('load', () => {
  const pageLoaded = () => {
    const loadingBar = document.createElement('div');
    loadingBar.classList.add('page-load-bar');
    loadingBar.style.position = 'fixed';
    loadingBar.style.top = '0';
    loadingBar.style.left = '0';
    loadingBar.style.height = '3px';
    loadingBar.style.width = '0';
    loadingBar.style.background = 'linear-gradient(to right, var(--color-primary), #f06a6a)';
    loadingBar.style.zIndex = '9999';
    loadingBar.style.transition = 'width 0.3s ease';
    
    document.body.appendChild(loadingBar);
    
    setTimeout(() => {
      loadingBar.style.width = '100%';
      
      setTimeout(() => {
        loadingBar.style.opacity = '0';
        
        setTimeout(() => {
          loadingBar.remove();
        }, 300);
      }, 500);
    }, 100);
  };
  
  pageLoaded();
});

// Chat Widget
const chatButton = document.querySelector('.chat-widget__button');
const chatPanel = document.querySelector('.chat-widget__panel');
const chatClose = document.querySelector('.chat-widget__close');
const chatWidget = document.querySelector('.chat-widget');
const chatInput = document.querySelector('.chat-widget__input input');
const chatSendButton = document.querySelector('.chat-widget__input button');
const chatMessages = document.querySelector('.chat-widget__messages');

if (chatButton && chatPanel) {
  chatButton.addEventListener('click', () => {
    chatWidget.classList.add('active');
    
    // Auto-focus on input when chat opens
    setTimeout(() => {
      chatInput.focus();
    }, 300);
  });
  
  chatClose.addEventListener('click', () => {
    chatWidget.classList.remove('active');
  });
  
  // Send message function
  function sendMessage(text) {
    if (!text.trim()) return;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message', 'chat-message--sent');
    
    const currentTime = new Date();
    const timeString = currentTime.getHours() + ':' + 
                      (currentTime.getMinutes() < 10 ? '0' : '') + 
                      currentTime.getMinutes();
    
    messageElement.innerHTML = `
      <div class="chat-message__content">
        <p>${text}</p>
      </div>
      <div class="chat-message__time">${timeString}</div>
    `;
    
    // Add message to chat
    chatMessages.appendChild(messageElement);
    
    // Clear input
    chatInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate response after 1 second
    setTimeout(() => {
      const responseElement = document.createElement('div');
      responseElement.classList.add('chat-message', 'chat-message--received');
      
      const responseTime = new Date();
      const responseTimeString = responseTime.getHours() + ':' + 
                                (responseTime.getMinutes() < 10 ? '0' : '') + 
                                responseTime.getMinutes();
      
      // Different responses based on message content
      let responseText = '';
      const lowercaseText = text.toLowerCase();
      
      if (lowercaseText.includes('hello') || lowercaseText.includes('hi')) {
        responseText = 'Hello! How can we help with your mine surveying needs today?';
      } else if (lowercaseText.includes('price') || lowercaseText.includes('cost') || lowercaseText.includes('quote')) {
        responseText = 'Our pricing is customized based on your specific project requirements. Would you like us to contact you for a detailed quote?';
      } else if (lowercaseText.includes('drone') || lowercaseText.includes('equipment')) {
        responseText = 'We use the latest drone technology and surveying equipment to ensure the highest accuracy for all our mining projects.';
      } else if (lowercaseText.includes('contact') || lowercaseText.includes('email') || lowercaseText.includes('phone')) {
        responseText = 'You can reach us at info@dedomena.co.za or call us at +27 12 345 6789. Would you like us to contact you directly?';
      } else {
        responseText = 'Thank you for your message. One of our experts will get back to you soon. Can we help with anything else?';
      }
      
      responseElement.innerHTML = `
        <div class="chat-message__content">
          <p>${responseText}</p>
        </div>
        <div class="chat-message__time">${responseTimeString}</div>
      `;
      
      // Add response to chat
      chatMessages.appendChild(responseElement);
      
      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
  
  // Send message on button click
  chatSendButton.addEventListener('click', () => {
    sendMessage(chatInput.value);
  });
  
  // Send message on Enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage(chatInput.value);
    }
  });
}

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Preloader
window.addEventListener('load', function() {
  const preloader = document.querySelector('.preloader');

  setTimeout(() => {
    preloader.classList.add('hidden');
    
    // Trigger animations for initial viewport elements
    setTimeout(() => {
      const initialAnimElements = document.querySelectorAll('.hero .reveal-text, .hero .reveal-element');
      initialAnimElements.forEach(element => {
        element.classList.add('revealed');
      });
    }, 500);
  }, 2500); // Show preloader for 2.5 seconds minimum
});

document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.header');
  const headerScrollThreshold = 50;

  function handleHeaderScroll() {
    if (window.scrollY > headerScrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  handleHeaderScroll(); // Initial check

  // Custom cursor
  const cursor = document.querySelector('.cursor');
  const links = document.querySelectorAll('a, button, input, select, textarea');

  // Only enable custom cursor on desktop
  if (window.innerWidth > 1024) {
    cursor.style.display = 'block';
    
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        cursor.style.width = '48px';
        cursor.style.height = '48px';
        cursor.style.backgroundColor = 'rgba(182, 30, 35, 0.3)';
      });
      
      link.addEventListener('mouseleave', () => {
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.backgroundColor = 'rgba(182, 30, 35, 0.2)';
      });
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      
      if (menuToggle.classList.contains('active')) {
        // Create mobile menu
        const mobileNav = document.createElement('div');
        mobileNav.classList.add('mobile-nav');
        
        const mobileNavList = nav.querySelector('.nav__list').cloneNode(true);
        mobileNav.appendChild(mobileNavList);
        
        document.body.appendChild(mobileNav);
        document.body.classList.add('no-scroll');
        
        // Animation
        setTimeout(() => {
          mobileNav.classList.add('active');
        }, 10);
        
        // Close mobile menu when clicking a link
        const mobileNavLinks = mobileNav.querySelectorAll('.nav__link');
        mobileNavLinks.forEach(link => {
          link.addEventListener('click', closeMobileMenu);
        });
      } else {
        closeMobileMenu();
      }
    });
  }

  function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileNav) {
      mobileNav.classList.remove('active');
      
      // Remove after animation
      setTimeout(() => {
        mobileNav.remove();
        document.body.classList.remove('no-scroll');
      }, 300);
    }
    
    if (menuToggle) {
      menuToggle.classList.remove('active');
    }
  }

  // Parallax effects for sections
  const parallaxElements = document.querySelectorAll('.hero, .about, .team, .projects');

  window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
      const scrollPosition = window.pageYOffset;
      const elementOffset = element.offsetTop;
      const distance = scrollPosition - elementOffset;
      const windowHeight = window.innerHeight;
      
      if (Math.abs(distance) < windowHeight) {
        const parallaxSpeed = 0.2;
        const parallax = distance * parallaxSpeed;
        
        if (element.querySelector('.section-header')) {
          element.querySelector('.section-header').style.transform = `translateY(${parallax}px)`;
        }
      }
    });
  });

  // REMOVED: Dynamic stats counter animation in main.js
  // We'll let the animations.js handle this instead

  // Form input animations
  const formInputs = document.querySelectorAll('.form__input');

  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.parentElement.classList.remove('focused');
      }
    });
  });

  // Form validation and submit animation
  const form = document.querySelector('.form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.form__submit');
      
      // Validate form
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
      });
      
      if (isValid) {
        // Show success animation
        submitBtn.textContent = 'Message Sent!';
        submitBtn.classList.add('success');
        
        // Reset form after animation
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = 'Send Message';
          submitBtn.classList.remove('success');
          
          formInputs.forEach(input => {
            input.parentElement.classList.remove('focused');
          });
        }, 3000);
      }
    });
  }

  // Service card hover effects
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      serviceCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.opacity = '0.6';
          otherCard.style.transform = 'scale(0.95)';
        }
      });
    });
    
    card.addEventListener('mouseleave', () => {
      serviceCards.forEach(otherCard => {
        otherCard.style.opacity = '1';
        otherCard.style.transform = '';
      });
    });
  });

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });

  // Tech cards 3D effect
  const techCards = document.querySelectorAll('.tech-card');

  techCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;
      
      card.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // Project card hover effect
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    const image = card.querySelector('.placeholder-image');
    
    card.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      image.style.transform = '';
    });
  });
});