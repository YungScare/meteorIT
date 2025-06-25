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

document.addEventListener('DOMContentLoaded', () => {
    handleHeaderScroll();
}); 