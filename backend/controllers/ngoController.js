import FoodItem from "../models/foodItemModel.js";
import FoodClaim from "../models/foodClaimModel.js";

// Get Available Food for NGO (from multiple donors)
export const getAvailableFood = async (req, res) => {
  try {
    const availableFood = await FoodItem.find({ status: "Available" })
    //   .populate("donor", "name")
    //   .populate("foodItems.foodName foodItems.foodType");
    console.log("Fetched Available Food:", availableFood);

    res.status(200).json({ AvailableFoodItems: availableFood });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available food", error: error.message });
  }
};

// // Create a Claim for Food Item (by NGO)
// export const claimFood = async (req, res) => {
//     const { donorFoodId, foodItemId, ngoId, claimedQuantity } = req.body;
  
//     try {
//       const donorFood = await FoodItem.findById(donorFoodId);
  
//       if (!donorFood) {
//         return res.status(404).json({ message: "FoodItem (donor's food record) not found"  });
//       }
  
//       const foodItem = donorFood.foodItems.id(foodItemId);
  
//       if (!foodItem) {
//         return res.status(404).json({ message: "Food item not found" });
//       }
  
//       if (foodItem.totalQuantity < claimedQuantity) {
//         return res.status(400).json({ message: "Insufficient quantity" });
//       }
  
//       // Create a claim for the NGO
//       const foodClaim = new FoodClaim({
//         donorFood: donorFoodId,
//         ngo: ngoId,
//         foodItem: foodItemId,
//         claimedQuantity,
//       });
  
//       await foodClaim.save();
  
//       // Update the food item quantity
//       foodItem.totalQuantity -= claimedQuantity;
//       if (foodItem.totalQuantity <= 0) {
//         foodItem.status = "Claimed"; // Update status if no food left
//       }
  
//       await donorFood.save();
  
//       res.status(200).json({ message: "Food item claimed successfully", foodClaim });
//     } catch (error) {
//       res.status(500).json({ message: "Error in claiming food item", error: error.message });
//     }
//   };
export const claimFood = async (req, res) => {
    const { donorFoodId, ngoId, items } = req.body;
    // `items` is an array of objects: [{ foodItemId, claimedQuantity }, ...]

    try {
        const donorFood = await FoodItem.findById(donorFoodId);

        if (!donorFood) {
            return res.status(404).json({ message: "FoodItem (donor's food record) not found" });
        }

        let foodClaims = [];

        for (const item of items) {
            const { foodItemId, claimedQuantity } = item;

            const foodItem = donorFood.foodItems.id(foodItemId);

            if (!foodItem) {
                return res.status(404).json({ message: `Food item with ID ${foodItemId} not found` });
            }

            if (foodItem.totalQuantity < claimedQuantity) {
                return res.status(400).json({ message: `Insufficient quantity for food item ${foodItem.foodName}` });
            }

            // Create a claim for the NGO
            const foodClaim = new FoodClaim({
                donorFood: donorFoodId,
                ngo: ngoId,
                foodItem: foodItemId,
                claimedQuantity,
            });

            await foodClaim.save();
            foodClaims.push(foodClaim);

            // Update the food item quantity
            foodItem.totalQuantity -= claimedQuantity;
            if (foodItem.totalQuantity <= 0) {
                foodItem.status = "Claimed"; // Mark as claimed if depleted
            }
        }

        // Ensure `expiresAt` is set properly
        if (!donorFood.expiresAt) {
            donorFood.expiresAt = new Date(); // Set a fallback expiry date
        }

        await donorFood.save();

        res.status(200).json({ message: "Food items claimed successfully", foodClaims });
    } catch (error) {
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
  
      claim.status = "Confirmed";
      await claim.save();
  
      res.status(200).json({ message: "Claim confirmed", claim });
    } catch (error) {
      res.status(500).json({ message: "Error in confirming claim", error: error.message });
    }
  };