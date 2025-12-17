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

  const comments = useMemo(() => ({
    MENU: [
      "Warm up those phonemes! No tongue-cramps allowed!",
      "Ready for your verbal heavy lifting?",
      "Linguistic cardio starts now!",
      "Hydrate! Sibilance is thirsty work!",
      "Flex your vowels, athlete!",
      "The gymnasium of grammar awaits!",
      "Squeak! Don't forget to stretch your jaw!",
      "Articulation is the key to Twistopian glory!",
      "Check your posture! Shoulders back, vowels out!",
      "Is that a glottal stop or are you just happy to see me?",
    ],
    LOADING: [
      "Polishing the plosives...",
      "Stretching the diphthongs...",
      "Calibrating the sibilance-ometer...",
      "Sorting syllables into heavy stacks...",
      "Calculating vocal resistance...",
      "Buffing the affricates to a high shine!",
      "Measuring the frequency of your fricatives...",
    ],
    PLAYING: [
      "Breathe from the diaphragm!",
      "Clean sets! No stuttering on the descent!",
      "Rhythm is 90% of the workout!",
      "Don't let the consonants trip you up!",
      "Watch your form! Keep it tight!",
      "Push it! Every syllable counts!",
      "Engage your articulators! Go, go, go!",
    ],
    RESULT_PERFECT: [
      "Elite form! Olympic gold!",
      "Your tongue is made of titanium!",
      "Syllable-Sovereign status achieved!",
      "I'm weeping... such beautiful articulation.",
      "Pure verbal poetry! You're a beast!",
      "Maximum gains! Your diction is shredded!",
      "Zero vocal fat. That was clinical!",
    ],
    RESULT_GOOD: [
      "Strong reps! Keep that intensity!",
      "Solid workout. I've seen worse!",
      "Good rhythm, watch those plosives!",
      "Vocal muscles are looking swole!",
      "Keep pushing! You're nearly at pro level!",
      "A few more sets and you'll be a Diction Deity!",
    ],
    RESULT_POOR: [
      "Oof, a bit of a tongue-snag there.",
      "Drop and give me twenty 'Red Lorries'!",
      "Don't skip tongue day!",
      "Focus! Your vowels are wobbling!",
      "Back to the bench! Let's work on that form.",
      "That was more of a vocal-sprain than a set.",
    ],
    IDLE: [
      "Just counting my acorns... and your stumbles!",
      "Is it lunchtime yet? I crave linguistic fiber!",
      "Did you know 'sibilance' has three S's? Cardio!",
      "I should've been a poet, but I like sweatbands too much.",
      "Vocal fry is for bacon, not for Twistopia!",
      "Keep practicing, syllable-squatter!",
      "A quick nap would really help my diphthongs.",
      "Thinking about the physics of the letter 'P'.",
      "I wonder if 'Lex' is a monosyllabic name... efficient!",
    ],
    CLICKED: [
      "Hey! Watch the fur, coach is busy!",
      "Teleporting for better acoustics!",
      "I'm as nimble as a well-placed adjective!",
      "Squeak! Watch the tail!",
      "Personal space! Use your words, not your fingers!",
      "Precision teleportation engaged!",
      "Stop poke-coaching me!",
      "My tail provides aerodynamic stability during high-speed diction.",
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

      // Improved safe-zone logic to keep him in the margins
      switch(side) {
        case 0: // Top edge
          newTop = (Math.random() * 10 + 5) + '%';
          newLeft = (Math.random() * 80 + 10) + '%';
          break;
        case 1: // Bottom edge
          newTop = (Math.random() * 10 + 85) + '%';
          newLeft = (Math.random() * 80 + 10) + '%';
          break;
        case 2: // Left edge
          newTop = (Math.random() * 70 + 15) + '%';
          newLeft = (Math.random() * 10 + 5) + '%';
          break;
        case 3: // Right edge
        default:
          newTop = (Math.random() * 70 + 15) + '%';
          newLeft = (Math.random() * 10 + 85) + '%';
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

  // Handle bubble flip and alignment to avoid screen edges
  const bubbleStyles = useMemo(() => {
    const topNum = parseFloat(position.top);
    const leftNum = parseFloat(position.left);
    
    let styles: React.CSSProperties = {
      position: 'absolute',
      width: '12rem',
    };

    // Vertical positioning
    if (topNum < 30) {
      styles.top = '115%';
    } else {
      styles.bottom = '115%';
    }

    // Horizontal alignment to prevent clipping
    if (leftNum < 25) {
      styles.left = '20%';
      styles.transform = 'none';
    } else if (leftNum > 75) {
      styles.right = '20%';
      styles.left = 'auto';
      styles.transform = 'none';
    } else {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  }, [position]);

  const arrowStyles = useMemo(() => {
    const topNum = parseFloat(position.top);
    const leftNum = parseFloat(position.left);
    
    let styles: React.CSSProperties = {
      position: 'absolute',
      width: '0',
      height: '0',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
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

    if (leftNum < 25) {
      styles.left = '10%';
    } else if (leftNum > 75) {
      styles.right = '10%';
      styles.left = 'auto';
    } else {
      styles.left = '50%';
      styles.transform += ' translateX(-50%)';
    }

    return styles;
  }, [position]);

  // Idle Animations
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 3000);

    const eyeInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setPupilOffset({
          x: (Math.random() - 0.5) * 8,
          y: (Math.random() - 0.5) * 5
        });
        setTimeout(() => setPupilOffset({ x: 0, y: 0 }), 1000);
      }
    }, 4000);

    const gestureInterval = setInterval(() => {
      if (Math.random() > 0.8 && gameState === GameState.MENU) {
        setGesture('bounce');
        setTimeout(() => setGesture('none'), 1000);
      }
    }, 5000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(eyeInterval);
      clearInterval(gestureInterval);
    };
  }, [gameState]);

  // Periodic Random Commenting
  useEffect(() => {
    const idleCommentInterval = setInterval(() => {
      if (gameState === GameState.MENU && !showBubble && Math.random() > 0.5) {
        const idleMoods: Expression[] = ['thinking', 'cool', 'sleepy', 'academic'];
        triggerBubble(comments.IDLE[Math.floor(Math.random() * comments.IDLE.length)]);
        setExpression(idleMoods[Math.floor(Math.random() * idleMoods.length)]);
      }
    }, 15000);

    return () => clearInterval(idleCommentInterval);
  }, [gameState, showBubble, comments, triggerBubble]);

  // Game State Reactions
  useEffect(() => {
    if (gameState !== GameState.MENU) teleport();
    
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
    triggerBubble(msg);
  }, [gameState, score, comments, teleport, triggerBubble]);

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
      {/* Speech Bubble Container */}
      <div 
        className={`bg-surface border-2 border-ink p-3 rounded-2xl shadow-hard-sm transition-all duration-300 pointer-events-none z-50 ${showBubble ? 'opacity-100' : 'opacity-0 scale-90 translate-y-2'}`}
        style={bubbleStyles}
      >
        <p className="text-[11px] font-bold text-ink leading-tight text-center italic">
          "{bubble}"
        </p>
        <div style={arrowStyles}></div>
      </div>

      {/* Lex the Syllable-Squirrel */}
      <div className={`w-28 h-28 md:w-36 md:h-36 relative transition-transform duration-300 group-hover:scale-110 active:scale-95 ${gesture === 'bounce' ? 'animate-bounce' : gesture === 'shake' ? 'animate-shake' : ''}`}>
        <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-xl overflow-visible ${gesture === 'glow' ? 'animate-pulse' : ''}`}>
          <style>
            {`
              @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px) rotate(-2deg); }
                75% { transform: translateX(5px) rotate(2deg); }
              }
              .animate-shake { animation: shake 0.2s ease-in-out infinite; }
              @keyframes breathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.04); }
              }
              .lex-body-group { animation: breathe 3s ease-in-out infinite; transform-origin: center 150px; }
              .lex-tail { transform-origin: 100px 140px; transition: transform 0.5s ease; }
            `}
          </style>

          {/* FLUFFY TAIL */}
          <g className="lex-tail group-hover:rotate-[5deg]">
            <path 
              d="M120,150 Q200,150 210,90 Q220,20 140,10 Q80,5 70,80" 
              fill="#B86B62" 
              stroke="#2D2825" 
              strokeWidth="5" 
            />
            <path d="M140,30 Q170,50 160,95" fill="none" stroke="#F2EFE9" strokeWidth="10" strokeLinecap="round" opacity="0.3" />
          </g>

          <g className="lex-body-group">
            {/* LITTLE LEGS */}
            <g>
              <ellipse cx="75" cy="182" rx="14" ry="10" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
              <ellipse cx="125" cy="182" rx="14" ry="10" fill="#B86B62" stroke="#2D2825" strokeWidth="4" />
              {/* Feet Details */}
              <line x1="68" y1="185" x2="68" y2="188" stroke="#2D2825" strokeWidth="2" strokeLinecap="round" />
              <line x1="75" y1="186" x2="75" y2="189" stroke="#2D2825" strokeWidth="2" strokeLinecap="round" />
              <line x1="82" y1="185" x2="82" y2="188" stroke="#2D2825" strokeWidth="2" strokeLinecap="round" />
              <line x1="118" y1="185" x2="118" y2="188" stroke="#2D2825" strokeWidth="2" strokeLinecap="round" />
              <line x1="125" y1="186" x2="125" y2="189" stroke="#2D2825" strokeWidth="2" strokeLinecap="round" />
              <line x1="132" y1="185" x2="132" y2="188" stroke="#2D2825" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* ROUND CHUBBY BODY */}
            <ellipse cx="100" cy="150" rx="60" ry="55" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
            <ellipse cx="100" cy="155" rx="42" ry="38" fill="#F2EFE9" />

            {/* HEAD */}
            <path 
              d="M45,100 Q45,35 100,35 Q155,35 155,100 Q155,145 100,145 Q45,145 45,100" 
              fill="#B86B62" 
              stroke="#2D2825" 
              strokeWidth="5" 
            />
            
            {/* Muzzle Highlights */}
            <path d="M50,95 Q50,55 100,55 Q150,55 150,95 Q150,135 100,135 Q50,135 50,95" fill="#F2EFE9" opacity="0.25" />

            {/* EARS with Tufts */}
            <g>
              <path d="M60,50 L45,10 Q70,5 80,45 Z" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
              <path d="M140,50 L155,10 Q130,5 120,45 Z" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
              <path d="M58,45 L54,25 Q62,20 68,40" fill="#F2EFE9" opacity="0.4" />
              <path d="M142,45 L146,25 Q138,20 132,40" fill="#F2EFE9" opacity="0.4" />
            </g>

            {/* SWEATBAND */}
            {(expression === 'determined' || expression === 'academic' || expression === 'thinking') && (
              <rect x="52" y="52" width="96" height="16" fill="#E8C574" stroke="#2D2825" strokeWidth="4" rx="3" />
            )}

            {/* LARGE EXPRESSIVE EYES */}
            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              <circle cx="82" cy="98" r="16" fill="white" stroke="#2D2825" strokeWidth="1" />
              <circle cx="118" cy="98" r="16" fill="white" stroke="#2D2825" strokeWidth="1" />
              
              <circle cx="82" cy="98" r="12" fill="#2D2825" />
              <circle cx="118" cy="98" r="12" fill="#2D2825" />
              
              <circle cx="86" cy="92" r="5" fill="white" />
              <circle cx="122" cy="92" r="5" fill="white" />
              <circle cx="78" cy="104" r="2" fill="white" opacity="0.6" />
              <circle cx="114" cy="104" r="2" fill="white" opacity="0.6" />
            </g>

            {/* EYE OVERLAYS */}
            {isBlinking && (
               <g>
                 <ellipse cx="82" cy="98" rx="17" ry="17" fill="#B86B62" stroke="#2D2825" strokeWidth="3" />
                 <ellipse cx="118" cy="98" rx="17" ry="17" fill="#B86B62" stroke="#2D2825" strokeWidth="3" />
                 <line x1="64" y1="98" x2="100" y2="98" stroke="#2D2825" strokeWidth="4" />
                 <line x1="100" y1="98" x2="136" y2="98" stroke="#2D2825" strokeWidth="4" />
               </g>
            )}

            {expression === 'cool' && (
              <g>
                 <rect x="60" y="88" width="80" height="20" rx="4" fill="#2D2825" />
                 <path d="M60,98 L50,90 M140,98 L150,90" stroke="#2D2825" strokeWidth="3" />
                 <line x1="95" y1="98" x2="105" y2="98" stroke="#F2EFE9" strokeWidth="2" opacity="0.5" />
              </g>
            )}

            {expression === 'sleepy' && (
              <g>
                <path d="M66,98 Q82,108 98,98" fill="none" stroke="#2D2825" strokeWidth="3" strokeLinecap="round" />
                <path d="M102,98 Q118,108 134,98" fill="none" stroke="#2D2825" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {expression === 'grumpy' && (
               <g>
                 <path d="M68,82 L96,92" stroke="#2D2825" strokeWidth="5" strokeLinecap="round" />
                 <path d="M132,82 L104,92" stroke="#2D2825" strokeWidth="5" strokeLinecap="round" />
               </g>
            )}

            {expression === 'academic' && !isBlinking && (
              <g opacity="0.8">
                <circle cx="82" cy="98" r="21" fill="none" stroke="#2D2825" strokeWidth="3" />
                <circle cx="118" cy="98" r="21" fill="none" stroke="#2D2825" strokeWidth="3" />
                <line x1="101" y1="98" x2="99" y2="98" stroke="#2D2825" strokeWidth="4" />
              </g>
            )}

            {/* NOSE & MOUTH */}
            <circle cx="100" cy="115" r="5" fill="#2D2825" />
            {expression === 'happy' || expression === 'love' ? (
               <path d="M85,122 Q100,140 115,122" fill="none" stroke="#2D2825" strokeWidth="4" strokeLinecap="round" />
            ) : expression === 'grumpy' ? (
               <path d="M90,128 Q100,122 110,128" fill="none" stroke="#2D2825" strokeWidth="4" strokeLinecap="round" />
            ) : expression === 'sleepy' ? (
               <circle cx="100" cy="126" r="6" fill="none" stroke="#2D2825" strokeWidth="2" opacity="0.5" />
            ) : (
               <path d="M92,124 Q100,130 108,124" fill="none" stroke="#2D2825" strokeWidth="3" strokeLinecap="round" />
            )}
            
            {/* BLUSH */}
            <circle cx="62" cy="120" r="9" fill="#B86B62" opacity="0.4" />
            <circle cx="138" cy="120" r="9" fill="#B86B62" opacity="0.4" />

            {/* PAWS */}
            <circle cx="70" cy="155" r="14" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
            <circle cx="130" cy="155" r="14" fill="#B86B62" stroke="#2D2825" strokeWidth="5" />
            
            {expression === 'love' && (
              <path d="M165,75 Q175,65 185,75 Q195,85 175,105 Q155,85 165,75" fill="#B86B62" stroke="#2D2825" strokeWidth="3" />
            )}
          </g>
        </svg>
      </div>
    </div>
  );
};