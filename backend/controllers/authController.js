const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { pseudo, password } = req.body;
    const user = await User.findOne({ where: { pseudo } });

    if (!user || !(await user.validPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, id: user.id, pseudo: user.pseudo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserFromToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};

exports.getMe = (req, res) => {
  if (req.user) {
    res.json({ id: req.user.id, pseudo: req.user.pseudo });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
