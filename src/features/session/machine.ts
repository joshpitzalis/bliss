import { Schema } from "effect";
import { setup } from "xstate";

import { CardSchema } from "../hand/lib/schema";
import { handMachine } from "../hand/machine";
import {
  clearDealt,
  completeMission,
  dealtHas,
  keepMission,
  keepReward,
  missionIsKept,
  releaseMission,
  saveDealt,
  saveError,
  startWeek,
  undoMission,
} from "./lib/actions";
import { MIN_MISSIONS } from "./lib/constants";
import { loadWeek } from "./lib/storage";

// ponytail: a saved week resumes by starting the machine in "committed". Use
// XState snapshot persistence if the draw phases ever need to survive a reload.
const savedWeek = loadWeek();

const EmptyEvent = Schema.toStandardSchemaV1(Schema.Struct({}));

const CardEvent = Schema.toStandardSchemaV1(
  Schema.Struct({
    card: CardSchema,
  })
);

const CodeEvent = Schema.toStandardSchemaV1(
  Schema.Struct({
    code: Schema.String,
  })
);

const session = setup({
  actors: { deal: handMachine },
  actions: {
    clearDealt,
    completeMission,
    keepMission,
    keepReward,
    releaseMission,
    saveDealt,
    saveError,
    startWeek,
    undoMission,
  },
  schemas: {
    events: {
      DRAW: EmptyEvent,
      RETRY: EmptyEvent,
      KEEP_REWARD: CardEvent,
      KEEP_MISSION: CardEvent,
      RELEASE_MISSION: CodeEvent,
      FINALISE: EmptyEvent,
      COMPLETE_MISSION: CodeEvent,
      UNDO_MISSION: CodeEvent,
    },
    context: Schema.toStandardSchemaV1(
      Schema.Struct({
        completed: Schema.Record(Schema.String, Schema.Number),
        dealt: Schema.NullOr(Schema.Array(CardSchema)),
        deadline: Schema.NullOr(Schema.Number),
        error: Schema.NullOr(Schema.String),
        missions: Schema.Array(CardSchema),
        reward: Schema.NullOr(CardSchema),
      })
    ),
  },
});

export const sessionMachine = session.createMachine({
  id: "session",
  initial: savedWeek === null ? "reward" : "committed",
  context: savedWeek ?? {
    completed: {},
    dealt: null,
    deadline: null,
    error: null,
    missions: [],
    reward: null,
  },
  states: {
    reward: {
      initial: "ready",
      states: {
        ready: {
          on: {
            DRAW: { target: "dealing" },
          },
        },
        dealing: {
          invoke: {
            src: "deal",
            input: "reward",
            onDone: {
              target: "choosing",
              context: ({ actions, event }) =>
                actions.saveDealt(event.output).context,
            },
            onError: {
              target: "failed",
              context: ({ actions, event }) =>
                actions.saveError(
                  event.error instanceof Error
                    ? event.error.message
                    : "Could not draw cards"
                ).context,
            },
          },
        },
        failed: {
          on: {
            RETRY: {
              target: "dealing",
              context: { error: null },
            },
          },
        },
        choosing: {
          on: {
            DRAW: {
              target: "dealing",
              context: ({ actions }) => actions.clearDealt().context,
            },
            KEEP_REWARD: ({ actions, context, event }) => {
              if (!dealtHas(context.dealt, event.card.code)) {
                return;
              }

              return {
                target: "#mission",
                context: actions.keepReward(event.card).context,
              };
            },
          },
        },
      },
    },
    mission: {
      id: "mission",
      initial: "dealing",
      states: {
        dealing: {
          invoke: {
            src: "deal",
            input: "mission",
            onDone: {
              target: "choosing",
              context: ({ actions, event }) =>
                actions.saveDealt(event.output).context,
            },
            onError: {
              target: "failed",
              context: ({ actions, event }) =>
                actions.saveError(
                  event.error instanceof Error
                    ? event.error.message
                    : "Could not draw cards"
                ).context,
            },
          },
        },
        failed: {
          on: {
            RETRY: {
              target: "dealing",
              context: { error: null },
            },
          },
        },
        choosing: {
          on: {
            DRAW: {
              target: "dealing",
              context: ({ actions }) => actions.clearDealt().context,
            },
            KEEP_MISSION: ({ actions, context, event }) => {
              const { code } = event.card;
              const cardIsDealt = dealtHas(context.dealt, code);

              if (!cardIsDealt || missionIsKept(context.missions, code)) {
                return;
              }

              return {
                context: actions.keepMission({
                  card: event.card,
                  missions: context.missions,
                }).context,
              };
            },
            RELEASE_MISSION: ({ actions, context, event }) => {
              if (!missionIsKept(context.missions, event.code)) {
                return;
              }

              return {
                context: actions.releaseMission({
                  code: event.code,
                  missions: context.missions,
                }).context,
              };
            },
            FINALISE: ({ actions, context }) => {
              if (context.missions.length < MIN_MISSIONS) {
                return;
              }

              return {
                target: "#committed",
                context: actions.startWeek(Date.now()).context,
              };
            },
          },
        },
      },
    },
    committed: {
      id: "committed",
      on: {
        COMPLETE_MISSION: {
          target: "#committed",
          reenter: false,
          context: ({ actions, context, event }) =>
            actions.completeMission({
              code: event.code,
              completed: context.completed,
              missions: context.missions,
              now: Date.now(),
            }).context,
        },
        UNDO_MISSION: {
          target: "#committed",
          reenter: false,
          context: ({ actions, context, event }) =>
            actions.undoMission({
              code: event.code,
              completed: context.completed,
            }).context,
        },
      },
    },
  },
});
