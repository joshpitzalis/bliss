import { Schema } from "effect";
import { setup } from "xstate";

import type { Card } from "./lib/schema";
import { CardSchema } from "./lib/schema";
import { DrawKindSchema, loadCards } from "./services";

const saveCards = (cards: readonly Card[]) => ({
  context: { cards },
});

const hand = setup({
  actors: { loadCards },
  actions: { saveCards },
  schemas: {
    input: Schema.toStandardSchemaV1(DrawKindSchema),
    output: Schema.toStandardSchemaV1(Schema.Array(CardSchema)),
    context: Schema.toStandardSchemaV1(
      Schema.Struct({
        cards: Schema.Array(CardSchema),
        kind: DrawKindSchema,
      })
    ),
  },
});

export const handMachine = hand.createMachine({
  id: "hand",
  initial: "drawing",
  context: ({ input }) => ({
    cards: [],
    kind: input,
  }),
  states: {
    drawing: {
      invoke: {
        src: "loadCards",
        input: ({ context }) => context.kind,
        onDone: {
          target: "dealt",
          context: ({ actions, event }) =>
            actions.saveCards(event.output).context,
        },
      },
    },
    dealt: {
      type: "final",
      output: ({ context }) => context.cards,
    },
  },
});
