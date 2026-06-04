// ===== Mobile Menu Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Smooth Scroll to Sections =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Particle Background Animation =====
function createParticles() {
    let particleBackground = document.getElementById('particleBackground');
    
    // Create particle background if it doesn't exist
    if (!particleBackground) {
        particleBackground = document.createElement('div');
        particleBackground.id = 'particleBackground';
        particleBackground.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        document.body.insertBefore(particleBackground, document.body.firstChild);
    }

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const duration = Math.random() * 5 + 5;
        const delay = Math.random() * 2;
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.5;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: rgba(224, 185, 115, ${opacity});
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${delay}s;
            z-index: -1;
            box-shadow: 0 0 ${size * 2}px rgba(224, 185, 115, ${opacity * 0.5});
        `;
        particleBackground.appendChild(particle);
    }
}

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.maison-card, .personnage-card, .fact-card');
animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    observer.observe(element);
});

// ===== Add Animation Keyframes =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--x), var(--y)) scale(0);
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pageLoad {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===== Debounce Function =====
function debounce(func, wait) {
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

// ===== Handle Window Resize =====
const handleResize = debounce(function() {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// ===== Page Load Animation =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    createParticles();
});

// ===== Magic Spell Effect on Hover =====
const buttons = document.querySelectorAll('.btn, .menu-button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        createMagicSparkles(this);
    });
    
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Subtle glow effect
        this.style.boxShadow = `0 0 20px rgba(224, 185, 115, 0.6), inset -2px -2px 5px rgba(0,0,0,0.1)`;
    });
    
    button.addEventListener('mouseleave', function() {
        if (this.id === 'actif') {
            this.style.boxShadow = '0 0 15px rgba(224, 185, 115, 0.7)';
        } else {
            this.style.boxShadow = 'none';
        }
    });
});

// ===== Create Magic Sparkles on Hover =====
function createMagicSparkles(element) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('span');
            const angle = (Math.PI * 2 * i) / 3;
            const distance = 20;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.cssText = `
                position: absolute;
                left: 50%;
                top: 50%;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #e0b973, #d4af37);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 10px #e0b973;
                animation: sparkleFloat 0.6s ease-out forwards;
    addScrollAnimations();
});

// ===== Add Scroll Animations =====
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe section for animation
    const presentation = document.querySelector('.presentation');
    if (presentation) {
        presentation.style.opacity = '0';
        presentation.style.transform = 'translateY(30px)';
        observer.observe(presentation);
    }
}             --x: ${x}px;
                --y: ${y}px;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 600);
        }, i * 50);
    }
}

// ===== Scroll Performance Optimization =====
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Perform scroll-based updates here
            ticking = false;
        });
        ticking = true;
    }
});

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🪄 Bienvenue dans le monde magique de Poudlard!');
    createParticles();
});
