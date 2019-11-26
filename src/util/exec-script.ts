import {join} from "path";

export const script = (plugin: string, file: string) => join(__dirname, '..', 'plugins', plugin, 'applescripts', file);
export const log = (error: Error) => { if (error) console.error(error); };
