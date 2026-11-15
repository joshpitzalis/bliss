import { useEffect, useState } from "react";

import { Title } from "./screen";

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;
const HOUR_MINUTES = 60;
const DAY_MINUTES = 24 * HOUR_MINUTES;

export const useRemaining = (deadline: number) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(Date.now());
    }, SECOND_MS);

    return () => {
      window.clearInterval(id);
    };
  }, []);

  return Math.max(0, deadline - now);
};

const twoDigits = (value: number) => String(value).padStart(2, "0");

export const Countdown = ({ remaining }: { remaining: number }) => {
  if (remaining === 0) {
    return <Title>Time&rsquo;s up</Title>;
  }

  // Round up so the clock only reads zero when the week is over.
  const totalMinutes = Math.ceil(remaining / MINUTE_MS);
  const days = Math.floor(totalMinutes / DAY_MINUTES);
  const hours = Math.floor((totalMinutes % DAY_MINUTES) / HOUR_MINUTES);
  const minutes = totalMinutes % HOUR_MINUTES;

  return (
    <h1 className="font-bold">
      <span className="sr-only">
        {days} days, {hours} hours and {minutes} minutes left
      </span>
      <span aria-hidden="true" className="flex items-center gap-1">
        <span className="tile">{days}</span>d
        <span className="tile ml-1">{twoDigits(hours)}</span>h
        <span className="tile ml-1">{twoDigits(minutes)}</span>m
      </span>
    </h1>
  );
};
