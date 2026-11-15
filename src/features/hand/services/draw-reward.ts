import { Effect } from "effect";

import { HAND_SIZE } from "../lib/constants";
import { drawFrom, rewardDeck } from "./deck";

export const drawReward = Effect.sync(() => drawFrom(rewardDeck, HAND_SIZE));
