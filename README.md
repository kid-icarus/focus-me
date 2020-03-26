# Focus Me

A configurable CLI-based timer with a helpful plugin system. The following
plugins are included:

- `applciation-manager` Closes distracting applications before the timer starts,
  and opens them back up when the timer ends.
- `bell` Plays a nice sounding bell at the start and end of the timer.
- `logger` Logs the time remaining to the terminal.
- `noisli` Toggles white noise from `https://www.noisli.com/`
- `rain` Plays the sound of rain during the duration of the timer
- `slack` Toggles do not disturb and sets a status for the duration of the timer
- `tracker` Tracks the number of sessions completed per day, along with the
  focused applications in use for the duration of the timer.
- `webhook` Fire configurable HTTP requests when the timer starts and stops.

## Installation

`npm install -g focus-me`

## Usage

`focus` will start the timer.

If you need to cancel the timer, you can kill the process. Cancelling the timer
will not execute any plugins that should only be run upon _completion_ of the
timer.

## Configuration

Timer will look in `~/.timerrc.json` to try to load configuration.

### Sample configuration:

```json
{
  "time": 25,
  "plugins": {
    "application-manager": {
      "enabled": true,
      "apps": ["Mail", "Calendar", "Messages", "Jira"]
    },
    "rain": {
      "enabled": false,
      "volume": ".8"
    },
    "slack": {
      "enabled": true,
      "browser": "chrome"
    },
    "logger": {
      "enabled": true
    },
    "bell": {
      "enabled": true
    },
    "spotify": {
      "enabled": true
    },
    "tracker": {
      "enabled": true
    }
  }
}
```
