import { EventEmitter } from 'events';
import { setInterval, clearInterval } from 'timers';
import { PluginWrapper } from './util/load-plugins';
import d from 'debug';
const debug = d('timer');

type TimerState = 'STARTED' | 'STOPPED';

export declare interface Timer {
  on(event: 'starting', listener: (until: number) => void): this;
  on(event: 'started', listener: (until: number) => void): this;
  on(event: 'tick', listener: (until: number) => void): this;
  on(event: 'stopping', listener: () => void): this;
  on(event: 'stopped', listener: () => void): this;
}

export class Timer extends EventEmitter {
  private plugins: PluginWrapper[];
  private config: Record<string, any>;
  private intervalId: NodeJS.Timeout | undefined;
  private until: number;
  private state: TimerState;

  constructor(config: Record<string, any>, plugins: PluginWrapper[]) {
    super();
    this.config = config;
    this.plugins = plugins.filter(({ config }) => config.enabled);
    this.until = config.time * 60;
    this.state = 'STOPPED';
  }

  getState(): TimerState {
    return this.state;
  }

  getUntil(): number {
    return this.until;
  }

  async start(): Promise<void> {
    debug('starting timer');
    this.emit('starting', this.until);
    const promises = this.plugins.map(({ name, plugin, config }) => {
      debug(`starting plugin: ${name}`);
      return plugin.start(config).catch(e => {
        debug(`error starting ${name} plugin: ${e}`);
      });
    });
    try {
      await Promise.all(promises);
    } catch (e) {
      debug('error starting timer', e);
    }
    this.emit('started', this.until);
    this.state = 'STARTED';
    debug('started');

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
        debug('error ticking plugin', e);
      }

      if (!this.until && this.intervalId) {
        clearInterval(this.intervalId);

        try {
          await this.stop(true);
        } catch (e) {
          debug('error stopping', e);
        }
      }
    }, 1000);
  }

  async stop(completed: boolean): Promise<void> {
    this.emit('stopping');
    debug('stopping timer');
    const promises = this.plugins.map(({ name, plugin, config }) => {
      debug(`stopping plugin: ${name}`);
      return plugin.stop(config, completed).catch(() => {
        debug(`error stopping ${name} plugin`);
      });
    });
    try {
      await Promise.all(promises);
    } catch (e) {
      debug('error stopping timer', e);
    }
    if (this.intervalId) clearInterval(this.intervalId);
    this.emit('stopped');
    this.state = 'STOPPED';
  }
}
