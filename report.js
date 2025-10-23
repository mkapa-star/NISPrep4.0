// Инициализация PocketBase
const PB_URL = 'https://nisprep4-0.onrender.com/'; 
    const pb = new PocketBase(PB_URL);
document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------
    // Логика модального окна входа (Login Modal)
    // -------------------------------------
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.btn-login');
    const closeBtn = document.querySelector('.modal-content .close-btn');

    // Проверяем наличие элементов, так как модальное окно может быть только на главной
    if (loginBtn) {
        loginBtn.onclick = function() {
            if (loginModal) {
                loginModal.style.display = 'block';
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            loginModal.style.display = 'none';
        };
    }

    window.onclick = function(event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
    };

    // -------------------------------------
    // Логика формы обратной связи (Report Form)
    // -------------------------------------
    const reportForm = document.getElementById('reportForm');
    const reportMessage = document.getElementById('reportMessage');

    if (reportForm) {
        reportForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            reportMessage.classList.remove('error');
            reportMessage.style.backgroundColor = ''; // Сброс цвета
            reportMessage.style.color = ''; // Сброс цвета
            reportMessage.textContent = 'Отправка...';
            reportMessage.style.display = 'block';

            // Получение данных формы
            const formData = {
                email: document.getElementById('email').value,
                type: document.getElementById('rep').value,
                description: document.getElementById('description').value,
            };

            // *** РЕАЛЬНЫЙ КОД POCKETBASE: ОТПРАВКА В КОЛЛЕКЦИЮ 'reports' ***
            try {
                // ВАЖНО: Коллекция 'reports' должна быть создана в PocketBase
                // и иметь разрешенное правило 'create' для анонимных пользователей.
                const record = await pb.collection('reports').create(formData);
                
                console.log('Отчет успешно отправлен:', record);

                reportMessage.style.backgroundColor = '#d4edda'; // Зеленый для успеха
                reportMessage.style.color = '#155724';
                reportMessage.textContent = 'Спасибо! Ваше сообщение отправлено. Мы рассмотрим его в ближайшее время.';
                reportForm.reset(); // Очистить форму
            } catch (error) {
                // Обработка ошибки PocketBase
                reportMessage.classList.add('error');
                reportMessage.style.backgroundColor = '#f8d7da'; 
                reportMessage.style.color = '#721c24';
                reportMessage.textContent = 'Произошла ошибка при отправке. Пожалуйста, проверьте поля и попробуйте снова.';
                console.error('Ошибка отправки в PocketBase:', error);
            }
        });
    }

    // Дополнительная логика для кнопки "Начать бесплатно"
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Начать бесплатно нажато!');
        });
    }

});
