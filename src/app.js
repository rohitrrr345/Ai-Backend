import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import offerRoutes from "./routes/offerRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/offer", offerRoutes);//this express route is for creating offers
app.use("/leads", leadRoutes);// this express route is for uploading and processing leads

app.get("/", (req, res) => res.send("Lead Scoring API running "));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
