const { exec } = require('child_process');
const { join } = require('path');

const log = (error) => { if (error) console.error(error); };
const script = file => join(__dirname, file);

const alert = () => exec('osascript -e \'display alert "Timer Finished!"\'', log);
const spotifyPause = () => exec(`osascript -l JavaScript ${script('pause-spotify.js')}`, log);
const spotifyStart = () => exec(`osascript -l JavaScript ${script('play-spotify.js')}`, log);
const say = words => exec(`say ${words}`, log);
const openApps = () => exec(`osascript -l JavaScript ${script('open-app.js')}`, log);
const closeApps = () => exec(`osascript -l JavaScript ${script('close-app.js')}`, log);

module.exports = {
  alert,
  spotifyPause,
  spotifyStart,
  say,
  openApps,
  closeApps,
};
