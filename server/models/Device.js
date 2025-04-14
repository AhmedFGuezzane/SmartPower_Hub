const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  brand: String,
  type: String,
  category: String,
  energyLabel: String,
  description: String,
  averageConsumption: {
    dailyKWh: Number,
    monthlyKWh: Number,
    annualKWh: Number,
  },
  powerRating: {
    minWatts: Number,
    maxWatts: Number,
  },
  standbyConsumption: Number,
}, {
  collection: "devices" // Pour s'assurer qu'on travaille bien sur la collection devices 
});

module.exports = mongoose.model("Device", deviceSchema);
