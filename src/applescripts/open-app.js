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
  // {
  //   app: Application('Calendar'),
  //   bounds: {
  //     x: 0,
  //     y: 659,
  //     width: 996,
  //     height: 541,
  //   },
  // },
  {
    app: Application('Microsoft Outlook'),
    bounds: {
      x: 795,
      y: 23,
      width: 1125,
      height: 764,
    },
  },
  {
    app: Application('Slack'),
    delayTime: 6,
    bounds: {
      x: 0,
      y: 23,
      width: 965,
      height: 635,
    },
  },
].forEach(({ app, bounds, delayTime }) => {
  app.activate();
  if (delayTime) delay(delayTime);
  if (bounds) app.windows[0].bounds = bounds;
});