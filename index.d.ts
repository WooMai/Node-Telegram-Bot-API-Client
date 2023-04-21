export class Client {
    constructor(
        bot_token: string,
        api_endpoint?: string,
        proxy?: string,
        extra_headers?: Object,
        debug?: boolean
    )

    request(method: string, data?: { [key: string]: any }, timeout?: number): Promise<any>;
}