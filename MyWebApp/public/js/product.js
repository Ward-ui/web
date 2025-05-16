document.addEventListener("DOMContentLoaded", async () => {
  const productListContainer = document.getElementById("product-list");
  const categoryFilter = document.getElementById("category-filter");

  try {
    // Загрузка категорий
    const categoriesResponse = await fetch("http://localhost:3000/api/products/categories");
    if (!categoriesResponse.ok) throw new Error("Ошибка при загрузке категорий");
    const categories = await categoriesResponse.json();

    // Заполняем селектор категорий
    categoryFilter.innerHTML = `
      <option value="">Все категории</option>
      ${categories.map(category => `<option value="${category.id}">${category.name}</option>`).join("")}
    `;

    // Функция для загрузки продуктов
    const loadProducts = async (categoryId = "") => {
      const url = categoryId 
        ? `http://localhost:3000/api/products?categoryId=${categoryId}`
        : "http://localhost:3000/api/products";
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Ошибка при загрузке продуктов");
      const products = await response.json();

      if (products.length === 0) {
        productListContainer.innerHTML = "<p>Нет продуктов для отображения.</p>";
        return;
      }

      // Отображаем продукты
      productListContainer.innerHTML = products.map(product => `
        <div class="col-md-4 mb-4">
          <div class="card" data-product-id="${product.id}">
            <img src="${product.imageUrl || "/uploads/default-image.jpg"}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">${product.description}</p>
              <p class="card-text">Цена: ${product.price} ₽</p>
              <p class="card-text stock-quantity">В наличии: ${product.stockQuantity > 0 ? product.stockQuantity : "Нет в наличии"}</p>
              <button class="add-to-cart btn btn-primary" data-product-id="${product.id}" ${product.stockQuantity <= 0 ? "disabled" : ""}>
                ${product.stockQuantity > 0 ? "Купить" : "Товар закончился"}
              </button>
            </div>
          </div>
        </div>
      `).join("");

      // Добавляем обработчики кнопок "Купить"
      document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", handleAddToCart);
      });
    };

    // Обработчик добавления в корзину
    const handleAddToCart = async (event) => {
      const productId = event.target.getAttribute("data-product-id");
      const quantity = 1;
      const token = localStorage.getItem("token");

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
        if (!response.ok) throw new Error(result.message);

        // Обновляем количество товара на странице
        const card = event.target.closest(".card");
        const stockQuantityElement = card.querySelector(".stock-quantity");
        const currentStock = parseInt(stockQuantityElement.textContent.replace(/\D/g, "")) || 0;
        const newStock = currentStock - quantity;

        if (newStock <= 0) {
          stockQuantityElement.textContent = "Нет в наличии";
          event.target.disabled = true;
          event.target.textContent = "Товар закончился";
        } else {
          stockQuantityElement.textContent = `В наличии: ${newStock}`;
        }

        alert("Товар добавлен в корзину!");
      } catch (error) {
        console.error("Ошибка при добавлении товара:", error);
        alert(`Ошибка при добавлении товара: ${error.message}`);
      }
    };

    // Инициализация продуктов и категорий
    loadProducts();

    // Обработчик фильтрации по категориям
    categoryFilter.addEventListener("change", (e) => {
      loadProducts(e.target.value);
    });

  } catch (error) {
    console.error("Ошибка при загрузке продуктов или категорий:", error);
    productListContainer.innerHTML = "<p>Произошла ошибка при загрузке данных.</p>";
  }
});
