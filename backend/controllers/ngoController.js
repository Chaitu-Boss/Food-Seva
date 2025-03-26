import  DonorFood  from "../models/foodItemModel.js";
import FoodClaim from "../models/foodClaimModel.js";
import NGO from '../models/ngoModel.js'


export const getAvailableFood = async (req, res) => {
  try {
    const availableFood = await DonorFood.find()
      .populate("donor", "name");

    const filteredFood = availableFood.map((donation) => ({
      ...donation.toObject(),
      foodItems: donation.foodItems.filter(item => item.status === "Available"),
    })).filter(donation => donation.foodItems.length > 0);

    res.status(200).json({ availableFood: filteredFood });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available food", error: error.message });
  }
};


export const claimFood = async (req, res) => {
  const { donateFoodId, donorFoodId, ngoId, items } = req.body;

  try {
    // ✅ Fetch the donor food entry using `donateFoodId`
    const donorFood = await DonorFood.findById(donateFoodId);
    if (!donorFood) {
      return res.status(404).json({ message: "Donor's food record not found" });
    }

    // ✅ Fetch the NGO details
    const ngo = await NGO.findById(ngoId);
    if (!ngo) {
      return res.status(404).json({ message: "NGO not found" });
    }

    let foodClaims = [];

    for (const item of items) {
      const { foodItemId, claimedQuantity } = item;

      // ✅ Find the food item inside donorFood
      const foodItem = donorFood.foodItems.id(foodItemId);
      if (!foodItem) {
        return res.status(404).json({ message: `Food item with ID ${foodItemId} not found` });
      }

      // ✅ Check if there is enough quantity available
      if (foodItem.totalQuantity < claimedQuantity) {
        return res.status(400).json({ message: `Insufficient quantity for food item ${foodItem.foodName}` });
      }

      // ✅ Create food claim entry
      const foodClaim = new FoodClaim({
        donorFood: donateFoodId, // ✅ Correct ID usage
        ngo: ngoId,
        claimedItems: [{ foodItem: foodItemId, claimedQuantity }],
        deliveryTracking: { started: false, completed: false, liveLocation: null } // Initial state
      });

      await foodClaim.save();
      foodClaims.push(foodClaim);

      // ✅ Update the food item quantity & status
      foodItem.totalQuantity -= claimedQuantity;

      // 🔹 If **ALL QUANTITY** is claimed, update status
      if (foodItem.totalQuantity === 0) {
        foodItem.status = "Claimed"; // ✅ Status update 
      } else {
        foodItem.status = "Available"; // ✅ If some quantity remains, keep available
      }
    }

    // ✅ Save the updated donor food record
    await donorFood.save();

    res.status(200).json({ message: "Food items claimed successfully", foodClaims });
  } catch (error) {
    console.error("Error in claiming food items:", error);
    res.status(500).json({ message: "Error in claiming food items", error: error.message });
  }
};




  
// Confirm the Claim for a Food Item
export const confirmClaim = async (req, res) => {
  const { claimId } = req.body;

  try {
    const claim = await FoodClaim.findById(claimId);

    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    // Mark delivery as completed
    claim.deliveryTracking.completed = true;
    await claim.save();

    res.status(200).json({ message: "Food claim successfully delivered", claim });
  } catch (error) {
    res.status(500).json({ message: "Error in confirming claim", error: error.message });
  }
};
