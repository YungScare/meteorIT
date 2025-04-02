document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const ctaButton = document.querySelector('.cta-button'); // Селектор кнопки
    const closeButton = document.querySelector('.modal__close');

    // Открытие модального окна
    ctaButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке

        // Предварительно устанавливаем стили для анимации открытия
        modal.style.opacity = 0;
        modal.style.transform = 'translateY(-20px)'; // Небольшое смещение вверх
        modal.classList.add('active');

        // Анимация открытия (плавное появление и смещение вниз)
        requestAnimationFrame(() => { // Используем requestAnimationFrame для плавной анимации
            modal.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
            modal.style.opacity = 1;
            modal.style.transform = 'translateY(0)';
        });
        ScrollSmoother.get().paused(true); //pause scrollSmoother
    });

    // Закрытие модального окна по клику на крестик
    closeButton.addEventListener('click', function() {
        closeModal();
    });

    // Закрытие модального окна по клику вне окна
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeModal();
        }
    });

    // Функция для закрытия модального окна
    function closeModal() {
        // Анимация закрытия (исчезновение сверху вниз)
        modal.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in';
        modal.style.opacity = 0;
        modal.style.transform = 'translateY(-20px)'; // Смещение вверх

        // Удаляем класс 'active' после завершения анимации
        setTimeout(() => {
            modal.classList.remove('active');
            modal.style.transition = ''; // Сбрасываем transition, чтобы не влияло на следующие открытия
            modal.style.transform = ''; // Сбрасываем transform
            modal.style.opacity = ''; //Сбрасываем opacity
        }, 300); // Время анимации (300ms)

        ScrollSmoother.get().paused(false); //unpause scrollSmoother
    }
});
