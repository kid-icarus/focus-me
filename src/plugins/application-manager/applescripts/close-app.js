const util = Library('focus-me-applescripts/util');
const config = util.getConfig();

config.plugins['application-manager'].close.forEach(( name ) => {
  const app = Application(name);
  try {
    if (app.running()) app.quit();
  } catch (e) {
    // Sometimes some MailQuickLookExtension process makes Mail falsely report itself as running.
    console.error(e);
  }
});
