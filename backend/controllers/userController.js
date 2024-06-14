const User = require("../models/user");

exports.createUser = async (req, res) => {
  console.log("Received data:", req.body); // Log the received data
  try {
    const { pseudo, password, numero_secu } = req.body;

    // Validation des données
    if (!pseudo || !password || !numero_secu) {
      console.log("Validation failed:", { pseudo, password, numero_secu }); // Log the validation failure
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.create({ pseudo, password, numero_secu });
    res.status(201).json(user);
  } catch (error) {
    console.error("Create user error:", error); // Log the error
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
