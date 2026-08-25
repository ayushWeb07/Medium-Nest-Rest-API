import { Module } from '@nestjs/common';
import { DRIZZLE } from './constants';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from '../config/interfaces/database_config.interface';
import * as schema from './schemas/index';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the database config
        const databaseConfig = configService.get<IDatabaseConfig>('database');

        if (!databaseConfig) {
          throw new Error('Database configuration must be setup');
        }

        // create the connection pool and drizzle instance
        const pool = mysql.createPool(databaseConfig.databaseUrl);
        return drizzle(pool, {
          schema,
        });
      },
    },
  ],
})
export class DatabaseModule {}
