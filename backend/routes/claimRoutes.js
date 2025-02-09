import express from "express";
import { getClaims } from "../controllers/claimController.js"; // Adjust path if needed

const router = express.Router();

// Define the route for claims
router.get("/:ngoId", getClaims);

export default router;
