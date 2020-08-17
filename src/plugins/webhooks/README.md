## webhooks

This plugin sends http/s requests when the timer starts and ends.

## config

```json
{
  "plugins": {
    "webhooks": {
      "enabled": true,
      "startHooks": [
        { "url": "http://example.com", "options": { "method": "POST" } }
      ]
    }
  }
}
```

## enabled

Whether or not the plugin is enabled.

## startHooks

An array of requests to make objects to pass to [got](https://github.com/sindresorhus/got)

Each request is an object with the following keys:

- `url` - The URL of the request.
- `options` - Options to pass to `got()`

## stopHooks

Same as `startHooks` but only fired with the timer stops.
