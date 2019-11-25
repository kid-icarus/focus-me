import * as got from 'got';
import {Plugin} from "../../emitter";

const plugin: Plugin = {
    async start(config: any): Promise<void> {
        await Promise.all(config.startHooks.map((url: string) => got(url, { timeout: 5000 })));
    },
    async stop(config: any, completed: boolean): Promise<void> {
        await Promise.all(config.stopHooks.map((url: string) => got(url, { timeout: 5000 })));
    }
}
