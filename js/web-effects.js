// Дополнительные эффекты для страницы web.html
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем эффект "волны" при клике на плашки
    const stackTags = document.querySelectorAll('.web-stack-tags button, .web-task-tags-row button');
    
    stackTags.forEach(button => {
        button.addEventListener('click', function(e) {
            // Создаем эффект волны
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
            
            // Удаляем элемент через 600ms
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
});

// Добавляем CSS для эффекта волны
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
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
