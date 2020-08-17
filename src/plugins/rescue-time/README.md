## rescue-time

This plugin provides integration with [Rescuetime](https://www.rescuetime.com/) to start and stop its Focustime feature while the timer is running.

## config

```json
{
  "plugins": {
    "rescue-time": {
      "enabled": true,
       "apiKey": "asdf",
       "duration": 25
    }
  }
}
```

## enabled

Whether or not the plugin is enabled.

## apiKey

You must generate a [Rescuetime API key](https://www.rescuetime.com/anapi/manage) to use this plugin.

## duration

The duration of the focustime session (we should fix this to read from global config)

