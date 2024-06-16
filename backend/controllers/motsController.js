const Mots = require("../models/mots");

exports.createWord = async (req, res) => {
  try {
    const { word, longueur, difficulté, userId } = req.body;
    const newWord = await Mots.create({ word, longueur, difficulté, userId });
    res.status(201).json(newWord);
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

exports.getWordsByUser = async (req, res) => {
  try {
    const words = await Mots.findAll({ where: { userId: req.params.id } });
    res.status(200).json(words);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
