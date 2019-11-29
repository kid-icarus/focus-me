import { EventEmitter } from 'events';
import { setInterval, clearInterval } from 'timers';
import { PluginWrapper } from './util/load-plugins';

class Timer extends EventEmitter {
  private plugins: PluginWrapper[];
  private config: Record<string, any>;
  private intervalId: NodeJS.Timeout | undefined;
  private until: number;

  constructor(config: Record<string, any>, plugins: PluginWrapper[]) {
    super();
    this.config = config;
    this.plugins = plugins.filter(({ config }) => config.enabled);
    this.until = config.time * 60;
  }

  async start(): Promise<void> {
    this.emit('starting');
    const promises = this.plugins.map(({ name, plugin, config }) =>
      plugin.start(config).catch(e => {
        console.error(`error starting ${name} plugin: ${e}`);
      }),
    );
    try {
      await Promise.all(promises);
    } catch (e) {}
    this.emit('started');

    this.intervalId = setInterval(async () => {
      this.until -= 1;
      const until = this.until;
      this.emit('tick', until);
      try {
        await Promise.all(
          this.plugins.map(({ plugin, config }) => {
            if (!plugin.tick) return;

            return plugin.tick(config, until);
          }),
        );
      } catch (e) {
        console.error('error ticking plugin');
      }

      if (!this.until && this.intervalId) {
        clearInterval(this.intervalId);

        await this.stop(true);
      }
    }, 1000);
  }

  async stop(completed: boolean): Promise<void> {
    this.emit('stopping');
    const promises = this.plugins.map(({ name, plugin, config }) =>
      plugin.stop(config, completed).catch(e => {
        console.error(`error stopping ${name} plugin: ${e}`);
      }),
    );
    try {
      await Promise.all(promises);
    } catch (e) {}
    this.emit('stopped');
  }
}

export { Timer };
