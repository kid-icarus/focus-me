## application-manager

This plugin manages applications before the timer starts, and once it ends.

## config

```json
{
  "plugins": {
    "application-manager": {
      "enabled": true,
      "open": [
        {
          "name": "Mail",
          "bounds": { "x": 0, "y": 0, "width": 600, "height": 300 }
        },
        {
          "name": "Messages"
        }
      ],
      "close": ["Mail", "Messages", "Calendar"]
    }
  }
}
```

## config.enabled

Whether or not the plugin is enabled.

## config.open

An array of objects representing applications to open.

- name - The name of the application to open. Anything listed in `/Applications` should open without a problem.
- bounds? - An optional configuration of bounds for the app being opened.
- bounds.x - The x coordinate to place the application.
- bounds.y - The y coordinate to place the application.
- bounds.width - The width of the application window.
- bounds.height - The width of the application window.

## config.close

An array of strings of applications to close.
