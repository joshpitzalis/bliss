import { Effect, Layer } from "effect";
import { HttpRouter, HttpServer, HttpServerResponse } from "effect/http";

const AppLive = HttpRouter.add(
  "GET",
  "/api/health",
  Effect.succeed(HttpServerResponse.text("ok"))
).pipe(Layer.provide(HttpServer.layerServices));

// Built once at module scope, as Effect's Cloudflare Workers guidance requires.
const app = HttpRouter.toWebHandler(AppLive);

export default {
  fetch: (request) => app.handler(request),
} satisfies ExportedHandler<Env>;
