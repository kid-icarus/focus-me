import {ChildProcess, exec} from "child_process";
import {Plugin} from "../../emitter";
import * as path from "path";

let proc: ChildProcess;
const play = async (config: any): Promise<void> => {
    const volume = config.volume || ".4";
    const p: Promise<void> = new Promise((res, rej) => {
        proc = exec(`afplay -v ${volume} ${path.join(__dirname, '..', '..', '..', 'assets', 'rain.mp3')}`, () => {
            // swallow errors, we don't really care if this plays and we also kill the process at the end.
            res()
        })
    })
}

const plugin: Plugin = {
    async start(config: any): Promise<void> {
        return play(config);
    },

    async stop(config: any, completed: boolean): Promise<void> {
        if (proc) proc.kill()
    }
}

export default plugin
