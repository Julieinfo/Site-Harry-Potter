// ===== Animations des Horcruxes =====
function animateHorcruxes() {
    const horcruxes = document.querySelectorAll(".horcrux");
    
    horcruxes.forEach((horcrux, index) => {
        horcrux.style.opacity = '0';
        horcrux.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            horcrux.style.animation = `slideInUp 0.6s ease forwards`;
            const delayMultiplier = Math.floor(index / 2);
            horcrux.style.animationDelay = `${delayMultiplier * 0.2}s`;
        }, 50);
    });
}

// ===== Effets de Survol sur les Horcruxes =====
function enhanceHorcruxHoverEffects() {
    const horcruxCards = document.querySelectorAll(".horcrux");
    
    horcruxCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            // Créer des sparkles magiques au survol
            createHorcruxSparkles(this, index);
            
            // Ajouter un glow avec box-shadow
            this.style.boxShadow = '0 12px 25px rgba(139, 0, 0, 0.3), inset 0 0 10px rgba(224, 185, 115, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remettre le box-shadow original
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });
        
        // Effet au clic pour plus d'interactivité
        card.addEventListener('click', function() {
            const title = this.querySelector('h3');
            if (title) {
                console.log(`🔮 Vous avez cliqué sur: ${title.textContent}`);
                createHorcruxExplosionSparkles(this);
            }
        });
    });
}

// ===== Créer des Sparkles Magiques =====
function createHorcruxSparkles(element, index) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 35 + Math.random() * 15;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #e0b973, #d4af37);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 8px #e0b973;
                animation: sparkleHorcrux 0.7s ease-out forwards;
                --x: ${x}px;
                --y: ${y}px;
                z-index: 100;
                top: 50%;
                left: 50%;
            `;
            
            element.style.position = 'relative';
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 700);
        }, i * 30);
    }
}

// ===== Explosion de Sparkles à la Sélection =====
function createHorcruxExplosionSparkles(element) {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 10;
            const distance = 60;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.cssText = `
                position: fixed;
                width: 7px;
                height: 7px;
                background: radial-gradient(circle, #e0b973, #d4af37);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 10px #e0b973;
                animation: sparkleHorcrux 1s ease-out forwards;
                --x: ${x}px;
                --y: ${y}px;
                z-index: 1000;
                top: 50%;
                left: 50%;
            `;
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }, i * 40);
    }
}

// ===== Intersection Observer pour Animations au Scroll =====
function observeHorcruxSections() {
    const observerOptions = {
        threshold: 0.2,
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
    }, observerOptions);

    const section = document.querySelector('.horcruxes-list');
    if (section) {
        observer.observe(section);
    }
}

// ===== Ajouter les Keyframes d'Animation =====
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
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
        
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        
        @keyframes sparkleHorcrux {
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

// ===== Initialisation =====
window.addEventListener("load", function() {
    console.log('🔮 Les Horcruxes chargés avec magie noire!');
    animateHorcruxes();
    enhanceHorcruxHoverEffects();
    addAnimationKeyframes();
    
    setTimeout(() => {
        observeHorcruxSections();
    }, 100);
});

// ===== Navigation au Clavier =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const horcruxCards = document.querySelectorAll('.horcrux');
        if (horcruxCards.length > 0) {
            horcruxCards[0].focus();
        }
    }
});
