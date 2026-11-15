---
version: 1
slug: "src-app-tsx"
primary_target: "src/app.tsx"
related_targets: ["src/features/session/index.tsx", "src/index.css"]
---

# Bliss app (whole surface)

Scope: the single-screen app in `src/app.tsx` and `src/features/session/`. Mode: Operate, phone first, code-led.

Audience and job: one partner, on their own phone, picks a reward and missions, then checks their secret hand through the week and marks missions done. Constraints: cards are images with baked-in text and must be readable without zooming; one thumb; hand stays private; round survives a reload.

Memorable moment: opening the app mid-week to a face-down hand and a countdown in letter tiles, then flipping the hand up.

Unresolved: mission point totals (no per-card data), partner guessing, strategy card effects, alt text for card contents.

## Direction contract

THESIS: The app looks like it came out of the Marital Bliss box. It refuses the casino-felt table and the generic dark card app: one big card at a time on a printed, dotted ground.

OWN-WORLD: Teal halftone-dot ground, tomato masthead and primary button, butter-cream card stock, mustard for kept/commit state, navy ink keylines. Flat print, no soft shadows; pressable buttons carry an ink lip. Chango display, Quicksand UI. Numbers sit in cream letter tiles with tomato numerals.

STORY: The player sees what to decide now, reads a full-size card, acts with the thumb, and trusts the week is saved.

FIRST VIEWPORT: Tomato masthead with wordmark left and "3 of 7" pager tiles right. Title row: phase heading (or the countdown tiles) left, one-line status right. One card at roughly 80% of phone width, centred, neighbours peeking and dimmed, swipe to move. Sticky bottom bar: secondary left, primary action for the centred card right. (As built: the step indicator was dropped and the pager moved up to give the card more height.)

SIGNATURE: Letter tiles carry every number (pager, countdown). The week opens face down; one tap flips the hand up. Kept and Done land as rotated stamps.

FORM: Box Lid, candidate 1 of the ordered list, chosen by the user over the rolled candidate 3. seed:acda6f0b4f3017bf

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
