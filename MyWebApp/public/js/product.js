document.addEventListener("DOMContentLoaded", async () => {
  const productListContainer = document.getElementById("product-list");

  try {
    const response = await fetch("http://localhost:3000/api/products");
    if (!response.ok) {
      throw new Error("Ошибка при загрузке продуктов");
    }

    const products = await response.json();

    if (products.length === 0) {
      productListContainer.innerHTML = "<p>Нет продуктов для отображения.</p>";
      return;
    }

    // Отображаем продукты
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-4", "mb-4");

      productCard.innerHTML = `
        <div class="card" data-product-id="${product.id}">
          <img src="${product.imageUrl || "/uploads/default-image.jpg"}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Цена: ${product.price} ₽</p>
            <p class="card-text stock-quantity">В наличии: ${product.stockQuantity}</p>
            <button class="add-to-cart btn btn-primary" data-product-id="${product.id}">Купить</button>
          </div>
        </div>
      `;

      productListContainer.appendChild(productCard);
    });

    // Обработчик клика по кнопке "Купить"
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        const productId = event.target.getAttribute("data-product-id");
        const quantity = 1;
        const token = localStorage.getItem("token");

        if (!productId) {
          console.error("Ошибка: productId не найден");
          return;
        }

        if (!token) {
          alert("Пожалуйста, авторизуйтесь для добавления товаров в корзину!");
          return;
        }

        try {
          const response = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ productId, quantity }),
          });

          const result = await response.json();

          if (!response.ok) {
            console.error('Ответ с ошибкой:', response.statusText);
            alert(`Ошибка при добавлении товара: ${result.message}`);
            return;
          }

          // Динамически обновляем количество товара на странице
          const card = event.target.closest(".card");
          const stockQuantityElement = card.querySelector(".stock-quantity");
          const currentStock = parseInt(stockQuantityElement.textContent.replace(/\D/g, ""));
          const newStock = currentStock - quantity;
          
          if (newStock <= 0) {
            stockQuantityElement.textContent = "Нет в наличии";
            event.target.disabled = true;
            event.target.textContent = "Товар закончился";
          } else {
            stockQuantityElement.textContent = `В наличии: ${newStock}`;
          }

          alert(`Товар добавлен в корзину!`);
        } catch (error) {
          console.error("Ошибка при добавлении товара:", error);
          alert(`Ошибка при добавлении товара: ${error.message}`);
        }
      });
    });

  } catch (error) {
    console.error("Ошибка при получении продуктов:", error);
    productListContainer.innerHTML = "<p>Произошла ошибка при загрузке продуктов.</p>";
  }
});
