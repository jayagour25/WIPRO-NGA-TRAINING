const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const USER = { email: "admin@test.com", password: "12345" };
const SECRET = "mysecretkey";

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email !== USER.email || password !== USER.password)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token missing" });

  jwt.verify(token, SECRET, (err) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    next();
  });
}

// Protected Route
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to dashboard" });
});

app.listen(5000, () => console.log("Auth server running on 5000"));
