# Circle CI

The following command will generate a `.circleci/config.yml` file in your project:

```bash
fluentci cci init
```

Generated file:

```yaml
# Do not edit this file directly. It is generated by https://deno.land/x/fluent_circleci

version: 2.1
jobs:
  base:
    steps:
      - checkout
      - run: sudo apt-get update && sudo apt-get install -y curl unzip
      - run: |
          curl -fsSL https://deno.land/x/install/install.sh | sh
          export DENO_INSTALL="$HOME/.deno"
          export PATH="$DENO_INSTALL/bin:$PATH"
      - run: deno install -A -r https://cli.fluentci.io -n fluentci
      - run: |
          curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.8.1 sh
          sudo mv bin/dagger /usr/local/bin
          dagger version
      - run:
          name: Run Dagger Pipelines
          command: dagger run fluentci .
    machine:
      image: ubuntu-2004:2023.07.1
workflows:
  dagger:
    jobs:
      - base

```

Feel free to edit the template generator at `.fluentci/src/circleci/config.ts` to your needs.