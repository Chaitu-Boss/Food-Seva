import express from 'express';
import { sendOtp, verifyOtp, signup, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/sendOtp', sendOtp);   
router.post('/verifyOtp', verifyOtp);

router.post('/signup', signup);
router.post('/login', login);

export default router;
