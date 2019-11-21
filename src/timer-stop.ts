import * as got from 'got';
import cli from './cli';
import rl from './util/readline';
import { apps, procRef } from './applescripts/current-app-master';
import execScript from './util/exec-script';
import { slackStop } from './applescripts';
import {promises as fs} from "fs";
import * as path from 'path';

const stop = async (completed: boolean) => {
  rl.close();
  if (cli.watch) procRef.proc.kill();
  console.log('🛑');

  const procTimes = Object.keys(apps).reduce((acc: Record<string, string>, proc) => {
    if (!proc) return acc;
    const totalSeconds = apps[proc]
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    const duration = `${mins}:${secs}`
    console.log(`${proc} - ${duration}`);
    acc[proc] = duration
    return acc
  }, {});

  ['alert', 'spotifyPause', 'say', 'noisli'].forEach(execScript);

  if (completed) {
    execScript('openApps');
  }

  if (cli.slack) slackStop()

  if (cli['webhook-stop']) {
    try {
      await Promise.all(cli['webhook-stop'].map((url) => got(url, { timeout: 5000 })));
    } catch (e) {
      console.log('Error calling stop webhooks');
    }
  }

  if (completed) {
    const date = new Date();
    const fileName = path.join(process.env.HOME, '.timerdb', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`)
    let db
    try {
      let file = await fs.readFile(fileName, 'utf8');
      db = JSON.parse(file);
    } catch (e) {
      // Just swallow, we'll create a new file
    }

    const yesterdayFile = path.join(process.env.HOME, '.timerdb', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}.json`)
    let yesterdayDb
    try {
      let file = await fs.readFile(yesterdayFile, 'utf8');
      yesterdayDb = JSON.parse(file);
    } catch (e) {
      // Just swallow, we'll create a new file
    }

    let entries = db || [];
    entries.push({
      [Date.now()]: procTimes
    });

    try {
      await fs.writeFile(fileName, JSON.stringify(entries))
    } catch (e) {
      console.error('could not write!')
    }

    console.log(`You have completed ${entries.length} focus sessions!`);
    if (yesterdayDb) {
      const timesByNow = yesterdayDb.filter((time: any) => {
        const date = new Date()
        const timestamp = new Date(parseInt(Object.keys(time)[0], 10))
        return timestamp.getHours() <= date.getHours() && timestamp.getMinutes() <= date.getMinutes()
      }).length
      console.log(`You completed ${timesByNow} by this time yesterday!`)
    }
  }
};

export default stop;
