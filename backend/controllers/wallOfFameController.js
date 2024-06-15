const WallOfFame = require("../models/walloffame");
const User = require("../models/user");
const { Op } = require("sequelize");

const sessionExists = async (userId) => {
  return await WallOfFame.findOne({ where: { login: userId } });
};

const endSession = async (sessionId) => {
  return await WallOfFame.destroy({ where: { id: sessionId } });
};

const createNewSession = async (userId, scores) => {
  return await WallOfFame.create({ login: userId, Scores: scores });
};

const startNewSession = async (req, res) => {
  try {
    const userId = req.user.pseudo;
    const existingSession = await sessionExists(userId);

    if (existingSession) {
      await endSession(existingSession.id);
    }

    const newSession = await createNewSession(userId, req.body.Scores);
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
    const leaderboard = await WallOfFame.findAll({
      include: {
        model: User,
        attributes: ["pseudo"],
      },
      attributes: [
        "login",
        [sequelize.fn("SUM", sequelize.col("Scores")), "totalScore"],
      ],
      group: ["login"],
      order: [[sequelize.literal("totalScore"), "DESC"]],
    });

    const leaderboardWithPseudo = leaderboard.map((entry) => ({
      pseudo: entry.User.pseudo,
      totalScore: entry.dataValues.totalScore,
    }));

    res.status(200).json(leaderboardWithPseudo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
