### `/api/v6/users/@me/relationships/{{user id to request/accept friendship}}`
------

* `Request Method`: `PUT`

##### Important Headers
```
origin: https://discordapp.com
authorization: {{ your token}}
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.248 Chrome/56.0.2924.87 Discord/1.6.11 Safari/537.36
content-type: application/json
accept: */*
```

##### Request Payload
```json
{}
```

> N/A

##### Response Payload
```json
{
"noResponseBody": "There is no response body attached to this route"
}
```

> N/A
