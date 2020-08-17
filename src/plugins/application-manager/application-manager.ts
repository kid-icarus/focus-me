import { Plugin } from '../../util/load-plugins';
import { exec } from 'child_process';
import { script } from '../../util/exec-script';

const plugin: Plugin = {
  async start(): Promise<void> {
    return new Promise<void>((res, rej) => {
      exec(
        `osascript -l JavaScript ${script(
          'application-manager',
          'close-app.js',
        )}`,
        (err, stdout, stderr) => {
          console.log(stderr);
          console.log(stdout);
          if (err) return rej(err);
          res();
        },
      );
    });
  },

  async stop(config: any, completed: boolean): Promise<void> {
    if (!completed) return;
    const p = new Promise<void>((res, rej) => {
      exec(
        `osascript -l JavaScript ${script(
          'application-manager',
          'open-app.js',
        )}`,
        err => {
          if (err) return rej(err);
          res();
        },
      );
    });
    return p.catch(err => console.log(err));
  },
};

export default plugin;
