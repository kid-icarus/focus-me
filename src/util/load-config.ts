import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import * as os from 'os';
const readFile = promisify(fs.readFile);

export interface TimerConfig {
  path?: string;
  time: number;
  plugins?: Record<string, any>;
}

const defaultConfig: Partial<Record<NodeJS.Platform, string>> = {
  darwin: path.join(
    os.homedir(),
    'Library/Application Support/FocusMe/preferences.json',
  ),
};

const platform = os.platform();
const defaultConfigPath = defaultConfig[platform];
if (!defaultConfigPath) {
  const keys = Object.keys(defaultConfig).join(', ');
  throw new Error(
    `unsupported platform, currently supported platforms: ${keys}`,
  );
}

export const loadConfig = async (
  configPath: string = defaultConfigPath,
): Promise<TimerConfig> => {
  const defaultConfig: TimerConfig = {
    time: 25,
  };
  let config: TimerConfig;

  try {
    config = JSON.parse(await readFile(configPath, 'utf8'));
  } catch (e) {
    console.error('Error reading configuration, returning default config: ', e);
    return defaultConfig;
  }

  return config;
};
