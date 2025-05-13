import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { prettyJSON } from "hono/pretty-json";
import { HTTP404, errorToResponse } from "./error.js";
import type { Context, Env } from "./hono.js";

const app = new Hono<Env>();

app.onError((error, _c) => {
  if (error instanceof HTTPException) {
    return error.getResponse();
  }

  return errorToResponse(error);
});
app.notFound(() => {
  throw HTTP404;
});

// TODO: Remove if you don't need
app.use("*", cors());
app.use("*", prettyJSON());

app.get("/", (c: Context) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
