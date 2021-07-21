import { join } from 'path';
import { exec, ExecException } from 'child_process';

export const script = (plugin: string, file: string) =>
  join(__dirname, '..', 'plugins', plugin, 'applescripts', file);

export const execAppleScript = (
  plugin: string,
  file: string,
  configPath: string,
): Promise<{ stdout: string; stderr: string }> =>
  new Promise((res, rej) => {
    exec(
      `osascript -l JavaScript ${script(plugin, file)}`,
      { env: { config: configPath } },
      (err, stdout, stderr) => {
        if (err) return rej(err);

        res({
          stderr,
          stdout,
        });
      },
    );
  });
