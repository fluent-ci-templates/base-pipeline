import { JobSpec, Workflow } from "fluent_github_actions";
import { setupDocker } from "./docker.ts";

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
        name: "Show Docker version",
        run: "docker version",
      },
      {
        name: "Setup Dagger",
        run: setupDagger,
      },
    ],
  };

  workflow.on({ push }).jobs({ hello });

  console.log(workflow.toString());

  workflow.save(".github/workflows/base.yml");
}
