window.onload = async function() {
    const response = await fetch('/api/products');
    const products = await response.json();
  
    const productsList = document.getElementById('products-list');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.textContent = product.name + ' - $' + product.price;
      productsList.appendChild(productElement);
    });
  };
  