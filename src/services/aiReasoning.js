import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const aiReasoning = async (offer, lead) => {
  const prompt = `
You are a B2B sales intelligence assistant.
Your task is to assess how likely a lead is to show buying intent for the given offer.

### Context
**Offer**
- Name: ${offer.name}
- Value Props: ${offer.value_props.join(", ")}
- Ideal Use Cases: ${offer.ideal_use_cases.join(", ")}

**Lead**
- Name: ${lead.name}
- Role: ${lead.role}
- Company: ${lead.company}
- Industry: ${lead.industry}
- Location: ${lead.location}
- LinkedIn Bio: ${lead.linkedin_bio}

### Instructions
1. Analyze the alignment between the lead and the offer.
2. Classify buying intent as one of: High, Medium, or Low.
3. Provide a short 1–2 sentence explanation.
4. **Return ONLY a single, complete JSON object. DO NOT include any markdown formatting (like \`\`\`json) or any introductory text.**
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            intent: {
              type: "string",
              description: "High, Medium, or Low",
            },
            reasoning: {
              type: "string",
              description: "A short 1-2 sentence explanation.",
            },
          },
          required: ["intent", "reasoning"],
        },
      },
    });

    let text = response.text;

    if (!text) {
      return { intent: "Low", reasoning: "Empty AI response." };
    }

    const parsed = JSON.parse(text);

    if (!parsed.intent || !parsed.reasoning) {
      return { intent: "Low", reasoning: "Incomplete AI response structure." };
    }

    return parsed;
  } catch (err) {
    console.error("Gemini API or JSON Parsing error:", err);
    return { intent: "Low", reasoning: "AI request failed or invalid JSON returned." };
  }
};