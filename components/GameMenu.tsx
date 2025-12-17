import React from 'react';
import { Difficulty, PlayerStats } from '../types';

interface GameMenuProps {
  onStart: (difficulty: Difficulty) => void;
  stats: PlayerStats;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onStart, stats }) => {
  const isMediumLocked = stats.level < 3;
  const isHardLocked = stats.level < 5;
  const xpProgress = stats.xp % 100;

  const getRepText = (base: number, divisor: number) => {
      const reps = base + Math.floor((stats.level - 1) / divisor);
      return `Target: ${reps}x`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-10 animate-fade-in-up py-8 w-full max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-4">
        <h1 className="text-6xl md:text-7xl font-display italic text-ink mb-2">
          Twistopia
        </h1>
        <p className="text-ink/70 text-lg font-sans font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
          Flex your verbal muscles in this linguistic gymnasium!
        </p>
      </div>

      {/* Player Stats Ticket */}
      <div className="w-full max-w-lg">
        <div className="bg-surface rounded-sm border-2 border-ink shadow-hard p-4 flex items-center justify-between gap-6 relative overflow-hidden">
          {/* Decorative notched corners look */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-ink"></div>
          <div className="absolute top-0 right-0 w-2 h-2 bg-ink"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-ink"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-ink"></div>
          
          <div className="z-10 bg-surface w-full h-full p-2 flex flex-col gap-2">
             <div className="flex justify-between items-end border-b-2 border-ink/10 pb-2">
                 <div>
                   <span className="text-xs font-bold text-ink/50 uppercase tracking-widest block">Athlete Proficiency</span>
                   <span className="text-3xl font-display text-primary">Level {stats.level}</span>
                 </div>
                 <div className="text-right">
                   <span className="text-xl font-bold text-ink">{stats.xp} XP</span>
                 </div>
             </div>
             
             <div className="relative w-full h-4 bg-paper border-2 border-ink rounded-full overflow-hidden mt-1">
                <div 
                  className="absolute top-0 left-0 h-full bg-accent border-r-2 border-ink"
                  style={{ width: `${xpProgress}%` }}
                />
             </div>
             <div className="text-right text-xs font-bold text-ink/40 uppercase">
                Next rank in {100 - xpProgress} XP
             </div>
          </div>
        </div>
      </div>

      {/* Difficulty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4 mt-8">
        
        {/* EASY Card */}
        <div onClick={() => onStart(Difficulty.EASY)} className="group cursor-pointer">
           <div className="bg-surface p-6 rounded-xl border-2 border-ink shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2D2825] h-full flex flex-col items-center min-h-[240px] relative">
             <div className="w-16 h-16 bg-primary/20 rounded-full border-2 border-ink flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                <span className="text-3xl">🥒</span>
             </div>
             <h3 className="text-2xl font-display text-ink mb-2">Warm Up</h3>
             <p className="text-ink/60 text-sm font-medium mb-6 text-center">Light cardio for your tongue. Simple rhymes and smooth flows.</p>
             
             <div className="mt-auto bg-paper px-4 py-1 border-2 border-ink rounded-full text-xs font-bold uppercase tracking-wider text-ink">
                 {getRepText(5, 3)}
             </div>
           </div>
        </div>

        {/* MEDIUM Card */}
        <div onClick={() => !isMediumLocked && onStart(Difficulty.MEDIUM)} className={`group cursor-pointer relative`}>
           {isMediumLocked && (
             <div className="absolute inset-0 z-20 bg-paper/80 backdrop-blur-[1px] border-2 border-ink/50 rounded-xl flex flex-col items-center justify-center cursor-not-allowed">
                <div className="bg-ink text-surface px-4 py-2 rounded-lg border-2 border-ink shadow-hard mb-2">
                    <span className="font-bold font-sans">LOCKED</span>
                </div>
                <span className="text-sm font-bold text-ink tracking-wider">Reach Level 3</span>
             </div>
           )}
           <div className="bg-surface p-6 rounded-xl border-2 border-ink shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2D2825] h-full flex flex-col items-center min-h-[240px]">
             <div className="w-16 h-16 bg-accent/20 rounded-full border-2 border-ink flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                <span className="text-3xl">💡</span>
             </div>
             <h3 className="text-2xl font-display text-ink mb-2">Intensity</h3>
             <p className="text-ink/60 text-sm font-medium mb-6 text-center">Developing similes and rhythmic control. Watch your form.</p>
             
             <div className="mt-auto bg-paper px-4 py-1 border-2 border-ink rounded-full text-xs font-bold uppercase tracking-wider text-ink">
                 {getRepText(3, 4)}
             </div>
           </div>
        </div>

        {/* HARD Card */}
        <div onClick={() => !isHardLocked && onStart(Difficulty.HARD)} className={`group cursor-pointer relative`}>
           {isHardLocked && (
             <div className="absolute inset-0 z-20 bg-paper/80 backdrop-blur-[1px] border-2 border-ink/50 rounded-xl flex flex-col items-center justify-center cursor-not-allowed">
                <div className="bg-ink text-surface px-4 py-2 rounded-lg border-2 border-ink shadow-hard mb-2">
                    <span className="font-bold font-sans">LOCKED</span>
                </div>
                <span className="text-sm font-bold text-ink tracking-wider">Reach Level 5</span>
             </div>
           )}
           <div className="bg-surface p-6 rounded-xl border-2 border-ink shadow-hard transition-all duration-200 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#2D2825] h-full flex flex-col items-center min-h-[240px]">
             <div className="w-16 h-16 bg-secondary/20 rounded-full border-2 border-ink flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                <span className="text-3xl">🔥</span>
             </div>
             <h3 className="text-2xl font-display text-ink mb-2">Iron Tongue</h3>
             <p className="text-ink/60 text-sm font-medium mb-6 text-center">Extreme alliteration. Poetic license required for these heavy lifts.</p>
             
             <div className="mt-auto bg-paper px-4 py-1 border-2 border-ink rounded-full text-xs font-bold uppercase tracking-wider text-ink">
                 {getRepText(2, 5)}
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};