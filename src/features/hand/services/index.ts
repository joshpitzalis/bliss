import { Effect } from "effect";
import { createAsyncLogic } from "xstate";

import type { Card } from "../lib/schema";
// import { drawHand } from "./draw-hand";
// import { drawMission } from "./draw-mission";
import { drawReward } from "./draw-reward";

export const loadCards = createAsyncLogic({
  run: ({ signal }): Promise<readonly Card[]> =>
    // Effect.runPromise(drawMission, { signal }),
    Effect.runPromise(drawReward, { signal }),
  // Effect.runPromise(drawHand, { signal }),
});
