document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Предотвращаем перезагрузку страницы

            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                // Исправляем URL на тот, который обрабатывает сервер
                const response = await fetch("http://localhost:3000/api/auth/login", {  // URL должен вести на серверный маршрут
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    window.location.href = "/index.html"; // Переход на главную
                } else {
                    alert("Ошибка: " + data.message);
                }
            } catch (error) {
                console.error("Ошибка:", error);
                alert("Ошибка сервера");
            }
        });
    }
});
