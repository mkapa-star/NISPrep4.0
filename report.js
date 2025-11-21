// Настройка подключения PocketBase
const PB_URL = 'https://nisprep4-0.onrender.com/'; 
const pb = new PocketBase(PB_URL);

document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('reportForm');
    const reportMessage = document.getElementById('reportMessage');

    if (!reportForm) return;

    reportForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Отображаем сообщение об отправке
        reportMessage.style.display = 'block';
        reportMessage.textContent = 'Отправка...';
        reportMessage.className = 'message-text info';

        // Собираем данные формы
        const formData = {
            gmail: document.getElementById('gmail').value.trim(),
            rep: document.getElementById('rep').value.trim(),
            description: document.getElementById('description').value.trim(),
        };

        console.log('Отправляемые данные:', formData); // Для отладки

        try {
            // Отправляем данные в PocketBase (коллекция "reports")
            const record = await pb.collection('reports').create(formData);
            console.log('PocketBase ответ:', record);

            // Сообщение об успехе
            reportMessage.textContent = '✅ Спасибо! Ваше сообщение отправлено.';
            reportMessage.className = 'message-text success';

            // Очистить форму
            reportForm.reset();

            // Через 3 секунды скрыть сообщение
            setTimeout(() => {
                reportMessage.style.display = 'none';
            }, 3000);

        } catch (error) {
            console.error('Ошибка при отправке:', error);

            reportMessage.textContent = '❌ Ошибка отправки. Проверьте соединение или заполните все поля.';
            reportMessage.className = 'message-text error';
        }
    });
});
