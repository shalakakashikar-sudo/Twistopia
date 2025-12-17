import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GameState } from '../types';

interface MascotProps {
  gameState: GameState;
  score?: number;
}

type Expression = 'happy' | 'determined' | 'shocked' | 'academic' | 'wink' | 'exhausted' | 'love';

export const Mascot: React.FC<MascotProps> = ({ gameState, score }) => {
  const [position, setPosition] = useState({ top: '10%', left: '5%' });
  const [expression, setExpression] = useState<Expression>('academic');
  const [bubble, setBubble] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const comments = useMemo(() => ({
    MENU: [
      "Warm up those phonemes! No tongue-cramps allowed!",
      "Ready for your verbal heavy lifting?",
      "Linguistic cardio starts now!",
      "Hydrate! Sibilance is thirsty work!",
      "Flex your vowels, athlete!",
      "The gymnasium of grammar awaits!",
    ],
    LOADING: [
      "Polishing the plosives...",
      "Stretching the diphthongs...",
      "Calibrating the sibilance-ometer...",
      "Sorting syllables into heavy stacks...",
    ],
    PLAYING: [
      "Breathe from the diaphragm!",
      "Clean sets! No stuttering on the descent!",
      "Rhythm is 90% of the workout!",
      "Don't let the consonants trip you up!",
    ],
    RESULT_PERFECT: [
      "Elite form! Olympic gold!",
      "Your tongue is made of titanium!",
      "Syllable-Sovereign status achieved!",
      "I'm weeping... such beautiful articulation.",
    ],
    RESULT_GOOD: [
      "Strong reps! Keep that intensity!",
      "Solid workout. I've seen worse!",
      "Good rhythm, watch those plosives!",
    ],
    RESULT_POOR: [
      "Oof, a bit of a tongue-snag there.",
      "Drop and give me twenty 'Red Lorries'!",
      "Don't skip tongue day!",
    ],
    CLICKED: [
      "Hey! Watch the fur, coach is busy!",
      "Teleporting for better acoustics!",
      "I'm as nimble as a well-placed adjective!",
      "Squeak! Watch the tail!",
    ]
  }), []);

  const teleport = useCallback((isClick = false) => {
    setIsVisible(false);
    setTimeout(() => {
      // Logic to stay within visible bounds (approx 15% buffer)
      // Avoid the center where the game cards usually reside
      let newTop: string, newLeft: string;
      const side = Math.floor(Math.random() * 4); // 0: Top, 1: Bottom, 2: Left, 3: Right

      switch(side) {
        case 0: // Top edge
          newTop = (Math.random() * 5 + 5) + '%';
          newLeft = (Math.random() * 80 + 5) + '%';
          break;
        case 1: // Bottom edge
          newTop = (Math.random() * 5 + 85) + '%';
          newLeft = (Math.random() * 80 + 5) + '%';
          break;
        case 2: // Left edge
          newTop = (Math.random() * 80 + 5) + '%';
          newLeft = (Math.random() * 5 + 5) + '%';
          break;
        case 3: // Right edge
        default:
          newTop = (Math.random() * 80 + 5) + '%';
          newLeft = (Math.random() * 5 + 85) + '%';
          break;
      }

      setPosition({ top: newTop, left: newLeft });
      
      if (isClick) {
        setBubble(comments.CLICKED[Math.floor(Math.random() * comments.CLICKED.length)]);
        setExpression('love');
      }
      setIsVisible(true);
    }, 300);
  }, [comments]);

  useEffect(() => {
    teleport();
    
    let mood: Expression = 'academic';
    let msg = "";

    switch(gameState) {
      case GameState.MENU:
        mood = 'academic';
        msg = comments.MENU[Math.floor(Math.random() * comments.MENU.length)];
        break;
      case GameState.LOADING_TWISTER:
        mood = 'determined';
        msg = comments.LOADING[Math.floor(Math.random() * comments.LOADING.length)];
        break;
      case GameState.PLAYING:
        mood = 'determined';
        msg = comments.PLAYING[Math.floor(Math.random() * comments.PLAYING.length)];
        break;
      case GameState.RESULT:
        if (score && score >= 90) {
          mood = 'happy';
          msg = comments.RESULT_PERFECT[Math.floor(Math.random() * comments.RESULT_PERFECT.length)];
        } else if (score && score >= 70) {
          mood = 'wink';
          msg = comments.RESULT_GOOD[Math.floor(Math.random() * comments.RESULT_GOOD.length)];
        } else {
          mood = 'exhausted';
          msg = comments.RESULT_POOR[Math.floor(Math.random() * comments.RESULT_POOR.length)];
        }
        break;
    }
    setExpression(mood);
    setBubble(msg);
  }, [gameState, score, comments, teleport]);

  return (
    <div 
      className={`fixed z-[100] transition-all duration-500 ease-out cursor-pointer group select-none ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
      style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
      onClick={() => teleport(true)}
      onTouchStart={() => teleport(true)}
    >
      {/* Speech Bubble */}
      <div className="absolute bottom-[105%] left-1/2 -translate-x-1/2 mb-2 w-36 bg-surface border-2 border-ink p-2 rounded-xl shadow-hard-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        <p className="text-[10px] font-bold text-ink leading-tight text-center italic">
          "{bubble}"
        </p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-ink"></div>
      </div>

      {/* Lex Redesign - High Fidelity Chibi Squirrel */}
      <div className="w-20 h-20 md:w-24 md:h-24 relative transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md overflow-visible">
          {/* LARGE FLUFFY TAIL */}
          <path 
            d="M120,150 Q180,150 190,90 Q200,30 140,20 Q100,10 85,70" 
            fill="#B86B62" 
            stroke="#2D2825" 
            strokeWidth="5" 
          />
          <path d="M140,35 Q160,50 150,85" fill="none" stroke="#F2EFE9" strokeWidth="6" strokeLinecap="round" opacity="0.4" />

          {/* ROUND CHUBBY BODY */}
          <ellipse cx="100" cy="145" rx="50" ry="45" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
          <ellipse cx="100" cy="150" rx="35" ry="30" fill="#F2EFE9" />

          {/* HEAD */}
          <path 
            d="M55,100 Q55,45 100,45 Q145,45 145,100 Q145,135 100,135 Q55,135 55,100" 
            fill="#B86B62" 
            stroke="#2D2825" 
            strokeWidth="5" 
          />
          <path d="M60,95 Q60,65 100,65 Q140,65 140,95 Q140,125 100,125 Q60,125 60,95" fill="#F2EFE9" opacity="0.3" />

          {/* EARS */}
          <path d="M65,60 L55,25 Q75,20 85,55 Z" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
          <path d="M135,60 L145,25 Q125,20 115,55 Z" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
          <path d="M62,55 L58,35 Q65,30 70,50 Z" fill="#F2EFE9" opacity="0.5" />
          <path d="M138,55 L142,35 Q135,30 130,50 Z" fill="#F2EFE9" opacity="0.5" />

          {/* SWEATBAND (Conditional) */}
          {(expression === 'determined' || expression === 'academic') && (
            <rect x="62" y="60" width="76" height="12" fill="#E8C574" stroke="#2D2825" strokeWidth="4" rx="3" />
          )}

          {/* LARGE EXPRESSIVE EYES */}
          <g>
            {/* Base Eyes */}
            <circle cx="82" cy="98" r="14" fill="#2D2825" />
            <circle cx="118" cy="98" r="14" fill="#2D2825" />
            
            {/* Shine Dots */}
            <circle cx="86" cy="92" r="5" fill="white" />
            <circle cx="122" cy="92" r="5" fill="white" />
            <circle cx="78" cy="102" r="2" fill="white" opacity="0.6" />
            <circle cx="114" cy="102" r="2" fill="white" opacity="0.6" />

            {/* Overlays for expressions */}
            {expression === 'academic' && (
              <g>
                <circle cx="82" cy="98" r="18" fill="none" stroke="#2D2825" strokeWidth="3" />
                <circle cx="118" cy="98" r="18" fill="none" stroke="#2D2825" strokeWidth="3" />
                <line x1="100" y1="98" x2="100" y2="98" stroke="#2D2825" strokeWidth="4" />
              </g>
            )}
            {expression === 'happy' && (
              <path d="M70,110 Q82,120 94,110 M106,110 Q118,120 130,110" fill="none" stroke="#2D2825" strokeWidth="3" opacity="0" />
            )}
            {expression === 'wink' && (
              <rect x="104" y="84" width="28" height="28" fill="#B86B62" />
            )}
            {expression === 'exhausted' && (
               <g>
                 <line x1="72" y1="88" x2="92" y2="108" stroke="white" strokeWidth="3" />
                 <line x1="92" y1="88" x2="72" y2="108" stroke="white" strokeWidth="3" />
                 <line x1="108" y1="88" x2="128" y2="108" stroke="white" strokeWidth="3" />
                 <line x1="128" y1="88" x2="108" y2="108" stroke="white" strokeWidth="3" />
               </g>
            )}
          </g>

          {/* HEART (Love) */}
          {expression === 'love' && (
            <path d="M160,60 Q170,50 180,60 Q190,70 170,90 Q150,70 160,60" fill="#B86B62" stroke="#2D2825" strokeWidth="3" />
          )}

          {/* NOSE & MOUTH */}
          <circle cx="100" cy="108" r="4" fill="#2D2825" />
          <path d="M92,115 Q100,122 108,115" fill="none" stroke="#2D2825" strokeWidth="3" strokeLinecap="round" />
          
          {/* BLUSH */}
          <circle cx="65" cy="115" r="8" fill="#B86B62" opacity="0.3" />
          <circle cx="135" cy="115" r="8" fill="#B86B62" opacity="0.3" />

          {/* PAWS */}
          <circle cx="75" cy="140" r="10" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
          <circle cx="125" cy="140" r="10" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
        </svg>
      </div>
    </div>
  );
};