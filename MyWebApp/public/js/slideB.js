document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const menuItems = document.getElementById("menuItems");
    const content = document.querySelector(".container"); // Основной контент

    if (!menuToggle || !sidebar || !content) {
        console.error("Не найдены элементы меню!");
        return;
    }

    function getRoleFromToken() {
        return localStorage.getItem("role") || "guest";
    }

    function collapseSidebar() {
        sidebar.classList.remove("active"); // Закрываем сайдбар
    }

    // Проверка клика вне сайдбара
    function handleClickOutside(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            collapseSidebar();
        }
    }

    // Переключение меню
    menuToggle.addEventListener("click", (event) => {
        sidebar.classList.toggle("active");
        event.stopPropagation(); // Останавливаем всплытие
    });

    // Клик по контенту - скрываем сайдбар
    document.addEventListener("click", handleClickOutside);

    // Предотвращаем закрытие при клике по самому сайдбару
    sidebar.addEventListener("click", (event) => {
        event.stopPropagation();
    });

    // Наполнение меню в зависимости от роли
    const role = getRoleFromToken();
    if (role === "admin") {
        menuItems.innerHTML = `
            <li><a href="/create-admin.html">Создать новый профиль</a></li>
            <li><a href="/dashboard.html">Дашборд</a></li>
            <li><a href="/add-product.html">Добавить новый продукт</a></li>
            <li><a href="/orders.html">Просмотр всех заказов</a></li>
            <li><button id="logout">Выход</button></li>
        `;
    } else {
        menuItems.innerHTML = `
            <li><a href="/profile.html">Профиль</a></li>
            <li><a href="/cart.html">Корзина</a></li>
            <li><button id="logout">Выход</button></li>
        `;
    }

    // Обработчик выхода
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login.html";
    });
});
