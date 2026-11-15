import { useState } from "react";

import type { Card } from "../../hand/lib/schema";
import { Countdown, useRemaining } from "./countdown";
import { Deck } from "./deck";
import { CardBack, GameCard, Panel, Stamp } from "./game-card";
import { PhaseButton } from "./phase-button";
import { Pager, Screen } from "./screen";

const formatCompleted = (completedAt: number) =>
  new Date(completedAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const DoneStamp = ({ completedAt }: { completedAt: number }) => (
  <span className="stamp top-1/3 left-1/2 flex -translate-1/2 -rotate-6 flex-col items-center gap-1.5 px-5 py-3 text-3xl">
    Done
    <time
      className="font-sans text-sm font-bold whitespace-nowrap"
      dateTime={new Date(completedAt).toISOString()}
    >
      {formatCompleted(completedAt)}
    </time>
  </span>
);

export const WeekPhase = ({
  completed,
  deadline,
  missions,
  onComplete,
  onNewRound,
  onUndo,
  reward,
}: {
  completed: Readonly<Record<string, number>>;
  deadline: number;
  missions: readonly Card[];
  onComplete: (code: string) => void;
  onNewRound: () => void;
  onUndo: (code: string) => void;
  reward: Card | null;
}) => {
  const remaining = useRemaining(deadline);
  // The hand is secret, so it opens face down.
  const [revealed, setRevealed] = useState(false);
  const [index, setIndex] = useState(0);
  const [confirming, setConfirming] = useState(false);

  const doneCount = missions.filter(
    (mission) => completed[mission.code] !== undefined
  ).length;

  const title = <Countdown remaining={remaining} />;
  const status = `${doneCount} of ${missions.length} done`;

  if (!revealed) {
    return (
      <Screen
        actions={
          <PhaseButton
            className="flex-1"
            onClick={() => {
              setIndex(0);
              setRevealed(true);
            }}
            tone="primary"
          >
            Show my hand
          </PhaseButton>
        }
        status={status}
        title={title}
      >
        <Deck key="back" label="Your hand, face down">
          <li>
            <CardBack label="Top secret" />
          </li>
        </Deck>
      </Screen>
    );
  }

  const cards = reward === null ? missions : [...missions, reward];
  const current = cards[index];
  const isMission = current !== undefined && current.code !== reward?.code;
  const currentIsDone = isMission && completed[current.code] !== undefined;

  const handleIndexChange = (next: number) => {
    setIndex(next);
    setConfirming(false);
  };

  const toggleDone = (code: string, done: boolean) => {
    if (done) {
      onUndo(code);

      return;
    }

    onComplete(code);
  };

  const confirmNewRound = () => {
    if (confirming) {
      onNewRound();

      return;
    }

    setConfirming(true);
  };

  return (
    <Screen
      actions={
        <>
          <PhaseButton
            className={isMission || current === undefined ? "" : "flex-1"}
            onClick={() => setRevealed(false)}
          >
            Hide
          </PhaseButton>
          {isMission && (
            <PhaseButton
              className="flex-1"
              onClick={() => toggleDone(current.code, currentIsDone)}
              tone={currentIsDone ? "plain" : "primary"}
            >
              {currentIsDone ? "Undo" : "Mark done"}
            </PhaseButton>
          )}
          {current === undefined && (
            <PhaseButton
              className="flex-1"
              onClick={confirmNewRound}
              tone="primary"
            >
              {confirming ? "Yes, wipe it" : "New round"}
            </PhaseButton>
          )}
        </>
      }
      pager={
        current !== undefined && <Pager count={cards.length} index={index} />
      }
      status={current !== undefined && !isMission ? "If you win" : status}
      title={title}
    >
      <Deck key="hand" label="Your hand" onIndexChange={handleIndexChange}>
        {missions.map((mission) => {
          const completedAt = completed[mission.code];

          return (
            <li key={mission.code}>
              <GameCard
                card={mission}
                enter="flip"

                state={completedAt === undefined ? undefined : "done"}
              >
                {completedAt !== undefined && (
                  <DoneStamp completedAt={completedAt} />
                )}
              </GameCard>
            </li>
          );
        })}
        {reward !== null && (
          <li>
            <GameCard card={reward} enter="flip">
              <Stamp>Reward</Stamp>
            </GameCard>
          </li>
        )}
        <li>
          <Panel title="Round finished?">
            Reveal your missions and add up the points. A new round wipes this
            hand for good.
          </Panel>
        </li>
      </Deck>
    </Screen>
  );
};
