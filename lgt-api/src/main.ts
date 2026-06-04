import { Logger, ValidationPipe, RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { existsSync } from 'fs';
import helmet from 'helmet';
import hbs from 'hbs';
import { join } from 'path';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = new Logger('Bootstrap');
  app.useLogger(logger);

  const runtimeRoot = __dirname;
  const publicDir = join(runtimeRoot, 'public');
  const viewsDir = join(runtimeRoot, 'views');
  const partialsDir = join(viewsDir, 'partials');

  if (existsSync(publicDir)) {
    app.useStaticAssets(publicDir);
  }

  if (existsSync(partialsDir)) {
    hbs.registerPartials(partialsDir);
  }

  const hbsEngine = (
    hbs as unknown as {
      __express: (
        viewPath: string,
        options: object,
        callback: (error: Error | null, rendered?: string) => void,
      ) => void;
    }
  ).__express;

  app.setBaseViewsDir(viewsDir);
  app.engine('hbs', hbsEngine);
  app.setViewEngine('hbs');

  app.enableShutdownHooks();
  app.enableCors({ origin: true, credentials: true });

  app.setGlobalPrefix('api', {
    exclude: [
      { path: '/', method: RequestMethod.GET },
      { path: 'favicon.ico', method: RequestMethod.GET },
    ],
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          'style-src': ["'self'", "'unsafe-inline'"],
        },
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new LoggingInterceptor());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('LGT API')
    .setDescription('Backend API for The Living God Tabernacle')
    .setVersion('1.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, swaggerDocument, {
    swaggerOptions: { persistAuthorization: true },
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT') ?? 3000;

  await app.listen(port, '0.0.0.0');

  logger.log(`Application is running on port ${port}`);
}

void bootstrap();
