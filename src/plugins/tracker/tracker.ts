import {Plugin} from "../../emitter";
import * as path from 'path';
import * as f from 'fs'
import {procRef, watchApps, apps} from "./current-app-master";
const fs = f.promises;

const plugin: Plugin = {
  async start(config: any): Promise<void> {
    watchApps();
  },
  async stop(config: any, completed: boolean): Promise<void> {
    procRef.proc.kill();
    if (!completed) return;

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
        return timestamp.getHours() < date.getHours() || (
          timestamp.getHours() === date.getHours() && timestamp.getMinutes() <= date.getMinutes()
        )
      }).length
      console.log(`You completed ${timesByNow} by this time yesterday!`)
    }
  }
}

export default plugin

