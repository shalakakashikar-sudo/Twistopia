import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  const { difficulty } = await req.json();

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate a ${difficulty} English tongue twister. Return JSON.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          topic: { type: Type.STRING },
          difficulty: { type: Type.STRING },
        },
        required: ["text", "topic", "difficulty"],
      },
    },
  });

  return new Response(response.text!, {
    headers: { "Content-Type": "application/json" },
  });
}
