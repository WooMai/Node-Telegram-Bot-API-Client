const Client = require('../index')
const File = require('../utils/File')
const path = require('path')

const client = new Client('1953331181:AAH_8-dK4y7RTdogxBOzj9bPfZg1hSvr4jI', 'https://api.telegram.org', 'http://127.0.0.1:1080');

client.request('sendPhoto', {
    chat_id: -574398368,
    photo: new File(path.normalize(`${__dirname}/pexels-denis-linine-714258.jpg`), 'test.jpg'),
    caption: 'File upload test',
}).then(console.log).catch(console.error);


