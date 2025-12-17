import React, { useState, useRef, useEffect } from 'react';
import { Twister, GameState } from '../types';
import { Button } from './Button';
import { AudioRecorder } from '../utils/audioUtils';
import { speakText } from '../services/geminiService';

interface GameplayProps {
  twister: Twister;
  onGrade: (audioBase64: string, mimeType: string) => void;
  onBack: () => void;
  isGrading: boolean;
}

export const Gameplay: React.FC<GameplayProps> = ({ twister, onGrade, onBack, isGrading }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const recorderRef = useRef<AudioRecorder>(new AudioRecorder());
  
  // Clean up recorder on unmount
  useEffect(() => {
    return () => {
      // Logic to cleanup if needed, mostly handled in stop()
    };
  }, []);

  const handlePlayTTS = async () => {
    if (isPlayingAudio) return;
    try {
      setIsPlayingAudio(true);
      await speakText(twister.text);
    } catch (e) {
      console.error("TTS Error", e);
      alert("Could not play audio. Please try again.");
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleToggleRecord = async () => {
    if (isRecording) {
      // STOP Recording
      setIsRecording(false);
      try {
        const { base64, mimeType } = await recorderRef.current.stop();
        onGrade(base64, mimeType);
      } catch (e) {
        console.error("Recording error", e);
      }
    } else {
      // START Recording
      try {
        await recorderRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error("Mic access denied or error", e);
        alert("Microphone access is required to play.");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 animate-fade-in">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-4">
        <button onClick={onBack} className="text-gray-500 hover:text-primary transition-colors flex items-center gap-1 font-medium">
          ← Menu
        </button>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold 
          ${twister.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 
            twister.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {twister.difficulty}
        </span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
        
        <p className="text-gray-400 font-display uppercase tracking-widest text-sm mb-4">Topic: {twister.topic}</p>
        
        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-800 leading-tight mb-8">
          "{twister.text}"
        </h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
          <Button 
            variant="outline" 
            onClick={handlePlayTTS}
            disabled={isPlayingAudio || isGrading || isRecording}
          >
            {isPlayingAudio ? 'Playing...' : '🔊 Listen First'}
          </Button>
        </div>
      </div>

      {/* Recording Area */}
      <div className="flex flex-col items-center space-y-4">
         <div className={`relative transition-all duration-300 ${isRecording ? 'scale-110' : 'scale-100'}`}>
           {isRecording && (
             <span className="absolute -inset-4 rounded-full bg-red-400 opacity-20 animate-ping"></span>
           )}
           <Button
             size="lg"
             variant={isRecording ? 'secondary' : 'primary'}
             onClick={handleToggleRecord}
             disabled={isGrading || isPlayingAudio}
             className="w-24 h-24 !rounded-full !p-0 flex items-center justify-center text-4xl shadow-xl shadow-primary/40"
           >
             {isRecording ? '⏹️' : '🎙️'}
           </Button>
         </div>
         
         <p className="text-gray-600 font-medium">
           {isGrading ? 'AI is analyzing your voice...' : 
            isRecording ? 'Listening... Tap to stop' : 
            'Tap mic to start recording'}
         </p>
      </div>
    </div>
  );
};
