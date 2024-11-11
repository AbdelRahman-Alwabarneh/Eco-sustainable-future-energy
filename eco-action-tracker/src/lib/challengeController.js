const Challenge = require("@/app/models/Challenge");
const JoiningChallenge = require("@/app/models/JoiningChallenge");
const jwt = require("jsonwebtoken");

const createChallenge = async (challengeData) => {
  const challenge = new Challenge(challengeData);
  try {
    const savedChallenge = await challenge.save();
    return savedChallenge;
  } catch (error) {
    throw new Error(`Error creating challenge: ${error.message}`);
  }
};

const getAllChallenges = async () => {
  try {
    const challenges = await Challenge.find({});
    return challenges;
  } catch (error) {
    throw new Error(`Error fetching challenges: ${error.message}`);
  }
};

const getChallengeById = async (id) => {
  try {
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      throw new Error("Challenge not found");
    }
    return challenge;
  } catch (error) {
    throw new Error(`Error fetching challenge: ${error.message}`);
  }
};

const updateProgress = async (challengeId) => {
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

    const updatedChallenge = await Challenge.findByIdAndUpdate(
      challengeId,
      { progress },
      { new: true }
    );

    console.log(
      `Progress updated for challenge ID ${challengeId}: ${updatedChallenge.progress}`
    );
  } catch (error) {
    console.error(
      `Error updating progress for challenge ID ${challengeId}:`,
      error.message
    );
  }
};

const getUserJoiningChallenges = async (authToken) => {
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const joiningChallenges = await JoiningChallenge.find({ userId });

    const challengeIds = joiningChallenges.map((jc) => jc.challengeId);

    const upcomingChallenges = await Challenge.find({
      _id: { $in: challengeIds },
      status: "upcoming",
    });

    return upcomingChallenges;
  } catch (error) {
    throw new Error(`Error fetching joining challenges: ${error.message}`);
  }
};

const getUserCompletedChallenges = async (authToken) => {
  try {
    jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    const completedChallenges = await Challenge.find({ status: "completed" });

    console.log("Fetched completed challenges:", completedChallenges);

    return completedChallenges;
  } catch (error) {
    throw new Error(`Error fetching completed challenges: ${error.message}`);
  }
};

module.exports = {
  createChallenge,
  getAllChallenges,
  getChallengeById,
  getUserJoiningChallenges,
  updateProgress,
  getUserCompletedChallenges,
};
