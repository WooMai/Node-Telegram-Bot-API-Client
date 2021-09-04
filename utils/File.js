class File {
    constructor(filepath, filename, mime = undefined) {
        this.identity = 'TELEGRAM_BOT_API_FILE'
        this.filepath = filepath;
        this.filename = filename;
        this.mime = mime;
    }
}

module.exports = File;