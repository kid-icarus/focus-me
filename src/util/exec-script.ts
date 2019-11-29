import { join } from 'path';
import { ExecException } from 'child_process';

export const script = (plugin: string, file: string) =>
  join(__dirname, '..', 'plugins', plugin, 'applescripts', file);

export const log = (error: ExecException | null): void => {
  if (error) console.error(error);
};
