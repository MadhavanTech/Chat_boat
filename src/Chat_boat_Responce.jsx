import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error('VITE_GEMINI_API_KEY is not set. Please add it to your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second

export async function askchatboat(question) {
    if (!API_KEY) {
        throw new Error('API key not configured. Please set VITE_GEMINI_API_KEY in your .env file');
    }
    
    let lastError;
    
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const result = await model.generateContent(question);
            return result.response.text();
        } catch (error) {
            lastError = error;
            
            // Check if it's a 503 error (service unavailable)
            if (error.status === 503 || error.message?.includes("503")) {
                if (attempt < MAX_RETRIES - 1) {
                    // Calculate exponential backoff delay
                    const delay = INITIAL_DELAY * Math.pow(2, attempt);
                    console.warn(`API unavailable (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue;
                }
            }
            
            // For other errors, throw immediately
            throw error;
        }
    }
    
    throw new Error(`Failed to get response after ${MAX_RETRIES} attempts: ${lastError.message}`);
}