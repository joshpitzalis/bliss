import type { ReactNode } from "react";

export const Screen = ({
  actions,
  children,
  pager,
  status,
  title,
}: {
  actions: ReactNode;
  children: ReactNode;
  pager?: ReactNode;
  status: string;
  title: ReactNode;
}) => (
  <div className="flex min-h-dvh flex-col">
    <header className="masthead">
      <div className="mx-auto flex h-12 max-w-xl items-center justify-between px-4">
        <span className="wordmark">Bliss</span>
        {pager}
      </div>
    </header>
    <main className="flex flex-1 flex-col">
      <div className="mx-auto flex min-h-13 w-full max-w-xl items-center justify-between gap-3 px-4 pt-2">
        {title}
        <p aria-live="polite" className="flex-none text-base font-bold">
          {status}
        </p>
      </div>
      {children}
      <div className="bar sticky bottom-0 px-4 pt-3">
        <div className="mx-auto flex max-w-xl gap-3">{actions}</div>
      </div>
    </main>
  </div>
);

export const Title = ({ children }: { children: ReactNode }) => (
  <h1 className="font-display text-lg leading-tight">{children}</h1>
);

export const Pager = ({ count, index }: { count: number; index: number }) => (
  <p className="flex items-center gap-1.5 text-base font-bold text-white">
    <span className="sr-only">
      Card {index + 1} of {count}
    </span>
    <span aria-hidden="true" className="tile">
      {index + 1}
    </span>
    <span aria-hidden="true">of</span>
    <span aria-hidden="true" className="tile">
      {count}
    </span>
  </p>
);
