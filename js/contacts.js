// Обработка формы контактов
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Простая валидация
            if (!data.name || !data.email || !data.message) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }
            
            // Проверяем согласие на обработку данных
            if (!data.privacy) {
                alert('Необходимо согласие на обработку персональных данных');
                return;
            }
            
            // Показываем сообщение об успешной отправке
            showSuccessMessage();
            
            // Очищаем форму
            contactForm.reset();
        });
    }
    
    // Функция показа сообщения об успешной отправке
    function showSuccessMessage() {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = 'contact-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>Сообщение отправлено!</h3>
                <p>Спасибо за обращение. Мы свяжемся с вами в ближайшее время.</p>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 26, 26, 0.95);
            color: #ffffff;
            padding: 30px;
            border-radius: 15px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            position: relative;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background: #D9D9D9;
            color: #000;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const title = notification.querySelector('h3');
        title.style.cssText = `
            margin: 0 0 15px 0;
            color: #D9D9D9;
            font-size: 1.5rem;
        `;
        
        const text = notification.querySelector('p');
        text.style.cssText = `
            margin: 0;
            color: #cdc6c3;
            line-height: 1.4;
        `;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Обработчик закрытия
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(notification);
        });
        
        // Автоматическое закрытие через 5 секунд
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
        
        // Закрытие по клику вне уведомления
        notification.addEventListener('click', function(e) {
            if (e.target === notification) {
                document.body.removeChild(notification);
            }
        });
    }
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами контактов
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Наблюдаем за формой
    const contactFormElement = document.querySelector('.contacts-form');
    if (contactFormElement) {
        contactFormElement.style.opacity = '0';
        contactFormElement.style.transform = 'translateY(30px)';
        contactFormElement.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(contactFormElement);
    }
    
    // Наблюдаем за социальными ссылками
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(30px)';
        link.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(link);
    });
});
