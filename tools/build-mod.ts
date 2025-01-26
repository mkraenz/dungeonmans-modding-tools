import fs from 'node:fs';
import path from 'node:path';
import { jsToManyEntityDefs } from '../libs/yaml-to-entitydef/src';

/** Usage: tsx tools/build-mod.ts mods/testmodname/src mods/testmodname/dist */

/**
 *
 *
 * Command line script that receives a directory for scanning and an output directory
 * Scans the given directory including subdirectories for files.
 * If the script encounters a .txt file, copies it over to the output directory.
 * If the script encounters a .json file, it reads the json file, turns it into entityDef, and writes back the file to the output directory as .txt under the same sub-directory.
 * The only exception is when the .json file is inside the plotdata/ directory. In this case, it just straight copies the json file as-is to the output directory under the same sub-directory.
 *
 * Minor details:
 * If the output directory does not exist, creates it.
 * */

const [_nodepath, _scriptpath, srcDir, outDir] = process.argv;

const GREEN = '\u001b[32m';
const RED = '\u001b[31m';
const RESET = '\u001b[0m';
const log = console.log.bind(console);
const logError = (...msgs: string[]) => {
  console.error(`${RED}${msgs.join(' ')}${RESET}`);
};

let errors = 0;

const main = async () => {
  log('🔨 Building your Dungeonmans mod...');
  if (!fs.existsSync(outDir))
    await fs.promises.mkdir(outDir, { recursive: true });
  const dir = await fs.promises.opendir(srcDir);
  for await (const dirent of dir) {
    if (isFile(dirent, '.txt') || isFile(dirent, '.png')) {
      const srcPath = path.join(srcDir, dirent.name);
      const destPath = path.join(outDir, dirent.name);
      await fs.promises.copyFile(srcPath, destPath);
      log('Written', destPath);
    }

    if (dirent.isDirectory()) {
      const subdir = await fs.promises.opendir(
        path.join(dirent.parentPath, dirent.name)
      );
      for await (const subdirent of subdir) {
        await fs.promises.mkdir(path.join(path.join(outDir, dirent.name)), {
          recursive: true,
        });
        if (
          isFile(subdirent, '.txt') ||
          isFile(subdirent, '.png') ||
          // plotdata in dungeonmans supports JSON natively. no conversion needed
          (dirent.name === 'plotdata' && isFile(subdirent, '.json'))
        ) {
          const srcPath = path.join(srcDir, dirent.name, subdirent.name);
          const destPath = path.join(outDir, dirent.name, subdirent.name);
          await fs.promises.copyFile(srcPath, destPath);
          log('Written', destPath);
          continue;
        }
        if (isFile(subdirent, '.json')) {
          const srcPath = path.join(srcDir, dirent.name, subdirent.name);
          const filebasename = path.basename(subdirent.name, '.json');
          const destPath = path.join(
            outDir,
            dirent.name,
            `${filebasename}.txt`
          );
          const jsonFile = await fs.promises.readFile(srcPath, {
            encoding: 'utf-8',
          });
          try {
            const json = JSON.parse(jsonFile);
            const entityDef = jsToManyEntityDefs(json);
            await fs.promises.writeFile(destPath, entityDef);
            log('Written', destPath);
          } catch (error) {
            errors++;
            logError('ERROR: Failed to parse JSON file', srcPath);
          }
        }
      }
    }
  }
  log(
    `${errors ? RED : GREEN}${errors ? '❌' : '✅'} Build completed ${
      errors
        ? `with ${errors} errors. Please check the output above.`
        : 'witout errors.'
    }${RESET}`
  );
};

const isFile = (dirent: fs.Dirent, extname: string) =>
  dirent.isFile() && path.extname(dirent.name) === extname;

main().catch((e) => console.error(e));
