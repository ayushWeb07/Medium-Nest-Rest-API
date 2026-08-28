import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { TagsService } from '../tags/services/tags.service';
import { AuthService } from './services/auth.service';
import { CreateTagDto } from '../tags/dtos/create-tag.dto';
import { InsertTagType } from '../database/types/tag.type';
import { RegisterDto } from './dtos/register.dto';
import { InsertUserType, SelectUserType } from '../database/types/user.type';
import { LoginDto } from './dtos/login.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    // call the register auth service
    const newUser: InsertUserType | null =
      await this.authService.register(registerDto);

    if (!newUser) {
      throw new InternalServerErrorException(
        'Something went wrong while user registration',
      );
    }

    return {
      success: true,
      message: 'Successfully registered the user',
      newUser,
    };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    // call the login auth service
    const loggedUser: SelectUserType = await this.authService.login(loginDto);

    return {
      success: true,
      message: 'Successfully logged in the user',
      loggedUser,
    };
  }
}
