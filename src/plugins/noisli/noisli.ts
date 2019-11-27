import {exec} from "child_process";
import {Plugin} from "../../emitter";
import {log, script} from '../../util/exec-script'

const plugin: Plugin = {
    async start(config: any) {
        exec(`osascript -l JavaScript ${script('noisli', 'noisli.js')}`, log)
    },
    async stop(config: any, completed: boolean) {
        exec(`osascript -l JavaScript ${script('noisli', 'noisli.js')}`, log);
    }
}

export default plugin