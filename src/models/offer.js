import mongoose from "mongoose";

const OfferSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value_props: [{ type: String, required: true }],
  ideal_use_cases: [{ type: String, required: true }]
}, { timestamps: true });

export default mongoose.model("Offer", OfferSchema);
