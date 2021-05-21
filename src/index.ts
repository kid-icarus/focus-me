#!/usr/bin/env node
import { Timer } from './timer';
import { loadPlugins } from './util/load-plugins';
import { loadConfig } from './util/load-config';
import yargs from 'yargs';

const argv = yargs(process.argv.slice(2))
  .options({
    config: {
      type: 'string',
      description: 'An alternate path to a config file',
    },
  })
  .help().argv;

const init = async (): Promise<void> => {
  const config = await loadConfig(argv.config);
  config.path = argv.config;
  const plugins = loadPlugins(config);
  const timer = new Timer(config, plugins);

  process.on('SIGINT', () => {
    timer.stop(false);
  });
  timer.on('stopped', () => {
    process.exit();
  });

  await timer.start();
};

(async (): Promise<void> => await init())();
