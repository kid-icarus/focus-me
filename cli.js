const yargs = require('yargs');

const { argv } = yargs
  .option('time', {
    alias: 't',
    describe: 'Set the time of the timer in minutes',
    number: true,
  })
  .option('alert', {
    alias: 'a',
    describe: 'Whether or not to display an alert after the timer has finished.',
    boolean: true,
  })
  .option('spotify-start', {
    describe: 'Whether or not to start music when the timer is finished.',
    boolean: true,
  })
  .option('spotify-stop', {
    describe: 'Whether or not to stop music when the timer is finished.',
    boolean: true,
  })
  .option('say', {
    alias: 's',
    describe: 'A string to announce when the timer has finished',
  })
  .option('webhook-start', {
    describe: 'A URL to GET when the timer starts',
    array: true,
  })
  .option('webhook-stop', {
    describe: 'A URL to GET when the timer stops',
    array: true,
  })
  .option('debug', {
    alias: 'd',
    describe: 'Output argv and immediately exit',
    boolean: true,
  })
  .option('close-apps', {
    alias: 'c',
    description: 'An array of distracting apps before the timer starts.',
    array: true,
  })
  .option('open-apps', {
    alias: 'o',
    description: 'Open distracting apps before the timer starts.',
    boolean: true,
  })
  .option('watch', {
    alias: 'w',
    description: 'Keep track of focused applications while the timer is runningl',
    boolean: true,
  })
  .demandOption(['time'], 'Please provide an amount of time for the timer')
  .config()
  .help();

module.exports = argv;
