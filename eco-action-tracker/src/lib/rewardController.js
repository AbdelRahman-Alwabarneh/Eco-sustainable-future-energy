const Reward = require("@/app/models/Reward");

// Function to create a new reward
const createReward = async (rewardData) => {
  const reward = new Reward(rewardData);
  try {
    const savedReward = await reward.save();
    return savedReward;
  } catch (error) {
    throw new Error(`Error creating reward: ${error.message}`);
  }
};

// Function to get all rewards
const getAllRewards = async () => {
  try {
    const rewards = await Reward.find({});
    return rewards;
  } catch (error) {
    throw new Error(`Error fetching rewards: ${error.message}`);
  }
};

// Function to get a reward by ID
const getRewardById = async (id) => {
  try {
    const reward = await Reward.findById(id);
    if (!reward) {
      throw new Error("Reward not found");
    }
    return reward;
  } catch (error) {
    throw new Error(`Error fetching reward: ${error.message}`);
  }
};

// Function to update a reward
const updateReward = async (id, rewardData) => {
  try {
    const updatedReward = await Reward.findByIdAndUpdate(id, rewardData, {
      new: true,
      runValidators: true,
    });
    if (!updatedReward) {
      throw new Error("Reward not found");
    }
    return updatedReward;
  } catch (error) {
    throw new Error(`Error updating reward: ${error.message}`);
  }
};

// Function to delete a reward
const deleteReward = async (id) => {
  try {
    const deletedReward = await Reward.findByIdAndDelete(id);
    if (!deletedReward) {
      throw new Error("Reward not found");
    }
    return deletedReward;
  } catch (error) {
    throw new Error(`Error deleting reward: ${error.message}`);
  }
};

module.exports = {
  createReward,
  getAllRewards,
  getRewardById,
  updateReward,
  deleteReward,
};
