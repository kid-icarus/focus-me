#!/usr/bin/env node
const argv = require('./cli');
const stop = require('./timer-stop');
const start = require('./timer-start');
const rl = require('./util/readline');

const { debug } = argv;

process.on('SIGINT', async () => {
  try {
    await stop();
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
    await stop();
  } catch (e2) {
    console.error('Unexpected error stopping timer');
    console.error(e2);
  }

  return undefined;
})();
