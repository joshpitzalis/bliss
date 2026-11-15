---
name: Bliss
description: A phone-first companion for the Marital Bliss card game, dressed as the box lid it came in.
colors:
  teal-ground: "#3cb4b0"
  teal-dot: "#63cbc7"
  tomato: "#d9342b"
  tomato-dot: "#c62c24"
  butter-cream: "#f9eab9"
  cream-dot: "#f1d68a"
  paper: "#fffaf0"
  mustard: "#f6c15b"
  ink: "#2b2f45"
  card-white: "#ffffff"
typography:
  display:
    fontFamily: "Chango, Arial Rounded MT Bold, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 400
    lineHeight: 1
  title:
    fontFamily: "Chango, Arial Rounded MT Bold, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.25
  headline:
    fontFamily: "Chango, Arial Rounded MT Bold, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.25
  tile:
    fontFamily: "Chango, Arial Rounded MT Bold, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Quicksand, ui-rounded, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.5
  label:
    fontFamily: "Quicksand, ui-rounded, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 700
    lineHeight: 1.15
rounded:
  tile: "6px"
  inner: "8px"
  button: "14px"
  card: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  deck-gap: "16px"
  deck-gap-pointer: "96px"
components:
  button-plain:
    backgroundColor: "{colors.butter-cream}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "4px 18px"
    height: "56px"
  button-primary:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.paper}"
    typography: "{typography.headline}"
    rounded: "{rounded.button}"
    padding: "4px 18px"
    height: "56px"
  button-commit:
    backgroundColor: "{colors.mustard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button}"
  letter-tile:
    backgroundColor: "{colors.butter-cream}"
    textColor: "{colors.tomato}"
    typography: "{typography.tile}"
    rounded: "{rounded.tile}"
    height: "38px"
  card:
    backgroundColor: "{colors.butter-cream}"
    rounded: "{rounded.card}"
    padding: "6px"
  card-kept:
    backgroundColor: "{colors.mustard}"
    rounded: "{rounded.card}"
  card-face:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.inner}"
  card-back:
    backgroundColor: "{colors.tomato}"
    rounded: "{rounded.inner}"
  stamp:
    backgroundColor: "{colors.mustard}"
    textColor: "{colors.ink}"
    rounded: "{rounded.inner}"
  masthead:
    backgroundColor: "{colors.tomato}"
    textColor: "{colors.butter-cream}"
    typography: "{typography.display}"
    height: "48px"
---

# Design System: Bliss

## Overview

**Creative North Star: "The Box Lid"**

Bliss looks like it came out of the Marital Bliss box: a printed teal ground of halftone dots, a tomato band across the top, butter-cream card stock, and navy ink drawn around everything. It is flat print, not a table and not a dark card app. The old green-felt look is replaced, not extended.

The screen shows one big card at a time on a phone-first, one-thumb layout. Everything else is chrome in the same ink: a masthead, a title row, a status line, a sticky bar. Numbers are never plain text; they sit in cream letter tiles with tomato numerals, like game-board lettering. The whole thing is playful, tactile and a little loud, while the card images, which carry baked-in text, stay the most readable thing on screen.

**Key Characteristics:**

- Halftone dots are the only texture: teal ground, tomato band and card back, cream card stock, each with a slightly lighter or darker dot of its own colour.
- Every shape is outlined in ink, 3px on the outside (2px on the inner card-back panel).
- Depth is a hard ink lip under pressable things; there are no soft or blurred shadows.
- Chango for voice and numbers, Quicksand for everything you read.
- Kept and Done arrive as rotated mustard stamps.

## Colors

A printed palette of five flat inks plus paper: teal, tomato, cream and mustard over navy keylines. No gradients except the dot patterns.

### Primary

