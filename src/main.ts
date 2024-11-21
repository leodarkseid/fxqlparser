import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import { SWAGGER_CONFIG } from './config/SWAGGER_CONFIG';
import { CORS_CONFIG } from './config/CORS_CONFIG';
import { DB } from './db2';
import { ConfigService } from '@nestjs/config';

/**
 * Bootstraps the NestJS application by setting up middleware, configuration, and global components.
 *
 * The function initializes the application with the following features:
 * 1. **Logger Middleware**: Logs incoming requests for monitoring and debugging purposes.
 * 2. **CORS Configuration**: Enables Cross-Origin Resource Sharing (CORS) with settings from `CORS_CONFIG`.
 * 3. **Helmet**: Adds security headers to the application for enhanced security.
 * 4. **Swagger API Documentation**: Generates and sets up Swagger UI for API documentation,
 *    accessible at the `/api` endpoint. Includes a JSON document URL at `/v1/api.json`.
 * 5. **Exception Filters**: Adds a global filter (`PrismaClientExceptionFilter`) for handling
 *    exceptions specific to Prisma Client.
 * 6. **Validation Pipe**: Globally enables request validation using the `ValidationPipe` to enforce
 *    DTO validation and automatic data transformation.
 * 7. **Application Port**: Starts the application on a port specified by the `PORT` environment variable,
 *    defaulting to `3001` if the variable is not set.
 *
 * @async
 * @function bootstrap
 * @returns {Promise<void>} Resolves when the application has successfully started.
 *
 * @example
 * // Start the application by calling the bootstrap function
 * bootstrap();
 *
 * @see {@link AppModule} - The root module of the application.
 * @see {@link LoggerMiddleware} - Middleware for logging incoming requests.
 * @see {@link ValidationPipe} - A global pipe for request validation.
 * @see {@link PrismaClientExceptionFilter} - Exception filter for handling Prisma Client exceptions.
 * @see {@link SWAGGER_CONFIG} - Swagger configuration for API documentation.
 * @see {@link CORS_CONFIG} - CORS configuration for cross-origin requests.
 */
async function bootstrap() {
  const logger = new LoggerService();
  const app = await NestFactory.create(AppModule);

  // a sneaky way to enable db migration from in app
  
  // const config = new ConfigService();
  // const migDb = new DB(logger, config);
  // migDb.databaseOp();

  // Use logger middleware for request logging
  app.use(new LoggerMiddleware().use);

  // Enable CORS with pre-defined configuration
  const corsOptions = CORS_CONFIG;
  app.enableCors(corsOptions);

  // Add security headers using Helmet
  app.use(helmet());

  // Configure Swagger API documentation
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, SWAGGER_CONFIG, options);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'v1/api.json',
  });

  // Configure global exception filters
  const { httpAdapter } = app.get(HttpAdapterHost);

  // Add global validation pipe for request validation and transformation
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Start the application on the specified port or default to 3001
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application started`);
}
bootstrap();
