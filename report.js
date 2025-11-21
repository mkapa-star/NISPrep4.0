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

        // Получаем значения полей
        const rep = document.getElementById('rep').value.trim();
        const description = document.getElementById('description').value.trim();
        const gmail = document.getElementById('gmail').value.trim();

        // Проверки формы
        if (!rep) {
            reportMessage.textContent = '❌ Выберите тип проблемы!';
            reportMessage.className = 'message-text error';
            return;
        }

        if (!description || description.length > 100) {
            reportMessage.textContent = '❌ Описание должно быть от 1 до 100 символов';
            reportMessage.className = 'message-text error';
            return;
        }

        if (!gmail) {
            reportMessage.textContent = '❌ Укажите корректный email';
            reportMessage.className = 'message-text error';
            return;
        }

        // Формируем данные для отправки
        const formData = {
            rep: [rep], // массив с одним элементом
            description,
            gmail,
        };

        console.log('Отправляемые данные:', formData);

        try {
            const record = await pb.collection('reports').create(formData);
            console.log('PocketBase ответ:', record);

            reportMessage.textContent = '✅ Спасибо! Ваше сообщение отправлено.';
            reportMessage.className = 'message-text success';
            reportForm.reset();

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
