import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    const logger = new LoggerService();

    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const msgObj = {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        clientIp:
          req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent'],
        requestHeaders: req.headers,
        queryParams: req.query,
        responseTime: `${duration}ms`,
        protocol: req.protocol,
        requestSize: req.headers['content-length'] || 'unknown',
        responseSize: res.get('content-length') || 'unknown',
      };
      logger.debug(JSON.stringify(msgObj), 'HTTP-REQUEST');
    });
    next();
  }
}
