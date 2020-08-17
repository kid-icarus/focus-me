import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

import { Plugin } from '../../util/load-plugins';

const plugin: Plugin = {
  async start() {
    return undefined;
  },
  async stop() {
    return undefined;
  },
  async tick(config: any, until: number) {
    const mins = Math.floor(until / 60)
      .toString()
      .padStart(2, '0');
    const secs = (until % 60).toString().padStart(2, '0');
    const timeRemaining = `${mins}:${secs}`;
    rl.write('', { ctrl: true, name: 'u' });
    rl.write(timeRemaining);
  },
};

export default plugin;
