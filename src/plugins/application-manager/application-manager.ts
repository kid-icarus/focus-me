import {exec} from "child_process";
import {Plugin} from "../../emitter";
import {script} from '../../util/exec-script'
import closeApps from "./applescripts/close-app";

const plugin: Plugin = {
    async start(config: any): Promise<void> {
        if (!config.enabled) return;

        const p = new Promise<void>((res, rej) => {
            const proc = exec(`osascript -l JavaScript ${script('application-manager', 'open-app')}`, (err) => {
                if (err) return rej(err)
                res()
            })
        })

        return p.catch((err) => console.log(err))
    },
    async stop(config: any, completed: boolean): Promise<void> {
        if (!config.enabled) return;
        return closeApps(config.apps)
    }
}

export default plugin
