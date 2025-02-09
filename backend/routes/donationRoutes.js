import express from "express";
import { getDonations } from "../controllers/donationController.js"; // Adjust path if needed

const router = express.Router();

// Define the route for donations
router.get("/:donorId", getDonations);

export default router;
