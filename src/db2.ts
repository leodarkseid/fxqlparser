import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { stderr, stdout } from 'process';
import util from 'util';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DB {
  constructor(
    private readonly logger: LoggerService,
    private readonly config: ConfigService,
  ) {}
  private execPromise(
    command: string,
  ): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          this.logger.error(error.toString(), 'execPromise', 'execPromise');
          reject(error);
        } else {
          resolve({ stdout, stderr });
        }
      });
    });
  }
  async databaseOp() {
    try {
      // temp console key
      // this.logger.log(this.config.getOrThrow("DATABASE_URL"), "dbKey");
  
   
      // const { stdout: resetOutput } = await this.execPromise(
      //   "npx prisma migrate reset --force --skip-seed"
      // );
      // this.logger.log(`Database reset: ${resetOutput}`, "dbPrismaReset");
       const { stdout: migrateDevOutput } = await this.execPromise(
         "npx prisma migrate dev"
       );
       this.logger.log(
         `Prisma dev migration: ${migrateDevOutput}`,
         "dbPrismaMigrateDev"
       );
      const { stdout: generateOutput } = await this.execPromise(
        "npx prisma generate"
      );
      this.logger.log(
        `Prisma client generated: ${generateOutput}`,
        "dbPrismaGen"
      );
      const { stdout: deployOutput } = await this.execPromise(
        "npx prisma migrate deploy"
      );
      this.logger.log(`Migrations deployed: ${deployOutput}`, "dbDeploy");
    } catch (error) {
      this.logger.error(error, 'overArchDB', 'overArchDB');
    }
  }
}
