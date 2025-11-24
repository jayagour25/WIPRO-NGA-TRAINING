let users = require("../data/usersData");

exports.getAllUsers = (req, res) => {
  return res.status(200).json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name,
    email
  };

  users.push(newUser);
  return res.status(201).json(newUser);
};

// For tests, we can reset the array
exports._resetUsers = () => {
  users = require("../data/usersData");
};
