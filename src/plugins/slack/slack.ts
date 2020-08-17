import { exec } from 'child_process';
import { Plugin } from '../../util/load-plugins';
import { log, script } from '../../util/exec-script';

const plugin: Plugin = {
  async start(config: any) {
    switch (config.browser) {
      case 'chrome':
        exec(
          `osascript -l JavaScript ${script(
            'slack',
            'slack-dnd-on-chrome.js',
          )}`,
          log,
        );
        return;
      case 'safari':
        exec(
          `osascript -l JavaScript ${script('slack', 'slack-dnd-on.js')}`,
          log,
        );
        return;
      default:
        exec(
          `osascript -l JavaScript ${script('slack', 'slack-dnd-on.js')}`,
          log,
        );
        return;
    }
  },
  async stop(config: any, completed: boolean) {
    switch (config.browser) {
      case 'chrome':
        exec(
          `osascript -l JavaScript ${script(
            'slack',
            'slack-dnd-off-chrome.js',
          )}`,
          log,
        );
        return;
      case 'safari':
        exec(
          `osascript -l JavaScript ${script('slack', 'slack-dnd-off.js')}`,
          log,
        );
        return;
      default:
        exec(
          `osascript -l JavaScript ${script('slack', 'slack-dnd-off.js')}`,
          log,
        );
        return;
    }
  },
};

export default plugin;
