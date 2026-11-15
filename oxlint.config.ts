import { defineConfig } from "oxlint";
import antiSlop from "ultracite/oxlint/anti-slop";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";
import shadcn from "ultracite/oxlint/shadcn";

export default defineConfig({
  env: core.env,
  extends: [core, react, shadcn, antiSlop],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    "tools/oxlint/**",
    "worker-configuration.d.ts",
  ],
  jsPlugins: [
    ...(shadcn.jsPlugins ?? []),
    // Vendored from https://github.com/dmmulroy/anti-slop (src/effect).
    // Ultracite bundles the generic anti-slop rules but not the Effect group.
    {
      name: "anti-slop-effect",
      specifier: "./tools/oxlint/anti-slop-effect/index.ts",
    },
  ],
  rules: {
    // Stately's editor writes `/** @xstate-layout <payload> */` into machine configs.
    "jsdoc/check-tag-names": ["error", { definedTags: ["xstate-layout"] }],
    "anti-slop-effect/no-manual-effect-error-tag": "error",
    "anti-slop-effect/no-manual-tag-comparison": "error",
    "anti-slop-effect/no-manual-tagged-construction": "error",
    "anti-slop-effect/no-service-constructor-imports": "error",
    "anti-slop-effect/prefer-effect-match": "error",
    complexity: "error",
  },
});
