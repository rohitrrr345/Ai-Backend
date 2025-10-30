import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const aiReasoning = async (offer, lead) => {
    const prompt = `
  `
};