document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
  
    products.forEach(product => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
  
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        <p>
            ${product.description.substring(0, 100)}...
            <span class="hidden-content" id="content-${product.id}">${product.description.substring(100)}</span>
            <a class="read-more" onclick="toggleContent(${product.id})">Read More</a>
        </p>
        <a href="booking.html?id=${product.id}" class="btn">Book Now</a>`;

  
      productsContainer.appendChild(productCard);
    });
  });


  // SetUp For Read More and Read Less
  function toggleContent(productId) {
    let content = document.getElementById(`content-${productId}`);
    let link = content.nextElementSibling;

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "inline";
        link.innerText = "Read Less";
    } else {
        content.style.display = "none";
        link.innerText = "Read More";
    }
}
