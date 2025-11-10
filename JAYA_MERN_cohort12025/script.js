const tableBody = document.getElementById("productTableBody");
const form = document.getElementById("productForm");

let products = [];

// Fetch initial data
fetch("products.json")
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts();
  });

// Render product list
const renderProducts = () => {
  tableBody.innerHTML = "";
  products.forEach((p, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.category}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
        </td>
      </tr>
    `;
  });
};

// Add new product
form.addEventListener("submit", e => {
  e.preventDefault();
  const newProduct = {
    id: Date.now(),
    name: document.getElementById("name").value,
    price: parseFloat(document.getElementById("price").value),
    category: document.getElementById("category").value
  };
  products.push(newProduct);
  renderProducts();
  form.reset();
});

// Delete product
function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  renderProducts();
}
