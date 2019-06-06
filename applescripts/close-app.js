const { exec } = require('child_process');

const closeApps = (apps = []) => {
  const appString = apps.reduce((acc, app) => acc.concat(`Application('${app}'),`), '');
  const command = `[${appString}].forEach(app => app.quit())`;
  return exec(`osascript -l JavaScript -e "${command}"`);
};

module.exports = closeApps;
