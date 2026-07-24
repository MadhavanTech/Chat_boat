const WORKER_URL = import.meta.env.VITE_MADDY_CHATBOAT_WORKER_URL?.trim() || "https://white-limit-4511.madhavanmunusamy09.workers.dev/";

let cooldownUntil = 0;

function isRateLimited(error) {
  const message = error?.message || "";
  return (
    error?.status === 429 ||
    message.includes("429") ||
    message.includes("quota") ||
    message.includes("rate limit") ||
    message.includes("RESOURCE_EXHAUSTED")
  );
}

export async function askchatboat(question) {
  if (!question || typeof question !== "string" || !question.trim()) {
    throw new Error("A non-empty question string is required.");
  }

  if (Date.now() < cooldownUntil) {
    const secondsLeft = Math.ceil((cooldownUntil - Date.now()) / 1000);
    throw new Error(`maddy_Chatboat is temporarily rate-limited. Please wait ${secondsLeft}s and try again.`);
  }

  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const error = new Error(errorBody || "The worker returned an error.");
      error.status = response.status;
      throw error;
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from maddy_Chatboat worker.");
    }

    return text;
  } catch (error) {
    if (isRateLimited(error)) {
      cooldownUntil = Date.now() + 60000;
      throw new Error("maddy_Chatboat is temporarily rate-limited. Please wait a moment and try again.");
    }

    throw new Error(`maddy_Chatboat is unavailable right now. Please try again in a moment. Details: ${error.message}`);
  }
}