import * as got from 'got';
import {clearLine, cursorTo} from 'readline';
import cli from './cli';
import execScript from './util/exec-script';
import { watchApps } from './applescripts/current-app-master';
import { close, slackStart } from './applescripts';
import rl from './util/readline';
import {exec} from "child_process";
import * as path from "path";

const start = async () => {
  let until = cli.time * 60;
  ['spotifyStart', 'noisli'].forEach(execScript);

  if (cli.slack) slackStart();
  if (cli['webhook-start']) {
    try {
      await Promise.all(cli['webhook-start'].map(url => got(url, { timeout: 5000 })));
    } catch (e) {
      console.log('Error calling start webhooks');
      throw e;
    }
  }

  if (cli.watch) watchApps();
  if (cli['close-apps']) close(cli['close-apps']);
  if (cli.bell) exec(`afplay -v .4 ${path.join(__dirname, '..', 'assets', 'bell.wav')}`);

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
      clearLine(process.stdout, 0);
      cursorTo(process.stdout, 0);
      rl.write(timeRemaining);
      return undefined;
    }, 1000);
  });
};

export default start;
