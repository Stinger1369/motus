const Mots = require("../models/mots");

exports.createWord = async (req, res) => {
  try {
    const word = await Mots.create(req.body);
    res.status(201).json(word);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWord = async (req, res) => {
  try {
    const word = await Mots.findByPk(req.params.id);
    if (word) {
      res.status(200).json(word);
    } else {
      res.status(404).json({ message: "Word not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
