import { Schema } from "effect";

import type { Card } from "../../hand/lib/schema";
import { cardByCode } from "../../hand/services/deck";

const KEY = "bliss:week";

interface Week {
  completed: Readonly<Record<string, number>>;
  deadline: number;
  missions: readonly Card[];
  reward: Card | null;
}

const SavedWeek = Schema.Struct({
  completed: Schema.Record(Schema.String, Schema.Number),
  deadline: Schema.Number,
  missions: Schema.Array(Schema.String),
  reward: Schema.NullOr(Schema.String),
});

const decodeSavedWeek = Schema.decodeUnknownSync(SavedWeek);

// Cards are stored by code, not image URL: asset URLs change on every deploy.
export const saveWeek = ({ completed, deadline, missions, reward }: Week) => {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        completed,
        deadline,
        missions: missions.map((mission) => mission.code),
        reward: reward?.code ?? null,
      })
    );
  } catch {
    // Storage can be full or blocked (private browsing). The round still
    // plays; it just won't survive a reload.
  }
};

export const clearWeek = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Nothing was stored, so there is nothing to clear.
  }
};

export const loadWeek = () => {
  try {
    const raw = localStorage.getItem(KEY);

    if (raw === null) {
      return null;
    }

    const saved = decodeSavedWeek(JSON.parse(raw));

    const missions = saved.missions.flatMap((code) => {
      const card = cardByCode(code);

      return card === undefined ? [] : [card];
    });

    if (missions.length === 0) {
      return null;
    }

    return {
      completed: saved.completed,
      dealt: null,
      deadline: saved.deadline,
      error: null,
      missions,
      reward: saved.reward === null ? null : (cardByCode(saved.reward) ?? null),
    };
  } catch {
    // Missing, corrupt or blocked storage all mean the same thing: no saved
    // week, so start a fresh round.
    return null;
  }
};
