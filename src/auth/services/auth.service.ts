import { ConflictException, Inject, Injectable } from '@nestjs/common';
import UsersService from '../../users/services/users.service';
import { DRIZZLE_PROVIDER } from '../../database/constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../database/schemas';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    // call the check email exists service
    const emailExists = await this.usersService.checkEmailExists({
      email: registerDto.email,
    });

    if (emailExists) {
      throw new ConflictException('User with such email already exists');
    }

    // hash the password

    // call the create user service
    await th;
  }

  async login() {
    // check email exists
    // check password is correct
    // return user
  }
}
