## tracker

This plugin tracks how many focus sessions you have done in the current day, as well as how much time you spent in each application while you were focusing.
This can be used to get a sense of how much time you're able to focus in a given day, as well as what you usually do while you're focusing.

At the end of the timer, this plugin will output how many sessions you have done today, and it will also tell you how many sessions you did by this time yesterday.

This plugin is very rudimentary and stores all activity in `~/.timerdb`, in a series of json files named `YYYY-MM-DD.json`

## config

```json
{
  "plugins": {
    "tracker": {
      "enabled": true
    }
  }
}
```

## config.enabled

Whether or not the plugin is enabled.
