  function filterProducts(brand) {
      const products = document.querySelectorAll(".product");
      products.forEach(p => {
        if (brand === "all" || p.classList.contains(brand)) {
          p.style.display = "block";
        } else {
          p.style.display = "none";
        }
      });

      // Đổi màu nút được chọn
      document.querySelectorAll(".brand-btn").forEach(btn => {
        btn.classList.remove("bg-pink-600", "text-white");
        btn.classList.add("bg-gray-200", "text-gray-700");
      });
      const activeBtn = event.target;
      activeBtn.classList.add("bg-pink-600", "text-white");
    }