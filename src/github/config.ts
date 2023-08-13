import { JobSpec, Workflow } from "fluent_github_actions";

export function generateYaml() {
  const workflow = new Workflow("base");

  const push = {
    branches: ["feat/github-actions-generator"],
  };

  const setupDagger = `\
  curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.1 sh
  sudo mv bin/dagger /usr/local/bin
  dagger version`;

  const hello: JobSpec = {
    "runs-on": "ubuntu-latest",
    steps: [
      {
        uses: "actions/checkout@v2",
      },
      {
        uses: "denolib/setup-deno@v2",
        with: {
          "deno-version": "v1.36",
        },
      },
      {
        name: "Setup Fluent CI CLI",
        run: "deno install -A -r https://cli.fluentci.io -n fluentci",
      },
      {
        name: "Setup Dagger",
        run: setupDagger,
      },
      {
        name: "List Jobs",
        run: "fluentci ls .",
      },
    ],
  };

  workflow.on({ push }).jobs({ hello });

  console.log(workflow.toString());

  workflow.save(".github/workflows/base.yml");
}
