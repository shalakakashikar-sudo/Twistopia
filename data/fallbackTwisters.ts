import { Difficulty, Twister } from "../types";

export const FALLBACK_TWISTERS: Twister[] = [
  // --- EASY ---
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
    text: "He threw three free throws.",
    topic: "Sports",
    difficulty: Difficulty.EASY
  },
  {
    text: "A proper copper coffee pot.",
    topic: "Kitchen",
    difficulty: Difficulty.EASY
  },
  {
    text: "Cheap chip shop chips.",
    topic: "Food",
    difficulty: Difficulty.EASY
  },
  {
    text: "Truly rural.",
    topic: "Places",
    difficulty: Difficulty.EASY
  },
  {
    text: "Willie’s really weary.",
    topic: "Emotions",
    difficulty: Difficulty.EASY
  },
  {
    text: "Big bees buzz.",
    topic: "Nature",
    difficulty: Difficulty.EASY
  },
  {
    text: "Sue sees Zoos.",
    topic: "Places",
    difficulty: Difficulty.EASY
  },
  {
    text: "How now brown cow.",
    topic: "Animals",
    difficulty: Difficulty.EASY
  },
  {
    text: "Black back bat.",
    topic: "Animals",
    difficulty: Difficulty.EASY
  },
  {
    text: "Split splashed sloppily.",
    topic: "Action",
    difficulty: Difficulty.EASY
  },

  // --- MEDIUM ---
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
    text: "Fuzzy Wuzzy was a bear. Fuzzy Wuzzy had no hair. Fuzzy Wuzzy wasn't fuzzy, was he?",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Susie works in a shoeshine shop. Where she shines she sits, and where she sits she shines.",
    topic: "Work",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Big black bugs bleed blue-black blood.",
    topic: "Insects",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Tom threw Tim three thumbtacks.",
    topic: "Objects",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Great gray goats graze on green grass.",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Many mumbling mice are making midnight music in the moonlight.",
    topic: "Music",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Nine nice night nurses nursing nicely.",
    topic: "Work",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Manny's mum makes minimal marmalade.",
    topic: "Food",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Singing Sam softly sang six silly songs.",
    topic: "Music",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Four furious friends fought for the phone.",
    topic: "Conflict",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Zebras zig and zebras zag through the zoo zone.",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "This thin thief thinks thick thoughts.",
    topic: "Thinking",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Which witch wished which wicked wish?",
    topic: "Magic",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Jolly Jerry juggled juicy jellies.",
    topic: "Food",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Larry’s lizard likes leaping leopards.",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Round and round the rugged rock the ragged rascal ran.",
    topic: "Action",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Rolling red wagons really race right.",
    topic: "Toys",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "You know New York, you need New York, you know you need unique New York.",
    topic: "Places",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Six slippery snails slid slowly seaward.",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Silly Sally swiftly shooed seven silly sheep.",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Sasha sews several serious seams.",
    topic: "Work",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "Fred fed Fido fried food.",
    topic: "Food",
    difficulty: Difficulty.MEDIUM
  },
  {
    text: "An old owl knows how loud vowels sound.",
    topic: "Animals",
    difficulty: Difficulty.MEDIUM
  },

  // --- HARD ---
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
  },
  {
    text: "Brisk brave brigadiers brandish broad bright blades.",
    topic: "Army",
    difficulty: Difficulty.HARD
  },
  {
    text: "The strictly strapped strap stopped stretching.",
    topic: "Objects",
    difficulty: Difficulty.HARD
  },
  {
    text: "The great Greek grape growers grow great Greek grapes.",
    topic: "Food",
    difficulty: Difficulty.HARD
  },
  {
    text: "If two witches would watch two watches, which witch would watch which watch?",
    topic: "Magic",
    difficulty: Difficulty.HARD
  },
  {
    text: "I thought a thought. But the thought I thought wasn't the thought I thought I thought.",
    topic: "Thinking",
    difficulty: Difficulty.HARD
  },
  {
    text: "A tutor who tooted the flute tried to tutor two tooters to toot.",
    topic: "Music",
    difficulty: Difficulty.HARD
  },
  {
    text: "To begin to toboggan, first buy a toboggan. But don’t buy too big a toboggan.",
    topic: "Winter",
    difficulty: Difficulty.HARD
  },
  {
    text: "The seething sea ceaseth and thus the seething sea sufficeth us.",
    topic: "Ocean",
    difficulty: Difficulty.HARD
  },
  {
    text: "A tree toad loved a she-toad who lived up in a tree.",
    topic: "Nature",
    difficulty: Difficulty.HARD
  },
  {
    text: "Doctor DooLittle’s doctoring developed delightful diagnoses during difficult days.",
    topic: "Work",
    difficulty: Difficulty.HARD
  },
  {
    text: "Leery Larry’s lizard likes leaping leopards.",
    topic: "Animals",
    difficulty: Difficulty.HARD
  },
  {
    text: "Six slick sisters sit silently sewing shoes in a shoe shop.",
    topic: "Work",
    difficulty: Difficulty.HARD
  },
  {
    text: "Fred’s freight flew fast from Fresno to Framingham.",
    topic: "Travel",
    difficulty: Difficulty.HARD
  },
  {
    text: "Betty Botter bought some butter but she said the butter's bitter.",
    topic: "Food",
    difficulty: Difficulty.HARD
  }
];
