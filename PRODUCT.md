# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A couple playing the card game Marital Bliss against each other. Each partner uses the app on their own phone, most often in short moments through the week. Their hand is secret from the other partner.

## Product Purpose

Bliss is a digital hand for the Marital Bliss card game. It deals the cards, holds the reward and missions a player keeps, runs the one-week round, and records which missions they completed. It succeeds when a player can read every card comfortably on a phone and wants to open it again during the week.

## Positioning

The printed game needs two shuffled decks and somewhere to hide seven cards for a week. Bliss keeps one player's secret hand in their pocket.

## Operating Context

- Draw five reward cards, keep one.
- Draw seven mission cards, keep at least three, or redraw.
- Finalise to start a seven-day countdown.
- During the week, mark missions done (and undo), each stamped with the time.
- Phone first. Desktop must still work.
- Rules come from `mBliss.pdf` (competitive and cooperative rule sheets).

## Capabilities and Constraints

- Cards are images with their text baked in: 88 missions and 38 rewards, 600 x 1050 px each, greyscale line art. They live in `cards/` and in `mission-atlas.png` / `reward-atlas.png`.
- Mission cards carry a point value (3, 5 or 7) and an optional brownie point. Some are Wild Cards or Strategy Cards.
- State lives in an XState machine (`src/features/session/machine.ts`).
- Stack: React 19, XState 6 beta, Effect 4, Tailwind 4, Vite 8, Cloudflare Workers.
- A redesign may change the UI and make small logic fixes the mobile experience needs (for example saving the round across a reload). It should not restructure the machine or services beyond that.
- Not built: guessing a partner's missions, scoring, strategy card effects, cooperative mode, any link between the two partners' phones.

## Brand Commitments

- The app is named Bliss.
- The game is Marital Bliss by Nicole and Nick Fink (Fink & Fink Games). The print-and-play edition is licensed CC BY-NC-SA 4.0.
- The user gave free rein on the look and pointed to https://finkandfinkgames.com/marital-bliss/ as inspiration, not as a rule.
- Voice of the source game: dry, affectionate humour ("Better Marriages Through Subterfuge").

## Evidence on Hand

- `mBliss.pdf`: rules, logo, every card.
- `cards/*.png`: individual card images.
- No user research, testimonials or metrics. Do not invent any.

## Product Principles

1. The card is the content. A player must be able to read any card at arm's length on a phone without zooming.
2. One thumb, short visits. Every step works one-handed in under a minute.
3. The hand is secret. Nothing should make it easy for a partner to glance at it by accident.
4. A round lasts a week. What the player kept must still be there tomorrow.
5. It is a game. Opening it should feel like play, not like a task list.
