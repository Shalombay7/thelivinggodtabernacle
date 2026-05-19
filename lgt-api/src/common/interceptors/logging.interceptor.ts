import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (!context.switchToHttp) {
      return next.handle();
    }

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();
    const { method, originalUrl } = request;
    const requestId = request.header('x-request-id') ?? '-';
    const started = Date.now();

    return next.handle().pipe(
      tap(() => {
        const durationMs = Date.now() - started;
        const statusCode = response.statusCode;
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} ${durationMs}ms rid=${requestId}`,
        );
      }),
    );
  }
}