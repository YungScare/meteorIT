
const svg = document.getElementById('matrix-svg');
const matrixContainer = document.getElementById('matrix-container');
const matrixGroup = document.getElementById('matrix-group');
const textElement = document.getElementById('matrix-text');
const characters = "01";
let animationInterval;
let starInterval; // Интервал для создания звезд
let firstHover = true; // Флаг для первого наведения

const containerWidth = matrixContainer.clientWidth;
const containerHeight = matrixContainer.clientHeight;

const fontSize = 20;
const columns = Math.floor(containerWidth / fontSize);
const rows = Math.floor(containerHeight / fontSize);

const starBaseSize = 40;
const starSizeVariation = 20;
const starFallSpeedBase = 15;
const starFallSpeedVariation = 13;

// Функция для создания одного символа матрицы
function createMatrixCharacter(x, y, initialContent) {
    const char = document.createElementNS("http://www.w3.org/2000/svg", "text");
    char.setAttribute("x", x);
    char.setAttribute("y", y);
    char.setAttribute("class", "matrix-char");
    char.textContent = initialContent;
    return char;
}

// Функция для создания звезды (теперь изображение)
function createStar() {
    const star = document.createElement("img");

    // Случайная траектория (0 - справа налево, 1 - слева направо)
    star.dataset.trajectory = Math.floor(Math.random() * 2);

    // Выбор изображения и начальной позиции в зависимости от траектории
    if (star.dataset.trajectory === "0") {
        star.src = "img/main/Meteor.png"; // Путь к изображению для траектории справа налево
        // Начальная позиция - правый верхний угол
        star.dataset.startX = containerWidth; // Сохраняем начальную позицию X
        star.dataset.startY = 0; // Сохраняем начальную позицию Y
    } else {
        star.src = "img/main/Meteor_mirrored.png"; // Путь к изображению для траектории слева направо (замените!)
        // Начальная позиция - левый верхний угол
        star.dataset.startX = 0; // Сохраняем начальную позицию X
        star.dataset.startY = 0; // Сохраняем начальную позицию Y
    }

    star.style.position = "absolute";
    const width = starBaseSize + Math.random() * starSizeVariation;
    star.style.width = width + "px";
    star.style.height = "auto";

    star.style.left = star.dataset.startX + "px"; // Устанавливаем начальную позицию из data-атрибута
    star.style.top = star.dataset.startY + "px";   // Устанавливаем начальную позицию из data-атрибута

    star.classList.add("star");
    star.dataset.speed = starFallSpeedBase + Math.random() * starFallSpeedVariation;
    matrixContainer.appendChild(star);
    return star;
}

// Функция для первоначального заполнения матрицы статичными символами
function populateMatrix() {
    matrixGroup.innerHTML = '';
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * fontSize;
            const y = j * fontSize;
            // Генерируем случайный символ для начального состояния
            const initialContent = characters.charAt(Math.floor(Math.random() * characters.length));
            const char = createMatrixCharacter(x, y, initialContent);
            matrixGroup.appendChild(char);
        }
    }
}

// Функция для анимации матрицы (изменение символов)
function animateMatrix() {
    const chars = matrixGroup.querySelectorAll('.matrix-char');
    chars.forEach(char => {
        char.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
    });

    // Анимация звезд
    const stars = matrixContainer.querySelectorAll('.star');
    stars.forEach(star => {
        let x = parseFloat(star.style.left);
        let y = parseFloat(star.style.top);
        const speed = parseFloat(star.dataset.speed);
        const trajectory = parseInt(star.dataset.trajectory);

        let angle;
        let targetX, targetY;

        if (trajectory === 0) {
            // Траектория справа налево
            targetX = 0;
            targetY = containerHeight;
        } else {
            // Траектория слева направо
            targetX = containerWidth;
            targetY = containerHeight;
        }

        angle = Math.atan2(targetY - y, targetX - x);

        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;

        x += dx;
        y += dy;

        star.style.left = x + "px";
        star.style.top = y + "px";

        // Получаем ширину звезды
        const starWidth = parseFloat(star.style.width);

        // Если звезда полностью ушла за пределы контейнера
        if (trajectory === 0 && x + starWidth < 0 && y > containerHeight) {
            star.remove();
        } else if (trajectory === 1 && x > containerWidth && y > containerHeight) {
            star.remove();
        }
    });
}

// Функция для создания звезд с интервалом
function startStarInterval() {
    starInterval = setInterval(() => {
        createStar();
    }, Math.random() * (15000 - 5000) + 5000); // Интервал от 5 до 15 секунд
}

// Функция для запуска анимации
function startAnimation() {
    if (firstHover) {
        createStar();
        firstHover = false;
    }
    startStarInterval();
    animationInterval = setInterval(animateMatrix, 50);
    textElement.classList.add("highlight-text");
    matrixContainer.classList.add("highlight-container");
}

// Функция для остановки анимации
function stopAnimation() {
    clearInterval(animationInterval);
    clearInterval(starInterval);
    textElement.classList.remove("highlight-text");
    matrixContainer.classList.remove("highlight-container");

    const stars = matrixContainer.querySelectorAll('.star');
    stars.forEach(star => star.remove());
}

// Первоначальное заполнение матрицы статичными символами
populateMatrix();

// Обработчики событий для наведения и ухода мыши
matrixContainer.addEventListener("mouseenter", startAnimation);
matrixContainer.addEventListener("mouseleave", stopAnimation);
