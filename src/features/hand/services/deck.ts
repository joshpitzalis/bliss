import type { Card } from "../lib/schema";

const IMAGE_EXTENSION = ".png";

// One file per card, so a phone fetches only the cards it shows instead of a
// 57-megapixel atlas.
const missionImages = import.meta.glob<string>(
  "../../../../cards/mission-*.png",
  { eager: true, import: "default", query: "?url" }
);

const rewardImages = import.meta.glob<string>(
  "../../../../cards/reward-*.png",
  { eager: true, import: "default", query: "?url" }
);

const toDeck = (images: Record<string, string>, suit: string): Card[] =>
  Object.entries(images).map(([path, image]) => {
    const code = path.slice(path.lastIndexOf("/") + 1, -IMAGE_EXTENSION.length);

    return {
      code,
      image,
      suit,
      value: code.slice(code.indexOf("-") + 1),
    };
  });

export const missionDeck: readonly Card[] = toDeck(missionImages, "Mission");
export const rewardDeck: readonly Card[] = toDeck(rewardImages, "Reward");

const cardsByCode = new Map(
  [...missionDeck, ...rewardDeck].map((card) => [card.code, card])
);

export const cardByCode = (code: string) => cardsByCode.get(code);

export const drawFrom = (deck: readonly Card[], count: number) => {
  const pool = [...deck];

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = pool[index];
    const swap = pool[swapIndex];

    if (current === undefined || swap === undefined) {
      break;
    }

    pool[index] = swap;
    pool[swapIndex] = current;
  }

  return pool.slice(0, count);
};
