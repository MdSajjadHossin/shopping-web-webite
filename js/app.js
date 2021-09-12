const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const images = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product my-4 mx-2">
      <div>
    <img class="product-image" src=${images}></img>
      </div>
      <h3 class="fs-5">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Total Submitted Rating:${product.rating.count}</p>
      <p>Average Rating: ${product.rating.rate} </p>
      <h2 class="fs-5">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="showDetails(${product.description})" id="details-btn" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
//product details
const showDetails = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const images = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product my-4 mx-2">
      <div>
    <img class="product-image" src=${images}></img>
      </div>
      <h3 class="fs-5">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <p>Category: ${product.description}</p>
      `;
    document.getElementById("product-details").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    const deliveryCharge =  setInnerText("delivery-charge", 30);
    const totalTax =  setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
    const extraCost = deliveryCharge + totalTax;
  }
  if (priceConverted > 400) {
    const deliveryCharge = setInnerText("delivery-charge", 50);
    const totalTax =  setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
    const extraCost = deliveryCharge + totalTax;
  }
  if (priceConverted > 500) {
    const deliveryCharge = setInnerText("delivery-charge", 60);
    const totalTax =  setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
    const extraCost = deliveryCharge + totalTax;
  }
};

//grandTotal update function
const updateTotal = (extraCost) => {
  const grandTotal = total + extraCost;
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
loadProducts();