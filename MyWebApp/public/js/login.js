document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.log("Токен отсутствует, пользователь не вошел.");
        return;
    }

    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Декодируем payload
        console.log("Декодированный токен:", decodedToken);
        
        if (decodedToken.role) {
        } else {
            console.log("Роль не найдена в токене.");
        }
    } catch (error) {
        console.error("Ошибка при разборе токена:", error);
    }
});
