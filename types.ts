export enum GameState {
  MENU = 'MENU',
  LOADING_TWISTER = 'LOADING_TWISTER',
  PLAYING = 'PLAYING',
  GRADING = 'GRADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard'
}

export interface Twister {
  text: string;
  topic: string;
  difficulty: Difficulty;
  repetitionCount: number; // New field: How many times to say it
}

export interface GradingResult {
  score: number;
  feedback: string;
  isCorrect: boolean;
  xpEarned: number; // New field for game loop
}

export interface PlayerStats {
  xp: number;
  level: number;
  twistersCompleted: number;
}
