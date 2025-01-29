import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import path from 'node:path';
import { ANSI_COLORS } from '../utils/ansi-colors';

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

type Options = {
  dryRun?: true | undefined;
};

type Paths = {
  modname: string;
  modDirPath: string;
  modinfoFilepath: string;
  readmeFilepath: string;
};

export const initModDirectory = async (modDir: string, options: Options) => {
  const modname = path.basename(modDir);
  const modDirPath = path.join(path.normalize(modDir), srcDir);
  const modinfoFilepath = path.join(modDirPath, modinfoFilename);
  const readmeFilepath = path.join(modDirPath, readmeFilename);

  if (await fs.existsSync(modDirPath))
    throw new Error(
      `${ANSI_COLORS.Red}Directory ${modDirPath} already exists. Aborting. Please provide a non-existent directory name to initialize your mod.${ANSI_COLORS.Reset}`
    );

  const paths = { modname, modDirPath, modinfoFilepath, readmeFilepath };

  if (options.dryRun) return dryRun(paths);
  return execute(paths);
};

const dryRun = async (paths: Paths) => {
  const { modname, modDirPath, modinfoFilepath, readmeFilepath } = paths;
  console.log('Would create directory (recursively):', modDirPath);
  dirs.forEach((dir) =>
    console.log('Would create directory:', path.join(modDirPath, dir))
  );
  console.log('Would create file:', modinfoFilepath, 'using modname:', modname);
  console.log('Would create file:', readmeFilepath, 'using modname:', modname);
  logNextSteps(paths);
  console.log(
    `${ANSI_COLORS.Yellow}This was a dry run. No changes have actually been made to your system. To actually apply these changes, run the command without the --dry-run flag.${ANSI_COLORS.Reset}`
  );
};

const execute = async (paths: Paths) => {
  const { modname, modDirPath, modinfoFilepath, readmeFilepath } = paths;
  await fsPromises.mkdir(modDirPath, { recursive: true });

  const mkdirPromises = dirs.map((dir) =>
    fsPromises.mkdir(path.join(modDirPath, dir))
  );
  await Promise.all(mkdirPromises);
  await fsPromises.writeFile(modinfoFilepath, modinfoTemplate(modname));
  await fsPromises.writeFile(readmeFilepath, readmeTemplate(modname));
  logNextSteps(paths);
};

const logNextSteps = ({
  modDirPath,
  readmeFilepath,
  modinfoFilepath,
}: Paths) => {
  console.log(`${ANSI_COLORS.Green}✨ Your brand new mod directory has been created. Happy modding. ✨ 
🔗 ./${modDirPath} 

👣 Next steps:
  - 📚 Learn about your mod directory -> 🔗 ./${readmeFilepath}
  - 🔧 Name and describe your mod -> 🔗 ./${modinfoFilepath}
  - 🔨 Create entity defs as JSON or txt in the sub-directories
  - 📦 Package your mod for usage in Dungeonmans
  - 🎮 Play you mod
${ANSI_COLORS.Reset}`);
};

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
# clean the build dir
rm -r mods/${modname}/dist

# build the mod
pnpm run build:mod mods/${modname}/src mods/${modname}/dist
\`\`\`

> Details: \`.txt\` files will be copied over as-is. \`.json\` files will be turned into entitydefs inside \`.txt\` files. The only exception being plotdata files. Those just stay in json format because Dungeonmans supports plotdata jsons natively.

Finally, manually copy the \`dist\` directory as-is to the dungeonmans mod folder \`c:\\users\\[you]\\appdata\\roaming\\Dungeonmans\\modcontent\\mods\` and rename the \`dist\` directory into \`${modname}\`.
`;
