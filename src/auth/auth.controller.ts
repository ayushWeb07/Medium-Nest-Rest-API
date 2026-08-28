import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { InsertUserType, SelectUserType } from '../database/types/user.type';
import { LoginDto } from './dtos/login.dto';
import { IGenerateTokensResponse } from './interfaces/generate-tokens-response.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    // call the register auth service
    const tokens: IGenerateTokensResponse =
      await this.authService.register(registerDto);

    return {
      success: true,
      message: 'Successfully registered the user',
      tokens,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    // call the login auth service
    const tokens: IGenerateTokensResponse =
      await this.authService.login(loginDto);

    return {
      success: true,
      message: 'Successfully logged in the user',
      tokens,
    };
  }
}
