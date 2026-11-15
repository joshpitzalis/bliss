import type { ReactNode } from "react";

import type { Card } from "../../hand/lib/schema";

export const GameCard = ({
  card,
  children,
  enter = "deal",
  state,
}: {
  card: Card;
  children?: ReactNode;
  enter?: "deal" | "flip";
  state?: "done" | "kept" | undefined;
}) => (
  <figure
    className={`card ${enter === "deal" ? "animate-deal" : "animate-flip"}`}
    data-state={state}
  >
    <img
      alt={`${card.suit} card ${Number(card.value)}`}
      className="card-face"
      decoding="async"
      height={1050}
      src={card.image}
      width={600}
    />
    {children}
  </figure>
);

export const Stamp = ({ children }: { children: ReactNode }) => (
  <span className="stamp -top-2.5 -right-2 rotate-6 px-2.5 py-1.5">
    {children}
  </span>
);

export const CardBack = ({ label }: { label: string }) => (
  <div className="card" data-stack="">
    <div className="card-back">
      <span className="wordmark -rotate-6 text-5xl">Bliss</span>
      <span className="bg-cream rounded-full px-3 py-1 text-sm font-bold">
        {label}
      </span>
    </div>
  </div>
);

export const Panel = ({
  alert = false,
  children,
  title,
}: {
  alert?: boolean;
  children: ReactNode;
  title: string;
}) => (
  <div
    className="card flex flex-col items-center justify-center gap-3 p-6 text-center"
    role={alert ? "alert" : undefined}
  >
    <h2 className="font-display text-xl leading-tight text-balance">{title}</h2>
    <p className="text-pretty">{children}</p>
  </div>
);
