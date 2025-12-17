import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Difficulty, GradingResult, Twister } from "../types";
import { decodeAudioData, playAudioBuffer } from "../utils/audioUtils";
import { FALLBACK_TWISTERS } from "../data/fallbackTwisters";

// Access API key strictly from environment.
const apiKey = process.env.API_KEY; 

// Initialize AI only if key exists.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateTongueTwister = async (difficulty: Difficulty): Promise<Twister> => {
  // If no AI instance (missing key), fallback immediately
  if (!ai) {
    console.warn("API Key missing. Using offline database.");
    return getFallbackTwister(difficulty);
  }

  try {
    const prompt = `Generate a creative, fun, and challenging tongue twister in English. 
    Difficulty Level: ${difficulty}. 
    The text should be a single coherent phrase or sentence.
    Return JSON only.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: "The tongue twister text" },
            topic: { type: Type.STRING, description: "A short 1-2 word topic/theme of the twister" },
            difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] }
          },
          required: ["text", "topic", "difficulty"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    return JSON.parse(text) as Twister;

  } catch (error) {
    console.warn("Gemini generation failed, switching to fallback database.", error);
    return getFallbackTwister(difficulty);
  }
};

// Helper for fallback logic
function getFallbackTwister(difficulty: Difficulty): Twister {
  const candidates = FALLBACK_TWISTERS.filter(t => t.difficulty === difficulty);
  if (candidates.length === 0) {
    return FALLBACK_TWISTERS[0];
  }
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

export const gradePronunciation = async (
  twisterText: string, 
  audioBase64: string, 
  mimeType: string
): Promise<GradingResult> => {
  
  if (!ai) {
    throw new Error("AI features are unavailable (Missing API Key). Cannot grade pronunciation.");
  }
  
  const prompt = `
    I will provide an audio recording of a user trying to say the following tongue twister: "${twisterText}".
    
    Please analyze the audio for pronunciation accuracy, clarity, and speed.
    Ignore minor background noise. Focus on the words.
    
    Return a JSON object with:
    - score: integer 0-100 (100 is perfect)
    - feedback: A friendly, short constructive comment (max 2 sentences).
    - isCorrect: boolean (true if > 80% words are identifiable and correct).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        { text: prompt },
        {
          inlineData: {
            mimeType: mimeType,
            data: audioBase64
          }
        }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          feedback: { type: Type.STRING },
          isCorrect: { type: Type.BOOLEAN }
        },
        required: ["score", "feedback", "isCorrect"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No grading response from Gemini");
  return JSON.parse(text) as GradingResult;
};

export const speakText = async (text: string): Promise<void> => {
  try {
    if (!ai) throw new Error("API Key missing");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, 
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio generated");

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(base64Audio, audioContext, 24000);
    playAudioBuffer(audioBuffer, audioContext);

  } catch (error) {
    console.warn("Gemini TTS failed or offline, switching to browser SpeechSynthesis.", error);
    
    // Browser fallback
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        console.error("Browser does not support TTS");
        resolve(); 
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; 
      
      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.error("Browser TTS error", e);
        resolve();
      };
      
      window.speechSynthesis.speak(utterance);
    });
  }
};
