import { Plugin } from '../../util/load-plugins';
import { clearStatus, setDndOff, setDndOn, setStatus } from './api';

const plugin: Plugin = {
  async start(config: any) {
    const result = await Promise.all([
      setDndOn(config.token, config.duration),
      setStatus(config.token, {
        // eslint-disable-next-line @typescript-eslint/camelcase
        status_text: config.statusText,
        // eslint-disable-next-line @typescript-eslint/camelcase
        status_emoji: config.statusEmoji,
      }),
    ]);
  },
  async stop(config: any, completed: boolean) {
    if (!completed) {
      const result = await Promise.all([
        setDndOff(config.token),
        clearStatus(config.token),
      ]);
    }
  },
};

export default plugin;
