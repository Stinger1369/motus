const axios = require("axios");
const WallOfFame = require("../models/walloffame");

const sessionExists = async (userId) => {
  return await WallOfFame.findOne({ where: { login: userId } });
};

const endSession = async (sessionId) => {
  return await WallOfFame.destroy({ where: { id: sessionId } });
};

const createNewSession = async (userId, scores) => {
  return await WallOfFame.create({ login: userId, Scores: scores });
};

const startNewSession = async (userId, scores) => {
  const existingSession = await sessionExists(userId);

  if (existingSession) {
    await endSession(existingSession.id);
  }

  return await createNewSession(userId, scores);
};

const clearGameSession = (req) => {
  req.session.game = null;
};

exports.startGame = async (req, res) => {
  try {
    const userId = req.user.pseudo;

    clearGameSession(req); // Clear any existing game session

    const length = req.body.length || 5;
    console.log(`Requesting word with length: ${length}`);
    const response = await axios.get(
      `http://localhost:5001/generate-word?length=${length}`
    );
    console.log("Response from Flask API:", response.data);
    const word = response.data.word;

    req.session.game = {
      word: word,
      attempts: 0,
      maxAttempts: 6,
      hints: [],
    };

    await startNewSession(userId, 0); // Create a new session with an initial score of 0

    console.log("Session after starting game:", req.session.game);
    res.json({ message: "Game started", firstLetter: word[0], word: word });
  } catch (error) {
    console.error("Error starting game:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.startRandomGame = async (req, res) => {
  try {
    const userId = req.user.pseudo;

    clearGameSession(req); // Clear any existing game session

    const length = Math.floor(Math.random() * (15 - 3 + 1)) + 3; // Random number between 3 and 15
    console.log(`Requesting word with length: ${length}`);
    const response = await axios.get(
      `http://localhost:5001/generate-word?length=${length}`
    );
    console.log("Response from Flask API:", response.data);
    const word = response.data.word;

    req.session.game = {
      word: word,
      attempts: 0,
      maxAttempts: 6,
      hints: [],
    };

    await startNewSession(userId, 0); // Create a new session with an initial score of 0

    console.log("Session after starting game:", req.session.game);
    res.json({ message: "Game started", firstLetter: word[0], word: word });
  } catch (error) {
    console.error("Error starting random game:", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.guessWord = (req, res) => {
  const { guess } = req.body;
  const game = req.session.game;

  console.log("Session during guess:", req.session.game);
  console.log("User's guess:", guess);

  if (!game) {
    console.error("No active game found in session.");
    return res.status(400).json({ message: "No active game" });
  }

  if (game.attempts >= game.maxAttempts) {
    console.error("No attempts left.");
    return res.status(400).json({ message: "No attempts left" });
  }

  game.attempts += 1;
  const hints = generateHints(game.word, guess);
  game.hints.push({ guess, hints });

  if (guess === game.word) {
    console.log("User guessed the word correctly.");
    return res.json({
      message: "Congratulations! You guessed the word!",
      hints,
    });
  }

  if (game.attempts >= game.maxAttempts) {
    console.log("Game over. The word was:", game.word);
    return res.json({ message: `Game over. The word was ${game.word}`, hints });
  }

  console.log("User's guess was incorrect. Providing hints.");
  res.json({ message: "Try again", hints });
};

const generateHints = (word, guess) => {
  const wordArray = word.split("");
  const guessArray = guess.split("");
  const hints = [];

  const letterCount = wordArray.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
  }, {});

  console.log("Word array:", wordArray);
  console.log("Guess array:", guessArray);

  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === wordArray[i]) {
      hints.push({ letter: guessArray[i], status: "correct" });
      letterCount[guessArray[i]]--;
    } else if (
      wordArray.includes(guessArray[i]) &&
      letterCount[guessArray[i]] > 0
    ) {
      hints.push({ letter: guessArray[i], status: "misplaced" });
      letterCount[guessArray[i]]--;
    } else {
      hints.push({ letter: guessArray[i], status: "incorrect" });
    }
  }

  console.log("Generated hints:", hints);

  return hints;
};
