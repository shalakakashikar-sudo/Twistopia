import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Difficulty, GradingResult, Twister } from "../types";
import { decodeAudioData, playAudioBuffer } from "../utils/audioUtils";
import { FALLBACK_TWISTERS } from "../data/fallbackTwisters";

const apiKey = process.env.API_KEY || ''; // Injected by environment
const ai = new GoogleGenAI({ apiKey });

export const generateTongueTwister = async (difficulty: Difficulty): Promise<Twister> => {
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
    
    // Fallback logic
    const candidates = FALLBACK_TWISTERS.filter(t => t.difficulty === difficulty);
    if (candidates.length === 0) {
      // Emergency fallback if difficulty mismatch (shouldn't happen with current data)
      return FALLBACK_TWISTERS[0];
    }
    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }
};

export const gradePronunciation = async (
  twisterText: string, 
  audioBase64: string, 
  mimeType: string
): Promise<GradingResult> => {
  
  // Note: We cannot easily fallback for grading without a complex client-side STT library.
  // We will let this throw if the API fails, so the UI can show the specific error to the user.
  
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
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' }, // Kore, Puck, Charon, Fenrir, Zephyr
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio generated");

    // Web Audio API playback
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const audioBuffer = await decodeAudioData(base64Audio, audioContext, 24000);
    playAudioBuffer(audioBuffer, audioContext);

  } catch (error) {
    console.warn("Gemini TTS failed, switching to browser SpeechSynthesis.", error);
    
    // Browser fallback
    return new Promise((resolve, reject) => {
      if (!('speechSynthesis' in window)) {
        console.error("Browser does not support TTS");
        resolve(); // Resolve anyway to unblock UI
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9; // Slightly slower for clarity
      
      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.error("Browser TTS error", e);
        resolve(); // Resolve to unblock UI
      };
      
      window.speechSynthesis.speak(utterance);
    });
  }
};
