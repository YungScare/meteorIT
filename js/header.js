// Функция для управления видимостью шапки при скролле на bi.html
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

document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll();
}); 
