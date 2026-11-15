import type { Card } from "../../hand/lib/schema";
import { WEEK_MS } from "./constants";

export const saveDealt = (cards: readonly Card[]) => ({
  context: {
    dealt: cards,
    error: null,
  },
});

export const saveError = (message: string) => ({
  context: {
    dealt: null,
    error: message,
  },
});

export const clearDealt = () => ({
  context: {
    dealt: null,
    error: null,
  },
});

export const keepReward = (card: Card) => ({
  context: {
    dealt: null,
    error: null,
    reward: card,
  },
});

export const keepMission = ({
  card,
  missions,
}: {
  card: Card;
  missions: readonly Card[];
}) => ({
  context: {
    missions: [...missions, card],
  },
});

export const releaseMission = ({
  code,
  missions,
}: {
  code: string;
  missions: readonly Card[];
}) => ({
  context: {
    missions: missions.filter((mission) => mission.code !== code),
  },
});

export const completeMission = ({
  code,
  completed,
  missions,
  now,
}: {
  code: string;
  completed: Readonly<Record<string, number>>;
  missions: readonly Card[];
  now: number;
}) => {
  const kept = missions.some((mission) => mission.code === code);

  if (!kept || completed[code] !== undefined) {
    return { context: { completed } };
  }

  return {
    context: {
      completed: { ...completed, [code]: now },
    },
  };
};

export const undoMission = ({
  code,
  completed,
}: {
  code: string;
  completed: Readonly<Record<string, number>>;
}) => {
  if (completed[code] === undefined) {
    return { context: { completed } };
  }

  const { [code]: _completedAt, ...remaining } = completed;

  return {
    context: {
      completed: remaining,
    },
  };
};

export const startWeek = (now: number) => ({
  context: {
    dealt: null,
    deadline: now + WEEK_MS,
    error: null,
  },
});

export const dealtHas = (dealt: readonly Card[] | null, code: string) =>
  dealt?.some((card) => card.code === code) ?? false;

export const missionIsKept = (missions: readonly Card[], code: string) =>
  missions.some((mission) => mission.code === code);
