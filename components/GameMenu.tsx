import React from 'react';
import { Difficulty, PlayerStats } from '../types';

interface GameMenuProps {
  onStart: (difficulty: Difficulty) => void;
  stats: PlayerStats;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onStart, stats }) => {
  // Logic to lock levels
  const isMediumLocked = stats.level < 3;
  const isHardLocked = stats.level < 5;

  const xpProgress = stats.xp % 100; // XP within current level

  // Calculate dynamic repetition display (approximate for menu)
  const getRepText = (base: number, divisor: number) => {
      const reps = base + Math.floor((stats.level - 1) / divisor);
      return `Target: ${reps}x`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12 animate-fade-in-up py-8">
      
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl md:text-8xl font-display font-semibold text-slate-800 tracking-tight">
          Twistopia
        </h1>
        <p className="text-slate-500 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto">
          Flex your verbal muscles in this linguistic gymnasium!
        </p>
      </div>

      {/* Player Stats - Minimal Dashboard */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-100">
          <div className="flex justify-between items-center mb-4">
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level</span>
               <span className="text-2xl font-display font-medium text-slate-800">{stats.level}</span>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Experience</span>
               <span className="text-lg font-medium text-slate-600">{stats.xp} XP</span>
             </div>
          </div>
          {/* Minimal Progress Bar */}
          <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-slate-800 transition-all duration-700 ease-out rounded-full"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <div className="text-right mt-2">
            <span className="text-xs text-slate-400">{100 - xpProgress} to go</span>
          </div>
        </div>
      </div>

      {/* Difficulty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
        
        {/* EASY */}
        <div onClick={() => onStart(Difficulty.EASY)} className="group cursor-pointer">
           <div className="bg-white p-8 rounded-3xl shadow-soft border border-slate-50 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center justify-between min-h-[220px]">
             <div className="flex flex-col items-center">
                <span className="text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">🥒</span>
                <h3 className="text-xl font-display font-medium text-slate-800">Easy</h3>
                <p className="text-slate-400 text-sm mt-1">Simple rhymes</p>
             </div>
             <span className="mt-6 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                 {getRepText(5, 3)}
             </span>
           </div>
        </div>

        {/* MEDIUM */}
        <div onClick={() => !isMediumLocked && onStart(Difficulty.MEDIUM)} className={`group cursor-pointer relative`}>
           {isMediumLocked && (
             <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center cursor-not-allowed">
                <div className="bg-slate-900 text-white p-2 rounded-full mb-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-xs font-bold text-slate-600 tracking-wider">LVL 3</span>
             </div>
           )}
           <div className={`bg-white p-8 rounded-3xl shadow-soft border border-slate-50 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center justify-between min-h-[220px] ${isMediumLocked ? 'opacity-50 grayscale' : ''}`}>
             <div className="flex flex-col items-center">
                <span className="text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">🌶️</span>
                <h3 className="text-xl font-display font-medium text-slate-800">Medium</h3>
                <p className="text-slate-400 text-sm mt-1">Getting spicy</p>
             </div>
             <span className="mt-6 text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                 {getRepText(3, 4)}
             </span>
           </div>
        </div>

        {/* HARD */}
        <div onClick={() => !isHardLocked && onStart(Difficulty.HARD)} className={`group cursor-pointer relative`}>
           {isHardLocked && (
             <div className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center cursor-not-allowed">
                <div className="bg-slate-900 text-white p-2 rounded-full mb-2 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                </div>
                <span className="text-xs font-bold text-slate-600 tracking-wider">LVL 5</span>
             </div>
           )}
           <div className={`bg-white p-8 rounded-3xl shadow-soft border border-slate-50 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center justify-between min-h-[220px] ${isHardLocked ? 'opacity-50 grayscale' : ''}`}>
             <div className="flex flex-col items-center">
                <span className="text-4xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">🔥</span>
                <h3 className="text-xl font-display font-medium text-slate-800">Hard</h3>
                <p className="text-slate-400 text-sm mt-1">Brain twisters</p>
             </div>
             <span className="mt-6 text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                 {getRepText(2, 5)}
             </span>
           </div>
        </div>
      </div>
    </div>
  );
};