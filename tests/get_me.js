const { Client } = require('../index')

const client = new Client('1953331181:AAH_8-dK4y7RTdogxBOzj9bPfZg1hSvr4jI', 'https://api.telegram.org', 'http://127.0.0.1:1080');

client.request('getMe').then(console.log).catch(console.error);

