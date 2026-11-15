import { useState } from "react";

import type { Card } from "../../hand/lib/schema";
import { Deck } from "./deck";
import { CardBack, GameCard, Panel } from "./game-card";
import { PhaseButton } from "./phase-button";
import { Pager, Screen, Title } from "./screen";

export const RewardPhase = ({
  dealt,
  error,
  onDraw,
  onKeep,
  onRetry,
}: {
  dealt: readonly Card[] | null;
  error: string | null;
  onDraw: () => void;
  onKeep: (card: Card) => void;
  onRetry: () => void;
}) => {
  const [index, setIndex] = useState(0);
  const title = <Title>Pick your reward</Title>;

  if (dealt === null) {
    return (
      <Screen
        actions={
          <PhaseButton
            className="flex-1"
            onClick={error === null ? onDraw : onRetry}
            tone="primary"
          >
            {error === null ? "Draw rewards" : "Try again"}
          </PhaseButton>
        }
        status="Draw 5, keep 1"
        title={title}
      >
        <Deck key="back" label="Reward deck">
          <li>
            {error === null ? (
              <CardBack label="Rewards" />
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

  const current = dealt[index];

  const redraw = () => {
    setIndex(0);
    onDraw();
  };

  return (
    <Screen
      actions={
        current === undefined ? (
          <PhaseButton className="flex-1" onClick={redraw} tone="primary">
            Redraw rewards
          </PhaseButton>
        ) : (
          <PhaseButton
            className="flex-1"
            onClick={() => onKeep(current)}
            tone="primary"
          >
            Keep this reward
          </PhaseButton>
        )
      }
      pager={
        current !== undefined && <Pager count={dealt.length} index={index} />
      }
      status="Keep 1"
      title={title}
    >
      <Deck key="hand" label="Rewards to choose from" onIndexChange={setIndex}>
        {dealt.map((card) => (
          <li key={card.code}>
            <GameCard card={card} />
          </li>
        ))}
        <li>
          <Panel title="None of these?">
            Redraw for five new rewards. Win the week and the one you keep is
            yours.
          </Panel>
        </li>
      </Deck>
    </Screen>
  );
};
