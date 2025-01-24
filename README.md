# Dungeonmans Modding Tools

Disclaimer: This is a fan-project and not affiliated with the original owner, copyright holders, nor license holders of Dungeonmans. If any of the content in this repo is not in agreement with any licenses etc, please contact me.

- [Modding Dungeonmans docs](https://dungeonmans.fandom.com/wiki/Mod_Packages)
- [Dungeonmans on Steam](https://store.steampowered.com/app/288120/Dungeonmans/)

## Current Status

- [EntityDef Lexer](./libs/entity-def-compiler/src/lib/lexer/Lexer.realworld.spec.ts)
  - Turns Entity Def files into tokens for further analysis, etc.
  - Usable: 🟡
    - Several results from real world entityDef examples are shown in the [spec files](./libs/entity-def-compiler/src/lib/lexer/Lexer.realworld.spec.ts). Before I can put a 🟢 on this though, I would need to battle test it by using other tools built on top of this, clarify some remaining questions regarding the syntax of entityDefs, and package it into a lib for anyone else to use.

## Repo Oerview

```sh
npx nx graph
```

## Finish your CI setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/KPB284Qacw)

## Generate a library

```sh
npx nx g @nx/js:lib packages/pkg1 --publishable --importPath=@my-org/pkg1
```

## Run tasks

To build the library use:

```sh
npx nx build pkg1
```

To run any task with Nx use:

```sh
npx nx <target> <project-name>
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Versioning and releasing

To version and release the library use

```sh
npx nx release
```

Pass `--dry-run` to see what would happen without actually releasing the library.

[Learn more about Nx release &raquo;](hhttps://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Keep TypeScript project references up to date

Nx automatically updates TypeScript [project references](https://www.typescriptlang.org/docs/handbook/project-references.html) in `tsconfig.json` files to ensure they remain accurate based on your project dependencies (`import` or `require` statements). This sync is automatically done when running tasks such as `build` or `typecheck`, which require updated references to function correctly.

To manually trigger the process to sync the project graph dependencies information to the TypeScript project references, run the following command:

```sh
npx nx sync
```

You can enforce that the TypeScript project references are always in the correct state when running in CI by adding a step to your CI job configuration that runs the following command:

```sh
npx nx sync:check
```

[Learn more about nx sync](https://nx.dev/reference/nx-commands#sync)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
