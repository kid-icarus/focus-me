import { startFocustime, endFocustime } from './api';
import { Plugin } from '../../util/load-plugins';
import d from 'debug';
const debug = d('plugin:rescue-time');

interface GotParams {
  url: string;
  options: any;
}

interface RescueTimeConfig {
  enabled: string;
  duration: number;
  apiKey: string;
}

const plugin: Plugin = {
  async start(config: RescueTimeConfig): Promise<void> {
    try {
      await startFocustime(config.apiKey, config.duration);
    } catch (e) {
      debug(e);
    }
  },
  async stop(config: RescueTimeConfig, completed: boolean): Promise<void> {
    if (!completed) {
      try {
        await endFocustime(config.apiKey);
      } catch (e) {
        debug(e);
      }
    }
  },
};

export default plugin;
