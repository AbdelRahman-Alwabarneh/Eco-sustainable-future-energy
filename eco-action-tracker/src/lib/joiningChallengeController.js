import JoiningChallenge from "@/app/models/JoiningChallenge";

export const createJoiningChallenge = async (challengeData) => {
  const joiningChallenge = new JoiningChallenge(challengeData);
  try {
    const savedChallenge = await joiningChallenge.save();
    return savedChallenge;
  } catch (error) {
    throw new Error(`Error creating joining challenge: ${error.message}`);
  }
};

export const getAllJoiningChallenges = async () => {
  try {
    const challenges = await JoiningChallenge.find({})
      .populate("userId")
      .populate("challengeId")
      .populate("bikeId");
    return challenges;
  } catch (error) {
    throw new Error(`Error fetching joining challenges: ${error.message}`);
  }
};

export const getJoiningChallengeById = async (id) => {
  try {
    const challenge = await JoiningChallenge.findById(id)
      .populate("userId")
      .populate("challengeId")
      .populate("bikeId");
    if (!challenge) {
      throw new Error("Joining challenge not found");
    }
    return challenge;
  } catch (error) {
    throw new Error(`Error fetching joining challenge: ${error.message}`);
  }
};

export const updateJoiningChallenge = async (id, challengeData) => {
  try {
    const updatedChallenge = await JoiningChallenge.findByIdAndUpdate(
      id,
      challengeData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedChallenge) {
      throw new Error("Joining challenge not found");
    }
    return updatedChallenge;
  } catch (error) {
    throw new Error(`Error updating joining challenge: ${error.message}`);
  }
};

export const getJoinedChallengesByUserId = async (userId) => {
  try {
    const challenges = await JoiningChallenge.find({ userId }).populate(
      "challengeId"
    );
    return {
      count: challenges.length,
    };
  } catch (error) {
    throw new Error(
      `Error fetching user's joined challenges: ${error.message}`
    );
  }
};
