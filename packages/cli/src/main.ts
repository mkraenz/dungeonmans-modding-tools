#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import { createBuildCommand } from './build/build.command.js';
import { createInitCommand } from './init/init.command.js';

const program = new Command();

program
  .name('dungeonmans-mod-tools')
  .description('CLI to help you build and develop mod content for Dungeonmans.')
  .version('0.0.1');
program.addCommand(createInitCommand());
program.addCommand(createBuildCommand());

program.parse();
