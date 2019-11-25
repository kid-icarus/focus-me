import {exec} from "child_process";
import {Plugin} from "../../emitter";
import {script} from '../../util/exec-script'
import closeApps from "./applescripts/close-app";

const plugin: Plugin = {
    async start(config: any): Promise<void> {
        return closeApps(config.apps)
    },

    async stop(config: any, completed: boolean): Promise<void> {
        if (!completed) return;
        const p = new Promise<void>((res, rej) => {
            const proc = exec(`osascript -l JavaScript ${script('application-manager', 'open-app.js')}`, (err) => {
                if (err) return rej(err)
                res()
            })
        })
        return p.catch((err) => console.log(err))
    }
}

export default plugin
