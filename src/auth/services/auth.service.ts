import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import UsersService from '../../users/services/users.service';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { RegisterDto } from '../dtos/register.dto';
import { HashingService } from '../../hashing/services/hashing.service';
import { InsertUserType, SelectUserType } from '../../database/types/user.type';
import { LoginDto } from '../dtos/login.dto';
import { GenerateTokensService } from './generate-tokens.service';
import { IGenerateTokensResponse } from '../interfaces/generate-tokens-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly generateTokensService: GenerateTokensService,
  ) {}

  async register(registerDto: RegisterDto): Promise<IGenerateTokensResponse> {
    // call the find user by email service
    const existingUser: SelectUserType | null =
      await this.usersService.findUserByEmail({
        email: registerDto.email,
      });

    if (existingUser) {
      throw new ConflictException('User with such email already exists');
    }

    // call the hash password service
    const hashedPassword = await this.hashingService.hashPassword(
      registerDto.password,
    );

    registerDto.password = hashedPassword;

    // call the create user service
    const newUser = await this.usersService.createUser(registerDto);

    if (!newUser) {
      throw new InternalServerErrorException(
        'Something went wrong while user registration',
      );
    }

    // generate tokens
    const tokens = await this.generateTokensService.generateTokens({
      userId: newUser.id!,
      userEmail: newUser.email,
    });

    return tokens;
  }

  async login(loginDto: LoginDto): Promise<IGenerateTokensResponse> {
    // call the find user by email service
    const existingUser: SelectUserType | null =
      await this.usersService.findUserByEmail({
        email: loginDto.email,
      });

    if (!existingUser) {
      throw new UnauthorizedException('User with such email does not exist');
    }

    // check password is correct
    const isPasswordsMatch = await this.hashingService.comparePasswords(
      loginDto.password,
      existingUser.password,
    );

    if (!isPasswordsMatch) {
      throw new UnauthorizedException('Invalid credentials has been provided');
    }

    // generate tokens
    const tokens = await this.generateTokensService.generateTokens({
      userId: existingUser.id,
      userEmail: existingUser.email,
    });

    return tokens;
  }
}
