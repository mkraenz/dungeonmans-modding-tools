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
const modinfoFilename = 'modinfo.txt';
const modinfoContents = `Example Mod Name
mod subheading

mod description
`;

const main = async () => {
  const modDirPath = path.join(path.normalize(modDir), srcDir);
  const modinfoFilepath = path.join(modDirPath, modinfoFilename);
  console.log(modinfoFilepath);

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
    await fsPromises.writeFile(modinfoFilepath, modinfoContents);

  console.log(`\u001b[32m✨ Your brand new mod directory has been created. Happy modding. ✨ 
🔗 ./${modDirPath} 

👣 Next steps:
  - ⛏️ Name and describe your mod -> 🔗 ./${modinfoFilepath}
  - 🛠️ Create entity defs as JSON in the sub-directories
  - 📦 Package your mod for usage in Dungeonmans
  - 🎮 Play you mod
`);
};

main().catch((e) => console.error(e));
