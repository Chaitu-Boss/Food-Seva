import express from "express";
import { recordOnChain, getDonationsFromChain} from "../controllers/donationController.js"; // Adjust path if needed

const router = express.Router();

// Define the route for donations
// router.get("/:donorId", getDonations);

router.post("/record", recordOnChain) ;

router.get("/get-donations", getDonationsFromChain);
export default router;
