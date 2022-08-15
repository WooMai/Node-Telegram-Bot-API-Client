const FormData = require('form-data');
const fetch = require('make-fetch-happen')
const pkg = require('./package.json')
const TelegramAPIException = require("./exceptions/TelegramAPIException");
const fs = require('fs')

class Client {
    /**
     * @param bot_token Bot Token from @BotFather
     * @param api_endpoint Telegram Bot API HTTP Endpoint
     * @param proxy https://github.com/npm/make-fetch-happen#opts-proxy
     * @param extra_headers
     */
    constructor(bot_token, api_endpoint = null, proxy = null, extra_headers = {}) {
        this.bot_token = bot_token;
        this.api_endpoint = api_endpoint ?? 'https://api.telegram.org';
        this.proxy = proxy;
        this.extra_headers = extra_headers;
    }

    async request(method, data = null, timeout = null) {
        let body;
        let ext_headers = {};
        if (data && typeof data === 'object') {
            let is_multipart = false;
            for (const [key, val] of Object.entries(data)) {
                if (val?.identity === 'TELEGRAM_BOT_API_FILE') {
                    is_multipart = true;
                }
            }

            if (is_multipart) {
                const form = new FormData();
                for (const [key, val] of Object.entries(data)) {
                    if (val?.identity === 'TELEGRAM_BOT_API_FILE') {
                        form.append(key, fs.createReadStream(val.filepath), {
                            filename: val.filename,
                        });
                    } else {
                        form.append(key, val);
                    }
                }
                ext_headers = form.getHeaders();
                body = form;
            } else {
                ext_headers = { 'Content-Type': 'application/json' };
                body = JSON.stringify(data)
            }

        } else {
            body = undefined;
        }

        let rsp;
        try {
            rsp = await fetch(`${this.api_endpoint}/bot${this.bot_token}/${method}`, {
                proxy: this.proxy,
                method: 'POST',
                body: body,
                timeout: parseInt(timeout ?? '20000'),
                headers: {
                    'User-Agent': `Node-Telegram-Bot-API-Client/${pkg.version} (+${pkg.homepage})`,
                    ...ext_headers,
                    ...this.extra_headers
                }
            })
        } catch (err) {
            throw new TelegramAPIException(`Fetch failed`, method, -1, {}, err.toString())
        }

        let json;
        try {
            json = await rsp.json();
        } catch (err) {
            throw new TelegramAPIException(`Could not understand API response`, method, -1, {}, err.toString());
        }

        if (!json.ok) {
            throw new TelegramAPIException(json['description'], method, json['error_code'], json['parameters'] || {}, JSON.stringify(data || {}, null, 4))
        }

        return json['result'];
    }
}

module.exports = { Client, FormData };