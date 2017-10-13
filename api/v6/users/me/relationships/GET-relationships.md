### `/api/v6/users/@me/relationships`
------

* `Request Method`: `GET`

##### Important Headers
```
authorization: {{ your token}}
accept: */*
user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.248 Chrome/56.0.2924.87 Discord/1.6.11 Safari/537.36
```

##### Request Payload
```json
{
"noRequestBody": "There is no request body attached to this route"
}
```

> N/A

##### Response Payload
```json
[
    {
        "type": 1,
        "id": "{{friend id}}",
        "user": {
            "username": "{{friend username}}",
            "discriminator": "{{friend discrim}}",
            "id": "{{friend id (again)}}",
            "avatar": "{{friend avatar id}}"
        }
    }, "more objects following the above schema"
]
```

> N/A