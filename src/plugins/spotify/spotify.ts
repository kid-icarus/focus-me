import { exec } from 'child_process';
import { Plugin } from '../../util/load-plugins';
import { script } from '../../util/exec-script';
import d from 'debug';
const debug = d('plugin:spotify');

const plugin: Plugin = {
  async start() {
    exec(
      `osascript -l JavaScript ${script('spotify', 'play-spotify.js')}`,
      debug,
    );
  },
  async stop() {
    exec(
      `osascript -l JavaScript ${script('spotify', 'pause-spotify.js')}`,
      debug,
    );
  },
};

export default plugin;
