import React from 'react';
import { Difficulty } from '../types';
import { Button } from './Button';

interface GameMenuProps {
  onStart: (difficulty: Difficulty) => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-fade-in-up">
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-sm">
          Twistopia
        </h1>
        <p className="text-gray-600 text-lg md:text-xl max-w-md mx-auto">
          Test your tongue's agility with AI-generated challenges!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl px-4">
        <div onClick={() => onStart(Difficulty.EASY)} className="group cursor-pointer">
           <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-green-400 hover:border-green-500 transition-all hover:-translate-y-1 h-full flex flex-col items-center">
             <div className="text-4xl mb-4">🥒</div>
             <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">Easy</h3>
             <p className="text-center text-gray-500 text-sm">Warm up with some simple rhymes.</p>
           </div>
        </div>

        <div onClick={() => onStart(Difficulty.MEDIUM)} className="group cursor-pointer">
           <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-yellow-400 hover:border-yellow-500 transition-all hover:-translate-y-1 h-full flex flex-col items-center">
             <div className="text-4xl mb-4">🌶️</div>
             <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">Medium</h3>
             <p className="text-center text-gray-500 text-sm">Getting spicy! Watch your speed.</p>
           </div>
        </div>

        <div onClick={() => onStart(Difficulty.HARD)} className="group cursor-pointer">
           <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-red-500 hover:border-red-600 transition-all hover:-translate-y-1 h-full flex flex-col items-center">
             <div className="text-4xl mb-4">🔥</div>
             <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">Hard</h3>
             <p className="text-center text-gray-500 text-sm">Impossible twists for the brave.</p>
           </div>
        </div>
      </div>
    </div>
  );
};