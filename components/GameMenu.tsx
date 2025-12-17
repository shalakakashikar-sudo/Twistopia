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
      return `REPEAT ${reps}x`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-fade-in-up">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-sm">
          Twistopia
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-lg mx-auto font-medium">
          Flex your verbal muscles in this linguistic gymnasium! Twist, shout, and articulate your way to the top.
        </p>
      </div>

      {/* Player Stats Card */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-md border border-white/50">
        <div className="flex justify-between items-end mb-2">
           <div>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Player Level</span>
             <div className="text-3xl font-display font-bold text-primary">Level {stats.level}</div>
           </div>
           <div className="text-right">
             <span className="text-sm font-semibold text-gray-600">{stats.xp} Total XP</span>
           </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
        <p className="text-xs text-center text-gray-400 mt-2">
          {100 - xpProgress} XP to next level
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
        {/* EASY */}
        <div onClick={() => onStart(Difficulty.EASY)} className="group cursor-pointer">
           <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-green-400 hover:border-green-500 transition-all hover:-translate-y-1 h-full flex flex-col items-center">
             <div className="text-4xl mb-4">🥒</div>
             <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">Easy</h3>
             <p className="text-center text-gray-500 text-sm mb-2">Simple rhymes.</p>
             <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">
                 {getRepText(5, 3)}
             </span>
           </div>
        </div>

        {/* MEDIUM */}
        <div onClick={() => !isMediumLocked && onStart(Difficulty.MEDIUM)} className={`group cursor-pointer relative ${isMediumLocked ? 'opacity-75' : ''}`}>
           {isMediumLocked && (
             <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[1px] rounded-2xl z-10 flex flex-col items-center justify-center text-gray-600">
                <div className="text-4xl mb-2">🔒</div>
                <span className="font-bold bg-white/90 px-3 py-1 rounded-full text-sm">Unlock at Lvl 3</span>
             </div>
           )}
           <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-yellow-400 hover:border-yellow-500 transition-all hover:-translate-y-1 h-full flex flex-col items-center">
             <div className="text-4xl mb-4">🌶️</div>
             <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">Medium</h3>
             <p className="text-center text-gray-500 text-sm mb-2">Getting spicy.</p>
             <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">
                 {getRepText(3, 4)}
             </span>
           </div>
        </div>

        {/* HARD */}
        <div onClick={() => !isHardLocked && onStart(Difficulty.HARD)} className={`group cursor-pointer relative ${isHardLocked ? 'opacity-75' : ''}`}>
           {isHardLocked && (
             <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[1px] rounded-2xl z-10 flex flex-col items-center justify-center text-gray-600">
                <div className="text-4xl mb-2">🔒</div>
                <span className="font-bold bg-white/90 px-3 py-1 rounded-full text-sm">Unlock at Lvl 5</span>
             </div>
           )}
           <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-red-500 hover:border-red-600 transition-all hover:-translate-y-1 h-full flex flex-col items-center">
             <div className="text-4xl mb-4">🔥</div>
             <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">Hard</h3>
             <p className="text-center text-gray-500 text-sm mb-2">Impossible logic.</p>
             <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                 {getRepText(2, 5)}
             </span>
           </div>
        </div>
      </div>
    </div>
  );
};
