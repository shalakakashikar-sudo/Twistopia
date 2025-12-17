import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { GameState } from '../types';

interface MascotProps {
  gameState: GameState;
  score?: number;
}

type Expression = 'happy' | 'determined' | 'shocked' | 'academic' | 'wink' | 'exhausted' | 'love' | 'thinking' | 'cool' | 'sleepy' | 'grumpy';

export const Mascot: React.FC<MascotProps> = ({ gameState, score }) => {
  const [position, setPosition] = useState({ top: '15%', left: '10%' });
  const [expression, setExpression] = useState<Expression>('academic');
  const [bubble, setBubble] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isBlinking, setIsBlinking] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [showBubble, setShowBubble] = useState(false);
  const [gesture, setGesture] = useState<'none' | 'bounce' | 'shake' | 'glow'>('none');
  
  const bubbleTimeoutRef = useRef<number | null>(null);
  const lastStateRef = useRef<GameState>(gameState);

  const comments = useMemo(() => ({
    MENU: [
      "Welcome to the Diction Dojo. Is your tongue ready for some heavy lifting?",
      "Remember: Precision over speed. A sloppy rep is a wasted rep.",
      "The difference between a speaker and a master is ten thousand sibilants.",
      "Vocal cords are muscles. Hydrate them or they'll ghost you mid-sentence.",
      "Linguistic cardio isn't just about breath; it's about structural integrity.",
      "Your vowels look a bit soft today. Let's tighten those up.",
      "Squeak! Diction is the ultimate flex in a world of mumbling.",
      "Standard operating procedure: Breathe, focus, articulate, conquer.",
      "A glottal stop is just a speed bump on the road to eloquence.",
    ],
    LOADING: [
      "Analyzing phonemic density...",
      "Calibrating the articulators for high-torque output.",
      "Stretching the soft palate... safety first.",
      "Optimizing diphthong trajectories.",
      "Heavy load incoming. Prepare for linguistic resistance.",
      "Polishing the plosives. We want a clean pop, not a splash.",
    ],
    PLAYING: [
      "Drive from the diaphragm! Don't let the throat do the heavy work.",
      "Lock your core. Let the consonants snap into place.",
      "Find the meter. Rhythm is your best friend in a high-rep set.",
      "Watch that transition. The 'S' to 'SH' shift is where most athletes fail.",
      "Keep the intensity high. No slacking on the final syllable.",
      "Focus. Your articulators are drifting. Stay centered.",
    ],
    RESULT_PERFECT: [
      "Clinical. That was a masterclass in vocal precision.",
      "Zero phonemic leakage. You've been training, haven't you?",
      "The Syllable-Sovereign has entered the building. Bow down.",
      "I'm actually impressed. And I once coached a parrot to recite Shakespeare.",
      "That level of articulation is statistically improbable. Excellent.",
      "Your diction is shredded. You could cut glass with those consonants.",
    ],
    RESULT_GOOD: [
      "Solid set. Your form held up under pressure.",
      "Good recovery on that third rep. Keep that mental toughness.",
      "Your sibilance is peaking. A bit more grit and you're elite.",
      "Respectable effort. You're building some serious vocal mass.",
      "Strong rhythm. Don't skip the cool-down exercises.",
    ],
    RESULT_POOR: [
      "That was more of a vocal-spasm than a vocal-set. Reset and retry.",
      "Your vowels are sagging. Drop and give me twenty 'Proper Coppers'.",
      "We don't mumble in Twistopia. We articulate with intent.",
      "Tongue-cramp? Or just a lack of focus? Either way, it's sloppy.",
      "That's a 'DNF' in my book. Back to the fundamentals.",
    ],
    IDLE: [
      "I wonder if 'Lex' is the most aerodynamically efficient name possible.",
      "Staring at the dot grid... it's like graph paper for my soul.",
      "Just thinking about the friction coefficient of a well-placed fricative.",
      "Is it weird that I find the letter 'Q' unnecessarily flamboyant?",
      "Efficiency is key. Why use ten words when three sharp ones suffice?",
      "Analyzing your previous set... room for marginal gains in the dental region.",
    ],
    CLICKED: [
      "Teleporting to a higher vantage point. Better acoustics here.",
      "Careful with the fur. It's precision-engineered for low drag.",
      "I'm as nimble as a dangling participle!",
      "Tactical repositioning engaged. Can't coach from a static position.",
      "Squeak! My tail is for balance, not for grabbing!",
    ]
  }), []);

  const triggerBubble = useCallback((text: string, duration = 4000) => {
    if (bubbleTimeoutRef.current) window.clearTimeout(bubbleTimeoutRef.current);
    setBubble(text);
    setShowBubble(true);
    bubbleTimeoutRef.current = window.setTimeout(() => setShowBubble(false), duration);
  }, []);

  const teleport = useCallback((isClick = false) => {
    setIsVisible(false);
    setTimeout(() => {
      let newTop: string, newLeft: string;
      const side = Math.floor(Math.random() * 4); 

      switch(side) {
        case 0: // Top edge
          newTop = (Math.random() * 8 + 4) + '%';
          newLeft = (Math.random() * 70 + 15) + '%';
          break;
        case 1: // Bottom edge
          newTop = (Math.random() * 8 + 88) + '%';
          newLeft = (Math.random() * 70 + 15) + '%';
          break;
        case 2: // Left edge
          newTop = (Math.random() * 60 + 20) + '%';
          newLeft = (Math.random() * 8 + 4) + '%';
          break;
        case 3: // Right edge
        default:
          newTop = (Math.random() * 60 + 20) + '%';
          newLeft = (Math.random() * 8 + 88) + '%';
          break;
      }

      setPosition({ top: newTop, left: newLeft });
      
      if (isClick) {
        triggerBubble(comments.CLICKED[Math.floor(Math.random() * comments.CLICKED.length)]);
        setExpression('love');
        setGesture('bounce');
      }
      setIsVisible(true);
    }, 400);
  }, [comments, triggerBubble]);

  const bubbleStyles = useMemo(() => {
    const topNum = parseFloat(position.top);
    const leftNum = parseFloat(position.left);
    let styles: React.CSSProperties = { position: 'absolute', width: '13rem' };

    if (topNum < 30) styles.top = '115%';
    else styles.bottom = '115%';

    if (leftNum < 25) { styles.left = '20%'; styles.transform = 'none'; }
    else if (leftNum > 75) { styles.right = '20%'; styles.left = 'auto'; styles.transform = 'none'; }
    else { styles.left = '50%'; styles.transform = 'translateX(-50%)'; }

    return styles;
  }, [position]);

  const arrowStyles = useMemo(() => {
    const topNum = parseFloat(position.top);
    const leftNum = parseFloat(position.left);
    let styles: React.CSSProperties = {
      position: 'absolute', width: '0', height: '0',
      borderLeft: '8px solid transparent', borderRight: '8px solid transparent',
    };

    if (topNum < 30) {
      styles.bottom = '100%';
      styles.borderBottom = '8px solid #2D2825';
      styles.transform = 'translateY(1px)';
    } else {
      styles.top = '100%';
      styles.borderTop = '8px solid #2D2825';
      styles.transform = 'translateY(-1px)';
    }

    if (leftNum < 25) styles.left = '10%';
    else if (leftNum > 75) { styles.right = '10%'; styles.left = 'auto'; }
    else { styles.left = '50%'; styles.transform += ' translateX(-50%)'; }

    return styles;
  }, [position]);

  // Idle Animations
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3500);

    const eyeInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setPupilOffset({ x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 4 });
        setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 1200);
      }
    }, 5000);

    const gestureInterval = setInterval(() => {
      // Much lower frequency for random bouncing
      if (Math.random() > 0.9 && gameState === GameState.MENU) {
        setGesture('bounce');
        setTimeout(() => setGesture('none'), 800);
      }
    }, 15000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(eyeInterval);
      clearInterval(gestureInterval);
    };
  }, [gameState]);

  // Periodic Random Commenting
  useEffect(() => {
    const idleCommentInterval = setInterval(() => {
      if (gameState === GameState.MENU && !showBubble && Math.random() > 0.4) {
        const idleMoods: Expression[] = ['thinking', 'cool', 'sleepy', 'academic'];
        triggerBubble(comments.IDLE[Math.floor(Math.random() * comments.IDLE.length)]);
        setExpression(idleMoods[Math.floor(Math.random() * idleMoods.length)]);
      }
    }, 25000); // Increased interval to reduce chatter

    return () => clearInterval(idleCommentInterval);
  }, [gameState, showBubble, comments, triggerBubble]);

  // Game State Reactions - Reduced Jumpiness
  useEffect(() => {
    // Only teleport on significant state changes (Entering Menu, Loading, Result)
    // Avoid teleporting on PLAYING -> GRADING to prevent distraction during focus
    const majorTransitions = [GameState.MENU, GameState.LOADING_TWISTER, GameState.RESULT];
    if (majorTransitions.includes(gameState) && lastStateRef.current !== gameState) {
       teleport();
    }
    lastStateRef.current = gameState;
    
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
          setGesture('glow');
        } else if (score && score >= 70) {
          mood = 'wink';
          msg = comments.RESULT_GOOD[Math.floor(Math.random() * comments.RESULT_GOOD.length)];
        } else {
          mood = 'exhausted';
          msg = comments.RESULT_POOR[Math.floor(Math.random() * comments.RESULT_POOR.length)];
          setGesture('shake');
        }
        break;
    }
    setExpression(mood);
    // Don't override user interaction bubble
    if (!showBubble || gameState !== GameState.MENU) {
      triggerBubble(msg);
    }
  }, [gameState, score, comments, teleport, triggerBubble, showBubble]);

  return (
    <div 
      className={`fixed z-[100] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer group select-none ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
      style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}
      onClick={() => teleport(true)}
      onTouchStart={(e) => {
        e.preventDefault();
        teleport(true);
      }}
    >
      <div 
        className={`bg-surface border-2 border-ink p-3 rounded-2xl shadow-hard-sm transition-all duration-300 pointer-events-none z-50 ${showBubble ? 'opacity-100 scale-100' : 'opacity-0 scale-90 translate-y-2'}`}
        style={bubbleStyles}
      >
        <p className="text-[11px] font-bold text-ink leading-tight text-center italic">
          "{bubble}"
        </p>
        <div style={arrowStyles}></div>
      </div>

      <div className={`w-24 h-24 md:w-32 md:h-32 relative transition-transform duration-300 group-hover:scale-105 active:scale-95 ${gesture === 'bounce' ? 'animate-bounce' : gesture === 'shake' ? 'animate-shake' : ''}`}>
        <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-lg overflow-visible ${gesture === 'glow' ? 'animate-pulse' : ''}`}>
          <style>
            {`
              @keyframes lex-shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-3px) rotate(-1deg); }
                75% { transform: translateX(3px) rotate(1deg); }
              }
              .animate-shake { animation: lex-shake 0.25s ease-in-out infinite; }
              @keyframes lex-breathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
              }
              .lex-body-group { animation: lex-breathe 4s ease-in-out infinite; transform-origin: center 160px; }
              .lex-tail { transform-origin: 100px 140px; transition: transform 0.6s ease; }
            `}
          </style>

          <g className="lex-tail group-hover:rotate-[3deg]">
            <path d="M120,150 Q200,150 210,90 Q220,20 140,10 Q80,5 70,80" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
            <path d="M140,30 Q170,50 160,95" fill="none" stroke="#F2EFE9" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
          </g>

          <g className="lex-body-group">
            <g>
              <ellipse cx="75" cy="182" rx="12" ry="8" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
              <ellipse cx="125" cy="182" rx="12" ry="8" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
              <line x1="68" y1="185" x2="68" y2="187" stroke="#2D2825" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="75" y1="186" x2="75" y2="188" stroke="#2D2825" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="125" y1="186" x2="125" y2="188" stroke="#2D2825" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="132" y1="185" x2="132" y2="187" stroke="#2D2825" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            <ellipse cx="100" cy="150" rx="55" ry="50" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
            <ellipse cx="100" cy="155" rx="38" ry="32" fill="#F2EFE9" />

            <path d="M45,100 Q45,35 100,35 Q155,35 155,100 Q155,145 100,145 Q45,145 45,100" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
            <path d="M50,95 Q50,55 100,55 Q150,55 150,95 Q150,135 100,135 Q50,135 50,95" fill="#F2EFE9" opacity="0.2" />

            <g>
              <path d="M60,50 L45,12 Q70,8 80,45 Z" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
              <path d="M140,50 L155,12 Q130,8 120,45 Z" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
              <path d="M58,45 L54,28 Q62,24 68,40" fill="#F2EFE9" opacity="0.4" />
              <path d="M142,45 L146,28 Q138,24 132,40" fill="#F2EFE9" opacity="0.4" />
            </g>

            {(expression === 'determined' || expression === 'academic' || expression === 'thinking') && (
              <rect x="52" y="52" width="96" height="14" fill="#E8C574" stroke="#2D2825" strokeWidth="4" rx="2" />
            )}

            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              <circle cx="82" cy="98" r="15" fill="white" stroke="#2D2825" strokeWidth="1" />
              <circle cx="118" cy="98" r="15" fill="white" stroke="#2D2825" strokeWidth="1" />
              <circle cx="82" cy="98" r="11" fill="#2D2825" />
              <circle cx="118" cy="98" r="11" fill="#2D2825" />
              <circle cx="85" cy="93" r="4" fill="white" />
              <circle cx="121" cy="93" r="4" fill="white" />
              <circle cx="79" cy="103" r="1.5" fill="white" opacity="0.6" />
              <circle cx="115" cy="103" r="1.5" fill="white" opacity="0.6" />
            </g>

            {isBlinking && (
               <g>
                 <ellipse cx="82" cy="98" rx="16" ry="16" fill="#B86B62" stroke="#2D2825" strokeWidth="3" />
                 <ellipse cx="118" cy="98" rx="16" ry="16" fill="#B86B62" stroke="#2D2825" strokeWidth="3" />
                 <line x1="66" y1="98" x2="98" y2="98" stroke="#2D2825" strokeWidth="4" strokeLinecap="round" />
                 <line x1="102" y1="98" x2="134" y2="98" stroke="#2D2825" strokeWidth="4" strokeLinecap="round" />
               </g>
            )}

            {expression === 'cool' && (
              <g>
                 <rect x="62" y="90" width="76" height="16" rx="3" fill="#2D2825" />
                 <path d="M62,98 L52,92 M138,98 L148,92" stroke="#2D2825" strokeWidth="2.5" />
                 <line x1="95" y1="98" x2="105" y2="98" stroke="#F2EFE9" strokeWidth="1.5" opacity="0.4" />
              </g>
            )}

            {expression === 'sleepy' && (
              <g>
                <path d="M68,98 Q82,106 96,98" fill="none" stroke="#2D2825" strokeWidth="3" strokeLinecap="round" />
                <path d="M104,98 Q118,106 132,98" fill="none" stroke="#2D2825" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {expression === 'grumpy' && (
               <g>
                 <path d="M68,84 L94,92" stroke="#2D2825" strokeWidth="4" strokeLinecap="round" />
                 <path d="M132,84 L106,92" stroke="#2D2825" strokeWidth="4" strokeLinecap="round" />
               </g>
            )}

            {expression === 'academic' && !isBlinking && (
              <g opacity="0.8">
                <circle cx="82" cy="98" r="20" fill="none" stroke="#2D2825" strokeWidth="3" />
                <circle cx="118" cy="98" r="20" fill="none" stroke="#2D2825" strokeWidth="3" />
              </g>
            )}

            <circle cx="100" cy="115" r="4.5" fill="#2D2825" />
            {expression === 'happy' || expression === 'love' ? (
               <path d="M86,122 Q100,138 114,122" fill="none" stroke="#2D2825" strokeWidth="3.5" strokeLinecap="round" />
            ) : expression === 'grumpy' ? (
               <path d="M92,127 Q100,122 108,127" fill="none" stroke="#2D2825" strokeWidth="3.5" strokeLinecap="round" />
            ) : (
               <path d="M92,124 Q100,129 108,124" fill="none" stroke="#2D2825" strokeWidth="2.5" strokeLinecap="round" />
            )}
            
            <circle cx="62" cy="120" r="8" fill="#B86B62" opacity="0.3" />
            <circle cx="138" cy="120" r="8" fill="#B86B62" opacity="0.3" />

            <circle cx="70" cy="155" r="12" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
            <circle cx="130" cy="155" r="12" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
            
            {expression === 'love' && (
              <path d="M165,75 Q175,65 185,75 Q195,85 175,105 Q155,85 165,75" fill="#B86B62" stroke="#2D2825" strokeWidth="2.5" />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};