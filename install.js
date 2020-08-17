const fs = require('fs')
const {join} = require('path')

const scriptLibrariesDir = join(process.env.HOME, 'Library', 'Script Libraries');
const focusMeDir = join(scriptLibrariesDir, 'focus-me-applescripts');

const createSymlink = () => {
  if (!fs.existsSync(scriptLibrariesDir)) {
    console.log('Applescript script libraries directory does not exist, creating it.')
    fs.mkdirSync(scriptLibrariesDir)
  }

  if (!fs.existsSync(focusMeDir)) {
    console.log('Symlinking compiled applescript libraries.')
    fs.symlinkSync(join(__dirname, 'dist/util/focus-me-applescripts'), focusMeDir);
  }
}

createSymlink();
