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

  const difficultyColor = 
    twister.difficulty === 'Easy' ? 'text-green-600 bg-green-50' : 
    twister.difficulty === 'Medium' ? 'text-orange-600 bg-orange-50' : 'text-red-600 bg-red-50';

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center space-y-8 animate-fade-in py-6">
      
      {/* Navigation */}
      <div className="w-full flex justify-between items-center px-2">
        <button onClick={onBack} className="text-slate-400 hover:text-slate-800 transition-colors flex items-center gap-2 text-sm font-medium">
          <span className="text-xl">←</span> Menu
        </button>
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase ${difficultyColor}`}>
          {twister.difficulty}
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-[2.5rem] shadow-soft p-10 md:p-16 w-full text-center relative border border-slate-50 flex flex-col items-center">
        
        {/* Repetition Target */}
        <div className="absolute top-8 right-8">
          <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-widest shadow-md">
             TARGET: {twister.repetitionCount}x
          </span>
        </div>
        
        <span className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase mb-8">
          {twister.topic}
        </span>
        
        <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-800 leading-snug mb-10 max-w-3xl">
          "{twister.text}"
        </h2>

        {twister.repetitionCount > 1 && (
            <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-4 py-2 rounded-xl mb-8">
                <span className="text-lg">🔥</span> 
                <span className="text-sm font-medium">Repeat {twister.repetitionCount} times fast</span>
            </div>
        )}

        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePlayTTS}
          disabled={isPlayingAudio || isGrading || isRecording}
          className="text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-800 hover:border-slate-300"
        >
          {isPlayingAudio ? 'Playing...' : 'Hear Pronunciation'}
        </Button>
      </div>

      {/* Recording Interface */}
      <div className="flex flex-col items-center space-y-6">
         <div className={`relative transition-all duration-300 ${isRecording ? 'scale-110' : 'scale-100'}`}>
           {isRecording && (
             <span className="absolute -inset-6 rounded-full bg-red-100 opacity-50 animate-pulse"></span>
           )}
           <Button
             size="lg"
             variant={isRecording ? 'secondary' : 'primary'}
             onClick={handleToggleRecord}
             disabled={isGrading || isPlayingAudio}
             className={`w-20 h-20 !rounded-full !p-0 flex items-center justify-center text-3xl shadow-glow transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 shadow-red-200' : 'bg-slate-900 hover:bg-black'}`}
           >
             {isRecording ? '⏹' : '🎙'}
           </Button>
         </div>
         
         <p className="text-slate-400 font-medium text-sm tracking-wide">
           {isGrading ? 'AI Judge is analyzing...' : 
            isRecording ? 'Recording... Enunciate clearly!' : 
            'Tap to record'}
         </p>
      </div>
    </div>
  );
};