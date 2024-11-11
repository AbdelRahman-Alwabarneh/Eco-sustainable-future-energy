const mongoose = require("mongoose");

const energyLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bikes",
    required: false,
  },
  energyGenerated: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  currentSpeed: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  associatedChallenge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenges",
  },
});

module.exports =
  mongoose.models.EnergyLog || mongoose.model("EnergyLog", energyLogSchema);
