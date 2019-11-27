import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

import {Plugin} from "../../emitter";

const plugin: Plugin = {
    async start(config: any) {
    },
    async stop(config: any, completed: boolean) {
    },
    async tick(config: any, until: number) {
        const mins = Math.floor(until / 60).toString().padStart(2, '0');
        const secs = (until % 60).toString().padStart(2, '0');
        const timeRemaining = `${mins}:${secs}`;
        rl.write(null, { ctrl: true, name: 'u' });
        rl.write(timeRemaining);
    }
}

export default plugin
