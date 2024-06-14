const express = require("express");
const router = express.Router();
const motsController = require("../controllers/motsController");

router.post("/mots", motsController.createWord);
router.get("/mots/:id", motsController.getWord);

module.exports = router;
