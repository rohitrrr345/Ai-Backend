import Offer from "../models/offer.js";
export const createOffer = async (req, res) => {
  try {
    const { name, value_props, ideal_use_cases } = req.body;

    if (!name || !value_props || !ideal_use_cases) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const offer = await Offer.create({ name, value_props, ideal_use_cases });
    return res.status(201).json({
      message: "Offer created successfully",
      offerId: offer._id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
