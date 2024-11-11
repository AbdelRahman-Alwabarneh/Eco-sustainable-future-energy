const Bike = require("@/app/models/Bike");

// Function to create a new bike
const createBike = async (bikeData) => {
  const bike = new Bike(bikeData);
  try {
    const savedBike = await bike.save();
    return savedBike;
  } catch (error) {
    throw new Error(`Error creating bike: ${error.message}`);
  }
};

// Function to get all bikes
const getAllBikes = async () => {
  try {
    const bikes = await Bike.find({});
    return bikes;
  } catch (error) {
    throw new Error(`Error fetching bikes: ${error.message}`);
  }
};

// Function to get a bike by ID
const getBikeById = async (id) => {
  try {
    const bike = await Bike.findById(id);
    if (!bike) {
      throw new Error("Bike not found");
    }
    return bike;
  } catch (error) {
    throw new Error(`Error fetching bike: ${error.message}`);
  }
};

// Function to update a bike
const updateBike = async (id, bikeData) => {
  try {
    const updatedBike = await Bike.findByIdAndUpdate(id, bikeData, {
      new: true,
      runValidators: true,
    });
    if (!updatedBike) {
      throw new Error("Bike not found");
    }
    return updatedBike;
  } catch (error) {
    throw new Error(`Error updating bike: ${error.message}`);
  }
};

// Function to delete a bike
const deleteBike = async (id) => {
  try {
    const deletedBike = await Bike.findByIdAndDelete(id);
    if (!deletedBike) {
      throw new Error("Bike not found");
    }
    return deletedBike;
  } catch (error) {
    throw new Error(`Error deleting bike: ${error.message}`);
  }
};

module.exports = {
  createBike,
  getAllBikes,
  getBikeById,
  updateBike,
  deleteBike,
};
