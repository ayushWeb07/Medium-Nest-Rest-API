import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import envsValidationSchema from './config/validations/envs.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDatabaseConfig } from './config/interfaces/database_config.interface';
import { Tag } from './tags/tag.entity';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidationSchema,
      load: [serverConfig, databaseConfig],
      envFilePath: `.env.${NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // get the database config
        const databaseConfig = configService.get<IDatabaseConfig>('database');

        if (!databaseConfig) {
          throw new Error('Database configuration must be setup');
        }
        return {
          type: 'mysql',
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.user,
          password: databaseConfig.pass,
          database: databaseConfig.name,
          entities: [Tag],
          synchronize: NODE_ENV === 'development',
        };
      },
    }),

    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
