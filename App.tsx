import React, { useState } from 'react';
import { GameMenu } from './components/GameMenu';
import { Gameplay } from './components/Gameplay';
import { ResultView } from './components/ResultView';
import { GameState, Difficulty, Twister, GradingResult } from './types';
import { generateTongueTwister, gradePronunciation } from './services/geminiService';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [currentTwister, setCurrentTwister] = useState<Twister | null>(null);
  const [lastResult, setLastResult] = useState<GradingResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const startGame = async (diff: Difficulty) => {
    setDifficulty(diff);
    setGameState(GameState.LOADING_TWISTER);
    setErrorMsg(null);
    try {
      const twister = await generateTongueTwister(diff);
      setCurrentTwister(twister);
      setGameState(GameState.PLAYING);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to generate a tongue twister. Check your connection or API key.");
      setGameState(GameState.MENU);
    }
  };

  const handleGrade = async (audioBase64: string, mimeType: string) => {
    if (!currentTwister) return;
    
    setGameState(GameState.GRADING);
    try {
      const result = await gradePronunciation(currentTwister.text, audioBase64, mimeType);
      setLastResult(result);
      setGameState(GameState.RESULT);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to grade the audio. Please try recording again.");
      setGameState(GameState.PLAYING); // Go back to playing so they can retry
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleNext = () => {
    startGame(difficulty); // Generate new one with same difficulty
  };

  const handleRetry = () => {
    setGameState(GameState.PLAYING);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden font-sans text-gray-800">
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[100px] opacity-40 z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-200 rounded-full blur-[100px] opacity-40 z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 py-8 relative z-10 min-h-screen flex flex-col">
        
        {/* Error Toast */}
        {errorMsg && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded-full shadow-lg z-50 animate-bounce">
            {errorMsg}
          </div>
        )}

        <main className="flex-grow flex flex-col justify-center">
          {gameState === GameState.MENU && (
            <GameMenu onStart={startGame} />
          )}

          {gameState === GameState.LOADING_TWISTER && (
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xl font-display font-medium text-gray-600 animate-pulse">
                Conjuring a twisty phrase...
              </p>
            </div>
          )}

          {(gameState === GameState.PLAYING || gameState === GameState.GRADING) && currentTwister && (
            <Gameplay 
              twister={currentTwister} 
              onGrade={handleGrade} 
              onBack={() => setGameState(GameState.MENU)}
              isGrading={gameState === GameState.GRADING}
            />
          )}

          {gameState === GameState.RESULT && lastResult && currentTwister && (
            <ResultView 
              result={lastResult}
              twister={currentTwister}
              onNext={handleNext}
              onRetry={handleRetry}
              onMenu={() => setGameState(GameState.MENU)}
            />
          )}
        </main>
        
        <footer className="text-center text-gray-400 text-sm mt-8">
          Powered by Google Gemini 2.5 • Created by Shalaka Kashikar
        </footer>
      </div>
    </div>
  );
};

export default App;