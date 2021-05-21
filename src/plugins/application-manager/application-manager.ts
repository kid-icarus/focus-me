import { Plugin } from '../../util/load-plugins';
import { execAppleScript } from '../../util/exec-script';

const plugin: Plugin = {
  async start(config: any): Promise<void> {
    try {
      await execAppleScript('application-manager', 'close-app.js', config.path);
    } catch (e) {
      console.error(e);
    }
  },

  async stop(config: any, completed: boolean): Promise<void> {
    if (!completed) return;
    try {
      await execAppleScript('application-manager', 'open-app.js', config.path);
    } catch (e) {
      console.error(e);
    }
  },
};

export default plugin;
