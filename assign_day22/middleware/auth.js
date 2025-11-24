function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Access Denied: Please log in.");
}

function ensureAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  res.status(403).send("Access Denied: Admins only.");
}

module.exports = { ensureAuthenticated, ensureAdmin };
