# Bliss

A phone-first hand for the card game [Marital Bliss](https://finkandfinkgames.com/marital-bliss/).

**Play it:** https://bliss.robot-josh.workers.dev/

Each partner opens Bliss on their own phone. You draw five rewards and keep one, draw seven missions and keep at least three, then start a one-week round. Your hand stays face down until you ask for it, and you mark missions done as you complete them in secret.

Bliss holds one player's hand. It does not score the round, track guesses, or connect the two phones. The rules are in `mBliss.pdf`.

## Credits and licence

Marital Bliss was created by Nicole and Nick Fink of [Fink & Fink Games](https://finkandfinkgames.com/). The card images in `cards/`, the atlas sheets, and `mBliss.pdf` come from their free print-and-play edition, licensed [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). The card images were cut from the PDF into one file per card; the artwork is otherwise unchanged. They may not be used commercially, and any copies or adaptations must keep the same licence.

This is an unofficial fan project and is not affiliated with Fink & Fink Games. If you enjoy the game, [buy the printed deck](https://finkandfinkgames.com/marital-bliss/).

## Development

```sh
pnpm install
pnpm dev          # local dev server
pnpm typecheck
pnpm check        # lint and format check
pnpm run deploy   # build and deploy to Cloudflare Workers
```

Built with React, XState, Effect, Tailwind and Vite, served from a Cloudflare Worker. `PRODUCT.md` and `DESIGN.md` describe the product and its design system.
