import Client from "@dagger.io/dagger";

export enum Job {
  hello = "hello",
}

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

export type JobExec = (
  client: Client,
  src?: string
) =>
  | Promise<void>
  | ((
      client: Client,
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<void>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.hello]: hello,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.hello]: "Say hello",
};
