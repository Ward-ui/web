document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".btn-primary");
    
    buttons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const card = event.target.closest(".card");
            const productName = card.querySelector(".card-title").innerText;
            const priceText = card.querySelector(".card-text strong").innerText;
            const price = parseInt(priceText.replace(/\D/g, "")); // Убираем всё, кроме цифр
            const userId = localStorage.getItem("userId"); // Должен быть сохранен при авторизации
            if (!userId) {
                alert("Пожалуйста, войдите в аккаунт!");
                return;
            }

            // Отправка запроса на сервер
            const response = await fetch("http://localhost:3000/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    productId: productName, // Временно используем имя, замени на реальный ID из БД
                    quantity: 1,
                }),
            });

            if (response.ok) {
                alert(`${productName} добавлен в корзину`);
            } else {
                alert("Ошибка при добавлении в корзину");
            }
        });
    });
});