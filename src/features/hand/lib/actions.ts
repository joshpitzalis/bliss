import type { Card } from "./schema";

export const saveCards = (cards: readonly Card[]) => ({
  context: {
    cards,
    error: null,
  },
});

export const saveError = (message: string) => ({
  context: {
    error: message,
  },
});

export const clearError = () => ({
  context: {
    error: null,
  },
});
