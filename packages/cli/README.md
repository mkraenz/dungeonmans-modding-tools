# CLI

## Bundling and Deployment

WIP

Problem 1

`nx run cli:build` puts the files in `<repo-root>/dist/packages/cli/` with entry point `main.js`. I can easily make the file executable with `chmod +x dist/packages/cli/main.js`. The problem is that this file does not have a shebang `#!/usr/bin/env node`. Without the shebang `./dist/packages/cli/main.js help` does not work because the system tries to interpret it as a bash script.

That said, `dist/packages/cli/packages/cli/src/main.js` _does_ have the shebang we define in `packages/cli/src/main.ts:1`.

Question: How to make make turn `dist/packages/cli/main.js` into the correct executable?

Answer: This problem was solved by turning the `cli` project into a _publishable_ library. This way, the `dist` folder stays in the project directory and the shebang is preserved.

Next problem

When publishing the package and installing that package via npm, the package expects any buildable dependencies to be inside `node_modules`. But that is not the case. The obvious workaround is to publish every buildable dependency as well. But that is a bit overkill and leads to overhead on the package-enduser side because installing that one published package requires you to install 20 more tiny packages.

Nx has no good solution for this but [suggests](https://github.com/nrwl/nx/issues/4620#issuecomment-2252879519) to use a different tool than swc or tsc (those are build tools not bundlers; the problem is a bundling issue though). So now I need to switch from tsc to another build/bundle tool...

Answer: Fortunately it was very simple to add esbuild: `nx g @nx/esbuild:configuration cli`.
With that it just worked.

### Potential solutions or approaches

- [make-node-application-executable-in-a-nx-workspace stackoverflow](https://stackoverflow.com/questions/62459815/make-node-application-executable-in-a-nx-workspace)
- [project setup is following this article](https://dev.to/ddanielgal/developing-a-node-cli-app-in-an-nx-monorepo-5f1a)

### Why does NX add the `nx-release-publish` target?

This is controlled by `package.json`'s `"private": false` field. If you set it to `true`, the `nx-release-publish` target will not be added.
