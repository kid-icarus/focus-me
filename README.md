# Focus Me

A configurable CLI-based timer with a plugin system meant to automate various
tasks when the timer starts, stops, or ticks. The following plugins are
included:

- [applciation-manager](src/plugins/application-manager/README.md) - Closes
  distracting applications before the timer starts, and opens them back up when
  the timer ends.
- [bell](src/plugins/bell/README.md) - Plays a nice sounding bell at the start
  and end of the timer.
- [logger](src/plugins/logger/README.md) - Logs the time remaining to the
  terminal.
- [rain](src/plugins/rain/README.md) Plays the sound of rain during the duration
  of the timer
- [slack](src/plugins/slack/README.md) Toggles do not disturb and sets a status
  for the duration of the timer
- [spotify](src/plugins/spotify/README.md) Plays spotify during the timer, stops
  it when the timer ends.
- [tracker](src/plugins/tracker/README.md) Tracks the number of sessions
  completed per day, along with the focused applications in use for the duration
  of the timer.
- [webhooks](src/plugins/webhooks/README.md) Fire configurable HTTP requests
  when the timer starts and stops.

## Installation

`npm install -g focus-me`

## Configuration

`focus` will look in `~/.timerrc.json` to try to load configuration, and if
cannot find it, it will supply a default.

- `config.time` - The amount of time, in minutes, to count down.
- `config.plugins` - An object of plugins to configure. Each key is the name of
  the plugin. Each plugin has an `enabled` property to enabled/disabled it, as
  well as other plugin-specific configuration.

```json
{
  "time": 25,
  "plugins": {
    "name-of-plugin": {
      "enabled": true
    }
  }
}
```

## Usage

`focus` will start the timer.

If you need to cancel the timer, you can kill the process with a `SIGINT`.
Canceling the timer will not execute any plugins' stop methods that should only
be run upon _completion_ of the timer.

## Creating your own plugin
