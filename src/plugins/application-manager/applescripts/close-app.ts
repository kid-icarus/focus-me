import { exec } from 'child_process';

const closeApps = async (apps: string[]): Promise<void> => {
  const appString = apps.reduce(
    (acc, app) => acc.concat(`Application('${app}'),`),
    '',
  );
  const command = `[${appString}].forEach(app => app.quit())`;
  const p = new Promise<void>((res, rej) => {
    exec(`osascript -l JavaScript -e "${command}"`, err => {
      if (err) return rej(err);
      res();
    });
  });

  return p.catch(err => console.log(err));
};

export default closeApps;
