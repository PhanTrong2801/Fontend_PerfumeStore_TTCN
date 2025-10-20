document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productEl = btn.closest(".product");
      const product = {
        id: productEl.dataset.id,
        name: productEl.dataset.name,
        price: productEl.dataset.price,
        description: productEl.dataset.description,
        image: productEl.dataset.image,
        quantity: 1,
      };
      addToCart(product);
    });
  });

  renderCart();
});