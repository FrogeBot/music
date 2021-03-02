# @frogebot/music
Discord music bot module, designed for FrogeBot

----

## Installation
```bash
$ npm i @frogebot/music
```
## Use
```js
let frogeMusic = require("@frogebot/music")(options);
```
### Options
`BOT_NAME` (str, optional) - The name of the bot to show in embeds (default: `FrogeBot`)

`EMBED_COLOUR` (int, optional) - The colour to use in embeds (rgb int) (default: `3394611`)

`MSG_VIBING` (str, optional) - What to append to embed descriptions when something succeeds

`MSG_UNVIBING` (str, optional) - What to append to embed descriptions when something fails

`SKIP_PERCENT` (int, optional) - (default: `50`),

`USE_MUSIC_ROLE` (bool, optional) - Whether to use a role for DJ permissions or just allow all users (default: `true`)

`MUSIC_ROLE_NAME` (str, optional) - The name of the role to be used for DJ permissions (default: `DJ`)

`TOKEN` (str) - The Discord bot token

## Executing commands
`msg` is the discord.js message object

`args` is the content of the message with the prefix and command removed from the start

To ensure frogeBot compatability a `cmd` object is passed, the only accessed key is `action` (it can be any one of `execute`, `skip`, `stop`, `disconnect`, `getQueue`, `nowPlaying`, `remove`, `shuffle`)

**Example**
```json
let cmd = {
  "action": "play"
}
frogeMusic(msg, args, cmd)
```

