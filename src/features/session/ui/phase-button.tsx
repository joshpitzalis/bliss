import type { ReactNode } from "react";

export const PhaseButton = ({
  children,
  className = "",
  disabled = false,
  onClick,
  tone = "plain",
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  tone?: "commit" | "plain" | "primary";
}) => (
  <button
    className={`btn ${className}`}
    data-tone={tone}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
);
