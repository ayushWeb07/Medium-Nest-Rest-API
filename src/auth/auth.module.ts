import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { HashingModule } from '../hashing/hashing.module';
import { GenerateTokensService } from './services/generate-tokens.service';
import { RefreshTokensService } from './services/refresh-tokens.service';

@Module({
  imports: [DatabaseModule, UsersModule, HashingModule],
  controllers: [AuthController],
  providers: [AuthService, GenerateTokensService, RefreshTokensService],
})
export class AuthModule {}
