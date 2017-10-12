### `/api/oauth2/applications`
------

* `Request Method`: `POST`

##### Important Headers
```
authorization:<your token>
origin:https://discordapp.com
referer:https://discordapp.com/developers/applications/me/create
user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36
content-type:application/json
```

##### Request Payload (If Any)
```json
{
  "name": "{{bot name}}",
  "description": "{{bot description}}",
  "icon": "{{leave blank for now, someone please document this!}}"
}
```

##### Response Payload (If Any)
```json
{
  "redirect_uris": [],
  "description": "{{bot description}}",
  "name": "{{bot name}}",
  "secret": "{{bot secret}}",
  "flags": 0,
  "rpc_application_state": 0,
  "id": "{{bot id}}",
  "icon": null
}
```

> The "icon" property in the `request` payload is undocumented. Leave it blank for now.
