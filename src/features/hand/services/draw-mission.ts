import { Effect } from "effect";

import { MISSION_HAND_SIZE } from "../lib/constants";
import { drawFrom, missionDeck } from "./deck";

export const drawMission = Effect.sync(() =>
  drawFrom(missionDeck, MISSION_HAND_SIZE)
);
