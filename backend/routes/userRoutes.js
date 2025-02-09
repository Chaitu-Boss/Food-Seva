import express from "express";
import passport from "passport";
import { signup, login, logout,sendOtp,verifyOtp,updatePassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/update-password", updatePassword)
// Google Auth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    generateToken(res, req.user._id);
    res.redirect("http://localhost:5173"); // Redirect to frontend
  }
);

export default router;