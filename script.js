const storeLayout = document.querySelector(".store-layout");
const itemsContainer = document.querySelector("#items");
const totalDisplay = document.querySelector("#total");
const counter = document.querySelector("#count");

const products = [
  {
    id: 0,
    image: "https://bausi.co/wp-content/uploads/2024/03/80668367-1.jpg",
    precio: 45,
  },
  {
    id: 1,
    image:
      "https://cdn.koaj.co/194503-big_default/camiseta-oversize-para-hombre-con-estampado-frente-y-espalda-urbana.jpg",
    precio: 45,
  },
  {
    id: 2,
    image:
      "https://chillcolombia.co/cdn/shop/files/IMG_3506.jpg?v=1730648823&width=720",
    precio: 45,
  },
  {
    id: 3,
    image:
      "https://chillcolombia.co/cdn/shop/files/69A4274.jpg?v=1726775227&width=720",
    precio: 45,
  },
];

let carrito = [];

function renderProducts() {
  for (let i = 0; i < products.length; i++) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
      <img src="${products[i].image}" alt="${products[i].id}">
      <div class="product-description">
        <p>Precio: $ ${products[i].precio}</p>
        <button class="addCart" data-id="${products[i].id}">Agregar al carrito</button>
      </div>
    `;
    storeLayout.appendChild(productDiv);
  }

  
  const buttons = document.querySelectorAll(".addCart");
  buttons.forEach((button) => {
    button.addEventListener("click", addToCart); 
  });
}

function addToCart(e) {
  const productId = e.target.getAttribute("data-id");
  const product = products.find((p) => p.id == productId);

  
  const productInCart = carrito.find((item) => item.id == product.id);
  if (productInCart) {
  
    productInCart.quantity += 1;
  } else {
  
    carrito.push({ ...product, quantity: 1 });
  }

  updateCart(); 
}


function updateCart() {

  counter.textContent = carrito.length;


  let total = 0;
  carrito.forEach((item) => {
    total += item.precio * item.quantity;
  });

  totalDisplay.textContent = `$${total.toFixed(2)}`;

  renderCartItems(); // Actualizamos los productos en el carrito visible
}


function renderCartItems() {
  itemsContainer.innerHTML = ""; // Limpiar el contenido actual del carrito

  if (carrito.length === 0) {
    itemsContainer.textContent = "Su carrito está vacío";
    return;
  }

  // Crear una lista <ul> para los productos en el carrito
  const cartList = document.createElement("ul");
  cartList.classList.add("cart-list");

  carrito.forEach((item) => {
    // Crear un elemento de lista <li> por cada producto en el carrito
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.id}" class="cart-item-image">
      <div class="cart-item-description">
        <p>Precio: $${item.precio} x ${item.quantity}</p>
      </div>
    `;
    cartList.appendChild(cartItem);
  });

  // Añadir la lista al contenedor de carrito
  itemsContainer.appendChild(cartList);
}


// Inicializar la tienda renderizando los productos
renderProducts();
