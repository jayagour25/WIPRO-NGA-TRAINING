const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

const DATA_FILE = "./products.json";

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/products", (req, res) => {
  try {
    res.json(readData());
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const products = readData();
  const item = products.find((p) => p.id === id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

app.post("/products", (req, res) => {
  const products = readData();
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

app.listen(5000, () => console.log("Backend running on port 5000"));
