const util = Library('focus-me-applescripts/util');
const config = util.getConfig();

config.plugins['application-manager'].open.forEach(
  ({ name, bounds, delayTime }) => {
    const app = Application(name);
    const realName = app.name();
    const id = app.id();
    app.activate();
    if (delayTime) delay(delayTime);
    // eslint-disable-next-line no-param-reassign
    const window = app.windows[0];
    if (bounds) {
      try {
        window.bounds = bounds;
      } catch (e) {
        console.log(
          `open-app: could not set bounds on ${name}, found ${realName} with ID ${id}`,
        );
      }
    }
  },
);
