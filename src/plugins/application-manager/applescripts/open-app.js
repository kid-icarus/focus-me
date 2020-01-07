[
  {
    app: Application('Messages'),
    bounds: {
      x: 1245,
      y: 860,
      width: 675,
      height: 340,
    },
  },
  {
    app: Application('Calendar'),
    bounds: {
      x: 0,
      y: 659,
      width: 996,
      height: 541,
    },
  },
  {
    app: Application('Mail'),
  },
  {
    app: Application('Jira'),
  },
  {
    app: Application('Reminders'),
  },
].forEach(({ app, bounds, delayTime }) => {
  app.activate();
  if (delayTime) delay(delayTime);
  // eslint-disable-next-line no-param-reassign
  if (bounds) app.windows[0].bounds = bounds;
});
