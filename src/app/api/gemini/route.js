import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      console.error("Prompt is missing in request body");
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment variables");
      return new Response(JSON.stringify({ error: "Server misconfiguration: API key missing" }), { status: 500 });
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use the correct model name as per Google API docs
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (error) {
    console.error("Gemini API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
