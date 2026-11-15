import { useState } from "react";

import type { Card } from "../../hand/lib/schema";
import { MIN_MISSIONS } from "../lib/constants";
import { Deck } from "./deck";
import { CardBack, GameCard, Panel, Stamp } from "./game-card";
import { PhaseButton } from "./phase-button";
import { Pager, Screen, Title } from "./screen";

export const MissionPhase = ({
  dealt,
  error,
  missions,
  onDraw,
  onFinalise,
  onKeep,
  onRelease,
  onRetry,
}: {
  dealt: readonly Card[] | null;
  error: string | null;
  missions: readonly Card[];
  onDraw: () => void;
  onFinalise: () => void;
  onKeep: (card: Card) => void;
  onRelease: (code: string) => void;
  onRetry: () => void;
}) => {
  const [index, setIndex] = useState(0);
  const title = <Title>Pick your missions</Title>;
  const canStart = missions.length >= MIN_MISSIONS;

  const status = canStart
    ? `${missions.length} kept`
    : `${missions.length} of ${MIN_MISSIONS} kept`;

  if (dealt === null) {
    return (
      <Screen
        actions={
          error !== null && (
            <PhaseButton className="flex-1" onClick={onRetry} tone="primary">
              Try again
            </PhaseButton>
          )
        }
        status={status}
        title={title}
      >
        <Deck key="back" label="Mission deck">
          <li>
            {error === null ? (
              <CardBack label="Missions" />
            ) : (
              <Panel alert title="The deck jammed">
                {error}. Try again.
              </Panel>
            )}
          </li>
        </Deck>
      </Screen>
    );
  }

  // Fresh cards first; missions kept from an earlier draw wait at the end.
  const dealtCodes = new Set(dealt.map((card) => card.code));
  const keptCodes = new Set(missions.map((mission) => mission.code));

  const hand = [
    ...dealt,
    ...missions.filter((mission) => !dealtCodes.has(mission.code)),
  ];

  const current = hand[index];
  const currentIsKept = current !== undefined && keptCodes.has(current.code);

  const redraw = () => {
    setIndex(0);
    onDraw();
  };

  const toggle = (card: Card, kept: boolean) => {
    if (kept) {
      onRelease(card.code);

      return;
    }

    onKeep(card);
  };

  return (
    <Screen
      actions={
        <>
          <PhaseButton disabled={!canStart} onClick={onFinalise} tone="commit">
            Start the week
          </PhaseButton>
          {current === undefined ? (
            <PhaseButton className="flex-1" onClick={redraw} tone="primary">
              Redraw
            </PhaseButton>
          ) : (
            <PhaseButton
              className="flex-1"
              onClick={() => toggle(current, currentIsKept)}
              tone={currentIsKept ? "plain" : "primary"}
            >
              {currentIsKept ? "Put back" : "Keep"}
            </PhaseButton>
          )}
        </>
      }
      pager={
        current !== undefined && <Pager count={hand.length} index={index} />
      }
      status={status}
      title={title}
    >
      <Deck key="hand" label="Missions to choose from" onIndexChange={setIndex}>
        {hand.map((card) => {
          const kept = keptCodes.has(card.code);

          return (
            <li key={card.code}>
              <GameCard
                card={card}

                state={kept ? "kept" : undefined}
              >
                {kept && <Stamp>Kept</Stamp>}
              </GameCard>
            </li>
          );
        })}
        <li>
          <Panel title="Seen them all?">
            Redraw for seven new missions. The ones you kept stay in your hand.
          </Panel>
        </li>
      </Deck>
    </Screen>
  );
};
