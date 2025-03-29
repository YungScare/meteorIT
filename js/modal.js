document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const ctaButton = document.querySelector('.cta-button'); // Селектор кнопки
    const closeButton = document.querySelector('.modal__close');

    // Открытие модального окна
    ctaButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем переход по ссылке
        modal.classList.add('active');
  ScrollSmoother.get().paused(true); //pause scrollSmoother
    });

    // Закрытие модального окна по клику на крестик
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
  ScrollSmoother.get().paused(false); //unpause scrollSmoother
    });

    // Закрытие модального окна по клику вне окна
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.classList.remove('active');
   ScrollSmoother.get().paused(false); //unpause scrollSmoother
        }
    });
});