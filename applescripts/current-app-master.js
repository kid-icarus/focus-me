const { spawn } = require('child_process');
const { join } = require('path');

const apps = {};
const procRef = {};

const watchApps = () => {
  const script = join(__dirname, 'current-app.js');
  const proc = spawn('osascript', ['-l', 'JavaScript', script]);
  procRef.proc = proc;

  proc.stderr.on('data', (data) => {
    const app = data.toString().trim();
    apps[app] = apps[app] ? apps[app] + 1 : 1;
  });

  return proc;
};

module.exports = {
  watchApps,
  apps,
  procRef,
};
