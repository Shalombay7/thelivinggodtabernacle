import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const requestId = request.headers?.['x-request-id'] || '-';
    const isHttpException = exception instanceof HttpException;

    let httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = isHttpException
      ? (exception.getResponse() as any).message || exception.message
      : (exception as any)?.message || 'Internal server error';

    // Handle MySQL/MariaDB specific errors (e.g., Unique Constraints)
    const dbError = exception as any;
    if (!isHttpException && (dbError.code?.startsWith('ER_') || dbError.errno)) {
      // Map ER_DUP_ENTRY (1062) to 409 Conflict
      if (dbError.errno === 1062) {
        httpStatus = HttpStatus.CONFLICT;
        message = 'A record with this unique value already exists.';
      }
      this.logger.warn(`Database Error [${dbError.code}]: ${dbError.message}`);
    }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
      requestId,
    };

    // Log the stack trace for 500 errors
    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      // Use a replacer to handle BigInt values often found in MariaDB/MySQL driver errors
      const errorString = JSON.stringify(exception, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value,
      );
      this.logger.error(`Unhandled Exception: ${errorString}`, (exception as Error).stack);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}