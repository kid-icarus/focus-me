import {ChildProcess, exec, ExecException} from 'child_process';
import {promisify} from 'util'
import {script} from "../../../util/exec-script";

const closeApps = async (apps: string[]): Promise<void> => {
  const appString = apps.reduce((acc, app) => acc.concat(`Application('${app}'),`), '');
  const command = `[${appString}].forEach(app => app.quit())`;
  const p = new Promise<void>((res, rej) => {
    const proc = exec(`osascript -l JavaScript -e "${command}"`, (err) => {
      if (err) return rej(err)
      res()
    })
  })

  return p.catch((err) => console.log(err))
};

export default closeApps;
