#!/usr/bin/env node

import { Command } from '@commander-js/extra-typings';
import { createBuildCommand } from './build/build.command.js';
import { createInitCommand } from './init/init.command.js';
import { createSchemasCommand } from './schemas/schemas.command.js';
import { createValidateRefCommand } from './validate-refs/validate-refs.command.js';

const program = new Command();

program
  .name('@dungeonmans-mod-tools/cli')
  .description('CLI to help you develop mod content for Dungeonmans.')
  .version('0.2.1');
program.addCommand(createInitCommand());
program.addCommand(createBuildCommand());
program.addCommand(createSchemasCommand());
program.addCommand(createValidateRefCommand());

program.parse();
