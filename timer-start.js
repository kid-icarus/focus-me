const got = require('got');
const readline = require('readline');
const execScript = require('./util/exec-script');
const argv = require('./cli');
const { watchApps } = require('./applescripts/current-app-master');
const { close } = require('./applescripts');
const rl = require('./util/readline');

const {
  time, webhookStart, watch, closeApps,
} = argv;

const start = async () => {
  let until = time * 60;
  ['spotifyStart'].forEach(execScript);

  if (webhookStart) {
    try {
      await Promise.all(webhookStart.map(url => got(url, { timeout: 5000 })));
    } catch (e) {
      console.log('Error calling start webhooks');
      throw e;
    }
  }

  if (watch) watchApps();
  if (closeApps) close(closeApps);

  return new Promise((res) => {
    const interval = setInterval(() => {
      until -= 1;
      if (!until) {
        clearInterval(interval);
        return res();
      }
      const mins = Math.floor(until / 60).toString().padStart(2, '0');
      const secs = (until % 60).toString().padStart(2, '0');
      const timeRemaining = `${mins}:${secs}`;
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      rl.write(timeRemaining);
      return undefined;
    }, 1000);
  });
};

module.exports = start;
