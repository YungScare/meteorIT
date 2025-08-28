// 404 Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов
    const animateElements = () => {
        const elements = document.querySelectorAll('.error-404-title, .error-404-subtitle, .error-404-description, .error-404-actions');
        
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

    // Анимация астронавта
    const animateVisualElements = () => {
        const astronaut = document.querySelector('.error-404-astronaut');
        
        if (astronaut) {
            astronaut.style.opacity = '0';
            astronaut.style.transform = 'translateX(-50px) scale(0.8)';
            
            setTimeout(() => {
                astronaut.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                astronaut.style.opacity = '1';
                astronaut.style.transform = 'translateX(0) scale(1)';
            }, 1000);
        }
    };

    // Анимация звёзд
    const animateStars = () => {
        const stars = document.querySelectorAll('.star');
        
        stars.forEach((star, index) => {
            star.style.opacity = '0';
            star.style.transform = 'scale(0)';
            
            setTimeout(() => {
                star.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                star.style.opacity = '1';
                star.style.transform = 'scale(1)';
            }, 1500 + (index * 100));
        });
    };

    // Интерактивность для кнопок
    const addButtonInteractions = () => {
        const buttons = document.querySelectorAll('.error-404-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Параллакс эффект для звёзд при скролле
    const addParallaxEffect = () => {
        const stars = document.querySelectorAll('.star');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            stars.forEach((star, index) => {
                const speed = (index + 1) * 0.1;
                star.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    };

    // Анимация карточек ссылок
    const animateLinkCards = () => {
        const cards = document.querySelectorAll('.error-404-link-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
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

    // Случайное мерцание звёзд
    const randomStarTwinkle = () => {
        const stars = document.querySelectorAll('.star');
        
        setInterval(() => {
            const randomStar = stars[Math.floor(Math.random() * stars.length)];
            if (randomStar) {
                randomStar.style.animation = 'none';
                setTimeout(() => {
                    randomStar.style.animation = 'twinkle 2s ease-in-out infinite';
                }, 10);
            }
        }, 3000);
    };

    // Эффект печатания для заголовка 404
    const typewriterEffect = () => {
        const title = document.querySelector('.error-404-title');
        if (!title) return;
        
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid #ffffff';
        
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

    // Инициализация всех анимаций
    const initAnimations = () => {
        // Запускаем эффект печатания
        setTimeout(typewriterEffect, 500);
        
        // Запускаем остальные анимации
        setTimeout(animateElements, 1000);
        setTimeout(animateVisualElements, 1500);
        setTimeout(animateStars, 2000);
        
        // Добавляем интерактивность
        addButtonInteractions();
        addParallaxEffect();
        animateLinkCards();
        randomStarTwinkle();
    };

    // Запуск анимаций после загрузки страницы
    initAnimations();

    // Дополнительные эффекты при наведении на астронавта
    const astronaut = document.querySelector('.error-404-astronaut');
    if (astronaut) {
        astronaut.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.filter = 'brightness(1.2)';
        });
        
        astronaut.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'brightness(1)';
        });
    }



    // Добавляем звуковые эффекты (опционально)
    const addSoundEffects = () => {
        const buttons = document.querySelectorAll('.error-404-button');
        
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
            .error-404-button {
                position: relative;
                overflow: hidden;
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
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

    // Инициализируем дополнительные эффекты
    addRippleStyles();
    addSoundEffects();
});
