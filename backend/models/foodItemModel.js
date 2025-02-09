
import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  foodName: { type: String, required: true },
  foodType: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  expiryDate: { type: Date, required: true }
});

const donorFoodSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "Donor", required: true },
  foodItems: [foodItemSchema],
  pickupLocation: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: { lat: Number, lng: Number }
  },
  status: { type: String, enum: ["Available", "Claimed", "Expired"], default: "Available" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, index: { expires: 0 } } // TTL Index
});

// Set `expiresAt` field dynamically
donorFoodSchema.pre("save", function (next) {
  // Find the earliest expiry date among food items
  const minExpiryDate = this.foodItems.length > 0
    ? this.foodItems.reduce((min, item) => item.expiryDate < min ? item.expiryDate : min, this.foodItems[0].expiryDate)
    : null;

  if (minExpiryDate) {
    this.expiresAt = minExpiryDate; // Set expiry time to the earliest food item expiry
  }
  
  next();
});

// Post-save hook for deleting food items with zero quantity
donorFoodSchema.post("save", async function (doc, next) {
  // After saving the donor food, check if any of the food items has zero quantity
  doc.foodItems.forEach(async (foodItem) => {
    if (foodItem.totalQuantity === 0) {
      // Optionally delete food item from the donor's food
      await doc.updateOne({ $pull: { foodItems: { _id: foodItem._id } } });
      // If the whole donor food record should be deleted, uncomment below
      // await doc.remove();
    }
  });

  next();
});

const FoodItem = mongoose.model("FoodItem", donorFoodSchema);
export default FoodItem;
