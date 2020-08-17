import got from 'got';
import { Plugin } from '../../util/load-plugins';

interface GotParams {
  url: string;
  options: any;
}

interface WebhooksConfig {
  enabled: string;
  startHooks: GotParams[];
  stopHooks: GotParams[];
}

const plugin: Plugin = {
  async start(config: WebhooksConfig): Promise<void> {
    await Promise.all(
      config.startHooks.map(({ url, options }) => {
        return got(url, options);
      }),
    );
  },
  async stop(config: WebhooksConfig, completed: boolean): Promise<void> {
    await Promise.all(
      config.stopHooks.map(({ url, options }) => got(url, options)),
    );
  },
};
