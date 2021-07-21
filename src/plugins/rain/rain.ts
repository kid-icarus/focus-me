import { ChildProcess, exec } from 'child_process';
import { Plugin } from '../../util/load-plugins';
import * as path from 'path';
import d from 'debug';
const debug = d('plugin:rain');

let proc: ChildProcess;

export interface PlayConfig {
  enabled: true;
  volume?: string;
}

const play = async (config: PlayConfig): Promise<void> => {
  const volume = config.volume || '.4';
  const p: Promise<void> = new Promise((res, rej) => {
    proc = exec(
      `afplay -v ${volume} ${path.join(
        __dirname,
        '..',
        '..',
        '..',
        'assets',
        'rain.mp3',
      )}`,
      err => {
        // swallow errors, we don't really care if this plays and we also kill the process at the end.
        debug(err);
        res();
      },
    );
  });
};

const plugin: Plugin = {
  async start(config: PlayConfig): Promise<void> {
    return play(config);
  },

  async stop(): Promise<void> {
    if (proc) proc.kill();
  },
};

export default plugin;
