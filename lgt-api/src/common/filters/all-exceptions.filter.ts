import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

type DbLikeError = {
  code?: string;
  errno?: number;
  message?: string;
};

type HttpErrorPayload = {
  message?: string | string[];
};

function isDbLikeError(value: unknown): value is DbLikeError {
  return typeof value === 'object' && value !== null;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  private readonly internalServerErrorStatus = Number(
    HttpStatus.INTERNAL_SERVER_ERROR,
  );

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const requestIdHeader = request.headers['x-request-id'];
    const requestId = Array.isArray(requestIdHeader)
      ? (requestIdHeader[0] ?? '-')
      : (requestIdHeader ?? '-');
    const isHttpException = exception instanceof HttpException;

    let httpStatus: number = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    if (isHttpException) {
      const payload = exception.getResponse() as HttpErrorPayload | string;
      const payloadMessage =
        typeof payload === 'string'
          ? payload
          : Array.isArray(payload.message)
            ? payload.message.join(', ')
            : payload.message;

      message = payloadMessage ?? exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    if (
      !isHttpException &&
      isDbLikeError(exception) &&
      (exception.code?.startsWith('ER_') || typeof exception.errno === 'number')
    ) {
      const dbError = exception;

      if (dbError.errno === 1062) {
        httpStatus = HttpStatus.CONFLICT;
        message = 'A record with this unique value already exists.';
      }

      this.logger.warn(
        `Database Error [${dbError.code ?? 'UNKNOWN'}]: ${dbError.message ?? message}`,
      );
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      requestId,
    };

    if (httpStatus === this.internalServerErrorStatus) {
      const errorString = JSON.stringify(
        exception,
        (_key: string, value: unknown) =>
          typeof value === 'bigint' ? value.toString() : value,
      );
      this.logger.error(
        `Unhandled Exception: ${errorString}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
