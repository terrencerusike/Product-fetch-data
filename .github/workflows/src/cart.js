let basket = JSON.parse(localStorage.getItem("data")) || []

function updateCartTotal() {
  let totalItems = basket.reduce((total, item) => total + item.item, 0);
  let totalcart = document.querySelector(".cartAmount");
  if (totalcart) {
    totalcart.innerHTML = totalItems;
  }
}

updateCartTotal();