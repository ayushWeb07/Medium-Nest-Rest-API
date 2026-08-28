import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import serverConfig from './config/server.config';
import databaseConfig from './config/database.config';
import envsValidationSchema from './config/validations/envs.validation';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { JwtModule } from '@nestjs/jwt';

const NODE_ENV = process.env.NODE_ENV ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envsValidationSchema,
      load: [serverConfig, databaseConfig],
      envFilePath: `.env.${NODE_ENV}`,
    }),
    JwtModule.register({
      global: true,
    }),

    TagsModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    HashingModule,
  ],
})
export class AppModule {}
