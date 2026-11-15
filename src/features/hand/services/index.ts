import { Effect, Schema } from "effect";
import { createAsyncLogic } from "xstate";

import type { Card } from "../lib/schema";
import { drawMission } from "./draw-mission";
import { drawReward } from "./draw-reward";

export const DrawKindSchema = Schema.Literals(["reward", "mission"]);

export type DrawKind = typeof DrawKindSchema.Type;

const drawForKind = {
  mission: drawMission,
  reward: drawReward,
} as const;

export const loadCards = createAsyncLogic({
  run: ({ input, signal }): Promise<readonly Card[]> =>
    Effect.runPromise(drawForKind[input], { signal }),
  schemas: {
    input: Schema.toStandardSchemaV1(DrawKindSchema),
  },
});
