// Ссылка на шапку
const header = document.querySelector('.hero-section');

// Ссылка на начало блока с проектами (галереей)
const projectContainer = document.querySelector('.project-container');

// Ссылка на блок с заголовком "Проекты"
const projectsTitleFrame = document.querySelector('.frame:nth-child(1)'); // Выбираем первый frame

// Получаем все фреймы, кроме projectsTitleFrame
const otherFrames = Array.from(document.querySelectorAll('.frame')).filter(frame => frame !== projectsTitleFrame);

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

    // По умолчанию показываем шапку
    header.classList.remove('hero-section--hidden');

    // Проверяем, виден ли какой-либо другой фрейм
    for (const frame of otherFrames) {
        if (isElementInViewport(frame)) {
            // Если виден хотя бы один другой фрейм, скрываем шапку
            header.classList.add('hero-section--hidden');
            break; // Выходим из цикла, т.к. достаточно одного видимого фрейма
        }
    }

    // Если дошли до верха страницы, показываем шапку
    if (scrollTop === 0) {
        header.classList.remove('hero-section--hidden');
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
