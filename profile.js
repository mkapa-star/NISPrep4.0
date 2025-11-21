// profile.js

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 0. КОНФИГУРАЦИЯ POCKETBASE И ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
    // ----------------------------------------------------
    // !!! ИСПРАВЛЕНО !!!: Используем ваш рабочий URL на Render
    const PB_URL = 'https://nisprep4-0.onrender.com'; 
    const pb = new PocketBase(PB_URL);

    // Элементы для отображения данных
    const profileNameDisplay = document.getElementById('profile-name-display'); // Имя в секции аватара
    const userEmailDisplay = document.getElementById('user-email-display');     // Email под именем
    const logoutBtn = document.getElementById('logout-btn');

    // Элементы для редактирования и сохранения
    const inputName = document.getElementById('user-name');
    const inputSchool = document.getElementById('user-school');
    const inputClass = document.getElementById('user-class');
    const saveProfileBtn = document.getElementById('save-profile-btn'); 
    
    // Элементы для аватара
    const avatarUpload = document.getElementById('avatar-upload');
    const profileAvatar = document.getElementById('profile-avatar');

    // Элементы для анимации загрузки
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');


    // ----------------------------------------------------
    // 1. ФУНКЦИЯ ПРОВЕРКИ АУТЕНТИФИКАЦИИ И ЗАГРУЗКИ ПРОФИЛЯ
    // ----------------------------------------------------
    async function loadUserProfile() {
        if (!pb.authStore.isValid) {
            // Если пользователь НЕ вошел, перенаправляем
            alert("У вас нет доступа к этой странице. Войдите, пожалуйста.");
            window.location.href = 'index.html'; 
            return; 
        }

        const user = pb.authStore.model; 

        // 2. ОТОБРАЖЕНИЕ ИНФОРМАЦИИ
        if (user) {
            // 2a. Отображение EMAIL
            userEmailDisplay.textContent = user.email || 'Нет Email';
            
            // 2b. Отображение ИМЕНИ (из поля name или username)
            const displayName = user.name || user.username || user.email.split('@')[0];
            profileNameDisplay.textContent = displayName;
            
            // 2c. Заполнение полей формы (поля должны быть созданы в коллекции users PocketBase)
            inputName.value = user.name || '';
            inputSchool.value = user.school || ''; 
            inputClass.value = user.class || '';   

            // 2d. Загрузка аватара (если есть)
            if (user.avatar) {
                profileAvatar.src = pb.files.getUrl(user, user.avatar, { thumb: '120x120' });
            }
        }
        
        // 3. Плавное появление контента
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            mainContent.classList.add('visible');
        }, 500);
    }
    
    // ----------------------------------------------------
    // 4. ФУНКЦИЯ СОХРАНЕНИЯ ПРОФИЛЯ
    // ----------------------------------------------------
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            if (!pb.authStore.isValid) return;

            const userId = pb.authStore.model.id;
            
            // Собираем данные из полей
            const data = {
                name: inputName.value,
                school: inputSchool.value, 
                class: inputClass.value,   
            };

            try {
                // Обновляем запись пользователя в PocketBase
                await pb.collection('users').update(userId, data);
                
                alert('Профиль успешно обновлен!');
                
                // Обновляем отображаемое имя на странице
                profileNameDisplay.textContent = inputName.value;
            } catch (error) {
                console.error('Ошибка при сохранении профиля:', error);
                alert('Ошибка при сохранении профиля. Проверьте логи.');
            }
        });
    }

    // ----------------------------------------------------
    // 5. ФУНКЦИЯ СМЕНЫ АВАТАРА
    // ----------------------------------------------------
    if (avatarUpload) {
        avatarUpload.addEventListener('change', async function(event) {
            const file = event.target.files[0];
            if (!file || !pb.authStore.isValid) return;
            
            // 5a. Отобразить локально (мгновенный отклик)
            const reader = new FileReader();
            reader.onload = function(e) {
                profileAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);

            // 5b. Отправить файл на PocketBase
            const userId = pb.authStore.model.id;
            const formData = new FormData();
            formData.append('avatar', file);

            try {
                // Обновляем запись пользователя, включая поле 'avatar'
                await pb.collection('users').update(userId, formData);
                alert('Аватар успешно обновлен!');
            } catch (error) {
                console.error('Ошибка при загрузке аватара:', error);
                alert('Ошибка при загрузке аватара. Проверьте настройки поля "avatar" в PocketBase.');
            }
        });
    }


    // ----------------------------------------------------
    // 6. ФУНКЦИЯ ВЫХОДА (LOGOUT)
    // ----------------------------------------------------
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            pb.authStore.clear(); // Очищаем токен
            alert("Вы успешно вышли из аккаунта.");
            window.location.href = 'index.html'; // Перенаправляем на главную
        });
    }
    
    // Запускаем загрузку данных при старте
    loadUserProfile();
});