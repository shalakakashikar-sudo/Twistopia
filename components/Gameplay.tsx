import React, { useState, useRef, useEffect } from 'react';
import { Twister } from '../types';
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
  
  useEffect(() => {
    return () => {
      // Cleanup
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
      setIsRecording(false);
      try {
        const { base64, mimeType } = await recorderRef.current.stop();
        onGrade(base64, mimeType);
      } catch (e) {
        console.error("Recording error", e);
      }
    } else {
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
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-6 animate-fade-in py-4">
      
      {/* Navigation & Header */}
      <div className="w-full flex justify-between items-center px-4">
        <button onClick={onBack} className="text-ink/60 hover:text-ink transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-transparent hover:border-ink">
          <span className="text-lg">←</span> Gym Lobby
        </button>
        <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-ink"></span>
            <span className="text-sm font-display font-bold text-ink">Circuit: {twister.difficulty}</span>
        </div>
      </div>

      {/* Main Card - Book/Index Card Style */}
      <div className="bg-surface rounded-sm border-2 border-ink shadow-hard p-8 md:p-14 w-full text-center relative flex flex-col items-center min-h-[400px] justify-center">
        
        {/* Decorative corner lines */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-ink/20"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-ink/20"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-ink/20"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-ink/20"></div>

        {/* Topic Tag */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-accent px-6 py-2 border-2 border-ink rounded-full shadow-hard-sm rotate-[-2deg]">
          <span className="text-ink font-bold text-xs uppercase tracking-widest">
            {twister.topic}
          </span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-display text-ink leading-tight mb-8 mt-4 relative z-10">
          "{twister.text}"
        </h2>

        {twister.repetitionCount > 1 && (
            <div className="flex items-center gap-3 bg-paper border-2 border-ink px-5 py-2 rounded-full mb-8 transform rotate-1">
                <span className="text-xl">⚡️</span> 
                <span className="text-sm font-bold text-ink">Target Sets: {twister.repetitionCount}x</span>
            </div>
        )}

        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePlayTTS}
          disabled={isPlayingAudio || isGrading || isRecording}
          className="border-ink text-ink hover:bg-ink hover:text-white"
        >
          {isPlayingAudio ? 'Coach is reading...' : 'Listen to Proper Form'}
        </Button>
      </div>

      {/* Recording Interface - "The Mic" */}
      <div className="flex flex-col items-center space-y-6 mt-4">
         <div className={`relative transition-all duration-300 ${isRecording ? 'scale-110' : 'scale-100'}`}>
           <Button
             size="lg"
             variant={isRecording ? 'secondary' : 'primary'}
             onClick={handleToggleRecord}
             disabled={isGrading || isPlayingAudio}
             className={`w-24 h-24 !rounded-full !p-0 flex items-center justify-center text-4xl border-2 border-ink !shadow-hard transition-all duration-300`}
           >
             {isRecording ? '⏹' : '🎙'}
           </Button>
         </div>
         
         <div className="bg-surface border-2 border-ink px-6 py-2 rounded-full shadow-hard-sm">
            <p className="text-ink font-bold text-sm tracking-wide">
            {isGrading ? 'Head Coach is evaluating...' : 
                isRecording ? 'Lifting... Push those syllables!' : 
                'Begin Your Reps'}
            </p>
         </div>
      </div>
    </div>
  );
};