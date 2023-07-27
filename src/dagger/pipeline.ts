import Client, { connect } from "@dagger.io/dagger";
import { hello } from "./jobs.ts";

export default function pipeline(_src = ".") {
  connect(async (client: Client) => {
    await hello(client);
  });
}
