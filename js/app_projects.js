// Ссылка на шапку
const header = document.querySelector('.hero-section');

// Ссылка на начало блока с проектами (галереей)
const projectContainer = document.querySelector('.project-container');

let lastScrollTop = 0; //  Переменная для хранения предыдущей позиции прокрутки

// Функция для определения, находится ли элемент в видимой области экрана
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Функция для обработки прокрутки
function handleScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Если прокрутили вниз и шапка видна
    if (scrollTop > lastScrollTop && !header.classList.contains('hero-section--hidden')) {
        header.classList.add('hero-section--hidden'); // Скрываем шапку
    }
    // Если прокрутили вверх и шапка не видна
    else if (scrollTop < lastScrollTop && header.classList.contains('hero-section--hidden')) {
        header.classList.remove('hero-section--hidden'); // Показываем шапку
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

    // *** ПАРАЛЛАКС ***
    // Проверяем, виден ли блок с проектами
    if (isElementInViewport(projectContainer)) {
        //  Здесь можно добавить или удалить класс для активации параллакса
        projectContainer.classList.add('parallax-active');

        //  **ВНИМАНИЕ**: Инициализируем или запускаем функцию параллакса ЗДЕСЬ,
        //  а не один раз при загрузке страницы.

        let zSpacing = -1000;
        let lastPos = zSpacing / 5;
        let $frames = document.getElementsByClassName('frame');
        let frames = Array.from($frames);
        let zVals = [];

        frames.forEach(function(n, i) {
            zVals.push((i * zSpacing) + zSpacing);
            zVals[i] += (scrollTop - projectContainer.offsetTop) * 5.5; //  Корректируем scrollTop
            let frame = frames[i],
                transform = `translateZ(${zVals[i]}px)`,
                opacity = zVals[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
            frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`)
        });
    } else {
        //  Если блок с проектами не виден, деактивируем параллакс
        projectContainer.classList.remove('parallax-active');
    }

}

// Добавляем слушатель события прокрутки
window.addEventListener('scroll', handleScroll);

// Инициализация (опционально)
window.scrollTo(0, 1);  // Можно оставить или убрать
