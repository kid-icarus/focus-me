#!/usr/bin/env node
import { Timer } from './timer';
import { loadPlugins } from './util/load-plugins';
import { loadConfig } from './util/load-config';

const init = async (): Promise<void> => {
  const config = await loadConfig();
  const plugins = loadPlugins(config);
  const timer = new Timer(config, plugins);

  process.on('SIGINT', () => {
    timer.stop(false);
  });
  timer.on('stopped', () => {
    process.exit();
  });

  timer.start();
};

init();
