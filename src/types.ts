export type Difficulty = "Easy" | "Medium" | "Hard";

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
