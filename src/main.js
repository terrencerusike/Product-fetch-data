let main_shop = document.querySelector(".shop");

let basket = [];

let products = fetch("https://fakestoreapi.com/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })

  .then((data) => {
    const allprodutsHTML = data
      .map(function (item) {
        let { image, title, description, price, id } = item;

        let descriptions = description;
        if (descriptions.length > 100) {
          descriptions = description.substring(0, 100) + "...";
        }

        return `<div class="item" product-id="${id}">
      <img width="220" src="${image}" alt="${title}">
      <div class="details">
        <h3 data-product-title ="${title}">${title}</h3>
        <p class="description">${description}</p>
        <div class="price-quantity">
          <h2 class ="product-price" data-product-price="${price}">R${price}</h2>
          <div class="buttons">
            <i class="bi bi-dash-lg" data-product-id="${id}"></i>
            <div class="quantity">0</div>
            <i class="bi bi-plus-lg" data-product-id="${id}"></i>
          </div>
        </div>
      </div>
    </div>`;
      })
      .join("");

    main_shop.innerHTML = allprodutsHTML;
  })

  .catch((error) => console.error(`we have an ERROR ${error}`));

main_shop.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("bi-plus-lg") |
    e.target.classList.contains("bi-dash-lg")
  ) {
    let productID = e.target.getAttribute("data-product-id");
    let productTitle = e.target
      .closest(".item")
      .querySelector("h3")
      .getAttribute("data-product-title");
    let priceadd = parseFloat(
      e.target
        .closest(".item")
        .querySelector("h2")
        .getAttribute("data-product-price")
    );
    let priiice = e.target.closest(".item").querySelector(".product-price");

    let quantity_update = e.target.closest(".item").querySelector(".quantity");

    let count = parseInt(quantity_update.textContent);
    let totalcart = document.querySelector(".cartAmount");

    let i = (quantity_update.textContent = count + 1);

    let addall = priceadd * i;
    priiice.textContent = `R${addall.toFixed(2)}`;

    if (e.target.classList.contains("bi-plus-lg")) {
      quantity_update.textContent = count + 1;
    } else if (e.target.classList.contains("bi-dash-lg")) {
      if (count > 0) quantity_update.textContent = count - 1;
    }

    let basketfind = basket.find((bfind) => bfind.id === productID);

    if (basketfind) {
      basketfind.items++;
    } else {
      basket.push({
        id: productID,
        items: 1,
        title: productTitle,
      });
    }

    let sum = basket.reduce((acc, curr) => acc + curr.items, 0);
    totalcart.textContent = sum;
  }
});
