const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const authenticateJWT = require("../middleware/authMiddleware");

router.post("/start", authenticateJWT, gameController.startGame);
router.post("/guess", authenticateJWT, gameController.guessWord);
router.post("/end", authenticateJWT, gameController.endGame);


module.exports = router;
