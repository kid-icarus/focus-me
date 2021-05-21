let env = $.NSProcessInfo.processInfo.environment;
env = ObjC.unwrap(env);
const configPath = ObjC.unwrap(env.config);

function getConfig() {
  const app = Application.currentApplication();
  app.includeStandardAdditions = true;
  const file = app.openForAccess(
    configPath ||
      `${app.pathTo('application support', {
        from: 'user domain',
      })}/FocusMe/timerrc.json`,
  );
  const contents = app.read(file);
  return JSON.parse(contents);
}
