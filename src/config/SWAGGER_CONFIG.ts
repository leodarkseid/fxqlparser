import {  DocumentBuilder } from '@nestjs/swagger';
export const SWAGGER_CONFIG = new DocumentBuilder()
  .setTitle('FXQLParser')
  .setDescription('FxqlParser API')
  .setVersion('1.0')
  .addServer('http://localhost:4000/', 'Local environment')
  .setExternalDoc('Download json', 'v1/api.json')
  .build();
