import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import type { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): any {
    // access the request and response
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // access the exception status and response message
    const exceptionStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Something went wrong on our end, please try again later';

    const responseObj = exceptionResponse as Record<string, unknown>;

    const exceptionMessage =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : typeof responseObj.message === 'string'
          ? responseObj.message
          : JSON.stringify(exceptionResponse);

    // send the response back
    response.status(exceptionStatus).json({
      statusCode: exceptionStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exceptionMessage,
    });
  }
}
