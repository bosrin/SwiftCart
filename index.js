const productContainer = document.getElementById("product-container");
const categoryContainer = document.getElementById("category-container");
const productModal = document.getElementById("productModal");


//  DROPDOWN TOGGLE
function toggleDropdown() {
  const dropdown = document.getElementById("productsDropdown");
  dropdown.classList.toggle("hidden");
}

// Click outside - close dropdown
window.addEventListener("click", function (e) {
  const dropdown = document.getElementById("productsDropdown");
  if (!e.target.closest(".relative")) {
    dropdown.classList.add("hidden");
  }
});


//  LOAD ALL PRODUCTS 
function loadAllProducts() {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => displayProducts(data));
}


// DISPLAY PRODUCTS 
function displayProducts(products) {

  productContainer.innerHTML = "";

  products.forEach(product => {

    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-lg shadow";

    div.innerHTML = `
      <div class="h-48 flex items-center justify-center bg-gray-100 rounded">
        <img src="${product.image}" class="h-40 object-contain">
      </div>

      <div class="mt-4">
        <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded capitalize">
          ${product.category}
        </span>

        <h3 class="font-semibold mt-2 text-sm">
          ${product.title.slice(0, 40)}...
        </h3>

        <p class="font-bold mt-2">$${product.price}</p>

        <div class="flex gap-2 mt-3">
          <button onclick="loadSingleProduct(${product.id})"
            class="border px-3 py-1 text-sm rounded w-full">
            Details
          </button>

          <button class="bg-indigo-600 text-white px-3 py-1 text-sm rounded w-full">
            Add
          </button>
        </div>
      </div>
    `;

    productContainer.appendChild(div);
  });
}


//  LOAD CATEGORIES 
function loadCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(categories => {

      categoryContainer.innerHTML = "";

      categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.innerText = cat;
        btn.className = "hover:text-indigo-600 capitalize";

        btn.addEventListener("click", function () {
          loadCategoryProducts(cat);
        });

        categoryContainer.appendChild(btn);
      });

    });
}


//  LOAD CATEGORY PRODUCTS 
function loadCategoryProducts(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    .then(res => res.json())
    .then(data => displayProducts(data));
}


//  LOAD SINGLE PRODUCT 
function loadSingleProduct(id) {

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {

      document.getElementById("modal-content").innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
          <img src="${product.image}" class="h-60 object-contain mx-auto">

          <div>
            <h2 class="text-xl font-bold mb-2">${product.title}</h2>
            <p class="text-gray-500 text-sm mb-3">${product.description}</p>
            <p class="font-bold text-lg">$${product.price}</p>
            <p class="text-yellow-500 mt-2">
              ⭐ ${product.rating.rate} (${product.rating.count})
            </p>
          </div>
        </div>
      `;

      productModal.showModal();
    });
}


//  INITIAL LOAD 
loadAllProducts();
loadCategories();
