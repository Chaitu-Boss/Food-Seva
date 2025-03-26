
import mongoose from "mongoose";

const foodClaimSchema = new mongoose.Schema({
  donorFood: { type: mongoose.Schema.Types.ObjectId, ref: "DonorFood", required: true },
  ngo: { type: mongoose.Schema.Types.ObjectId, ref: "NGO", required: true },
  claimedItems: [{
    foodItem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
    claimedQuantity: { type: Number, required: true }
  }],
  claimedAt: { type: Date, default: Date.now },
  deliveryTracking: { 
    started: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    liveLocation: { type: Object, default: null }
  }
});

const FoodClaim = mongoose.model("FoodClaim", foodClaimSchema);
export default FoodClaim;
