import FoodItem from "../models/foodItemModel.js"; // Ensure the correct model is imported

export const uploadFood = async (req, res) => {
  try {
    const { donor, foodItems , pickupLocation } = req.body;

    // Validate donor, food items, and pickup location
    if (!donor || !foodItems || foodItems.length === 0 || !pickupLocation) {
        return res.status(400).json({ message: "Donor, food items, and pickup location are required" });
      }

    // Create a new FoodItem entry that contains all food items in one document
    const newFoodItem = new FoodItem({
      donor,
      foodItems, // Directly assign the array of food items
      pickupLocation
    });

    // Save to the database
    const savedFoodItems = await newFoodItem.save();

    return res.status(201).json({
      message: "Food uploaded successfully",
      FoodItem: savedFoodItems,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error in food upload",
      error: error.message,
    });
  }
};



