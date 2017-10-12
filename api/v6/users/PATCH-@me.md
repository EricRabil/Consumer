### `/api/v6/users/@me`
------

* `Request Method`: `PATCH`

##### Important Headers
```
authorization:{{your token}}
content-type:application/json
user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.248 Chrome/56.0.2924.87 Discord/1.6.11 Safari/537.36
```

##### Request Payload (If Any)
```json
{
  "username": "{{updated username}}",
  "email": "{{updated email}}",
  "password": "{{password verification}}",
  "avatar": "{{updated avatar id}}",
  "new_password": null
}
```

> The `new_password` property can either be `null` or `"{{updated password}}"`

##### Response Payload (If Any)
```json
{
  "username": "{{username}}",
  "verified": true,
  "mfa_enabled": true,
  "id": "{{user id}}",
  "phone": "{{user phone number including international code}}",
  "token": "{{user token}}",
  "avatar": "{{user avatar id}}",
  "discriminator": "{{four digit discrim}}",
  "email": "{{user email}}"
}
```

> `mfa_enabled` represents 2FA, return false if there's no 2FA for the user. 
