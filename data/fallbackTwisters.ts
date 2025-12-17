import { Difficulty, Twister } from "../types";

export const FALLBACK_TWISTERS: Twister[] = [
  // EASY
  {
    text: "Red lorry, yellow lorry.",
    topic: "Colors",
    difficulty: Difficulty.EASY
  },
  {
    text: "She sells seashells by the seashore.",
    topic: "Beach",
    difficulty: Difficulty.EASY
  },
  {
    text: "I scream, you scream, we all scream for ice cream.",
    topic: "Food",
    difficulty: Difficulty.EASY
  },
  {
    text: "Fresh fried fish, fish fresh fried, fried fish fresh, fish fried fresh.",
    topic: "Food",
    difficulty: Difficulty.EASY
  },
  {
    text: "He threw three free throws.",
    topic: "Sports",
    difficulty: Difficulty.EASY
  },

  // MEDIUM
  {
    text: "Peter Piper picked a peck of pickled peppers.",
    topic: "Food",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Betty Botter bought some butter but she said the butter's bitter.",
    topic: "Food",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Susie works in a shoeshine shop. Where she shines she sits, and where she sits she shines.",
    topic: "Work",
    difficulty: Difficulty.MEDIUM
  },

  // HARD
  {
    text: "The sixth sick sheik's sixth sheep's sick.",
    topic: "Royalty",
    difficulty: Difficulty.HARD
  },
  {
    text: "Pad kid poured curd pulled cod.",
    topic: "Nonsense",
    difficulty: Difficulty.HARD
  },
  {
    text: "Imagine an imaginary menagerie manager managing an imaginary menagerie.",
    topic: "Imagination",
    difficulty: Difficulty.HARD
  },
  {
    text: "Rory the warrior and Roger the worrier were reared wrongly in a rural brewery.",
    topic: "Story",
    difficulty: Difficulty.HARD
  },
  {
    text: "Lesser leather never weathered wetter weather better.",
    topic: "Weather",
    difficulty: Difficulty.HARD
  }
];
