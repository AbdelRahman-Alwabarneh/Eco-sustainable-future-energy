const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  targetEnergy: {
    type: Number,
    required: true,
  },
  currentEnergy: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "completed", "upcoming"],
    default: "upcoming",
  },
  delete: {
    type: Boolean,
    default: false, // Indicates if the challenge is deleted (soft delete)
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Challenge =
  mongoose.models.Challenges || mongoose.model("Challenges", challengeSchema);

module.exports = Challenge;
