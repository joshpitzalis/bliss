import { Effect, Schema } from "effect";

import { HAND_SIZE } from "../lib/constants";
import { CardSchema } from "../lib/schema";

const API = "https://deckofcardsapi.com/api/deck";

const ShuffleResponse = Schema.Struct({
  deck_id: Schema.String,
});

const DrawResponse = Schema.Struct({
  cards: Schema.Array(CardSchema),
});

const getJson = (url: string) =>
  Effect.tryPromise({
    try: (signal) => fetch(url, { signal }),
    catch: (cause) =>
      cause instanceof Error ? cause : new Error("Could not draw a hand"),
  }).pipe(
    Effect.flatMap((response) =>
      response.ok
        ? Effect.tryPromise({
            try: () => response.json(),
            catch: () => new Error("Could not read the response"),
          })
        : Effect.fail(new Error(`Request failed: ${response.status}`))
    )
  );

const asDrawError = (error: Error | Schema.SchemaError) =>
  new Error(error.message);

export const drawHand = Effect.gen(function* generateHand() {
  const shuffled = yield* getJson(`${API}/new/shuffle/?deck_count=1`);

  const { deck_id } =
    yield* Schema.decodeUnknownEffect(ShuffleResponse)(shuffled);

  const drawn = yield* getJson(`${API}/${deck_id}/draw/?count=${HAND_SIZE}`);

  const { cards } = yield* Schema.decodeUnknownEffect(DrawResponse)(drawn);

  return cards;
}).pipe(Effect.mapError(asDrawError));

// import { Schema } from "effect";
// import { createAsyncLogic } from "xstate";
//
// import { HAND_SIZE } from "./lib/constants";
// import type { Card } from "./lib/schema";
// import { CardSchema } from "./lib/schema";
//
// export const loadCards = createAsyncLogic({
//   run: async () => await drawHand(),
// });
//
// const getJson = async (url: string) => {
//   const response = await fetch(url);
//
//   if (!response.ok) {
//     throw new Error(`Request failed: ${response.status}`);
//   }
//
//   return response.json();
// };
//
// export const drawHand = async (): Promise<readonly Card[]> => {
//   const { deck_id } = decodeShuffle(
//     await getJson(`${API}/new/shuffle/?deck_count=1`)
//   );
//
//   const { cards } = decodeDraw(
//     await getJson(`${API}/${deck_id}/draw/?count=${HAND_SIZE}`)
//   );
//
//   return cards;
// };
//
// const API = "https://deckofcardsapi.com/api/deck";
//
// const decodeShuffle = Schema.decodeUnknownSync(
//   Schema.Struct({
//     deck_id: Schema.String,
//   })
// );
//
// const decodeDraw = Schema.decodeUnknownSync(
//   Schema.Struct({
//     cards: Schema.Array(CardSchema),
//   })
// );
