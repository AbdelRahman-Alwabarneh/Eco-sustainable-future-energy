const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  targetEnergy: {
    type: Number,
    required: true,
  },
  progress: {
    type: Number,
    default: 0,
  },
  isDeleted: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: ["Active", "Completed", "Expired"],
    default: "Active",
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Goal = mongoose.models.Goals || mongoose.model("Goals", goalSchema);

module.exports = Goal;
