import Client from "@dagger.io/dagger";

export const hello = async (client: Client, src = ".") => {
  const context = client.host().directory(src);
  const ctr = client
    .pipeline("hello")
    .container()
    .from("alpine")
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec(["echo", "'Hello, world!'"]);

  const result = await ctr.stdout();

  console.log(result);
};
