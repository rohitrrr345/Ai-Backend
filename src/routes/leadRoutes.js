import express from "express";
import multer from "multer";
import { uploadLeads } from "../controller/leadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload/:offerId", upload.single("file"), uploadLeads);

export default router;
