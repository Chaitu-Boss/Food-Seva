import FoodItem from "../models/foodItemModel.js"; // Adjust path if needed
import { ethers } from "ethers";
import fs from 'fs';

// export const getDonations = async (req, res) => {
//   try {
//     const donations = await FoodItem.find({ donor: req.params.donorId });
//     res.status(200).json(donations);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching donations", error });
//   }
// };
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractJson = JSON.parse(fs.readFileSync("../hardhat/artifacts/contracts/FoodDonation.sol/FoodDonation.json", "utf8"));
const abi = contractJson.abi;
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
export const recordOnChain = async (req, res) => {
  try {
    const { foodDetails, quantity, location } = req.body;
    const tx = await contract.donateFood(foodDetails, quantity, location);
    await tx.wait();
    res.json({ message: "Food donation recorded on blockchain!" });


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDonationsFromChain = async (req, res) => {
  try {
    const [donors, foodDetails, quantities, locations, timestamps, claimedStatuses] = await contract.getAllDonations();
    const numDonations = donors.length;
    const formattedDonations = [];
    for (let i = 0; i < numDonations; i++) {
      formattedDonations.push({
        id: i,
        donor: donors[i],
        foodDetails: foodDetails[i],
        quantity: Number(quantities[i]),
        location: locations[i],
        timestamp: Number(timestamps[i]),
        claimed: claimedStatuses[i]
      });
    }

    res.json({ donations: formattedDonations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching donations" });
  }
}