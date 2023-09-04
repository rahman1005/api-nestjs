export interface MailingSendInterface {
    to: Array<string>;
    from: string;
    subject: string;
    template: string;
    data?: {
        [name: string]: any;
    }
}