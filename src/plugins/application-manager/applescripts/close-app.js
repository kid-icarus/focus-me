const util = Library('focus-me-applescripts/util');
const config = util.getConfig();

config.plugins['application-manager'].close.forEach(({ name }) => {
  const app = Application(name);
  const realName = app.name();
  const displayedName = app.displayedName();
  const id = app.id();
  try {
    if (app.running()) app.quit();
  } catch (e) {
    // Sometimes some MailQuickLookExtension process makes Mail falsely report itself as running.
    console.log(
      `Could not quit ${name}:
found ${realName} with:
id: ${id}
name: ${name}
displayedName: ${displayedName}
`,
    );
    console.log(e);
  }
});
