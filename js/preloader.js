document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    const wrapper = document.querySelector('.wrapper');

    // Минимальное время отображения анимации (в миллисекундах)
    const minDisplayTime = 2000; // 3 секунды, можно изменить

    // Время начала отсчета
    const startTime = Date.now();

    // Функция для скрытия прелоадера и отображения контента
    function fadeOutPreloader() {
      const elapsedTime = Date.now() - startTime; // Сколько времени прошло
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime); // Сколько еще нужно ждать

      setTimeout(() => {
        preloader.style.transition = 'opacity 0.5s ease-in-out'; // Добавляем transition
        preloader.style.opacity = '0';

        setTimeout(() => {
          preloader.style.display = 'none';
          wrapper.style.display = 'block'; // Показываем wrapper
          wrapper.classList.add('loaded'); // Добавляем класс для плавного появления
        }, 500); // Время анимации исчезновения (должно совпадать с transition в CSS)

      }, remainingTime); // Ждем, чтобы отобразить прелоадер хотя бы minDisplayTime
    }

    // Проверяем, все ли ресурсы загружены
    window.addEventListener('load', fadeOutPreloader);

    // Таймаут, на случай если что-то не загрузится
    setTimeout(() => {
        if (preloader && preloader.style.display !== 'none') {
            fadeOutPreloader();
        }
    }, 5000); //  5 секунд (корректируйте по необходимости)
  });
