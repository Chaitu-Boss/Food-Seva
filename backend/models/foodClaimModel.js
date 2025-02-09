import mongoose from "mongoose";

const foodClaimSchema = new mongoose.Schema({
  donorFood: { type: mongoose.Schema.Types.ObjectId, ref: "DonorFood", required: true }, // Reference to the donor's food
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true }, // Reference to the NGO
  foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true }, // Reference to the specific food item claimed
  claimedQuantity: { type: Number, required: true }, // Quantity requested by NGO
  claimedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "Confirmed"], default: "Pending" },
});

const FoodClaim = mongoose.model("FoodClaim", foodClaimSchema);
export default FoodClaim;
