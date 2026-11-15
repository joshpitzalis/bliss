import { Schema } from "effect";

export const CardSchema = Schema.Struct({
  code: Schema.String,
  image: Schema.String,
  suit: Schema.String,
  value: Schema.String,
});

export type Card = (typeof CardSchema)["Type"];
