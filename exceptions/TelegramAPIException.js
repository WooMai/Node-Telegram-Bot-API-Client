function TelegramAPIException(message, method, code = 0, parameters = {}) {
    this.name = 'TelegramAPIException';
    this.message = message;
    this.method = method;
    this.code = code;
    this.parameters = parameters;
}

module.exports = TelegramAPIException;