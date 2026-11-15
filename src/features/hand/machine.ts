import { Schema } from "effect";
import { setup } from "xstate";

import { saveCards, saveError, clearError } from "./lib/actions";
import { CardSchema } from "./lib/schema";
import { loadCards } from "./services";

const EventSchema = Schema.toStandardSchemaV1(Schema.Struct({}));

const hand = setup({
  actors: { loadCards },
  actions: {
    saveCards,
    saveError,
    clearError,
  },
  schemas: {
    events: {
      DREW: EventSchema,
      ERRORED: EventSchema,
      RETRY: EventSchema,
    },
    context: Schema.toStandardSchemaV1(
      Schema.Struct({
        error: Schema.NullOr(Schema.String),
        cards: Schema.NullOr(Schema.Array(CardSchema)),
      })
    ),
  },
});

export const handMachine = hand.createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAsCGA7CA6AlhANmAMQAiASgKIDqA2gAwC6ioADgPaw4AuOb6zIAB6IAbACYAzFgCMdAJwSA7AFYANCACeiaYqwAOMXuljlAX1Pq0mLPjaoIOdFCIQ+YXOgBubANbur2Lb2jlAIjt4Axqg8fPQMcQLsnDH8SEKIciIALFgmikYm6loIInIyyuJmFiABNnYOTkRgAE7NbM1YLPjRAGbtALZYtUENoeFsUSlxCWlJ3LypoMIIcoq6IhWFmohidDlrEllKVZYY2C1tzUSUACpkAJozrBzzfALLynpSypJHKkWIQ50LBZRQbSrmaroNgQOACAKJF4pd6ILIiES5ApqbYIAC00j0ugUKnMp2seEIiOSCxRJTowOUEmM2OK+PpIOOpJqZzqwScVNei3SCGU0hyhmZAJWwK+Ejl8oVcq5tQu7QFyLSy3EZQOfxZqKy0iwIkUWVBcmk6KtikhpiAA */
  id: "hand",
  initial: "idle",
  context: {
    error: null,
    cards: null,
  },
  states: {
    idle: {
      on: {
        DREW: { target: "loading" },
      },
    },

    loading: {
      invoke: {
        src: "loadCards",
        onDone: {
          target: "idle",
          context: ({ actions, event }) =>
            actions.saveCards(event.output).context,
        },
        onError: {
          target: "error",
          context: ({ actions, event }) =>
            actions.saveError(
              event.error instanceof Error
                ? event.error.message
                : "Could not draw a hand"
            ).context,
        },
      },
    },

    error: {
      on: {
        RETRY: {
          target: "loading",
          context: ({ actions }) => actions.clearError().context,
        },
      },
    },
  },
});

// import { Schema } from "effect";
// import { createMachine, types } from "xstate";

// const initialContext = {
//   tracks: [
//     { id: "t1", title: "Bloom" },
//     { id: "t2", title: "Ember" },
//     { id: "t3", title: "Harbor" },
//   ],
//   index: 0,
// };

// type Context = typeof initialContext;

// const validTack = (context: Context): boolean =>
//   context.index < context.tracks.length - 1 && context.index >= 0;

// const events = {
//   PLAYED: Schema.toStandardSchemaV1(Schema.Struct({})),
//   PAUSED: Schema.toStandardSchemaV1(Schema.Struct({})),
//   STOPPED: Schema.toStandardSchemaV1(Schema.Struct({})),
//   NEXT: Schema.toStandardSchemaV1(Schema.Struct({})),
//   PREVIOUS: Schema.toStandardSchemaV1(Schema.Struct({})),
// };

// // Placeholder machine: proves XState v6 + React wiring. Replace with the game.
// export const toggleMachine = createMachine({
//   /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDpZoAcDIBiABQBkBBATQFEARAbQAYBdRUA1WAS2V6oAdpxAAPRABYAjADYcADgBMC6ZICsC9epYBmTQBoQAT0TTd0nAE4bV2dIDsmp9K0BfN0bQZsOApgBDY14hKHIqAFUAZUZWDiQQbj4BYVEJBEkleQUnFldZXTztFgcjUwRdB10cSVtJFjsshyrdDy90LFx-IJCwqIAVAHkyMlj2UST+QREE9JlslTVNYv0FMsRVGttlbUllAqU2kG9OvwCAV1hSSlox+K4eKdTZs1lJHFkrdQtvpSt63QFdYIJTqJQ4By1L7mWQlNSyI4nXwEC5XCAkAbDUbMcYJSYpGagdJyd6fb7SX7-PRAkxmJTVKxyWT09SyBTshRfDyeEBCVAQOCiJFgCaPAlpRAAWlkwOlOBYCsVSsVakRHV8+FQREgouS0wlIKsDghslZgPUal0kgKkmB0iU73m6isClh9oKLAUap8XUCwVCuqehPEiG0VkULutDj0NgcWmBDuNnJs30kAKUShYkm9pxRlx1eLF+peGSUwPNH1BLCU0hYb3UVVZ3LcQA */
//   id: "toggle",
//   schemas: {
//     events,
//   },
//   context: initialContext,
//   on: {
//     NEXT: ({ context }) => {
//       if (!validTack(context)) {
//         return {
//           context: { ...context, index: 0 },
//         };
//       }

//       return {
//         context: { ...context, index: context.index + 1 },
//       };
//     },
//     PREVIOUS: ({ context }) => ({
//       context: { ...context, index: context.index - 1 },
//     }),
//   },
//   initial: "stopped",
//   states: {
//     stopped: {
//       on: {
//         PLAYED: { target: "playing" },
//       },
//     },

//     playing: {
//       on: {
//         PAUSED: { target: "paused" },
//         STOPPED: { target: "stopped" },
//       },
//     },

//     paused: {
//       on: {
//         PLAYED: { target: "playing" },
//         STOPPED: { target: "stopped" },
//       },
//     },
//   },
// });
