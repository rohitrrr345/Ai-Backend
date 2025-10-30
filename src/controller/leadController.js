import fs from "fs";
import csv from "csv-parser";
import Offer from "../models/offer.js";
import { calculateRuleScore } from "../utils/scoring.js";
import { aiReasoning } from "../services/aiReasoning.js";

export const uploadLeads = async (req, res) => {
  const { offerId } = req.params;

  try {
    const offer = await Offer.findById(offerId);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    const leads = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        leads.push(row);
      })
      .on("end", async () => {
        const results = [];

        for (const lead of leads) {
          const ruleScore = calculateRuleScore(lead, offer);
          const aiResponse = await aiReasoning(offer, lead);
          console.log("AI Respons new   e:", aiResponse);

          const aiPoints = aiResponse.intent === "High" ? 50 :
                           aiResponse.intent === "Medium" ? 30 : 10;

          const finalScore = ruleScore + aiPoints;

          results.push({
            name: lead.name,
            role: lead.role,
            company: lead.company,
            aiPoints: aiPoints,
            intent: aiResponse.intent,
            score: finalScore,
            reasoning: aiResponse.reasoning
          });
        }

        fs.unlinkSync(filePath); // delete temp filec
        return res.json(results);
      });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
