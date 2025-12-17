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
}

export interface GradingResult {
  score: number;
  feedback: string;
  isCorrect: boolean;
}
