# Base Pipeline

![deno compatibility](https://shield.deno.dev/deno/^1.34)

This repository contains a minimal pipeline for a [Fluent CI](https://fluentci.io) project. It is intended to be used as a template for new projects.

## Files Tree Layout

```
src
├── dagger                : Dagger pipeline files
│   ├── index.ts          : Dagger pipeline entrypoint
│   ├── jobs.ts           : Dagger pipeline jobs
│   ├── list_jobs.ts      : Used by `fluentci ls` command
│   ├── pipeline.ts       : Dagger pipeline definition
│   └── runner.ts         : Used by `dagger fluentci .` command
├── github                : Github Actions YAML Generator
│   ├── config.ts         : Github Actions Config
│   ├── init_test.ts      : Github Actions Config Test
│   ├── init.ts           : Used by `fluentci gh init` command
│   └── README.md         : Github Actions README
└── gitlab                : Gitlab CI YAML Generator
    ├── config.ts         : Gitlab CI Config
    └── init.ts           : Used by `fluentci gl init` command (coming soon!)
```