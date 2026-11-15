import { useMachine } from "@xstate/react";

import { HAND_SIZE } from "./lib/constants";
import { handMachine } from "./machine";
import { GetCardsButton } from "./ui/get-cards-button";
import { HandError } from "./ui/hand-error";
import { Loading } from "./ui/loading";

const cardEnter = [
  "animate-slide-up",
  "animate-slide-up-1",
  "animate-slide-up-2",
  "animate-slide-up-3",
  "animate-slide-up-4",
] as const;

export const Hand = () => {
  const [state, send] = useMachine(handMachine);

  const hasCards =
    state.context.cards !== null && state.context.cards.length > 0;

  return (
    <div className="bg-panel relative flex min-h-64 flex-col items-center rounded-lg p-8">
      <div className="mb-4 flex items-center justify-center">
        {hasCards
          ? state.context.cards?.map((card, index) => (
              <img
                key={card.code}
                alt={`${card.value} of ${card.suit}`}
                className={`m-1 h-40 w-30 transition-opacity duration-500 ${cardEnter[index] ?? "animate-slide-up"}`}
                src={card.image}
              />
            ))
          : Array.from({ length: HAND_SIZE }, (_, index) => (
              <div
                key={`placeholder-${index}`}
                className="bg-placeholder m-1 h-40 w-30 rounded-lg"
              />
            ))}
      </div>

      {state.value === "error" && state.context.error !== null && (
        <HandError message={state.context.error} />
      )}
      {state.value === "loading" && <Loading />}
      {state.value === "idle" && (
        <GetCardsButton cards={hasCards} send={send} />
      )}
    </div>
  );
};
