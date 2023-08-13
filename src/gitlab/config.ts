import { GitlabCI } from "fluent_gitlab_ci";

export function generateYaml() {
  const gitlabci = new GitlabCI();
  console.log(gitlabci.toString());
}
