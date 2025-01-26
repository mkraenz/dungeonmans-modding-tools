import chokidar from 'chokidar';
import yaml from 'js-yaml';
import fs from 'node:fs';
import path from 'node:path';

/** Note: this includes subdirectories! */
const watchedDir = path.join('mods', 'testplotthread');
const outDir = path.join(watchedDir, 'out');

const watcher = chokidar.watch(watchedDir, {
  ignored: (path, stats) => Boolean(stats?.isFile() && !path.endsWith('.json')),
});
const log = console.log.bind(console);
log('Watching', watchedDir);
log('Output directory', outDir);

watcher
  .on('add', (path) => jsonToYaml(path))
  .on('change', (path) => jsonToYaml(path))
  .on('unlink', (path) => removeYamlFile(path));

function pathToYamlFilePath(filepath: string) {
  const subpath = filepath.slice(watchedDir.length + path.sep.length);
  log(subpath);
  log(path.join(outDir, subpath));

  return path.format({
    dir: path.dirname(path.join(outDir, subpath)),
    name: path.basename(filepath, '.json'),
    ext: '.yml',
  });
}

function jsonToYaml(filepath: string) {
  try {
    const data = fs.readFileSync(filepath, 'utf8');
    const jsonData = JSON.parse(data);
    const yamlData = yaml.dump(jsonData);
    const targetFilePath = pathToYamlFilePath(filepath);
    ensureOutDirExists();
    fs.writeFileSync(targetFilePath, yamlData, 'utf8');
    log('wrote', targetFilePath);
  } catch (error) {
    log('failed to read', filepath, '. Is it valid JSON?');
  }
}

function ensureOutDirExists() {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
}

function removeYamlFile(filepath: string) {
  const targetFilePath = pathToYamlFilePath(filepath);
  try {
    const exists = fs.existsSync(targetFilePath);
    if (exists) {
      fs.rmSync(targetFilePath);
      log('removed', targetFilePath);
    }
  } catch (error) {
    log('failed to remove', targetFilePath);
  }
}
