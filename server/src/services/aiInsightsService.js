import { GoogleGenAI } from "@google/genai";
import { buildFinancePrompt } from "../utils/prompt.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateFinancialInsights = async (financeSnapshot) => {
  const prompt = buildFinancePrompt(financeSnapshot);

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text;
};
