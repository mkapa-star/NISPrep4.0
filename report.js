// Инициализация PocketBase
// ВАЖНО: Убедитесь, что PocketBase SDK подключен в HTML!
const PB_URL = 'https://nisprep4-0.onrender.com/'; 
const pb = new PocketBase(PB_URL);

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------
    // Логика модального окна входа (Login Modal)
    // -------------------------------------
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.btn-login');
    const closeBtn = document.querySelector('.modal-content .close-btn');

    // Проверяем наличие элементов
    if (loginBtn) {
        loginBtn.onclick = function() {
            if (loginModal) {
                loginModal.style.display = 'block';
            }
        };
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            if (loginModal) {
                loginModal.style.display = 'none';
            }
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
            
            // Сброс и отображение "Отправка..."
            reportMessage.classList.remove('bg-red-200', 'text-red-800', 'bg-green-200', 'text-green-800');
            reportMessage.classList.add('bg-blue-100', 'text-blue-800');
            reportMessage.textContent = 'Отправка...';
            reportMessage.style.display = 'block';

            // Получение данных формы
            const formData = {
                email: document.getElementById('gmail').value,
                // Поле 'rep' используется для типа/важности (соответствует схеме PocketBase)
                rep: document.getElementById('rep').value, 
                description: document.getElementById('description').value,
            };

            // *** РЕАЛЬНЫЙ КОД POCKETBASE: ОТПРАВКА В КОЛЛЕКЦИЮ 'reports' ***
            try {
                // Если коллекция 'reports' имеет правило 'create' (для анонимов), 
                // дополнительная аутентификация не требуется. 
                // Мы удалили попытку аутентификации гостя, чтобы упростить код.
                
                // Создаем запись в коллекции 'reports'
                const record = await pb.collection('reports').create(formData);
                
                console.log('Отчет успешно отправлен:', record);

                reportMessage.classList.remove('bg-blue-100', 'text-blue-800');
                reportMessage.classList.add('bg-green-200', 'text-green-800');
                reportMessage.textContent = 'Спасибо! Ваше сообщение отправлено. Мы рассмотрим его в ближайшее время.';
                reportForm.reset(); // Очистить форму
            } catch (error) {
                // Обработка ошибки PocketBase
                reportMessage.classList.remove('bg-blue-100', 'text-blue-800', 'bg-green-200', 'text-green-800');
                reportMessage.classList.add('bg-red-200', 'text-red-800');
                
                let errorMessage = 'Произошла ошибка при отправке. Пожалуйста, проверьте поля и попробуйте снова.';
                
                // Извлечение конкретного сообщения об ошибке из PocketBase API
                if (error.response && error.response.data) {
                    const errorKeys = Object.keys(error.response.data);
                    if (errorKeys.length > 0) {
                        const fieldErrors = error.response.data[errorKeys[0]];
                        if (fieldErrors && fieldErrors.message) {
                             errorMessage = `Ошибка: ${fieldErrors.message}`;
                        }
                    } else if (error.message) {
                        errorMessage = `Ошибка: ${error.message}`;
                    }
                }

                reportMessage.textContent = errorMessage;
                console.error('Ошибка отправки в PocketBase:', error);
            }
        });
    }

    // Дополнительная логика для кнопки "Начать бесплатно"
    const startButton = document.getElementById('start-button');
    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log('Начать бесплатно нажато! Перенаправление...');
        });
    }
});
