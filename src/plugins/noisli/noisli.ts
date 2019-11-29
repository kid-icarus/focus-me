import { exec } from 'child_process';
import { Plugin } from '../../util/load-plugins';
import { log, script } from '../../util/exec-script';

const plugin: Plugin = {
  async start(): Promise<void> {
    exec(`osascript -l JavaScript ${script('noisli', 'noisli.js')}`, log);
  },
  async stop() {
    exec(`osascript -l JavaScript ${script('noisli', 'noisli.js')}`, log);
  },
};

export default plugin;
