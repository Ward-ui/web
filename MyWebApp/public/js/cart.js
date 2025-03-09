document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cartItems");
    const totalPriceElement = document.getElementById("totalPrice");
    const clearCartButton = document.getElementById("clearCart");
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    function updateCart() {
      // Очистка контейнера корзины
      cartItemsContainer.innerHTML = "";
  
      let totalPrice = 0;
  
      cart.forEach((item, index) => {
        totalPrice += item.price * item.quantity;
  
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center");
        cartItem.innerHTML = `
          <div>
            <h5>${item.name}</h5>
            <p>Цена: ${item.price} руб. | Количество: ${item.quantity}</p>
          </div>
          <button class="btn btn-danger" onclick="removeItem(${index})">Удалить</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
  
      totalPriceElement.textContent = `${totalPrice} руб.`;
  
      // Обновление корзины в localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  
    // Удаление элемента из корзины
    function removeItem(index) {
      cart.splice(index, 1);
      updateCart();
    }
  
    // Очистка всей корзины
    clearCartButton.addEventListener("click", () => {
      cart = [];
      updateCart();
    });
  
    // Оформление заказа
    document.getElementById("checkout").addEventListener("click", () => {
      if (cart.length > 0) {
        alert("Оформление заказа...");
        // Здесь можно добавить логику оформления заказа
      } else {
        alert("Корзина пуста!");
      }
    });
  
    // Инициализация корзины
    updateCart();
  });
  