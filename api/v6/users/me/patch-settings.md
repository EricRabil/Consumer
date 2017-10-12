### `/api/v6/users/@me/settings`
------

* `Request Method`: `PATCH`

##### Important Headers
```
authorization:mfa.Gx2LfFbLe2qwX8YGoBopSZOZQSvAwYX9b1TXxeez1M4y_nK0_hUay0Xlyte8skTSTet6neBHtLNfU8f-hSDV
content-type:application/json
user-agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.248 Chrome/56.0.2924.87 Discord/1.6.11 Safari/537.36
```

##### Request Payload (If Any)
```json
{
   "detect_platform_accounts":true,
   "inline_attachment_media":true,
   "guild_positions": [
     "{{guild id}}",
     "{{guild id}}",
     "{{guild id}}",
     "{{guild id}}",
     "..."
   ],
   "message_display_compact":false,
   "render_reactions":true,
   "locale":"en-US",
   "convert_emoticons":true,
   "enable_tts_command":true,
   "theme":"dark",
   "restricted_guilds":[

   ],
   "afk_timeout":600,
   "explicit_content_filter":1,
   "inline_embed_media":true,
   "status":"online",
   "friend_source_flags":{
      "all":true
   },
   "render_embeds":true,
   "show_current_game":true,
   "timezone_offset":240,
   "developer_mode":true,
   "default_guilds_restricted":false
}
```

> All properties in the request payload are optional, and will only be submitted if they have been updated.

##### Response Payload (If Any)
```json
{
   "detect_platform_accounts":true,
   "inline_attachment_media":true,
   "guild_positions":[
      "{{array of new guild positions}}"
   ],
   "message_display_compact":false,
   "render_reactions":true,
   "locale":"en-US",
   "convert_emoticons":true,
   "enable_tts_command":true,
   "theme":"dark",
   "restricted_guilds":[

   ],
   "afk_timeout":600,
   "explicit_content_filter":1,
   "inline_embed_media":true,
   "status":"online",
   "friend_source_flags":{
      "all":true
   },
   "render_embeds":true,
   "show_current_game":true,
   "timezone_offset":240,
   "developer_mode":true,
   "default_guilds_restricted":false
}
```

> All properties in the response payload are required.
