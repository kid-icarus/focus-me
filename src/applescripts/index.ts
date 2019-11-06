import { exec } from 'child_process';
import { join } from 'path';
import close from './close-app';

const log = (error: Error) => { if (error) console.error(error); };
const script = (file: string) => join(__dirname, file);

const alert = () => exec('osascript -e \'display alert "Timer Finished!"\'', log);
const spotifyPause = () => exec(`osascript -l JavaScript ${script('pause-spotify.js')}`, log);
const spotifyStart = () => exec(`osascript -l JavaScript ${script('play-spotify.js')}`, log);
const noisli = () => exec(`osascript -l JavaScript ${script('noisli.js')}`, log);
const slackStart = () => exec(`osascript -l JavaScript ${script('slack-dnd-on.js')}`, log);
const slackStop = () => exec(`osascript -l JavaScript ${script('slack-dnd-off.js')}`, log);
const say = (words: string) => exec(`say ${words}`, log);
const openApps = () => exec(`osascript -l JavaScript ${script('open-app.js')}`, log);

type Scripts = 'alert' | 'spotifyPause' | 'spotifyStart' | 'say' | 'openApps' | 'close';

export {
  alert,
  spotifyPause,
  spotifyStart,
  say,
  openApps,
  close,
  noisli,
  slackStart,
  slackStop,
  Scripts
};
