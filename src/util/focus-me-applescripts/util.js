function getConfig(path) {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;
  const file = app.openForAccess(`${app.pathTo('home folder')}/.timerrc.json`);
  const contents = app.read(file);
  return JSON.parse(contents);
}
