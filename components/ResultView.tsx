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
    <div className="w-full max-w-2xl mx-auto text-center space-y-6 animate-fade-in-up">
      <div className="bg-white rounded-3xl shadow-2xl p-8 border-t-8 border-primary overflow-hidden relative">
        
        <div className="mb-4">
          <span className="text-6xl md:text-8xl block mb-2">
            {isPerfect ? '🏆' : isGood ? '👏' : '🤔'}
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800">
            {isPerfect ? 'Masterful!' : isGood ? 'Great Job!' : 'Nice Try!'}
          </h2>
        </div>

        <div className="flex justify-center items-end gap-2 mb-4 text-gray-800">
           <div className="text-center">
             <span className="text-6xl font-bold">{result.score}</span>
             <span className="text-2xl font-medium text-gray-400 mb-2">/100</span>
           </div>
        </div>

        {/* XP Gain Animation */}
        <div className="mb-6 animate-pulse">
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-lg border border-yellow-300">
                +{result.xpEarned} XP Earned
            </span>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">AI Feedback</p>
          <p className="text-gray-700 italic">"{result.feedback}"</p>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
            <div 
                className="bg-primary h-full" 
                style={{ width: `${currentStats.xp % 100}%` }}
            ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button onClick={onRetry} variant="secondary">
            ↺ Retry Same
          </Button>
          <Button onClick={onNext} variant="primary">
            Next Challenge →
          </Button>
        </div>
        
        <div className="mt-6">
           <button onClick={onMenu} className="text-gray-400 hover:text-gray-600 text-sm underline">
             Return to Menu
           </button>
        </div>
      </div>
    </div>
  );
};
