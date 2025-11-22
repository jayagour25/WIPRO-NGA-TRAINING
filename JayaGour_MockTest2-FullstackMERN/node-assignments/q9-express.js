const express = require("express");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

const app = express();

// Enable CORS so React (port 3000) can call this API (port 4000)
app.use(cors());
app.use(express.json());

// Global middleware: log method + URL
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// USERS API (for Q4 React UserDetails)

const USERS = {
  1: { id: 1, name: "John Doe", email: "john@test.com" },
  2: { id: 2, name: "Alice", email: "alice@test.com" },
  3: { id: 3, name: "Bob", email: "bob@test.com" }
};

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = USERS[id];

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  return res.json(user);
});

//PRODUCTS API (Q9 requirement)

app.get("/products", (req, res) => {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Keyboard", price: 2000 }
  ];
  res.json(products);
});

app.post(
  "/products",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isNumeric().withMessage("Price must be a number")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.json({
      message: "Product added successfully",
      data: req.body
    });
  }
);

//Start server

app.listen(4000, () => {
  console.log("Backend API running at http://localhost:4000");
});
