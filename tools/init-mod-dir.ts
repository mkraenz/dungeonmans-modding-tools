import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';

// Usage: tsx tools/init-mod-dir mods/mymodname

const [_nodepath, _scriptpath, modDir] = process.argv;

const srcDir = 'src';
const dirs = [
  'academydata',
  'actordata',
  'birdtexturedata',
  'code',
  'dungeondata',
  'encounterdata',
  'gamesystemdata',
  'itemdata',
  'overworldgenerationdata',
  'plotdata',
  'setbonusdata',
  'specialpowerdata',
  'spritedata',
  'statuseffectdata',
  'tabledata',
  'textures',
];
const readmeFilename = 'README.md';
const modinfoFilename = 'modinfo.txt';

const main = async () => {
  const modname = path.basename(modDir);
  const modDirPath = path.join(path.normalize(modDir), srcDir);
  const modinfoFilepath = path.join(modDirPath, modinfoFilename);
  const readmeFilepath = path.join(modDirPath, readmeFilename);

  if (await fs.existsSync(modDirPath))
    throw new Error(
      `${modDirPath} already exists. Aborting. Please provide a non-existent directory name to initialize your mod.`
    );

  await fsPromises.mkdir(modDirPath, { recursive: true });

  const mkdirPromises = dirs.map((dir) =>
    fsPromises.mkdir(path.join(modDirPath, dir))
  );
  await Promise.all(mkdirPromises);
  const modfileExists = await fs.existsSync(modinfoFilepath);
  if (!modfileExists)
    await fsPromises.writeFile(modinfoFilepath, modinfoTemplate(modname));
  const readmeExists = await fs.existsSync(readmeFilepath);
  if (!readmeExists)
    await fsPromises.writeFile(readmeFilepath, readmeTemplate(modname));

  console.log(`\u001b[32m✨ Your brand new mod directory has been created. Happy modding. ✨ 
🔗 ./${modDirPath} 

👣 Next steps:
  - 📚 Learn about your mod directory -> 🔗 ./${readmeFilepath}
  - 🔧 Name and describe your mod -> 🔗 ./${modinfoFilepath}
  - 🔨 Create entity defs as JSON or txt in the sub-directories
  - 📦 Package your mod for usage in Dungeonmans
  - 🎮 Play you mod
`);
};

main().catch((e) => console.error(e));

const modinfoTemplate = (modname: string) => `${modname}
mod subheading

mod description
`;

const readmeTemplate = (modname: string) => `# ${modname}

This directory was initialized with \`pnpm run init:mod mods/${modname}\`.

You can now add json files to add monsters, dungeons, etc inside the \`src/\` directory.  
If you have the dungeonmans json schemas set up, you should get autocompletion and type validation, too.

If you prefer to write entityDefs instead, you can do that as well by writing them as usual \`.txt\` files inside the \`src/\` directory.

Once you want to test your mod in the game, you build your mod into formats that Dungeonmans understands with

\`\`\`sh
# build the mod
pnpm run build:mod mods/${modname}/src mods/${modname}/dist
\`\`\`

> Details: \`.txt\` files will be copied over as-is. \`.json\` files will be turned into entitydefs inside \`.txt\` files. The only exception being plotdata files. Those just stay in json format because Dungeonmans supports plotdata jsons natively.

Finally, manually copy the \`dist\` directory as-is to the dungeonmans mod folder \`c:\\users\\[you]\\appdata\\roaming\\Dungeonmans\\modcontent\\mods\` and rename the \`dist\` directory into \`${modname}\`.
`;
