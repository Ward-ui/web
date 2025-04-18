document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Предотвращаем перезагрузку страницы

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

    if (!username || !password) {
              alert("Пожалуйста, заполните все поля.");
              return;
            }

      try {
        const response = await fetch("http://localhost:3000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password })
        });if (!username || !password) {
          alert("Пожалуйста, заполните все поля.");
          return;
        }

        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Выводим сообщение об успешной регистрации
          window.location.href = "/login.html"; // Переход на страницу логина
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
