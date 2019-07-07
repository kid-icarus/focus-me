import {ChildProcess, exec} from 'child_process';

const closeApps = (apps: string[]): ChildProcess => {
  const appString = apps.reduce((acc, app) => acc.concat(`Application('${app}'),`), '');
  const command = `[${appString}].forEach(app => app.quit())`;
  return exec(`osascript -l JavaScript -e "${command}"`);
};

export default closeApps;
