const WallOfFame = require("../models/walloffame");
const User = require("../models/user");

exports.createEntry = async (req, res) => {
  try {
    const entry = await WallOfFame.create(req.body);
    res.status(201).json(entry);
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
