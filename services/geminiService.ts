import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Difficulty, GradingResult, Twister } from "../types";
import { decodeAudioData, playAudioBuffer } from "../utils/audioUtils";
import { FALLBACK_TWISTERS } from "../data/fallbackTwisters";

// Robustly retrieve API Key
const getApiKey = (): string => {
  let key = "";
  
  // 1. Try Vite standard (import.meta.env)
  try {
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      key = import.meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore access errors
  }

  // 2. Try process.env (Vercel/Node fallback)
  if (!key && typeof process !== 'undefined' && process.env) {
    key = process.env.VITE_API_KEY || process.env.REACT_APP_API_KEY || process.env.API_KEY || "";
  }

  if (key) {
    console.log("Twistopia: API Key detected successfully.");
  } else {
    console.warn("Twistopia: No API Key found. App running in Offline/Fallback mode.");
  }

  return key;
};

const apiKey = getApiKey();
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Game Rules - Dynamic Difficulty
const getRepetitionCount = (difficulty: Difficulty, level: number = 1): number => {
  // Scaling logic: Increase reps as level increases to keep it challenging
  switch (difficulty) {
    case Difficulty.EASY:
      // Base 5, +1 every 3 levels
      return 5 + Math.floor((level - 1) / 3);
    case Difficulty.MEDIUM:
      // Base 3, +1 every 4 levels
      return 3 + Math.floor((level - 1) / 4);
    case Difficulty.HARD:
      // Base 2, +1 every 5 levels
      return 2 + Math.floor((level - 1) / 5);
    default:
      return 3;
  }
};

export const generateTongueTwister = async (difficulty: Difficulty, level: number): Promise<Twister> => {
  const repetitionCount = getRepetitionCount(difficulty, level);

  // If no AI instance (missing key), fallback immediately
  if (!ai) {
    const fallback = getFallbackTwister(difficulty);
    return { ...fallback, repetitionCount };
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
    const result = JSON.parse(text);
    return { ...result, repetitionCount } as Twister;

  } catch (error) {
    console.warn("Gemini generation failed, switching to fallback database.", error);
    const fallback = getFallbackTwister(difficulty);
    return { ...fallback, repetitionCount };
  }
};

// Helper for fallback logic
function getFallbackTwister(difficulty: Difficulty): Twister {
  const candidates = FALLBACK_TWISTERS.filter(t => t.difficulty === difficulty);
  if (candidates.length === 0) {
    return { ...FALLBACK_TWISTERS[0], repetitionCount: 5 }; // Default fallback rep
  }
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex];
}

export const gradePronunciation = async (
  twister: Twister, 
  audioBase64: string, 
  mimeType: string
): Promise<GradingResult> => {
  
  if (!ai) {
    console.warn("API Key missing. Cannot grade.");
    return getFallbackGrading();
  }
  
  try {
    const prompt = `
      You are a strict but fair judge in a tongue twister game.
      
      The Challenge: "${twister.text}"
      REQUIRED REPETITIONS: ${twister.repetitionCount} times.
      
      I will provide an audio recording. 
      1. Check if the user said the phrase exactly ${twister.repetitionCount} times.
      2. If they said it fewer times, the maximum score is 50.
      3. Analyze pronunciation accuracy, clarity, and speed.
      
      Return a JSON object with:
      - score: integer 0-100.
      - feedback: A short comment. Mention if they missed repetitions.
      - isCorrect: boolean (true if score > 75).
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
    
    const result = JSON.parse(text);
    return {
      ...result,
      xpEarned: result.score // XP equals the score
    };

  } catch (error) {
    console.warn("Gemini grading failed.", error);
    return getFallbackGrading();
  }
};

const getFallbackGrading = (): GradingResult => {
  return {
    score: 0,
    feedback: "⚠️ AI Offline: Cannot grade. Check API Key.",
    isCorrect: false,
    xpEarned: 0
  };
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
    
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        resolve(); 
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; 
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }
};
