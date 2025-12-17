import React from 'react';
import { GradingResult, Twister, PlayerStats } from '../types';
import { Button } from './Button';

interface ResultViewProps {
  result: GradingResult;
  twister: Twister;
  currentStats: PlayerStats;
  onNext: () => void;
  onRetry: () => void;
  onMenu: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ result, twister, currentStats, onNext, onRetry, onMenu }) => {
  const isPerfect = result.score >= 90;
  const isGood = result.score >= 70 && result.score < 90;
  
  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-8 animate-fade-in-up py-8">
      <div className="bg-white rounded-3xl shadow-soft p-10 border border-slate-50 relative">
        
        <div className="mb-6">
          <span className="text-7xl block mb-4 filter drop-shadow-sm">
            {isPerfect ? '🏆' : isGood ? '👏' : '🤔'}
          </span>
          <h2 className="text-3xl font-display font-semibold text-slate-800">
            {isPerfect ? 'Perfection!' : isGood ? 'Well Done' : 'Keep Trying'}
          </h2>
        </div>

        <div className="flex flex-col items-center mb-8">
           <div className="text-6xl font-display font-light text-slate-800">
             {result.score}
             <span className="text-2xl text-slate-300 ml-1">/100</span>
           </div>
           
           <div className="mt-4 animate-fade-in">
              <span className="inline-block bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full font-bold text-sm border border-yellow-100">
                  +{result.xpEarned} XP
              </span>
           </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left border border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">AI Feedback</p>
          <p className="text-slate-600 leading-relaxed font-light">"{result.feedback}"</p>
        </div>

        {/* Minimal XP Bar */}
        <div className="mb-8">
            <div className="flex justify-between text-xs text-slate-400 mb-2 font-medium tracking-wide">
                <span>LEVEL {currentStats.level}</span>
                <span>{currentStats.xp % 100} / 100 XP</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div 
                    className="bg-slate-800 h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${currentStats.xp % 100}%` }}
                ></div>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button onClick={onRetry} variant="outline" className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">
            Retry Same
          </Button>
          <Button onClick={onNext} variant="primary" className="bg-slate-900 text-white hover:bg-black shadow-none">
            Next Challenge
          </Button>
        </div>
        
        <div className="mt-8">
           <button onClick={onMenu} className="text-slate-400 hover:text-slate-600 text-xs font-semibold tracking-widest uppercase transition-colors">
             Back to Menu
           </button>
        </div>
      </div>
    </div>
  );
};