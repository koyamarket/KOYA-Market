document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
  
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <p>${product.description}</p>
        <a href="${product.amazonUrl}" target="_blank" class="btn">Buy Now</a>
      `;
  
      productsContainer.appendChild(productCard);
    });
  });