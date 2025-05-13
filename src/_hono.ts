import type { Context as HonoContext } from "hono";

export type Variables = {
  _?: never;
};

export type Bindings = {
  _?: never;
};

export type Env = { Bindings: Bindings; Variables: Variables };

// biome-ignore lint/suspicious/noExplicitAny: type helper
export type Context<P extends string = any> = HonoContext<Env, P>;
