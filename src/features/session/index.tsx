import { useMachine } from "@xstate/react";
import { useEffect } from "react";

import { clearWeek, saveWeek } from "./lib/storage";
import { sessionMachine } from "./machine";
import { MissionPhase } from "./ui/mission-phase";
import { RewardPhase } from "./ui/reward-phase";
import { WeekPhase } from "./ui/week-phase";

// ponytail: a new round reloads the page rather than resetting the machine.
// Add a RESET event if the reload flash ever matters.
const startNewRound = () => {
  clearWeek();
  window.location.reload();
};

export const Session = () => {
  const [state, send] = useMachine(sessionMachine);

  const { completed, deadline, dealt, error, missions, reward } = state.context;

  const committed = state.matches("committed");

  useEffect(() => {
    if (committed && deadline !== null) {
      saveWeek({ completed, deadline, missions, reward });
    }
  }, [committed, completed, deadline, missions, reward]);

  const draw = () => {
    send({ type: "DRAW" });
  };

  const retry = () => {
    send({ type: "RETRY" });
  };

  if (committed && deadline !== null) {
    return (
      <WeekPhase
        completed={completed}
        deadline={deadline}
        missions={missions}
        onComplete={(code) => {
          send({ type: "COMPLETE_MISSION", code });
        }}
        onNewRound={startNewRound}
        onUndo={(code) => {
          send({ type: "UNDO_MISSION", code });
        }}
        reward={reward}
      />
    );
  }

  if (state.matches("mission")) {
    return (
      <MissionPhase
        dealt={dealt}
        error={state.matches({ mission: "failed" }) ? error : null}
        missions={missions}
        onDraw={draw}
        onFinalise={() => {
          send({ type: "FINALISE" });
        }}
        onKeep={(card) => {
          send({ type: "KEEP_MISSION", card });
        }}
        onRelease={(code) => {
          send({ type: "RELEASE_MISSION", code });
        }}
        onRetry={retry}
      />
    );
  }

  return (
    <RewardPhase
      dealt={dealt}
      error={state.matches({ reward: "failed" }) ? error : null}
      onDraw={draw}
      onKeep={(card) => {
        send({ type: "KEEP_REWARD", card });
      }}
      onRetry={retry}
    />
  );
};
