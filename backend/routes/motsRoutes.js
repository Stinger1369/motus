const express = require("express");
const router = express.Router();
const motsController = require("../controllers/motsController");

router.post("/mots", motsController.createWord);
router.get("/mots/:id", motsController.getWord);
router.get("/user/:id", motsController.getWordsByUser); // Nouvelle route pour récupérer les mots par utilisateur

module.exports = router;
