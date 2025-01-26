# Dungeonmans Modding Tools

Disclaimer: This is a fan-project and not affiliated with the original owner, copyright holders, nor license holders of Dungeonmans. If any of the content in this repo is not in agreement with any licenses etc, please contact me.

- [Dungeonmans on Steam](https://store.steampowered.com/app/288120/Dungeonmans/)
- [Modding Dungeonmans docs](https://dungeonmans.fandom.com/wiki/Mod_Packages)
- [Example mod repo by the Dungeonmans Creator](https://github.com/jim-adventureprogames/dmans-tutorial-mod/tree/main)

## Terms

- entity defs, entity definitions = text-based file format to define monsters/items/sprites/dungeons etc. inside of Dungeonmans
  - exception: [Plot Threads](https://dungeonmans.fandom.com/wiki/Plot_Threads) use JSON instead of entity def text fle
  - one `.txt` file can contain multiple entity defs

## Current Status

### Content Creation

- 🟢 [JSON schemas](libs/dmans-schemas/gen/monster.schema.json) for selected entity defs and plot theads as JSON
  - Provides autocompletion and validation when creating or editing JSONs that are going to be converted into entity def txt files
  - Check [vscode workspace settings'](.vscode/settings.json) `json.schemas` property on how to set up your editor to automatically make.
- 🔴 JSON to entity def text file
  - Turns your JSONs into

### Low-level

- 🟡 [EntityDef Lexer](libs/entity-def-compiler/src/lib/lexer/Lexer.realworld.spec.ts)
  - Turns Entity Def txt files into tokens for further analysis, etc.
  - Usable: 🟡
    - Several results from real world entityDef examples are shown in the [spec files](libs/entity-def-compiler/src/lib/lexer/Lexer.realworld.spec.ts). Before I can put a 🟢 on this though, I would need to battle test it by using other tools built on top of this, clarify some remaining questions regarding the syntax of entityDefs, and package it into a lib for anyone else to use.
  - TODO
    - tokenize `WhitespaceTrivia` (to create Concrete Syntax Tree)
    - allow comments `// ignore all this` (again, tokenize `CommentTrivia`)
- 🔴 [EntityDef Parser](libs/entity-def-compiler/src/lib/ast-parser/Parser.ts)
  - Leverages tokens created by Lexer to create a Syntax Tree
  - TODO
    - research good libs for AST node creation that also supports operations on those nodes
    - implementation (see unfinished/skipped test cases in spec file)

## Repo Oerview

```sh
npx nx graph
```

At this point, I am really just throwing in stuff without much thought. Using those creative energies to pump out tools. The repo structure has to change for sure by moving things like the Lexer into `packages/` among other things in order to be reused by other modders.

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
