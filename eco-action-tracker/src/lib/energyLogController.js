const EnergyLog = require("@/app/models/EnergyLog");
const Challenge = require("@/app/models/Challenge");
const User = require("@/app/models/User");
import jwt from "jsonwebtoken";

const getRandomPoints = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const updateCurrentEnergy = async (challengeId, userId) => {
  try {
    const energyLogs = await EnergyLog.find({
      associatedChallenge: challengeId,
    });

    const totalEnergyGenerated = energyLogs.reduce((total, log) => {
      return total + log.energyGenerated;
    }, 0);

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { currentEnergy: totalEnergyGenerated },
      { new: true }
    );

    if (!updatedChallenge) {
      console.error(`Challenge not found for ID ${challengeId}`);
      return;
    }

    console.log(
      `Current energy updated for challenge ID ${challengeId}: ${totalEnergyGenerated}`
    );

    await updateProgress(challengeId, userId); // Pass userId here
  } catch (error) {
    console.error(
      `Error updating current energy for challenge ID ${challengeId}:`,
      error.message
    );
  }
};

const updateProgress = async (challengeId, userId) => {
  try {
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      console.error(`Challenge not found for ID ${challengeId}`);
      return;
    }

    const { currentEnergy, targetEnergy } = challenge;

    console.log(`Calculating progress for challenge ID ${challengeId}:`);
    console.log(
      `Current Energy: ${currentEnergy}, Target Energy: ${targetEnergy}`
    );

    if (targetEnergy === 0) {
      console.warn(
        `Target energy is zero for challenge ID ${challengeId}. Setting progress to 0.`
      );
      await Challenge.findByIdAndUpdate(
        challengeId,
        { progress: 0 },
        { new: true }
      );
      return;
    }

    const progress = (currentEnergy / targetEnergy) * 100;

    console.log(`Progress calculated: ${progress}%`);

    let status = challenge.status;

    console.log(`User ID for challenge ${challengeId}: ${userId}`);

    if (currentEnergy >= targetEnergy) {
      status = "completed";

      const randomPoints = getRandomPoints(10, 40);
      const userUpdate = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { completedChallenges: challengeId },
          $inc: { points: randomPoints },
        },
        { new: true }
      );

      if (userUpdate) {
        console.log(
          `Challenge ID ${challengeId} added to user's completedChallenges and awarded ${randomPoints} points.`
        );
      } else {
        console.error(`Failed to update user for ID ${userId}`);
      }
    }

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { progress, status },
      { new: true }
    );

    if (updatedChallenge) {
      console.log(
        `Progress and status updated for challenge ID ${challengeId}: ${updatedChallenge.progress}, Status: ${updatedChallenge.status}`
      );
    } else {
      console.error(`Failed to update challenge status for ID ${challengeId}`);
    }

    if (updatedChallenge.status === "completed") {
      console.log(`Challenge ID ${challengeId} is now marked as completed.`);
    } else {
      console.log(
        `Challenge ID ${challengeId} status is still ${updatedChallenge.status}.`
      );
    }
  } catch (error) {
    console.error(
      `Error updating progress for challenge ID ${challengeId}:`,
      error.message
    );
  }
};

const updateTotalCO2Reduction = async (userId) => {
  try {
    const energyLogs = await EnergyLog.find({ userId });

    const totalEnergyGenerated = energyLogs.reduce((total, log) => {
      return total + log.energyGenerated;
    }, 0);

    const CO2ReductionPercentage = totalEnergyGenerated * 0.12;

    await User.findByIdAndUpdate(
      userId,
      { totalCO2Reduction: CO2ReductionPercentage },
      { new: true }
    );

    console.log(
      `Updated total CO2 reduction for user ${userId}: ${CO2ReductionPercentage.toFixed(
        2
      )}%`
    );
  } catch (error) {
    console.error(
      `Error updating CO2 reduction for user ID ${userId}:`,
      error.message
    );
  }
};

const createEnergyLog = async (energyLogData, userId) => {
  try {
    const challenge = await Challenge.findById(
      energyLogData.associatedChallenge
    );
    if (!challenge) {
      console.error(
        `Challenge not found for ID ${energyLogData.associatedChallenge}`
      );
      throw new Error(
        `Challenge not found for ID ${energyLogData.associatedChallenge}`
      );
    }

    if (challenge.status === "completed") {
      console.log(
        `Challenge ID ${energyLogData.associatedChallenge} is already completed. No new energy log will be added.`
      );
      throw new Error(
        `Challenge is already completed. No new energy log will be added.`
      );
    }

    const energyLog = new EnergyLog({
      ...energyLogData,
      bikeId: energyLogData.bikeId || null,
    });

    const savedLog = await energyLog.save();

    console.log(`Energy log saved: ${savedLog}`);

    await updateCurrentEnergy(savedLog.associatedChallenge, userId);
    await updateTotalCO2Reduction(userId);

    return savedLog;
  } catch (error) {
    console.error(`Error creating energy log: ${error.message}`);
    throw new Error(`Error creating energy log: ${error.message}`);
  }
};

const getTotalEnergyGenerated = async (req) => {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader ? authHeader.split(" ")[1] : null;

  let userId;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      userId = decoded.id;
    } catch (error) {
      return new Response(JSON.stringify({ message: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } else {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const energyLogs = await EnergyLog.find({ userId });
    const totalEnergyGenerated = energyLogs.reduce((total, log) => {
      return total + log.energyGenerated;
    }, 0);

    return new Response(JSON.stringify({ totalEnergyGenerated }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      `Error retrieving energy generated for user ID ${userId}:`,
      error.message
    );
    return new Response(JSON.stringify({ message: "Error retrieving data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

module.exports = {
  createEnergyLog,
  updateCurrentEnergy,
  updateTotalCO2Reduction,
  getTotalEnergyGenerated,
};
