import { Effect } from "effect";

import atlasUrl from "../../../../mission-atlas.png";
import { HAND_SIZE } from "../lib/constants";
import type { Card } from "../lib/schema";

const CARD_WIDTH = 600;
const CARD_HEIGHT = 1050;
const COLUMNS = 10;
const MISSION_COUNT = 88;

const missionIndexes = Array.from(
  { length: MISSION_COUNT },
  (_, index) => index
);

const loadAtlas = Effect.tryPromise({
  try: async (signal) => {
    const response = await fetch(atlasUrl, { signal });

    if (!response.ok) {
      throw new Error("Could not load the mission atlas");
    }

    return await createImageBitmap(await response.blob());
  },
  catch: (cause) =>
    cause instanceof Error
      ? cause
      : new Error("Could not load the mission atlas"),
});

const drawIndexes = (count: number) => {
  const pool = [...missionIndexes];

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

const cropCard = (
  atlas: ImageBitmap,
  index: number
): Effect.Effect<string, Error> => {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const context = canvas.getContext("2d");

  if (!context) {
    return Effect.fail(new Error("Could not draw a mission card"));
  }

  const column = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);

  context.drawImage(
    atlas,
    column * CARD_WIDTH,
    row * CARD_HEIGHT,
    CARD_WIDTH,
    CARD_HEIGHT,
    0,
    0,
    CARD_WIDTH,
    CARD_HEIGHT
  );

  return Effect.succeed(canvas.toDataURL("image/png"));
};

const cardFromIndex = (atlas: ImageBitmap, index: number) =>
  cropCard(atlas, index).pipe(
    Effect.map((image) => {
      const number = String(index + 1).padStart(2, "0");

      return {
        code: `mission-${number}`,
        image,
        suit: "Mission",
        value: number,
      } satisfies Card;
    })
  );

export const drawMission = Effect.gen(function* generateMissions() {
  const atlas = yield* loadAtlas;
  const indexes = drawIndexes(HAND_SIZE);

  return yield* Effect.all(indexes.map((index) => cardFromIndex(atlas, index)));
});
