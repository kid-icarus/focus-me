import { exec } from 'child_process';
import { Plugin } from '../../util/load-plugins';
import { log, script } from '../../util/exec-script';

const plugin: Plugin = {
  async start() {
    exec(
      `osascript -l JavaScript ${script('spotify', 'play-spotify.js')}`,
      log,
    );
  },
  async stop() {
    exec(
      `osascript -l JavaScript ${script('spotify', 'pause-spotify.js')}`,
      log,
    );
  },
};

export default plugin;
