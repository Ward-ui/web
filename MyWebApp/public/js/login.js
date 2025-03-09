function getRoleFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Декодируем токен
        return payload.role; 
    } catch (error) {
        console.error("Ошибка при разборе токена:", error);
        return null;
    }
}
