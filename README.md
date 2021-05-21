# Focus Me

A configurable timer with a plugin system meant to automate various
tasks when the timer starts, stops, or ticks.

## Project Goals

The goal of this project is to help maintain focus. Start a timer and remove distraction seamlessly. When the timer ends, take a break on revisit the 
distracting world for a bit before setting another timer. We accomplish the goal via:

- OS/GUI automations (applescript, powershell, etc)
- Useful 3rd party integrations (slack, rescuetime, arbitrary http/s requests)
- 1st party Persistence and analytics (see how focused you are, track trends over time)

To this end, most of the functionality of the Focus Me lies within the various plugins.

## Plugins

- [applcation-manager](src/plugins/application-manager/README.md) - Closes
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

`npm install -g @focus-me/focus-cli`

macOS is the only supported platform at the moment, PRs welcome!

## Configuration

`focus` will look in a platform specific folder to try to load configuration, and if
cannot find it will throw. You can specify an alternative config with using the `--config` command line option or
`config` environment variable.

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

### CLI options

- `--help` - Display the list of options
- `--version` - Display the version of FocusMe
- `--config` - Specify an alternative path to a FocusMe config file.

## Creating your own plugin

If you specify an additional plugin in `config.plugins`, we attempt to import that module. The module must implement
the [plugin interface](https://github.com/kid-icarus/focus-me/blob/a51d6cbd05a03354137046e454df69a9832e9ed3/src/util/load-plugins.ts#L4-L8)

## Files

Installing this module will create files in:

- `~/Library/Application Support/FocusMe/preferences.json`: Your FocusMe preferences/config.
- `~/Library/Script Libraries/FocusMe/util.scpt`:
  A compiled applescript that serves as a library for other applescripts to import. It is responsible for
  reading and parsing the user's preferences.
