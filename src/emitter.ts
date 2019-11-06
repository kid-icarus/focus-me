import {EventEmitter} from 'events'
import Timeout = NodeJS.Timeout;

export interface Plugin {
  start: (config: any) => Promise<any>
  stop: (config: any, completed: boolean) => Promise<any>
}

export interface Plugins {
  name: string
  plugin: Plugin
}

class Timer extends EventEmitter {
  private plugins: Plugins[]
  private config: Record<string, any>
  private intervalId: Timeout
  private until: number

  constructor(config: Record<string, any>, plugins: Plugins[]) {
    super()
    this.config = config
    this.plugins = plugins
    this.until = config.time * 60
  }

  async start() {
    console.log(this.plugins)
    this.emit('starting')
    const promises = this.plugins.map(
        ({name, plugin}) => plugin.start(this.config[name]).catch(e => {
          console.error(`error starting ${plugin} plugin: ${e}`)
        })
    )
    try {
      await Promise.all(promises)
    } catch (e) {

    }
    this.emit('started')

    this.intervalId = setInterval(async () => {
      this.emit('tick', this.until);
      this.until -= 1;
      if (!this.until) {
        clearInterval(this.intervalId);
        await this.stop(true)
      }
    }, 1000)
  }

  async stop(completed: boolean) {
    const promises = this.plugins.map(
        ({name, plugin}) => plugin.stop(this.config[name], completed).catch(e => {
          console.error(`error stopping ${plugin} plugin: ${e}`)
        })
    )
    try {
      await Promise.all(promises)
    } catch (e) {

    }
    this.emit('stop')
  }

}

export { Timer }
