function TelegramAPIException(message, method, code = 0, parameters = {}, sensitive_message = null) {
    this.name = 'TelegramAPIException';
    this.message = message;
    this.method = method;
    this.code = code;
    this.parameters = parameters;
    this.sensitive_message = sensitive_message;
}

module.exports = TelegramAPIException;