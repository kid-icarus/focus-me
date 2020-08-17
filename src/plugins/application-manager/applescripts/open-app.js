const util = Library('focus-me-applescripts/util');
const config = util.getConfig();

config.plugins['application-manager'].open.forEach(
  ({ name, bounds, delayTime }) => {
    const app = Application(name);
    app.activate();
    if (delayTime) delay(delayTime);
    // eslint-disable-next-line no-param-reassign
    if (bounds) app.windows[0].bounds = bounds;
  },
);
