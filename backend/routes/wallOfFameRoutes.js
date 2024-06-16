const express = require("express");
const router = express.Router();
const wallOfFameController = require("../controllers/wallOfFameController");
const authenticateJWT = require("../middleware/authMiddleware");

router.post("/", authenticateJWT, wallOfFameController.createEntry);
router.get(
  "/winninggames",
  authenticateJWT,
  wallOfFameController.getWinningGames
);
router.get("/:id", authenticateJWT, wallOfFameController.getEntry);
router.get("/", authenticateJWT, wallOfFameController.getLeaderboard);

module.exports = router;
