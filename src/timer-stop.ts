import * as got from 'got';
import cli from './cli';
import rl from './util/readline';
import { apps, procRef } from './applescripts/current-app-master';
import execScript from './util/exec-script';
import { slackStop } from './applescripts';

const stop = async () => {
  rl.close();
  if (cli.watch) procRef.proc.kill();
  console.log('🛑');

  Object.entries(apps).forEach(([app, time]) => {
    if (!app) return;
    const mins = Math.floor(time / 60).toString().padStart(2, '0');
    const secs = (time % 60).toString().padStart(2, '0');
    console.log(`${app} - ${mins}:${secs}`);
  });

  ['alert', 'spotifyPause', 'say', 'openApps', 'noisli'].forEach(execScript);

  if (cli.slack) slackStop()

  if (cli['webhook-stop']) {
    try {
      await Promise.all(cli['webhook-stop'].map((url) => got(url, { timeout: 5000 })));
    } catch (e) {
      console.log('Error calling stop webhooks');
    }
  }
};

export default stop;
