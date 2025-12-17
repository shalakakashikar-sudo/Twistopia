import { Difficulty, Twister } from "../types";

export const FALLBACK_TWISTERS: Twister[] = [
  // --- EASY (Short, simple sounds) ---
  {
    text: "Red lorry, yellow lorry.",
    topic: "Liquids (L/R)",
    difficulty: Difficulty.EASY
  },
  {
    text: "A proper copper coffee pot.",
    topic: "Plosives (P/K)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Big bees buzz.",
    topic: "Voicing (B/Z)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Sue sees Zoos.",
    topic: "Voicing (S/Z)",
    difficulty: Difficulty.EASY
  },
  {
    text: "How now brown cow.",
    topic: "Vowels",
    difficulty: Difficulty.EASY
  },
  {
    text: "He threw three free throws.",
    topic: "Fricatives (TH)",
    difficulty: Difficulty.EASY
  },
  {
    text: "I scream, you scream, we all scream for ice cream.",
    topic: "Prosody",
    difficulty: Difficulty.EASY
  },
  {
    text: "Black back bat.",
    topic: "Clusters (BL)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Cheap chip shop chips.",
    topic: "Affricates (CH)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Truly rural.",
    topic: "Liquids (R)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Willie’s really weary.",
    topic: "Glides (W/R)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Big black bugs bleed blue-black blood.",
    topic: "Plosives (B/L)",
    difficulty: Difficulty.EASY
  },
  {
    text: "Six slippery snails slid slowly seaward.",
    topic: "Sibilance (S)",
    difficulty: Difficulty.EASY
  },

  // --- MEDIUM (Sentences, alternating sounds) ---
  {
    text: "Peter Piper picked a peck of pickled peppers.",
    topic: "Plosives (P)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "She sells seashells by the seashore.",
    topic: "Fricatives (SH/S)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    topic: "Rhythm",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?",
    topic: "Fricatives (F/Z)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Tom threw Tim three thumbtacks.",
    topic: "Plosives (T)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Many mumbling mice are making midnight music in the moonlight.",
    topic: "Nasals (M)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Nine nice night nurses nursing nicely.",
    topic: "Nasals (N)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Four furious friends fought for the phone.",
    topic: "Fricatives (F)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Zebras zig and zebras zag through the zoo zone.",
    topic: "Fricatives (Z)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Which witch wished which wicked wish?",
    topic: "Affricates (W/CH)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Jolly Jerry juggled juicy jellies.",
    topic: "Affricates (J)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Larry’s lizard likes leaping leopards.",
    topic: "Liquids (L)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Round and round the rugged rock the ragged rascal ran.",
    topic: "Liquids (R)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "You know New York, you need New York, you know you need unique New York.",
    topic: "Glides (Y/N)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Fred fed Fido fried food.",
    topic: "Fricatives (F)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "The great Greek grape growers grow great Greek grapes.",
    topic: "Clusters (GR)",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "An old owl knows how loud vowels sound.",
    topic: "Vowels",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Brisk brave brigadiers brandish broad bright blades.",
    topic: "Clusters (BR/BL)",
    difficulty: Difficulty.MEDIUM
  },

  // --- HARD (Complex narratives, tongue fatigue) ---
  {
    text: "The sixth sick sheik's sixth sheep's sick.",
    topic: "Sibilance (S/SH/K)",
    difficulty: Difficulty.HARD
  },
  {
    text: "Pad kid poured curd pulled cod.",
    topic: "Plosives (P/K/D)",
    difficulty: Difficulty.HARD
  },
  {
    text: "Imagine an imaginary menagerie manager managing an imaginary menagerie.",
    topic: "Nasals/Affricates",
    difficulty: Difficulty.HARD
  },
  {
    text: "If two witches would watch two watches, which witch would watch which watch?",
    topic: "Logic/W/CH",
    difficulty: Difficulty.HARD
  },
  {
    text: "The seething sea ceaseth and thus the seething sea sufficeth us.",
    topic: "Sibilance (S/TH)",
    difficulty: Difficulty.HARD
  },
  {
    text: "To begin to toboggan, first buy a toboggan. But don’t buy too big a toboggan. Too big a toboggan is too big a toboggan to begin to toboggan.",
    topic: "Plosives (T/B/G)",
    difficulty: Difficulty.HARD
  },
  {
    text: "She sells sea shells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells.",
    topic: "Full Challenge",
    difficulty: Difficulty.HARD
  },
  {
    text: "A tree toad loved a she-toad who lived up in a tree. He was a three-toed tree toad, but a two-toed toad was she. The three-toed tree toad tried to win the two-toed she-toad's heart.",
    topic: "Narrative",
    difficulty: Difficulty.HARD
  },
  {
    text: "Betty Botter bought some butter but she said the butter's bitter. If I bake this bitter butter, it would make my batter bitter. But a bit of better butter that would make my batter better.",
    topic: "Plosives (B/T)",
    difficulty: Difficulty.HARD
  },
  {
    text: "Doctor DooLittle’s doctoring developed delightful diagnoses during difficult days. Diagnostically determined, he detected disastrous diseases directly.",
    topic: "Plosives (D)",
    difficulty: Difficulty.HARD
  },
  {
    text: "Six slick sisters sit silently sewing shoes in a shoe shop. Suddenly, six slithery snakes slid silently into the shop. The six slick sisters swiftly and silently sewed shut six slippery slithery snakeholes.",
    topic: "Sibilance Story",
    difficulty: Difficulty.HARD
  },
  {
    text: "Fred’s freight flew fast from Fresno to Framingham. Frightfully fast, Fred's freight flew forward — Freight full of frothy fried frogs, five fragile frames, forty flapping flags.",
    topic: "Fricatives (F/FR)",
    difficulty: Difficulty.HARD
  },
  {
    text: "Rory the warrior and Roger the worrier were reared wrongly in a rural brewery.",
    topic: "Liquids (R/W)",
    difficulty: Difficulty.HARD
  }
];
