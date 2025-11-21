document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 0. КОНФИГУРАЦИЯ PocketBase
    // ----------------------------------------------------
    const PB_URL = 'https://nisprep4-0.onrender.com/';
    const pb = new PocketBase(PB_URL);

    // Элементы модального окна
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.querySelector('.btn-login');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const signupLink = document.querySelector('.modal-link a');

    // Элементы Hero-секции
    const select = document.getElementById('language-select');
    const startButton = document.getElementById('start-button');

    // ----------------------------------------------------
    // 1. ЛОГИКА HERO-СЕКЦИИ (Выбор класса)
    // ----------------------------------------------------
    if (startButton && select) {
        select.addEventListener('change', () => {
            const selectedClass = select.options[select.selectedIndex].text;
            startButton.textContent = `Начать ${selectedClass}`;
        });
        select.dispatchEvent(new Event('change'));

        startButton.addEventListener('click', () => {
            const selectedClass = select.options[select.selectedIndex].text;
            if (loginModal) {
                loginModal.style.display = "block";
                if (loginMessage) {
                    loginMessage.style.display = 'block';
                    loginMessage.textContent = `Чтобы начать курс "${selectedClass}", пожалуйста, войдите или зарегистрируйтесь.`;
                    loginMessage.classList.remove('error');
                }
            }
        });
    }

    // ----------------------------------------------------
    // 2. ОТКРЫТИЕ/ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
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

    // ----------------------------------------------------
    // 3. ОБРАБОТКА ВХОДА
    // ----------------------------------------------------
    if (loginForm && loginMessage) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            loginMessage.style.display = 'block';
            loginMessage.textContent = "Проверка данных...";
            loginMessage.classList.remove('error');

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const selectedClass = select.options[select.selectedIndex].text;

            try {
                // Вход
                await pb.collection('users').authWithPassword(email, password);
                const currentUser = pb.authStore.model;

                // Обновление класса
                if (currentUser && currentUser.klass !== selectedClass) {
                    await pb.collection('users').update(currentUser.id, { klass: selectedClass });
                    loginMessage.textContent = "Вход успешен! Класс обновлен. Перенаправляем...";
                } else {
                    loginMessage.textContent = "Вход успешен! Перенаправляем...";
                }

                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 1000);

            } catch (error) {
                console.error("Ошибка входа:", error);
                loginMessage.textContent = "Ошибка: Неверный email или пароль.";
                loginMessage.classList.add('error');
            }
        });

        // ----------------------------------------------------
        // 4. РЕГИСТРАЦИЯ
        // ----------------------------------------------------
        if (signupLink) {
            signupLink.addEventListener('click', async (e) => {
                e.preventDefault();

                loginMessage.style.display = 'block';
                loginMessage.textContent = "Попытка регистрации...";
                loginMessage.classList.remove('error');

                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                const selectedClass = select.options[select.selectedIndex].text;

                try {
                    await pb.collection('users').create({
                        email: email,
                        password: password,
                        passwordConfirm: password,
                        klass: selectedClass
                    });

                    loginMessage.textContent = "Регистрация успешна! Выполняется вход...";
                    await pb.collection('users').authWithPassword(email, password);

                    setTimeout(() => {
                        window.location.href = 'profile.html';
                    }, 1500);

                } catch (error) {
                    console.error("Ошибка регистрации:", error);
                    loginMessage.textContent = "Ошибка регистрации: Email уже используется или неверный формат.";
                    loginMessage.classList.add('error');
                }
            });
        }
    }
});
