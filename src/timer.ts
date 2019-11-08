#!/usr/bin/env node

import argv from './cli';
import stop from './timer-stop';
import start from './timer-start';
import rl from './util/readline';

const { debug } = argv;

process.on('SIGINT', async () => {
  try {
    await stop(false);
  } catch (e) {
    console.log('Unexpected error on sigint', e);
  }
  process.exit();
});

(async () => {
  if (debug) {
    rl.close();
    return console.log(argv);
  }

  try {
    await start();
  } catch (e) {
    console.error('Unexpected error starting timer');
    console.error(e);
  }

  try {
    await stop(true);
  } catch (e2) {
    console.error('Unexpected error stopping timer');
    console.error(e2);
  }

  return undefined;
})();
