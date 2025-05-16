// Функция валидации телефона формата +7 (XXX) XXX-XX-XX, +7XXX XXX XX XX, +7XXXXXXXXXX и т.п.
function validatePhone(phone) {
  // Убираем все нецифровые символы, кроме + в начале
  const cleaned = phone.replace(/[^\d+]/g, '');

  // Проверяем начинается ли с +7 и далее ровно 10 цифр
  const regex = /^\+7\d{10}$/;

  return regex.test(cleaned);
}

document.addEventListener("DOMContentLoaded", async () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const orderList = document.getElementById("order-list");
  const filterSelect = document.getElementById("filter-select");
  const editForm = document.getElementById("editForm");
  const fullNameInput = document.getElementById("fullName");
  const addressInput = document.getElementById("address");

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Пожалуйста, авторизуйтесь");
    window.location.href = "/login.html";
    return;
  }

  try {
    const userResponse = await fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!userResponse.ok) throw new Error("Не удалось получить данные пользователя");
    const userData = await userResponse.json();
    if (nameInput) nameInput.value = userData.name || "";
    if (emailInput) emailInput.value = userData.email || "";
    if (phoneInput) phoneInput.value = userData.phone || "";
    if (fullNameInput) fullNameInput.value = userData.fullName || "";
    if (addressInput) addressInput.value = userData.address || "";
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    alert("Произошла ошибка при загрузке данных пользователя.");
    return;
  }

  async function fetchOrders(filter = "") {
    try {
      const ordersResponse = await fetch("http://localhost:3000/api/profile/orders", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!ordersResponse.ok) throw new Error("Не удалось загрузить заказы");
      const orders = await ordersResponse.json();
      orderList.innerHTML = "";
      const filteredOrders = filter ? orders.filter(order => order.status === filter) : orders;

      if (filteredOrders.length === 0) {
        orderList.innerHTML = "<p>У вас нет заказов.</p>";
      } else {
        filteredOrders.forEach(order => {
          const orderElement = document.createElement("div");
          orderElement.classList.add("order-item");
          orderElement.innerHTML = `
            <div class="card mb-4 shadow-sm">
              <div class="card-header bg-primary text-white">
                Заказ №${order.id} | ${new Date(order.orderDate).toLocaleDateString()}
              </div>
              <div class="card-body">
                <p><strong>Статус:</strong> ${order.status}</p>
                <p><strong>Итого:</strong> ${order.totalAmount} ₽</p>
                ${order.status === "ожидает оплаты" ? `<button class="pay-btn btn btn-success" data-order-id="${order.id}">Оплатить</button>` : ""}
              </div>
            </div>
          `;
          orderList.appendChild(orderElement);
        });
      }
    } catch (error) {
      console.error("Ошибка при получении заказов:", error);
      alert("Произошла ошибка при загрузке заказов.");
    }
  }


  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("pay-btn")) {
        const orderId = e.target.dataset.orderId;
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3000/api/orders/${orderId}/pay`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Ошибка при оплате заказа");
            }

            alert("Оплата успешно выполнена");
            window.location.reload(); // Перезагружаем страницу после успешной оплаты
        } catch (error) {
            console.error("Ошибка при оплате заказа:", error);
            alert("Произошла ошибка при оплате заказа");
        }
    }
});


  if (filterSelect) {
    filterSelect.addEventListener("change", (e) => fetchOrders(e.target.value));
  }

  await fetchOrders();

  if (editForm) {
    editForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const updatedName = nameInput.value.trim();
      const updatedEmail = emailInput.value.trim();
      const updatedPhone = phoneInput.value.trim();
      const updatedfullName = fullNameInput.value.trim();
      const updatetAddress = addressInput.value.trim();

      if (!validatePhone(updatedPhone)) {
        alert("Введите корректный номер телефона в формате +7XXXXXXXXXX или +7 (XXX) XXX-XX-XX");
        phoneInput.focus();
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/profile", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: updatedName, email: updatedEmail, phone: updatedPhone, fullName: updatedfullName, address: updatetAddress })
        });

        if (!response.ok) throw new Error("Не удалось обновить данные пользователя");
        alert("Данные успешно обновлены");
      } catch (error) {
        console.error("Ошибка при обновлении данных профиля:", error);
        alert("Произошла ошибка при обновлении данных.");
      }
    });
  }
});
