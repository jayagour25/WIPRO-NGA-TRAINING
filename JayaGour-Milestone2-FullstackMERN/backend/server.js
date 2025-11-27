const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const filePath = path.join(__dirname, "products.json");

function readProducts() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeProducts(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

app.get("/products", (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get("/products/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const products = readProducts();
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch {
    res.status(500).json({ message: "Error fetching product" });
  }
});

app.post("/products", (req, res) => {
  try {
    const { name, price, category, description } = req.body;

    if (!name || !price || !category || !description) {
      return res.status(400).json({ message: "All fields required" });
    }

    const products = readProducts();
    const newId = products.length ? products[products.length - 1].id + 1 : 1;

    const newProduct = {
      id: newId,
      name,
      price: Number(price),
      category,
      description
    };

    products.push(newProduct);
    writeProducts(products);

    res.status(201).json(newProduct);
  } catch {
    res.status(500).json({ message: "Error adding product" });
  }
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
