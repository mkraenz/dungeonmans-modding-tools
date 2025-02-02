# Dungeonmans Mod Tools CLI

CLI to help you develop Mod Content for Dungeonmans.

## Why should I use this?

If you want to create a mod for Dungeonmans, we recommend you use our [nifty CLI tool](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli) to create a new mod project. Assuming your text editor/IDE supports it, you will get

- Autocompletion
- Type checking
- and Hover-over documentation

for your mod files. Your text editor needs to be able to provide these features from JSON Schemas. If you don't know how to set this up for your text editor, VS Code does a great job at this out-of-the-box.

### Background

Dungeonmans defines most content in a custom **plain text format** called **EntityDefs**. While you can certainly write monsters, items etc by hand, you don't get any quality of life features. Using the CLI tool, you can write your content in JSON files and then build them into EntityDefs. This way you can use your text editor's features to help you write your mod.

## Get Started

```sh
# Initialize a new mod project.
npx @dungeonmans-mod-tools/cli init <directory> <modName>
# Build your mod.
npx @dungeonmans-mod-tools/cli build <srcDir> <outDir>

# Help including examples for each command.
npx @dungeonmans-mod-tools/cli help
npx @dungeonmans-mod-tools/cli init --help
npx @dungeonmans-mod-tools/cli build --help
```

## Init command

`npx @dungeonmans-mod-tools/cli build --help`

```log
Usage: dungeonmans-mod-tools init [options] <directory> <modName>

Initialize a new mod project.

Arguments:
  directory   Directory to create and initialize your mod in
  modName     Name of your mod

Options:
  --dry-run   Simulate the execution of the command without actually changing anything.
  --verbose   Print additional info.
  -h, --help  display help for command

    Example A:                dungeonmans-mod-tools init myawesomemod supermod
    Example B:                dungeonmans-mod-tools init somepath/somedir/myawesomemod supermod
    Example C:                dungeonmans-mod-tools init somepath/somedir/myawesomemod 'Best Mod Eva'
    Example D (dry-run):      dungeonmans-mod-tools init myawesomemod supermod --dry-run
```

## Build command

`npx @dungeonmans-mod-tools/cli build --help`

```log
Usage: dungeonmans-mod-tools build [options] <srcDir> <outDir>

Build your mod into entitydefs for copy-and-paste into the Dungeonmans mod directory.

Arguments:
  srcDir      Source directory containing your mod, that is, the directory your modinfo.txt lives.
  outDir      Ouput directory. This is the directory you copy-paste into c:\users\[you]\appdata\roaming\Dungeonmans\modcontent\mods\ directory to play your mod in Dungeonmans.
      If outDir directory does not exist, creates it and its parents as necessary.

Options:
  --dry-run   Simulate the execution of the command without actually changing anything.
  --verbose   Print additional info.
  -h, --help  display help for command

Example A:                dungeonmans-mod-tools build ./src ./dist/mymodname
Example B:                dungeonmans-mod-tools build somepath/somedir/src dist/mymodname
Example C (dry-run):      dungeonmans-mod-tools build ./src ./dist/mymodname --dry-run
```

## For Tool Developers

This readme is published on npm. As such, all details about development of the CLI and related mod tools have been moved to [README.development.md](./README.development.md).

## References

- [GitHub](https://github.com/mkraenz/dungeonmans-mod-tools)
- [NPM](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli)