- **Tomato Print Red** (#d9342b): the masthead, the primary action button, the face-down card back, and numerals inside letter tiles. It is the loudest colour and appears as one band, one button and one card back at a time. Its dot is #c62c24.

### Secondary

- **Box-Lid Teal** (#3cb4b0): the page ground (body) and the sticky action bar, always with its lighter dot #63cbc7. It is background only; never text or fill for components.

### Tertiary

- **Mustard Stamp** (#f6c15b): state. A kept card's stock, the Kept / Reward / Done stamps, the commit button tone, and the text selection colour. It always means "this has been decided".

### Neutral

- **Butter-Cream Stock** (#f9eab9): card stock, plain buttons, letter tiles, the wordmark. Dotted (#f1d68a) on cards, flat on tiles and buttons.
- **Paper** (#fffaf0): text on tomato buttons, and the focus ring colour inside the masthead.
- **Navy Ink** (#2b2f45): all text, every keyline, the button lip, and the focus ring. There is no black.
- **Card White** (#ffffff): the picture area behind the card image only.

### Named Rules

**The Ink Rule.** All outlines, shadows and text are navy ink (#2b2f45). Never black, never grey, never a tinted shadow.

**The Dot Rule.** A large flat area of teal, tomato or cream is dotted, never plain. Small things (tiles, buttons, stamps) stay flat.

**The State Is Mustard Rule.** Mustard marks a decision (kept, reward, done, commit). Do not spend it on decoration.

## Typography

**Display Font:** Chango (with Arial Rounded MT Bold, sans-serif) **Body Font:** Quicksand (with ui-rounded, system-ui, sans-serif), loaded at 600 and 700

**Character:** Chango is a fat, bouncy poster face and does all the shouting: wordmark, headings, tile numerals, the primary button, stamps. Quicksand is a round, friendly sans that keeps the reading text calm. The base weight is 600, never lighter.

### Hierarchy

- **Display** (Chango 400, 1.75rem, 1): the "Bliss" wordmark in the masthead, cream with a 2px ink drop under the letters. Rotated and enlarged (3rem) on the card back.
- **Headline** (Chango 400, 1.25rem, 1.25): the primary button label and Panel headings.
- **Title** (Chango 400, 1.125rem, 1.25): the phase heading in the title row ("Pick your reward").
- **Tile** (Chango 400, 1.375rem, 1): numerals in letter tiles, tomato on cream.
- **Body** (Quicksand 600, 1rem): panel copy, the status line (bold 700), timestamp on the Done stamp (0.875rem bold).
- **Label** (Quicksand 700, 1.0625rem, 1.15): plain and commit button labels. The label chip on the card back is 0.875rem bold.

### Named Rules

**The Tile Rule.** Every number that matters (pager, days/hours/minutes) is a letter tile, with its unit as plain bold text beside it. Do not set a number loose in running text.

**The One Shouter Rule.** Chango is for names, headings, numerals and the primary action. Running sentences are Quicksand.

## Layout

Single column, phone first. A sticky page frame: masthead (3rem tall, plus the top safe area), title row (min 3.25rem; heading left, status right), the deck, and a sticky bottom bar with the actions. Content is capped at 36rem (max-w-xl) and centred, with 1rem side gutters.

The deck is a horizontal scroll-snap row, one card centred and its neighbours peeking. Card height is whatever is left after the chrome (viewport minus 13.5rem and safe areas), floored at 26rem so the card text stays readable (the page scrolls instead), capped at 39rem and at 82vw x 1.75. Cards are 4:7. Gap between cards is 1rem; on a wide screen with a mouse it opens to 6rem to make room for the previous/next arrow buttons, which sit beside the centred card. The card nearest the centre is full strength; others pulse down to 0.6 opacity and 0.94 scale.

Spacing is a tight 4 / 8 / 12 / 16px rhythm. The bar's bottom padding is 1rem plus the bottom safe area. Actions in the bar are a row with a 12px gap: secondary left (natural width), primary right (fills).

## Elevation & Depth

Flat print with a lip. Surfaces never blur or float. Depth is expressed three ways: an ink keyline around every object, a hard, unblurred ink lip under every pressable thing, and overlap (stamps sit over the card corner; a face-down card has two more cards fanned behind it, rotated -4deg and 3deg).

### Shadow Vocabulary

- **Ink lip** (`box-shadow: 0 4px 0 #2b2f45`): all buttons at rest. On press (and when disabled) the lip collapses to `0 0 0` while the button translates down 4px, so it visibly sinks into the page.
- **Letter lip** (`text-shadow: 0 2px 0 #2b2f45`): the wordmark only.

### Named Rules

**The Lip Rule.** The only shadow is a hard, zero-blur, straight-down ink lip, and only on things that can be pressed (plus the wordmark). Cards, stamps and tiles carry keylines, not shadows.

## Shapes

Rounded like die-cut cardboard. Cards are 16px; the picture inside is 8px (a 6px cream mat between). Buttons are 14px, letter tiles 6px, stamps 8px. The one pill is the "Top secret" label on the card back. The masthead's bottom edge is a shallow convex curve (a 50% by 14px elliptical radius) with a 3px ink keyline under it; that keyline is deliberate and is recorded as a detector exception.

All outlines are 3px solid ink on the outside edge (cards, buttons, tiles, stamps, masthead); the card-back inner panel is 2px. Stamps are rotated (-6deg Done, 6deg Kept and Reward) and overlap the card edge.

## Components

### Buttons

- **Shape:** 14px radius, 3px ink border, 56px minimum height, 4px 18px padding.
- **Plain** (secondary): butter cream fill, ink text, Quicksand 700 at 1.0625rem. Hide, Undo, Put back.
- **Primary:** tomato fill, paper text, Chango 1.25rem. The one main action: Keep, Mark done, Show my hand, New round. Fills the remaining bar width.
- **Commit:** mustard fill. Used once: "Start the week" on the mission screen, disabled until three missions are kept.
- **Hover** (pointer devices only): brightness 1.06. **Press:** the lip collapses and the button drops 4px in 0.12s. **Disabled:** same sunk state at 55% opacity.
- **Focus:** a 3px ink outline offset by 3px (paper inside the masthead).

### Letter Tiles

Cream square, 3px ink border, 6px radius, at least 34px wide by 38px tall, tomato Chango numerals. Used for the pager ("2 of 7" in the masthead, the "of" in white) and the countdown (days, hours, minutes with d / h / m beside). A screen-reader-only sentence carries the real value.

### Cards

- **Stock:** cream with cream dots, 3px ink border, 16px radius, 6px mat around a white image area with 8px radius and cover fit.
- **Kept:** the stock turns flat mustard.
- **Done:** the picture keeps near-full ink (contrast 0.8, brightness 1.1 only); the Done stamp carries the state.
- **Face-down:** a tomato dotted back with the rotated cream wordmark and a cream pill label. Two further cards are fanned behind it.
- **Panel** (end-of-deck prompts and errors): the same card stock holding a Chango heading and a Quicksand paragraph, centred.
- **Entrance:** cards deal in from the right with a slight rotation (0.55s), staggered 70ms apart; a hand flips up on the Y axis (0.5s); all with ease-out-expo.

### Stamps

Mustard rectangle, 3px ink border, 8px radius, Chango, rotated. Kept and Reward sit at the top-right corner of the card and overlap its edge. Done sits centred a third of the way down, clear of the card's point value, larger (1.875rem) with the completion time under it. A stamp lands with a 0.35s scale-down from 1.9x.

### Navigation

There is no navigation chrome. The masthead holds the wordmark (left) and the pager tiles (right). Moving between cards is the swipe, or the arrow buttons (plain buttons holding a 3px-stroke chevron) beside the centred card on wide screens with a mouse.

## Do's and Don'ts

### Do:

- **Do** outline every object in 3px navy ink (#2b2f45) and use no other line colour.
- **Do** put every number in a cream letter tile with a tomato Chango numeral.
- **Do** keep large flat fills dotted (teal ground, tomato band and card back, cream card stock), each with its own dot colour.
- **Do** give every pressable thing the 4px hard ink lip and let it sink when pressed.
- **Do** use mustard only for a decided state: kept, reward, done, commit.
- **Do** keep card images at full strength; state is carried by a stamp, never by fading the ink.
- **Do** honour reduced motion (animations and transitions collapse to near zero) and keep a 56px minimum height for thumb targets.

### Don't:

- **Don't** return to the green-felt, casino-table look or to a dark card app; the ground is teal print.
- **Don't** use soft, blurred or tinted shadows; the only shadow is the zero-blur ink lip.
- **Don't** set numbers as plain text in running copy.
- **Don't** use black or grey; all ink is navy.
- **Don't** set Chango for sentences; it is for names, headings, numerals and the primary action.
- **Don't** put tomato on more than one band, one primary button and one card back at a time.
