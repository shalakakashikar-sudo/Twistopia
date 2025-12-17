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
      
      <div className="bg-surface rounded-xl border-2 border-ink shadow-hard p-10 relative">
        
        {/* Ribbon decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-8 py-2 border-2 border-ink shadow-hard-sm transform rotate-1">
             <span className="font-display text-lg tracking-wide">Coach's Evaluation</span>
        </div>

        <div className="mt-8 mb-6">
          <span className="text-6xl block mb-4">
            {isPerfect ? '🥇' : isGood ? '💪' : '⚖️'}
          </span>
          <h2 className="text-4xl font-display text-ink mb-1">
            {isPerfect ? 'Elite Performance!' : isGood ? 'Strong Effort!' : 'Back to the Bench'}
          </h2>
        </div>

        <div className="flex flex-col items-center mb-8 bg-paper border-2 border-ink p-4 rounded-lg">
           <div className="text-5xl font-display text-ink">
             {result.score}
             <span className="text-xl text-ink/40 ml-1">/100</span>
           </div>
           
           <div className="mt-2">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">
                  +{result.xpEarned} Athlete Experience
              </span>
           </div>
        </div>

        <div className="text-left mb-8">
          <label className="block text-xs font-bold text-ink/50 uppercase tracking-widest mb-2 border-b-2 border-ink/10 pb-1">Workout Notes</label>
          <p className="text-ink font-medium leading-relaxed font-sans text-lg">"{result.feedback}"</p>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onRetry} variant="outline" className="flex-1">
            Redo Set
          </Button>
          <Button onClick={onNext} variant="primary" className="flex-1">
            Next Drill
          </Button>
        </div>
      </div>

      <button onClick={onMenu} className="text-ink/60 hover:text-ink text-sm font-bold tracking-widest uppercase border-b-2 border-transparent hover:border-ink transition-all">
          Exit Gymnasium
      </button>

    </div>
  );
};