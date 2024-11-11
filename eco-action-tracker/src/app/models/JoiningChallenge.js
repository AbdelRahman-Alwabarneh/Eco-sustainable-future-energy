const mongoose = require("mongoose");

// Define the joiningChallenge schema
const joiningChallengeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenges",
    required: true,
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
  },
  status: {
    type: String,
    enum: ["inProgress", "completed", "expired"],
    default: "inProgress",
  },
  avgProgress: {
    type: Number,
    default: 0,
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

const JoiningChallenge =
  mongoose.models.JoiningChallenge ||
  mongoose.model("JoiningChallenge", joiningChallengeSchema);

module.exports = JoiningChallenge;
