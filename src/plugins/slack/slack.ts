import { Plugin } from '../../util/load-plugins';
import { clearStatus, setDndOff, setDndOn, setStatus } from './api';
import d from 'debug';
const debug = d('plugin:slack');

const plugin: Plugin = {
  async start(config: any) {
    try {
      await Promise.all([
        setDndOn(config.token, config.duration),
        setStatus(config.token, {
          // eslint-disable-next-line @typescript-eslint/camelcase
          status_text: config.statusText,
          // eslint-disable-next-line @typescript-eslint/camelcase
          status_emoji: config.statusEmoji,
        }),
      ]);
    } catch (e) {
      debug(e);
    }
  },
  async stop(config: any, completed: boolean) {
    await Promise.all([setDndOff(config.token), clearStatus(config.token)]);
  },
};

export default plugin;
