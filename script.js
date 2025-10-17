// script.js
document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 0. КОНФИГУРАЦИЯ POCKETBASE И ОБЪЯВЛЕНИЕ ПЕРЕМЕННЫХ
    // ----------------------------------------------------
    
    const PB_URL = 'https://nisprep4-0.onrender.com/'; 
    const pb = new PocketBase(PB_URL);

    // Переменные модального окна
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.btn-login'); 
    const closeBtn = document.querySelector('.close-btn'); 
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const signupLink = document.querySelector('.modal-link a'); // Ссылка "Зарегистрироваться"
    
    // Переменные Hero-секции
    const select = document.getElementById('language-select');
    const startButton = document.getElementById('start-button');
    
    
    // ----------------------------------------------------
    // 1. ЛОГИКА HERO-СЕКЦИИ (Выбор класса)
    // ----------------------------------------------------
// script.js (в секции 1. ЛОГИКА HERO-СЕКЦИИ)
    if (startButton && select) {
        startButton.addEventListener('click', () => {
            const selectedClass = select.options[select.selectedIndex].text;
            // Оповещение можно убрать или изменить
            // alert(`Отлично! Начинаем курс: ${selectedClass}. Вам нужно сначала войти или зарегистрироваться.`);

            // Добавить открытие модального окна
            if (loginModal) {
                loginModal.style.display = "block";
                // Опционально: показать сообщение в модальном окне, что нужно войти для начала курса
                if (loginMessage) {
                    loginMessage.style.display = 'block';
                    loginMessage.textContent = `Чтобы начать курс "${selectedClass}", пожалуйста, войдите или зарегистрируйтесь.`;
                    loginMessage.classList.remove('error');
                }
            }
        });
// ...


    // ----------------------------------------------------
    // 2. ЛОГИКА МОДАЛЬНОГО ОКНА (Открытие/Закрытие)
    // ----------------------------------------------------
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = "block";
        });
    }

    if (closeBtn && loginModal) {
        closeBtn.addEventListener('click', () => {
            loginModal.style.display = "none";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = "none";
        }
    });


    // Проверка наличия элементов формы для следующих блоков
    if (loginForm && loginMessage) {

        // ----------------------------------------------------
        // 3. ОБРАБОТКА ФОРМЫ ВХОДА С POCKETBASE (Кнопка "Войти")
        // ----------------------------------------------------
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            loginMessage.style.display = 'block';
            loginMessage.textContent = "Проверка данных...";
            loginMessage.classList.remove('error');
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            // Получаем выбранный класс
            const selectedClass = select.options[select.selectedIndex].text;

            try {
                // ШАГ 1: ВХОД
                await pb.collection('users').authWithPassword(email, password);
                
                // ШАГ 2: ОБНОВЛЕНИЕ КЛАССА В АККАУНТЕ (klass вместо selected_class)
                const currentUser = pb.authStore.model;

                if (currentUser && currentUser.klass !== selectedClass) {
                    await pb.collection('users').update(currentUser.id, {
                        // Используем имя поля "klass"
                        klass: selectedClass 
                    });
                    loginMessage.textContent = "Вход успешен! Класс обновлен. Перенаправляем...";
                } else {
                    loginMessage.textContent = "Вход успешен! Перенаправляем...";
                }
                
                loginMessage.classList.remove('error');
                
                setTimeout(() => {
                    // ПЕРЕНАПРАВЛЕНИЕ:
                    window.location.href = 'profile.html'; 
                }, 1000);

            } catch (error) {
                // Ошибка входа
                console.error("Ошибка входа PocketBase:", error);
                loginMessage.textContent = `Ошибка: Неверный email или пароль.`;
                loginMessage.classList.add('error');
            }
        });


        // ----------------------------------------------------
        // 4. ОБРАБОТКА РЕГИСТРАЦИИ (Ссылка "Зарегистрироваться")
        // ----------------------------------------------------
        if (signupLink) {
            signupLink.addEventListener('click', async (e) => {
                e.preventDefault();
                
                loginMessage.style.display = 'block';
                loginMessage.textContent = "Попытка регистрации...";
                loginMessage.classList.remove('error');

                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                // Получаем выбранный класс
                const selectedClass = select.options[select.selectedIndex].text; 

                if (!email || password.length < 8) {
                    loginMessage.textContent = "Пароль должен быть не менее 8 символов. Проверьте Email.";
                    loginMessage.classList.add('error');
                    return;
                }

                try {
                    // РЕГИСТРАЦИЯ (с сохранением выбранного класса)
                    await pb.collection('users').create({
                        email: email,
                        password: password,
                        passwordConfirm: password,
                        klass: selectedClass // <-- ИСПРАВЛЕНО: используем "klass"
                    });
                    
                    loginMessage.textContent = "Регистрация успешна! Выполняется вход...";
                    loginMessage.classList.remove('error');
                    
                    // Автоматический вход после регистрации
                    await pb.collection('users').authWithPassword(email, password);
                    
                    setTimeout(() => {
                        // ПЕРЕНАПРАВЛЕНИЕ:
                        window.location.href = 'profile.html'; 
                    }, 1500);

                } catch (error) {
                    // Ошибка регистрации
                    console.error("Ошибка регистрации PocketBase:", error);
                    loginMessage.textContent = `Ошибка регистрации: Email уже используется или неверный формат.`;
                    loginMessage.classList.add('error');
                }
            });
        }
    }

    }});
