let currentSlide = 0;

// ===== Slide Management =====
function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    if (n >= slides.length) {
        currentSlide = 0;
    }
    if (n < 0) {
        currentSlide = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.style.display = "none";
        slide.classList.remove('active');
    });
    if (slides[currentSlide]) {
        slides[currentSlide].style.display = "block";
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.animation = 'slideIn 0.5s ease-in-out';
    }
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
    createCarouselSparkles();
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
    createCarouselSparkles();
}

// ===== Fullscreen Mode =====
function openFullscreen() {
    const fullscreen = document.querySelector("#fullscreen-overlay");
    const image = document.querySelector(".slide.active img");
    
    if (fullscreen && image) {
        const fullscreenImage = document.getElementById('fullscreen-image');
        if (fullscreenImage) {
            fullscreenImage.src = image.src;
        }
        fullscreen.style.display = "flex";
        fullscreen.style.animation = 'fadeIn 0.4s ease';
        document.body.style.overflow = 'hidden';
    }
}

function closeFullscreen() {
    const fullscreen = document.querySelector("#fullscreen-overlay");
    if (fullscreen) {
        fullscreen.style.display = "none";
        document.body.style.overflow = 'auto';
    }
}

// ===== Carousel Sparkle Effects =====
function createCarouselSparkles() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;
    
    const activeSlide = slides[currentSlide];
    if (!activeSlide) return;
    
    // Create 5 sparkles around the carousel
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            const angle = (Math.PI * 2 * i) / 5;
            const distance = 40 + Math.random() * 20;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.cssText = `
                position: fixed;
                left: 50%;
                top: 50%;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #e0b973, #d4af37);
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 8px #e0b973;
                animation: sparkleCarousel 0.8s ease-out forwards;
                --x: ${x}px;
                --y: ${y}px;
                z-index: 100;
            `;
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }, i * 40);
    }
}

// ===== Navigation Button Effects =====
function enhanceNavigationButtons() {
    const prevBtn = document.querySelector('.carousel .prev');
    const nextBtn = document.querySelector('.carousel .next');
    
    if (prevBtn) {
        prevBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'buttonGlow 0.3s ease forwards';
        });
        prevBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('mouseenter', function() {
            this.style.animation = 'buttonGlow 0.3s ease forwards';
        });
        nextBtn.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    }
}

// ===== Image Click to Fullscreen =====
function enableImageClickFullscreen() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
                openFullscreen();
            });
        }
    });
}

// ===== Keyboard Navigation =====
function enableKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const fullscreen = document.querySelector("#fullscreen-overlay");
        
        if (fullscreen && fullscreen.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeFullscreen();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                openFullscreen();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                openFullscreen();
            }
        } else {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });
}

// ===== Add Animation Keyframes =====
function addAnimationKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
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
        
        @keyframes zoomIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes sparkleCarousel {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--x), var(--y)) scale(0);
            }
        }
        
        @keyframes buttonGlow {
            from {
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            to {
                box-shadow: 0 8px 20px rgba(224, 185, 115, 0.6), inset 0 0 10px rgba(224, 185, 115, 0.2);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== Initialization =====
window.addEventListener("DOMContentLoaded", function() {
    console.log('📸 Collection magique chargée!');
    showSlide(currentSlide);
    enhanceNavigationButtons();
    enableImageClickFullscreen();
    enableKeyboardNavigation();
    addAnimationKeyframes();
    
    // Close fullscreen on overlay click
    const fullscreenOverlay = document.querySelector("#fullscreen-overlay");
    if (fullscreenOverlay) {
        fullscreenOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeFullscreen();
            }
        });
    }
});

// ===== Smooth Page Transitions =====
window.addEventListener('load', function() {
    const section = document.querySelector('section');
    if (section) {
        section.style.opacity = '1';
        section.style.animation = 'fadeInUp 0.8s ease forwards';
    }
});
