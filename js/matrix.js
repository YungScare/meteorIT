const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('matrixCanvas2');
const ctx2 = canvas2.getContext('2d');

if (!ctx || !ctx2) {
    console.error("Canvas не поддерживается.");
}

const container = document.getElementById('matrixContainer');
let canvasWidth = container.offsetWidth;
let canvasHeight = container.offsetHeight;

function setCanvasSize() {
    canvasWidth = container.offsetWidth;
    canvasHeight = container.offsetHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas2.width = canvasWidth;
    canvas2.height = canvasHeight;
}

setCanvasSize();

window.addEventListener('resize', setCanvasSize);

const fontSize = 20;
const columns = canvasWidth / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvasHeight;
}

const characters = "01";
const matrixColor = '#fff';
const word = "meteorIT"; // Слово для вставки в матрицу
let wordIndex = 0;     // Индекс текущей буквы в слове
let isHovered = false;  // Флаг, показывающий, наведен ли курсор на контейнер

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = matrixColor;
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        let text;
        if (isHovered) { // Если курсор наведен, отображаем только слово
            text = word[wordIndex];
            wordIndex = (wordIndex + 1) % word.length;
        } else { // Если курсор не наведен, отображаем только случайные символы
            text = characters.charAt(Math.floor(Math.random() * characters.length));
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvasHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] ++;
    }
}

function draw2() {
    ctx2.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx2.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx2.fillStyle = matrixColor;
    ctx2.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        let text;
        if (isHovered) { // Если курсор наведен, отображаем только слово
            text = word[wordIndex];
            wordIndex = (wordIndex + 1) % word.length;
        } else { // Если курсор не наведен, отображаем только случайные символы
            text = characters.charAt(Math.floor(Math.random() * characters.length));
        }

        ctx2.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvasHeight && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i] ++;
    }
}

function matrixAnimation() {
    draw();
    requestAnimationFrame(matrixAnimation);
}

function matrixAnimation2() {
    draw2();
    requestAnimationFrame(matrixAnimation2);
}

matrixAnimation();
matrixAnimation2();

// --- Обработчики событий наведения мыши ---
container.addEventListener('mouseenter', () => {
    isHovered = true; // Устанавливаем флаг при наведении
});

container.addEventListener('mouseleave', () => {
    isHovered = false; // Сбрасываем флаг при уходе курсора
});

