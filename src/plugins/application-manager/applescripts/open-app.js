const util = Library('FocusMe/util');
const config = util.getConfig();

config.plugins['application-manager'].open.forEach(
  ({ name, bounds, delayTime }) => {
    const app = Application(name);
    app.activate();
    if (delayTime) delay(delayTime);
    // eslint-disable-next-line no-param-reassign
    const window = app.windows[0];
    if (bounds) {
      try {
        window.bounds = bounds;
      } catch (e) {
        console.log(`open-app: could not set bounds on ${name}`);
      }
    }
  },
);
