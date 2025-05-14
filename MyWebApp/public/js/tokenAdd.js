document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Вы не авторизованы! Перенаправляем на страницу входа.");
        window.location.href = "login.html";
        return;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Декодируем payload токена
        

        if (!decodedToken.role) {
            alert("Ошибка: роль отсутствует в токене!");
            return;
        }

       
    } catch (error) {
        console.error("Ошибка при разборе токена:", error);
        alert("Некорректный токен! Перенаправляем на вход.");
        window.location.href = "login.html";
    }
});
