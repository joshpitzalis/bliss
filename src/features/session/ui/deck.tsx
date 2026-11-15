import type { ReactNode, UIEvent } from "react";
import { useRef } from "react";

// Distance from one card to the next, read from the layout so it follows the
// card size and the gap in index.css.
const strideOf = (scroller: HTMLElement) => {
  const [first, second] = scroller.children;

  return first instanceof HTMLElement && second instanceof HTMLElement
    ? second.offsetLeft - first.offsetLeft
    : 0;
};

const Arrow = ({
  direction,
  onClick,
}: {
  direction: "next" | "previous";
  onClick: () => void;
}) => (
  <div
    className={`absolute inset-y-0 hidden items-center md:pointer-fine:flex ${
      direction === "next"
        ? "left-[calc(50%+var(--card-w)/2+1.5rem)]"
        : "right-[calc(50%+var(--card-w)/2+1.5rem)]"
    }`}
  >
    <button
      aria-label={direction === "next" ? "Next card" : "Previous card"}
      className="btn min-h-12 px-3"
      onClick={onClick}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path d={direction === "next" ? "M9 4l8 8-8 8" : "M15 4l-8 8 8 8"} />
      </svg>
    </button>
  </div>
);

export const Deck = ({
  children,
  label,
  onIndexChange,
}: {
  children: ReactNode;
  label: string;
  onIndexChange?: (index: number) => void;
}) => {
  const scroller = useRef<HTMLUListElement>(null);

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    const stride = strideOf(event.currentTarget);

    if (stride > 0) {
      onIndexChange?.(Math.round(event.currentTarget.scrollLeft / stride));
    }
  };

  const step = (direction: -1 | 1) => {
    const element = scroller.current;

    element?.scrollBy({
      behavior: "smooth",
      left: direction * strideOf(element),
    });
  };

  return (
    <div className="relative my-auto">
      <ul
        aria-label={label}
        className="deck"
        onScroll={handleScroll}
        ref={scroller}
      >
        {children}
      </ul>
      {onIndexChange !== undefined && (
        <>
          <Arrow direction="previous" onClick={() => step(-1)} />
          <Arrow direction="next" onClick={() => step(1)} />
        </>
      )}
    </div>
  );
};
