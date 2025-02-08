import { styleText } from 'node:util';

export const Logger = {
  log: (...params: unknown[]) => {
    console.log(...params);
  },
  success: (msg: string) => {
    console.log(styleText('green', msg));
  },
  warn: (msg: string) => {
    console.log(styleText('yellow', msg));
  },
  error: (msg: string) => {
    console.log(styleText('red', msg));
  },
  warnDryRun: () => {
    Logger.warn(
      '👷 This was a dry run. No changes have actually been made to your system. To actually apply these changes, run the command without the --dry-run flag.'
    );
  },
};
