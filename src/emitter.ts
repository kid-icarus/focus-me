import {EventEmitter} from 'events'
import Timeout = NodeJS.Timeout;

export interface Plugin {
  start: (config: any) => Promise<any>
  stop: (config: any, completed: boolean) => Promise<any>
  tick?: (config: any, until: number) => Promise<any>
}

export interface Plugins {
  name: string
  plugin: Plugin
  config: any
}

class Timer extends EventEmitter {
  private plugins: Plugins[]
  private tickPlugins: Plugins[]
  private config: Record<string, any>
  private intervalId: Timeout
  private until: number

  constructor(config: Record<string, any>, plugins: Plugins[]) {
    super()
    this.config = config
    this.plugins = plugins.filter(({config}) => config.enabled)
    this.tickPlugins = plugins.filter(({plugin}) => plugin.tick)
    this.until = config.time * 60
  }

  async start() {
    console.log(this.plugins)
    this.emit('starting')
    const promises = this.plugins.map(
        ({name, plugin, config}) => plugin.start(config).catch(e => {
          console.error(`error starting ${plugin} plugin: ${e}`)
        })
    )
    try {
      await Promise.all(promises)
    } catch (e) {

    }
    this.emit('started')

    this.intervalId = setInterval(async () => {
      this.until -= 1;
      const until = this.until;
      this.emit('tick', until);
      try {
        await Promise.all(this.tickPlugins.map(({plugin, config}) => plugin.tick(config, until)));
      } catch (e) {
        console.error('error ticking plugin')
      }

      if (!this.until) {
        clearInterval(this.intervalId);

        await this.stop(true)
      }
    }, 1000)
  }

  async stop(completed: boolean) {
    this.emit('stopping')
    const promises = this.plugins.map(
        ({name, plugin, config}) => plugin.stop(config, completed).catch(e => {
          console.error(`error stopping ${plugin} plugin: ${e}`)
        })
    )
    try {
      await Promise.all(promises)
    } catch (e) {

    }
    this.emit('stopped')
  }

}

export { Timer }
