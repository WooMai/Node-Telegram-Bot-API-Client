# Telegram Bot API Client

A Simple Telegram Bot API Client in Node.js.

## Installation

```shell
npm i tgapi-client
```

## Usage

```js
const Client = require('tgapi-client')
const { File } = require('tgapi-client/utils')

const client = new Client('1953331181:AAH_8-dK4y7RTdogxBOzj9bPfZg1hSvr4jI');

client.request('sendMessage', {
    chat_id: -1001145141919,
    text: 'Hello World'
});

// Send file with multipart/form-data
client.request('sendDocument', {
    chat_id: -1001145141919,
    document: new File('./hello-world.txt', 'Hello World.txt'),
    caption: 'Hello World'
})
```

## License

[MIT](./LICENSE)
