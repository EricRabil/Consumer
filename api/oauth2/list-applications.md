### `/api/oauth2/applications`
------

* `Request Method`: `GET`

##### Important Headers
```
accept-encoding:gzip, deflate, br
accept-language:en-US,en;q=0.8
authorization:<your token>
referer:https://discordapp.com/developers/applications/me
user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36
```

##### Request Payload (If Any)
```json
none
```

##### Response Payload (If Any)
```json
[
  {
    "redirect_uris": [],
    "description": "{{bot description}}",
    "icon": "{{bot icon id}}",
    "bot_require_code_grant": false,
    "id": "171767439875375104",
    "rpc_application_state": 0,
    "name": "{{bot name}}",
    "bot": {
      "username": "{{bot username}}",
      "bot": true,
      "token": "{{bot token}}",
      "avatar": "{{bot avatar id}}",
      "discriminator": "{{bot discrim}}",
      "id": "{{bot id}}"
    },
    "secret": "{{bot secret}}",
    "flags": 0,
    "bot_public": true
  }, "more objects repeating the above schema, each one representing another bot the user owns"
]
```
