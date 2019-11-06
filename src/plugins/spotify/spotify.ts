import {exec} from "child_process";
import {Plugin} from "../../emitter";
import {log, script} from '../../util/exec-script'

const plugin: Plugin = {
    async start(config: any) {
        if (!config.enabled) return;
        exec(`osascript -l JavaScript ${script('spotify', 'play-spotify.js')}`, log)
    },
    async stop(config: any, completed: boolean) {
        if (!config.enabled) return;
        exec(`osascript -l JavaScript ${script('spotify', 'pause-spotify.js')}`, log);
    }
}

export default plugin
