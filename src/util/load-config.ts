import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
const readFile = promisify(fs.readFile);

export interface TimerConfig {
  time: number;
  plugins?: Record<string, any>;
}

export const loadConfig = async (): Promise<TimerConfig> => {
  const defaultConfig: TimerConfig = {
    time: 25,
  };
  let config: TimerConfig;

  if (!process.env.HOME) {
    console.error(
      'No $HOME environment variable set, returning default config',
    );
    return defaultConfig;
  }

  try {
    config = JSON.parse(
      await readFile(path.join(process.env.HOME, '.timerrc.json'), 'utf8'),
    );
  } catch (e) {
    console.error('Error reading configuration, returning default config: ', e);
    return defaultConfig;
  }

  return config;
};
