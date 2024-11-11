const Goal = require("@/app/models/Goal"); // Adjust the path as needed

// Function to create a new goal
const createGoal = async (goalData) => {
  const goal = new Goal(goalData);
  try {
    const savedGoal = await goal.save();
    return savedGoal;
  } catch (error) {
    throw new Error(`Error creating goal: ${error.message}`);
  }
};

// Function to get all goals for a user
const getUserGoals = async (userId) => {
  try {
    const goals = await Goal.find({ userId });
    return goals;
  } catch (error) {
    throw new Error(`Error fetching goals: ${error.message}`);
  }
};

// Function to get a goal by ID
const getGoalById = async (id) => {
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      throw new Error("Goal not found");
    }
    return goal;
  } catch (error) {
    throw new Error(`Error fetching goal: ${error.message}`);
  }
};

// Function to update a goal
const updateGoal = async (id, goalData) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(id, goalData, {
      new: true,
      runValidators: true,
    });
    if (!updatedGoal) {
      throw new Error("Goal not found");
    }
    return updatedGoal;
  } catch (error) {
    throw new Error(`Error updating goal: ${error.message}`);
  }
};

// Function to delete a goal
const deleteGoal = async (id) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      throw new Error("Goal not found");
    }
    return deletedGoal;
  } catch (error) {
    throw new Error(`Error deleting goal: ${error.message}`);
  }
};

module.exports = {
  createGoal,
  getUserGoals,
  getGoalById,
  updateGoal,
  deleteGoal,
};
