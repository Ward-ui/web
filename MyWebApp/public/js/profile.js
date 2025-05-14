document.addEventListener("DOMContentLoaded", async () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const orderList = document.getElementById("order-list");
    const editForm = document.getElementById("editForm");

    const token = localStorage.getItem("token");
    if (!token) {
        alert("Пожалуйста, авторизуйтесь");
        window.location.href = "/login.html";
        return;
    }

    try {
        // Получаем данные пользователя
        const userResponse = await fetch("http://localhost:3000/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!userResponse.ok) {
            throw new Error("Не удалось получить данные пользователя");
        }

        const userData = await userResponse.json();
        nameInput.value = userData.name;
        emailInput.value = userData.email;

        // Получаем заказы пользователя
        const ordersResponse = await fetch("http://localhost:3000/api/profile/orders", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!ordersResponse.ok) {
            throw new Error("Не удалось загрузить заказы");
        }

        const orders = await ordersResponse.json();
      
        if (orders.length === 0) {
            orderList.innerHTML = "<p>У вас нет заказов.</p>";
        } else {
            orders.forEach(order => {
      
                
                const orderElement = document.createElement("div");
                orderElement.classList.add("order-item");
                orderElement.innerHTML = `
                    <h5>Заказ №${order.id}</h5>
                    <p>Статус: ${order.status}</p>
                    <p>Дата: ${new Date(order.orderDate).toLocaleDateString()}</p>
                    <p>Итого: ${order.totalAmount} ₽</p>
                    ${
                        order.status === "ожидает оплаты"
                        ? `<button class="pay-btn" data-order-id="${order.id}">Оплатить</button>`
                        : ""
                    }
                `;
                orderList.appendChild(orderElement);
            });
        }
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при загрузке данных.");
    }

    // Обработчик оплаты заказа
    orderList.addEventListener("click", async (e) => {
        if (e.target.classList.contains("pay-btn")) {
            const orderId = e.target.dataset.orderId;

            try {
                const response = await fetch(`http://localhost:3000/api/orders/${orderId}/pay`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
    const error = await response.json();
    console.error("Ошибка:", error.message);  // Выводим точное сообщение об ошибке с сервера
    throw new Error("Не удалось произвести оплату");
}


                alert("Оплата успешно произведена");
                window.location.reload();
            } catch (error) {
                console.error("Ошибка:", error);
                alert("Произошла ошибка при оплате.");
            }
        }
    });

    // Обработчик отправки формы
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedName = nameInput.value;
        const updatedEmail = emailInput.value;

        try {
            const response = await fetch("http://localhost:3000/api/profile", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: updatedName,
                    email: updatedEmail
                })
            });

            if (!response.ok) {
                throw new Error("Не удалось обновить данные пользователя");
            }

            alert("Данные успешно обновлены");
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Произошла ошибка при обновлении данных.");
        }
    });
});
