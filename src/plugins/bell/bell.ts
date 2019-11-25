import {exec} from "child_process";
import {Plugin} from "../../emitter";
import * as path from "path";

const playBell = async (config: any, mustComplete: boolean): Promise<void> => {
    const volume = config.volume || ".4";
    const p: Promise<void> = new Promise((res, rej) => {
        exec(`afplay -v ${volume} ${path.join(__dirname, '..', '..', '..', 'assets', 'bell.wav')}`, (err) => {
            if (err) {
                console.log(err)
            }
            res()
        })
    })
    return mustComplete ? p : undefined;
}

const plugin: Plugin = {
    async start(config: any): Promise<void> {
        return playBell(config, false);
    },

    async stop(config: any, completed: boolean): Promise<void> {
        if (!completed) return;

        return playBell(config, true);
    }
}

export default plugin
