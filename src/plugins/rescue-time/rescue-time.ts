import { startFocustime, endFocustime } from './api';
import { Plugin } from '../../util/load-plugins';

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
    await startFocustime(config.apiKey, config.duration);
  },
  async stop(config: RescueTimeConfig, completed: boolean): Promise<void> {
    await endFocustime(config.apiKey);
  },
};

export default plugin;
