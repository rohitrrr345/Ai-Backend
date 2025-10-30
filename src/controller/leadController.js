import fs from "fs";
import csv from "csv-parser";
import Offer from "../models/offer.js";
import { aiReasoning } from "../services/aiReasoning.js";
import { calculateRuleScore } from "../utils/scoring.js";

export const uploadLeads = async (req, res) => {
  const { offerId } = req.params;

  try {
    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Parse CSV using Promise
    const leads = await new Promise((resolve, reject) => {
      const data = [];
      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (row) => data.push(row))
        .on("end", () => resolve(data))
        .on("error", reject);
    });

    let processedCount = 0;
    let skippedCount = 0;
    const results = [];
    const skippedLeads = [];

    for (const lead of leads) {
      // Basic validation
      if (!lead.name || !lead.company || !lead.role) {
        skippedCount++;
        skippedLeads.push(lead);
        continue;
      }

      try {
        const ruleScore = calculateRuleScore(lead, offer);
        const aiResponse = await aiReasoning(offer, lead);

        const aiPoints =
          aiResponse.intent === "High"
            ? 50
            : aiResponse.intent === "Medium"
            ? 30
            : 10;

        const finalScore = ruleScore + aiPoints;

        results.push({
          name: lead.name,
          role: lead.role,
          company: lead.company,
          aiPoints,
          intent: aiResponse.intent,
          score: finalScore,
          reasoning: aiResponse.reasoning,
        });

        processedCount++;
      } catch (err) {
        console.error(`Error processing lead ${lead.name}:`, err.message);
        skippedCount++;
        skippedLeads.push({ ...lead, error: err.message });
      }
    }

    // Clean up temp file
    fs.unlinkSync(filePath);

    return res.status(200).json({
      message: "Leads processed successfully",
      summary: {
        totalLeads: leads.length,
        processed: processedCount,
        skipped: skippedCount,
      },
      data: results,
      skippedLeads,
    });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};
