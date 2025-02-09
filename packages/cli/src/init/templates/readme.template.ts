import { kebabCase } from 'lodash-es';

export const readmeTemplate = (modname: string) => `# ${modname}

This directory was created using \`npx @dungeonmans-mod-tools/cli init\`.

## Next steps

Add json files to add monsters, dungeons, etc inside the respective subdirectories of the \`src/\` directory.

If supported by your editor you should get intellisense, type hinting, and hover-over-documentation, too. Support may vary by IDE. We have set up the schemas for use in VS Code by default. If you use a different editor, you can find the Dungeonmans JSON schemas inside \`.vscode/settings.json#json.schemas\` or regenerate them with \`npx @dungeonmans-mod-tools/cli schemas --editor other\`. For IntelliJ, see [their docs](https://www.jetbrains.com/help/idea/json.html#ws_json_schema_add_custom) on using Custom JSON Schemas. (Disclaimer: The json schemas that enable IDE support are Work In Progress.)

If you prefer to write entityDefs in plain text instead, you can do that as well by writing them as \`.txt\` files inside the subdirectories of \`src/\`. Be aware that there are no guard rails though.

Code can be added to the \`src/code\` directory. Check the [official Tutorial Mod](https://github.com/jim-adventureprogames/dmans-tutorial-mod/tree/main) for examples

Once you want to test your mod in the game, you build your mod into formats that Dungeonmans understands with

\`\`\`sh
# clean the build dir
rm -r dist

# build the mod
npx @dungeonmans-mod-tools/cli build src dist/${kebabCase(modname)}
\`\`\`

> Details: \`.txt\`, \`.png\`, and \`.cs\` files will be copied over as-is. \`.json\` files will be turned into entitydefs inside \`.txt\` files. Notable exceptions being JSON files in plotdata/ and overworldgenerationdata/ which are copied as-is, too, because Dungeonmans supports those natively.

Next, manually copy the \`dist\\${kebabCase(
  modname
)}\` directory as-is to the Dungeonmans mod folder \`c:\\users\\[you]\\appdata\\roaming\\Dungeonmans\\modcontent\\mods\`. 

Finally, start the game, select it in the mod loader popup, and enjoy Dungeonmans by crushing some of your own monster creations and much more.

## Useful Links

- [Modding Dungeonmans docs](https://dungeonmans.fandom.com/wiki/Mod_Packages)
- [Example Mod by the Dungeonmans Creator](https://github.com/jim-adventureprogames/dmans-tutorial-mod/tree/main)
- [Dungeonmans Discord](https://discord.gg/stremf)
- [Dungeonmans Mod Tools Github](https://github.com/mkraenz/dungeonmans-modding-tools)
- [CLI Docs on NPM](https://www.npmjs.com/package/@dungeonmans-mod-tools/cli)
`;
