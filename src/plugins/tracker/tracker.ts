import { Plugin } from '../../util/load-plugins';
import { procRef, watchApps } from './current-app-master';

import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';
import { Session } from './entity/Session';

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

let session: Session;

const plugin: Plugin = {
  async start(): Promise<void> {
    session = new Session();
    session.startTime = Date.now();
    session.completed = false;
    watchApps();
  },
  async stop(config: any, completed: boolean): Promise<void> {
    let connection: Connection;
    try {
      connection = await createConnection({
        type: 'sqlite',
        database: 'focus',
        entities: [Session],
        synchronize: true,
        logging: false,
      });
    } catch (e) {
      console.log('Error connecting to DB: ', e);
      return;
    }

    session.endTime = Date.now();
    session.completed = completed;
    try {
      await connection.manager.save(session);
    } catch (e) {
      console.log('Error saving session: ', e);
    }
    if (procRef.proc) {
      procRef.proc.kill();
    }
  },
};

export default plugin;
