## slack

Slack can be quite distracting when you are trying to focus, yet it can be considered rude to just log off during working hours.
We need to at least indicate that we are online but busy being focused.

To use this you need your API token handy. You can find it by navigating to the `/customize` page:

`window.TS.boot_data.api_token` should contain the token.


## config

```json
{
  "plugins": {
    "slack": {
      "enabled": true,
      "token": "xx-asdfasdfasdf",
      "statusText": "coding",
      "statusEmoji": ":computer:"
    }
  }
}
```

## enabled

Whether or not the plugin is enabled.

## statusEmoji

The emoji to set as your status while you are focusing.

## statusText

The text to set as your status while you are focusing.

## duration

The duration of the session in minutes
