import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS_CONFIG: CorsOptions = {
  origin: [
    'https://pactocoin.com',
    'http://marketplace.pactocoin.com',
    'http://marketplace.pactocoin.com/marketplace',
    /^https:\/\/(.+\.)?pactocoin\.com$/,
    'http://localhost:42332',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  allowedHeaders: 'Content-Type, Accept, Authorization',
  credentials: true,
};
