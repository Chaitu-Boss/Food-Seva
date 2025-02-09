// import FoodClaim from "../models/foodClaimModel.js"; // Adjust path if needed
// import mongoose from "mongoose";


// export const getClaims = async (req, res) => {
//     try {
//         const ngoId = new mongoose.Types.ObjectId(req.params.ngoId); // Convert ngoId to ObjectId
    
//         // Aggregate pipeline to get the claimed food with donor and food items data
//         const claimedFood = await FoodClaim.aggregate([
//           // Match records for a specific NGO
//           { 
//             $match: { ngo: ngoId } // Use the converted ObjectId here
//           },
//           // Lookup to get the related donorFood from the FoodItem model (formerly DonorFood)
//           {
//             $lookup: {
//               from: "fooditems",  // 'fooditems' is the name of the collection corresponding to FoodItem
//               localField: "donorFood",  // The field in FoodClaim that references FoodItem
//               foreignField: "_id",  // The field in FoodItem that we are matching against
//               as: "donorFoodDetails"
//             }
//           },
//           // Unwind the donorFoodDetails array (since we expect a single match for donorFood)
//           {
//             $unwind: "$donorFoodDetails"
//           },
//           // Lookup to get donor information from the 'Donor' model
//           {
//             $lookup: {
//               from: "donors",  // The collection corresponding to Donor
//               localField: "donorFoodDetails.donor",  // Referencing the donor field in donorFoodDetails
//               foreignField: "_id",
//               as: "donorDetails"
//             }
//           },
//           // Unwind the donorDetails array (since it should have only one element)
//           {
//             $unwind: "$donorDetails"
//           },
//           // Lookup to get foodItems details
//           {
//             $lookup: {
//               from: "fooditems",  // The collection name for food items
//               localField: "foodItems",  // The field holding an array of foodItems
//               foreignField: "_id",
//               as: "foodItemDetails"
//             }
//           },
//           {
//             $unwind: {
//               path: "$foodItemDetails",
//               preserveNullAndEmptyArrays: true  // This ensures that even if no food item is found, the rest is still processed
//             }
//           },
//           // Project the fields we need in the response
//           {
//             $project: {
//               _id: 1,
//               donorName: { $concat: ["$donorDetails.name"] },
//               foodItemNames: { $map: { input: "$foodItemDetails", as: "item", in: "$$item.foodName" } },
//               foodItemTypes: { $map: { input: "$foodItemDetails", as: "item", in: "$$item.foodType" } },
//               claimedQuantity: 1,
//               claimedAt: 1,
//               status: 1
//             }
//           }
//         ]);    
    
//     res.status(200).json(claimedFood);

//   } catch (error) {
//     console.error('Error fetching claimed food:', error);
//     res.status(500).json({ message: "Error fetching claimed food", error });
//   }
// };

// import FoodClaim from "../models/foodClaimModel.js"; // Adjust path if needed
// import mongoose from "mongoose";

// export const getClaims = async (req, res) => {
//   try {
//     // Convert ngoId to a MongoDB ObjectId
//     const ngoId = new mongoose.Types.ObjectId(req.params.ngoId);

//     // Aggregate pipeline to fetch claimed food with donor and food item details
//     const claimedFood = await FoodClaim.aggregate([
//       // Match only records for the specified NGO
//       {
//         $match: { ngo: ngoId },
//       },
//       // Lookup donorFood details from the 'fooditems' collection
//       {
//         $lookup: {
//           from: "fooditems", // Collection name for food items
//           localField: "donorFood", // Field in FoodClaim referencing FoodItem
//           foreignField: "_id", // Field in FoodItem to match against
//           as: "donorFoodDetails",
//         },
//       },
//       // Unwind the donorFoodDetails array to work with individual objects
//       {
//         $unwind: "$donorFoodDetails",
//       },
//       // Lookup donor information from the 'donors' collection
//       {
//         $lookup: {
//           from: "donors", // Collection name for donors
//           localField: "donorFoodDetails.donor", // Reference to the donor field
//           foreignField: "_id", // Field in Donor to match against
//           as: "donorDetails",
//         },
//       },
//       // Unwind the donorDetails array to work with individual objects
//       {
//         $unwind: "$donorDetails",
//       },
//       // Lookup detailed food item information
//       {
//         $lookup: {
//           from: "fooditems", // Collection name for food items
//           localField: "foodItems", // Field holding an array of food item IDs
//           foreignField: "_id", // Field in FoodItem to match against
//           as: "foodItemDetails",
//         },
//       },
//       // Unwind foodItemDetails to flatten arrays
//       {
//         $unwind: {
//           path: "$foodItemDetails",
//           preserveNullAndEmptyArrays: true, // Ensure records without food items are preserved
//         },
//       },
//       // Shape the final response with required fields
//       {
//         $project: {
//           _id: 1,
//           donorName: "$donorDetails.name", // Donor's name
//           foodItemNames: {
//             $map: {
//               input: "$foodItemDetails",
//               as: "item",
//               in: "$$item.foodName",
//             },
//           }, // Extract food item names
//           foodItemTypes: {
//             $map: {
//               input: "$foodItemDetails",
//               as: "item",
//               in: "$$item.foodType",
//             },
//           }, // Extract food item types
//           claimedQuantity: 1,
//           claimedAt: 1,
//           status: 1,
//         },
//       },
//     ]);

//     // Send the aggregated data as the response
//     res.status(200).json(claimedFood);
//   } catch (error) {
//     console.error("Error fetching claimed food:", error);
//     res.status(500).json({ message: "Error fetching claimed food", error });
//   }
// };

import FoodClaim from "../models/foodClaimModel.js"; // Adjust path if needed
import mongoose from "mongoose";

export const getClaims = async (req, res) => {
  try {
    // Convert ngoId to a MongoDB ObjectId
    const ngoId = new mongoose.Types.ObjectId(req.params.ngoId);

    // Aggregate pipeline to fetch claimed food with all associated details
    const claimedFood = await FoodClaim.aggregate([
      // Match only records for the specified NGO
      {
        $match: { ngo: ngoId },
      },
      // Lookup donorFood details from the 'fooditems' collection
      {
        $lookup: {
          from: "fooditems", // Collection name for food items
          localField: "donorFood", // Field in FoodClaim referencing FoodItem
          foreignField: "_id", // Field in FoodItem to match against
          as: "donorFoodDetails",
        },
      },
      // Unwind the donorFoodDetails array to work with individual objects
      {
        $unwind: "$donorFoodDetails",
      },
      // Lookup donor information from the 'donors' collection
      {
        $lookup: {
          from: "donors", // Collection name for donors
          localField: "donorFoodDetails.donor", // Reference to the donor field
          foreignField: "_id", // Field in Donor to match against
          as: "donorDetails",
        },
      },
      // Unwind the donorDetails array to work with individual objects
      {
        $unwind: "$donorDetails",
      },
      // Lookup detailed food item information
      {
        $lookup: {
          from: "fooditems", // Collection name for food items
          localField: "foodItems", // Field holding an array of food item IDs
          foreignField: "_id", // Field in FoodItem to match against
          as: "foodItemDetails",
        },
      },
      // Unwind foodItemDetails to flatten arrays
      {
        $unwind: {
          path: "$foodItemDetails",
          preserveNullAndEmptyArrays: true, // Ensure records without food items are preserved
        },
      },
      // No `$project` stage, returning all fields from the aggregated pipeline
    ]);

    // Send the aggregated data as the response
    res.status(200).json(claimedFood);
  } catch (error) {
    console.error("Error fetching claimed food:", error);
    res.status(500).json({ message: "Error fetching claimed food", error });
  }
};
