## slack

Slack can be quite distracting when you are trying to focus, yet it can be considered rude to just log off during working hours.
We need to at least indicate that we are online but busy being focused.

Unfortunately the Slack desktop app doesn't have much in terms of Applescript integration as it's an Electron app. In order to use this plugin you must use slack in the browser, either Chrome or Safari will do.

## config

```json
{
  "plugins": {
    "slack": {
      "enabled": true,
      "browser": "chrome",
      "statusMessage": "coding",
      "statusEmoji": ":computer:"
    }
  }
}
```

## enabled

Whether or not the plugin is enabled.

## browser

Either `chrome` or `safari`. This will search for a slack tab to automate in the selected browser.

## statusMessage

The message to set while you are focusing.

## statusEmoji

The emoji to set as your status while you are focusing.
