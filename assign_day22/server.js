require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

// Import user model (lowercase file name)
const User = require("./models/user");

// Passport configuration
const initializePassport = require("./config/passport");

// Auth middlewares
const { ensureAuthenticated, ensureAdmin } = require("./middleware/auth");

const app = express();

// ---------------------
// MongoDB CONNECTION
// ---------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ---------------------
// MIDDLEWARE
// ---------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport(passport);

// ---------------------
// ROUTES
// ---------------------

app.get("/", (req, res) => {
  res.send(`
    <h1>Day 22 — Form, Database, Authentication</h1>
    <p><a href="/register">Register</a> | <a href="/login">Login</a> | <a href="/admin">Admin</a></p>
  `);
});

// ---------------------
// REGISTER (Challenge 1)
// ---------------------

// Register form (HTML)
app.get("/register", (req, res) => {
  res.send(`
    <h2>Register</h2>
    <form method="POST" action="/register">
      <label>Name:</label><br/>
      <input type="text" name="name" required /><br/><br/>

      <label>Email:</label><br/>
      <input type="email" name="email" required /><br/><br/>

      <label>Password:</label><br/>
      <input type="password" name="password" required /><br/><br/>

      <label>Role (user/admin):</label><br/>
      <input type="text" name="role" value="user" /><br/><br/>

      <button type="submit">Register</button>
    </form>
  `);
});

// Handle register POST
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.send("User already exists!");
    }

    const user = new User({
      name,
      email,
      password,
      role: role === "admin" ? "admin" : "user",
    });

    const savedUser = await user.save();

    console.log("User saved:", savedUser);

    res.send(`Registration successful for ${name}`);
  } catch (err) {
    res.status(500).send("Error saving user");
  }
});

// ---------------------
// LOGIN (Passport Auth)
// ---------------------

app.get("/login", (req, res) => {
  res.send(`
    <h2>Login</h2>
    <form method="POST" action="/login">
      <label>Email:</label><br/>
      <input type="email" name="email" required /><br/><br/>

      <label>Password:</label><br/>
      <input type="password" name="password" required /><br/><br/>

      <button type="submit">Login</button>
    </form>
  `);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login-failed",
  })
);

app.get("/login-failed", (req, res) => {
  res.send("Login failed: invalid credentials");
});

// ---------------------
// DASHBOARD (Logged-in users only)
// ---------------------
app.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.send(`
    <h2>Dashboard</h2>
    <p>Hello, ${req.user.name} (${req.user.role})</p>
    <p><a href="/admin">Go to Admin</a> | <a href="/logout">Logout</a></p>
  `);
});

// ---------------------
// ADMIN PAGE (Admins only)
// ---------------------
app.get("/admin", ensureAuthenticated, ensureAdmin, (req, res) => {
  res.send("Welcome, Admin!");
});

// ---------------------
// LOGOUT
// ---------------------
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

// ---------------------
// START SERVER
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
