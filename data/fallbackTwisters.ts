import { Difficulty, Twister } from "../types";

export const FALLBACK_TWISTERS: Twister[] = [
  // --- EASY (Short, simple sounds) ---
  {
    text: "Red lorry, yellow lorry.",
    topic: "Liquids (L/R)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "A proper copper coffee pot.",
    topic: "Plosives (P/K)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Big bees buzz.",
    topic: "Voicing (B/Z)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Sue sees Zoos.",
    topic: "Voicing (S/Z)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "How now brown cow.",
    topic: "Vowels",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "He threw three free throws.",
    topic: "Fricatives (TH)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "I scream, you scream, we all scream for ice cream.",
    topic: "Prosody",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Black back bat.",
    topic: "Clusters (BL)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Cheap chip shop chips.",
    topic: "Affricates (CH)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Truly rural.",
    topic: "Liquids (R)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Willie’s really weary.",
    topic: "Glides (W/R)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Big black bugs bleed blue-black blood.",
    topic: "Plosives (B/L)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Split splashed sloppily.",
    topic: "Clusters (SPL)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Nine nice night nurses nursing nicely.",
    topic: "Nasals (N)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },
  {
    text: "Four furious friends fought for the phone.",
    topic: "Fricatives (F)",
    difficulty: Difficulty.EASY,
    repetitionCount: 5
  },

  // --- MEDIUM (Sentences, alternating sounds) ---
  {
    text: "Peter Piper picked a peck of pickled peppers.",
    topic: "Plosives (P)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "She sells seashells by the seashore.",
    topic: "Fricatives (SH/S)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    topic: "Rhythm",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?",
    topic: "Fricatives (F/Z)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Tom threw Tim three thumbtacks.",
    topic: "Plosives (T)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Great gray goats graze on green grass.",
    topic: "Plosives (G)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Many mumbling mice are making midnight music in the moonlight.",
    topic: "Nasals (M)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Manny's mum makes minimal marmalade.",
    topic: "Nasals (M)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Singing Sam softly sang six silly songs.",
    topic: "Sibilance (S)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Zebras zig and zebras zag through the zoo zone.",
    topic: "Fricatives (Z)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "This thin thief thinks thick thoughts.",
    topic: "Fricatives (TH)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Which witch wished which wicked wish?",
    topic: "Affricates (W/CH)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Jolly Jerry juggled juicy jellies.",
    topic: "Affricates (J)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Larry’s lizard likes leaping leopards.",
    topic: "Liquids (L)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Round and round the rugged rock the ragged rascal ran.",
    topic: "Liquids (R)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Rolling red wagons really race right.",
    topic: "Liquids (R/W)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "You know New York, you need New York, you know you need unique New York.",
    topic: "Glides (Y/N)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Six slippery snails slid slowly seaward.",
    topic: "Sibilance (S)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Silly Sally swiftly shooed seven silly sheep.",
    topic: "Sibilance (S/SH)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Sasha sews several serious seams.",
    topic: "Sibilance (S)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Brisk brave brigadiers brandish broad bright blades.",
    topic: "Clusters (BR/BL)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "The strictly strapped strap stopped stretching.",
    topic: "Clusters (STR)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Fred fed Fido fried food.",
    topic: "Fricatives (F)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "Betty bought a bit of better butter.",
    topic: "Plosives (B)",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },
  {
    text: "An old owl knows how loud vowels sound.",
    topic: "Vowels",
    difficulty: Difficulty.MEDIUM,
    repetitionCount: 3
  },

  // --- HARD (Complex narratives, tongue fatigue) ---
  {
    text: "The sixth sick sheik's sixth sheep's sick.",
    topic: "Sibilance (S/SH/K)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Pad kid poured curd pulled cod.",
    topic: "Plosives (P/K/D)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Imagine an imaginary menagerie manager managing an imaginary menagerie.",
    topic: "Nasals/Affricates",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Rory the warrior and Roger the worrier were reared wrongly in a rural brewery.",
    topic: "Liquids (R/W)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Lesser leather never weathered wetter weather better.",
    topic: "Prosody",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "The great Greek grape growers grow great Greek grapes.",
    topic: "Clusters (GR)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "If two witches would watch two watches, which witch would watch which watch?",
    topic: "Logic/W/CH",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "I thought a thought. But the thought I thought wasn't the thought I thought I thought.",
    topic: "Thinking",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "A tutor who tooted the flute tried to tutor two tooters to toot.",
    topic: "Music",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "To begin to toboggan, first buy a toboggan. But don’t buy too big a toboggan. Too big a toboggan is too big a toboggan to begin to toboggan.",
    topic: "Winter",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "The seething sea ceaseth and thus the seething sea sufficeth us.",
    topic: "Sibilance (S/TH)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  
  // --- HARD (Long Narratives) ---
  {
    text: "She sells sea shells by the seashore. The shells she sells are surely seashells. So if she sells shells on the seashore, I'm sure she sells seashore shells.",
    topic: "Classic Extended",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "A tree toad loved a she-toad who lived up in a tree. He was a three-toed tree toad, but a two-toed toad was she. The three-toed tree toad tried to win the two-toed she-toad's heart.",
    topic: "Narrative",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Betty Botter bought some butter, but, said she, 'this butter’s bitter! If I bake this bitter butter, it would make my batter bitter. But a bit of better butter that would make my batter better.'",
    topic: "Plosives Story",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "How many cookies could a good cook cook, If a good cook could cook cookies? A good cook could cook as many cookies As a good cook who could cook cookies.",
    topic: "Rhythm Story",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Doctor DooLittle’s doctoring developed delightful diagnoses during difficult days. Diagnostically determined, he detected disastrous diseases directly. Despite daily demands, Doctor DooLittle delivered dependable diagnoses.",
    topic: "Plosives (D)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Leery Larry’s lizard likes leaping leopards. Lithe leopards like licking Larry’s lizard. Lucky Larry lived in a little lopsided lighthouse Where little leaping leopards licked Larry’s lizard lovingly.",
    topic: "Liquids (L)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Six slick sisters sit silently sewing shoes in a shoe shop. Suddenly, six slithery snakes slid silently into the shop. The six slick sisters swiftly and silently sewed shut six slippery slithery snakeholes.",
    topic: "Sibilance Story",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  },
  {
    text: "Fred’s freight flew fast from Fresno to Framingham. Frightfully fast, Fred's freight flew forward — Freight full of frothy fried frogs, five fragile frames, forty flapping flags.",
    topic: "Fricatives (F/FR)",
    difficulty: Difficulty.HARD,
    repetitionCount: 2
  }
];
