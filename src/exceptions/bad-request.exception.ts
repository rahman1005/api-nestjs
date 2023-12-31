import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestException extends HttpException {
    constructor() {
        super('Bad Request', HttpStatus.BAD_REQUEST);
    }
}
