import User from "@/app/models/User";
import jwt from "jsonwebtoken";

export const addReminderToUser = async (token, reminder) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { reminders: reminder } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user reminders: ${error.message}`);
  }
};

export const getUserInfoFromToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(
      userId,
      "firstName lastName totalCO2Reduction redeemedRewards points"
    );
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error retrieving user information: ${error.message}`);
  }
};

export const getUserReminders = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId, "reminders");
    if (!user) {
      throw new Error("User not found");
    }

    return user.reminders;
  } catch (error) {
    throw new Error(`Error retrieving user reminders: ${error.message}`);
  }
};
