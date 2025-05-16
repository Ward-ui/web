document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const menuItems = document.getElementById("menuItems");

  if (!menuToggle || !sidebar || !menuItems) {
    console.error("Не найдены элементы меню!");
    return;
  }

  function getRoleFromToken() {
    return localStorage.getItem("role") || "guest";
  }

  function collapseSidebar() {
    sidebar.classList.remove("active");
  }

  function handleClickOutside(event) {
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
      collapseSidebar();
    }
  }

  menuToggle.addEventListener("click", (event) => {
    sidebar.classList.toggle("active");
    event.stopPropagation();
  });

  document.addEventListener("click", handleClickOutside);

  sidebar.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Наполнение меню
  const role = getRoleFromToken();
  if (role === "admin") {
    menuItems.innerHTML = `
      <li><a href="/create-admin.html">Создать новый профиль</a></li>
      <li><a href="/dashboard.html">Дашборд</a></li>
      <li><a href="/addProduct.html">Добавить новый продукт</a></li>
      <li><a href="/admin-orders.html">Просмотр всех заказов</a></li>
      <li><button id="logout">Выход</button></li>
    `;
  } else {
    menuItems.innerHTML = `
      <li><a href="/profile.html">Профиль</a></li>
      <li><a href="/cart.html">Корзина</a></li>
      <li><button id="logout">Выход</button></li>
    `;
  }

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login.html";
  });
});
