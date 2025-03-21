document.addEventListener('DOMContentLoaded', function() {
    // Prepare reveal text elements
    const revealTextElements = document.querySelectorAll('.reveal-text');
    
    revealTextElements.forEach(element => {
      let content = element.innerHTML;
      element.innerHTML = `<span>${content}</span>`;
    });
  
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Special animation for stat numbers
          if (entry.target.classList.contains('stat')) {
            const numberElement = entry.target.querySelector('.stat__number');
            if (numberElement) {
              animateNumber(numberElement);
            }
          }
          
          observer.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.05, // Trigger when 15% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust the trigger point
    });
  
    // Number animation function
    function animateNumber(element) {
      const finalNumber = parseInt(element.textContent.replace(/\D/g, ''));
      const duration = 2000; // ms
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentNumber = Math.round(finalNumber * progress);
        
        if (frame === totalFrames) {
          clearInterval(counter);
          element.textContent = element.textContent; // Reset to original text (which may include + sign)
        } else {
          element.textContent = currentNumber + (element.textContent.includes('+') ? '+' : '');
        }
      }, frameDuration);
    }
  
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.reveal-text, .reveal-element, .stat');
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  
    // Parallax effect for background images
    const parallaxElements = document.querySelectorAll('.hero, .team');
    
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      
      parallaxElements.forEach(element => {
        const backgroundPosition = `center ${scrollY * 0.05}px`;
        element.style.backgroundPosition = backgroundPosition;
      });
    });
  
    // Floating animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
      const delay = index * 0.1;
      card.style.animation = `float 6s ease-in-out ${delay}s infinite`;
    });
  
    // Add floating animation keyframes
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
        100% {
          transform: translateY(0);
        }
      }
      
      .no-scroll {
        overflow: hidden;
      }
      
      .mobile-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--color-background);
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity var(--transition-fast), transform var(--transition-fast);
      }
      
      .mobile-nav.active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .mobile-nav .nav__list {
        flex-direction: column;
        gap: 2.4rem;
        text-align: center;
      }
      
      .mobile-nav .nav__link {
        font-size: 2.4rem;
      }
      
      .menu-toggle.active .menu-toggle__line:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      
      .menu-toggle.active .menu-toggle__line:nth-child(2) {
        transform: rotate(-45deg);
      }
      
      /* Enhanced reveal animations */
      .reveal-text span {
        display: block;
        transform: translateY(100%);
        opacity: 0;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                    opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      .reveal-text.revealed span {
        transform: translateY(0);
        opacity: 1;
      }
      
      .reveal-element {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      
      .reveal-element.revealed {
        opacity: 1;
        transform: translateY(0);
      }
      
      /* Add staggered delay to team members */
      .team-member:nth-child(2) {
        transition-delay: 0.1s;
      }
      
      .team-member:nth-child(3) {
        transition-delay: 0.2s;
      }
      
      .team-member:nth-child(4) {
        transition-delay: 0.3s;
      }
      
      /* Add a subtle pulse animation to the hero CTA buttons */
      .hero__cta .btn--primary {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(182, 30, 35, 0.4);
        }
        70% {
          box-shadow: 0 0 0 10px rgba(182, 30, 35, 0);
        }
        100% {
          box-shadow: 0 0 0 0 rgba(182, 30, 35, 0);
        }
      }
    `;
    
    document.head.appendChild(style);
  
    // Initial reveal for elements in the viewport on load
    setTimeout(() => {
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
          element.classList.add('revealed');
          
          // Animate numbers for stats in viewport
          if (element.classList.contains('stat')) {
            const numberElement = element.querySelector('.stat__number');
            if (numberElement) {
              animateNumber(numberElement);
            }
          }
          
          observer.unobserve(element);
        }
      });
    }, 100);
    
    // 3D tilt effect for team cards
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
      member.addEventListener('mousemove', handleTilt);
      member.addEventListener('mouseleave', resetTilt);
    });
    
    function handleTilt(e) {
      const card = this;
      const cardRect = card.getBoundingClientRect();
      const cardWidth = cardRect.width;
      const cardHeight = cardRect.height;
      const centerX = cardRect.left + cardWidth / 2;
      const centerY = cardRect.top + cardHeight / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = (mouseY / (cardHeight / 2)) * -5; // Max 5deg
      const rotateY = (mouseX / (cardWidth / 2)) * 5; // Max 5deg
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }
    
    function resetTilt() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    }
  });