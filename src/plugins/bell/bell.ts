import {exec} from "child_process";
import {Plugin} from "../../emitter";
import {log, script} from '../../util/exec-script'

const plugin: Plugin = {
    async start(config: any): Promise<void> {
        if (!config.enabled) return;
        const p: Promise<void> = new Promise((res, rej) => {
            exec(`osascript -l JavaScript ${script('spotify', 'play-spotify.js')}`, (err) => {
                if (err) {
                    console.log(err)
                }
                res()
            })
        })
        return p;
    },

    async stop(config: any, completed: boolean): Promise<void> {
        if (!config.enabled) return;
        const p: Promise<void> = new Promise((res, rej) => {
            exec(`osascript -l JavaScript ${script('spotify', 'pause-spotify.js')}`, (err) => {
                if (err) {
                    console.log(err)
                }
                res()
            })
        })
        return p;
    }
}

export default plugin
