// --- CART SYSTEM AROMIEE ---

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert(`✅ Đã thêm "${product.name}" vào giỏ hàng!`);
  updateCartCount();
}

function removeFromCart(index) {
  const cart = getCart();
  if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartCount();
  }
}

function changeQuantity(index, delta) {
  const cart = getCart();
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  saveCart(cart);
  renderCart();
  updateCartCount();
}

// Cập nhật hiển thị số lượng nhỏ trên icon giỏ hàng
function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const cartIcons = document.querySelectorAll(".fa-cart-shopping");
  cartIcons.forEach((icon) => {
    let badge = icon.parentElement.querySelector(".cart-count");
    if (!badge) {
      badge = document.createElement("span");
      badge.className =
        "cart-count absolute -top-2 -right-3 bg-pink-600 text-white text-xs rounded-full px-1.5";
      icon.parentElement.style.position = "relative";
      icon.parentElement.appendChild(badge);
    }
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline" : "none";
  });
}

// Render giỏ hàng trong trang cart.html
function renderCart() {
  const tbody = document.getElementById("cart-items");
  const totalElement = document.querySelector(".text-pink-600");
  if (!tbody) return;

  const cart = getCart();
  tbody.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    tbody.innerHTML =
      `<tr><td colspan="5" class="text-center py-10 text-gray-500">🛒 Giỏ hàng trống!</td></tr>`;
  } else {
    cart.forEach((item, i) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      const row = document.createElement("tr");
      row.className = "border-b hover:bg-gray-50 transition";
      row.innerHTML = `
        <td class="flex items-center gap-4 py-4">
          <img src="${item.image}" class="w-16 h-16 rounded-lg object-cover" />
          <div><h3 class="font-semibold">${item.name}</h3></div>
        </td>
        <td class="text-center text-pink-600 font-semibold">${item.price.toLocaleString()}₫</td>
        <td class="text-center">
          <div class="flex justify-center items-center">
            <button class="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300" onclick="changeQuantity(${i}, -1)">-</button>
            <span class="px-3">${item.quantity}</span>
            <button class="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300" onclick="changeQuantity(${i}, 1)">+</button>
          </div>
        </td>
        <td class="text-center font-bold text-gray-800">${subtotal.toLocaleString()}₫</td>
        <td class="text-center">
          <button class="text-red-500 hover:text-red-700" onclick="removeFromCart(${i})"><i class="fa-solid fa-trash"></i></button>
        </td>`;
      tbody.appendChild(row);
    });
  }

  totalElement.textContent = total.toLocaleString() + "₫";
}

// Khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  // Gán sự kiện "Thêm vào giỏ hàng"
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = btn.closest(".product");
      const product = {
        id: p.dataset.id,
        name: p.dataset.name,
        price: parseInt(p.dataset.price),
        image: p.dataset.image,
      };
      addToCart(product);
    });
  });

  // Render giỏ hàng nếu đang ở cart.html
  renderCart();
  updateCartCount();
});