import express from "express";
import { createOffer } from "../controller/offerController.js";

const router = express.Router();

router.post("/createOffer", createOffer);

export default router;
