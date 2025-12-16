import type { Difficulty, Twister } from "../types";

export const generateTongueTwister = async (
  difficulty: Difficulty
): Promise<Twister> => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate");
  }

  return res.json();
};
