import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { LoggerService } from './logger.service';
import * as fs from 'fs';
import * as path from 'path';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('logger')
@ApiTags('Logger')
@ApiBearerAuth()
export class LoggerController {
  constructor(private logger: LoggerService) {}

  @Get('logs')
  download(@Query('s') s: string) {
    const file = fs.createReadStream(
      path.join(process.cwd(), `logs/application-${s}.log`),
    );

    return new StreamableFile(file);
  }
}
