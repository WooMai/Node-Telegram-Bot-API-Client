export class Client {
    constructor(
        bot_token: string,
        api_endpoint?: string,
        proxy?: string,
        user_agent?: string,
        extra_headers?: Object
    )

    request(method: string, data?: { [key: string]: any }): Promise<any>;
}