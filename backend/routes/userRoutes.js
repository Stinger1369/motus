const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateJWT = require("../middleware/authMiddleware");

// Route pour créer un utilisateur (sans authentification)
router.post("/", userController.createUser);

// Routes nécessitant une authentification
router.get("/:id", authenticateJWT, userController.getUser);
router.get("/", authenticateJWT, userController.getAllUsers);

module.exports = router;
