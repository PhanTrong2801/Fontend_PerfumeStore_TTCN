
  function openModal(title, description) {
    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("productModal").classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("productModal").classList.add("hidden");
  }
