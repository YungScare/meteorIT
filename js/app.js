gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {

	ScrollSmoother.create({
		wrapper: '.wrapper',
		content: '.content',
		smooth: 1.5,
		effects: true
	})

	gsap.fromTo('.hero-section', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.hero-section',
			start: 'center',
			end: '820',
			scrub: true
		}
	})

	// Анимация для services section (появление слева)
    gsap.fromTo('.services', { opacity: 0, x: -100 }, { // Начальное состояние: прозрачность 0 и сдвиг влево на 100px
        opacity: 1,
        x: 0, // Конечное состояние: полная видимость и без сдвига
        scrollTrigger: {
            trigger: '.services',
            start: 'top 80%', // Начинаем анимацию, когда верх секции достигает 80% экрана
            end: 'bottom 20%', // Заканчиваем анимацию, когда низ секции достигает 20% экрана
            scrub: true, // Плавное изменение при скролле
            markers: false
        }
    })

	let itemsL = gsap.utils.toArray('.gallery__left .gallery__item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

	let itemsR = gsap.utils.toArray('.gallery__right .gallery__item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})

}

// Функция для управления видимостью шапки при скролле
function handleHeaderScroll() {
    let lastScrollTop = 0;
    const desktopNav = document.querySelector('.desktop-nav');
    const mobileNav = document.querySelector('.mobile-nav');
    const scrollThreshold = 50; // Порог скролла для срабатывания

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // Определяем направление скролла
        if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
            // Скролл вниз
            if (desktopNav) desktopNav.style.transform = 'translateY(-100%)';
            if (mobileNav) mobileNav.style.transform = 'translateY(-100%)';
        } else {
            // Скролл вверх
            if (desktopNav) desktopNav.style.transform = 'translateY(0)';
            if (mobileNav) mobileNav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для мобильного выпадающего меню
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        });
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-dropdown')) {
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорным ссылкам
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.desktop-nav')?.offsetHeight || 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
});

// Анимация пульсации для астронавта
function initAstronautPulse() {
    const astronautWrapper = document.querySelector('.astronaut-wrapper');
    if (!astronautWrapper) return;

    // Создаем GSAP анимацию пульсации размера
    gsap.to(astronautWrapper, {
        scale: 1.05,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll();
    initAstronautPulse();
});
