import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { IGenerateTokensResponse } from './interfaces/generate-tokens-response.interface';
import type { Response } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // call the register auth service
    const tokens: IGenerateTokensResponse =
      await this.authService.register(registerDto);

    // store the refresh token in cookie
    res.cookie('token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 604800 * 1000,
    });

    return {
      success: true,
      message: 'Successfully registered the user',
      token: tokens.accessToken,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // call the login auth service
    const tokens: IGenerateTokensResponse =
      await this.authService.login(loginDto);

    // store the refresh token in cookie
    res.cookie('token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 604800 * 1000,
    });

    return {
      success: true,
      message: 'Successfully logged in the user',
      token: tokens.accessToken,
    };
  }
}
