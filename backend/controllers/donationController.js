import FoodItem from "../models/foodItemModel.js"; // Adjust path if needed

export const getDonations = async (req, res) => {
  try {
    const donations = await FoodItem.find({ donor: req.params.donorId });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error });
  }
};
