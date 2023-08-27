
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorInterface } from './interfaces/error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        let errors = [];
        let message = exception.message;

        if (exception instanceof BadRequestException) {
            if (exception.getResponse()) {
                const exceptionResponse = exception.getResponse();
                const e: ErrorInterface = typeof exceptionResponse === 'string' ? JSON.parse(exceptionResponse) : exceptionResponse;
                errors = e.message;
                message = e.error;
            }
        }

        response
            .status(status)
            .send({
                status,
                timestamp: new Date().toISOString(),
                message,
                errors
            })
    }
}
