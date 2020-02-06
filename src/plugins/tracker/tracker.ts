import { Plugin } from '../../util/load-plugins';
import { procRef, watchApps, apps } from './current-app-master';
import { readDb, writeDb } from './db';
import { compareTimesFromYesterday } from './compare-times-from-yesterday';

export type TrackerDb = Record<string, Record<string, string>>[];

const formatApplicationFocusDuration = (
  acc: Record<string, string>,
  proc: [string, number],
) => {
  const [applicationName, secondsFocused] = proc;
  // Sometimes the OS reports an empty string as the process name.
  if (!applicationName) return acc;

  const mins = Math.floor(secondsFocused / 60)
    .toString()
    .padStart(2, '0');
  const secs = (secondsFocused % 60).toString().padStart(2, '0');
  const duration = `${mins}:${secs}`;
  console.log(`${applicationName} - ${duration}`);
  acc[applicationName] = duration;
  return acc;
};

const plugin: Plugin = {
  async start(): Promise<void> {
    watchApps();
  },
  async stop(config: any, completed: boolean): Promise<void> {
    if (procRef.proc) {
      procRef.proc.kill();
    }
    if (!completed) return;

    const focusedApplications = Object.entries(apps).reduce(
      formatApplicationFocusDuration,
      {},
    );

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    let todayDb, yesterdayDb;
    try {
      todayDb = await readDb(today);
      yesterdayDb = await readDb(yesterday);
    } catch (e) {
      // Just swallow if not found, we'll overwrite.
    }

    const entries = todayDb || [];
    entries.push({
      [Date.now()]: focusedApplications,
    });
    await writeDb(today, entries);

    console.log(`You have completed ${entries.length} focus sessions!`);

    if (yesterdayDb) {
      console.log(
        `You completed ${compareTimesFromYesterday(
          yesterdayDb,
        )} by now yesterday.`,
      );
    }
  },
};

export default plugin;
