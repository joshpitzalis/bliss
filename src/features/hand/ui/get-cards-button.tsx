export const GetCardsButton = ({
  cards,
  send,
}: {
  cards: boolean;
  send: (event: { type: "DREW" }) => void;
}) => (
  <button
    className="border-line rounded-lg border bg-white/80 px-8 py-4 text-lg font-light uppercase"
    onClick={() => send({ type: "DREW" })}
    type="button"
  >
    {cards ? "Replace hand" : "Draw Rewards"}
  </button>
);
