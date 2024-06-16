const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const cors = require("cors");
const sequelize = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const wallOfFameRoutes = require("./routes/wallOfFameRoutes");
const motsRoutes = require("./routes/motsRoutes");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const authenticateJWT = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

// Configuration du client Redis
const redis = require("redis");
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});
redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.connect().catch(console.error);

// Configurer CORS pour autoriser les requêtes avec les informations d'identification
const corsOptions = {
  origin: "http://localhost:3001", // Remplacez par l'origine de votre client
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Configuration du store Redis pour les sessions
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set secure to false if not using HTTPS
  })
);

app.use("/api/auth", authRoutes);

// Déplacer la route de création d'utilisateur avant d'appliquer authenticateJWT
app.post("/api/users", require("./controllers/userController").createUser);

// Appliquer authenticateJWT pour les autres routes utilisateur
app.use("/api/users", authenticateJWT, userRoutes);
app.use("/api/walloffame", authenticateJWT, wallOfFameRoutes);
app.use("/api/mots", authenticateJWT, motsRoutes); // Assurez-vous que cette ligne est présente
app.use("/api/game", authenticateJWT, gameRoutes);

// Middleware pour vérifier la session
app.use((req, res, next) => {
  console.log("Session:", req.session);
  next();
});

// Sync database
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Database sync error:", err));

module.exports = app;
