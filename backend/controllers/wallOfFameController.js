// controllers/walloffameController.js
const WallOfFame = require("../models/walloffame");
const User = require("../models/user");
const Mots = require("../models/mots");
const { Op } = require("sequelize");

const sessionExists = async (userId) => {
  return await WallOfFame.findOne({ where: { login: userId } });
};

const endSession = async (sessionId) => {
  return await WallOfFame.destroy({ where: { id: sessionId } });
};

const createNewSession = async (userId, scores, seconds) => {
  return await WallOfFame.create({
    login: userId,
    Scores: scores,
    seconds: seconds,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const startNewSession = async (req, res) => {
  try {
    const userId = req.user.pseudo;
    const { Scores, seconds } = req.body;
    const existingSession = await sessionExists(userId);

    if (existingSession) {
      await endSession(existingSession.id);
    }

    const newSession = await createNewSession(userId, Scores, seconds);
    res.status(201).json(newSession);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createEntry = async (req, res) => {
  try {
    await startNewSession(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEntry = async (req, res) => {
  try {
    const entry = await WallOfFame.findByPk(req.params.id);
    if (entry) {
      res.status(200).json(entry);
    } else {
      res.status(404).json({ message: "Entry not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.findAll({
      attributes: ["pseudo", "totalScore"],
      order: [["totalScore", "DESC"]],
    });

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getWinningGames = async (req, res) => {
  try {
    const winningGames = await WallOfFame.findAll({
      where: {
        Scores: {
          [Op.gt]: 0,
        },
      },
      order: [["seconds", "ASC"]],
      limit: 10,
    });

    const gamesWithDetails = await Promise.all(
      winningGames.map(async (game) => {
        const user = await User.findOne({ where: { pseudo: game.login } });
        const mots = await Mots.findOne({
          where: { userId: user.id, createdAt: game.createdAt },
        });
        return {
          pseudo: user.pseudo,
          score: game.Scores,
          seconds: game.seconds,
          wordLength: mots.longueur,
          moves: calculateMoves(game.Scores), // Assuming you have logic to calculate moves from scores
        };
      })
    );

    res.status(200).json(gamesWithDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Placeholder function for calculating moves from score
const calculateMoves = (score) => {
  // Implement your logic to calculate moves
  return 3;
};
