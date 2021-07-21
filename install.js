const fs = require('fs')
const {join} = require('path')
const APP_NAME = 'FocusMe'

const scriptLibrariesDir = join(process.env.HOME, 'Library', 'Script Libraries');
const applicationSupportDir = join(process.env.HOME, 'Library', 'Application Support', APP_NAME);
const configFile = join(process.env.HOME, 'Library', 'Application Support', APP_NAME, 'preferences.json');
const focusMeDir = join(scriptLibrariesDir, APP_NAME);

/**
 * Initial post-install script to install default applescripts and configuration.
 */
const install = () => {
  if (!fs.existsSync(scriptLibrariesDir)) {
    console.log('Applescript script libraries directory does not exist, creating it.')
    fs.mkdirSync(scriptLibrariesDir)
  }

  if (!fs.existsSync(applicationSupportDir)) {
    console.log('FocusMe application support directory does not exist, creating it.')
    fs.mkdirSync(applicationSupportDir)
  }

  if (!fs.existsSync(configFile)) {
    console.log('FocusMe config does not exist, creating it.')
    fs.copyFile(join(__dirname, 'default-preferences.json'), configFile, (err) => {
      if (err) {
        console.error('Error saving default config: ', e)
      }
    })
  }

  if (!fs.existsSync(focusMeDir)) {
    fs.unlinkSync(focusMeDir)
    console.log('Symlinking compiled applescript libraries.')
    fs.symlinkSync(join(__dirname, 'dist/util/focus-me-applescripts'), focusMeDir);
  }
}

install();
