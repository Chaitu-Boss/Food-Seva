import express from 'express';
import connectDB from '../backend/config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import foodRoutes from "./routes/foodRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import claimRoutes from "./routes/claimRoutes.js"; 

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();


// Routes
app.use('/api/auth', authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/claims", claimRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));