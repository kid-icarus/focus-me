import { ChildProcess, spawn } from 'child_process';
import { join } from 'path';

interface Iproc {
  proc: ChildProcess | undefined;
}

const procRef: Iproc = {
  proc: undefined,
};

const apps: Record<string, number> = {};

const watchApps = (): ChildProcess => {
  const script = join(__dirname, 'applescripts', 'current-app.js');
  const proc = spawn('osascript', ['-l', 'JavaScript', script], {});
  procRef.proc = proc;

  // This process lives on for the duration of the timer, and every second logs the currently focused application,
  // which is added to the accumulator here
  proc.stderr.on('data', data => {
    const app = data.toString().trim();
    apps[app] = apps[app] ? apps[app] + 1 : 1;
  });

  return proc;
};

export { watchApps, apps, procRef };
