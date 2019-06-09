const got = require('got');
const { webhookStop, watch } = require('./cli');
const rl = require('./util/readline');
const { apps, procRef } = require('./applescripts/current-app-master');
const execScript = require('./util/exec-script');

const stop = async () => {
  rl.close();
  if (watch) procRef.proc.kill();
  console.log('🛑');
  Object.entries(apps).forEach(([app, time]) => {
    if (!app) return;
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');
    console.log(`${app} - ${mins}:${secs}`);
  });
  ['alert', 'spotifyPause', 'say', 'openApps'].forEach(execScript);
  if (webhookStop) {
    try {
      await Promise.all(webhookStop.map(url => got(url, { timeout: 5000 })));
    } catch (e) {
      console.log('Error calling stop webhooks');
    }
  }
};

module.exports = stop;
