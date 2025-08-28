// 500 Error Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const animateElements = () => {
        const elements = document.querySelectorAll('.error-500-title, .error-500-subtitle, .error-500-description, .error-500-actions');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };

    // Анимация метеорита
    const animateVisualElements = () => {
        const meteorite = document.querySelector('.error-500-meteorite');
        
        if (meteorite) {
            meteorite.style.opacity = '0';
            meteorite.style.transform = 'translateX(50px) scale(0.8) rotate(45deg)';
            
            setTimeout(() => {
                meteorite.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                meteorite.style.opacity = '1';
                meteorite.style.transform = 'translateX(0) scale(1) rotate(0deg)';
            }, 1000);
        }
    };

    // Анимация частиц взрыва
    const animateParticles = () => {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach((particle, index) => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
            
            setTimeout(() => {
                particle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                particle.style.opacity = '1';
                particle.style.transform = 'scale(1)';
            }, 1500 + (index * 100));
        });
    };

    // Анимация колец взрыва
    const animateExplosionRings = () => {
        const rings = document.querySelectorAll('.explosion-ring');
        
        rings.forEach((ring, index) => {
            ring.style.opacity = '0';
            ring.style.transform = 'scale(0)';
            
            setTimeout(() => {
                ring.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                ring.style.opacity = '1';
                ring.style.transform = 'scale(1)';
            }, 2000 + (index * 200));
        });
    };

    // Интерактивность для кнопок
    const addButtonInteractions = () => {
        const buttons = document.querySelectorAll('.error-500-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Параллакс эффект для частиц при скролле
    const addParallaxEffect = () => {
        const particles = document.querySelectorAll('.particle');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.05;
                particle.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    };

    // Анимация карточек информации
    const animateInfoCards = () => {
        const cards = document.querySelectorAll('.error-500-info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    };

    // Случайное мерцание частиц
    const randomParticleTwinkle = () => {
        const particles = document.querySelectorAll('.particle');
        
        setInterval(() => {
            const randomParticle = particles[Math.floor(Math.random() * particles.length)];
            if (randomParticle) {
                randomParticle.style.animation = 'none';
                setTimeout(() => {
                    randomParticle.style.animation = 'particleExplosion 3s ease-out infinite';
                }, 10);
            }
        }, 4000);
    };

    // Эффект печатания для заголовка 500
    const typewriterEffect = () => {
        const title = document.querySelector('.error-500-title');
        if (!title) return;
        
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #ff4444';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            title.textContent += text[i];
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 150);
    };

    // Эффект дрожания экрана при "взрыве"
    const screenShakeEffect = () => {
        const body = document.body;
        
        setTimeout(() => {
            body.style.animation = 'screenShake 0.5s ease-in-out';
            setTimeout(() => {
                body.style.animation = '';
            }, 500);
        }, 3000);
    };

    // Добавляем CSS для эффекта дрожания экрана
    const addScreenShakeStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes screenShake {
                0%, 100% { transform: translateX(0); }
                10% { transform: translateX(-2px); }
                20% { transform: translateX(2px); }
                30% { transform: translateX(-2px); }
                40% { transform: translateX(2px); }
                50% { transform: translateX(-1px); }
                60% { transform: translateX(1px); }
                70% { transform: translateX(-1px); }
                80% { transform: translateX(1px); }
                90% { transform: translateX(-1px); }
            }
        `;
        document.head.appendChild(style);
    };

    // Инициализация всех анимаций
    const initAnimations = () => {
        // Запускаем эффект печатания
        setTimeout(typewriterEffect, 500);
        
        // Запускаем остальные анимации
        setTimeout(animateElements, 1000);
        setTimeout(animateVisualElements, 1500);
        setTimeout(animateParticles, 2000);
        setTimeout(animateExplosionRings, 2500);
        
        // Добавляем интерактивность
        addButtonInteractions();
        addParallaxEffect();
        animateInfoCards();
        randomParticleTwinkle();
        
        // Эффект дрожания экрана
        addScreenShakeStyles();
        screenShakeEffect();
    };

    // Запуск анимаций после загрузки страницы
    initAnimations();

    // Дополнительные эффекты при наведении на метеорит
    const meteorite = document.querySelector('.error-500-meteorite');
    if (meteorite) {
        meteorite.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(10deg)';
            this.style.filter = 'brightness(1.3) drop-shadow(0 0 30px rgba(255, 68, 68, 0.8))';
        });
        
        meteorite.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1) drop-shadow(0 0 20px rgba(255, 68, 68, 0.6))';
        });
    }

    // Добавляем звуковые эффекты (опционально)
    const addSoundEffects = () => {
        const buttons = document.querySelectorAll('.error-500-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Создаём визуальный эффект клика
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    };

    // Добавляем CSS для эффекта ripple
    const addRippleStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .error-500-button {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 68, 68, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Эффект мигания заголовка при ошибке
    const errorBlinkEffect = () => {
        const title = document.querySelector('.error-500-title');
        if (!title) return;
        
        setInterval(() => {
            title.style.opacity = '0.3';
            setTimeout(() => {
                title.style.opacity = '1';
            }, 100);
        }, 3000);
    };

    // Анимация частиц при клике на метеорит
    const addMeteoriteClickEffect = () => {
        const meteorite = document.querySelector('.error-500-meteorite');
        if (!meteorite) return;
        
        meteorite.addEventListener('click', function() {
            // Создаём дополнительные частицы
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.position = 'absolute';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = '#ff4444';
                particle.style.borderRadius = '50%';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.animation = 'particleExplosion 2s ease-out forwards';
                
                const angle = (i * 72) * Math.PI / 180;
                const distance = 50 + Math.random() * 30;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                
                this.parentElement.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            }
        });
    };

    // Инициализируем дополнительные эффекты
    addRippleStyles();
    addSoundEffects();
    errorBlinkEffect();
    addMeteoriteClickEffect();


});

