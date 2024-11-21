import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FXQLService } from './FXQL.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 600000, limit: 1000 }]),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, FXQLService],
})
export class AppModule {}
