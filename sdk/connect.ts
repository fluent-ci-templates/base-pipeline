import {
  CallbackFct as DefaultCallbackFct,
  ConnectOpts,
  connect as defaultConnect,
} from "../deps.ts";
import { Client } from "./client.gen.ts";

export type CallbackFct = (client: Client) => Promise<void>;

export async function connect(
  cb: CallbackFct,
  config: ConnectOpts = {}
): Promise<void> {
  if (!Deno.env.has("FLUENTCI_TOKEN") || !Deno.env.has("FLUENTCI_SESSION_ID")) {
    return defaultConnect(cb as unknown as DefaultCallbackFct, config);
  }

  const client = new Client({
    host: Deno.env.get("FLUENTCI_HOST") || "vm.fluentci.io",
    sessionToken: Deno.env.get("FLUENTCI_TOKEN"),
  });

  await cb(client);
}
