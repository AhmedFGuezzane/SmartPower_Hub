require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const devicesRoutes = require('./routes/devices');
const authRoutes = require("./routes/auth");
const app = express();

// Ici on definit le port comment etant celui dans le fichier .env
// Si il n'y en a pas, ce sera le port 3000
const PORT = process.env.PORT || 3000;

// Ici, on lance la connection avec mongoose et on affiche l'etat dans la console 
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

  mongoose.connection.once("open", () => {
    console.log("✅ MongoDB connected to DB:", mongoose.connection.name);
  });
  
// Middleware
app.use(cors());
app.use(express.json()); // Ce qui nous permet de communiquer entre le server qui est sur le port 3000 et le client qui est sur le port 5173
app.use('/api/devices', devicesRoutes);
app.use("/api/auth", authRoutes);

// Ici, on lance le server 
app.listen(PORT, () => {
  console.log(`✅ Server running on : http://localhost:${PORT}`);
});
