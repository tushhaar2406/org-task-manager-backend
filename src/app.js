import express from "express";
import sequelize from "./config/db.js";
import "./models/index.js"; // loads models and relations

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task Management API running 🚀");
});

// Sync models and start server
sequelize.sync({ alter: true }) // use { force: true } for full reset
  .then(() => {
    console.log("✅ Database synced successfully!");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("❌ Database connection failed:", err));
