import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let genAI = null;
let model = null;
let cooldownUntil = 0;

function isRateLimited(error) {
  const message = error?.message || "";
  return (
    error?.status === 429 ||
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("rate limit")
  );
}

function getModel() {
  if (!API_KEY) {
    throw new Error(
      "Gemini API key is missing. Add VITE_GEMINI_API_KEY to your .env file."
    );
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }

  if (!model) {
    model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
  }

  return model;
}

export async function askchatboat(question) {
  if (!question || typeof question !== "string" || !question.trim()) {
    throw new Error("A non-empty question string is required.");
  }

  if (Date.now() < cooldownUntil) {
    const secondsLeft = Math.ceil((cooldownUntil - Date.now()) / 1000);
    return `Gemini is temporarily rate-limited. Please wait ${secondsLeft}s and try again.`;
  }

  try {
    const activeModel = getModel();
    const result = await activeModel.generateContent(question);
    const text = result.response.text();

    if (!text) {
      throw new Error("Empty response from Gemini.");
    }

    return text;
  } catch (error) {
    if (isRateLimited(error)) {
      cooldownUntil = Date.now() + 60000;
      return "Gemini is temporarily rate-limited. Please wait a moment and try again.";
    }

    const message = error?.message || "Unknown Gemini error";
    throw new Error(`Gemini error: ${message}`);
  }
}