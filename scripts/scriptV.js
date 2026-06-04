// Animation for voyage cards
function animateVoyageCards() {
    const voyageCards = document.querySelectorAll('.voyage-card');
    voyageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideInUp 0.6s ease forwards`;
        card.style.animationDelay = (0.2 * index) + 's';
    });
}

// Enhanced hover effects for voyage cards
function enhanceCardHoverEffects() {
    const voyageCards = document.querySelectorAll('.voyage-card');
    voyageCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            createVoyageSparkles(card, index);
        });
        card.addEventListener('click', function() {
            createVoyageExplosionSparkles(card);
        });
    });
}

// Create sparkle particles on hover
function createVoyageSparkles(element, index) {
    const sparkleCount = 5;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const angle = (Math.PI * 2 / sparkleCount) * i;
        const velocity = 2 + Math.random() * 3;
        const distance = 50 + Math.random() * 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.backgroundColor = '#e0b973';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.boxShadow = '0 0 8px #e0b973, 0 0 15px rgba(224, 185, 115, 0.6)';
        sparkle.style.zIndex = '1000';
        sparkle.style.setProperty('--x', x + 'px');
        sparkle.style.setProperty('--y', y + 'px');
        sparkle.style.animation = 'sparkleVoyage 0.8s ease-out forwards';

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

// Create explosion sparkles on click
function createVoyageExplosionSparkles(element) {
    const sparkleCount = 10;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        const angle = (Math.PI * 2 / sparkleCount) * i;
        const velocity = 3 + Math.random() * 4;
        const distance = 80 + Math.random() * 80;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.width = '8px';
        sparkle.style.height = '8px';
        sparkle.style.backgroundColor = '#8b0000';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.boxShadow = '0 0 10px #8b0000, 0 0 20px rgba(139, 0, 0, 0.7)';
        sparkle.style.zIndex = '1000';
        sparkle.style.setProperty('--x', x + 'px');
        sparkle.style.setProperty('--y', y + 'px');
        sparkle.style.animation = 'sparkleVoyage 1s ease-out forwards';

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Observe sections for scroll animations
function observeVoyageSections() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    const voyageSections = document.querySelectorAll('.voyage-section');
    voyageSections.forEach(section => observer.observe(section));
}

// Add animation keyframes dynamically
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes sparkleVoyage {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--x), var(--y)) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize on page load
window.addEventListener('load', function() {
    addAnimationKeyframes();
    animateVoyageCards();
    enhanceCardHoverEffects();
    observeVoyageSections();
    console.log('✈️ Voyage magique aux Studios chargé avec succès!');
});